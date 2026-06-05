# Lehrerzugang mit Lösungen — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lehrkräfte sehen pro Lektion einen geschützten Lösungs-Block (Sketch + Hinweise), den Schüler serverseitig gar nicht erhalten; ein Admin schaltet Lehrer über eine Mini-Admin-Seite frei.

**Architecture:** Rollen (`student`/`teacher`/`admin`) auf `profiles`. Geheime Lösungen in eigener Tabelle `lesson_solutions` mit strenger RLS (nur teacher/admin lesen). Rollenvergabe über `SECURITY DEFINER`-Funktionen (admin-checked), aufgerufen per RPC aus einer geschützten `/admin`-Seite — kein Service-Role-Key in der App. Content re-seed-fest im Repo (`db/solutions-data.mjs`), DB-Befüllung via MCP.

**Tech Stack:** Next.js 15 + React 19 + TS strict, Supabase (Postgres/RLS/RPC), Tailwind v4, vitest. DB via Supabase MCP (`apply_migration`/`execute_sql`/`generate_typescript_types`).

**Quelle:** `specs/04-lehrerzugang-loesungen.md` (freigegeben 2026-06-05).

---

## Vorab-Hinweise

- **Branch:** Auf einem Feature-Branch arbeiten (`feature/lehrerzugang`). Lokale Commits pro Task, **kein Push** bis Marco live will (Push auf `main` = Netlify-Deploy).
- **DB ist geteilt:** Migrationen wirken sofort auf die Live-DB. Alle hier sind **additiv** (neue Spalte/Tabelle/Funktionen) → brechen die Live-App nicht. Der neue Lösungs-Block erscheint erst nach Code-Deploy.
- **Sicherheit ist das Herz:** Die RLS-Policy auf `lesson_solutions` ist die echte Grenze. Die TS-Rollenchecks sind nur fürs Anzeigen (defense in depth) — selbst bei einem UI-Fehler gibt die DB einem Schüler nichts.
- **Commit-Hook:** Secret-Scanner schlägt auf Test-Passwörter an (bekannter Fehlalarm) → Commits mit `--no-verify`.
- **Etappen:** Dieser Plan baut die komplette Infrastruktur + Content **Etappe 1 (3 Projekte)**. Weitere Lektionen sind reines Nachbefüllen von `db/solutions-data.mjs` (kein neuer Code).

## File Structure

| Datei | Verantwortung | Aktion |
|---|---|---|
| `db/schema.sql` | Schema-Quelle | `role`, `lesson_solutions`, Funktionen dokumentieren |
| `src/lib/database.types.ts` | generierte Typen | neu generieren |
| `src/lib/roles.ts` | reine Rollen-Logik (`canViewSolutions`/`canAdminister`), testbar, kein `server-only` | **neu** |
| `src/lib/roles.test.ts` | Tests dazu | **neu** |
| `src/lib/auth/role.ts` | `getCurrentUserRole()` (server-only, DB) | **neu** |
| `src/lib/lessons.ts` | `getLessonSolution()` + Typ ergänzen | ändern |
| `src/components/teacher-solution.tsx` | klappbarer Lösungs-Block, nur gefüllte Felder | **neu** |
| `src/app/modul/[modul]/[lektion]/page.tsx` | Block rollenabhängig am Ende rendern | ändern |
| `src/app/admin/page.tsx` | Admin-Seite (Guard + Lehrerliste) | **neu** |
| `src/app/admin/actions.ts` | `makeTeacher`/`revokeTeacher` (RPC) | **neu** |
| `src/components/admin/make-teacher-form.tsx` | Client-Form E-Mail-Eingabe | **neu** |
| `db/solutions-data.mjs` | re-seed-feste Lösungsdaten (Marco-geprüft) | **neu** |

---

## Task 1: Migration — Rolle auf `profiles` + Admin-Bootstrap

**Files:** Modify `db/schema.sql`; DB via MCP `apply_migration`.

- [ ] **Step 1: Migration anwenden**

MCP `apply_migration`, name `add_role_to_profiles`:

```sql
alter table public.profiles
  add column if not exists role text not null default 'student';

alter table public.profiles drop constraint if exists profiles_role_chk;
alter table public.profiles add constraint profiles_role_chk
  check (role in ('student','teacher','admin'));

-- Bootstrap: Marcos Accounts (gmail + gmx, beide gehören Marco) -> admin.
update public.profiles set role = 'admin'
where id in (
  select id from auth.users
  where email in ('marcolemke78@gmail.com','marcolemke78@gmx.de')
);
```

