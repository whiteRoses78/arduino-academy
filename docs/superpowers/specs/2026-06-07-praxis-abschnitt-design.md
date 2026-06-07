# Praxis-Abschnitt nachbauen

**Datum:** 2026-06-07
**Status:** freigegeben, in Umsetzung

## Worum geht's

Die alte Vanilla-App (`~/Desktop/Arduino-Lernprogramm/`) hat pro Lektion bis zu
vier Tabs: Erklärung, Beispiel, Übung, **Praxis**. In der arduino-academy fehlt
der Praxis-Teil bisher in der Anzeige.

Wichtig: Die Praxis-**Daten** wurden beim Daten-Umzug schon vollständig nach
Supabase mitgenommen — sie liegen ungenutzt im Feld `content.praxis`. Es fehlt
also nur die Anzeige, keine Daten. Betroffen sind 5 Lektionen:
LEDs ansteuern (digital), Spannungsteiler & NTC-Temperatursensor (analog),
Servomotor & Transistor (aktoren). Das Modul Grundlagen hat keine Praxis.

## Was gebaut wird

Ein neuer Anzeige-Block "Praxis – selber bauen" auf der Lektionsseite. Er liest
die vorhandenen Daten und zeigt sie an. Keine Datenbank-Änderung.

Reihenfolge der Lektionsseite danach:
Erklärung → Beispiel → Übungen + Selbsteinschätzung → **Praxis** → Lehrer-Lösung

Inhalt des Blocks (von oben nach unten):
- Aufgabe: Titel, Auftrag, hervorgehobenes Lernziel
- Bauteilliste **mit Hinweisen** (z. B. "Langes Bein = Plus", Farbcode)
- Schaltplan (SVG) + nummerierte Aufbau-Schritte
- Code-Gerüst (Terminal-Optik) + Tipps

Der Block wird am Stück angezeigt (kein Aufklappen), weil es eine
Bau-Anleitung ist, die man der Reihe nach durcharbeitet.

## Drei getroffene Entscheidungen

1. **Bauteile:** Praxis zeigt eine eigene Bauteilliste *mit* den didaktischen
   Hinweisen. Leichte Doppelung zur "Das brauchst du"-Liste oben wird in Kauf
   genommen, weil die Hinweise genau im Bau-Moment nützlich sind.
2. **Lösung:** Die bestehende, gepflegte Lehrer-Lösungs-Box (Tabelle
   `lesson_solutions`) bleibt die einzige Lösungsquelle. Die alte, mit-migrierte
   `content.praxis.loesung` wird **nicht** angezeigt — sonst gäbe es zwei
   konkurrierende Lösungen pro Lektion. Das Feld bleibt absichtlich auch aus dem
   TypeScript-Typ raus, damit es niemand versehentlich rendert.
3. **Platzierung:** nach den Übungen, vor der Lehrer-Lösung (wie die alte
   Tab-Reihenfolge).

## Betroffene Dateien

- `src/lib/lessons.ts` — Typ `LessonContent` um `praxis` erweitern (ohne `loesung`)
- `src/components/praxis-section.tsx` — neue Anzeige-Komponente (rein darstellend)
- `src/app/modul/[modul]/[lektion]/page.tsx` — Block einbinden
- `src/app/globals.css` — höchstens eine schlanke Wrapper-Klasse; das meiste
  (`.code-card`, `.tip-box`, responsive SVG) ist schon da

## Fertig, wenn

- `npm run build` läuft fehlerfrei
- LEDs-Lektion zeigt den Praxis-Block nach den Übungen
- Eine Grundlagen-Lektion (ohne Praxis) bleibt unverändert
