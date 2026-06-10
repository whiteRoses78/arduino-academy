# Spec: Lehrer-Tests-Übersicht v2 (Matrix je Modul + Klassen-Abschnitte)

Datum: 2026-06-10 · Status: von Marco freigegebenes Design (Brainstorming-Dialog)

## Kontext / Problem

`/lehrer/tests` ist noch der Durchstich vom Test-Feature: Die Seite zeigt fest
verdrahtet nur die Lektion „LEDs ansteuern" (`getLesson("digital","leds-ansteuern")`
→ `list_test_results(p_lesson_id)`). Die Schüler testen aber alle Lektionen —
beim 1. Klasseneinsatz (08.06.) wirkte die Seite leer, obwohl `test_attempts`
voll war; Ergebnisse kamen seither auf Zuruf per DB-Query. Stand heute:
30 Versuche von 6 Konten über 6 Lektionen, es werden laufend mehr
(30 Konten in 2 Klassen × 23 Lektionen möglich).

## Marco-Entscheidungen (2026-06-10)

1. **Matrix je Modul:** Zeilen = Schüler-Konten, Spalten = Lektionen des
   Moduls, Zelle = Prozent. Leere Zelle „—" = Test fehlt (Lücken-Übersicht).
2. **Abschnitte je Klasse:** pro Modul erst „Klasse 1" (arduino01–20), dann
   „Klasse 2" (arduino21–30) als eigene Tabelle; Zuordnung über die
   Kontonummer. Andere Konten mit Versuchen → Abschnitt „Weitere Konten".

## Verhalten der Seite

- **Modul-Abschnitte** in der festen didaktischen Reihenfolge
  (`MODULE_ORDER`: grundlagen → digital → analog → aktoren → projekt), mit
  Modul-Nummer + Titel („Modul 1 — Grundlagen…"). Module ohne einen einzigen
  Versuch werden ausgeblendet; ein Sammelhinweis nennt sie („Noch keine
  Versuche in: Analog, Aktoren, Projekt").
- **Spaltenköpfe kurz als „L1…L6"** (Lektions-position), darunter je Modul
  eine **Legende** (L1 = Was ist ein Arduino? …) — lange Lektionstitel
  sprengen sonst die Tabelle, besonders auf dem iPad.
- **Zeilen:** Konten mit mindestens einem Versuch irgendwo in der App
  („aktive Konten"), einsortiert in ihre Klassen-Tabelle, sortiert nach
  Kontonummer. Ein aktives Konto erscheint in **jeder angezeigten
  Modul-Tabelle seiner Klasse** — auch wenn es dort noch 0 Versuche hat
  (Zeile voller „—" = das Kind hat dieses Modul noch nicht getestet).
  Konten ganz ohne Versuche erscheinen als **Fußnote je Klasse** („Noch
  kein Versuch: arduino01, arduino04, …") statt als leere Zeilen.
- **Zelle:** Prozentwert; Tooltip (`title`) mit Details „5/6 Punkte ·
  08.06., 09:12". Leer = „—".
- **Ø-Zeile** unter jeder Tabelle: Schnitt je Lektions-Spalte über die
  vorhandenen Versuche (gerundet).
- Mobil: Tabellen in Scroll-Wrapper (`overflow-x-auto`, wie heute).
- Guard unverändert: `canViewSolutions(role)` sonst `redirect("/")`.

## Backend

- **Neue SECURITY-DEFINER-RPC `list_all_test_results()`** (ohne Parameter):
  - Rollen-Check wie `list_test_results` (nur teacher/admin, sonst Exception).
  - Liefert eine Zeile **pro Versuch**: `email`, `display_name`,
    `module` (Slug), `lesson_slug`, `lesson_title`, `lesson_position`,
    `score`, `max_score`, `percent`, `created_at` —
    **plus eine Zeile pro Schüler-Konto ohne jeden Versuch** (Lektions-/
    Score-Felder NULL). Quelle: alle `profiles` LEFT JOIN `test_attempts`,
    gefiltert auf `role='student' OR Versuch vorhanden` — so sind
    Schüler-Konten immer drin (auch ohne Versuch, für die Fußnote) und
    Nicht-Schüler-Konten genau dann, wenn sie Versuche haben („Weitere
    Konten"). Damit baut die Seite Matrix UND Fußnote aus einem einzigen
    Aufruf.
  - Grants: `revoke from public, anon`; `grant execute to authenticated`
    (Defense in depth: Rollen-Check wirft für Schüler trotzdem).
  - Additive Migration (`apply_migration`); die bestehende
    `list_test_results(p_lesson_id)` bleibt unverändert erhalten.
  - `db/schema.sql` + `src/lib/database.types.ts` nachziehen.

## Frontend

- **Klassen-Helfer** (reine Funktion, vitest-getestet):
  `accountGroup(email)` → `"klasse1" | "klasse2" | "weitere"` anhand
  `arduino<NN>@klasse.de` (01–20 / 21–30).
- `src/app/lehrer/tests/page.tsx` komplett neu: Server Component ruft
  `list_all_test_results()` + `getModules()` (Titel + Reihenfolge),
  gruppiert serverseitig (Modul → Klasse → Konto-Zeile), rendert
  Matrix-Tabellen. `MODULE_ORDER`-Sortierung über `getModules()`
  (bereits sortiert). Kein neues CSS-System, vorhandene Tabellen-/
  Theme-Klassen.

## Nicht-Ziele

- Kein Klassen-Verwaltungs-Feature in der DB (Zuordnung rein über
  Kontonummer; bei künftigen Klassen wird der Helfer erweitert).
- Keine Detail-/Drilldown-Seite pro Lektion (alte RPC bleibt dafür liegen).
- Kein Export (CSV/PDF) — bei Bedarf späterer Ausbau.
- Keine Änderung an Test-Ablauf, Fragen oder Schüler-Sicht.

## Verifikation (vor dem Push)

- RPC-Sicherheit: `has_function_privilege` für anon = false; Aufruf im
  Schüler-Kontext → Exception (SQL-Integrationstest mit Rollback);
  Datenkorrektheit der RPC gegen direkte SQL-Abfrage.
- vitest: Klassen-Helfer (Grenzfälle 01/20/21/30, fremde Mails) + bestehende
  Tests grün; tsc/lint/build grün.
- Anon-Check: `/lehrer/tests` leitet um (kein geschützter Inhalt im HTML).
- **Eingeloggter Sichttest: Marco** (ich habe bewusst keinen Admin-Zugang;
  wie beim Lehrerzugang-Feature). Vorab prüfe ich die Gruppierung
  inhaltlich per SQL gegen die echten 30 Versuche.
- Ein Push auf `main` = ein Netlify-Deploy; der lokale Umlaut-Commit
  `233ab53` reist mit.
