import { createClient } from '@supabase/supabase-js';

const projectId = (import.meta.env.VITE_SUPABASE_PROJECT_ID as string) || 'vofhxedowvhphtmvxzgm';
const publicAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvZmh4ZWRvd3ZocGh0bXZ4emdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5NzcxMDMsImV4cCI6MjA5OTU1MzEwM30.2T5Yg0i4Xs8gRO9RUX1TKAhQBX6JymoO7QLhkYu8LSk';

const key = `__supabase_${projectId}__`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: ReturnType<typeof createClient> = (globalThis as any)[key] ??
  ((globalThis as any)[key] = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey,
    { auth: { persistSession: true, autoRefreshToken: true } }
  ));

// ─── Types ────────────────────────────────────────────────────────────────────

export type Profile = {
  id: string;
  username: string;
  avatar: string;
  friend_code: string;
  created_at: string;
};

export type ScoreRow = {
  id: string;
  user_id: string;
  score: number;
  correct: number;
  total: number;
  played_at: string;
  profiles?: Profile;
};

export type FriendRequest = {
  id: string;
  from_user_id: string;
  to_user_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  from_profile?: Profile;
};

export type Friendship = {
  id: string;
  user_id: string;
  friend_id: string;
  friend_profile?: Profile;
};

// ─── Auth ─────────────────────────────────────────────────────────────────────

export type AuthError = string | null;

function extractMessage(error: any): string {
  if (!error) return 'Erro desconhecido';
  if (typeof error === 'string') return error || 'Erro ao conectar. Tente novamente.';
  // Supabase 500 with empty body — usually email service rate limit or misconfiguration
  if (error.name === 'AuthRetryableFetchError' || error.status === 500) {
    return '❌ Erro no servidor de email. Desative "Confirm email" no painel do Supabase (Authentication → Providers → Email) ou aguarde alguns minutos e tente novamente.';
  }
  const msg = error.message || error.error_description || error.msg || error.error;
  if (msg && typeof msg === 'string' && msg !== '{}' && msg.trim()) return msg;
  const str = JSON.stringify(error);
  if (!str || str === '{}' || str === 'null') return 'Erro ao conectar. Tente novamente.';
  return str;
}

export async function signUp(email: string, password: string): Promise<AuthError> {
  try {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return extractMessage(error);
    return null;
  } catch (e: any) {
    return extractMessage(e);
  }
}

export async function signIn(email: string, password: string): Promise<AuthError> {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return extractMessage(error);
    return null;
  } catch (e: any) {
    return extractMessage(e);
  }
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function resetPassword(email: string): Promise<AuthError> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    return error ? extractMessage(error) : null;
  } catch (e: any) {
    return extractMessage(e);
  }
}

export async function updatePassword(newPassword: string): Promise<AuthError> {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return error ? extractMessage(error) : null;
  } catch (e: any) {
    return extractMessage(e);
  }
}

// ─── Profile ──────────────────────────────────────────────────────────────────

function generateFriendCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  if (error) return null;
  return data;
}

export async function checkDbReady(): Promise<boolean> {
  const { error } = await supabase.from('profiles').select('id').limit(1);
  // code 42P01 = relation does not exist
  return !error || (!error.message?.includes('does not exist') && error.code !== '42P01');
}

async function isUsernameTaken(username: string, exceptUserId?: string): Promise<boolean> {
  let q = supabase.from('profiles').select('id').ilike('username', username).limit(1);
  if (exceptUserId) q = q.neq('id', exceptUserId);
  const { data, error } = await q;
  if (error) throw error;
  return Array.isArray(data) && data.length > 0;
}

export async function createProfile(userId: string, username: string, avatar: string): Promise<AuthError> {
  try {
    if (await isUsernameTaken(username)) {
      return 'Username already taken.';
    }
    const { error } = await supabase.from('profiles').insert({
      id: userId,
      username,
      avatar,
      friend_code: generateFriendCode(),
    });
    if (!error) return null;
    const msg = extractMessage(error);
    // If friend_code conflict, retry once
    if (msg.includes('friend_code')) {
      const { error: e2 } = await supabase.from('profiles').insert({
        id: userId, username, avatar, friend_code: generateFriendCode(),
      });
      if (!e2) return null;
      const msg2 = extractMessage(e2);
      if (msg2.includes('username') || msg2.includes('duplicate')) return 'Username already taken.';
      return msg2;
    }
    if (msg.includes('username') || msg.includes('duplicate')) {
      return 'Username already taken.';
    }
    // If table doesn't exist, give a clear hint
    if (msg.includes('does not exist') || msg.includes('42P01')) {
      return '⚠️ Banco não configurado. Execute o SQL no painel do Supabase primeiro.';
    }
    return msg;
  } catch (e: any) {
    return extractMessage(e);
  }
}

