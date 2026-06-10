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

-- =========================================================================
-- Lehrer-Rollenvergabe (Spec 04) — SECURITY DEFINER, intern admin-checked.
-- Die App nutzt nur den anon-Key und kommt nicht an auth.users; diese
-- Funktionen erledigen Rollenvergabe + Lehrerliste sicher per RPC.
-- =========================================================================
create or replace function public.set_teacher_role(target_email text, make_teacher boolean)
returns void language plpgsql security definer set search_path = public as $$
declare target_id uuid;
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Nur Admins duerfen Rollen vergeben.';
  end if;
  select id into target_id from auth.users where lower(email) = lower(target_email);
  if target_id is null then
    raise exception 'Kein Konto mit dieser E-Mail gefunden.';
  end if;
  update public.profiles
    set role = case when make_teacher then 'teacher' else 'student' end
    where id = target_id;
end; $$;

create or replace function public.list_teachers()
returns table (id uuid, email text, role text)
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Nur Admins.';
  end if;
  return query
    select p.id, u.email::text, p.role
    from public.profiles p join auth.users u on u.id = p.id
    where p.role in ('teacher','admin') order by u.email;
end; $$;

revoke execute on function public.set_teacher_role(text, boolean) from public, anon;
revoke execute on function public.list_teachers() from public, anon;
grant execute on function public.set_teacher_role(text, boolean) to authenticated;
grant execute on function public.list_teachers() to authenticated;

-- =========================================================================
-- TEST / KOMPETENZNACHWEIS (Spec 2026-06-07) — digitaler MC-Test pro Lektion.
-- Sicherheitskern: richtige Antworten verlassen die DB NIE vor dem Abschicken.
-- test_questions ist NICHT public-read; Zugriff nur ueber die DEFINER-RPCs.
-- =========================================================================

-- ---------- TEST_QUESTIONS (Test-Fragen, Loesung geheim) ----------
create table if not exists public.test_questions (
  id         uuid primary key default gen_random_uuid(),
  lesson_id  uuid not null references public.lessons(id) on delete cascade,
  position   integer not null,
  type       text not null default 'multiple-choice',
  payload    jsonb not null,            -- {question, options[], correct, explanation}
  created_at timestamptz not null default now()
);
create index if not exists test_questions_lesson_idx on public.test_questions (lesson_id, position);
alter table public.test_questions enable row level security;
drop policy if exists "teachers read test_questions" on public.test_questions;
create policy "teachers read test_questions" on public.test_questions
  for select using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('teacher','admin')
  ));
grant select on public.test_questions to authenticated;  -- RLS schraenkt auf teacher/admin

-- ---------- TEST_ATTEMPTS (Ergebnisse, ein Versuch pro User+Lektion) ----------
create table if not exists public.test_attempts (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  lesson_id  uuid not null references public.lessons(id) on delete cascade,
  score      integer not null,
  max_score  integer not null,
  percent    integer not null,
  answers    jsonb not null,            -- {question_id: selected_index}
  created_at timestamptz not null default now(),
  unique (user_id, lesson_id)           -- erzwingt: genau ein Versuch
);
create index if not exists test_attempts_lesson_idx on public.test_attempts (lesson_id);
alter table public.test_attempts enable row level security;
drop policy if exists "own attempts select" on public.test_attempts;
drop policy if exists "teachers read attempts" on public.test_attempts;
create policy "own attempts select" on public.test_attempts
  for select using (auth.uid() = user_id);
create policy "teachers read attempts" on public.test_attempts
  for select using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('teacher','admin')
  ));
grant select on public.test_attempts to authenticated;  -- KEIN insert: nur via submit_test

-- get_test_questions: Fragen OHNE Loesung; sperrt nach dem ersten Versuch.
create or replace function public.get_test_questions(p_lesson_id uuid)
returns table (id uuid, "position" integer, type text, question text, options jsonb)
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Bitte zuerst anmelden.'; end if;
  if exists (select 1 from public.test_attempts a
             where a.user_id = auth.uid() and a.lesson_id = p_lesson_id) then
    raise exception 'TEST_BEREITS_ABGELEGT';
  end if;
  return query
    select q.id, q.position, q.type,
           q.payload->>'question' as question,
           q.payload->'options'   as options          -- OHNE correct/explanation
    from public.test_questions q
    where q.lesson_id = p_lesson_id
    order by q.position;
