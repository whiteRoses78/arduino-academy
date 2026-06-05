# Bauteilliste pro Lektion — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Jede praktische Lektion zeigt ganz oben einen schlichten Block „🧰 Das brauchst du" (Menge + Bauteilname), damit Schüler:innen ihr Material selbst zusammensuchen.

**Architecture:** Neue Spalte `parts jsonb` auf `public.lessons` (Ansatz C aus Spec 03 — getrennt vom re-seed-festen `content`-HTML). Eine reine Parser-Funktion liest die Daten typsicher, eine Server-Komponente rendert den Block oberhalb des Lektions-Contents. Daten-Quelle lebt re-seed-fest im Repo (`db/parts-data.mjs`), die bestehenden DB-Zeilen werden einmalig per `UPDATE` befüllt.

**Tech Stack:** Next.js 15 + React 19 + TypeScript strict, Supabase (Postgres/JSONB), Tailwind v4, vitest. DB-Schreibzugriff via Supabase MCP (`apply_migration` / `execute_sql` / `generate_typescript_types`).

**Quelle:** `specs/03-bauteilliste.md` (Design freigegeben). Position „Block ganz oben" von Marco bestätigt (2026-06-05).

---

## Vorab-Hinweise für die Ausführung

- **Position ist entschieden:** Block ganz oben, nicht unter dem Schaltungs-SVG (das SVG steckt inline im `content`-HTML und bleibt unangetastet).
- **`qty` ist optional.** Das Mockup enthält „Jumper-Kabel nach Bedarf" — ein Bauteil ohne feste Menge. Datenmodell deshalb: `{ name: string; qty?: number }`. Ohne `qty` wird nur der Name angezeigt (kein „×"-Präfix). Das ist eine bewusste, minimale Erweiterung gegenüber dem Spec-Format `{name, qty}`.
- **Commits:** lokal pro Task. **Nicht pushen** — Push auf `main` triggert den Netlify-Auto-Deploy. Live-Gang ist ein bewusster Extra-Schritt durch Marco (vorher `gh auth switch --user whiteRoses78`).
- **Reihenfolge:** Tasks 1–5 sind reine Technik und laufen durch. Task 6 enthält den **Marco-Review-Checkpoint** (inhaltliche Hoheit über die Mengen) — dort anhalten.

## File Structure

| Datei | Verantwortung | Aktion |
|---|---|---|
| `db/schema.sql` | Schema-Quelle der Wahrheit | Spalte `parts` dokumentieren |
| `src/lib/database.types.ts` | generierte Supabase-Typen | neu generieren (enthält dann `parts`) |
| `src/lib/parts.ts` | `LessonPart`-Typ + `getLessonParts()`-Parser (rein, kein `server-only`, testbar) | **neu** |
| `src/lib/parts.test.ts` | Unit-Tests für `getLessonParts()` | **neu** |
| `src/components/parts-list.tsx` | Server-Komponente, rendert den Block | **neu** |
| `src/app/modul/[modul]/[lektion]/page.tsx` | Lektionsseite | `<PartsList>` oberhalb `<LessonContentView>` einbinden |
| `db/parts-data.mjs` | re-seed-feste Bauteildaten je Lektion (Marco-geprüft) | **neu** |
| `db/seed.mjs` | Modul-Seed | `parts` beim Insert mitschreiben |

---

## Task 1: DB-Migration — Spalte `parts jsonb`

**Files:**
- Modify: `db/schema.sql:24-39` (LESSONS-Block dokumentieren)
- DB: Migration via Supabase MCP `apply_migration`

- [ ] **Step 1: Migration anwenden**

Supabase MCP `apply_migration` mit name `add_parts_to_lessons` und query:

```sql
alter table public.lessons
  add column if not exists parts jsonb not null default '[]'::jsonb;

comment on column public.lessons.parts is
  'Bauteilliste der Lektion: [{"name":"Arduino Uno","qty":1}, ...]. Leeres Array = kein Block (z.B. Theorie-Lektionen). qty optional.';
```

- [ ] **Step 2: Spalte verifizieren**

Supabase MCP `execute_sql`:

```sql
select column_name, data_type, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'lessons' and column_name = 'parts';
```

