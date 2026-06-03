# Content-Durchstich (Lese-Pfad Grundlagen) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die 5 migrierten Grundlagen-Lektionen öffentlich lesbar machen — Modul-Übersicht + Lektions-Detailseite, die den `content`-JSONB (HTML + SVG) im App-Theme rendert.

**Architecture:** Reine Server Components lesen via Server-Supabase-Client (anon, public-read). Eine kleine server-only Data-Lib kapselt die Queries. Der vertrauenswürdige eigene HTML-Content wird via `dangerouslySetInnerHTML` gerendert; die Vanilla-Content-CSS-Klassen werden gescopt unter `.lesson-content` ins App-Theme portiert. Kein Client-JS, kein Auth.

**Tech Stack:** Next 16 (App Router, async params), React 19, TypeScript strict, Tailwind v4 + shadcn/ui, Supabase (`@supabase/ssr`).

**Projekt-Abweichungen vom Skill-Standard (bewusst):**
- **Keine Commit-Schritte** — `webapp-saas-erstellen` verbietet eigene Commits bis Phase 6 (Deploy). Stattdessen Build/Typecheck/Visual-Checkpoints.
- **Visual Verification statt Unit-TDD** — Spec 01 ist Content-Rendering; verifiziert via `npm run build` + browser-use (3 Viewports). TDD greift erst in Spec 02 (Leitner-Logik).

---

## File Structure

- Create: `src/lib/lessons.ts` — server-only Data-Access (`getModule`, `getLesson`) + Content-Typen.
- Create: `src/components/lesson-content.tsx` — rendert `explanation.html` + `example` (Server Component).
- Create: `src/app/modul/[modul]/page.tsx` — Modul-Übersicht (Lektions-Liste).
- Create: `src/app/modul/[modul]/[lektion]/page.tsx` — Lektions-Detail.
- Modify: `src/app/globals.css` — `.lesson-content`-CSS-Port anhängen.
- Modify: `src/app/page.tsx` — Boilerplate → Landing mit Einstieg „Grundlagen".

---

## Task 1: Data-Access-Lib

**Files:**
- Create: `src/lib/lessons.ts`

- [ ] **Step 1: Lib schreiben**

```typescript
import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

// Form des content-JSONB (faithful zur Vanilla-Struktur lessons-grundlagen.js).
export type LessonContent = {
  explanation?: { html?: string };
  example?: { title?: string; steps?: { label: string; html: string }[] };
};

// Modul (= Kurs) + seine Lektionen, sortiert nach position. null = nicht gefunden.
export async function getModule(slug: string) {
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();
  if (!course) return null;

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", course.id)
    .order("position", { ascending: true });

  return { course, lessons: lessons ?? [] };
}

// Einzelne Lektion über Modul-Slug + Lektions-Slug. null = nicht gefunden.
export async function getLesson(moduleSlug: string, lessonSlug: string) {
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", moduleSlug)
    .single();
  if (!course) return null;

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", course.id)
    .eq("slug", lessonSlug)
    .single();

  return lesson; // Lesson | null
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0 (keine Fehler). Falls `server-only` nicht auflösbar: Import entfernen (ist über Next verfügbar, sonst optional).

---

## Task 2: Content-Renderer-Komponente

**Files:**
- Create: `src/components/lesson-content.tsx`

- [ ] **Step 1: Komponente schreiben** (Server Component — kein "use client")

```tsx
import type { LessonContent } from "@/lib/lessons";

