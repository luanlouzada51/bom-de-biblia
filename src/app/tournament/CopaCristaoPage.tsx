import { useEffect, useMemo, useState } from 'react';
import {
  createTournamentInvite,
  createTournamentState,
  deleteTournamentState,
  Friendship,
  getFriendships,
  getTournamentStateByCode,
  getTournamentStateById,
  listOpenTournamentStates,
  listTournamentInvitesForOrganizer,
  listTournamentInvitesForUser,
  Profile,
  respondTournamentInvite,
  TournamentInviteRow,
  TournamentStateRow,
  TournamentStateStatus,
  updateTournamentState,
} from '../../utils/supabaseClient';

type View = 'menu' | 'organize' | 'join' | 'room';
type PlayerStatus = 'joined' | 'eliminated' | 'withdrawn' | 'champion' | 'runner-up' | 'third' | 'fourth';
type MatchStatus = 'scheduled' | 'in-progress' | 'finished' | 'walkover';
type BracketType = 'main' | 'third';

type Player = {
  id: string;
  name: string;
  avatar: string;
  totalScore: number;
  status: PlayerStatus;
  joinedAt: number;
  eliminatedAtRound?: number;
};

type Match = {
  id: string;
  round: number;
  bracket: BracketType;
  label: string;
  playerAId: string | null;
  playerBId: string | null;
  scoreA: number | null;
  scoreB: number | null;
  winnerId: string | null;
  loserId: string | null;
  status: MatchStatus;
};

type TournamentState = {
  id: string;
  code: string;
  name: string;
  organizerId: string;
  organizerName: string;
  size: number;
  thirdPlaceEnabled: boolean;
  players: Player[];
  matches: Match[];
  status: TournamentStateStatus;
  currentRound: number;
  intervalEndsAt: number | null;
  startedAt: number | null;
  finishedAt: number | null;
  championId: string | null;
  runnerUpId: string | null;
  thirdPlaceId: string | null;
  fourthPlaceId: string | null;
  updatedAt?: number;
};

const ROUND_INTERVAL_MS = 3 * 60 * 1000;

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function code6() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function toPlayer(profile: Profile): Player {
  return {
    id: profile.id,
    name: profile.username,
    avatar: profile.avatar,
    totalScore: 0,
    status: 'joined',
    joinedAt: Date.now(),
  };
}

function labelByMatches(count: number, bracket: BracketType) {
  if (bracket === 'third') return 'Disputa de 3o lugar';
  if (count === 1) return 'Final';
  if (count === 2) return 'Semifinal';
  if (count === 4) return 'Quartas';
  if (count === 8) return 'Oitavas';
  return `Rodada ${count}`;
}

function buildMatches(playerIds: string[], round: number, bracket: BracketType): Match[] {
  const matchCount = Math.ceil(playerIds.length / 2);
  const label = labelByMatches(matchCount, bracket);
  const matches: Match[] = [];
  for (let i = 0; i < playerIds.length; i += 2) {
    const playerAId = playerIds[i] || null;
    const playerBId = playerIds[i + 1] || null;
    const winnerId = playerAId && !playerBId ? playerAId : (!playerAId && playerBId ? playerBId : null);
    const loserId = winnerId === playerAId ? playerBId : playerAId;
    matches.push({
      id: uid('m'),
      round,
      bracket,
      label,
      playerAId,
      playerBId,
      scoreA: winnerId === playerAId ? 0 : null,
      scoreB: winnerId === playerBId ? 0 : null,
      winnerId,
      loserId,
      status: winnerId ? 'walkover' : 'scheduled',
    });
  }
  return matches;
}

function playerById(state: TournamentState, id: string | null) {
  return state.players.find(p => p.id === id) || null;
}

function fromRow(row: TournamentStateRow): TournamentState {
  const state = (row.state || {}) as Partial<TournamentState>;
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    organizerId: row.organizer_id,
    organizerName: state.organizerName || 'Organizador',
    size: state.size || 16,
    thirdPlaceEnabled: !!state.thirdPlaceEnabled,
    players: state.players || [],
    matches: state.matches || [],
    status: row.status,
    currentRound: state.currentRound || 0,
    intervalEndsAt: state.intervalEndsAt ?? null,
    startedAt: state.startedAt ?? null,
    finishedAt: state.finishedAt ?? null,
    championId: state.championId ?? null,
    runnerUpId: state.runnerUpId ?? null,
    thirdPlaceId: state.thirdPlaceId ?? null,
    fourthPlaceId: state.fourthPlaceId ?? null,
    updatedAt: row.updated_at ? new Date(row.updated_at).getTime() : Date.now(),
  };
}