Expected: 1 Zeile, `data_type = jsonb`, default `'[]'::jsonb`.

- [ ] **Step 3: Grants prüfen (Spec-Forderung)**

Ein table-level `grant select on public.lessons` deckt neue Spalten automatisch ab — verifizieren statt vertrauen. Supabase MCP `execute_sql`:

```sql
select
  has_column_privilege('anon', 'public.lessons', 'parts', 'SELECT')          as anon_read,
  has_column_privilege('authenticated', 'public.lessons', 'parts', 'SELECT') as auth_read;
```

Expected: beide `true`. Falls `false` (sollte nicht passieren): `grant select (parts) on public.lessons to anon, authenticated;`.

- [ ] **Step 4: Schema-Datei aktualisieren**

In `db/schema.sql` im LESSONS-`create table`-Block nach der `content`-Zeile (Zeile 32) ergänzen:

```sql
  parts         jsonb not null default '[]'::jsonb,  -- Bauteilliste [{name,qty?}] (Spec 03); leer = kein Block
```

- [ ] **Step 5: Commit**

```bash
git add db/schema.sql
git commit -m "feat(db): parts-Spalte auf lessons fuer Bauteilliste (Spec 03)"
```

---

## Task 2: TypeScript-Typen neu generieren

**Files:**
- Modify: `src/lib/database.types.ts` (komplett neu generiert)

- [ ] **Step 1: Typen generieren und schreiben**

Supabase MCP `generate_typescript_types` aufrufen, den vollständigen Output nach `src/lib/database.types.ts` schreiben (Datei ersetzen).

- [ ] **Step 2: Verifizieren, dass `parts` im Typ steht**

Run: `grep -n "parts" src/lib/database.types.ts`
Expected: `parts: Json` in `Row` und `parts?: Json` in `Insert`/`Update` des `lessons`-Blocks.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: keine Fehler.

- [ ] **Step 4: Commit**

```bash
git add src/lib/database.types.ts
git commit -m "chore(types): database.types.ts mit parts-Spalte neu generiert"
```

---

## Task 3: Parser-Modul `src/lib/parts.ts` (TDD)

**Files:**
- Create: `src/lib/parts.ts`
- Test: `src/lib/parts.test.ts`

**Warum eigenes Modul:** `src/lib/lessons.ts` importiert `server-only` und würde unter vitest brechen. Die reine Parse-Logik lebt deshalb hier, ohne DB-Abhängigkeit, und nimmt das rohe `parts`-Feld (`unknown`) statt eines `Lesson`-Objekts entgegen.

- [ ] **Step 1: Failing test schreiben**

```typescript
// src/lib/parts.test.ts
import { describe, it, expect } from "vitest";
import { getLessonParts } from "@/lib/parts";

describe("getLessonParts", () => {
  it("liest gültige Bauteile mit Menge", () => {
    expect(getLessonParts([{ name: "Arduino Uno", qty: 1 }])).toEqual([
      { name: "Arduino Uno", qty: 1 },
    ]);
  });

  it("erlaubt Einträge ohne Menge (z.B. 'nach Bedarf')", () => {
    expect(getLessonParts([{ name: "Jumper-Kabel nach Bedarf" }])).toEqual([
      { name: "Jumper-Kabel nach Bedarf" },
    ]);
  });

  it("gibt leeres Array bei null, undefined oder leerem Array", () => {
    expect(getLessonParts(null)).toEqual([]);
    expect(getLessonParts(undefined)).toEqual([]);
    expect(getLessonParts([])).toEqual([]);
  });

  it("filtert kaputte Einträge (kein/leerer Name) weg", () => {
    expect(
      getLessonParts([{ qty: 3 }, { name: "" }, { name: "LED rot", qty: 2 }]),
    ).toEqual([{ name: "LED rot", qty: 2 }]);
  });

  it("ignoriert nicht-numerische qty (zeigt dann nur den Namen)", () => {
    expect(getLessonParts([{ name: "Steckbrett", qty: "viele" }])).toEqual([
      { name: "Steckbrett" },
    ]);
  });
});
```

- [ ] **Step 2: Test laufen lassen → muss fehlschlagen**

