# Projekt-Kontext — arduino-academy

**Vision:** SaaS-Transformation des Arduino-Lernprogramms. Aus der bestehenden statischen Vanilla-App (interaktive Technik-Lernplattform für die Realschul-Abschlussprüfung BW, 17+ Lektionen in 5 Modulen) wird eine Multi-User-Webapp mit Login. Lerninhalte liegen in Supabase; pro Nutzer werden Fortschritt, Spaced Repetition (Leitner 1/3/7/16/35 Tage) und Selbsteinschätzung persistiert. Das didaktische Wirksamkeits-Trio — elaboriertes Feedback + Spaced Repetition + gekoppelte Selbsteinschätzung — bleibt das Herz der App. **Runde 1: Durchstich mit Pilot-Modul „Grundlagen"**, die übrigen vier Module folgen. (Wird in Phase 2 Sparring verfeinert.)

## Herkunft / Datenquelle
- Vanilla-App: `~/Desktop/Arduino-Lernprogramm/` (eigenes Repo, live auf GitHub Pages) — **bleibt unangetastet**, ist die Inhaltsquelle.
- Daten: `js/lessons-grundlagen.js`, `lessons-digital.js`, `lessons-analog.js`, `lessons-aktoren.js`, `lessons-projekt.js` + `js/exercises.js` (Render-Engine) + `js/progress.js` (Leitner/SR-Logik) + `assets/*.svg`.
- Lizenz-Hinweis: BW-Skript + Rottweil-Anleitung sind CC-NC → für die SaaS keine direkte Übernahme fremder Texte/Bilder, nur eigene Inhalte/SVGs.

## Kommunikation
- Deutsch, RPL (respektvoll, pragmatisch, lösungsorientiert)
- Erkläre Schritte vor der Ausführung — Marco ist fortgeschrittener Anfänger

## Tech-Stack
Next.js 15 + React 19 + TypeScript strict, Tailwind v4 + shadcn/ui, Supabase, Vercel.

## Wann welche Rule lesen

| Aufgabe | Rule |
|---|---|
| UI-Komponente bauen | `rules/design-system.md` |
| Server Action / API Route | `rules/code-conventions.md` |
| Feature fertigstellen | `rules/verification.md` |
| Commands / MCPs / Struktur | `rules/tech-stack.md` |

## Tools / MCPs
- **Supabase MCP** — Schema, SQL, Type-Gen
- **Context7 MCP** — aktuelle Framework-Docs (Next.js 15, Supabase SSR)

## Kernprinzipien
- Server Components by default, Client nur wo interaktiv
- Hover/Focus auf jedem interaktiven Element
- Mobile-first
- Bei API-Fragen: Context7 MCP konsultieren, NICHT aus Gedächtnis
- Didaktik ist Pflicht, nicht Kür: jede Lern-Interaktion muss das Wirksamkeits-Trio bedienen