export async function updateProfile(userId: string, username: string, avatar: string): Promise<AuthError> {
  try {
    if (await isUsernameTaken(username, userId)) {
      return 'Username already taken.';
    }
    const { error } = await supabase.from('profiles').update({ username, avatar }).eq('id', userId);
    if (!error) return null;
    const msg = extractMessage(error);
    return msg.includes('username') || msg.includes('duplicate') ? 'Username already taken.' : msg;
  } catch (e: any) {
    return extractMessage(e);
  }
}

// ─── Scores ───────────────────────────────────────────────────────────────────

export async function saveScore(
  userId: string, score: number, correct: number, total: number
): Promise<void> {
  await supabase.from('scores').insert({ user_id: userId, score, correct, total });
}

export async function getGlobalRanking(period: 'week' | 'all'): Promise<ScoreRow[]> {
  let q = supabase
    .from('scores')
    .select('id,user_id,score,correct,total,played_at,profiles(id,username,avatar,friend_code)')
    .order('score', { ascending: false })
    .limit(100);
  if (period === 'week')
    q = q.gte('played_at', new Date(Date.now() - 7 * 86400000).toISOString());
  const { data } = await q;
  const seen = new Map<string, ScoreRow>();
  for (const r of (data as any[]) ?? []) {
    if (!seen.has(r.user_id) || r.score > seen.get(r.user_id)!.score) seen.set(r.user_id, r);
  }
  return Array.from(seen.values()).sort((a, b) => b.score - a.score).slice(0, 20);
}

export async function getMyBestScore(userId: string): Promise<ScoreRow | null> {
  const { data } = await supabase
    .from('scores').select('*').eq('user_id', userId)
    .order('score', { ascending: false }).limit(1).maybeSingle();
  return data;
}

// ─── Friends ──────────────────────────────────────────────────────────────────

export async function getFriendsWeeklyBest(
  ids: string[]
): Promise<{ userId: string; profile: Profile; bestScore: number }[]> {
  if (!ids.length) return [];
  const { data } = await supabase
    .from('scores')
    .select('user_id,score,profiles(id,username,avatar,friend_code)')
    .in('user_id', ids)
    .gte('played_at', new Date(Date.now() - 7 * 86400000).toISOString())
    .order('score', { ascending: false });
  const map = new Map<string, { userId: string; profile: Profile; bestScore: number }>();
  for (const r of (data as any[]) ?? [])
    if (!map.has(r.user_id)) map.set(r.user_id, { userId: r.user_id, profile: r.profiles, bestScore: r.score });
  return Array.from(map.values()).sort((a, b) => b.bestScore - a.bestScore);
}

export async function searchProfileByCode(code: string): Promise<Profile | null> {
  const { data } = await supabase.from('profiles').select('*').eq('friend_code', code.trim()).maybeSingle();
  return data;
}

export async function sendFriendRequest(fromId: string, toId: string): Promise<AuthError> {
  const { error } = await supabase.from('friend_requests')
    .upsert({ from_user_id: fromId, to_user_id: toId, status: 'pending' }, { onConflict: 'from_user_id,to_user_id' });
  return error ? extractMessage(error) : null;
}

export async function getPendingRequests(userId: string): Promise<FriendRequest[]> {
  const { data } = await supabase
    .from('friend_requests')
    .select('*,from_profile:profiles!friend_requests_from_user_id_fkey(id,username,avatar,friend_code)')
    .eq('to_user_id', userId).eq('status', 'pending');
  return (data as any[]) ?? [];
}

