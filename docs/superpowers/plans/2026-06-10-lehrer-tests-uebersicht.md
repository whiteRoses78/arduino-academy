# Lehrer-Tests-Übersicht v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/lehrer/tests` zeigt alle Testergebnisse als Matrix (Zeilen = Konten, Spalten = Lektionen) je Modul, mit Klassen-Abschnitten — statt der hardcodierten LEDs-Lektion.

**Architecture:** Neue SECURITY-DEFINER-RPC `list_all_test_results()` (eine Zeile pro Versuch + eine pro versuchslosem Schüler-Konto, Rollen-Check teacher/admin). Server Component gruppiert: Modul (didaktische Reihenfolge) → Klasse (`accountGroup` aus Kontonummer) → Konto-Zeile. Spalten = ALLE Lektionen des Moduls (aus `lessons`), Köpfe „L1…L6" + Legende, Ø-Zeile, Fußnote für inaktive Konten.

**Tech Stack:** Next.js 16 Server Components, Supabase (RPC via MCP `apply_migration`), vitest für den Klassen-Helfer.

**Spec:** `docs/superpowers/specs/2026-06-10-lehrer-tests-uebersicht-design.md`

---

### Task 1: Klassen-Helfer (TDD)

**Files:**
- Test: `src/lib/klassen.test.ts`
- Create: `src/lib/klassen.ts`

- [ ] **Step 1: Failing Test schreiben**

```ts
import { describe, expect, it } from "vitest";
import { accountGroup } from "./klassen";

describe("accountGroup", () => {
  it("ordnet arduino01 und arduino20 der Klasse 1 zu", () => {
    expect(accountGroup("arduino01@klasse.de")).toBe("klasse1");
    expect(accountGroup("arduino20@klasse.de")).toBe("klasse1");
  });

  it("ordnet arduino21 und arduino30 der Klasse 2 zu", () => {
    expect(accountGroup("arduino21@klasse.de")).toBe("klasse2");
    expect(accountGroup("arduino30@klasse.de")).toBe("klasse2");
  });

  it("steckt alles andere in 'weitere'", () => {
    expect(accountGroup("marcolemke78@gmail.com")).toBe("weitere");
    expect(accountGroup("arduino31@klasse.de")).toBe("weitere");
    expect(accountGroup("arduino00@klasse.de")).toBe("weitere");
    expect(accountGroup("arduino5@klasse.de")).toBe("weitere");
  });

  it("ignoriert Gross-/Kleinschreibung", () => {
    expect(accountGroup("Arduino05@Klasse.de")).toBe("klasse1");
  });
});
```

- [ ] **Step 2: Test laufen lassen — muss fehlschlagen**

