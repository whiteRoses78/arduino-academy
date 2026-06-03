# 01 — Content-Durchstich (Lese-Pfad Grundlagen)

**Status:** ✅ Fertig

## Ziel

Die 5 migrierten Grundlagen-Lektionen öffentlich lesbar machen: Modul-Übersicht + Lektions-Detailseite, die den `content`-JSONB (HTML + SVG-Zeichnungen) sauber im App-Theme rendert. Beweist den Pfad Supabase → Server Component → gerenderter Inhalt und räumt das Kernrisiko (rendert der migrierte Content korrekt?) zuerst ab. Kein Login nötig.

## Abhängigkeiten

- Phase 1a (erledigt): Schema, Seed (Grundlagen-Daten in DB), Server-Client, public-read-Policy + SELECT-Grant für anon.

## Out of Scope

- Übungen, Feedback, Interaktivität (→ Spec 02)
- Auth/Login, Fortschritt, Trio (→ Spec 02)
- Die anderen 4 Module (digital, analog, aktoren, projekt)
- Polish-Pass, Deployment

## Akzeptanzkriterien

- [ ] `/modul/grundlagen` zeigt die 5 Lektionen in korrekter Reihenfolge (Position 1–5) mit Titel; jede verlinkt auf ihre Detailseite.
- [ ] `/modul/grundlagen/<lektion-slug>` rendert `content.explanation.html` inkl. der SVG-Zeichnungen (Board, Steckbrett, EVA-Diagramm).
- [ ] `content.example` (Titel + Schritte mit label/html) wird strukturiert dargestellt.
- [ ] Vanilla-Content-CSS-Klassen (analogy-box, info-card, tip-box, warning-box, icon-table, section-divider) sind im neuen Theme gestylt — lesbar, kein kaputtes Layout.
- [ ] Unbekanntes Modul oder unbekannte Lektion → 404 (`notFound()`).
- [ ] Landing `/` verlinkt nach `/modul/grundlagen`.
- [ ] Mobile-first ok in 3 Viewports (375/768/1280 px), keine Overflows, SVGs skalieren.
- [ ] Dark-Mode geprüft: Content + SVGs (helle Hintergründe) bleiben lesbar.

## Tasks

- [ ] `src/lib/lessons.ts` (server-only): `getModule(slug)` (Kurs + Lektionen sortiert nach `position`), `getLesson(modulSlug, lektionSlug)`. Typisiert über `database.types`.
- [ ] Route `src/app/modul/[modul]/page.tsx` — Server Component, Lektions-Liste (Card pro Lektion).
- [ ] Route `src/app/modul/[modul]/[lektion]/page.tsx` — Server Component, holt Lektion, rendert Content.
- [ ] Content-Renderer-Komponente: `explanation.html` via `dangerouslySetInnerHTML` (vertrauenswürdig — eigener Content, kein User-Input); `example` strukturiert.
- [ ] CSS: Vanilla-Content-Klassen ins App-Theme portieren, gescopt unter `.lesson-content`. Quelle: Vanilla `~/Desktop/Arduino-Lernprogramm/css/`.
- [ ] Landing-Page (`src/app/page.tsx`) auf Einstieg „Grundlagen" anpassen.
- [ ] `generateMetadata` für Lektions-/Modul-Titel (Browser-Tab).

## Validation

`rules/verification.md`:
- **UI-Komponente:** Visual Verification (browser-use, 3 Viewports), Hover/Focus, Empty/Error-States, keine harten #000/#fff, Transitions.

## Relevante Rules / Skills

- `rules/design-system.md` (UI)
- `rules/code-conventions.md` (Server Components by default)
- `superpowers:executing-plans` (Build)

## Debrief

Gebaut 2026-06-02. Kernrisiko (rendert der migrierte JSONB-Content?) ist abgeräumt — beide Lektionstypen (mit/ohne analogy-box) rendern serverseitig korrekt inkl. aller SVGs.

- **Überraschung:** shadcn `CardHeader` ist intern ein `grid`, kein flex. `flex-row` allein wird ignoriert — `flex` muss mit, damit tailwind-merge das `grid` überschreibt.
- **CSS-Port:** Vanilla-Vars (`--text`/`--accent`/`--sidebar-bg`) auf Theme-Tokens gemappt; Box-Farben (tip/warning) via `color-mix(in oklch, …)` dark-mode-fest gemacht. Klappte ohne Nacharbeit.
- **Verifikation:** Headless-Chromium aus dem Playwright-Cache (`browser-use` brachte es mit) für deterministische Screenshots an 375/768/1280 — kein LLM-Agent nötig, Bilder direkt prüfbar.
- **Vertagt:** Dark-Mode-Sichtcheck — Dark ist klassen-basiert (`.dark`), aber es gibt noch keinen Theme-Toggle. Sobald der existiert, nachholen.
- **Anders machen:** nichts Wesentliches; der `dangerouslySetInnerHTML`-Ansatz für eigenen, vertrauenswürdigen Content ist hier korrekt und einfach.