function toStatePayload(state: TournamentState) {
  return {
    organizerName: state.organizerName,
    size: state.size,
    thirdPlaceEnabled: state.thirdPlaceEnabled,
    players: state.players,
    matches: state.matches,
    currentRound: state.currentRound,
    intervalEndsAt: state.intervalEndsAt,
    startedAt: state.startedAt,
    finishedAt: state.finishedAt,
    championId: state.championId,
    runnerUpId: state.runnerUpId,
    thirdPlaceId: state.thirdPlaceId,
    fourthPlaceId: state.fourthPlaceId,
  };
}

function activeRoundMatches(state: TournamentState) {
  return state.matches.filter(m => m.round === state.currentRound);
}

function computeNextStateAfterRound(state: TournamentState): TournamentState {
  const current = activeRoundMatches(state);
  if (!current.length || current.some(m => m.status !== 'finished' && m.status !== 'walkover')) return state;

  const main = current.filter(m => m.bracket === 'main');
  const third = current.filter(m => m.bracket === 'third');

  if (main.length === 1) {
    const final = main[0];
    const championId = final.winnerId;
    const runnerUpId = final.loserId;

    if (state.thirdPlaceEnabled && third.length === 1 && (!third[0].winnerId || !third[0].loserId)) {
      return state;
    }

    const thirdPlaceId = third[0]?.winnerId ?? null;
    const fourthPlaceId = third[0]?.loserId ?? null;

    const players = state.players.map(player => {
      if (player.id === championId) return { ...player, status: 'champion' as PlayerStatus };
      if (player.id === runnerUpId) return { ...player, status: 'runner-up' as PlayerStatus };
      if (player.id === thirdPlaceId) return { ...player, status: 'third' as PlayerStatus };
      if (player.id === fourthPlaceId) return { ...player, status: 'fourth' as PlayerStatus };
      return player;
    });

    return {
      ...state,
      players,
      status: 'finished',
      finishedAt: Date.now(),
      intervalEndsAt: null,
      championId: championId ?? null,
      runnerUpId: runnerUpId ?? null,
      thirdPlaceId,
      fourthPlaceId,
    };
  }

  const winners = main.map(m => m.winnerId).filter(Boolean) as string[];
  const losers = main.map(m => m.loserId).filter(Boolean) as string[];
  const nextRound = state.currentRound + 1;
  const nextMain = buildMatches(winners, nextRound, 'main');
  const nextThird = state.thirdPlaceEnabled && main.length === 2 ? buildMatches(losers, nextRound, 'third') : [];

  return {
    ...state,
    matches: [...state.matches, ...nextMain, ...nextThird],
    currentRound: nextRound,
    status: 'interval',
    intervalEndsAt: Date.now() + ROUND_INTERVAL_MS,
  };
}