Run: `npx vitest run src/lib/parts.test.ts`
Expected: FAIL mit „Failed to resolve import @/lib/parts" (Modul existiert noch nicht).

- [ ] **Step 3: Minimale Implementierung schreiben**

```typescript
// src/lib/parts.ts
// Reines Parser-Modul für die Bauteilliste (Spec 03). Kein "server-only",
// keine DB — nimmt das rohe parts-JSONB-Feld und gibt eine saubere, defensiv
// gefilterte Liste zurück. So crasht ein kaputter Datensatz nie die Lektionsseite.

export type LessonPart = { name: string; qty?: number };

export function getLessonParts(raw: unknown): LessonPart[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const { name, qty } = item as { name?: unknown; qty?: unknown };
    if (typeof name !== "string" || name.trim() === "") return [];
    return [typeof qty === "number" ? { name, qty } : { name }];
  });
}
```

- [ ] **Step 4: Test laufen lassen → muss bestehen**

Run: `npx vitest run src/lib/parts.test.ts`
Expected: PASS (5 Tests grün).

- [ ] **Step 5: Commit**

```bash
git add src/lib/parts.ts src/lib/parts.test.ts
git commit -m "feat(parts): getLessonParts-Parser mit Tests"
```

---

## Task 4: Server-Komponente `parts-list.tsx`

**Files:**
- Create: `src/components/parts-list.tsx`

- [ ] **Step 1: Komponente schreiben**

```tsx
// src/components/parts-list.tsx
import type { LessonPart } from "@/lib/parts";

// "Das brauchst du"-Block ganz oben in praktischen Lektionen. Server-Komponente
// (kein State). Rendert nichts, wenn keine Bauteile da sind (Theorie-Lektionen).
// Styling via Theme-Tokens (bg-muted/border-border) -> dark-mode-fest und optisch
// konsistent mit der info-card aus dem Content. Steht ausserhalb des
// .lesson-content-Scopes, darum Tailwind-Utilities statt der gescopten Klasse.
export function PartsList({ parts }: { parts: LessonPart[] }) {
  if (parts.length === 0) return null;

  return (
    <section
      aria-label="Benötigte Bauteile"
      className="mt-6 rounded-lg border border-border bg-muted px-5 py-4"
    >
      <h2 className="m-0 text-base font-semibold">🧰 Das brauchst du</h2>
      <ul className="mt-2 mb-0 space-y-1">
        {parts.map((part, i) => (
          <li key={i} className="flex gap-2">
            {part.qty !== undefined && (
              <span className="shrink-0 font-semibold tabular-nums text-primary">
                {part.qty}×
              </span>
            )}
            <span>{part.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: keine Fehler.

- [ ] **Step 3: Commit**

```bash
git add src/components/parts-list.tsx
git commit -m "feat(parts): PartsList-Komponente fuer den Bauteilblock"
```

---

## Task 5: Block in die Lektionsseite einbinden

**Files:**
- Modify: `src/app/modul/[modul]/[lektion]/page.tsx`

- [ ] **Step 1: Imports ergänzen**

Nach Zeile 6 (`import { ExerciseSection } ...`) einfügen:

```tsx
import { PartsList } from "@/components/parts-list";
import { getLessonParts } from "@/lib/parts";
```

- [ ] **Step 2: Block oberhalb des Contents rendern**

In `page.tsx` die Zeile

```tsx
      <LessonContentView content={content} />
```

ersetzen durch:

```tsx
      <PartsList parts={getLessonParts(lesson.parts)} />
      <LessonContentView content={content} />
