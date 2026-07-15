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