function remainingText(ms: number) {
  const seconds = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function CopaCristaoPage({ profile, onClose }: { profile: Profile; onClose: () => void }) {
  const [view, setView] = useState<View>('menu');
  const [size, setSize] = useState(16);
  const [thirdPlaceEnabled, setThirdPlaceEnabled] = useState(true);
  const [joinCode, setJoinCode] = useState('');
  const [tournament, setTournament] = useState<TournamentState | null>(null);
  const [openTournaments, setOpenTournaments] = useState<TournamentState[]>([]);
  const [invites, setInvites] = useState<TournamentInviteRow[]>([]);
  const [organizerInvites, setOrganizerInvites] = useState<TournamentInviteRow[]>([]);
  const [friends, setFriends] = useState<Friendship[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  const isOrganizer = tournament?.organizerId === profile.id;
  const currentMatches = tournament ? activeRoundMatches(tournament) : [];
  const ranking = useMemo(() => (tournament ? [...tournament.players].sort((a, b) => b.totalScore - a.totalScore) : []), [tournament]);

  async function refreshGlobal() {
    const [openRows, myInvites, fr] = await Promise.all([
      listOpenTournamentStates(),
      listTournamentInvitesForUser(profile.id),
      getFriendships(profile.id),
    ]);
    setOpenTournaments(openRows.map(fromRow));
    setInvites(myInvites);
    setFriends(fr);

    if (tournament && tournament.organizerId === profile.id) {
      const sent = await listTournamentInvitesForOrganizer(tournament.id);
      setOrganizerInvites(sent);
    } else {
      setOrganizerInvites([]);
    }
  }

  async function refreshCurrent() {
    if (!tournament) return;
    const row = await getTournamentStateById(tournament.id);
    if (!row) {
      setTournament(null);
      setView('menu');
      return;
    }
    setTournament(fromRow(row));
  }

  async function persist(next: TournamentState) {
    const normalized = { ...next };
    if (normalized.status === 'interval' && normalized.intervalEndsAt && normalized.intervalEndsAt <= Date.now()) {
      normalized.status = 'in-progress';
      normalized.intervalEndsAt = null;
      normalized.matches = normalized.matches.map(m => m.round === normalized.currentRound && m.status === 'scheduled' ? { ...m, status: 'in-progress' as MatchStatus } : m);
    }
    const err = await updateTournamentState(normalized.id, toStatePayload(normalized), normalized.status);
    if (!err) setTournament(normalized);
    else setMsg(err);
  }

  useEffect(() => {
    refreshGlobal();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
      refreshGlobal();
      refreshCurrent();
    }, 4000);
    return () => window.clearInterval(timer);
  }, [tournament?.id]);

  useEffect(() => {
    if (!msg) return;
    const timer = window.setTimeout(() => setMsg(null), 2800);
    return () => window.clearTimeout(timer);
  }, [msg]);

  const createTournament = async () => {
    const initial: Omit<TournamentState, 'id'> = {
      code: code6(),
      name: 'Copa Crist�o',
      organizerId: profile.id,
      organizerName: profile.username,
      size,
      thirdPlaceEnabled,
      players: [toPlayer(profile)],
      matches: [],
      status: 'waiting',
      currentRound: 0,
      intervalEndsAt: null,
      startedAt: null,
      finishedAt: null,
      championId: null,
      runnerUpId: null,
      thirdPlaceId: null,
      fourthPlaceId: null,
    };

    const result = await createTournamentState(initial.code, initial.name, profile.id, {
      organizerName: initial.organizerName,
      size: initial.size,
      thirdPlaceEnabled: initial.thirdPlaceEnabled,
      players: initial.players,
      matches: initial.matches,
      currentRound: initial.currentRound,
      intervalEndsAt: initial.intervalEndsAt,
      startedAt: initial.startedAt,
      finishedAt: initial.finishedAt,
      championId: initial.championId,
      runnerUpId: initial.runnerUpId,
      thirdPlaceId: initial.thirdPlaceId,
      fourthPlaceId: initial.fourthPlaceId,
    }, 'waiting');

    if (!result.row) {
      setMsg(result.error || 'Erro ao criar torneio');
      return;
    }

    const created = fromRow(result.row);
    setTournament(created);
    setView('room');
    setMsg('Copa Crist�o criada.');
    refreshGlobal();
  };

  const joinByCode = async () => {
    const row = await getTournamentStateByCode(joinCode.trim());
    if (!row) return setMsg('Torneio n�o encontrado');
    const state = fromRow(row);
    if (state.status !== 'waiting') return setMsg('Esse torneio j� iniciou');
    if (!state.players.some(p => p.id === profile.id)) {
      if (state.players.length >= state.size) return setMsg('Torneio cheio');
      state.players = [...state.players, toPlayer(profile)];
      await persist(state);
    }
    setTournament(state);
    setView('room');
    refreshGlobal();
  };

  const inviteFriend = async (friendId: string) => {
    if (!tournament) return;
    if (tournament.players.some(p => p.id === friendId)) return setMsg('Esse amigo j� entrou');
    if (organizerInvites.some(inv => inv.invited_user_id === friendId && inv.status === 'pending')) {
      return setMsg('Esse amigo j� foi convidado');
    }
    const err = await createTournamentInvite(tournament.id, profile.id, friendId);
    if (err) setMsg(err); else setMsg('Convite enviado');
    refreshGlobal();
  };

  const acceptInvite = async (invite: TournamentInviteRow) => {
    const row = await getTournamentStateById(invite.tournament_id);
    if (!row) return setMsg('Torneio indispon�vel');
    const state = fromRow(row);
    if (state.status !== 'waiting') return setMsg('Torneio j� iniciado');
    if (!state.players.some(p => p.id === profile.id)) {
      if (state.players.length >= state.size) return setMsg('Torneio cheio');
      state.players = [...state.players, toPlayer(profile)];
      await persist(state);
    }
    await respondTournamentInvite(invite.id, 'accepted');
    setTournament(state);
    setView('room');
    refreshGlobal();
  };

  const declineInvite = async (invite: TournamentInviteRow) => {
    await respondTournamentInvite(invite.id, 'declined');
    refreshGlobal();
  };

  const startTournament = async () => {
    if (!tournament) return;
    if (tournament.players.length < 4) return setMsg('M�nimo de 4 jogadores');
    if (tournament.players.length !== tournament.size) return setMsg(`Precisa completar ${tournament.size} jogadores`);

    const seeded = shuffle(tournament.players.map(p => p.id));
    const firstRound = buildMatches(seeded, 1, 'main').map(m => ({ ...m, status: m.status === 'scheduled' ? 'in-progress' : m.status }));
    const next: TournamentState = {
      ...tournament,
      matches: firstRound,
      status: 'in-progress',
      currentRound: 1,
      startedAt: Date.now(),
      intervalEndsAt: null,
      players: tournament.players.map(p => ({ ...p, totalScore: 0, status: 'joined', eliminatedAtRound: undefined })),
      championId: null,
      runnerUpId: null,
      thirdPlaceId: null,
      fourthPlaceId: null,
    };
    await persist(next);
  };

  const finishMatch = async (matchId: string, scoreA: number, scoreB: number, tiedWinnerId?: string | null) => {
    if (!tournament) return;
    const target = tournament.matches.find(m => m.id === matchId);
    if (!target || !target.playerAId || !target.playerBId) return;

    let winnerId: string | null = null;
    let loserId: string | null = null;
    if (scoreA > scoreB) { winnerId = target.playerAId; loserId = target.playerBId; }
    else if (scoreB > scoreA) { winnerId = target.playerBId; loserId = target.playerAId; }
    else if (tiedWinnerId && [target.playerAId, target.playerBId].includes(tiedWinnerId)) {
      winnerId = tiedWinnerId;
      loserId = tiedWinnerId === target.playerAId ? target.playerBId : target.playerAId;
    }
    if (!winnerId || !loserId) return setMsg('Empate: escolha o vencedor');

    const players = tournament.players.map(p => {
      if (p.id === target.playerAId) return { ...p, totalScore: p.totalScore + scoreA, status: p.id === loserId ? 'eliminated' as PlayerStatus : p.status };
      if (p.id === target.playerBId) return { ...p, totalScore: p.totalScore + scoreB, status: p.id === loserId ? 'eliminated' as PlayerStatus : p.status };
      return p;
    });

    const matches = tournament.matches.map(m => m.id === matchId ? { ...m, scoreA, scoreB, winnerId, loserId, status: 'finished' as MatchStatus } : m);
    const advanced = computeNextStateAfterRound({ ...tournament, players, matches });
    await persist(advanced);
  };

  const autoStartIntervalRound = async () => {
    if (!tournament || tournament.status !== 'interval' || !tournament.intervalEndsAt || tournament.intervalEndsAt > Date.now()) return;
    const next: TournamentState = {
      ...tournament,
      status: 'in-progress',
      intervalEndsAt: null,
      matches: tournament.matches.map(m => m.round === tournament.currentRound && m.status === 'scheduled' ? { ...m, status: 'in-progress' as MatchStatus } : m),
    };
    await persist(next);
  };

  useEffect(() => {
    autoStartIntervalRound();
  }, [tournament?.status, tournament?.intervalEndsAt, now]);

  const leaveTournament = async () => {
    if (!tournament) return;
    if (tournament.status === 'waiting' && tournament.organizerId === profile.id) {
      const err = await deleteTournamentState(tournament.id);
      if (!err) { setTournament(null); setView('menu'); refreshGlobal(); }
      else setMsg(err);
      return;
    }

    if (tournament.status === 'waiting') {
      const next = { ...tournament, players: tournament.players.filter(p => p.id !== profile.id) };
      await persist(next);
      setTournament(null);
      setView('menu');
      return;
    }

    const players = tournament.players.map(p => p.id === profile.id ? { ...p, status: 'withdrawn' as PlayerStatus } : p);
    const matches = tournament.matches.map(m => {
      if (m.status === 'finished' || m.status === 'walkover') return m;
      if (m.playerAId !== profile.id && m.playerBId !== profile.id) return m;
      const winnerId = m.playerAId === profile.id ? m.playerBId : m.playerAId;
      return { ...m, winnerId: winnerId || null, loserId: profile.id, status: winnerId ? 'walkover' as MatchStatus : 'finished' as MatchStatus };
    });

    const next = computeNextStateAfterRound({ ...tournament, players, matches });
    await persist(next);
    if (tournament.organizerId !== profile.id) {
      setTournament(null);
      setView('menu');
    }
  };

  async function getInviteTournament(invite: TournamentInviteRow) {
    const row = await getTournamentStateById(invite.tournament_id);
    return row ? fromRow(row) : null;
  }

  const pendingOrganizerInvites = useMemo(async () => {
    if (!tournament || !isOrganizer) return [] as TournamentInviteRow[];
    return listTournamentInvitesForOrganizer(tournament.id);
  }, [tournament?.id, isOrganizer, now]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 p-4 overflow-y-auto">
      <div className="mx-auto my-6 w-full max-w-6xl rounded-3xl border border-white/20 bg-slate-900 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-300 font-bold">Modo torneio</p>
            <h2 className="text-3xl font-black text-white">Copa Crist�o</h2>
          </div>
          <button onClick={onClose} className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">Fechar</button>
        </div>

        {msg && <p className="mb-4 text-sm font-bold text-blue-200">{msg}</p>}

        {view === 'menu' && (
          <div className="grid gap-4 md:grid-cols-2">
            <button onClick={() => setView('organize')} className="rounded-2xl bg-blue-500/20 border border-blue-300/30 p-5 text-left">
              <p className="text-blue-200 text-xs uppercase tracking-[0.3em] font-bold">Organizar</p>
              <p className="text-white text-2xl font-black mt-2">Criar torneio</p>
            </button>
            <button onClick={() => setView('join')} className="rounded-2xl bg-emerald-500/20 border border-emerald-300/30 p-5 text-left">
              <p className="text-emerald-200 text-xs uppercase tracking-[0.3em] font-bold">Participar</p>
              <p className="text-white text-2xl font-black mt-2">Entrar em torneio</p>
            </button>
            {tournament && <button onClick={() => setView('room')} className="md:col-span-2 rounded-xl bg-white/10 p-3 text-white font-bold">Voltar para torneio atual</button>}
          </div>
        )}

        {view === 'organize' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[4, 8, 16, 32].map(n => (
                <button key={n} onClick={() => setSize(n)} className={`rounded-xl p-3 font-bold ${size === n ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70'}`}>{n} jogadores</button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-white">
              <input type="checkbox" checked={thirdPlaceEnabled} onChange={e => setThirdPlaceEnabled(e.target.checked)} />
              Disputa de 3� lugar
            </label>
            <div className="flex gap-2">
              <button onClick={createTournament} className="rounded-xl bg-emerald-500 px-4 py-3 text-white font-black">Criar Copa Crist�o</button>
              <button onClick={() => setView('menu')} className="rounded-xl bg-white/10 px-4 py-3 text-white">Voltar</button>
            </div>
          </div>
        )}

        {view === 'join' && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-white font-black">Convites recebidos</p>
              <div className="space-y-3 mt-3">
                {invites.length === 0 && <p className="text-white/50 text-sm">Nenhum convite pendente</p>}
                {invites.map(inv => (
                  <div key={inv.id} className="rounded-xl bg-slate-950/40 border border-white/10 p-3">
                    <p className="text-white text-sm">Convite para torneio {inv.tournament_id.slice(0, 8)}</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={async () => {
                        const t = await getInviteTournament(inv);
                        if (t) setMsg(`Torneio ${t.code}`);
                        acceptInvite(inv);
                      }} className="rounded-lg bg-emerald-500 px-3 py-1.5 text-white text-xs font-bold">Aceitar</button>
                      <button onClick={() => declineInvite(inv)} className="rounded-lg bg-white/10 px-3 py-1.5 text-white text-xs font-bold">Recusar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-white font-black">Entrar por c�digo</p>
              <input value={joinCode} onChange={e => setJoinCode(e.target.value.replace(/\D/g, '').slice(0, 6))} className="w-full mt-3 rounded-xl bg-slate-950/40 border border-white/10 p-3 text-center text-white text-2xl tracking-[0.3em] font-black" placeholder="000000" />
              <button onClick={joinByCode} className="mt-3 w-full rounded-xl bg-blue-500 py-3 text-white font-black">Entrar</button>

              <p className="text-white font-black mt-5">Torneios ativos</p>
              <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                {openTournaments.length === 0 && <p className="text-white/50 text-sm">Sem torneios no momento</p>}
                {openTournaments.map(t => (
                  <div key={t.id} className="rounded-xl bg-slate-950/40 border border-white/10 p-3 flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-bold">{t.name} #{t.code}</p>
                      <p className="text-white/50 text-xs">{t.players.length}/{t.size}</p>
                    </div>
                    <button onClick={async () => {
                      if (t.status !== 'waiting') return;
                      const row = await getTournamentStateById(t.id);
                      if (!row) return;
                      const latest = fromRow(row);
                      if (!latest.players.some(p => p.id === profile.id)) {
                        latest.players = [...latest.players, toPlayer(profile)];
                        await persist(latest);
                      }
                      setTournament(latest);
                      setView('room');
                    }} className="rounded-lg bg-blue-500 px-3 py-1.5 text-white text-xs font-bold">Entrar</button>
                  </div>
                ))}
              </div>
              <button onClick={() => setView('menu')} className="mt-4 rounded-xl bg-white/10 px-3 py-2 text-white">Voltar</button>
            </div>
          </div>
        )}

        {view === 'room' && tournament && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-wrap gap-3 items-center justify-between">
              <div>
                <p className="text-white font-black text-xl">{tournament.name} � {tournament.code}</p>
                <p className="text-white/50 text-sm">{tournament.players.length}/{tournament.size} jogadores</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigator.clipboard.writeText(tournament.code)} className="rounded-xl bg-white/10 px-3 py-2 text-white text-sm">Copiar c�digo</button>
                <button onClick={leaveTournament} className="rounded-xl bg-red-500 px-3 py-2 text-white text-sm font-bold">{isOrganizer && tournament.status === 'waiting' ? 'Cancelar' : 'Sair'}</button>
              </div>
            </div>

            {tournament.status === 'waiting' && (
              <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-white font-black mb-3">Lobby</p>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: tournament.size }).map((_, i) => {
                      const p = tournament.players[i];
                      return <div key={i} className="rounded-xl border border-white/10 bg-slate-950/40 p-2 text-sm text-white">{p ? `${p.avatar} ${p.name}` : 'Vaga aberta'}</div>;
                    })}
                  </div>
                  {isOrganizer && <button onClick={startTournament} className="mt-4 rounded-xl bg-emerald-500 px-4 py-3 text-white font-black">Iniciar torneio</button>}
                </div>

                {isOrganizer && (
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <p className="text-white font-black mb-3">Convidar amigos</p>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {friends.filter(f => !!f.friend_profile).map(f => (
                        <div key={f.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-2 flex items-center justify-between">
                          <span className="text-white text-sm">{f.friend_profile?.avatar} {f.friend_profile?.username}</span>
                          {organizerInvites.some(inv => inv.invited_user_id === f.friend_id && inv.status === 'pending') ? (
                            <span className="rounded-lg bg-emerald-500/20 px-2 py-1 text-emerald-300 text-xs font-bold">Convidado</span>
                          ) : (
                            <button onClick={() => inviteFriend(f.friend_id)} className="rounded-lg bg-blue-500 px-2 py-1 text-white text-xs font-bold">Convidar</button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 border-t border-white/10 pt-4">
                      <p className="text-white font-black mb-2">Convites enviados</p>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {organizerInvites.length === 0 ? (
                          <p className="text-white/40 text-sm">Nenhum convite enviado ainda</p>
                        ) : organizerInvites.map(inv => (
                          <div key={inv.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-2 flex items-center justify-between">
                            <span className="text-white text-sm">{friends.find(f => f.friend_id === inv.invited_user_id)?.friend_profile?.username || inv.invited_user_id.slice(0, 8)}</span>
                            <span className="text-emerald-300 text-xs font-bold">Pendente</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {(tournament.status === 'in-progress' || tournament.status === 'interval' || tournament.status === 'finished') && (
              <div className="grid gap-6 lg:grid-cols-[1.45fr,0.95fr]">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white font-black text-lg">Rodada {tournament.currentRound}</p>
                    {tournament.status === 'interval' ? <p className="text-amber-300 font-bold">Pr�xima em {remainingText((tournament.intervalEndsAt || 0) - now)}</p> : <p className="text-blue-300 font-bold">{tournament.status === 'finished' ? 'Finalizado' : 'Ao vivo'}</p>}
                  </div>
                  <div className="space-y-3">
                    {currentMatches.map(match => {
                      const pa = playerById(tournament, match.playerAId);
                      const pb = playerById(tournament, match.playerBId);
                      let sa = match.scoreA ?? 0;
                      let sb = match.scoreB ?? 0;
                      return (
                        <div key={match.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                          <p className="text-white/50 text-xs uppercase">{match.label} � {match.bracket === 'main' ? 'Principal' : '3� lugar'}</p>
                          <div className="mt-2 grid grid-cols-[1fr,auto] gap-2 items-center">
                            <p className="text-white text-sm">{pa ? `${pa.avatar} ${pa.name}` : '�'} x {pb ? `${pb.avatar} ${pb.name}` : '�'}</p>
                            {isOrganizer && tournament.status === 'in-progress' && match.status !== 'finished' && match.status !== 'walkover' && pa && pb ? (
                              <div className="flex gap-1 items-center">
                                <input type="number" min={0} defaultValue={sa} onChange={e => { sa = Math.max(0, Number(e.target.value) || 0); }} className="w-14 rounded bg-white/10 text-white text-sm p-1" />
                                <span className="text-white">x</span>
                                <input type="number" min={0} defaultValue={sb} onChange={e => { sb = Math.max(0, Number(e.target.value) || 0); }} className="w-14 rounded bg-white/10 text-white text-sm p-1" />
                                <button onClick={() => {
                                  if (sa === sb) {
                                    const chooseA = window.confirm('Empate. OK = vence A / Cancelar = vence B');
                                    finishMatch(match.id, sa, sb, chooseA ? pa.id : pb.id);
                                    return;
                                  }
                                  finishMatch(match.id, sa, sb);
                                }} className="rounded bg-emerald-500 px-2 py-1 text-xs text-white font-bold">Finalizar</button>
                              </div>
                            ) : (
                              <p className="text-white font-bold">{match.scoreA ?? '�'} x {match.scoreB ?? '�'}</p>
                            )}
                          </div>
                          {match.winnerId && <p className="mt-1 text-emerald-300 text-xs">Vencedor: {playerById(tournament, match.winnerId)?.name}</p>}
                        </div>
                      );
                    })}
                  </div>

                  {tournament.status === 'finished' && (
                    <div className="mt-4 rounded-xl bg-white/10 p-3">
                      <p className="text-white font-black">P�dio</p>
                      <p className="text-white text-sm mt-1">1�: {playerById(tournament, tournament.championId)?.name || '�'}</p>
                      <p className="text-white text-sm">2�: {playerById(tournament, tournament.runnerUpId)?.name || '�'}</p>
                      <p className="text-white text-sm">3�: {tournament.thirdPlaceEnabled ? (playerById(tournament, tournament.thirdPlaceId)?.name || '�') : 'N�o habilitado'}</p>
                      {tournament.thirdPlaceEnabled && <p className="text-white text-sm">4�: {playerById(tournament, tournament.fourthPlaceId)?.name || '�'}</p>}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-white font-black mb-3">Pontua��o dos membros</p>
                  <div className="space-y-2">
                    {ranking.map((p, i) => (
                      <div key={p.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-2 flex items-center justify-between">
                        <span className="text-white text-sm">{i + 1}. {p.avatar} {p.name}</span>
                        <span className="text-blue-300 font-black text-sm">{p.totalScore}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
