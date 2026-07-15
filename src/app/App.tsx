import { useState, useEffect, useCallback, useRef } from 'react';
import { Session } from '@supabase/supabase-js';
import { questions } from './data/questions';
import { questionTranslations } from './data/questionTranslations';
import {
  supabase, Profile, ScoreRow, FriendRequest, Friendship,
  signUp, signIn, signOut, resetPassword, updatePassword,
  checkDbReady, getProfile, createProfile, updateProfile,
  saveScore, getGlobalRanking, getMyBestScore, getFriendsWeeklyBest,
  searchProfileByCode, sendFriendRequest,
  getPendingRequests, getSentRequests, respondToRequest,
  getFriendships, removeFriend,
} from '../utils/supabaseClient';

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = 'loading' | 'auth' | 'profile-setup' | 'home' | 'countdown' | 'game' | 'result';
type Tab = 'play' | 'ranking' | 'friends';
type Lang = 'pt' | 'en' | 'es';
type AuthMode = 'signin' | 'signup' | 'reset' | 'new-password';

// ─── Constants ────────────────────────────────────────────────────────────────

const ROUND_SECONDS = 120;
const MAX_BIBLE_HELPS = 3;
const POINTS: Record<string, number> = { 'Fácil': 100, 'Médio': 200, 'Difícil': 300, 'Expert': 500 };

const AVATARS = ['😊','🦁','🐯','🦊','🐻','🐼','🦅','🦉','🐬','🦋',
                 '⚡','🔥','🌟','🎯','📖','✝️','🕊️','🌈','👑','🏆'];

const CATEGORY_COLORS: Record<string, string> = {
  'Pentateuco': 'from-amber-500 to-yellow-600', 'Históricos': 'from-blue-500 to-blue-700',
  'Poéticos': 'from-purple-500 to-purple-700', 'Proféticos': 'from-red-500 to-red-700',
  'Evangelhos': 'from-emerald-500 to-green-700', 'Cartas': 'from-teal-500 to-cyan-700',
};
const DIFF_BADGE: Record<string, string> = {
  'Fácil': 'bg-emerald-500', 'Médio': 'bg-amber-500', 'Difícil': 'bg-orange-500', 'Expert': 'bg-red-600',
};

// ─── i18n ─────────────────────────────────────────────────────────────────────