```

- [ ] **Step 3: Build prüfen**

Run: `npm run build`
Expected: grün, keine Typfehler (`lesson.parts` ist nach Task 2 als `Json` typisiert; `getLessonParts` akzeptiert `unknown`).

- [ ] **Step 4: Commit**

```bash
git add "src/app/modul/[modul]/[lektion]/page.tsx"
git commit -m "feat(parts): Bauteilblock oberhalb des Lektions-Contents"
```

---

## Task 6: Bauteildaten — Repo-Quelle, Marco-Review, DB-Befüllung

Die 18 praktischen Lektionen (DB-Stand 2026-06-05):

- **digital:** `leds-ansteuern`, `wechselblinker`, `led-lauflicht`, `taster-als-eingabe`, `led-mit-taster-steuern`, `einfache-ampelschaltung`
- **analog:** `spannungsteiler-verstehen`, `analoge-eingaenge`, `pwm-dimmen-statt-schalten`, `lichtsensor-ldr`, `ntc-temperatursensor`, `entscheidungen-mit-sensorwerten`
- **aktoren:** `servomotor-ansteuern`, `transistor-als-schalter-grundlagen`, `dc-motor-mit-l298n`
- **projekt:** `ampel-mit-fussgaengerueberweg`, `nachtabschaltung-mit-lichtsensor`, `pruefungsschaltung-komplett`

**Files:**
- Create: `db/parts-data.mjs`
- Modify: `db/seed.mjs`
- DB: `execute_sql` UPDATE der bestehenden Zeilen

- [ ] **Step 1: Bauteile je Lektion aus `content` extrahieren (Claude)**

Pro Lektion das `content`-HTML aus der DB lesen (`select content from public.lessons where module=? and slug=?`) und die genannten Bauteile (Widerstand/Wert, LED/Farbe, Steckbrett, Taster, Sensor, Servo, Transistor, Treiber, Jumper …) zu einem Entwurf `[{name, qty?}]` zusammenfassen. Bei `grundlagen`-Lektionen nur, falls Hardware vorkommt — sonst weglassen.

- [ ] **Step 2: `db/parts-data.mjs` schreiben (Entwurf)**

Struktur (Keys = `module` → `slug`, exakt wie oben):

```javascript
// db/parts-data.mjs
// Re-seed-feste Bauteildaten je Lektion (Spec 03). Quelle der Wahrheit für die
// parts-Spalte. Von Marco inhaltlich geprüft. Keys: module -> slug (DB-Slugs).
// qty optional (weglassen für "nach Bedarf"-Mengen).
export const PARTS = {
  digital: {
    "leds-ansteuern": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "LED rot", qty: 1 },
      { name: "Widerstand 220 Ω", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    // ... übrige digital-Lektionen
  },
  analog: { /* ... */ },
  aktoren: { /* ... */ },
  projekt: {
    "ampel-mit-fussgaengerueberweg": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "LED rot, gelb, grün", qty: 3 },
      { name: "LED Fußgänger (rot, grün)", qty: 2 },
      { name: "Widerstand 220 Ω", qty: 5 },
      { name: "Taster", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    // ... übrige projekt-Lektionen
  },
};
```

- [ ] **Step 3: ⛔ CHECKPOINT — Marco-Review**

Entwurf aus `db/parts-data.mjs` Marco zeigen (gut lesbar als Liste pro Lektion). **Marco hat die inhaltliche Hoheit** über Mengen und Bauteile. Erst nach seinem OK / seinen Korrekturen weiter. Korrekturen direkt in `db/parts-data.mjs` einpflegen.

- [ ] **Step 4: `db/seed.mjs` um `parts` erweitern (re-seed-fest)**

Nach den Imports (nach Zeile 20) ergänzen:

```javascript
import { PARTS } from "./parts-data.mjs";
```

Im Lektions-`row`-Objekt (`db/seed.mjs:151-160`) nach `content: patchContent(content),` ergänzen:

```javascript
      parts: PARTS[moduleKey]?.[slugify(title)] ?? [],
```

So trägt jeder künftige Re-Seed die Bauteile automatisch mit (gleicher `slugify` wie bei der Slug-Erzeugung → Keys passen).

- [ ] **Step 5: Bestehende DB-Zeilen befüllen**

Die Lektionen existieren bereits — `seed.mjs` legt nur neu an, aktualisiert nicht. Darum die vorhandenen Zeilen einmalig per Supabase MCP `execute_sql` updaten, ein Statement pro Lektion (aus `parts-data.mjs` generiert). Muster:

```sql
update public.lessons
set parts = '[{"name":"Arduino Uno","qty":1},{"name":"Steckbrett","qty":1},{"name":"LED rot, gelb, grün","qty":3},{"name":"LED Fußgänger (rot, grün)","qty":2},{"name":"Widerstand 220 Ω","qty":5},{"name":"Taster","qty":1},{"name":"Jumper-Kabel nach Bedarf"}]'::jsonb
where module = 'projekt' and slug = 'ampel-mit-fussgaengerueberweg';
```

(In JSON-Strings nur gerade `"` verwenden, Umlaute als UTF-8.)

