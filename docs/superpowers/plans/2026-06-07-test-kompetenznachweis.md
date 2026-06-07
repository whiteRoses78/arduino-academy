# Test / Kompetenznachweis — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pro Lektion ein einmaliger, digital benoteter Multiple-Choice-Test, der serverseitig fair bewertet wird, dem Schüler sein Ergebnis + Auflösung zeigt und dem Lehrer eine Konten-Übersicht liefert. Durchstich: Lektion „LEDs ansteuern".

**Architecture:** Zwei neue Tabellen (`test_questions`, `test_attempts`) + drei `SECURITY DEFINER`-RPCs (Muster wie `set_teacher_role`). Die richtigen Antworten verlassen die DB **nie** vor dem Abschicken: `get_test_questions` liefert Fragen ohne Lösung, `submit_test` bewertet serverseitig + schreibt genau einen Versuch (unique-constraint), `list_test_results` ist teacher/admin-only. UI: neuer Test-Runner (Sammel-Modus ohne Sofort-Feedback) + Ergebnis-Ansicht + Lehrer-Seite.

**Tech Stack:** Next 16 (App Router, Server Components + Server Actions), Supabase (Postgres + RLS + RPC via MCP), React 19, TS strict, Tailwind v4, vitest.

**Durchstich-Vereinfachung (bewusst):** Test-Fragen sind **Multiple-Choice**. Das hält die serverseitige Bewertung trivial + sicher (Index-Vergleich). Matching/Ordering im Test sind ein späterer Ausbau; die Tabellen-/RPC-Struktur lässt sie zu (`type`-Spalte vorhanden), aber der Durchstich-Content und die Bewertung decken nur MC ab.

---

## File Structure

| Datei | Verantwortung | Neu/Ändern |
|---|---|---|
| DB-Migration `test_feature` (via Supabase MCP) | Tabellen + RLS + Grants + 3 RPCs | Neu (MCP) |
| `db/schema.sql` | Migration zusätzlich im Schema-File dokumentieren (Quelle der Wahrheit) | Ändern |
| `src/lib/database.types.ts` | regenerierte TS-Typen | Ändern (generiert) |
| `src/lib/test/types.ts` | TS-Typen für Test-Fragen (ohne Lösung) + Submit-Ergebnis | Neu |
| `src/lib/test/actions.ts` | Server Actions: `loadTest`, `submitTest` (rufen die RPCs) | Neu |
| `src/components/test/test-runner.tsx` | Client: Fragen sammeln (kein Feedback), abschicken | Neu |
| `src/components/test/test-question-mc.tsx` | Client: eine MC-Frage im Sammel-Modus (nur Auswahl) | Neu |
| `src/components/test/test-result.tsx` | Client/Server: Punkte/Prozent + Auflösung | Neu |
| `src/components/test/start-test.tsx` | „Test starten"-Block auf der Lektionsseite | Neu |
| `src/app/modul/[modul]/[lektion]/page.tsx` | Test-Block einbinden (nur wenn Testfragen existieren) | Ändern |
| `src/app/lehrer/tests/page.tsx` | Lehrer-Übersicht (Guard + Tabelle via `list_test_results`) | Neu |
| `db/test-questions-data.mjs` | re-seed-feste Quelle der LEDs-Testfragen (Marco-geprüft) | Neu |
| `db/seed-test-questions.mjs` | seedet test_questions aus der Datenquelle | Neu |

---

## Task 1: Datenbank-Schema (Tabellen + RLS + Grants)

**Files:**
- DB-Migration via Supabase MCP `apply_migration` (name: `test_feature_tables`)
- Modify: `db/schema.sql` (gleiches SQL anhängen, damit das File die Wahrheit bleibt)

- [ ] **Step 1: Migration anwenden** (MCP `apply_migration`, name `test_feature_tables`):

```sql
-- ---------- TEST_QUESTIONS (Test-Fragen, Lösung geheim) ----------
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
-- KEIN public-read: students dürfen die Lösung NICHT lesen. Zugriff nur via DEFINER-RPCs.
-- teacher/admin dürfen zur Kontrolle lesen.
drop policy if exists "teachers read test_questions" on public.test_questions;
create policy "teachers read test_questions" on public.test_questions
  for select using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('teacher','admin')
  ));
grant select on public.test_questions to authenticated;  -- RLS schränkt auf teacher/admin

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
grant select on public.test_attempts to authenticated;  -- KEIN insert: nur via submit_test-RPC
```