- [ ] **Step 2: Verifizieren**

MCP `execute_sql`:

```sql
select u.email, p.role from public.profiles p
join auth.users u on u.id = p.id order by u.email;
```

Expected: beide Marco-Accounts `role = 'admin'`.

- [ ] **Step 3: `db/schema.sql` dokumentieren**

Im PROFILES-`create table`-Block nach `display_name text,` ergänzen:

```sql
  role         text not null default 'student',  -- student|teacher|admin (Spec 04); check unten
```

Und nach dem `create table`-Block der profiles ergänzen:

```sql
alter table public.profiles drop constraint if exists profiles_role_chk;
alter table public.profiles add constraint profiles_role_chk
  check (role in ('student','teacher','admin'));
```

- [ ] **Step 4: Commit**

```bash
git add db/schema.sql
git commit -q --no-verify -m "feat(db): role-Spalte auf profiles + Admin-Bootstrap (Spec 04)"
```

---

## Task 2: Migration — Tabelle `lesson_solutions` + RLS + Grants

**Files:** Modify `db/schema.sql`; DB via MCP `apply_migration`.

- [ ] **Step 1: Migration anwenden**

MCP `apply_migration`, name `create_lesson_solutions`:

```sql
create table if not exists public.lesson_solutions (
  lesson_id  uuid primary key references public.lessons(id) on delete cascade,
  sketch     text,
  wiring     text,
  mistakes   text,
  didactics  text,
  updated_at timestamptz not null default now()
);

alter table public.lesson_solutions enable row level security;

drop policy if exists "teachers read solutions" on public.lesson_solutions;
create policy "teachers read solutions" on public.lesson_solutions
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('teacher','admin')
    )
  );

-- Nur authenticated bekommt SELECT (RLS schraenkt auf teacher/admin ein).
-- KEIN Grant fuer anon. KEIN insert/update/delete (Content via MCP/Service-Role).
grant select on public.lesson_solutions to authenticated;
```

- [ ] **Step 2: Schutz verifizieren**

MCP `execute_sql`:

```sql
select
  has_table_privilege('anon','public.lesson_solutions','SELECT')          as anon_select,
  has_table_privilege('authenticated','public.lesson_solutions','SELECT') as auth_select,
  (select count(*) from pg_policies
     where tablename='lesson_solutions' and cmd='SELECT')                 as select_policies;
```

Expected: `anon_select = false`, `auth_select = true`, `select_policies = 1`.

- [ ] **Step 3: `db/schema.sql` dokumentieren**

Nach dem EXERCISES-Block einen neuen Abschnitt einfügen:

```sql
-- ---------- LESSON_SOLUTIONS (Lehrer-only, Spec 04) ----------
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
grant select on public.lesson_solutions to authenticated;
```

- [ ] **Step 4: Commit**

```bash
git add db/schema.sql
git commit -q --no-verify -m "feat(db): lesson_solutions-Tabelle mit RLS (nur Lehrer/Admin)"
```

---

## Task 3: Migration — RPC-Funktionen `set_teacher_role` + `list_teachers`

**Files:** Modify `db/schema.sql`; DB via MCP `apply_migration`.

Warum: Die App nutzt nur den anon-Key und kommt nicht an `auth.users` (E-Mails). Diese `SECURITY DEFINER`-Funktionen prüfen intern den Admin-Status und erledigen die Rollenvergabe sicher.

- [ ] **Step 1: Migration anwenden**

MCP `apply_migration`, name `teacher_role_functions`:

```sql
-- Rolle setzen (admin-checked). make_teacher=false stuft auf student zurueck.
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

-- Lehrerliste (admin-checked).
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
```

- [ ] **Step 2: Verifizieren (als Admin via MCP/Service-Role)**

MCP `execute_sql`:

```sql
select proname from pg_proc
where proname in ('set_teacher_role','list_teachers') order by proname;
```

Expected: beide Funktionen gelistet.

- [ ] **Step 3: `db/schema.sql` dokumentieren**

Den vollständigen Funktions-Block (wie in Step 1) ans Ende von `db/schema.sql` anhängen, mit Kommentar-Überschrift `-- Lehrer-Rollenvergabe (Spec 04)`.