- [ ] **Step 6: Befüllung verifizieren**

Supabase MCP `execute_sql`:

```sql
select module, slug, jsonb_array_length(parts) as n_parts
from public.lessons
where module in ('digital','analog','aktoren','projekt')
order by array_position(array['digital','analog','aktoren','projekt'], module), position;
```

Expected: alle 18 Lektionen mit `n_parts > 0` (Ausnahmen nur, falls bei Step 1/3 bewusst leer entschieden).

- [ ] **Step 7: Commit**

```bash
git add db/parts-data.mjs db/seed.mjs
git commit -m "feat(parts): Bauteildaten je Lektion + Seed-Integration (Marco-geprueft)"
```

---

## Task 7: Gesamt-Verifikation

**Files:** keine (nur Prüf-Läufe)

- [ ] **Step 1: Statische Checks**

```bash
npx tsc --noEmit && npm run lint && npm test
```

Expected: tsc 0 Fehler, lint sauber, vitest grün (bestehende 20 + 5 neue = 25 Tests).

- [ ] **Step 2: Production-Build + Start**

```bash
npm run build && npm start
```

Expected: Build grün; Server auf `http://localhost:3000`. (Falls ChunkLoadError/500: vorher `.next` frisch bauen lassen — `rm -rf .next` muss Marco ausführen.)

- [ ] **Step 3: Visual-Check praktische Lektion @375 + @1280**

```bash
node scripts/shot.mjs http://localhost:3000/modul/projekt/ampel-mit-fussgaengerueberweg /tmp/ampel-375.png 375 900
node scripts/shot.mjs http://localhost:3000/modul/projekt/ampel-mit-fussgaengerueberweg /tmp/ampel-1280.png 1280 900
```

Expected: horizontaler Overflow = 0 (beide); Block „🧰 Das brauchst du" sichtbar **oberhalb** des Lektions-Inhalts mit korrekten Mengen.

- [ ] **Step 4: Gegenprobe Theorie-Lektion (kein Block)**

```bash
node scripts/shot.mjs http://localhost:3000/modul/grundlagen/<erste-grundlagen-slug> /tmp/theorie.png 375 900
```

(Slug via `select slug from public.lessons where module='grundlagen' order by position limit 1;`.)
Expected: **kein** „Das brauchst du"-Block (parts leer → Komponente rendert `null`).

- [ ] **Step 5: Dark-Mode-Stichprobe**

`/tmp/ampel-375.png` sichten: Block-Hintergrund/Border heben sich sauber ab, Text lesbar. (Tokens `--muted`/`--border` sind für beide Themes definiert.)

---

## Self-Review (gegen Spec 03)

| Spec-Anforderung | Task |
|---|---|
| Spalte `parts jsonb`, default `'[]'`, Grants geerbt | Task 1 |
| TS-Types neu generieren | Task 2 |
| Daten extrahieren → Marco-Review → befüllen | Task 6 (Checkpoint Step 3) |
| `getLesson`/Typ um `parts` erweitern | Task 2 (Typ) + Task 3 (Parser); `getLesson` braucht keine Änderung, `select("*")` holt `parts` automatisch |
| `parts-list.tsx` bauen + oberhalb Content einbinden | Task 4 + Task 5 |
| Verifizieren: tsc/lint/build + Visual @375/@1280 | Task 7 |
| Theorie-Lektionen zeigen Block nicht | Task 4 (`null` bei leer) + Task 7 Step 4 |
| Mobil kein Overflow, dark mode sauber | Task 7 Step 3 + 5 |
| YAGNI: keine Bilder/Abhaken/Einkaufsliste | nicht umgesetzt (bewusst) |

**Abweichung von Spec (bewusst):** `qty` optional statt pflicht — wegen „Jumper-Kabel nach Bedarf" im Mockup. Begründet in den Vorab-Hinweisen.