- [ ] **Step 2: In `db/schema.sql` anhängen** — dasselbe SQL unter einem neuen Abschnitt `-- TEST-FEATURE (Spec 2026-06-07)` einfügen (Quelle der Wahrheit; das File wird nicht automatisch angewandt, dient als Referenz).

- [ ] **Step 3: Verifizieren** (MCP `execute_sql`):

```sql
select tablename from pg_tables where schemaname='public' and tablename like 'test_%';
-- Erwartet: test_questions, test_attempts
select polname, tablename from pg_policies where tablename in ('test_questions','test_attempts');
-- Erwartet: teachers read test_questions; own attempts select; teachers read attempts
```
Erwartung: beide Tabellen + drei Policies vorhanden.

---

## Task 2: RPC `get_test_questions` (Fragen ohne Lösung, sperrt nach Versuch)

**Files:** DB-Migration via MCP (`apply_migration`, name `test_rpc_get_questions`) + `db/schema.sql` anhängen.

- [ ] **Step 1: Funktion anlegen:**

```sql
create or replace function public.get_test_questions(p_lesson_id uuid)
returns table (id uuid, position integer, type text, question text, options jsonb)
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Bitte zuerst anmelden.'; end if;
  if exists (select 1 from public.test_attempts a
             where a.user_id = auth.uid() and a.lesson_id = p_lesson_id) then
    raise exception 'TEST_BEREITS_ABGELEGT';
  end if;
  return query
    select q.id, q.position, q.type,
           q.payload->>'question'  as question,
           q.payload->'options'    as options          -- options[] OHNE correct/explanation
    from public.test_questions q
    where q.lesson_id = p_lesson_id
    order by q.position;
end; $$;
revoke execute on function public.get_test_questions(uuid) from public, anon;
grant execute on function public.get_test_questions(uuid) to authenticated;
```

- [ ] **Step 2: Sicherheits-Check** (MCP `execute_sql`): bestätige, dass die Funktion `correct`/`explanation` NICHT zurückgibt — die Rückgabespalten sind nur `id, position, type, question, options`. (Code-Review der `returns table`-Signatur.)

- [ ] **Step 3: schema.sql anhängen + commit-fähig machen.**

---

## Task 3: RPC `submit_test` (serverseitige Bewertung + ein Versuch)

**Files:** DB-Migration via MCP (`apply_migration`, name `test_rpc_submit`) + `db/schema.sql`.

- [ ] **Step 1: Funktion anlegen:**

```sql
create or replace function public.submit_test(p_lesson_id uuid, p_answers jsonb)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_uid     uuid := auth.uid();
  v_score   integer := 0;
  v_max     integer := 0;
  v_results jsonb := '[]'::jsonb;
  v_percent integer;
  r         record;
  v_selected integer;
  v_correct  integer;
  v_ok       boolean;
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
      'is_correct', v_ok, 'explanation', r.payload->>'explanation'
    );
  end loop;

  if v_max = 0 then raise exception 'Kein Test fuer diese Lektion.'; end if;
  v_percent := round(100.0 * v_score / v_max);

  begin
    insert into public.test_attempts (user_id, lesson_id, score, max_score, percent, answers)
    values (v_uid, p_lesson_id, v_score, v_max, v_percent, p_answers);
  exception when unique_violation then
    raise exception 'TEST_BEREITS_ABGELEGT';
  end;

  return jsonb_build_object('score', v_score, 'max_score', v_max,
                            'percent', v_percent, 'results', v_results);
end; $$;
revoke execute on function public.submit_test(uuid, jsonb) from public, anon;
grant execute on function public.submit_test(uuid, jsonb) to authenticated;
```

- [ ] **Step 2: Bewertung verifizieren** (MCP `execute_sql`, mit echten Frage-IDs nach Task 10 — bis dahin mit 2 manuell eingefügten Test-Fragen): rufe `submit_test` mit (a) allen richtigen, (b) allen falschen Antworten auf, prüfe score/max/percent. Danach Testdaten + Attempt wieder löschen.

- [ ] **Step 3: „Ein Versuch" verifizieren:** `submit_test` zweimal mit demselben User → zweiter Aufruf wirft `TEST_BEREITS_ABGELEGT`. Attempt danach löschen.