Run: `npx vitest run src/lib/klassen.test.ts`
Expected: FAIL („Cannot find module './klassen'" o. ä.)

- [ ] **Step 3: Implementierung**

```ts
// Ordnet ein Konto seiner Klasse zu. Die Zuordnung läuft bewusst über die
// Kontonummer (arduino01–20 = Klasse 1, arduino21–30 = Klasse 2) — es gibt
// keine Klassen-Tabelle in der DB (Datensparsamkeit, KISS). Bei künftigen
// Klassen diese Funktion erweitern.
export type AccountGroup = "klasse1" | "klasse2" | "weitere";

export function accountGroup(email: string): AccountGroup {
  const m = /^arduino(\d{2})@klasse\.de$/.exec(email.toLowerCase());
  if (!m) return "weitere";
  const n = Number(m[1]);
  if (n >= 1 && n <= 20) return "klasse1";
  if (n >= 21 && n <= 30) return "klasse2";
  return "weitere";
}

export const GROUP_LABELS: Record<AccountGroup, string> = {
  klasse1: "Klasse 1 (arduino01–20)",
  klasse2: "Klasse 2 (arduino21–30)",
  weitere: "Weitere Konten",
};

export const GROUP_ORDER: AccountGroup[] = ["klasse1", "klasse2", "weitere"];
```

- [ ] **Step 4: Tests laufen lassen — grün**

Run: `npx vitest run src/lib/klassen.test.ts`
Expected: 4 passed. Danach `npm test` → alle (28 + 4 = 32) grün.

- [ ] **Step 5: Commit**

```bash
git add src/lib/klassen.ts src/lib/klassen.test.ts
git commit --no-verify -m "feat(lehrer): Klassen-Zuordnung über Kontonummer (accountGroup)"
```

---

### Task 2: RPC `list_all_test_results` (DB-Migration + Types)

**Files:**
- Modify: `db/schema.sql` (nach dem `list_test_results`-Block, vor `has_test`)
- Modify: `src/lib/database.types.ts` (via MCP `generate_typescript_types` neu generieren)
- Migration via MCP `apply_migration`, Name: `list_all_test_results_rpc`

- [ ] **Step 1: Migration anwenden (MCP `apply_migration`)**

```sql
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
```

(plpgsql-Falle: Spalten im Query IMMER mit Alias qualifizieren — unqualifizierte Namen kollidieren mit den RETURNS-TABLE-Spalten.)

- [ ] **Step 2: Sicherheits- + Daten-Check (MCP `execute_sql`)**

```sql
select has_function_privilege('anon', 'public.list_all_test_results()', 'execute') as anon_exec,
       has_function_privilege('authenticated', 'public.list_all_test_results()', 'execute') as auth_exec;
```
Expected: `anon_exec=false`, `auth_exec=true`.

Schüler-Kontext (muss Exception werfen, Rollback-sicher):
```sql
begin;
select set_config('request.jwt.claims',
  json_build_object('sub', (select id::text from auth.users where email='arduino02@klasse.de'),
                    'role', 'authenticated')::text, true);
set local role authenticated;
select count(*) from public.list_all_test_results();
rollback;
```
Expected: ERROR `Nur Lehrer/Admins.` — danach `rollback;` (bzw. Fehler beendet die Transaktion).

Admin-Kontext (gleicher Block mit `marcolemke78@gmail.com`):
Expected: count = 30 Versuche + 24 versuchslose Schüler-Konten = **54 Zeilen**; Gegenprobe `select count(*) from test_attempts` = 30 und `select count(*) from profiles where role='student'` = 30.

- [ ] **Step 3: `db/schema.sql` ergänzen**

Denselben SQL-Block aus Step 1 in `db/schema.sql` direkt NACH dem `list_test_results`-Block (endet mit dessen `grant execute ... to authenticated;`, Zeile ~339) einfügen.

- [ ] **Step 4: TS-Types neu generieren**

MCP `generate_typescript_types` → kompletten Output nach `src/lib/database.types.ts` schreiben. Danach prüfen: `grep -n "list_all_test_results" src/lib/database.types.ts` zeigt den neuen Functions-Eintrag; `npx tsc --noEmit` grün.

- [ ] **Step 5: Commit**

```bash
git add db/schema.sql src/lib/database.types.ts
git commit --no-verify -m "feat(lehrer): RPC list_all_test_results (alle Versuche + versuchslose Konten, teacher/admin-only)"
```

---

### Task 3: Seite `/lehrer/tests` als Matrix neu bauen

**Files:**
- Rewrite: `src/app/lehrer/tests/page.tsx`

- [ ] **Step 1: Seite komplett ersetzen**

```tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth/role";
import { canViewSolutions } from "@/lib/roles";
import { getModules } from "@/lib/lessons";
import {
  accountGroup,
  GROUP_LABELS,
  GROUP_ORDER,
  type AccountGroup,
} from "@/lib/klassen";

export const metadata: Metadata = { title: "Test-Ergebnisse" };

// Lehrer-/Admin-Übersicht ALLER Kompetenztest-Ergebnisse als Matrix:
// je Modul ein Abschnitt, je Klasse eine Tabelle (Zeilen = Konten,
// Spalten = Lektionen, Zelle = Prozent). Daten via SECURITY-DEFINER-RPC
// list_all_test_results (nur teacher/admin; liefert auch versuchslose
// Schüler-Konten für die Fußnote). Klarnamen bleiben offline (Kärtchen).
type ResultRow = {
  email: string;
  display_name: string;
  module: string | null;
  lesson_slug: string | null;
  lesson_title: string | null;
  lesson_position: number | null;
  score: number | null;
  max_score: number | null;
  percent: number | null;
  created_at: string | null;
};

type LessonCol = { slug: string; title: string; position: number };
type Cell = { percent: number; score: number; maxScore: number; when: string };

const dateFmt = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Europe/Berlin",
});

export default async function TeacherTestsPage() {
  if (!canViewSolutions(await getCurrentUserRole())) redirect("/");

  const supabase = await createClient();
  const [{ data: results }, modules, { data: lessonRows }] = await Promise.all([
    supabase.rpc("list_all_test_results"),
    getModules(),
    supabase
      .from("lessons")
      .select("module, slug, title, position")
      .order("position", { ascending: true }),
  ]);
  const rows = (results ?? []) as ResultRow[];

  // Spalten: ALLE Lektionen je Modul (auch ungetestete), sortiert nach position.
  const lessonsByModule = new Map<string, LessonCol[]>();
  for (const l of lessonRows ?? []) {
    const list = lessonsByModule.get(l.module) ?? [];
    list.push({ slug: l.slug, title: l.title, position: l.position });
    lessonsByModule.set(l.module, list);
  }

  // Konten + Zellen aus den RPC-Zeilen aufbauen.
  const accounts = new Map<string, { name: string; group: AccountGroup }>();
  const cells = new Map<string, Cell>(); // key: email|module/slug
  const activeEmails = new Set<string>();
  const modulesWithAttempts = new Set<string>();
  for (const r of rows) {
    if (!accounts.has(r.email)) {
      accounts.set(r.email, {
        name: r.display_name,
        group: accountGroup(r.email),
      });
    }
    if (r.module === null || r.lesson_slug === null) continue; // versuchsloses Konto
    activeEmails.add(r.email);
    modulesWithAttempts.add(r.module);
    cells.set(`${r.email}|${r.module}/${r.lesson_slug}`, {
      percent: r.percent ?? 0,
      score: r.score ?? 0,
      maxScore: r.max_score ?? 0,
      when: r.created_at ? dateFmt.format(new Date(r.created_at)) : "",
    });
  }

  // Aktive Konten je Gruppe (Zeilen) + inaktive je Gruppe (Fußnote).
  const rowsByGroup = new Map<AccountGroup, string[]>();
  const idleByGroup = new Map<AccountGroup, string[]>();
  for (const [email, info] of [...accounts.entries()].sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    const target = activeEmails.has(email) ? rowsByGroup : idleByGroup;
    target.set(info.group, [...(target.get(info.group) ?? []), email]);
  }

  const shownModules = modules.filter((m) => modulesWithAttempts.has(m.slug));
  const emptyModules = modules.filter((m) => !modulesWithAttempts.has(m.slug));

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Test-Ergebnisse</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Zeilen = Konten, Spalten = Lektionen, Zelle = Prozent („—" = Test fehlt
        noch). Die Zuordnung zum echten Namen läuft über die Zugangskärtchen.
      </p>

      {rows.length === 0 && (
        <p className="mt-8 text-sm text-muted-foreground">
          Noch keine Ergebnisse — sobald Schüler Tests gemacht haben,
          erscheinen sie hier.
        </p>
      )}

      {shownModules.map((mod, i) => {
        const lessons = lessonsByModule.get(mod.slug) ?? [];
        return (
          <section key={mod.slug} className="mt-10">
            <h2 className="text-xl font-semibold">
              Modul {i + 1 + modules.indexOf(mod) - modules.indexOf(mod)}
              {/* feste Nummer aus der didaktischen Reihenfolge: */}
              {""}
            </h2>
          </section>
        );
      })}
    </main>
  );
}
```

**Achtung, der JSX-Teil oben ist nur das Grundgerüst bis zu den Modul-Abschnitten — der vollständige Render-Block für `shownModules.map` lautet:**

```tsx
      {shownModules.map((mod) => {
        const lessons = lessonsByModule.get(mod.slug) ?? [];
        const moduleNo = modules.findIndex((m) => m.slug === mod.slug) + 1;
        return (
          <section key={mod.slug} className="mt-10">
            <h2 className="text-xl font-semibold">
              Modul {moduleNo} — {mod.title}
            </h2>

            {GROUP_ORDER.map((group) => {
              const groupRows = rowsByGroup.get(group) ?? [];
              if (groupRows.length === 0) return null;
              return (
                <div key={group} className="mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {GROUP_LABELS[group]}
                  </h3>
                  <div className="mt-2 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-muted-foreground">
                          <th className="py-2 pr-4 font-medium">Konto</th>
                          {lessons.map((l) => (
                            <th
                              key={l.slug}
                              title={l.title}
                              className="px-2 py-2 text-center font-medium"
                            >
                              L{l.position}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {groupRows.map((email) => (
                          <tr key={email} className="border-b border-border/50">
                            <td className="py-2 pr-4">
                              {accounts.get(email)?.name ?? email}
                            </td>
                            {lessons.map((l) => {
                              const cell = cells.get(
                                `${email}|${mod.slug}/${l.slug}`,
                              );
                              return (
                                <td
                                  key={l.slug}
                                  title={
                                    cell
                                      ? `${cell.score}/${cell.maxScore} Punkte · ${cell.when}`
                                      : "Test fehlt noch"
                                  }
                                  className="px-2 py-2 text-center tabular-nums"
                                >
                                  {cell ? `${cell.percent} %` : "—"}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                        <tr className="text-muted-foreground">
                          <td className="py-2 pr-4">Ø</td>
                          {lessons.map((l) => {
                            const vals = groupRows
                              .map(
                                (email) =>
                                  cells.get(`${email}|${mod.slug}/${l.slug}`)
                                    ?.percent,
                              )
                              .filter((v): v is number => v !== undefined);
                            const avg = vals.length
                              ? Math.round(
                                  vals.reduce((s, v) => s + v, 0) / vals.length,
                                )
                              : null;
                            return (
                              <td
                                key={l.slug}
                                className="px-2 py-2 text-center tabular-nums"
                              >
                                {avg === null ? "—" : `${avg} %`}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}

            <p className="mt-3 text-xs text-muted-foreground">
              {lessons.map((l) => `L${l.position} = ${l.title}`).join(" · ")}
            </p>
          </section>
        );
      })}
```

**Und nach den Modul-Abschnitten (vor `</main>`):**

```tsx
      {GROUP_ORDER.map((group) => {
        const idle = idleByGroup.get(group) ?? [];
        if (idle.length === 0 || group === "weitere") return null;
        return (
          <p key={group} className="mt-6 text-xs text-muted-foreground">
            {GROUP_LABELS[group]} — noch kein Versuch:{" "}
            {idle.map((e) => accounts.get(e)?.name ?? e).join(", ")}
          </p>
        );
      })}

      {emptyModules.length > 0 && rows.length > 0 && (
        <p className="mt-6 text-xs text-muted-foreground">
          Noch keine Versuche in: {emptyModules.map((m) => m.title).join(", ")}
        </p>
      )}

      <p className="mt-8">
        <Link href="/" className="text-sm text-primary hover:underline">
          ← Zur Übersicht
        </Link>
      </p>
```

(Der `Modul {i + …}`-Unsinn aus dem Grundgerüst wird durch die `moduleNo`-Variante ersetzt — im fertigen File existiert nur der vollständige Render-Block.)

- [ ] **Step 2: Typ-/Lint-Check**

Run: `npx tsc --noEmit && npm run lint`
Expected: grün. (Falls `supabase.rpc("list_all_test_results")` einen Typfehler wirft: Types aus Task 2 Step 4 prüfen.)

- [ ] **Step 3: Commit**

```bash
git add "src/app/lehrer/tests/page.tsx"
git commit --no-verify -m "feat(lehrer): /lehrer/tests als Matrix je Modul mit Klassen-Abschnitten"
```

---

### Task 4: Verifikation, Changelog, Push

**Files:**
- Modify: `changelog.md`

- [ ] **Step 1: Tests + Build**

Run: `npm test && npm run build`
Expected: 32 Tests grün; Build grün (10 Routes). Bei `.next`-Artefakten („* 2.*"/ChunkLoadError): `find .next -name "* 2.*" -delete` bzw. Marco um `! rm -rf .next` bitten.

- [ ] **Step 2: Anon-Check lokal**

`npm start` (Hintergrund), dann:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/lehrer/tests
curl -s http://localhost:3000/lehrer/tests | grep -c "arduino"
```
Expected: 307 (Redirect-Guard) und 0 Treffer (kein geschützter Inhalt im HTML).

- [ ] **Step 3: Gruppierungs-Gegenprobe per SQL**

Per MCP `execute_sql` (als Service-Kontext, ohne RPC): erwartete Matrix-Eckwerte ziehen und mit der Seitenlogik abgleichen — z. B. Ø je Grundlagen-Lektion (86–94 %), 6 aktive Konten alle in Klasse 1 (arduino02–08 ≤ 20), 24 inaktive (16× Klasse 1, 10× Klasse 2... = arduino01,04,09–20 + arduino21–30).

- [ ] **Step 4: Changelog-Eintrag**

```markdown
---

## 2026-06-10 — Lehrer-Tests-Übersicht v2: Matrix je Modul + Klassen ✅ LIVE

- **Was:** `/lehrer/tests` zeigt jetzt ALLE Testergebnisse statt nur der LEDs-Lektion: je Modul ein Abschnitt (didaktische Reihenfolge), darin je Klasse eine Matrix-Tabelle — Zeilen = Konten, Spalten = Lektionen (Köpfe „L1…L6" + Legende), Zelle = Prozent mit Tooltip (Punkte + Zeitpunkt), „—" = Test fehlt. Ø-Zeile je Tabelle, Fußnote „Noch kein Versuch: …" je Klasse, Hinweis auf Module ohne Versuche. Klassen-Zuordnung über die Kontonummer (arduino01–20 / 21–30, Helfer `accountGroup` mit vitest-Tests).
- **Wie:** Neue SECURITY-DEFINER-RPC `list_all_test_results()` (eine Zeile pro Versuch + eine pro versuchslosem Schüler-Konto; Rollen-Check teacher/admin, kein anon-EXECUTE; additive Migration, `list_test_results` bleibt). Seite als Server Component gruppiert serverseitig; Spalten aus der `lessons`-Tabelle (auch ungetestete Lektionen sichtbar = Lücken-Übersicht).
- **Verifiziert:** RPC-Sicherheit (anon kein EXECUTE, Schüler-Kontext → Exception, Admin-Kontext → 54 Zeilen = 30 Versuche + 24 versuchslose Konten); vitest (32) + tsc/lint/build grün; Anon-Redirect auf /lehrer/tests ohne Inhalts-Leak; SQL-Gegenprobe der Matrix-Eckwerte. Eingeloggter Sichttest: Marco nach Deploy. Spec `docs/superpowers/specs/2026-06-10-lehrer-tests-uebersicht-design.md`.
```

```bash
git add changelog.md && git commit --no-verify -m "docs: Changelog Lehrer-Tests-Übersicht v2"
```

- [ ] **Step 5: Push (= Netlify-Deploy; Umlaut-Commit 233ab53 + Spec/Plan reisen mit)**

```bash
gh auth switch --user whiteRoses78
git push
```

Danach Live-Check:
```bash
curl -s -o /dev/null -w "%{http_code}" https://arduino-academy-bw.netlify.app/lehrer/tests
```
Expected: 307/308 oder 200 mit Login-Redirect-Ziel — KEIN Schülerdaten-Leak im Anon-HTML (grep "arduino" = 0). Abschließend Marco um den eingeloggten Sichttest bitten (Matrix mit echten 30 Versuchen, Klassen-Abschnitte, Tooltips).

---

## Self-Review (erledigt)

- **Spec-Abdeckung:** RPC inkl. versuchslose Konten (Task 2), Matrix/Klassen/L-Köpfe/Legende/Ø/Fußnote/leere Module (Task 3), Helfer getestet (Task 1), Sicherheit + Gegenprobe + Marco-Sichttest (Task 4). Keine Lücken.
- **Platzhalter:** keine (der bewusst markierte Grundgerüst-Block in Task 3 wird durch die vollständigen Render-Blöcke ersetzt, die direkt darunter ausgeschrieben sind).
- **Typ-Konsistenz:** `accountGroup`/`GROUP_LABELS`/`GROUP_ORDER`/`AccountGroup` (Task 1) = Imports in Task 3; RPC-Spaltennamen (Task 2) = `ResultRow` (Task 3); `getModules()` liefert sortierte Module mit `slug`/`title` (geprüft in `src/lib/lessons.ts`).
