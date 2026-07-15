import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-587b9461/health", (c) => {
  return c.json({ status: "ok" });
});

// ─── DB Setup ────────────────────────────────────────────────────────────────
// Creates all tables, policies and triggers needed for the quiz ranking system.
// Called once from the frontend on first load.

app.post("/make-server-587b9461/setup-db", async (c) => {
  try {
    const dbUrl = Deno.env.get("SUPABASE_DB_URL");
    if (!dbUrl) {
      return c.json({ success: false, error: "SUPABASE_DB_URL not available" }, 500);
    }

    // @ts-ignore
    const { default: postgres } = await import("npm:postgres@3.4.4");
    const sql = postgres(dbUrl, { ssl: "require", max: 1 });

    await sql`
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        username TEXT NOT NULL DEFAULT 'Jogador',
        avatar_url TEXT,
        friend_code CHAR(6) UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS scores (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        score INTEGER NOT NULL DEFAULT 0,
        correct INTEGER NOT NULL DEFAULT 0,
        total INTEGER NOT NULL DEFAULT 0,
        played_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS friend_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        from_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        to_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(from_user_id, to_user_id)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS friendships (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        friend_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, friend_id)
      );
    `;

    // RLS
    await sql`ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;`;
    await sql`ALTER TABLE scores ENABLE ROW LEVEL SECURITY;`;
    await sql`ALTER TABLE friend_requests ENABLE ROW LEVEL SECURITY;`;
    await sql`ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;`;

    // Profiles policies
    await sql`
      DO $$ BEGIN
        CREATE POLICY "profiles_select" ON profiles FOR SELECT TO authenticated USING (true);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;
    await sql`
      DO $$ BEGIN
        CREATE POLICY "profiles_insert" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;
    await sql`
      DO $$ BEGIN
        CREATE POLICY "profiles_update" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;

    // Scores policies
    await sql`
      DO $$ BEGIN
        CREATE POLICY "scores_select" ON scores FOR SELECT TO authenticated USING (true);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;
    await sql`
      DO $$ BEGIN
        CREATE POLICY "scores_insert" ON scores FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;

    // Friend requests policies
    await sql`
      DO $$ BEGIN
        CREATE POLICY "freq_select" ON friend_requests FOR SELECT TO authenticated USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;
    await sql`
      DO $$ BEGIN
        CREATE POLICY "freq_insert" ON friend_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = from_user_id);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;
    await sql`
      DO $$ BEGIN
        CREATE POLICY "freq_update" ON friend_requests FOR UPDATE TO authenticated USING (auth.uid() = to_user_id);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;

    // Friendships policies
    await sql`
      DO $$ BEGIN
        CREATE POLICY "friendships_select" ON friendships FOR SELECT TO authenticated USING (auth.uid() = user_id OR auth.uid() = friend_id);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;
    await sql`
      DO $$ BEGIN
        CREATE POLICY "friendships_insert" ON friendships FOR INSERT TO authenticated WITH CHECK (true);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;
    await sql`
      DO $$ BEGIN
        CREATE POLICY "friendships_delete" ON friendships FOR DELETE TO authenticated USING (auth.uid() = user_id OR auth.uid() = friend_id);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `;

    // Friend code generator
    await sql`
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
    `;

    // Auto-create profile on signup
    await sql`
      CREATE OR REPLACE FUNCTION handle_new_user()
      RETURNS TRIGGER AS $$
      BEGIN
        INSERT INTO profiles (id, username, avatar_url, friend_code)
        VALUES (
          NEW.id,
          COALESCE(
            NEW.raw_user_meta_data->>'full_name',
            NEW.raw_user_meta_data->>'name',
            split_part(COALESCE(NEW.email, ''), '@', 1),
            'Jogador'
          ),
          NEW.raw_user_meta_data->>'avatar_url',
          generate_friend_code()
        )
        ON CONFLICT (id) DO NOTHING;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;

    await sql`
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION handle_new_user();
    `;

    await sql.end();
    return c.json({ success: true });
  } catch (err: any) {
    console.error("setup-db error:", err);
    return c.json({ success: false, error: err.message }, 500);
  }
});

Deno.serve(app.fetch);