- [ ] **Step 4: schema.sql anhängen.**

---

## Task 4: RPC `list_test_results` (Lehrer-Übersicht)

**Files:** DB-Migration via MCP (`apply_migration`, name `test_rpc_results`) + `db/schema.sql`.

- [ ] **Step 1: Funktion anlegen:**

```sql
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
```

- [ ] **Step 2: Verifizieren:** als Nicht-Teacher-Kontext wirft die Funktion „Nur Lehrer/Admins." (Review der Guard-Klausel; echter Test im E2E-Task 11).

- [ ] **Step 3: TS-Typen regenerieren** (MCP `generate_typescript_types`) → `src/lib/database.types.ts` überschreiben. `npm run build` muss weiter grün sein.

---

## Task 5: TS-Typen + Server Actions

**Files:**
- Create: `src/lib/test/types.ts`
- Create: `src/lib/test/actions.ts`

- [ ] **Step 1: `src/lib/test/types.ts`** — die client-sichtbaren Typen (OHNE Lösung) + Ergebnis:

```ts
// Frage, wie sie der Browser sieht — bewusst OHNE correct/explanation.
export type TestQuestion = {
  id: string;
  position: number;
  type: "multiple-choice";
  question: string;
  options: string[];
};

// Auflösung pro Frage (kommt erst nach dem Abschicken vom Server).
export type TestQuestionResult = {
  id: string;
  selected: number | null;
  correct: number;
  is_correct: boolean;
  explanation: string | null;
};

export type TestResult = {
  score: number;
  max_score: number;
  percent: number;
  results: TestQuestionResult[];
};

// Antworten des Schülers: { [question_id]: gewählter Options-Index }.
export type TestAnswers = Record<string, number>;
```

- [ ] **Step 2: `src/lib/test/actions.ts`** — zwei Server Actions, die die RPCs kapseln (Muster: `src/lib/progress/actions.ts`):

```ts
"use server";
import { createClient } from "@/lib/supabase/server";
import type { TestQuestion, TestResult, TestAnswers } from "./types";

export type LoadResult =
  | { ok: true; questions: TestQuestion[] }
  | { ok: false; error: "ALREADY_DONE" | "AUTH" | "GENERIC" };

export async function loadTest(lessonId: string): Promise<LoadResult> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_test_questions", { p_lesson_id: lessonId });
  if (error) {
    if (error.message.includes("TEST_BEREITS_ABGELEGT")) return { ok: false, error: "ALREADY_DONE" };
    if (error.message.includes("anmelden")) return { ok: false, error: "AUTH" };
    return { ok: false, error: "GENERIC" };
  }
  const questions: TestQuestion[] = (data ?? []).map((q) => ({
    id: q.id, position: q.position, type: "multiple-choice",
    question: q.question, options: (q.options as string[]) ?? [],
  }));
  return { ok: true, questions };
}

export type SubmitResult =
  | { ok: true; result: TestResult }
  | { ok: false; error: "ALREADY_DONE" | "AUTH" | "GENERIC" };

export async function submitTest(lessonId: string, answers: TestAnswers): Promise<SubmitResult> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("submit_test", { p_lesson_id: lessonId, p_answers: answers });
  if (error) {
    if (error.message.includes("TEST_BEREITS_ABGELEGT")) return { ok: false, error: "ALREADY_DONE" };
    if (error.message.includes("anmelden")) return { ok: false, error: "AUTH" };
    return { ok: false, error: "GENERIC" };
  }
  return { ok: true, result: data as unknown as TestResult };
}
```

- [ ] **Step 3:** `npm run build` grün (Typen passen zu den regenerierten DB-Typen).

---

## Task 6: Schüler-UI — Test-Runner + MC-Frage (Sammel-Modus)

**Files:**
- Create: `src/components/test/test-question-mc.tsx`
- Create: `src/components/test/test-runner.tsx`

Designvorgabe: **kein Sofort-Feedback** (anders als `multiple-choice.tsx`). Die MC-Frage zeigt nur Frage + Optionen, markiert die Auswahl, meldet sie nach oben. Styling vom bestehenden `multiple-choice.tsx` übernehmen (gleiche Button-Klassen, `dangerouslySetInnerHTML` für question/options).