const i18n = {
  pt: {
    appTitle: 'BOM DE BÍBLIA',
    // Auth
    signIn: 'Entrar', signUp: 'Criar conta', signOut: 'Sair',
    email: 'Email', password: 'Senha', confirmPassword: 'Confirmar senha',
    emailPlaceholder: 'seu@email.com', passwordPlaceholder: '••••••••',
    enterBtn: 'Entrar', createBtn: 'Criar conta',
    noAccount: 'Não tem conta?', haveAccount: 'Já tem conta?',
    forgotPassword: 'Esqueci minha senha', sendReset: 'Enviar link de recuperação',
    resetSent: 'Link enviado! Verifique seu email.',
    backToLogin: 'Voltar ao login',
    passwordMismatch: 'As senhas não coincidem',
    passwordShort: 'Mínimo de 6 caracteres',
    emailInvalid: 'Email inválido',
    checkEmailConfirm: '✉️ Confirme seu email antes de entrar. Verifique sua caixa de entrada.',
    newPassword: 'Nova senha', newPasswordTitle: 'Definir nova senha',
    newPasswordBtn: 'Salvar nova senha', newPasswordSuccess: 'Senha alterada! Faça login.',
    // Profile setup
    setupTitle: 'Configure seu perfil',
    setupSub: 'Escolha como quer aparecer no ranking',
    yourName: 'Seu nome no jogo', namePlaceholder: 'Como quer ser chamado?',
    chooseAvatar: 'Escolha seu avatar', saveProfile: 'Salvar e Jogar',
    nameRequired: 'Digite seu nome',
    // Home
    tabPlay: 'Jogar', tabRanking: 'Ranking', tabFriends: 'Amigos',
    playNow: 'JOGAR AGORA',
    yourCode: 'Seu código de crente', copyCode: 'Copiar', copied: 'Copiado!',
    shareCode: 'Compartilhe para adicionar amigos',
    allTimeBest: 'Seu melhor', editProfile: 'Editar perfil',
    // Ranking
    globalRanking: 'Ranking Global', week: 'Semana', allTime: 'Geral', noScores: 'Sem pontuações ainda',
    // Friends
    addFriend: 'Adicionar Amigo', addFriendDesc: 'Buscar pelo código de 6 dígitos',
    friendCodeLabel: 'Código do crente', search: 'Buscar', send: 'Adicionar',
    pending: 'Enviado', accept: 'Aceitar', reject: 'Recusar',
    noFriends: 'Nenhum amigo ainda', noFriendsDesc: 'Use o código de 6 dígitos para encontrar crentes',
    friendRequests: 'Pedidos recebidos', sentRequests: 'Pedidos enviados',
    bestThisWeek: 'Melhor na semana', noScoreYet: 'Sem pontos',
    remove: 'Remover', userNotFound: 'Usuário não encontrado',
    alreadyFriend: 'Já são amigos', requestSent: 'Pedido enviado!',
    errorSending: 'Erro ao enviar', cannotAddSelf: 'Você não pode adicionar a si mesmo',
    // Game
    go: 'VAI!', timeLeft: 'Tempo', score: 'Pontos', bibleHelp: 'Bíblia',
    correctBanner: '✓ CORRETO!', wrongBanner: '✗ ERRADO', timeUp: 'Tempo esgotado!',
    yourScore: 'Sua Pontuação', answered: 'Respondidas', accuracy: 'Acertos',
    playAgain: 'Jogar Novamente', backHome: 'Início',
    bibleVerse: 'Versículo', closeBible: 'Fechar',
    pts: 'pts', you: 'você', rankThisWeek: 'esta semana',
    loading: 'Carregando...',
    abandonGame: 'Sair', abandonConfirm: 'Abandonar partida?', abandonYes: 'Sim', abandonNo: 'Não',
  },
  en: {
    appTitle: 'BOM DE BÍBLIA',
    signIn: 'Sign in', signUp: 'Create account', signOut: 'Sign out',
    email: 'Email', password: 'Password', confirmPassword: 'Confirm password',
    emailPlaceholder: 'you@email.com', passwordPlaceholder: '••••••••',
    enterBtn: 'Sign in', createBtn: 'Create account',
    noAccount: "Don't have an account?", haveAccount: 'Already have an account?',
    forgotPassword: 'Forgot password', sendReset: 'Send reset link',
    resetSent: 'Link sent! Check your email.',
    backToLogin: 'Back to login',
    passwordMismatch: 'Passwords do not match',
    passwordShort: 'Minimum 6 characters',
    emailInvalid: 'Invalid email',
    checkEmailConfirm: '✉️ Please confirm your email before signing in. Check your inbox.',
    newPassword: 'New password', newPasswordTitle: 'Set new password',
    newPasswordBtn: 'Save new password', newPasswordSuccess: 'Password changed! Please sign in.',
    setupTitle: 'Set up your profile',
    setupSub: 'Choose how you appear in the ranking',
    yourName: 'Your game name', namePlaceholder: 'What should we call you?',
    chooseAvatar: 'Choose your avatar', saveProfile: 'Save & Play',
    nameRequired: 'Enter your name',
    tabPlay: 'Play', tabRanking: 'Ranking', tabFriends: 'Friends',
    playNow: 'PLAY NOW',
    yourCode: 'Your friend code', copyCode: 'Copy', copied: 'Copied!',
    shareCode: 'Share to add friends',
    allTimeBest: 'Your best', editProfile: 'Edit profile',
    globalRanking: 'Global Ranking', week: 'Week', allTime: 'All Time', noScores: 'No scores yet',
    addFriend: 'Add Friend', addFriendDesc: 'Search by 6-digit code',
    friendCodeLabel: "Friend's code", search: 'Search', send: 'Add',
    pending: 'Sent', accept: 'Accept', reject: 'Decline',
    noFriends: 'No friends yet', noFriendsDesc: 'Use the 6-digit code to find friends',
    friendRequests: 'Received requests', sentRequests: 'Sent requests',
    bestThisWeek: 'Best this week', noScoreYet: 'No score',
    remove: 'Remove', userNotFound: 'User not found',
    alreadyFriend: 'Already friends', requestSent: 'Request sent!',
    errorSending: 'Error sending', cannotAddSelf: "You can't add yourself",
    go: 'GO!', timeLeft: 'Time', score: 'Score', bibleHelp: 'Bible',
    correctBanner: '✓ CORRECT!', wrongBanner: '✗ WRONG', timeUp: "Time's up!",
    yourScore: 'Your Score', answered: 'Answered', accuracy: 'Accuracy',
    playAgain: 'Play Again', backHome: 'Home',
    bibleVerse: 'Verse', closeBible: 'Close',
    pts: 'pts', you: 'you', rankThisWeek: 'this week',
    loading: 'Loading...',
    abandonGame: 'Quit', abandonConfirm: 'Abandon game?', abandonYes: 'Yes', abandonNo: 'No',
  },
  es: {
    appTitle: 'BOM DE BÍBLIA',
    signIn: 'Entrar', signUp: 'Crear cuenta', signOut: 'Salir',
    email: 'Email', password: 'Contraseña', confirmPassword: 'Confirmar contraseña',
    emailPlaceholder: 'tu@email.com', passwordPlaceholder: '••••••••',
    enterBtn: 'Entrar', createBtn: 'Crear cuenta',
    noAccount: '¿No tienes cuenta?', haveAccount: '¿Ya tienes cuenta?',
    forgotPassword: 'Olvidé mi contraseña', sendReset: 'Enviar enlace',
    resetSent: '¡Enlace enviado! Revisa tu email.',
    backToLogin: 'Volver al login',
    passwordMismatch: 'Las contraseñas no coinciden',
    passwordShort: 'Mínimo 6 caracteres',
    emailInvalid: 'Email inválido',
    checkEmailConfirm: '✉️ Confirma tu email antes de entrar. Revisa tu bandeja de entrada.',
    newPassword: 'Nueva contraseña', newPasswordTitle: 'Establecer nueva contraseña',
    newPasswordBtn: 'Guardar nueva contraseña', newPasswordSuccess: '¡Contraseña cambiada! Inicia sesión.',
    setupTitle: 'Configura tu perfil',
    setupSub: 'Elige cómo aparecer en el ranking',
    yourName: 'Tu nombre en el juego', namePlaceholder: '¿Cómo quieres que te llamen?',
    chooseAvatar: 'Elige tu avatar', saveProfile: 'Guardar y Jugar',
    nameRequired: 'Ingresa tu nombre',
    tabPlay: 'Jugar', tabRanking: 'Ranking', tabFriends: 'Amigos',
    playNow: 'JUGAR AHORA',
    yourCode: 'Tu código de amigo', copyCode: 'Copiar', copied: '¡Copiado!',
    shareCode: 'Comparte para agregar amigos',
    allTimeBest: 'Tu mejor', editProfile: 'Editar perfil',
    globalRanking: 'Ranking Global', week: 'Semana', allTime: 'General', noScores: 'Sin puntuaciones',
    addFriend: 'Agregar Amigo', addFriendDesc: 'Buscar por código de 6 dígitos',
    friendCodeLabel: 'Código del amigo', search: 'Buscar', send: 'Agregar',
    pending: 'Enviado', accept: 'Aceptar', reject: 'Rechazar',
    noFriends: 'Sin amigos aún', noFriendsDesc: 'Usa el código de 6 dígitos para encontrar amigos',
    friendRequests: 'Solicitudes recibidas', sentRequests: 'Solicitudes enviadas',
    bestThisWeek: 'Mejor esta semana', noScoreYet: 'Sin puntos',
    remove: 'Eliminar', userNotFound: 'Usuario no encontrado',
    alreadyFriend: 'Ya son amigos', requestSent: '¡Solicitud enviada!',
    errorSending: 'Error al enviar', cannotAddSelf: 'No puedes agregarte a ti mismo',
    go: '¡VAMOS!', timeLeft: 'Tiempo', score: 'Puntos', bibleHelp: 'Biblia',
    correctBanner: '✓ ¡CORRECTO!', wrongBanner: '✗ INCORRECTO', timeUp: '¡Tiempo agotado!',
    yourScore: 'Tu Puntuación', answered: 'Respondidas', accuracy: 'Aciertos',
    playAgain: 'Jugar de Nuevo', backHome: 'Inicio',
    bibleVerse: 'Versículo', closeBible: 'Cerrar',
    pts: 'pts', you: 'tú', rankThisWeek: 'esta semana',
    abandonGame: 'Salir', abandonConfirm: '¿Abandonar partida?', abandonYes: 'Sí', abandonNo: 'No',
    loading: 'Cargando...',
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadLang(): Lang {
  return (localStorage.getItem('bom-biblia-lang') as Lang) || 'pt';
}

function getQ(idx: number, lang: Lang) {
  const q = questions[idx];
  if (lang === 'pt') return q;
  const t = questionTranslations[lang]?.[idx];
  if (!t) return q;
  return { ...q, question: t.question, options: t.options, verse: t.verse ?? q.verse };
}

// Retorna a pergunta com opções embaralhadas e correctAnswer atualizado
function getQShuffled(idx: number, lang: Lang) {
  const q = getQ(idx, lang);
  const order = shuffle([0, 1, 2, 3]);
  return {
    ...q,
    options: order.map(i => q.options[i]),
    correctAnswer: order.indexOf(q.correctAnswer),
  };
}

const SEEN_KEY = 'bom-biblia-seen';
const TOTAL = questions.length;

// Groups question indices by category, shuffled within each group
function groupByCategory(): Map<string, number[]> {
  const map = new Map<string, number[]>();
  questions.forEach((q, i) => {
    if (!map.has(q.category)) map.set(q.category, []);
    map.get(q.category)!.push(i);
  });
  map.forEach((arr, cat) => map.set(cat, shuffle(arr)));
  return map;
}

function buildPool(): number[] {
  const raw = localStorage.getItem(SEEN_KEY);
  const seenSet = new Set<number>(raw ? JSON.parse(raw) : []);

  const byCategory = groupByCategory();

  // Split each category into unseen / seen buckets
  const unséenCols: number[][] = [];
  const seenCols: number[][] = [];
  byCategory.forEach(indices => {
    unséenCols.push(indices.filter(i => !seenSet.has(i)));
    seenCols.push(indices.filter(i => seenSet.has(i)));
  });

  // Round-robin through categories: unseen first, then seen remainder
  const roundRobin = (cols: number[][]) => {
    const pool: number[] = [];
    const ptrs = cols.map(() => 0);
    let progress = true;
    while (progress) {
      progress = false;
      // Shuffle column order each round for variety
      const order = shuffle(cols.map((_, i) => i));
      for (const ci of order) {
        if (ptrs[ci] < cols[ci].length) {
          pool.push(cols[ci][ptrs[ci]++]);
          progress = true;
        }
      }
    }
    return pool;
  };

  return [...roundRobin(unséenCols), ...roundRobin(seenCols)];
}

function markSeen(indices: number[]) {
  const raw = localStorage.getItem(SEEN_KEY);
  const prev: number[] = raw ? JSON.parse(raw) : [];
  const merged = Array.from(new Set([...prev, ...indices]));
  if (merged.length >= TOTAL) {
    localStorage.removeItem(SEEN_KEY);
  } else {
    localStorage.setItem(SEEN_KEY, JSON.stringify(merged));
  }
}

function AvatarBubble({ avatar, size = 'md' }: { avatar: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'sm' ? 'w-8 h-8 text-lg' : size === 'lg' ? 'w-16 h-16 text-4xl' : 'w-10 h-10 text-2xl';
  return (
    <div className={`${sz} rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0`}>
      {avatar}
    </div>
  );
}

function Spinner() {
  return <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />;
}

// ─── Auth Screen ──────────────────────────────────────────────────────────────

function AuthScreen({ lang, onLangChange, dbWarning, recoveryMode }: { lang: Lang; onLangChange: (l: Lang) => void; dbWarning?: boolean; recoveryMode?: boolean }) {
  const t = i18n[lang];
  const [mode, setMode] = useState<AuthMode>(recoveryMode ? 'new-password' : 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const validate = () => {
    if (mode === 'new-password') {
      if (password.length < 6) { setError(t.passwordShort); return false; }
      if (password !== confirm) { setError(t.passwordMismatch); return false; }
      return true;
    }
    if (!email.includes('@')) { setError(t.emailInvalid); return false; }
    if (mode !== 'reset' && password.length < 6) { setError(t.passwordShort); return false; }
    if (mode === 'signup' && password !== confirm) { setError(t.passwordMismatch); return false; }
    return true;
  };

  const handle = async () => {
    setError(''); setInfo('');
    if (!validate()) return;
    setLoading(true);

    if (mode === 'new-password') {
      const err = await updatePassword(password);
      if (err) { setLoading(false); setError(err); return; }
      await signOut();
      setLoading(false);
      setInfo(t.newPasswordSuccess);
      setMode('signin');
      setPassword('');
      setConfirm('');
      return;
    }

    if (mode === 'reset') {
      const err = await resetPassword(email);
      setLoading(false);
      if (err) setError(err); else setInfo(t.resetSent);
      return;
    }

    const err = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password);
    setLoading(false);

    if (err) {
      // Friendly error messages
      if (err.includes('Invalid login')) setError('Email ou senha incorretos');
      else if (err.includes('already registered')) setError('Este email já tem uma conta. Faça login.');
      else if (err.includes('Email not confirmed')) setInfo(t.checkEmailConfirm);
      else setError(err);
    } else if (mode === 'signup') {
      setInfo(t.checkEmailConfirm);
    }
  };

  const switchMode = (m: AuthMode) => {
    setMode(m); setError(''); setInfo(''); setPassword(''); setConfirm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-5 gap-6">
      {/* Logo */}
      <div className="text-center">
        <div className="text-6xl mb-2">📖</div>
        <h1 className="text-4xl font-black text-white tracking-tight">{t.appTitle}</h1>
      </div>

      {dbWarning && (
        <div className="w-full max-w-sm bg-amber-500/20 border border-amber-400/40 rounded-2xl px-4 py-3 text-center">
          <p className="text-amber-200 text-xs font-bold">⚠️ Banco não configurado.</p>
          <a href="https://supabase.com/dashboard/project/vofhxedowvhphtmvxzgm/sql" target="_blank" rel="noopener noreferrer"
            className="text-amber-300 text-xs underline">Abrir SQL Editor →</a>
        </div>
      )}

      {/* Lang */}
      <div className="flex gap-2">
        {(['pt', 'en', 'es'] as Lang[]).map(l => (
          <button key={l} onClick={() => onLangChange(l)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === l ? 'bg-blue-500 text-white scale-105' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
            {l === 'pt' ? '🇧🇷 PT' : l === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 shadow-2xl flex flex-col gap-4">
        <h2 className="text-white font-black text-xl text-center">
          {mode === 'signin' ? t.signIn : mode === 'signup' ? t.signUp : mode === 'new-password' ? t.newPasswordTitle : t.forgotPassword}
        </h2>

        {/* Info banner */}
        {info && (
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl px-4 py-3 text-blue-200 text-sm text-center">
            {info}
          </div>
        )}

        {/* Fields */}
        <div className="flex flex-col gap-3">
          {/* Email — hidden in new-password mode */}
          {mode !== 'new-password' && (
            <div className="flex flex-col gap-1">
              <label className="text-white/60 text-xs font-bold uppercase tracking-widest">{t.email}</label>
              <input
                type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handle()}
                placeholder={t.emailPlaceholder}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          )}

          {/* Password */}
          {mode !== 'reset' && (
            <div className="flex flex-col gap-1">
              <label className="text-white/60 text-xs font-bold uppercase tracking-widest">
                {mode === 'new-password' ? t.newPassword : t.password}
              </label>
              <input
                type="password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handle()}
                placeholder={t.passwordPlaceholder}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          )}

          {/* Confirm password */}
          {(mode === 'signup' || mode === 'new-password') && (
            <div className="flex flex-col gap-1">
              <label className="text-white/60 text-xs font-bold uppercase tracking-widest">{t.confirmPassword}</label>
              <input
                type="password" value={confirm} onChange={e => { setConfirm(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handle()}
                placeholder={t.passwordPlaceholder}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          )}
        </div>

        {error && <p className="text-red-400 text-sm text-center font-medium">{error}</p>}

        {/* Submit */}
        <button onClick={handle} disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 active:scale-95 disabled:opacity-60 text-white font-black text-base py-3.5 rounded-2xl shadow-lg transition-all">
          {loading ? <Spinner /> : mode === 'signin' ? t.enterBtn : mode === 'signup' ? t.createBtn : mode === 'new-password' ? t.newPasswordBtn : t.sendReset}
        </button>

        {/* Mode switchers */}
        <div className="flex flex-col items-center gap-2 text-sm">
          {mode === 'signin' && (
            <>
              <button onClick={() => switchMode('signup')} className="text-blue-300 hover:text-blue-200 transition-colors">
                {t.noAccount} <span className="font-bold">{t.signUp}</span>
              </button>
              <button onClick={() => switchMode('reset')} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                {t.forgotPassword}
              </button>
            </>
          )}
          {mode === 'signup' && (
            <button onClick={() => switchMode('signin')} className="text-blue-300 hover:text-blue-200 transition-colors">
              {t.haveAccount} <span className="font-bold">{t.signIn}</span>
            </button>
          )}
          {(mode === 'reset' || mode === 'new-password') && (
            <button onClick={() => switchMode('signin')} className="text-blue-300 hover:text-blue-200 transition-colors">
              ← {t.backToLogin}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Profile Setup ────────────────────────────────────────────────────────────

function ProfileSetupScreen({ userId, lang, onDone }: {
  userId: string; lang: Lang; onDone: (p: Profile) => void;
}) {
  const t = i18n[lang];
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('😊');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!name.trim()) { setError(t.nameRequired); return; }
    setLoading(true);
    const err = await createProfile(userId, name.trim(), avatar);
    if (err) { setError(err); setLoading(false); return; }
    const profile = await getProfile(userId);
    setLoading(false);
    if (profile) onDone(profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-5 gap-5">
      <div className="text-center">
        <AvatarBubble avatar={avatar} size="lg" />
        <h2 className="text-white font-black text-2xl mt-3">{t.setupTitle}</h2>
        <p className="text-white/50 text-sm mt-1">{t.setupSub}</p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-white/60 text-xs font-bold uppercase tracking-widest">{t.yourName}</label>
          <input
            value={name} onChange={e => { setName(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handle()}
            placeholder={t.namePlaceholder} maxLength={20}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
        </div>

        <div>
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">{t.chooseAvatar}</p>
          <div className="grid grid-cols-10 gap-1.5">
            {AVATARS.map(a => (
              <button key={a} onClick={() => setAvatar(a)}
                className={`aspect-square rounded-xl text-xl flex items-center justify-center transition-all ${avatar === a ? 'bg-blue-500 scale-110 shadow-lg' : 'bg-white/10 hover:bg-white/20 active:scale-95'}`}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handle} disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 active:scale-95 disabled:opacity-60 text-white font-black text-xl py-4 rounded-2xl shadow-xl transition-all">
          {loading ? <Spinner /> : t.saveProfile + ' →'}
        </button>
      </div>
    </div>
  );
}

// ─── Edit Profile Modal ───────────────────────────────────────────────────────

function EditProfileModal({ profile, lang, onSave, onClose }: {
  profile: Profile; lang: Lang; onSave: (p: Profile) => void; onClose: () => void;
}) {
  const t = i18n[lang];
  const [name, setName] = useState(profile.username);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!name.trim()) return;
    setLoading(true);
    await updateProfile(profile.id, name.trim(), avatar);
    onSave({ ...profile, username: name.trim(), avatar });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-white/20 rounded-3xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-black text-lg">{t.editProfile}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors text-xl">✕</button>
        </div>

        <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
          <AvatarBubble avatar={avatar} size="md" />
          <input value={name} onChange={e => setName(e.target.value)} maxLength={20}
            className="flex-1 bg-transparent text-white placeholder-white/30 font-bold text-base focus:outline-none" />
        </div>

        <div className="grid grid-cols-10 gap-1.5">
          {AVATARS.map(a => (
            <button key={a} onClick={() => setAvatar(a)}
              className={`aspect-square rounded-xl text-xl flex items-center justify-center transition-all ${avatar === a ? 'bg-blue-500 scale-110' : 'bg-white/10 hover:bg-white/20'}`}>
              {a}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl font-bold text-white/60 bg-white/10 hover:bg-white/20 border border-white/10 transition-all">
            {t.closeBible}
          </button>
          <button onClick={handle} disabled={loading}
            className="flex-[2] py-3 rounded-2xl font-black text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 active:scale-95 transition-all disabled:opacity-60">
            {loading ? <Spinner /> : t.saveProfile}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

function HomeScreen({ profile, lang, onPlay, onLangChange, onProfileUpdate }: {
  profile: Profile; lang: Lang; onPlay: () => void;
  onLangChange: (l: Lang) => void; onProfileUpdate: (p: Profile) => void;
}) {
  const t = i18n[lang];
  const [tab, setTab] = useState<Tab>('play');
  const [copied, setCopied] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(profile.friend_code).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-5 pb-2 flex items-center justify-between gap-3">
        <button onClick={() => setEditOpen(true)} className="flex items-center gap-2.5 active:opacity-70 transition-opacity min-w-0">
          <AvatarBubble avatar={profile.avatar} size="md" />
          <div className="text-left min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">{profile.username}</p>
            <p className="text-white/40 text-xs">#{profile.friend_code}</p>
          </div>
        </button>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex gap-1">
            {(['pt', 'en', 'es'] as Lang[]).map(l => (
              <button key={l} onClick={() => onLangChange(l)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${lang === l ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/40 hover:text-white/70'}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={() => signOut()} className="text-white/30 hover:text-white/60 px-2 py-1 text-xs transition-colors" title={t.signOut}>
            ⎋
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {tab === 'play' && <PlayTab t={t} profile={profile} onPlay={onPlay} copyCode={copyCode} copied={copied} />}
        {tab === 'ranking' && <RankingTab t={t} profile={profile} />}
        {tab === 'friends' && <FriendsTab t={t} profile={profile} />}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur border-t border-white/10 flex">
        {([
          { id: 'play' as Tab, icon: '🎮', label: t.tabPlay },
          { id: 'ranking' as Tab, icon: '🏆', label: t.tabRanking },
          { id: 'friends' as Tab, icon: '👥', label: t.tabFriends },
        ]).map(item => (
          <button key={item.id} onClick={() => setTab(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all ${tab === item.id ? 'text-blue-400' : 'text-white/40 hover:text-white/60'}`}>
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </div>

      {editOpen && (
        <EditProfileModal profile={profile} lang={lang}
          onSave={onProfileUpdate} onClose={() => setEditOpen(false)} />
      )}
    </div>
  );
}

// ─── Play Tab ─────────────────────────────────────────────────────────────────

function PlayTab({ t, profile, onPlay, copyCode, copied }: {
  t: typeof i18n.pt; profile: Profile; onPlay: () => void; copyCode: () => void; copied: boolean;
}) {
  const [myBest, setMyBest] = useState<ScoreRow | null>(null);

  useEffect(() => {
    getMyBestScore(profile.id).then(setMyBest);
  }, [profile.id]);

  return (
    <div className="flex flex-col gap-4 pt-3">
      <button onClick={onPlay}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 active:scale-95 text-white font-black text-2xl py-6 rounded-3xl shadow-2xl transition-all">
        {t.playNow} →
      </button>

      {myBest && (
        <div className="bg-white/10 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest">{t.allTimeBest}</p>
            <p className="text-white font-black text-4xl">{myBest.score.toLocaleString()}</p>
          </div>
          <div className="text-white/30 text-xs text-right">
            <p>{myBest.correct}/{myBest.total}</p>
          </div>
        </div>
      )}

      <div className="bg-indigo-900/40 border border-indigo-500/20 rounded-2xl p-4">
        <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">{t.yourCode}</p>
        <div className="flex items-center justify-between gap-3">
          <span className="text-white font-black text-3xl tracking-[0.25em]">{profile.friend_code}</span>
          <button onClick={copyCode}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${copied ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
            {copied ? t.copied : t.copyCode}
          </button>
        </div>
        <p className="text-indigo-400/50 text-xs mt-1">{t.shareCode}</p>
      </div>
    </div>
  );
}

// ─── Ranking Tab ──────────────────────────────────────────────────────────────

function RankingTab({ t, profile }: { t: typeof i18n.pt; profile: Profile }) {
  const [period, setPeriod] = useState<'week' | 'all'>('week');
  const [rows, setRows] = useState<ScoreRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getGlobalRanking(period).then(setRows).finally(() => setLoading(false));
  }, [period]);

  return (
    <div className="flex flex-col gap-4 pt-3">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-black text-lg">🏆 {t.globalRanking}</h2>
        <div className="flex bg-white/10 rounded-xl p-0.5 gap-0.5">
          {(['week', 'all'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${period === p ? 'bg-blue-500 text-white' : 'text-white/50 hover:text-white/70'}`}>
              {p === 'week' ? t.week : t.allTime}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner /></div>
      ) : rows.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <p className="text-4xl mb-3">🏆</p><p>{t.noScores}</p>
        </div>
      ) : (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          {rows.map((row, i) => {
            const p = (row as any).profiles as Profile | undefined;
            const isMe = row.user_id === profile.id;
            return (
              <div key={row.id}
                className={`flex items-center gap-3 px-4 py-3 ${isMe ? 'bg-blue-500/15 border-l-2 border-blue-400' : ''} ${i < rows.length - 1 ? 'border-b border-white/5' : ''}`}>
                <span className={`w-6 text-center font-black text-sm flex-shrink-0 ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-600' : 'text-white/30'}`}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                </span>
                <AvatarBubble avatar={p?.avatar ?? '😊'} size="sm" />
                <span className={`flex-1 font-semibold text-sm truncate ${isMe ? 'text-blue-200' : 'text-white'}`}>
                  {p?.username ?? '?'}{isMe ? ` (${t.you})` : ''}
                </span>
                <span className="text-blue-300 font-black text-sm">{row.score.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Friends Tab ──────────────────────────────────────────────────────────────

function FriendsTab({ t, profile }: { t: typeof i18n.pt; profile: Profile }) {
  const [friends, setFriends] = useState<Friendship[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [sent, setSent] = useState<FriendRequest[]>([]);
  const [weeklyBest, setWeeklyBest] = useState<Map<string, number>>(new Map());
  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState<Profile | null | 'not_found'>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const load = useCallback(async () => {
    const [fr, pe, se] = await Promise.all([
      getFriendships(profile.id), getPendingRequests(profile.id), getSentRequests(profile.id),
    ]);
    setFriends(fr); setRequests(pe); setSent(se);
    if (fr.length) {
      const best = await getFriendsWeeklyBest(fr.map(f => f.friend_id));
      setWeeklyBest(new Map(best.map(b => [b.userId, b.bestScore])));
    }
  }, [profile.id]);

  useEffect(() => { load(); }, [load]);

  const flash = (text: string, ok: boolean) => {
    setMsg({ text, ok }); setTimeout(() => setMsg(null), 3000);
  };

  const doSearch = async () => {
    if (searchCode.length !== 6) return;
    setSearchResult(null);
    const res = await searchProfileByCode(searchCode);
    setSearchResult(res ?? 'not_found');
  };

  const doSend = async (toId: string) => {
    if (toId === profile.id) { flash(t.cannotAddSelf, false); return; }
    if (friends.some(f => f.friend_id === toId)) { flash(t.alreadyFriend, false); return; }
    const err = await sendFriendRequest(profile.id, toId);
    if (err) flash(t.errorSending, false);
    else { flash(t.requestSent, true); setSearchResult(null); setSearchCode(''); load(); }
  };

  const doRespond = async (req: FriendRequest, accept: boolean) => {
    await respondToRequest(req.id, accept, req.from_user_id, req.to_user_id);
    load();
  };

  return (
    <div className="flex flex-col gap-4 pt-3">

      {/* Pending requests */}
      {requests.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            🔔 {t.friendRequests}
            <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">{requests.length}</span>
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {requests.map((req, i) => {
              const fp = (req as any).from_profile as Profile | undefined;
              return (
                <div key={req.id} className={`flex items-center gap-3 px-4 py-3 ${i < requests.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <AvatarBubble avatar={fp?.avatar ?? '😊'} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{fp?.username}</p>
                    <p className="text-white/30 text-xs">#{fp?.friend_code}</p>
                  </div>
                  <button onClick={() => doRespond(req, true)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-all">
                    {t.accept}
                  </button>
                  <button onClick={() => doRespond(req, false)}
                    className="bg-white/10 hover:bg-red-500/20 text-white/50 hover:text-red-300 text-xs font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-all">
                    {t.reject}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add friend */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <button onClick={() => setAddOpen(o => !o)}
          className="w-full flex items-center justify-between px-4 py-3">
          <span className="text-white font-bold text-sm">➕ {t.addFriend}</span>
          <span className="text-white/30 text-xs">{addOpen ? '▲' : '▼'}</span>
        </button>
        {addOpen && (
          <div className="px-4 pb-4 border-t border-white/10 pt-3 flex flex-col gap-3">
            <p className="text-white/40 text-xs">{t.addFriendDesc}</p>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-white placeholder-white/30 text-base font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="000000" maxLength={6} value={searchCode}
                onChange={e => { setSearchCode(e.target.value.replace(/\D/g, '')); setSearchResult(null); }}
                onKeyDown={e => e.key === 'Enter' && doSearch()}
              />
              <button onClick={doSearch}
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 rounded-xl text-sm font-bold transition-all active:scale-95">
                {t.search}
              </button>
            </div>

            {msg && <p className={`text-xs font-bold ${msg.ok ? 'text-emerald-400' : 'text-red-400'}`}>{msg.text}</p>}
            {searchResult === 'not_found' && <p className="text-red-400 text-xs">{t.userNotFound}</p>}
            {searchResult && searchResult !== 'not_found' && (
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
                <AvatarBubble avatar={(searchResult as Profile).avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{(searchResult as Profile).username}</p>
                  <p className="text-white/40 text-xs">#{(searchResult as Profile).friend_code}</p>
                </div>
                {friends.some(f => f.friend_id === (searchResult as Profile).id) ? (
                  <span className="text-emerald-400 text-xs font-bold">{t.alreadyFriend}</span>
                ) : sent.some(s => (s as any).to_profile?.id === (searchResult as Profile).id) ? (
                  <span className="text-amber-400 text-xs font-bold">{t.pending}</span>
                ) : (
                  <button onClick={() => doSend((searchResult as Profile).id)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-all">
                    {t.send}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Friends list */}
      <div className="flex flex-col gap-2">
        <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest">👥 {t.tabFriends} ({friends.length})</h3>
        {friends.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl py-10 text-center">
            <p className="text-4xl mb-2">👥</p>
            <p className="text-white/40 text-sm">{t.noFriends}</p>
            <p className="text-white/20 text-xs mt-1">{t.noFriendsDesc}</p>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {[...friends]
              .sort((a, b) => (weeklyBest.get(b.friend_id) ?? -1) - (weeklyBest.get(a.friend_id) ?? -1))
              .map((f, i) => {
                const fp = (f as any).friend_profile as Profile | undefined;
                const best = weeklyBest.get(f.friend_id);
                return (
                  <div key={f.id} className={`flex items-center gap-3 px-4 py-3 ${i < friends.length - 1 ? 'border-b border-white/5' : ''}`}>
                    <AvatarBubble avatar={fp?.avatar ?? '😊'} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{fp?.username}</p>
                      <p className="text-white/30 text-xs">#{fp?.friend_code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/30 text-[10px]">{t.bestThisWeek}</p>
                      <p className={`font-black text-sm ${best ? 'text-blue-300' : 'text-white/20'}`}>
                        {best ? best.toLocaleString() : t.noScoreYet}
                      </p>
                    </div>
                    <button onClick={() => removeFriend(profile.id, f.friend_id).then(load)}
                      className="text-white/15 hover:text-red-400 text-sm transition-all ml-1 px-1 py-1">✕</button>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {sent.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest">⏳ {t.sentRequests}</h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {sent.map((s, i) => {
              const tp = (s as any).to_profile as Profile | undefined;
              return (
                <div key={s.id} className={`flex items-center gap-3 px-4 py-2.5 ${i < sent.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <AvatarBubble avatar={tp?.avatar ?? '😊'} size="sm" />
                  <div className="flex-1"><p className="text-white/60 text-sm">{tp?.username}</p></div>
                  <span className="text-amber-400 text-xs font-bold">{t.pending}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Countdown ────────────────────────────────────────────────────────────────

function CountdownScreen({ lang, onDone }: { lang: Lang; onDone: () => void }) {
  const [count, setCount] = useState(3);
  useEffect(() => {
    if (count === 0) { const id = setTimeout(onDone, 600); return () => clearTimeout(id); }
    const id = setTimeout(() => setCount(c => c - 1), 800);
    return () => clearTimeout(id);
  }, [count, onDone]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 flex items-center justify-center">
      <div key={count} style={{ animation: 'pop .7s ease-out' }}>
        {count === 0
          ? <span className="text-7xl font-black text-emerald-400">{i18n[lang].go}</span>
          : <span className="text-[12rem] font-black text-white leading-none" style={{ textShadow: '0 0 80px rgba(99,102,241,.8)' }}>{count}</span>}
      </div>
      <style>{`@keyframes pop{0%{transform:scale(1.6);opacity:0}40%{transform:scale(1);opacity:1}80%{transform:scale(1);opacity:1}100%{transform:scale(.8);opacity:0}}`}</style>
    </div>
  );
}

// ─── Game Screen ──────────────────────────────────────────────────────────────

function GameScreen({ lang, onFinish, onAbandon }: { lang: Lang; onFinish: (s: number, c: number, t: number) => void; onAbandon: () => void }) {
  const tx = i18n[lang];
  const pool = useRef<number[]>(buildPool());
  const qi = useRef(0);
  const seenThisGame = useRef<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [cur, setCur] = useState(() => getQShuffled(pool.current[0], lang));

  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [helpsLeft, setHelpsLeft] = useState(MAX_BIBLE_HELPS);
  const [showBible, setShowBible] = useState(false);
  const [done, setDone] = useState(false);
  const [confirmAbandon, setConfirmAbandon] = useState(false);
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;

  // Track first question as seen
  useEffect(() => { seenThisGame.current.push(pool.current[0]); }, []);

  useEffect(() => {
    if (done || timeLeft <= 0) { setDone(true); return; }
    const id = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft, done]);

  useEffect(() => {
    if (done) {
      markSeen(seenThisGame.current);
      const id = setTimeout(() => finishRef.current(score, correct, total), 1200);
      return () => clearTimeout(id);
    }
  }, [done, score, correct, total]);

  const nextQ = useCallback(() => {
    qi.current = (qi.current + 1) % pool.current.length;
    const nextIdx = pool.current[qi.current];
    seenThisGame.current.push(nextIdx);
    setCur(getQShuffled(nextIdx, lang));
    setSelected(null); setFeedback(null); setShowBible(false);
  }, [lang]);

  const answer = (idx: number) => {
    if (selected !== null || done) return;
    setSelected(idx);
    const ok = idx === cur.correctAnswer;
    setFeedback(ok ? 'correct' : 'wrong');
    setTotal(p => p + 1);
    if (ok) { setScore(p => p + (POINTS[cur.difficulty] ?? 100)); setCorrect(p => p + 1); }
    setTimeout(nextQ, 900);
  };

  const pct = (timeLeft / ROUND_SECONDS) * 100;
  const timerCls = timeLeft > 40 ? 'bg-emerald-400' : timeLeft > 20 ? 'bg-amber-400' : 'bg-red-500';

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-blue-300 font-bold text-lg">{tx.timeUp}</p>
          <p className="text-white font-black text-5xl mt-2">{score.toLocaleString()} pts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 flex flex-col">
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        {/* Abandon button / confirm inline */}
        {confirmAbandon ? (
          <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-xl px-3 py-1.5">
            <span className="text-red-300 text-xs font-bold">{tx.abandonConfirm}</span>
            <button onClick={onAbandon} className="text-red-300 text-xs font-black hover:text-red-200 transition-colors">{tx.abandonYes}</button>
            <button onClick={() => setConfirmAbandon(false)} className="text-white/50 text-xs font-bold hover:text-white/80 transition-colors">{tx.abandonNo}</button>
          </div>
        ) : (
          <button onClick={() => setConfirmAbandon(true)}
            className="text-white/30 hover:text-white/70 transition-colors p-1.5 rounded-lg hover:bg-white/10 active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        )}
        <div className="flex-1">
          <div className="flex justify-between text-xs text-white/60 mb-1">
            <span>{tx.timeLeft}</span>
            <span className={`font-black ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{timeLeft}s</span>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-1000 ${timerCls}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="bg-white/10 rounded-xl px-3 py-1.5 border border-white/20 text-center min-w-[80px]">
          <p className="text-white/40 text-[10px] uppercase tracking-widest">{tx.score}</p>
          <p className="text-white font-black text-lg leading-none">{score.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex-1 px-4 pb-4 flex flex-col gap-3">
        <div className="flex gap-2 flex-wrap">
          <span className={`text-xs font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r ${CATEGORY_COLORS[cur.category] || 'from-blue-500 to-indigo-700'}`}>{cur.category}</span>
          <span className={`text-xs font-bold text-white px-3 py-1 rounded-full ${DIFF_BADGE[cur.difficulty]}`}>
            {cur.difficulty} +{POINTS[cur.difficulty] ?? 100}
          </span>
        </div>

        <div className="bg-white/10 rounded-2xl border border-white/20 px-5 py-4">
          <p className="text-white font-semibold text-base leading-snug">{cur.question}</p>
        </div>

        {feedback && (
          <div className={`text-center py-2 rounded-xl font-black text-lg ${feedback === 'correct' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-red-500/30 text-red-300'}`}>
            {feedback === 'correct' ? tx.correctBanner : tx.wrongBanner}
          </div>
        )}

        <div className="flex flex-col gap-2.5 flex-1">
          {cur.options.map((opt, i) => {
            let cls = 'bg-white/10 border-white/20 text-white hover:bg-white/20 active:scale-[0.98]';
            if (selected !== null) {
              if (i === cur.correctAnswer) cls = 'bg-emerald-500/30 border-emerald-400 text-emerald-200';
              else if (i === selected) cls = 'bg-red-500/30 border-red-400 text-red-200';
              else cls = 'bg-white/5 border-white/10 text-white/40';
            }
            return (
              <button key={i} onClick={() => answer(i)} disabled={selected !== null}
                className={`w-full text-left px-4 py-3.5 rounded-xl border font-medium text-sm transition-all duration-200 ${cls}`}>
                <span className="font-black mr-2 opacity-50">{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={() => { if (helpsLeft > 0 && !showBible) { setHelpsLeft(p => p - 1); setShowBible(true); } }}
            disabled={helpsLeft === 0 || showBible}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${helpsLeft > 0 && !showBible ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 active:scale-95' : 'bg-white/5 border border-white/10 text-white/25 cursor-not-allowed'}`}>
            📖 {tx.bibleHelp}
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: MAX_BIBLE_HELPS }).map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < helpsLeft ? 'bg-amber-400' : 'bg-white/15'}`} />
            ))}
          </div>
        </div>

        {showBible && cur.verse && (
          <div className="bg-amber-950/60 border border-amber-500/30 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-amber-300 text-xs font-bold uppercase tracking-widest">📜 {tx.bibleVerse}</p>
              <button onClick={() => setShowBible(false)} className="text-amber-400/50 text-xs hover:text-amber-300 transition-colors">{tx.closeBible} ✕</button>
            </div>
            <p className="text-amber-100 text-sm italic leading-relaxed">"{cur.verse}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────

function ResultScreen({ profile, score, correct, total, lang, onPlayAgain, onHome }: {
  profile: Profile; score: number; correct: number; total: number;
  lang: Lang; onPlayAgain: () => void; onHome: () => void;
}) {
  const t = i18n[lang];
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const [rank, setRank] = useState<number | null>(null);

  useEffect(() => {
    saveScore(profile.id, score, correct, total).then(() => {
      getGlobalRanking('week').then(rows => {
        // ranking is deduplicated by best score per user;
        // find this user's entry and use its position
        const pos = rows.findIndex(r => r.user_id === profile.id);
        setRank(pos >= 0 ? pos + 1 : null);
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-4 gap-5">
      <div className="text-center">
        <div className="text-7xl mb-2">{accuracy >= 80 ? '🏆' : accuracy >= 50 ? '🎉' : '📖'}</div>
        <h2 className="text-white font-black text-2xl">{profile.username}</h2>
        {rank && (
          <p className={`font-bold text-sm mt-1 ${rank <= 3 ? 'text-yellow-400' : 'text-blue-300'}`}>
            {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`} {t.rankThisWeek}
          </p>
        )}
        <p className="text-emerald-400/60 text-xs mt-1">✓ {t.pts === 'pts' ? 'Pontuação salva online' : 'Score saved online'}</p>
      </div>

      <div className="w-full max-w-sm bg-gradient-to-br from-blue-600/30 to-indigo-800/30 border border-blue-500/30 rounded-3xl p-6 text-center">
        <p className="text-blue-300 text-xs uppercase tracking-widest font-bold mb-1">{t.yourScore}</p>
        <p className="text-white font-black text-6xl">{score.toLocaleString()}</p>
        <p className="text-white/40 text-sm mt-1">{t.pts}</p>
      </div>

      <div className="w-full max-w-sm grid grid-cols-2 gap-3">
        <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/10">
          <p className="text-white/50 text-xs uppercase tracking-widest">{t.answered}</p>
          <p className="text-white font-black text-3xl mt-1">{total}</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/10">
          <p className="text-white/50 text-xs uppercase tracking-widest">{t.accuracy}</p>
          <p className={`font-black text-3xl mt-1 ${accuracy >= 70 ? 'text-emerald-400' : accuracy >= 40 ? 'text-amber-400' : 'text-red-400'}`}>{accuracy}%</p>
        </div>
      </div>

      <div className="w-full max-w-sm flex gap-3">
        <button onClick={onHome}
          className="flex-1 py-3.5 rounded-2xl font-bold text-white/70 bg-white/10 hover:bg-white/20 border border-white/10 transition-all active:scale-95">
          {t.backHome}
        </button>
        <button onClick={onPlayAgain}
          className="flex-[2] py-3.5 rounded-2xl font-black text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 shadow-lg transition-all active:scale-95">
          {t.playAgain} →
        </button>
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  document.title = 'Bom de Bíblia';

  const [screen, setScreen] = useState<Screen>(() =>
    new URLSearchParams(window.location.search).has('code') ? 'auth' : 'loading'
  );
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [lang, setLang] = useState<Lang>(loadLang);
  const [result, setResult] = useState({ score: 0, correct: 0, total: 0 });
  const [dbReady, setDbReady] = useState<boolean | null>(null);
  // true when a password-recovery link was clicked.
  // With Supabase PKCE the redirect URL has ?code=... (no type visible).
  // We block profile navigation until onAuthStateChange confirms the event type.
  const [recoveryMode, setRecoveryMode] = useState(() => {
    const p = new URLSearchParams(window.location.search);
    // ?code= present means this is an auth callback (recovery, magic link, etc.)
    return p.has('code') || p.get('type') === 'recovery' || window.location.hash.includes('type=recovery');
  });
  const gameKeyRef = useRef(0);

  // Auth listener — runs once
  useEffect(() => {
    checkDbReady().then(setDbReady);

    // onAuthStateChange is registered first; it fires for the initial session too.
    // PASSWORD_RECOVERY fires when the user arrives via a reset-password link (PKCE code exchange).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((ev, sess) => {
      if (ev === 'PASSWORD_RECOVERY') {
        setSession(sess);
        setRecoveryMode(true);
        setScreen('auth');
        return;
      }
      // For any other event: clear recovery mode so profile load proceeds normally
      setRecoveryMode(false);
      setSession(sess);
      if (!sess) { setScreen('auth'); setProfile(null); }
    });

    // Fallback: if onAuthStateChange doesn't fire (SSR / cached session),
    // getSession() resolves the loading screen.
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) setScreen('auth');
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load profile when session changes (skip during password recovery)
  useEffect(() => {
    if (!session || recoveryMode) return;
    getProfile(session.user.id).then(p => {
      if (p) { setProfile(p); setScreen('home'); }
      else setScreen('profile-setup');
    });
  }, [session?.user.id, recoveryMode]);

  const handleLangChange = (l: Lang) => {
    setLang(l); localStorage.setItem('bom-biblia-lang', l);
  };

  const handleProfileDone = (p: Profile) => {
    setProfile(p); setScreen('home');
  };

  const handleProfileUpdate = (p: Profile) => setProfile(p);

  const handleGameFinish = useCallback((s: number, c: number, t: number) => {
    setResult({ score: s, correct: c, total: t });
    setScreen('result');
  }, []);

  const handlePlayAgain = useCallback(() => {
    gameKeyRef.current += 1;
    setScreen('countdown');
  }, []);

  if (screen === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 flex items-center justify-center p-5">
        {dbReady === false ? (
          <div className="max-w-sm w-full bg-amber-500/20 border border-amber-400/40 rounded-3xl p-6 flex flex-col gap-4 text-center">
            <div className="text-5xl">⚠️</div>
            <h2 className="text-white font-black text-xl">Banco não configurado</h2>
            <p className="text-amber-200 text-sm leading-relaxed">
              Execute o arquivo <code className="bg-white/10 px-1 rounded">supabase-setup.sql</code> no <strong>SQL Editor</strong> do painel do Supabase para criar as tabelas necessárias.
            </p>
            <a href={`https://supabase.com/dashboard/project/vofhxedowvhphtmvxzgm/sql`} target="_blank" rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-black font-black py-3 rounded-2xl text-sm transition-all">
              Abrir SQL Editor →
            </a>
            <button onClick={() => checkDbReady().then(r => { setDbReady(r); })}
              className="text-white/50 hover:text-white/80 text-xs underline transition-colors">
              Verificar novamente
            </button>
          </div>
        ) : (
          <div className="text-center gap-4 flex flex-col items-center">
            <div className="text-5xl animate-bounce">📖</div>
            <Spinner />
          </div>
        )}
      </div>
    );
  }

  if (screen === 'auth') return <AuthScreen lang={lang} onLangChange={handleLangChange} dbWarning={dbReady === false} recoveryMode={recoveryMode} />;

  if (screen === 'profile-setup' && session)
    return <ProfileSetupScreen userId={session.user.id} lang={lang} onDone={handleProfileDone} />;

  if (screen === 'countdown') return <CountdownScreen lang={lang} onDone={() => setScreen('game')} />;

  if (screen === 'game') return <GameScreen lang={lang} onFinish={handleGameFinish} onAbandon={() => setScreen('home')} key={gameKeyRef.current} />;

  if (screen === 'result' && profile)
    return <ResultScreen profile={profile} {...result} lang={lang}
      onPlayAgain={handlePlayAgain} onHome={() => setScreen('home')} />;

  if (screen === 'home' && profile)
    return <HomeScreen profile={profile} lang={lang}
      onPlay={() => setScreen('countdown')}
      onLangChange={handleLangChange}
      onProfileUpdate={handleProfileUpdate} />;

  return null;
}
