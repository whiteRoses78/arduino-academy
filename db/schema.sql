-- =========================================================================
-- arduino-academy — Datenbank-Schema (Supabase / Postgres)
-- Stand: 2026-06-02 (Phase 1a)
--
-- Design-Prinzip (siehe guidelines.md ADR-002):
--   * courses / lessons / exercises sind PUBLIC READ — Lernen braucht kein Login.
--   * Nur user_progress + profiles haengen hinter Auth + RLS (personenbezogen).
--   * lesson.content + exercise.payload sind JSONB -> 1:1-Migration der reichen
--     Vanilla-Objekte (lessons-*.js / exercises.js) ohne jedes Feld zu modellieren.
--   * Das didaktische Trio wandert in user_progress: Leitner (box/due_date) +
--     Selbsteinschaetzung (confidence). Intervalle [1,3,7,16,35] Tage = App-Logik.
-- =========================================================================

-- ---------- COURSES ----------
create table if not exists public.courses (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  description text,
  created_at  timestamptz not null default now()
);

-- ---------- LESSONS ----------
create table if not exists public.lessons (
  id            uuid primary key default gen_random_uuid(),
  course_id     uuid not null references public.courses(id) on delete cascade,
  legacy_id     integer,                 -- alte numerische id (1,2,35,...) fuer Migration/Referenz
  position      integer not null,        -- Reihenfolge = angezeigte Lektionsnummer
  module        text not null,           -- grundlagen|digital|analog|aktoren|projekt
  slug          text not null,
  title         text not null,
  content       jsonb not null default '{}'::jsonb,  -- Erklaerung/Tabs/Praxis/SVG-Refs
  parts         jsonb not null default '[]'::jsonb,  -- Bauteilliste [{name,qty?}] (Spec 03); leer = kein Block
  exam_relevant boolean not null default false,
  created_at    timestamptz not null default now(),
  unique (course_id, slug)
);
create index if not exists lessons_course_position_idx on public.lessons (course_id, position);
create index if not exists lessons_module_idx on public.lessons (module);

-- ---------- EXERCISES ----------
create table if not exists public.exercises (
  id         uuid primary key default gen_random_uuid(),
  lesson_id  uuid not null references public.lessons(id) on delete cascade,
  position   integer not null,           -- Reihenfolge innerhalb der Lektion
  type       text not null,              -- multiple-choice|matching|ordering|circuit-*|...
  payload    jsonb not null,             -- question/options/correct/explanation/wrongExplanations
  created_at timestamptz not null default now()
);
create index if not exists exercises_lesson_position_idx on public.exercises (lesson_id, position);

-- ---------- LESSON_SOLUTIONS (Lehrer-only, Spec 04) ----------
-- Geheime Lehrer-Loesungen pro Lektion. Eigene Tabelle statt Spalte auf lessons,
-- weil lessons public-read ist -> hier strenge RLS (nur teacher/admin lesen).
create table if not exists public.lesson_solutions (
  lesson_id  uuid primary key references public.lessons(id) on delete cascade,
  sketch     text,                    -- kompletter Arduino-Sketch
  wiring     text,                    -- Aufbau-/Verdrahtungshinweis
  mistakes   text,                    -- haeufige Schuelerfehler
  didactics  text,                    -- didaktischer Hinweis
  updated_at timestamptz not null default now()
);
alter table public.lesson_solutions enable row level security;
drop policy if exists "teachers read solutions" on public.lesson_solutions;
create policy "teachers read solutions" on public.lesson_solutions
  for select using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('teacher','admin')
  ));
-- Nur authenticated SELECT (RLS schraenkt auf teacher/admin ein); kein anon, kein write.
grant select on public.lesson_solutions to authenticated;

-- ---------- PROFILES ----------
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role         text not null default 'student',  -- student|teacher|admin (Spec 04)
  created_at   timestamptz not null default now()
);
alter table public.profiles drop constraint if exists profiles_role_chk;
alter table public.profiles add constraint profiles_role_chk
  check (role in ('student','teacher','admin'));