- [ ] **Step 1: `test-question-mc.tsx`** — Props `{ question: TestQuestion; selected: number | null; onSelect: (i: number) => void }`. Rendert die Optionen als Buttons; der gewählte Button ist hervorgehoben (`border-primary bg-primary/10`); KEINE richtig/falsch-Färbung. Keine `correct`-Info vorhanden.

- [ ] **Step 2: `test-runner.tsx`** (Client) — Props `{ lessonId: string }`. Zustände: `questions | null`, `answers: TestAnswers`, `result: TestResult | null`, `phase: "intro" | "running" | "done" | "locked"`, `error`. Ablauf:
  - „Test starten" → `loadTest(lessonId)`. Bei `ALREADY_DONE` → `phase="locked"` (Hinweis „Test schon abgelegt"). Bei `AUTH` → Hinweis „bitte anmelden".
  - `running`: alle Fragen untereinander, je `test-question-mc`, Auswahl in `answers`. Abschicken erst aktiv, wenn alle beantwortet.
  - „Abschicken" → `submitTest(lessonId, answers)` → `result`, `phase="done"`, rendert `test-result`.

- [ ] **Step 3: Verifizieren** (nach Task 8 + 10 zusammen, manuell im Browser): Auswahl funktioniert, kein Feedback vor Abschicken, Abschicken erst bei vollständiger Beantwortung. `npm run build` + lint grün.

---

## Task 7: Schüler-UI — Ergebnis-Ansicht

**Files:** Create: `src/components/test/test-result.tsx`

- [ ] **Step 1:** Props `{ questions: TestQuestion[]; result: TestResult }`. Zeigt oben groß „**{score} von {max_score} ({percent} %)**". Darunter pro Frage: Fragetext, alle Optionen mit Markierung (gewählt / richtig), und die `explanation` (jetzt erst sichtbar — Auflösung). Richtig = grün (`border-primary`), falsch gewählt = rot (`border-destructive`). Styling konsistent mit `multiple-choice.tsx`.

- [ ] **Step 2:** Hinweis-Box: „Das war dein einziger Versuch — das Ergebnis ist gespeichert."

- [ ] **Step 3:** `npm run build` + lint grün.

---

## Task 8: Test-Block auf der Lektionsseite einbinden

**Files:**
- Create: `src/components/test/start-test.tsx`
- Modify: `src/app/modul/[modul]/[lektion]/page.tsx`

- [ ] **Step 1: `start-test.tsx`** — abgesetzter Block (Theme-Tokens, wie `parts-list.tsx`): Überschrift „📝 Kompetenztest", kurzer Hinweis „Ein Versuch, zählt — im Unterricht bearbeiten." + `<TestRunner lessonId=… />`. Für nicht-eingeloggte User: Hinweis „Zum Testen bitte anmelden" statt Runner.