// Rendert den vertrauenswürdigen eigenen Lektions-HTML. dangerouslySetInnerHTML
// ist hier sicher: Content stammt aus unserer DB/Migration, kein User-Input.
export function LessonContentView({ content }: { content: LessonContent }) {
  return (
    <article className="lesson-content mt-6">
      {content.explanation?.html && (
        <div dangerouslySetInnerHTML={{ __html: content.explanation.html }} />
      )}

      {content.example && (content.example.steps?.length ?? 0) > 0 && (
        <section className="mt-10">
          {content.example.title && <h2>{content.example.title}</h2>}
          {content.example.steps!.map((step, i) => (
            <details key={i} className="example-step" open={i === 0}>
              <summary>{step.label}</summary>
              <div
                className="step-content"
                dangerouslySetInnerHTML={{ __html: step.html }}
              />
            </details>
          ))}
        </section>
      )}
    </article>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

---

## Task 3: Modul-Übersichtsseite

**Files:**
- Create: `src/app/modul/[modul]/page.tsx`

- [ ] **Step 1: Seite schreiben** (Next 16: `params` ist ein Promise)

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getModule } from "@/lib/lessons";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { params: Promise<{ modul: string }> };

export async function generateMetadata({ params }: Props) {
  const { modul } = await params;
  const data = await getModule(modul);
  return { title: data ? `${data.course.title} — Arduino Academy` : "Modul" };
}

export default async function ModulePage({ params }: Props) {
  const { modul } = await params;
  const data = await getModule(modul);
  if (!data) notFound();
  const { course, lessons } = data;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{course.title}</h1>
      {course.description && (
        <p className="mt-2 text-muted-foreground">{course.description}</p>
      )}

      <ol className="mt-8 flex flex-col gap-3">
        {lessons.map((l) => (
          <li key={l.id}>
            <Link
              href={`/modul/${modul}/${l.slug}`}
              className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Card className="transition-shadow hover:shadow-md">
                <CardHeader className="flex-row items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {l.position}
                  </span>
                  <CardTitle className="text-lg">{l.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
```

- [ ] **Step 2: Typecheck + Dev-Smoke**

Run: `npx tsc --noEmit` → exit 0.
Run: `npm run dev`, dann `curl -s localhost:3000/modul/grundlagen | grep -c "Was ist ein Arduino"` → erwartet `1` (Titel im SSR-HTML). Dev-Server danach stoppen.

---

## Task 4: Lektions-Detailseite

**Files:**
- Create: `src/app/modul/[modul]/[lektion]/page.tsx`

- [ ] **Step 1: Seite schreiben**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLesson, type LessonContent } from "@/lib/lessons";
import { LessonContentView } from "@/components/lesson-content";

type Props = { params: Promise<{ modul: string; lektion: string }> };

export async function generateMetadata({ params }: Props) {
  const { modul, lektion } = await params;
  const lesson = await getLesson(modul, lektion);
  return { title: lesson ? `${lesson.title} — Arduino Academy` : "Lektion" };
}

export default async function LessonPage({ params }: Props) {
  const { modul, lektion } = await params;
  const lesson = await getLesson(modul, lektion);
  if (!lesson) notFound();
  const content = lesson.content as LessonContent;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href={`/modul/${modul}`}
        className="text-sm text-primary hover:underline"
      >
        ← Zur Übersicht
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        {lesson.title}
      </h1>
      <LessonContentView content={content} />
    </main>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit` → exit 0.

---

## Task 5: CSS-Port der Content-Klassen

**Files:**
- Modify: `src/app/globals.css` (ans Dateiende anhängen)

Mapping der Vanilla-Vars (aus `~/Desktop/Arduino-Lernprogramm/css/style.css`) auf Theme-Tokens: `--text`→`--foreground`, `--accent`→`--primary`, `--sidebar-bg`→`--muted`, `--border`→`--border`. Box-Farben dark-mode-fest via `color-mix` (Safari 16.2+ ok für Schul-iPads).

- [ ] **Step 1: CSS anhängen**

```css

/* =========================================================================
   Lesson-Content — Port der Vanilla-Content-Klassen ins App-Theme.
   Gescopt unter .lesson-content (trifft nur gerenderten Lektions-HTML).
   ========================================================================= */
.lesson-content { color: var(--foreground); line-height: 1.7; }
.lesson-content h2 { font-size: 1.4rem; font-weight: 600; margin: 1.75rem 0 0.75rem; }
.lesson-content h3 { font-size: 1.15rem; font-weight: 600; margin: 1.25rem 0 0.5rem; }
.lesson-content p { margin-bottom: 1rem; }
.lesson-content ul, .lesson-content ol { margin: 0 0 1rem 1.25rem; }
.lesson-content li { margin-bottom: 0.35rem; }
.lesson-content strong { font-weight: 600; }
.lesson-content code {
  font-family: var(--font-mono);
  background: var(--muted);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.lesson-content .section-divider {
  border: none; height: 1px; background: var(--border); margin: 2rem 0;
}

.lesson-content .info-card {
  background: var(--muted);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
  margin: 1.25rem 0;
}
.lesson-content .info-card h3 { margin-top: 0; }

.lesson-content .analogy-box {
  background: var(--accent);
  color: var(--accent-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
  margin: 1.25rem 0;
}
.lesson-content .analogy-box::before {
  content: "💡"; font-size: 1.3rem; margin-right: 0.5rem;
}

.lesson-content .tip-box {
  background: color-mix(in oklch, var(--primary) 12%, var(--background));
  border-left: 4px solid var(--primary);
  border-radius: 0 8px 8px 0;
  padding: 1rem 1.25rem;
  margin: 1.25rem 0;
}
.lesson-content .tip-box strong { color: var(--primary); }

.lesson-content .warning-box {
  background: color-mix(in oklch, var(--chart-4) 20%, var(--background));
  border-left: 4px solid var(--chart-4);
  border-radius: 0 8px 8px 0;
  padding: 1rem 1.25rem;
  margin: 1.25rem 0;
}

.lesson-content .icon-table {
  width: 100%; border-collapse: separate; border-spacing: 0;
  margin: 1rem 0; font-size: 0.95rem;
}
.lesson-content .icon-table th {
  background: var(--primary); color: var(--primary-foreground);
  padding: 0.6rem 1rem; text-align: left; font-weight: 600;
}
.lesson-content .icon-table th:first-child { border-radius: 8px 0 0 0; }
.lesson-content .icon-table th:last-child { border-radius: 0 8px 0 0; }
.lesson-content .icon-table td {
  padding: 0.6rem 1rem; border-bottom: 1px solid var(--border);
}
.lesson-content .icon-table tr:nth-child(even) td { background: var(--muted); }

/* SVGs sind via viewBox + inline max-width:100% responsive — sichern. */
.lesson-content svg { max-width: 100%; height: auto; display: block; margin: 0 auto; }

/* example-step (Beispiel-Akkordeon, <details>) */
.lesson-content .example-step {
  background: var(--muted); border: 1px solid var(--border);
  border-radius: 8px; margin-bottom: 0.75rem; overflow: hidden;
}
.lesson-content .example-step summary {
  padding: 0.75rem 1rem; cursor: pointer; font-weight: 600; list-style: none;
}
.lesson-content .example-step summary::-webkit-details-marker { display: none; }
.lesson-content .example-step summary::before {
  content: "▶"; font-size: 0.7rem; margin-right: 0.5rem;
  display: inline-block; transition: transform 0.2s;
}
.lesson-content .example-step[open] summary::before { transform: rotate(90deg); }
.lesson-content .step-content { padding: 0 1rem 1rem; }
```

- [ ] **Step 2: Build prüfen**

Run: `npm run build`
Expected: exit 0, keine CSS-Warnungen.

---

## Task 6: Landing-Page

**Files:**
- Modify: `src/app/page.tsx` (Boilerplate komplett ersetzen)

- [ ] **Step 1: Landing schreiben**

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Arduino Academy
      </h1>
      <p className="max-w-md text-lg text-muted-foreground">
        Technik verstehen für die Realschul-Abschlussprüfung — interaktiv, mit
        sofortigem Feedback und cleverem Wiederholen.
      </p>
      <Button asChild size="lg">
        <Link href="/modul/grundlagen">Mit den Grundlagen starten</Link>
      </Button>
    </main>
  );
}
```

- [ ] **Step 2: Build + Lint**

Run: `npm run build` → exit 0.
Run: `npm run lint` → exit 0.

---

## Task 7: Visual Verification (Stopp-Kriterium UI)

**Files:** keine (Verifikation).

- [ ] **Step 1: Dev-Server starten**

Run: `npm run dev` (Hintergrund).

- [ ] **Step 2: Screenshots via browser-use**

Prüfe `/modul/grundlagen` und `/modul/grundlagen/das-arduino-uno-board` (hat das größte SVG: Board + Steckbrett) in 3 Viewports: 375 / 768 / 1280 px.

Checkliste (aus `rules/verification.md`):
- [ ] SVGs (Board, Steckbrett, EVA-Diagramm) rendern, skalieren, kein Overflow bei 375px.
- [ ] icon-table lesbar, kein horizontales Abschneiden (ggf. scrollbar).
- [ ] analogy-box / tip-box / warning-box / info-card optisch abgesetzt + lesbar.
- [ ] Hover-Lift auf den Lektions-Cards (Übersicht), Focus-Ring bei Tab-Navigation.
- [ ] Dark-Mode: Prosa-Text lesbar; SVG-Innentexte (auf eigenen hellen Flächen) ok; Boxen kontrastreich.
- [ ] „← Zur Übersicht" + Card-Links navigieren korrekt; unbekannte Lektion → 404.

- [ ] **Step 3: Befund festhalten**

3–4 Iterationen normal, max 5 — danach STOP und Marco fragen. Gefundene CSS-Korrekturen direkt in `globals.css` (Task 5) nachziehen.

- [ ] **Step 4: Spec-Status + Debrief**

`specs/01-content-durchstich.md` Status → ✅, Akzeptanzkriterien abhaken, Debrief füllen. `changelog.md` + `implementierungsplan.md` (Zeile 1 → ✅) aktualisieren.

---

## Self-Review (gegen Spec 01)

- **Spec coverage:** Übersicht (T2/T3) ✓ · Detail+HTML+SVG (T2/T4) ✓ · example (T2) ✓ · CSS-Klassen (T5) ✓ · 404 (T3/T4 notFound) ✓ · Landing-Link (T6) ✓ · 3 Viewports + Dark (T7) ✓.
- **Placeholder-Scan:** Jeder Code-Schritt enthält vollständigen Code; keine TBD/TODO.
- **Type-Konsistenz:** `LessonContent`/`getModule`/`getLesson` in Task 1 definiert, in Task 2/3/4 identisch verwendet. `params` durchgängig als Promise (Next 16).
