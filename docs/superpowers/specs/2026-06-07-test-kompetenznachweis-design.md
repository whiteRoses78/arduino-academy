# Test / Kompetenznachweis pro Lektion

**Datum:** 2026-06-07
**Status:** Konzept freigegeben, Spec zur Durchsicht
**Durchstich:** nur Lektion „LEDs ansteuern" (digital). Ausrollen auf die übrigen Lektionen danach.

## Worum geht's

Pro Lektion ein kurzer digitaler Test mit zwei Zwecken:
1. **Selbstkontrolle** für den Schüler: ehrlich prüfen „Kann ich das wirklich?".
2. **Notengrundlage** für den Lehrer: ein dokumentiertes Ergebnis pro Schüler.

Abgrenzung zu den bestehenden Übungen: Die Übungen bleiben das beliebig-oft-Üben
mit Sofort-Feedback. Der Test ist der *eine ernste* Durchgang, der zählt.

## Getroffene Entscheidungen (mit Marco, 2026-06-07)

1. **Form:** digital in der App (nutzt die vorhandene Frage-Anzeige).
2. **Fragen:** Mischung — einige bestehende Übungsfragen + einige neue, die nur
   im Test vorkommen. So kein Auswendiglernen. Neue Fragen: ich entwerfe, Marco
   prüft fachlich (wie bei den Lehrer-Lösungen).
3. **Note:** App zeigt nur Punkte/Prozent („8 von 10 = 80 %"). Die Note vergibt
   Marco selbst — kein Notenschlüssel in der App.
4. **Versuche:** genau **ein Versuch** pro Schüler und Lektion. Danach gesperrt,
   nur noch das Ergebnis + Auflösung sichtbar.
5. **Lehrer-Übersicht:** eigene Seite, nur für teacher/admin: pro Lektion alle
   Konten mit Ergebnis + Zeitstempel. Zuordnung zum echten Namen über die
   Papier-Kärtchen (Klarnamen bleiben offline).

## Ablauf aus Schülersicht

1. Auf der Lektionsseite ein Knopf „Test starten" (z. B. nach den Übungen).
2. Test im **Ernst-Modus**: Fragen nacheinander, **kein** Tipp / keine Auflösung
   zwischendurch. Antworten werden gesammelt.
3. „Abschicken" → Ergebnis: Punktzahl + Prozent, danach die Auflösung pro Frage
   (richtig/falsch + Erklärung). Das ist der Selbstkontroll-Moment.
4. Zweiter Aufruf zeigt nur noch das gespeicherte Ergebnis (Versuch verbraucht).

## Wichtig: faire Bewertung läuft am Server (Sicherheit)

Bei einem benoteten Test dürfen die richtigen Antworten **nicht** im Browser
verfügbar sein — sonst könnte man sie vorab aus dem System auslesen und schummeln.
(Die bestehenden Übungen sind bewusst offen, weil sie nur zum Üben sind.)

Deshalb beim Test anders als bei den Übungen:
- Der Browser bekommt **nur Frage + Antwortoptionen**, nicht die Lösung.
- Der Server bewertet (er kennt die Lösung), speichert das Ergebnis und schickt
  erst dann die Auflösung zurück.
- Umsetzung über `SECURITY DEFINER`-Datenbankfunktionen (gleiches Muster wie die
  bestehenden `set_teacher_role`/`list_teachers`) — kein Service-Key in der App.

## Datenmodell

Zwei neue Tabellen + drei Server-Funktionen.

**Tabelle `test_questions`** (die Testfragen):
- `id` uuid PK, `lesson_id` uuid FK → lessons, `position` int
- `type` text (multiple-choice/matching/ordering — wie `exercises`)
- `payload` jsonb (volle Frage inkl. Lösung — wie `exercises`)
- `created_at`
- RLS: **kein** public-read (sonst Lösung sichtbar). Zugriff nur über die
  Server-Funktionen unten.

**Tabelle `test_attempts`** (die Ergebnisse):
- `id` uuid PK, `user_id` uuid FK → auth.users, `lesson_id` uuid FK → lessons
- `score` int, `max_score` int, `percent` int
- `answers` jsonb (was der Schüler geantwortet hat — für die Auflösung)
- `created_at`
- Eindeutig pro (`user_id`, `lesson_id`) → erzwingt „ein Versuch".
- RLS: User liest **eigene** Zeilen; teacher/admin lesen **alle** (NEU — siehe
  Datenschutz). Insert nur über die Server-Funktion.

**Server-Funktionen (`SECURITY DEFINER` RPC):**
- `get_test_questions(lesson_id)` → Fragen **ohne** Lösungsfelder, für eingeloggte
  User. Sperrt, wenn schon ein Versuch existiert (gibt dann nur „verbraucht").
- `submit_test(lesson_id, answers)` → bewertet serverseitig, schreibt **einen**
  `test_attempts`-Eintrag (lehnt zweiten Versuch ab), gibt Auswertung zurück.
- `list_test_results(lesson_id)` → für teacher/admin: alle Konten + Ergebnis.

## UI-Bausteine

- **Test-Komponente** (Client): zeigt Fragen ohne Feedback, sammelt Antworten,
  ruft `submit_test`. Nutzt die vorhandenen Frage-Renderer (MC/matching/ordering)
  in einem „Ernst-Modus" ohne Sofort-Auflösung.
- **Ergebnis-Ansicht:** Punkte/Prozent + Auflösung pro Frage.
- **Lehrer-Übersichtsseite** (Server Component, teacher/admin): Tabelle pro
  Lektion. Erreichbar z. B. unter `/admin/tests` oder eigener Lehrer-Bereich.

## Datenschutz ⚠️

Die Lehrer-Übersicht ist der **erste** Fall in der App, in dem ein User (Lehrer)
Daten **anderer** User (Schüler) sieht. Bewusst sparsam: nur **anonyme
Kontonamen + Punktzahl + Zeitpunkt**, keine Klarnamen. Passt zur
Datensparsamkeits-Linie ([[project-datenschutz-schuleinsatz]]). Neue RLS-Regel
auf `test_attempts` wird streng auf teacher/admin begrenzt (wie `lesson_solutions`).

## Offene Detail-Punkte (in der Umsetzungsplanung zu klären)

- Genaue Fragenzahl pro Test (Vorschlag: 6–10; konkret bei der LEDs-Lektion
  festlegen, wenn die neuen Fragen entworfen sind).
- Mischverhältnis bestehende/neue Fragen (Vorschlag: Hälfte/Hälfte).
- Platzierung des „Test starten"-Knopfs (Vorschlag: nach den Übungen, klar
  abgesetzt mit Hinweis „zählt — ein Versuch").

## Fertig, wenn (für den Durchstich „LEDs ansteuern")

- Schüler kann den Test einmal machen, sieht Punkte/Prozent + Auflösung.
- Zweiter Versuch ist gesperrt.
- Antworten/Lösung sind im Browser **nicht** vorab auslesbar (serverseitig geprüft).
- Marco (als Lehrer eingeloggt) sieht die Ergebnis-Übersicht der Konten.
- Übungen + Praxis der Lektion bleiben unverändert.
- `npm run build` + lint grün; an der LEDs-Lektion verifiziert.
