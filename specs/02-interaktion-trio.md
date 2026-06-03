# 02 — Interaktion + Trio (Übungen, Auth, Fortschritt)

**Status:** ✅ Fertig (Etappe 1 Übungen, Etappe 2 Auth, Etappe 3 Trio — alle verifiziert)

## Ziel

Den Lese-Pfad aus Spec 01 interaktiv machen: Übungen mit elaboriertem Feedback, Login, und das didaktische Trio (Selbsteinschätzung → Leitner-Wiederholung) auf `user_progress`. Danach ist das Modul Grundlagen end-to-end nutzbar.

## Abhängigkeiten

- Spec 01: Lektions-Detailseite existiert (Übungen hängen unter der Lektion).
- Phase 1a: `user_progress`/`profiles` (RLS + Grants), Auth-Client.

## Out of Scope

- Passwort-Reset, Profil-Bearbeitung, Email-Confirmation-UX
- Die anderen 4 Module
- Polish-Pass, Deployment

## Akzeptanzkriterien

- [x] Multiple-Choice: Frage + Optionen; Abgabe zeigt elaboriertes Feedback (richtige `explanation` + `wrongExplanations` pro falscher Option). Deterministischer Shuffle (kein Positions-Bias, Logik aus Vanilla `exercises.js`).
- [x] `matching` + `ordering` ebenfalls spielbar mit Feedback.
- [x] Lektion gilt als abgeschlossen, wenn alle Übungen richtig → Selbsteinschätzung (low/medium/high) wird abgefragt.
- [x] Eingeloggt: Abschluss + Selbsteinschätzung schreiben `user_progress` (Box/`due_date` nach Leitner [1,3,7,16,35]; Regel: low→Box 1, medium→bleibt, high→+1).
- [x] Anonym: Feedback + Selbsteinschätzung sichtbar, aber Nudge „anmelden, um Fortschritt zu speichern". Kein Schreiben.
- [x] `/anmelden` + `/registrieren`: Email+Passwort, zod-validiert (client + server), Server Action. Sign-Up legt via Trigger ein Profil an, Session gesetzt. Logout invalidiert Session.
- [x] `/dashboard`: Fortschritt (abgeschlossene Lektionen) + fällige Wiederholungen (`due_date <= heute`).
- [x] `/dashboard` nur eingeloggt erreichbar (Guard in `proxy.ts`).

## Tasks

- [x] `src/lib/leitner.ts` — pure Funktionen: `recordCompletion`-Logik (confidence→Box), `addDays`, `isDue`, Intervalle. **TDD (16 Tests).**
- [x] Übungs-Komponenten (Client): `multiple-choice` (+ portierter Shuffle), `matching`, `ordering`, mit Feedback-Anzeige.
- [x] Selbsteinschätzungs-Komponente (low/medium/high) am Lektions-Ende.
- [x] Server Action: Abschluss/Selbsteinschätzung → `user_progress` (nur eingeloggt). Zod-validiert, try/catch.
- [x] Auth-UI: `/anmelden`, `/registrieren` (Server Actions), Logout-Action.
- [x] `/dashboard` (Server Component): Fortschritt + fällige Wiederholungen.
- [x] `/dashboard`-Guard in `proxy.ts` aktivieren (Redirect → `/anmelden`).

## Validation

`rules/verification.md`:
- **Auth-Flow** (Sign-Up/-In/-Out, Session-Refresh, Passwort-Mindestlänge — Cookie-Pattern via Context7). ✅
- **API-Route / Server Action** (Status, Validation, Error-Handling, TDD für Leitner + Server Actions). ✅
- **UI-Komponente** (Visual Verification, 3 Viewports, Hover/Focus, States). ✅

## Relevante Rules / Skills

- `rules/design-system.md`, `rules/code-conventions.md`, `rules/verification.md`
- `superpowers:test-driven-development` (Leitner-Logik, Server Actions)

## Debrief

**Alle drei Etappen fertig + verifiziert** (Details im changelog 2026-06-02 / 2026-06-03).

- **Etappe 1 (Übungs-Engine):** MC/matching/ordering mit elaboriertem Feedback, deterministischer Shuffle.
- **Etappe 2 (Auth-UI):** zod-Schema (TDD), Server Actions (Context7-verifiziertes @supabase/ssr-Pattern), AuthForm, Seiten, globaler Header. Auth-Flow live. Tooling: vitest + `scripts/shot.mjs` (puppeteer Visual Verification).
- **Etappe 3 (Trio):** Leitner (16 TDD-Tests, 1:1 aus Vanilla), Abschluss-Erkennung (`onSolved` → ExerciseSection-Client → SelfAssessment), Speicher-Action (`saveLessonProgress`), Dashboard + Guard. E2E verifiziert (`scripts/verify-trio.mjs`): kompletter Durchlauf inkl. DB-Werte (box 2, due_date heute+3) und Dashboard-Anzeige.

**Ergebnis:** Modul „Grundlagen" ist end-to-end nutzbar — der Durchstich (Spec 01 + 02) steht. Das Wirksamkeits-Trio (elaboriertes Feedback + Spaced Repetition + gekoppelte Selbsteinschätzung) ist live.

**Funde unterwegs:** (1) Chrome `--headless --window-size` täuscht Mobile-Overflow vor → puppeteer `setViewport({isMobile})` ist verlässlich. (2) Supabase-Projekt: E-Mail-Bestätigung AUS (Auto-Login) — für Launch wieder AN.