- [ ] **Step 2: page.tsx** — prüfen, ob für die Lektion Testfragen existieren (Server-seitig: `count` auf `test_questions` per `lesson_id` — als teacher/admin lesbar; für students reicht ein leichter Existenz-Check über eine kleine Server-Funktion ODER: Block immer zeigen und der Runner meldet „kein Test"). **Entscheidung:** Block nur rendern, wenn `lesson` Testfragen hat — dazu eine schlanke DEFINER-RPC `has_test(lesson_id) returns boolean` (authenticated) ergänzen (gibt nur true/false, keine Inhalte). Den Block **nach** `PraxisSection`, vor `TeacherSolution` einsetzen.

- [ ] **Step 3:** `has_test`-RPC anlegen (MCP + schema.sql):

```sql
create or replace function public.has_test(p_lesson_id uuid)
returns boolean language sql security definer set search_path = public as $$
  select exists (select 1 from public.test_questions where lesson_id = p_lesson_id);
$$;
revoke execute on function public.has_test(uuid) from public;
grant execute on function public.has_test(uuid) to anon, authenticated;
```

- [ ] **Step 4:** `npm run build` + lint grün; Lektion ohne Testfragen zeigt keinen Block.

---

## Task 9: Lehrer-Übersichtsseite

**Files:** Create: `src/app/lehrer/tests/page.tsx`

- [ ] **Step 1:** Server Component, Guard wie `src/app/admin/page.tsx`: `if (!canViewSolutions(await getCurrentUserRole())) redirect("/")`. (teacher + admin dürfen.)

- [ ] **Step 2:** Lektionsauswahl: für den Durchstich fest die LEDs-Lektion (`getLesson("digital","leds-ansteuern")`), `supabase.rpc("list_test_results", { p_lesson_id })`. Tabelle: Kontoname · Punkte · Prozent · Datum/Uhrzeit. Hinweis-Zeile: „Zuordnung zum echten Namen über die Zugangskärtchen."

- [ ] **Step 3:** Link zur Seite im Header für teacher/admin (analog Admin-Link in `site-header.tsx`, eingeblendet via `canViewSolutions`).

- [ ] **Step 4:** `npm run build` + lint grün.

---

## Task 10: Content — Testfragen für „LEDs ansteuern"

**Files:**
- Create: `db/test-questions-data.mjs` (re-seed-feste Quelle)
- Create: `db/seed-test-questions.mjs` (seedet via PostgrestClient/MCP)

- [ ] **Step 1: Fragen entwerfen** — ~6–8 Multiple-Choice-Fragen zur LEDs-Lektion: die 2 bestehenden MC-Übungen als Basis (aus `exercises` übernehmen) + ~4–6 neue Fragen zum selben Stoff (Vorwiderstand, Polung/Anode-Kathode, pinMode/digitalWrite, HIGH/LOW, Ohm'sches Gesetz im LED-Kontext). Format pro Frage: `{ question, options[4], correct, explanation }`.

- [ ] **Step 2: Marco-Review** — Entwürfe als Review-Doc (`docs/review-test-leds.md`) vorlegen; erst nach fachlicher Freigabe weiter (Muster wie Lehrer-Lösungen Etappe 2).

- [ ] **Step 3: Seeden** — `db/test-questions-data.mjs` füllen, `db/seed-test-questions.mjs` schreibt sie in `test_questions` (lesson_id der LEDs-Lektion, position fortlaufend). Da `test_questions` keinen anon-Insert erlaubt: via MCP `execute_sql` (Service-Role) inserten — NIE anon-Fenster (Memory-Regel).

- [ ] **Step 4: Verifizieren:** `select count(*) from test_questions where lesson_id = …` = Anzahl der Fragen.

---

## Task 11: End-to-End-Verifikation

- [ ] **Step 1: Sicherheit (Lösungs-Leak):** Als eingeloggter Test-Schüler `get_test_questions` aufrufen → Rückgabe enthält **kein** `correct`/`explanation`. (MCP/Server-Log.)
- [ ] **Step 2: Ein Versuch:** Schüler macht den Test → Ergebnis + Auflösung sichtbar. Seite neu laden → `phase="locked"`, kein zweiter Versuch.
- [ ] **Step 3: Bewertung korrekt:** Bekannte Antworten → erwartete Punktzahl/Prozent.
- [ ] **Step 4: Lehrer-Sicht:** Marco (admin) öffnet `/lehrer/tests` → sieht den Account + Ergebnis. Als Nicht-Lehrer → Redirect.
- [ ] **Step 5: Keine Regression:** Übungen, Praxis, Selbsteinschätzung der Lektion unverändert; Lektion ohne Testfragen zeigt keinen Test-Block.
- [ ] **Step 6:** `npm run build` + lint + `npm test` grün.
- [ ] **Step 7: Commit + Deploy** (auf Marcos Freigabe): `gh auth switch --user whiteRoses78`, Commit `--no-verify` (Secret-Scanner-Fehlalarm), push → Netlify-Auto-Deploy, Live wasserdicht prüfen (Test-Block auf der LEDs-Lektion live).

---

## Self-Review-Notiz

- **Spec-Abdeckung:** ein Versuch (unique-constraint, Task 1+3) ✓; serverseitige Bewertung/kein Leak (Task 2,3,11) ✓; Punkte/Prozent statt Note (Task 3,7) ✓; Lehrer-Übersicht teacher/admin-only (Task 4,9) ✓; Mischung bestehende+neue Fragen (Task 10) ✓; Durchstich LEDs (Task 9,10) ✓; Datenschutz: nur Kontoname+Punkte (Task 4,9) ✓.
- **Offen/abweichend von der Spec:** Durchstich nur **MC** (Spec nannte alle drei Typen) — bewusste Vereinfachung, oben dokumentiert, Marco beim Plan-Handoff bestätigen lassen.
- **Typkonsistenz:** RPC-Rückgaben ↔ `TestQuestion`/`TestResult` (Task 5) abgeglichen; `answers` = `{question_id: index}` durchgängig (Task 3,5,6).
