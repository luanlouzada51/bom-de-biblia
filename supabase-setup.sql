-- ============================================================
-- BOM DE BÍBLIA — Setup com autenticação email/senha
-- Execute no Supabase Dashboard → SQL Editor
-- ============================================================

-- 0. Limpar triggers antigos (causam erro 500 no cadastro)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 1. Perfis (vinculados ao auth.users do Supabase)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL DEFAULT 'Jogador',
  avatar TEXT NOT NULL DEFAULT '😊',
  friend_code CHAR(6) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migração: renomear avatar_url → avatar se vier da versão antiga
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='avatar_url') THEN
    ALTER TABLE profiles RENAME COLUMN avatar_url TO avatar;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='avatar') THEN
    ALTER TABLE profiles ADD COLUMN avatar TEXT NOT NULL DEFAULT '😊';
  END IF;
END $$;

-- 2. Pontuações
CREATE TABLE IF NOT EXISTS scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  correct INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  played_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Pedidos de amizade
CREATE TABLE IF NOT EXISTS friend_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_user_id, to_user_id)
);

-- 4. Amizades (bidirecional)
CREATE TABLE IF NOT EXISTS friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reported_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','reviewed','dismissed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_reported_user_id ON reports(reported_user_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);

-- 5. Copa Cristão (estado do torneio em JSON + convites)
CREATE TABLE IF NOT EXISTS tournament_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code CHAR(6) UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Copa Cristão',
  organizer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting','in-progress','interval','finished','cancelled')),
  state JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tournament_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES tournament_states(id) ON DELETE CASCADE,
  organizer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  invited_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  responded_at TIMESTAMPTZ,
  UNIQUE(tournament_id, invited_user_id)
);

CREATE INDEX IF NOT EXISTS idx_tournament_states_status ON tournament_states(status);
CREATE INDEX IF NOT EXISTS idx_tournament_states_organizer ON tournament_states(organizer_id);
CREATE INDEX IF NOT EXISTS idx_tournament_states_updated_at ON tournament_states(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_tournament_invites_invited ON tournament_invites(invited_user_id, status);
CREATE INDEX IF NOT EXISTS idx_tournament_invites_tournament ON tournament_invites(tournament_id);

CREATE OR REPLACE FUNCTION set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_tournament_states_updated_at ON tournament_states;
CREATE TRIGGER trg_tournament_states_updated_at
BEFORE UPDATE ON tournament_states
FOR EACH ROW EXECUTE FUNCTION set_updated_at_timestamp();

-- ── RLS ──────────────────────────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE friend_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_invites ENABLE ROW LEVEL SECURITY;

-- Profiles
DROP POLICY IF EXISTS profiles_select ON profiles;
DROP POLICY IF EXISTS profiles_insert ON profiles;
DROP POLICY IF EXISTS profiles_update ON profiles;
CREATE POLICY profiles_select ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY profiles_insert ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY profiles_update ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Scores
DROP POLICY IF EXISTS scores_select ON scores;
DROP POLICY IF EXISTS scores_insert ON scores;
CREATE POLICY scores_select ON scores FOR SELECT TO authenticated USING (true);
CREATE POLICY scores_insert ON scores FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Friend requests
DROP POLICY IF EXISTS freq_select ON friend_requests;
DROP POLICY IF EXISTS freq_insert ON friend_requests;
DROP POLICY IF EXISTS freq_update ON friend_requests;
CREATE POLICY freq_select ON friend_requests FOR SELECT TO authenticated
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);
CREATE POLICY freq_insert ON friend_requests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = from_user_id);
CREATE POLICY freq_update ON friend_requests FOR UPDATE TO authenticated
  USING (auth.uid() = to_user_id);

-- Friendships
DROP POLICY IF EXISTS friendships_select ON friendships;
DROP POLICY IF EXISTS friendships_insert ON friendships;
DROP POLICY IF EXISTS friendships_delete ON friendships;
CREATE POLICY friendships_select ON friendships FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = friend_id);
CREATE POLICY friendships_insert ON friendships FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY friendships_delete ON friendships FOR DELETE TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Reports
DROP POLICY IF EXISTS reports_select ON reports;
DROP POLICY IF EXISTS reports_insert ON reports;
CREATE POLICY reports_select ON reports FOR SELECT TO authenticated
  USING (auth.uid() = reporter_id);
CREATE POLICY reports_insert ON reports FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = reporter_id);

-- Tournament states
DROP POLICY IF EXISTS tournament_states_select ON tournament_states;
DROP POLICY IF EXISTS tournament_states_insert ON tournament_states;
DROP POLICY IF EXISTS tournament_states_update ON tournament_states;
DROP POLICY IF EXISTS tournament_states_delete ON tournament_states;
CREATE POLICY tournament_states_select ON tournament_states FOR SELECT TO authenticated USING (true);
CREATE POLICY tournament_states_insert ON tournament_states FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY tournament_states_update ON tournament_states FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
CREATE POLICY tournament_states_delete ON tournament_states FOR DELETE TO authenticated
  USING (auth.uid() = organizer_id);

-- Tournament invites
DROP POLICY IF EXISTS tournament_invites_select ON tournament_invites;
DROP POLICY IF EXISTS tournament_invites_insert ON tournament_invites;
DROP POLICY IF EXISTS tournament_invites_update ON tournament_invites;
DROP POLICY IF EXISTS tournament_invites_delete ON tournament_invites;
CREATE POLICY tournament_invites_select ON tournament_invites FOR SELECT TO authenticated
  USING (auth.uid() = organizer_id OR auth.uid() = invited_user_id);
CREATE POLICY tournament_invites_insert ON tournament_invites FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY tournament_invites_update ON tournament_invites FOR UPDATE TO authenticated
  USING (auth.uid() = organizer_id OR auth.uid() = invited_user_id)
  WITH CHECK (auth.uid() = organizer_id OR auth.uid() = invited_user_id);
CREATE POLICY tournament_invites_delete ON tournament_invites FOR DELETE TO authenticated
  USING (auth.uid() = organizer_id);

-- ── Gerador de código de crente ───────────────────────────────────────────────
CREATE OR REPLACE FUNCTION generate_friend_code()
RETURNS CHAR(6) AS $$
DECLARE
  code CHAR(6);
  taken BOOLEAN;
BEGIN
  LOOP
    code := LPAD(FLOOR(RANDOM() * 900000 + 100000)::TEXT, 6, '0');
    SELECT EXISTS(SELECT 1 FROM profiles WHERE friend_code = code) INTO taken;
    EXIT WHEN NOT taken;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- ── Índices ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_scores_user_id   ON scores(user_id);
CREATE INDEX IF NOT EXISTS idx_scores_played_at ON scores(played_at DESC);
CREATE INDEX IF NOT EXISTS idx_scores_score     ON scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_code    ON profiles(friend_code);
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username_lower ON profiles (LOWER(username));
CREATE INDEX IF NOT EXISTS idx_friendships_uid  ON friendships(user_id);
CREATE INDEX IF NOT EXISTS idx_freq_to_user     ON friend_requests(to_user_id, status);

SELECT 'Setup concluído!' AS status;
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('profiles','scores','friend_requests','friendships','tournament_states','tournament_invites')
ORDER BY table_name;