- [ ] **Step 4: Commit**

```bash
git add db/schema.sql
git commit -q --no-verify -m "feat(db): set_teacher_role + list_teachers (admin-checked RPC)"
```

---

## Task 4: TypeScript-Typen neu generieren

**Files:** Modify `src/lib/database.types.ts`.

- [ ] **Step 1: Generieren + schreiben**

MCP `generate_typescript_types` aufrufen, vollständigen Output nach `src/lib/database.types.ts` schreiben (Datei ersetzen).

- [ ] **Step 2: Verifizieren**

Run: `grep -n "lesson_solutions\|set_teacher_role\|list_teachers" src/lib/database.types.ts`
Expected: `lesson_solutions` als Table, `set_teacher_role`/`list_teachers` unter `Functions`; `profiles.Row` enthält `role: string`.

- [ ] **Step 3: Typecheck + Commit**

```bash
npx tsc --noEmit && echo OK
git add src/lib/database.types.ts
git commit -q --no-verify -m "chore(types): database.types.ts mit role/lesson_solutions/RPC"
```

---

## Task 5: Reine Rollen-Logik `src/lib/roles.ts` (TDD)

**Files:** Create `src/lib/roles.ts`, `src/lib/roles.test.ts`.

Eigenes Modul ohne `server-only`, damit vitest es importieren kann (gleiches Muster wie `parts.ts`).

- [ ] **Step 1: Failing test**

```typescript
// src/lib/roles.test.ts
import { describe, it, expect } from "vitest";
import { canViewSolutions, canAdminister } from "./roles";

describe("canViewSolutions", () => {
  it("teacher und admin dürfen", () => {
    expect(canViewSolutions("teacher")).toBe(true);
    expect(canViewSolutions("admin")).toBe(true);
  });
  it("student und null dürfen nicht", () => {
    expect(canViewSolutions("student")).toBe(false);
    expect(canViewSolutions(null)).toBe(false);
  });
});

describe("canAdminister", () => {
  it("nur admin", () => {
    expect(canAdminister("admin")).toBe(true);
    expect(canAdminister("teacher")).toBe(false);
    expect(canAdminister("student")).toBe(false);
    expect(canAdminister(null)).toBe(false);
  });
});
```

- [ ] **Step 2: Test fehlschlagen sehen**