export async function getSentRequests(userId: string): Promise<FriendRequest[]> {
  const { data } = await supabase
    .from('friend_requests')
    .select('*,to_profile:profiles!friend_requests_to_user_id_fkey(id,username,avatar,friend_code)')
    .eq('from_user_id', userId).eq('status', 'pending');
  return (data as any[]) ?? [];
}

export async function respondToRequest(
  requestId: string, accept: boolean, fromId: string, toId: string
): Promise<void> {
  await supabase.from('friend_requests')
    .update({ status: accept ? 'accepted' : 'rejected' }).eq('id', requestId);
  if (accept) {
    await supabase.from('friendships').upsert([
      { user_id: fromId, friend_id: toId },
      { user_id: toId, friend_id: fromId },
    ], { onConflict: 'user_id,friend_id' });
  }
}

export async function getFriendships(userId: string): Promise<Friendship[]> {
  const { data } = await supabase
    .from('friendships')
    .select('*,friend_profile:profiles!friendships_friend_id_fkey(id,username,avatar,friend_code)')
    .eq('user_id', userId);
  return (data as any[]) ?? [];
}

export async function removeFriend(userId: string, friendId: string): Promise<void> {
  await supabase.from('friendships').delete().eq('user_id', userId).eq('friend_id', friendId);
  await supabase.from('friendships').delete().eq('user_id', friendId).eq('friend_id', userId);
}

export async function reportProfile(reporterId: string, reportedUserId: string, reason = ''): Promise<AuthError> {
  try {
    const { error } = await supabase.from('reports').insert({
      reporter_id: reporterId,
      reported_user_id: reportedUserId,
      reason,
    });
    return error ? extractMessage(error) : null;
  } catch (e: any) {
    return extractMessage(e);
  }
}

// ─── Copa Cristão (Tournament State Sync) ───────────────────────────────────

export type TournamentStateStatus = 'waiting' | 'in-progress' | 'interval' | 'finished' | 'cancelled';

export type TournamentStateRow = {
  id: string;
  code: string;
  name: string;
  organizer_id: string;
  status: TournamentStateStatus;
  state: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type TournamentInviteRow = {
  id: string;
  tournament_id: string;
  organizer_id: string;
  invited_user_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  responded_at: string | null;
};

const TOURNAMENT_STATE_FALLBACK_KEY = 'bom-biblia-tournament-states-fallback';
const TOURNAMENT_INVITE_FALLBACK_KEY = 'bom-biblia-tournament-invites-fallback';

function isMissingTournamentTables(message: string | null | undefined): boolean {
  if (!message) return false;
  const m = message.toLowerCase();
  return (
    m.includes("could not find the table 'public.tournament_states'") ||
    m.includes("could not find the table 'public.tournament_invites'") ||
    m.includes('relation "tournament_states" does not exist') ||
    m.includes('relation "tournament_invites" does not exist') ||
    m.includes('42p01')
  );
}

function nowIso(): string {
  return new Date().toISOString();
}

function readFallbackRows<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]') as T[];
  } catch {
    return [];
  }
}

function writeFallbackRows<T>(key: string, rows: T[]): void {
  localStorage.setItem(key, JSON.stringify(rows));
}

function fallbackId(prefix: string): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function createTournamentState(
  code: string,
  name: string,
  organizerId: string,
  state: Record<string, any>,
  status: TournamentStateStatus = 'waiting'
): Promise<{ row: TournamentStateRow | null; error: AuthError }> {
  try {
    const { data, error } = await supabase
      .from('tournament_states')
      .insert({ code, name, organizer_id: organizerId, status, state })
      .select('*')
      .single();

    if (error) {
      const msg = extractMessage(error);
      if (isMissingTournamentTables(msg)) {
        const row: TournamentStateRow = {
          id: fallbackId('tournament'),
          code,
          name,
          organizer_id: organizerId,
          status,
          state,
          created_at: nowIso(),
          updated_at: nowIso(),
        };
        const rows = readFallbackRows<TournamentStateRow>(TOURNAMENT_STATE_FALLBACK_KEY);
        rows.push(row);
        writeFallbackRows(TOURNAMENT_STATE_FALLBACK_KEY, rows);
        return { row, error: null };
      }
      return { row: null, error: msg };
    }

    return { row: (data as TournamentStateRow) ?? null, error: null };
  } catch (e: any) {
    const msg = extractMessage(e);
    if (isMissingTournamentTables(msg)) {
      const row: TournamentStateRow = {
        id: fallbackId('tournament'),
        code,
        name,
        organizer_id: organizerId,
        status,
        state,
        created_at: nowIso(),
        updated_at: nowIso(),
      };
      const rows = readFallbackRows<TournamentStateRow>(TOURNAMENT_STATE_FALLBACK_KEY);
      rows.push(row);
      writeFallbackRows(TOURNAMENT_STATE_FALLBACK_KEY, rows);
      return { row, error: null };
    }
    return { row: null, error: msg };
  }
}