-- ---------- USER_PROGRESS (Trio: Status + Leitner-SR + Selbsteinschaetzung) ----------
create table if not exists public.user_progress (
  user_id       uuid not null references auth.users(id) on delete cascade,
  lesson_id     uuid not null references public.lessons(id) on delete cascade,
  status        text not null default 'not_started',  -- not_started|in_progress|completed
  box           smallint,                -- Leitner-Fach 1..5 (null = noch nicht im SR)
  due_date      date,                    -- naechste Faelligkeit (tagesgenau, zeitzonensicher)
  last_reviewed date,
  confidence    text,                    -- low|medium|high (Selbsteinschaetzung)
  completed_at  timestamptz,
  updated_at    timestamptz not null default now(),
  primary key (user_id, lesson_id),
  constraint user_progress_status_chk     check (status in ('not_started','in_progress','completed')),
  constraint user_progress_box_chk        check (box is null or (box between 1 and 5)),
  constraint user_progress_confidence_chk check (confidence is null or confidence in ('low','medium','high'))
);
create index if not exists user_progress_due_idx on public.user_progress (user_id, due_date);

-- =========================================================================
-- ROW LEVEL SECURITY
-- =========================================================================

-- Public-Read fuer Lerninhalte (kein Schreiben durch anon/authenticated;
-- Inhalte kommen via Migration/Service-Role rein).
alter table public.courses   enable row level security;
alter table public.lessons   enable row level security;
alter table public.exercises enable row level security;

drop policy if exists "public read courses"   on public.courses;
drop policy if exists "public read lessons"    on public.lessons;
drop policy if exists "public read exercises"  on public.exercises;
create policy "public read courses"   on public.courses   for select using (true);
create policy "public read lessons"    on public.lessons   for select using (true);
create policy "public read exercises"  on public.exercises for select using (true);

-- Profiles: nur eigenes.
alter table public.profiles enable row level security;
drop policy if exists "own profile select" on public.profiles;
drop policy if exists "own profile insert" on public.profiles;
drop policy if exists "own profile update" on public.profiles;
create policy "own profile select" on public.profiles for select using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);

-- User-Progress: nur eigenes (das schuetzt das Trio personenbezogen).
alter table public.user_progress enable row level security;
drop policy if exists "own progress select" on public.user_progress;
drop policy if exists "own progress insert" on public.user_progress;
drop policy if exists "own progress update" on public.user_progress;
drop policy if exists "own progress delete" on public.user_progress;
create policy "own progress select" on public.user_progress for select using (auth.uid() = user_id);
create policy "own progress insert" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "own progress update" on public.user_progress for update using (auth.uid() = user_id);
create policy "own progress delete" on public.user_progress for delete using (auth.uid() = user_id);

-- =========================================================================
-- TABLE GRANTS (zweite Schicht neben RLS: ohne GRANT kein Zugriff, egal welche
-- Policy). Dieses Projekt hat keine Supabase-Default-Grants -> explizit setzen.
-- =========================================================================

-- Lerninhalte: public read fuer anon + authenticated. KEIN insert/update/delete
-- fuer diese Rollen -> Inhalte kommen nur via Migration/Service-Role rein.
grant select on public.courses, public.lessons, public.exercises to anon, authenticated;

-- Personalisierte Daten: nur authenticated; RLS beschraenkt zusaetzlich auf
-- die eigenen Zeilen (auth.uid()).
grant select, insert, update        on public.profiles      to authenticated;
grant select, insert, update, delete on public.user_progress to authenticated;

-- =========================================================================
-- AUTO-PROFILE bei Sign-Up (vermeidet orphan auth.users -> Memory-Falle)
-- =========================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Haertung: SECURITY DEFINER-Funktion nicht per PostgREST-RPC aufrufbar machen
-- (Trigger feuert ueber den Trigger-Mechanismus, braucht kein EXECUTE-Recht).
revoke execute on function public.handle_new_user() from public, anon, authenticated;