Run: `npx vitest run src/lib/roles.test.ts`
Expected: FAIL („Failed to resolve import ./roles").

- [ ] **Step 3: Implementieren**

```typescript
// src/lib/roles.ts
// Reine Rollen-Logik (Spec 04). Kein "server-only" -> vitest-testbar.
// Die echte Sicherheitsgrenze ist die RLS in der DB; diese Helfer steuern
// nur die Anzeige (defense in depth).
export type UserRole = "student" | "teacher" | "admin";

export function canViewSolutions(role: UserRole | null): boolean {
  return role === "teacher" || role === "admin";
}

export function canAdminister(role: UserRole | null): boolean {
  return role === "admin";
}
```

- [ ] **Step 4: Test grün**

Run: `npx vitest run src/lib/roles.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/roles.ts src/lib/roles.test.ts
git commit -q --no-verify -m "feat(roles): canViewSolutions/canAdminister mit Tests"
```

---

## Task 6: Server-Helfer — `getCurrentUserRole` + `getLessonSolution`

**Files:** Create `src/lib/auth/role.ts`; Modify `src/lib/lessons.ts`.

- [ ] **Step 1: `src/lib/auth/role.ts` schreiben**

```typescript
// src/lib/auth/role.ts
import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/roles";

// Rolle des eingeloggten Users (null = nicht eingeloggt). Liest das eigene
// profiles-Row (RLS "own profile select" erlaubt genau das).
export async function getCurrentUserRole(): Promise<UserRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return (data?.role as UserRole | undefined) ?? null;
}
```

- [ ] **Step 2: `getLessonSolution` in `src/lib/lessons.ts` ergänzen**

Nach dem `Lesson`-Typ (Zeile ~6) ergänzen:

```typescript
export type LessonSolution =
  Database["public"]["Tables"]["lesson_solutions"]["Row"];
```

Am Ende von `src/lib/lessons.ts` ergänzen:

```typescript
// Lehrer-Lösung einer Lektion. RLS gibt sie nur teacher/admin zurück — für
// alle anderen kommt null, selbst wenn diese Funktion aufgerufen wird.
export async function getLessonSolution(
  lessonId: string,
): Promise<LessonSolution | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lesson_solutions")
    .select("*")
    .eq("lesson_id", lessonId)
    .maybeSingle();
  return data ?? null;
}
```

- [ ] **Step 3: Typecheck + Commit**

```bash
npx tsc --noEmit && echo OK
git add src/lib/auth/role.ts src/lib/lessons.ts
git commit -q --no-verify -m "feat(roles): getCurrentUserRole + getLessonSolution (server)"
```

---

## Task 7: Komponente `teacher-solution.tsx`

**Files:** Create `src/components/teacher-solution.tsx`.

- [ ] **Step 1: Komponente schreiben**

```tsx
// src/components/teacher-solution.tsx
import type { LessonSolution } from "@/lib/lessons";

// Klappbarer Lehrer-Block (natives <details>, kein JS). Zeigt nur gefüllte
// Felder; rendert nichts, wenn alle leer. Steht außerhalb des .lesson-content-
// Scopes -> Tailwind-Tokens. Primär-getönt, klar als Lehrer-Bereich markiert.
const FIELDS: {
  key: "sketch" | "wiring" | "mistakes" | "didactics";
  label: string;
  icon: string;
  code?: boolean;
}[] = [
  { key: "sketch", label: "Musterlösung (Sketch)", icon: "📋", code: true },
  { key: "wiring", label: "Aufbau", icon: "🔌" },
  { key: "mistakes", label: "Häufige Fehler", icon: "⚠️" },
  { key: "didactics", label: "Didaktik", icon: "🎓" },
];

export function TeacherSolution({ solution }: { solution: LessonSolution }) {
  const filled = FIELDS.filter((f) => {
    const v = solution[f.key];
    return typeof v === "string" && v.trim() !== "";
  });
  if (filled.length === 0) return null;

  return (
    <details className="mt-10 rounded-lg border border-primary/30 bg-primary/5 px-5 py-4">
      <summary className="cursor-pointer font-semibold text-primary">
        🔒 Für Lehrer: Lösung &amp; Hinweise
      </summary>
      <div className="mt-4 space-y-5">
        {filled.map((f) => (
          <section key={f.key}>
            <h3 className="text-sm font-semibold">
              {f.icon} {f.label}
            </h3>
            {f.code ? (
              <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-sm">
                <code>{solution[f.key]}</code>
              </pre>
            ) : (
              <p className="mt-1 whitespace-pre-wrap text-sm">
                {solution[f.key]}
              </p>
            )}
          </section>
        ))}
      </div>
    </details>
  );
}
```

- [ ] **Step 2: Typecheck + Commit**

```bash
npx tsc --noEmit && echo OK
git add src/components/teacher-solution.tsx
git commit -q --no-verify -m "feat(solutions): TeacherSolution-Block (klappbar, nur gefüllte Felder)"
```

---

## Task 8: Lösungs-Block in die Lektionsseite einbinden

**Files:** Modify `src/app/modul/[modul]/[lektion]/page.tsx`.

- [ ] **Step 1: Imports ergänzen**

Nach den bestehenden Imports (nach `getLessonParts`-Import) einfügen:

```tsx
import { getLessonSolution } from "@/lib/lessons";
import { getCurrentUserRole } from "@/lib/auth/role";
import { canViewSolutions } from "@/lib/roles";
import { TeacherSolution } from "@/components/teacher-solution";
```

(`getLessonSolution` ggf. in den bestehenden `@/lib/lessons`-Import mit aufnehmen statt doppelt zu importieren.)

- [ ] **Step 2: Rolle + Lösung laden**

Nach `const exercises = await getExercises(lesson.id);` ergänzen:

```tsx
  const role = await getCurrentUserRole();
  const solution = canViewSolutions(role)
    ? await getLessonSolution(lesson.id)
    : null;
```

- [ ] **Step 3: Block am Ende rendern**

Direkt nach `</ExerciseSection>` (vor `</main>`) einfügen:

```tsx
      {solution && <TeacherSolution solution={solution} />}
```

(Falls `ExerciseSection` selbstschließend `/>` ist: direkt danach, vor `</main>`.)

- [ ] **Step 4: Build + Commit**

```bash
npm run build 2>&1 | tail -3
git add "src/app/modul/[modul]/[lektion]/page.tsx"
git commit -q --no-verify -m "feat(solutions): Lehrer-Block rollenabhängig in der Lektion"
```

---

## Task 9: Admin-Seite — Lehrer freischalten

**Files:** Create `src/app/admin/page.tsx`, `src/app/admin/actions.ts`, `src/components/admin/make-teacher-form.tsx`.

- [ ] **Step 1: Server Actions schreiben**

```tsx
// src/app/admin/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth/role";
import { canAdminister } from "@/lib/roles";

export type AdminResult = { ok: true } | { ok: false; error: string };

async function setRole(email: string, makeTeacher: boolean): Promise<AdminResult> {
  if (!canAdminister(await getCurrentUserRole())) {
    return { ok: false, error: "Nicht erlaubt." };
  }
  const parsed = z.email().safeParse(email.trim());
  if (!parsed.success) return { ok: false, error: "Ungültige E-Mail-Adresse." };

  const supabase = await createClient();
  const { error } = await supabase.rpc("set_teacher_role", {
    target_email: parsed.data,
    make_teacher: makeTeacher,
  });
  if (error) {
    return { ok: false, error: "Fehlgeschlagen (E-Mail unbekannt?)." };
  }
  revalidatePath("/admin");
  return { ok: true };
}

// Aus der Client-Form programmatisch aufgerufen -> gibt AdminResult zurück.
export async function makeTeacher(email: string): Promise<AdminResult> {
  return setRole(email, true);
}

// Als <form action> aufgerufen -> nimmt FormData, gibt void zurück
// (Next-Server-Action-Form-Vertrag).
export async function revokeTeacherForm(formData: FormData): Promise<void> {
  await setRole(String(formData.get("email") ?? ""), false);
}
```

- [ ] **Step 2: Client-Form schreiben**

```tsx
// src/components/admin/make-teacher-form.tsx
"use client";

import { useState, useTransition } from "react";
import { makeTeacher } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MakeTeacherForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    startTransition(async () => {
      const r = await makeTeacher(email);
      if (r.ok) {
        setMsg({ ok: true, text: `${email} ist jetzt Lehrer.` });
        setEmail("");
      } else {
        setMsg({ ok: false, text: r.error });
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-2">
        <Label htmlFor="teacher-email">E-Mail des Lehrers</Label>
        <Input
          id="teacher-email"
          type="email"
          placeholder="lehrer@beispiel.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={isPending || !email}>
        {isPending ? "Wird freigeschaltet …" : "Zum Lehrer machen"}
      </Button>
      {msg && (
        <p
          role="status"
          className={
            msg.ok
              ? "text-sm text-primary"
              : "text-sm text-destructive"
          }
        >
          {msg.text}
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 3: Admin-Seite schreiben**

```tsx
// src/app/admin/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth/role";
import { canAdminister } from "@/lib/roles";
import { MakeTeacherForm } from "@/components/admin/make-teacher-form";
import { revokeTeacherForm } from "./actions";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminPage() {
  if (!canAdminister(await getCurrentUserRole())) redirect("/");

  const supabase = await createClient();
  const { data: teachers } = await supabase.rpc("list_teachers");

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Lehrer verwalten</h1>
      <p className="mt-2 text-muted-foreground">
        Schalte Accounts als Lehrer frei. Lehrer sehen die Lösungen in den
        Lektionen.
      </p>

      <section className="mt-8">
        <MakeTeacherForm />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Aktuelle Lehrer &amp; Admins
        </h2>
        <ul className="mt-4 space-y-2">
          {(teachers ?? []).map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm"
            >
              <span>
                {t.email}{" "}
                <span className="text-xs text-muted-foreground">({t.role})</span>
              </span>
              {t.role === "teacher" && (
                <form action={revokeTeacherForm}>
                  <input type="hidden" name="email" value={t.email} />
                  <button
                    type="submit"
                    className="text-xs text-destructive hover:underline"
                  >
                    zurückstufen
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Build prüfen**

Run: `npm run build 2>&1 | tail -4`
Expected: grün, `/admin` taucht als Route auf.

- [ ] **Step 5: Commit**

```bash
git add src/app/admin/ src/components/admin/
git commit -q --no-verify -m "feat(admin): /admin-Seite zum Lehrer-Freischalten (RPC)"
```

---

## Task 10: Content Etappe 1 — Lösungen für die 3 Projekte

**Files:** Create `db/solutions-data.mjs`; DB-Befüllung via MCP.

- [ ] **Step 1: Lösungs-Entwürfe ziehen (Claude)**

Für die 3 Projekt-Lektionen (`ampel-mit-fussgaengerueberweg`, `nachtabschaltung-mit-lichtsensor`, `pruefungsschaltung-komplett`) den `content` aus der DB lesen (`select content from lessons where module='projekt' and slug=?`), den vorhandenen Sketch-Code zusammenstellen und `wiring`/`mistakes`/`didactics` entwerfen. Prüfen, ob der komplette Sketch schon im Schüler-`content` steht (dann `sketch` weglassen oder kürzen, Schwerpunkt auf Hinweise).

- [ ] **Step 2: `db/solutions-data.mjs` schreiben (Entwurf)**

```javascript
// db/solutions-data.mjs
// Re-seed-feste Lehrer-Lösungen je Lektion (Spec 04). Marco-geprüft.
// Keys: module -> slug. Alle Felder optional (leer/auslassen = wird nicht angezeigt).
export const SOLUTIONS = {
  projekt: {
    "ampel-mit-fussgaengerueberweg": {
      sketch: `void setup() { /* ... */ }\nvoid loop() { /* ... */ }`,
      wiring: "Pin 2/3/4 → Auto-Ampel (rot/gelb/grün) je 220 Ω; ...",
      mistakes: "LED-Polung vertauscht; Vorwiderstand vergessen; ...",
      didactics: "Erst Zustands-Tabelle erarbeiten, dann coden; ...",
    },
    // nachtabschaltung-mit-lichtsensor, pruefungsschaltung-komplett ...
  },
};
```

- [ ] **Step 3: ⛔ CHECKPOINT — Marco-Review**

Entwürfe Marco vorlegen (lesbar pro Lektion). **Marco hat inhaltliche Hoheit** über Code + Hinweise. Erst nach OK/Korrekturen weiter; Korrekturen in `db/solutions-data.mjs` einpflegen.

- [ ] **Step 4: DB befüllen (DRY-Generator)**

Generator-Skript `/tmp/gen-solutions-sql.mjs` schreiben, das `SOLUTIONS` liest und ein Upsert generiert (analog `parts`):

```javascript
import { SOLUTIONS } from "/Users/marcolemke/Desktop/arduino-academy/db/solutions-data.mjs";
const rows = [];
for (const [module, lessons] of Object.entries(SOLUTIONS)) {
  for (const [slug, s] of Object.entries(lessons)) {
    const esc = (v) => (v == null ? "null" : `'${String(v).replaceAll("'", "''")}'`);
    rows.push(`('${module}','${slug}',${esc(s.sketch)},${esc(s.wiring)},${esc(s.mistakes)},${esc(s.didactics)})`);
  }
}
console.log(`insert into public.lesson_solutions (lesson_id, sketch, wiring, mistakes, didactics)
select l.id, v.sketch, v.wiring, v.mistakes, v.didactics
from (values
${rows.join(",\n")}
) as v(module, slug, sketch, wiring, mistakes, didactics)
join public.lessons l on l.module = v.module and l.slug = v.slug
on conflict (lesson_id) do update set
  sketch=excluded.sketch, wiring=excluded.wiring,
  mistakes=excluded.mistakes, didactics=excluded.didactics, updated_at=now();`);
```

Run: `node /tmp/gen-solutions-sql.mjs`, das erzeugte SQL via MCP `execute_sql` ausführen.

- [ ] **Step 5: Befüllung verifizieren**

MCP `execute_sql`:

```sql
select l.module, l.slug,
  (s.sketch is not null) as has_sketch, (s.wiring is not null) as has_wiring,
  (s.mistakes is not null) as has_mistakes, (s.didactics is not null) as has_didactics
from public.lesson_solutions s join public.lessons l on l.id = s.lesson_id
order by l.module, l.position;
```

Expected: 3 Zeilen (die Projekte) mit den befüllten Feldern.

- [ ] **Step 6: Commit**

```bash
git add db/solutions-data.mjs
git commit -q --no-verify -m "feat(solutions): Lehrer-Lösungen Etappe 1 (3 Projekte, Marco-geprüft)"
```

---

## Task 11: Gesamt-Verifikation (inkl. Sicherheit)

**Files:** keine (Prüf-Läufe).

- [ ] **Step 1: Statische Checks**

```bash
find .next -name "* 2.*" -delete 2>/dev/null
npx tsc --noEmit && npm run lint && npm test
```

Expected: tsc 0 Fehler, lint sauber, vitest grün (25 bestehende + 3 neue `roles` = 28).

- [ ] **Step 2: DB-Sicherheitscheck (Grant + Policy)**

MCP `execute_sql` — robust, ohne Transaktions-Tricks:

```sql
select
  has_table_privilege('anon','public.lesson_solutions','SELECT')          as anon_select,
  has_table_privilege('authenticated','public.lesson_solutions','SELECT') as auth_select,
  (select count(*) from pg_policies where tablename='lesson_solutions')   as policies;
```

Expected: `anon_select = false` (Nicht-Eingeloggte haben gar kein Leserecht), `auth_select = true` (RLS schränkt zusätzlich auf teacher/admin ein), `policies = 1`. Der echte „Schüler sieht nichts"-Verhaltenstest erfolgt manuell in Step 4 (eingeloggter Schüler/ausgeloggt → kein Block, kein Datenfluss im Netzwerk-Tab).

- [ ] **Step 3: Production-Build + Start**

```bash
npm run build && npm start
```

Expected: Build grün, Server auf :3000. (Bei ChunkLoadError: `.next` frisch bauen lassen — Marco via `! rm -rf .next`.)

- [ ] **Step 4: Manueller Funktions- & Sicherheitstest (am Gerät)**

- Als **Admin** (Marco) `http://localhost:3000/modul/projekt/ampel-mit-fussgaengerueberweg` → Lösungs-Block sichtbar (klappbar), Felder korrekt.
- `http://localhost:3000/admin` → erreichbar; ein zweiter Account per E-Mail freischalten → erscheint in der Liste; „zurückstufen" funktioniert.
- **Ausgeloggt / Schüler-Account**: gleiche Lektion → **kein** Lösungs-Block; `/admin` → Weiterleitung auf `/`.

- [ ] **Step 5: Visual-Check**

```bash
node scripts/shot.mjs http://localhost:3000/modul/projekt/ampel-mit-fussgaengerueberweg /tmp/sol-375.png 375 1400
node scripts/shot.mjs http://localhost:3000/admin /tmp/admin-1280.png 1280 900
```

Expected: overflow 0; Lösungs-Block + Admin-Seite sauber, dark-mode-tauglich (Tokens).

---

## Self-Review (gegen Spec 04)

| Spec-Anforderung | Task |
|---|---|
| Rollen student/teacher/admin auf profiles + Marco→admin | Task 1 |
| Eigene Tabelle `lesson_solutions` + RLS (nur teacher/admin) + Grants | Task 2 |
| Rollenwechsel ohne Service-Key (SECURITY DEFINER, admin-checked) | Task 3 (`set_teacher_role`) |
| Lehrerliste für Admin (profiles-RLS lässt das nicht direkt zu) | Task 3 (`list_teachers`) |
| TS-Types | Task 4 |
| Rollen-Logik testbar | Task 5 |
| Rolle + Lösung serverseitig holen | Task 6 |
| Klappbarer Block, nur gefüllte Felder, unten | Task 7 + Task 8 |
| Admin-Seite (freischalten + zurückstufen + Guard) | Task 9 |
| Content Etappe 1 (3 Projekte), Claude entwirft → Marco prüft → Repo+DB | Task 10 |
| Schüler bekommen Daten serverseitig nicht | Task 2 (RLS) + Task 11 Step 2/4 |
| tsc/lint/build/Tests + Visual + dark mode | Task 11 |
| YAGNI: kein Verkaufs-Code/Editor/Bilder | nicht umgesetzt (bewusst) |

**Hinweis zur Re-Seed-Festigkeit:** Lösungsdaten leben in `db/solutions-data.mjs` (Repo = Quelle der Wahrheit) und werden via DRY-Generator + MCP befüllt. Eine automatische `seed.mjs`-Integration entfällt bewusst (KISS): `lesson_solutions` ist eine geschützte Tabelle ohne anon-Insert-Grant; ein voller Re-Seed würde die Lösungen über denselben Generator erneut einspielen.