export async function getTournamentStateById(id: string): Promise<TournamentStateRow | null> {
  const { data, error } = await supabase
    .from('tournament_states')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error && isMissingTournamentTables(extractMessage(error))) {
    const rows = readFallbackRows<TournamentStateRow>(TOURNAMENT_STATE_FALLBACK_KEY);
    return rows.find(r => r.id === id) ?? null;
  }
  return (data as TournamentStateRow) ?? null;
}

export async function getTournamentStateByCode(code: string): Promise<TournamentStateRow | null> {
  const { data, error } = await supabase
    .from('tournament_states')
    .select('*')
    .eq('code', code)
    .maybeSingle();
  if (error && isMissingTournamentTables(extractMessage(error))) {
    const rows = readFallbackRows<TournamentStateRow>(TOURNAMENT_STATE_FALLBACK_KEY);
    return rows.find(r => r.code === code) ?? null;
  }
  return (data as TournamentStateRow) ?? null;
}

export async function listOpenTournamentStates(): Promise<TournamentStateRow[]> {
  const { data, error } = await supabase
    .from('tournament_states')
    .select('*')
    .in('status', ['waiting', 'in-progress', 'interval'])
    .order('updated_at', { ascending: false })
    .limit(100);
  if (error && isMissingTournamentTables(extractMessage(error))) {
    return readFallbackRows<TournamentStateRow>(TOURNAMENT_STATE_FALLBACK_KEY)
      .filter(r => ['waiting', 'in-progress', 'interval'].includes(r.status))
      .sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || ''));
  }
  return ((data as TournamentStateRow[]) ?? []);
}

export async function closeExpiredEmptyWaitingTournaments(maxIdleMinutes = 10): Promise<AuthError> {
  const cutoffMs = Date.now() - Math.max(1, maxIdleMinutes) * 60 * 1000;

  const isStaleAndEmpty = (row: TournamentStateRow) => {
    const updatedMs = Date.parse(row.updated_at || row.created_at || '');
    const players = Array.isArray((row.state as any)?.players) ? ((row.state as any).players as any[]) : [];
    return Number.isFinite(updatedMs) && updatedMs <= cutoffMs && players.length === 0;
  };

  try {
    const { data, error } = await supabase
      .from('tournament_states')
      .select('*')
      .eq('status', 'waiting')
      .limit(200);

    if (error) {
      const msg = extractMessage(error);
      if (isMissingTournamentTables(msg)) {
        const rows = readFallbackRows<TournamentStateRow>(TOURNAMENT_STATE_FALLBACK_KEY);
        const nextRows = rows.map(row => {
          if (row.status !== 'waiting') return row;
          if (!isStaleAndEmpty(row)) return row;
          return { ...row, status: 'cancelled' as TournamentStateStatus, updated_at: nowIso() };
        });
        writeFallbackRows(TOURNAMENT_STATE_FALLBACK_KEY, nextRows);
        return null;
      }
      return msg;
    }

    const waitingRows = (data as TournamentStateRow[]) ?? [];
    const staleRows = waitingRows.filter(isStaleAndEmpty);
    for (const row of staleRows) {
      const { error: updateError } = await supabase
        .from('tournament_states')
        .update({ status: 'cancelled' as TournamentStateStatus })
        .eq('id', row.id)
        .eq('status', 'waiting');
      if (updateError) return extractMessage(updateError);
    }

    return null;
  } catch (e: any) {
    const msg = extractMessage(e);
    if (isMissingTournamentTables(msg)) {
      const rows = readFallbackRows<TournamentStateRow>(TOURNAMENT_STATE_FALLBACK_KEY);
      const nextRows = rows.map(row => {
        if (row.status !== 'waiting') return row;
        if (!isStaleAndEmpty(row)) return row;
        return { ...row, status: 'cancelled' as TournamentStateStatus, updated_at: nowIso() };
      });
      writeFallbackRows(TOURNAMENT_STATE_FALLBACK_KEY, nextRows);
      return null;
    }
    return msg;
  }
}

