# Kompetenztest-Ausbau — Modul 1 (Grundlagen)

**Datum:** 2026-06-07
**Status:** Design freigegeben (Marco), Umsetzung läuft

## Ziel

Die bereits live geschaltete Kompetenztest-Mechanik (Durchstich: `digital/leds-ansteuern`)
auf weitere Lektionen ausrollen — **modulweise**, beginnend mit **Modul 1 = Grundlagen**.

## Umfang (dieser Schritt)

Je ein Multiple-Choice-Kompetenztest für die 5 Grundlagen-Lektionen:

1. `grundlagen/was-ist-ein-arduino` — „Was ist ein Arduino?"
2. `grundlagen/das-arduino-uno-board` — „Das Arduino Uno Board"
3. `grundlagen/strom-spannung-und-widerstand` — „Strom, Spannung & Widerstand"
4. `grundlagen/die-arduino-ide-und-dein-erstes-programm` — „Die Arduino IDE & dein erstes Programm"
5. `grundlagen/setup-und-loop` — „setup() und loop()"

## Fragen-Policy (Marco-Entscheidung, dauerhaft)

- **Modul 1 (Grundlagen): 6 Fragen pro Lektion** (Theorie, etwas leichter).
- **Ab Modul 2: mindestens 8 Fragen pro Lektion.**
- Gleiche Anzahl je Lektion innerhalb eines Moduls → faire, vergleichbare Prozente.

## Inhalt & Format

- Quelle: der vorhandene Lektions-Inhalt in Supabase (`lessons.content` → `explanation`/`example`).
  Bestehende MC-Übungen dienen als Ideengeber; matching/ordering-Übungen passen nicht in den
  reinen MC-Test.
- Re-seed-feste Quelle: `db/test-questions-data.mjs`, Key `"<modul>/<slug>"`.
- Frageformat (1:1 wie LEDs): `{ type: "multiple-choice", question, options: [4], correct: <Index 0–3>, explanation }`.
- Deutsch, Klasse-8-/M-Niveau, je 4 Optionen mit genau einer richtigen, plausible Distraktoren,
  kurze Erklärung. Gerade Anführungszeichen, echte Umlaute (UTF-8).

## Kein neuer Code

Das Frontend zeigt den Test-Block automatisch, sobald `has_test(lesson_id)` true ist. Es wird
**nur Inhalt** ergänzt (Datenquelle + Prod-Insert). Keine Komponenten/Migrationen nötig.

## Ablauf (Review-Tor vor dem Einspielen)

1. **Entwurf:** 5 parallele Subagenten (1/Lektion) entwerfen je 6 MC-Fragen aus dem Lektions-Inhalt.
2. **Review-Doc:** `docs/review-test-grundlagen.md` — alle 30 Fragen mit markierter Lösung.
3. **Fakten-Check:** adversariale Gegenprüfung der „richtigen" Antworten (graded Test → falsche
   Musterlösung wäre gravierend).
4. **Marco-Freigabe** (oder Korrektur).
5. **Einspielen:** `db/test-questions-data.mjs` füllen + idempotenter MCP-`execute_sql`-Insert
   (delete+insert je Lektion; `test_questions` erlaubt keinen anon-Insert).
6. **Verifikation:** Fragen-Counts in der DB; `get_test_questions` strippt `correct`/`explanation`
   (kein Leak); Anon-Sicht zeigt Block + Anmelde-Hinweis, kein „Test starten".

## Sicherheits-Hinweis

Der UI-Code ist bereits deployed → **sobald Fragen in der Prod-DB liegen, sind die Tests sofort
für Schüler sichtbar** (kein Deploy dazwischen). Darum: erst Freigabe, dann Insert.

## Nicht in diesem Schritt (YAGNI)

- Andere Aufgabentypen im Test (matching/ordering) — bleibt MC.
- Notenschlüssel in der App — Marco vergibt Noten selbst (nur Punkte/Prozent).
- Module 2–5 — folgen je als eigener Ausbau-Schritt mit ≥ 8 Fragen.