end; $$;
revoke execute on function public.get_test_questions(uuid) from public, anon;
grant execute on function public.get_test_questions(uuid) to authenticated;

-- submit_test: serverseitige MC-Bewertung + genau ein Versuch.
create or replace function public.submit_test(p_lesson_id uuid, p_answers jsonb)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_score integer := 0; v_max integer := 0; v_results jsonb := '[]'::jsonb;
  v_percent integer; r record; v_selected integer; v_correct integer; v_ok boolean;
begin
  if v_uid is null then raise exception 'Bitte zuerst anmelden.'; end if;
  for r in select id, payload from public.test_questions
           where lesson_id = p_lesson_id order by position loop
    v_max := v_max + 1;
    v_correct  := (r.payload->>'correct')::int;
    v_selected := nullif(p_answers->>r.id::text, '')::int;
    v_ok := (v_selected is not null and v_selected = v_correct);
    if v_ok then v_score := v_score + 1; end if;
    v_results := v_results || jsonb_build_object(
      'id', r.id, 'selected', v_selected, 'correct', v_correct,
      'is_correct', v_ok, 'explanation', r.payload->>'explanation');
  end loop;
  if v_max = 0 then raise exception 'Kein Test fuer diese Lektion.'; end if;
  v_percent := round(100.0 * v_score / v_max);
  begin
    insert into public.test_attempts (user_id, lesson_id, score, max_score, percent, answers)
    values (v_uid, p_lesson_id, v_score, v_max, v_percent, p_answers);
  exception when unique_violation then raise exception 'TEST_BEREITS_ABGELEGT';
  end;
  return jsonb_build_object('score', v_score, 'max_score', v_max,
                            'percent', v_percent, 'results', v_results);
end; $$;
revoke execute on function public.submit_test(uuid, jsonb) from public, anon;
grant execute on function public.submit_test(uuid, jsonb) to authenticated;

-- list_test_results: Lehrer-/Admin-Uebersicht (Kontoname + Punkte).
create or replace function public.list_test_results(p_lesson_id uuid)
returns table (display_name text, email text, score integer, max_score integer,
               percent integer, created_at timestamptz)
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.profiles
                 where id = auth.uid() and role in ('teacher','admin')) then
    raise exception 'Nur Lehrer/Admins.';
  end if;
  return query
    select coalesce(p.display_name, split_part(u.email,'@',1)),
           u.email::text, a.score, a.max_score, a.percent, a.created_at
    from public.test_attempts a
    join auth.users u on u.id = a.user_id
    left join public.profiles p on p.id = a.user_id
    where a.lesson_id = p_lesson_id
    order by u.email;
end; $$;
revoke execute on function public.list_test_results(uuid) from public, anon;
grant execute on function public.list_test_results(uuid) to authenticated;

-- list_all_test_results: komplette Lehrer-/Admin-Uebersicht ueber alle Lektionen.
-- Eine Zeile pro Versuch + eine Zeile pro Schueler-Konto ohne Versuch
-- (Lektions-/Score-Felder NULL, fuer die "Noch kein Versuch"-Fussnote).
create or replace function public.list_all_test_results()
returns table (email text, display_name text, module text, lesson_slug text,
               lesson_title text, lesson_position integer, score integer,
               max_score integer, percent integer, created_at timestamptz)
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.profiles
                 where id = auth.uid() and role in ('teacher','admin')) then
    raise exception 'Nur Lehrer/Admins.';
  end if;
  return query
    select u.email::text,
           coalesce(p.display_name, split_part(u.email,'@',1)),
           l.module, l.slug, l.title, l.position,
           a.score, a.max_score, a.percent, a.created_at
    from public.profiles p
    join auth.users u on u.id = p.id
    left join public.test_attempts a on a.user_id = p.id
    left join public.lessons l on l.id = a.lesson_id
    where p.role = 'student' or a.id is not null
    order by u.email, l.module, l.position;
end; $$;
revoke execute on function public.list_all_test_results() from public, anon;
grant execute on function public.list_all_test_results() to authenticated;

-- has_test: leichter Existenz-Check (nur true/false) fuer die Lektionsseite.
create or replace function public.has_test(p_lesson_id uuid)
returns boolean language sql security definer set search_path = public as $$
  select exists (select 1 from public.test_questions where lesson_id = p_lesson_id);
$$;
revoke execute on function public.has_test(uuid) from public;
grant execute on function public.has_test(uuid) to anon, authenticated;