export async function updateTournamentState(
  id: string,
  state: Record<string, any>,
  status?: TournamentStateStatus
): Promise<AuthError> {
  try {
    const payload: Record<string, any> = { state };
    if (status) payload.status = status;
    const { error } = await supabase
      .from('tournament_states')
      .update(payload)
      .eq('id', id);
    if (error) {
      const msg = extractMessage(error);
      if (isMissingTournamentTables(msg)) {
        const rows = readFallbackRows<TournamentStateRow>(TOURNAMENT_STATE_FALLBACK_KEY);
        const idx = rows.findIndex(r => r.id === id);
        if (idx >= 0) {
          rows[idx] = {
            ...rows[idx],
            state,
            status: status ?? rows[idx].status,
            updated_at: nowIso(),
          };
          writeFallbackRows(TOURNAMENT_STATE_FALLBACK_KEY, rows);
          return null;
        }
      }
      return msg;
    }
    return null;
  } catch (e: any) {
    const msg = extractMessage(e);
    if (isMissingTournamentTables(msg)) {
      const rows = readFallbackRows<TournamentStateRow>(TOURNAMENT_STATE_FALLBACK_KEY);
      const idx = rows.findIndex(r => r.id === id);
      if (idx >= 0) {
        rows[idx] = {
          ...rows[idx],
          state,
          status: status ?? rows[idx].status,
          updated_at: nowIso(),
        };
        writeFallbackRows(TOURNAMENT_STATE_FALLBACK_KEY, rows);
        return null;
      }
    }
    return msg;
  }
}

export async function deleteTournamentState(id: string): Promise<AuthError> {
  try {
    const { error } = await supabase
      .from('tournament_states')
      .delete()
      .eq('id', id);
    if (error) {
      const msg = extractMessage(error);
      if (isMissingTournamentTables(msg)) {
        const rows = readFallbackRows<TournamentStateRow>(TOURNAMENT_STATE_FALLBACK_KEY)
          .filter(r => r.id !== id);
        writeFallbackRows(TOURNAMENT_STATE_FALLBACK_KEY, rows);
        const invites = readFallbackRows<TournamentInviteRow>(TOURNAMENT_INVITE_FALLBACK_KEY)
          .filter(i => i.tournament_id !== id);
        writeFallbackRows(TOURNAMENT_INVITE_FALLBACK_KEY, invites);
        return null;
      }
      return msg;
    }
    return null;
  } catch (e: any) {
    const msg = extractMessage(e);
    if (isMissingTournamentTables(msg)) {
      const rows = readFallbackRows<TournamentStateRow>(TOURNAMENT_STATE_FALLBACK_KEY)
        .filter(r => r.id !== id);
      writeFallbackRows(TOURNAMENT_STATE_FALLBACK_KEY, rows);
      const invites = readFallbackRows<TournamentInviteRow>(TOURNAMENT_INVITE_FALLBACK_KEY)
        .filter(i => i.tournament_id !== id);
      writeFallbackRows(TOURNAMENT_INVITE_FALLBACK_KEY, invites);
      return null;
    }
    return msg;
  }
}

