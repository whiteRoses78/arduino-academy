# Architektur-Entscheidungen (ADRs)

Format pro Eintrag: Kontext / Entscheidung / Warum / Alternativen.

---

## ADR-001 — Stack-Entscheidung

**Datum:** 2026-06-02

**Kontext:** Projekt-Setup, Auswahl Framework + Backend + Deployment.

**Entscheidung:** Next.js 15 (App Router) + React 19 + TypeScript strict, Tailwind v4 + shadcn/ui, Supabase (Auth + Postgres + RLS), Vercel (Hobby Tier), npm.

**Warum:**
- Next.js 15 App Router ist aktueller Standard für Full-Stack-React.
- Supabase liefert Auth + DB + RLS aus einer Hand, Free Tier reicht für Einsteiger-Projekte.
- Vercel = Zero-Config-Deployment für Next.js.
- shadcn = Komponenten als Copy-Code (kein Lib-Bloat).
- TypeScript strict verhindert ganze Bug-Kategorien.

**Alternativen:**
- T3-Stack (tRPC + Prisma) — verworfen, mehr Komplexität als nötig
- Remix — verworfen, kleinere Community
- SvelteKit — verworfen, weniger LLM-Trainingsdaten verfügbar
- Eigener Express-Backend — verworfen, mehr Wartungslast

---

## ADR-002 — Brownfield-Migration statt Greenfield

**Datum:** 2026-06-02

**Kontext:** Es existiert bereits eine vollständige Vanilla-JS-Lernapp (`~/Desktop/Arduino-Lernprogramm/`) mit ~576 KB strukturierten Lektionsdaten (5 `lessons-*.js`-Module), einer Render-Engine (`exercises.js`) und Leitner-/SR-Logik (`progress.js`). Diese Inhalte sind fachlich abgenommen (mehrere Review-Agenten, 0 offene Fachfunde).

**Entscheidung:** Die Lektionsdaten werden als Quelle behandelt und nach Supabase migriert (Schema: `courses`/`lessons`/`exercises`/`user_progress`). Render-Engine und Übungstypen werden zu React-Komponenten portiert. Das didaktische Wirksamkeits-Trio (elaboriertes Feedback + Spaced Repetition + gekoppelte Selbsteinschätzung) bleibt erhalten.

**Warum:**
- Die Inhalte sind das wertvollste Asset — nicht neu schreiben, sondern migrieren.
- Roadmap-Empfehlung: `LESSONS_*` als reine JSON-Daten → `INSERT ... SELECT FROM json`.
- Lessons/Exercises sind public-read (Lernen braucht kein Login); nur Progress/SR hinter Auth + RLS.

**Alternativen:**
- Inhalte neu schreiben — verworfen (Verschwendung, Risiko neuer Fachfehler).
- Vanilla-App 1:1 einbetten (iframe) — verworfen (kein echtes SaaS, keine Multi-User-Persistenz).

---

## ADR-003 — Durchstich mit Pilot-Modul „Grundlagen"

**Datum:** 2026-06-02

**Kontext:** 5 Module mit insgesamt ~576 KB Inhalt. Migration + UI + Auth + Trio auf einmal wäre ein großer Brocken mit viel gleichzeitigem Risiko.

**Entscheidung:** Runde 1 = vertikaler Durchstich: Skeleton + Auth + Schema + Migration NUR des Moduls „Grundlagen" + funktionierendes Trio + Deploy. Erst danach die übrigen vier Module.

**Warum:** Beweist die gesamte Architektur end-to-end an einem Modul, früher live, kleinere Lernschritte (Marco lernt den Stack).

**Alternativen:** Volle Migration aller 5 Module zuerst — verworfen für Runde 1 (Risiko/Lernkurve). Nur Fundament ohne Inhalte — verworfen (App ohne Substanz).

---

<!-- Weitere ADRs hier einfügen -->
