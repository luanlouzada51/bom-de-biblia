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
  closeExpiredEmptyWaitingTournaments,
  updateTournamentState,
} from '../../utils/supabaseClient';
import { questions } from '../data/questions';

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
  playerATimeMs?: number | null;
  playerBTimeMs?: number | null;
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
  roundStartedAt: number | null;
  intervalEndsAt: number | null;
  startedAt: number | null;
  finishedAt: number | null;
  championId: string | null;
  runnerUpId: string | null;
  thirdPlaceId: string | null;
  fourthPlaceId: string | null;
  roundQuestionOrders: Record<string, number[]>;
  updatedAt?: number;
};

const ROUND_DURATION_SECONDS = 120;
const ROUND_DURATION_MS = ROUND_DURATION_SECONDS * 1000;
const EMPTY_WAITING_AUTO_CANCEL_MINUTES = 10;
const POINTS: Record<string, number> = {
  'Fácil': 100,
  'Médio': 200,
  'Difícil': 300,
  'Expert': 500,
};

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

function hashSeed(input: string) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed || 1;
  const rand = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1000000) / 1000000;
  };
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRoundQuestionOrder(tournamentId: string, round: number): number[] {
  const total = questions.length;
  if (!total) return [];
  const indexes = Array.from({ length: total }, (_, i) => i);
  const seed = hashSeed(`${tournamentId}:${round}`);
  return seededShuffle(indexes, seed);
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

function normalizePlayers(players: Player[], size?: number): Player[] {
  const unique: Player[] = [];
  const seen = new Set<string>();
  for (const player of players) {
    if (seen.has(player.id)) continue;
    seen.add(player.id);
    unique.push(player);
  }
  return typeof size === 'number' ? unique.slice(0, size) : unique;
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
  const size = state.size || 16;
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    organizerId: row.organizer_id,
    organizerName: state.organizerName || 'Organizador',
    size,
    thirdPlaceEnabled: !!state.thirdPlaceEnabled,
    players: normalizePlayers(state.players || [], size),
    matches: state.matches || [],
    status: row.status,
    currentRound: state.currentRound || 0,
    roundStartedAt: state.roundStartedAt ?? null,
    intervalEndsAt: state.intervalEndsAt ?? null,
    startedAt: state.startedAt ?? null,
    finishedAt: state.finishedAt ?? null,
    championId: state.championId ?? null,
    runnerUpId: state.runnerUpId ?? null,
    thirdPlaceId: state.thirdPlaceId ?? null,
    fourthPlaceId: state.fourthPlaceId ?? null,
    roundQuestionOrders: state.roundQuestionOrders || {},
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
    roundStartedAt: state.roundStartedAt,
    intervalEndsAt: state.intervalEndsAt,
    startedAt: state.startedAt,
    finishedAt: state.finishedAt,
    championId: state.championId,
    runnerUpId: state.runnerUpId,
    thirdPlaceId: state.thirdPlaceId,
    fourthPlaceId: state.fourthPlaceId,
    roundQuestionOrders: state.roundQuestionOrders,
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
      roundStartedAt: null,
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
  const roundQuestionOrders = {
    ...state.roundQuestionOrders,
    [String(nextRound)]: state.roundQuestionOrders[String(nextRound)] || buildRoundQuestionOrder(state.id, nextRound),
  };

  return {
    ...state,
    matches: [...state.matches, ...nextMain, ...nextThird],
    currentRound: nextRound,
    roundStartedAt: null,
    status: 'interval',
    intervalEndsAt: null,
    roundQuestionOrders,
  };
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
  const [quizMatchId, setQuizMatchId] = useState<string | null>(null);
  const [quizPos, setQuizPos] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStartAt, setQuizStartAt] = useState<number | null>(null);
  const [quizDeadlineAt, setQuizDeadlineAt] = useState<number | null>(null);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [localNow, setLocalNow] = useState(Date.now());
  const [autoResolvingRound, setAutoResolvingRound] = useState(false);

  const isOrganizer = tournament?.organizerId === profile.id;
  const currentMatches = tournament ? activeRoundMatches(tournament) : [];
  const currentRoundQuestionOrder = tournament ? (tournament.roundQuestionOrders[String(tournament.currentRound)] || []) : [];
  const ranking = useMemo(() => (tournament ? [...tournament.players].sort((a, b) => b.totalScore - a.totalScore) : []), [tournament]);
  const myCurrentMatch = useMemo(() => {
    if (!tournament) return null;
    return currentMatches.find(
      m => (m.playerAId === profile.id || m.playerBId === profile.id)
        && m.status !== 'finished'
        && m.status !== 'walkover',
    ) || null;
  }, [tournament, currentMatches, profile.id]);
  const bracketVisibleMatches = useMemo(() => {
    if (!tournament) return [] as Match[];
    const scope = isOrganizer
      ? tournament.matches
      : tournament.matches.filter(m => m.playerAId === profile.id || m.playerBId === profile.id);
    return [...scope].sort((a, b) => {
      if (a.round !== b.round) return a.round - b.round;
      if (a.bracket !== b.bracket) return a.bracket === 'main' ? -1 : 1;
      return a.label.localeCompare(b.label);
    });
  }, [tournament, isOrganizer, profile.id]);
  const quizQuestionIndex = quizMatchId && quizPos < currentRoundQuestionOrder.length ? currentRoundQuestionOrder[quizPos] : null;
  const quizQuestion = quizQuestionIndex !== null ? questions[quizQuestionIndex] : null;
  const quizSecondsLeft = quizDeadlineAt ? Math.max(0, Math.ceil((quizDeadlineAt - localNow) / 1000)) : 0;

  async function refreshGlobal() {
    const cleanupErr = await closeExpiredEmptyWaitingTournaments(EMPTY_WAITING_AUTO_CANCEL_MINUTES);
    if (cleanupErr) setMsg(cleanupErr);

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
    const normalized = { ...next, players: normalizePlayers(next.players, next.size) };
    if (normalized.status === 'interval' && normalized.intervalEndsAt && normalized.intervalEndsAt <= Date.now()) {
      normalized.status = 'in-progress';
      normalized.roundStartedAt = Date.now();
      normalized.intervalEndsAt = null;
      normalized.matches = normalized.matches.map(m => m.round === normalized.currentRound && m.status === 'scheduled' ? { ...m, status: 'in-progress' as MatchStatus } : m);
    }
    const err = await updateTournamentState(normalized.id, toStatePayload(normalized), normalized.status);
    if (!err) setTournament(normalized);
    else setMsg(err);
  }

  async function ensurePlayerJoined(base: TournamentState): Promise<{ state: TournamentState | null; error: string | null }> {
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const row = await getTournamentStateById(base.id);
      if (!row) return { state: null, error: 'Torneio indisponível' };
      const latest = fromRow(row);

      if (latest.status !== 'waiting') return { state: null, error: 'Esse torneio já iniciou' };
      if (latest.players.some(p => p.id === profile.id)) return { state: latest, error: null };

      const mergedPlayers = normalizePlayers([...latest.players, toPlayer(profile)], latest.size);
      if (mergedPlayers.length > latest.size || (mergedPlayers.length === latest.players.length && !mergedPlayers.some(p => p.id === profile.id))) {
        return { state: null, error: 'Torneio cheio' };
      }

      const next = { ...latest, players: mergedPlayers };
      const err = await updateTournamentState(next.id, toStatePayload(next), next.status);
      if (err) return { state: null, error: err };

      const verifyRow = await getTournamentStateById(base.id);
      if (!verifyRow) return { state: next, error: null };
      const verified = fromRow(verifyRow);
      if (verified.players.some(p => p.id === profile.id)) return { state: verified, error: null };
    }

    return { state: null, error: 'Não foi possível entrar no torneio. Tente novamente.' };
  }

  useEffect(() => {
    refreshGlobal();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const ts = Date.now();
      setNow(ts);
      setLocalNow(ts);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
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
      name: 'Copa Cristão',
      organizerId: profile.id,
      organizerName: profile.username,
      size,
      thirdPlaceEnabled,
      players: [toPlayer(profile)],
      matches: [],
      status: 'waiting',
      currentRound: 0,
      roundStartedAt: null,
      intervalEndsAt: null,
      startedAt: null,
      finishedAt: null,
      championId: null,
      runnerUpId: null,
      thirdPlaceId: null,
      fourthPlaceId: null,
      roundQuestionOrders: {},
    };

    const result = await createTournamentState(initial.code, initial.name, profile.id, {
      organizerName: initial.organizerName,
      size: initial.size,
      thirdPlaceEnabled: initial.thirdPlaceEnabled,
      players: initial.players,
      matches: initial.matches,
      currentRound: initial.currentRound,
      roundStartedAt: initial.roundStartedAt,
      intervalEndsAt: initial.intervalEndsAt,
      startedAt: initial.startedAt,
      finishedAt: initial.finishedAt,
      championId: initial.championId,
      runnerUpId: initial.runnerUpId,
      thirdPlaceId: initial.thirdPlaceId,
      fourthPlaceId: initial.fourthPlaceId,
      roundQuestionOrders: initial.roundQuestionOrders,
    }, 'waiting');

    if (!result.row) {
      setMsg(result.error || 'Erro ao criar torneio');
      return;
    }

    const created = fromRow(result.row);
    setTournament(created);
    setView('room');
    setMsg('Copa Cristão criada.');
    refreshGlobal();
  };

  const joinByCode = async () => {
    const row = await getTournamentStateByCode(joinCode.trim());
    if (!row) return setMsg('Torneio não encontrado');
    const state = fromRow(row);
    const joined = await ensurePlayerJoined(state);
    if (!joined.state) return setMsg(joined.error || 'Não foi possível entrar no torneio');
    setTournament(joined.state);
    setView('room');
    refreshGlobal();
  };

  const inviteFriend = async (friendId: string) => {
    if (!tournament) return;
    if (tournament.players.some(p => p.id === friendId)) return setMsg('Esse amigo já entrou');
    if (organizerInvites.some(inv => inv.invited_user_id === friendId && inv.status === 'pending')) {
      return setMsg('Esse amigo já foi convidado');
    }
    const err = await createTournamentInvite(tournament.id, profile.id, friendId);
    if (err) setMsg(err); else setMsg('Convite enviado');
    refreshGlobal();
  };

  const acceptInvite = async (invite: TournamentInviteRow) => {
    const row = await getTournamentStateById(invite.tournament_id);
    if (!row) return setMsg('Torneio indisponível');
    const state = fromRow(row);
    const joined = await ensurePlayerJoined(state);
    if (!joined.state) return setMsg(joined.error || 'Não foi possível entrar no torneio');
    await respondTournamentInvite(invite.id, 'accepted');
    setTournament(joined.state);
    setView('room');
    refreshGlobal();
  };

  const declineInvite = async (invite: TournamentInviteRow) => {
    await respondTournamentInvite(invite.id, 'declined');
    refreshGlobal();
  };

  const startTournament = async () => {
    if (!tournament) return;
    const row = await getTournamentStateById(tournament.id);
    if (!row) return setMsg('Torneio indisponível');
    const latest = fromRow(row);
    if (latest.status !== 'waiting') return setMsg('Esse torneio já iniciou');

    const participants = normalizePlayers(latest.players, latest.size);
    if (participants.length < 4) return setMsg('Mínimo de 4 jogadores');
    if (participants.length < latest.size) return setMsg(`Precisa completar ${latest.size} jogadores`);

    const seeded = shuffle(participants.map(p => p.id));
    const firstRound = buildMatches(seeded, 1, 'main').map(m => ({ ...m, status: m.status === 'scheduled' ? 'in-progress' : m.status }));
    const roundQuestionOrders = {
      ...latest.roundQuestionOrders,
      '1': latest.roundQuestionOrders['1'] || buildRoundQuestionOrder(latest.id, 1),
    };
    const next: TournamentState = {
      ...latest,
      matches: firstRound,
      status: 'in-progress',
      currentRound: 1,
      roundStartedAt: Date.now(),
      startedAt: Date.now(),
      intervalEndsAt: null,
      players: participants.map(p => ({ ...p, totalScore: 0, status: 'joined', eliminatedAtRound: undefined })),
      championId: null,
      runnerUpId: null,
      thirdPlaceId: null,
      fourthPlaceId: null,
      roundQuestionOrders,
    };
    await persist(next);
  };

  const submitMatchQuizScore = async (finalScore?: number) => {
    if (!tournament || !quizMatchId || quizStartAt === null) return;
    const latestRow = await getTournamentStateById(tournament.id);
    if (!latestRow) return;
    const liveState = fromRow(latestRow);
    const target = liveState.matches.find(m => m.id === quizMatchId);
    if (!target || !target.playerAId || !target.playerBId) return;
    if (target.status === 'finished' || target.status === 'walkover') return;
    const playerAId = target.playerAId;
    const playerBId = target.playerBId;

    const isPlayerA = target.playerAId === profile.id;
    const isPlayerB = target.playerBId === profile.id;
    if (!isPlayerA && !isPlayerB) return;

    const myTimeMs = Math.max(1, Date.now() - quizStartAt);
    const effectiveScore = typeof finalScore === 'number' ? finalScore : quizScore;
    const withMySubmission = liveState.matches.map(m => {
      if (m.id !== quizMatchId) return m;
      if (isPlayerA && m.scoreA !== null) return m;
      if (isPlayerB && m.scoreB !== null) return m;
      return {
        ...m,
        scoreA: isPlayerA ? effectiveScore : m.scoreA,
        scoreB: isPlayerB ? effectiveScore : m.scoreB,
        playerATimeMs: isPlayerA ? myTimeMs : (m.playerATimeMs ?? null),
        playerBTimeMs: isPlayerB ? myTimeMs : (m.playerBTimeMs ?? null),
      };
    });

    const updatedTarget = withMySubmission.find(m => m.id === quizMatchId);
    if (!updatedTarget) return;

    let players = liveState.players;
    let matches = withMySubmission;
    const bothSubmitted = updatedTarget.scoreA !== null && updatedTarget.scoreB !== null;

    if (bothSubmitted) {
      const scoreA = updatedTarget.scoreA ?? 0;
      const scoreB = updatedTarget.scoreB ?? 0;
      let winnerId: string;
      let loserId: string;

      if (scoreA > scoreB) {
        winnerId = playerAId;
        loserId = playerBId;
      } else if (scoreB > scoreA) {
        winnerId = playerBId;
        loserId = playerAId;
      } else {
        const timeA = updatedTarget.playerATimeMs ?? Number.MAX_SAFE_INTEGER;
        const timeB = updatedTarget.playerBTimeMs ?? Number.MAX_SAFE_INTEGER;
        if (timeA <= timeB) {
          winnerId = playerAId;
          loserId = playerBId;
        } else {
          winnerId = playerBId;
          loserId = playerAId;
        }
      }

      matches = matches.map(m => m.id === updatedTarget.id
        ? { ...m, winnerId, loserId, status: 'finished' as MatchStatus }
        : m);

      players = liveState.players.map(p => {
        if (p.id === playerAId) {
          return { ...p, totalScore: p.totalScore + scoreA, status: p.id === loserId ? 'eliminated' as PlayerStatus : p.status };
        }
        if (p.id === playerBId) {
          return { ...p, totalScore: p.totalScore + scoreB, status: p.id === loserId ? 'eliminated' as PlayerStatus : p.status };
        }
        return p;
      });
    }

    setQuizMatchId(null);
    setQuizPos(0);
    setQuizScore(0);
    setQuizStartAt(null);
    setQuizDeadlineAt(null);
    setQuizSelected(null);
    setQuizFeedback(null);

    const advanced = computeNextStateAfterRound({ ...liveState, players, matches });
    await persist(advanced);
  };

  const answerQuizQuestion = (optionIndex: number) => {
    if (!quizQuestion || quizSelected !== null || quizSecondsLeft <= 0) return;
    setQuizSelected(optionIndex);
    const correct = optionIndex === quizQuestion.correctAnswer;
    setQuizFeedback(correct ? 'correct' : 'wrong');
    const earnedPoints = correct ? (POINTS[quizQuestion.difficulty] ?? 100) : 0;
    const nextScore = quizScore + earnedPoints;
    if (correct) setQuizScore(nextScore);
    if (!correct) setQuizDeadlineAt(prev => (prev ? Math.max(Date.now(), prev - 3000) : prev));

    window.setTimeout(async () => {
      if (quizDeadlineAt !== null && Date.now() >= quizDeadlineAt) {
        await submitMatchQuizScore(nextScore);
        return;
      }
      setQuizPos(prev => {
        if (!currentRoundQuestionOrder.length) return 0;
        return (prev + 1) % currentRoundQuestionOrder.length;
      });
      setQuizSelected(null);
      setQuizFeedback(null);
    }, 500);
  };

  const startNextRound = async () => {
    if (!tournament || tournament.status !== 'interval' || !isOrganizer) return;
    const hasScheduledInCurrent = tournament.matches.some(m => m.round === tournament.currentRound && m.status === 'scheduled');
    if (!hasScheduledInCurrent) return setMsg('Nenhuma partida pendente para iniciar nesta rodada.');
    const next: TournamentState = {
      ...tournament,
      status: 'in-progress',
      roundStartedAt: Date.now(),
      intervalEndsAt: null,
      matches: tournament.matches.map(m => m.round === tournament.currentRound && m.status === 'scheduled' ? { ...m, status: 'in-progress' as MatchStatus } : m),
    };
    await persist(next);
  };

  useEffect(() => {
    if (!tournament || tournament.status !== 'in-progress' || !myCurrentMatch || !currentRoundQuestionOrder.length || !tournament.roundStartedAt) {
      return;
    }
    const alreadySubmitted = myCurrentMatch.playerAId === profile.id
      ? myCurrentMatch.scoreA !== null
      : myCurrentMatch.scoreB !== null;
    if (alreadySubmitted) return;
    const roundStart = tournament.roundStartedAt;
    if (quizMatchId === myCurrentMatch.id) return;
    setQuizMatchId(myCurrentMatch.id);
    setQuizPos(0);
    setQuizScore(0);
    setQuizStartAt(roundStart);
    setQuizDeadlineAt(roundStart + ROUND_DURATION_MS);
    setQuizSelected(null);
    setQuizFeedback(null);
  }, [tournament, myCurrentMatch, currentRoundQuestionOrder.length, profile.id, quizMatchId]);

  useEffect(() => {
    if (!quizMatchId || quizDeadlineAt === null || quizSecondsLeft > 0) return;
    submitMatchQuizScore();
  }, [quizMatchId, quizDeadlineAt, quizSecondsLeft]);

  useEffect(() => {
    if (!tournament || tournament.status !== 'in-progress' || !tournament.roundStartedAt || autoResolvingRound) return;
    if (Date.now() < tournament.roundStartedAt + ROUND_DURATION_MS) return;

    const active = activeRoundMatches(tournament);
    if (!active.some(m => m.status === 'in-progress')) return;

    let players = tournament.players;
    const matches = tournament.matches.map(match => {
      if (match.round !== tournament.currentRound || match.status !== 'in-progress' || !match.playerAId || !match.playerBId) {
        return match;
      }

      const scoreA = match.scoreA ?? 0;
      const scoreB = match.scoreB ?? 0;
      const timeA = match.playerATimeMs ?? (ROUND_DURATION_MS + 1);
      const timeB = match.playerBTimeMs ?? (ROUND_DURATION_MS + 1);
      const winnerId = scoreA > scoreB ? match.playerAId : scoreB > scoreA ? match.playerBId : (timeA <= timeB ? match.playerAId : match.playerBId);
      const loserId = winnerId === match.playerAId ? match.playerBId : match.playerAId;

      players = players.map(p => {
        if (p.id === match.playerAId) {
          return { ...p, totalScore: p.totalScore + scoreA, status: p.id === loserId ? 'eliminated' as PlayerStatus : p.status };
        }
        if (p.id === match.playerBId) {
          return { ...p, totalScore: p.totalScore + scoreB, status: p.id === loserId ? 'eliminated' as PlayerStatus : p.status };
        }
        return p;
      });

      return {
        ...match,
        scoreA,
        scoreB,
        playerATimeMs: timeA,
        playerBTimeMs: timeB,
        winnerId,
        loserId,
        status: 'finished' as MatchStatus,
      };
    });

    const advanced = computeNextStateAfterRound({ ...tournament, players, matches });
    setAutoResolvingRound(true);
    persist(advanced).finally(() => setAutoResolvingRound(false));
  }, [tournament, autoResolvingRound]);

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
            <h2 className="text-3xl font-black text-white">Copa Cristão</h2>
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
              Disputa de 3º lugar
            </label>
            <div className="flex gap-2">
              <button onClick={createTournament} className="rounded-xl bg-emerald-500 px-4 py-3 text-white font-black">Criar Copa Cristão</button>
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
              <p className="text-white font-black">Entrar por código</p>
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
                      const joined = await ensurePlayerJoined(latest);
                      if (!joined.state) return setMsg(joined.error || 'Não foi possível entrar no torneio');
                      setTournament(joined.state);
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
            {quizMatchId && quizQuestion && (
              <div className="rounded-2xl bg-indigo-950/70 border border-indigo-300/30 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200 font-bold">Partida em andamento</p>
                <p className="mt-1 text-white font-black">Pergunta ativa da rodada</p>
                <p className="mt-1 text-indigo-200 text-xs font-bold">Tempo restante: {Math.floor(quizSecondsLeft / 60)}:{String(quizSecondsLeft % 60).padStart(2, '0')}</p>
                <p className="mt-3 text-white font-semibold">{quizQuestion.question}</p>
                {quizFeedback && (
                  <p className={`mt-2 text-sm font-black ${quizFeedback === 'correct' ? 'text-emerald-300' : 'text-red-300'}`}>
                    {quizFeedback === 'correct' ? 'Correto' : 'Errado'}
                  </p>
                )}
                <div className="mt-3 grid gap-2">
                  {quizQuestion.options.map((opt, idx) => {
                    const answered = quizSelected !== null;
                    const isCorrect = idx === quizQuestion.correctAnswer;
                    const isSelected = idx === quizSelected;
                    const cls = answered
                      ? (isCorrect ? 'bg-emerald-500/30 border-emerald-300 text-emerald-100' : isSelected ? 'bg-red-500/30 border-red-300 text-red-100' : 'bg-white/5 border-white/10 text-white/50')
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20';
                    return (
                      <button
                        key={idx}
                        disabled={answered}
                        onClick={() => answerQuizQuestion(idx)}
                        className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold transition-all ${cls}`}
                      >
                        <span className="mr-2 font-black opacity-60">{String.fromCharCode(65 + idx)}.</span>{opt}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-indigo-200 font-bold">Pontuacao parcial: {quizScore}</p>
              </div>
            )}

            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-wrap gap-3 items-center justify-between">
              <div>
                <p className="text-white font-black text-xl">{tournament.name} - {tournament.code}</p>
                <p className="text-white/50 text-sm">{tournament.players.length}/{tournament.size} jogadores</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigator.clipboard.writeText(tournament.code)} className="rounded-xl bg-white/10 px-3 py-2 text-white text-sm">Copiar código</button>
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
                    {tournament.status === 'interval'
                      ? <p className="text-amber-300 font-bold">Aguardando organizador</p>
                      : <p className="text-blue-300 font-bold">{tournament.status === 'finished' ? 'Finalizado' : `Ao vivo · ${Math.floor(Math.max(0, ROUND_DURATION_SECONDS - Math.floor((now - (tournament.roundStartedAt || now)) / 1000)) / 60)}:${String(Math.max(0, ROUND_DURATION_SECONDS - Math.floor((now - (tournament.roundStartedAt || now)) / 1000)) % 60).padStart(2, '0')}`}</p>}
                  </div>
                  <p className="mb-3 text-xs text-emerald-300 font-bold">Rodada por tempo: todos respondem simultaneamente por 2 minutos.</p>
                  <div className="space-y-3">
                    {Array.from(new Set(bracketVisibleMatches.map(m => m.round))).map(round => {
                      const roundMatches = bracketVisibleMatches.filter(m => m.round === round);
                      return (
                        <div key={round} className="rounded-xl border border-white/10 bg-slate-900/30 p-3">
                          <p className="text-white/70 text-xs uppercase tracking-[0.2em]">Rodada {round} {round === tournament.currentRound ? '· atual' : '· encerrada'}</p>
                          <div className="mt-3 space-y-3">
                            {roundMatches.map(match => {
                              const pa = playerById(tournament, match.playerAId);
                              const pb = playerById(tournament, match.playerBId);
                              const isMyMatch = match.playerAId === profile.id || match.playerBId === profile.id;
                              const mySubmitted = match.playerAId === profile.id
                                ? match.scoreA !== null
                                : (match.playerBId === profile.id ? match.scoreB !== null : false);
                              const statusLabel = match.status === 'in-progress'
                                ? 'EM JOGO'
                                : match.status === 'scheduled'
                                  ? 'AGUARDANDO'
                                  : 'ENCERRADO';
                              const statusClass = match.status === 'in-progress'
                                ? 'bg-emerald-500/20 text-emerald-200 border-emerald-300/30'
                                : match.status === 'scheduled'
                                  ? 'bg-amber-500/20 text-amber-200 border-amber-300/30'
                                  : 'bg-slate-500/20 text-slate-200 border-slate-300/30';
                              return (
                                <div key={match.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                                  <div className="flex items-center justify-between gap-2">
                                    <p className="text-white/60 text-xs uppercase">{match.label} - {match.bracket === 'main' ? 'Chave principal' : '3º lugar'}</p>
                                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-black ${statusClass}`}>{statusLabel}</span>
                                  </div>
                                  <p className="mt-2 text-white text-sm font-semibold">{pa ? `${pa.avatar} ${pa.name}` : '-'} <span className="text-white/50">vs</span> {pb ? `${pb.avatar} ${pb.name}` : '-'}</p>

                                  <div className="mt-2 grid grid-cols-[1fr,auto] items-center gap-2">
                                    <p className="text-white/70 text-xs">Placar</p>
                                    <p className="text-white font-bold">{match.scoreA ?? '-'} x {match.scoreB ?? '-'}</p>
                                  </div>

                                  {tournament.status === 'in-progress' && round === tournament.currentRound && match.status === 'in-progress' && isMyMatch && pa && pb && (
                                    <div className="mt-2">
                                      {mySubmitted ? (
                                        <p className="text-xs font-bold text-emerald-300">Sua pontuacao ja foi enviada. Aguardando adversario.</p>
                                      ) : (
                                        <p className="text-xs font-bold text-indigo-200">Confronto ativo: resposta por tempo (2 minutos).</p>
                                      )}
                                    </div>
                                  )}

                                  {match.winnerId && (
                                    <p className="mt-1 text-emerald-300 text-xs font-bold">Vencedor: {playerById(tournament, match.winnerId)?.name || '-'}</p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {tournament.status === 'interval' && (
                    <div className="mt-4 rounded-xl bg-amber-500/10 border border-amber-300/20 p-3">
                      <p className="text-amber-100 text-sm font-bold">Todos os confrontos da rodada foram finalizados.</p>
                      {isOrganizer ? (
                        <button onClick={startNextRound} className="mt-2 rounded-lg bg-emerald-500 px-3 py-2 text-white text-sm font-black">Iniciar proxima rodada</button>
                      ) : (
                        <p className="mt-2 text-xs text-amber-200">Aguardando o organizador iniciar a proxima rodada.</p>
                      )}
                    </div>
                  )}

                  {tournament.status === 'finished' && (
                    <div className="mt-4 rounded-xl bg-white/10 p-3">
                      <p className="text-white font-black">Pódio</p>
                      <p className="text-white text-sm mt-1">1º: {playerById(tournament, tournament.championId)?.name || '-'}</p>
                      <p className="text-white text-sm">2º: {playerById(tournament, tournament.runnerUpId)?.name || '-'}</p>
                      <p className="text-white text-sm">3º: {tournament.thirdPlaceEnabled ? (playerById(tournament, tournament.thirdPlaceId)?.name || '-') : 'Não habilitado'}</p>
                      {tournament.thirdPlaceEnabled && <p className="text-white text-sm">4º: {playerById(tournament, tournament.fourthPlaceId)?.name || '-'}</p>}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-white font-black mb-3">Pontuação dos membros</p>
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