export async function createTournamentInvite(
  tournamentId: string,
  organizerId: string,
  invitedUserId: string
): Promise<AuthError> {
  try {
    const { error } = await supabase
      .from('tournament_invites')
      .upsert(
        {
          tournament_id: tournamentId,
          organizer_id: organizerId,
          invited_user_id: invitedUserId,
          status: 'pending',
          responded_at: null,
        },
        { onConflict: 'tournament_id,invited_user_id' }
      );
    if (error) {
      const msg = extractMessage(error);
      if (isMissingTournamentTables(msg)) {
        const invites = readFallbackRows<TournamentInviteRow>(TOURNAMENT_INVITE_FALLBACK_KEY);
        const idx = invites.findIndex(i => i.tournament_id === tournamentId && i.invited_user_id === invitedUserId);
        const row: TournamentInviteRow = {
          id: idx >= 0 ? invites[idx].id : fallbackId('invite'),
          tournament_id: tournamentId,
          organizer_id: organizerId,
          invited_user_id: invitedUserId,
          status: 'pending',
          created_at: idx >= 0 ? invites[idx].created_at : nowIso(),
          responded_at: null,
        };
        if (idx >= 0) invites[idx] = row; else invites.push(row);
        writeFallbackRows(TOURNAMENT_INVITE_FALLBACK_KEY, invites);
        return null;
      }
      return msg;
    }
    return null;
  } catch (e: any) {
    const msg = extractMessage(e);
    if (isMissingTournamentTables(msg)) {
      const invites = readFallbackRows<TournamentInviteRow>(TOURNAMENT_INVITE_FALLBACK_KEY);
      const idx = invites.findIndex(i => i.tournament_id === tournamentId && i.invited_user_id === invitedUserId);
      const row: TournamentInviteRow = {
        id: idx >= 0 ? invites[idx].id : fallbackId('invite'),
        tournament_id: tournamentId,
        organizer_id: organizerId,
        invited_user_id: invitedUserId,
        status: 'pending',
        created_at: idx >= 0 ? invites[idx].created_at : nowIso(),
        responded_at: null,
      };
      if (idx >= 0) invites[idx] = row; else invites.push(row);
      writeFallbackRows(TOURNAMENT_INVITE_FALLBACK_KEY, invites);
      return null;
    }
    return msg;
  }
}

export async function listTournamentInvitesForUser(userId: string): Promise<TournamentInviteRow[]> {
  const { data, error } = await supabase
    .from('tournament_invites')
    .select('*')
    .eq('invited_user_id', userId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  if (error && isMissingTournamentTables(extractMessage(error))) {
    return readFallbackRows<TournamentInviteRow>(TOURNAMENT_INVITE_FALLBACK_KEY)
      .filter(i => i.invited_user_id === userId && i.status === 'pending')
      .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  }
  return ((data as TournamentInviteRow[]) ?? []);
}

export async function listTournamentInvitesForOrganizer(tournamentId: string): Promise<TournamentInviteRow[]> {
  const { data, error } = await supabase
    .from('tournament_invites')
    .select('*')
    .eq('tournament_id', tournamentId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  if (error && isMissingTournamentTables(extractMessage(error))) {
    return readFallbackRows<TournamentInviteRow>(TOURNAMENT_INVITE_FALLBACK_KEY)
      .filter(i => i.tournament_id === tournamentId && i.status === 'pending')
      .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  }
  return ((data as TournamentInviteRow[]) ?? []);
}

export async function respondTournamentInvite(
  inviteId: string,
  status: 'accepted' | 'declined'
): Promise<AuthError> {
  try {
    const { error } = await supabase
      .from('tournament_invites')
      .update({ status, responded_at: new Date().toISOString() })
      .eq('id', inviteId);
    if (error) {
      const msg = extractMessage(error);
      if (isMissingTournamentTables(msg)) {
        const invites = readFallbackRows<TournamentInviteRow>(TOURNAMENT_INVITE_FALLBACK_KEY);
        const idx = invites.findIndex(i => i.id === inviteId);
        if (idx >= 0) {
          invites[idx] = { ...invites[idx], status, responded_at: nowIso() };
          writeFallbackRows(TOURNAMENT_INVITE_FALLBACK_KEY, invites);
          return null;
        }
      }
      return msg;
    }
    return null;
  } catch (e: any) {
    const msg = extractMessage(e);
    if (isMissingTournamentTables(msg)) {
      const invites = readFallbackRows<TournamentInviteRow>(TOURNAMENT_INVITE_FALLBACK_KEY);
      const idx = invites.findIndex(i => i.id === inviteId);
      if (idx >= 0) {
        invites[idx] = { ...invites[idx], status, responded_at: nowIso() };
        writeFallbackRows(TOURNAMENT_INVITE_FALLBACK_KEY, invites);
        return null;
      }
    }
    return msg;
  }
}
