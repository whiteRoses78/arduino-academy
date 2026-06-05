# Spec 03 — Bauteilliste pro Lektion

**Status:** Design freigegeben (Marco, 2026-06-04). Implementierung offen.
**Brainstorming-Ergebnis** aus der Roadmap-Sitzung 2026-06-04.

## Ziel

Schülerinnen und Schüler sehen pro praktischer Lektion eine schlichte Liste **„🧰 Das brauchst du"** (Menge + Bauteilname), damit sie das Material selbst zusammensuchen und sich organisieren können, bevor sie mit dem Aufbau beginnen. Didaktischer Mehrwert: Selbstorganisation.

## Entscheidungen (aus dem Brainstorming)

- **Zielgruppe:** Schüler (Arbeitshilfe pro Lektion, Mengen pro Arbeitsplatz — z.B. „1× Arduino Uno"). NICHT die Lehrer-Einkaufsliste (= spätere Ausbaustufe).
- **Reichweite:** alle **praktischen Lektionen** — Module `digital` (6) + `analog` (6) + `aktoren` (3) + `projekt` (3) = **18 Lektionen**. Modul `grundlagen` (Theorie) bleibt außen vor; nur dort eine Liste, wo eine Lektion doch Hardware braucht (bei der Daten-Extraktion pro Lektion entscheiden).
- **Detailtiefe:** schlicht — **Menge + Name** (+ ggf. Wert wie „220 Ω"). KEINE Bilder, KEINE Hinweise/Einkaufslinks (spätere Ausbaustufen).
- **Darstellung:** **fester Block ganz oben** in der Lektion, schlichte Liste, sofort sichtbar beim Öffnen (siehe Mockup unten).

## Datenmodell (Ansatz C — gewählt)

Neue Spalte **`parts jsonb`** auf der bestehenden Tabelle `public.lessons`.

- Format: `[{ "name": "Widerstand 220 Ω", "qty": 5 }, { "name": "Arduino Uno", "qty": 1 }, ...]` (Reihenfolge = Anzeige-Reihenfolge).
- `null` / leeres Array = keine Bauteilliste anzeigen (z.B. Theorie-Lektionen).
- **Begründung gegen Alternativen:** A) im `content`-JSONB → würde mit dem 1:1 geseedeten Vanilla-HTML vermischt und beim Re-Seed überschrieben. B) eigene Tabelle → sauber, aber RLS/Grants-Aufwand (vgl. Grants-Gap dieses Projekts) — Overkill für den ersten Wurf. C) erbt die bestehenden `lessons`-Rechte (public read), bleibt re-seed-fest und ist später leicht aggregierbar (Lehrer-Einkaufsliste) und erweiterbar (Felder `image`, `link`).

## Datenbeschaffung

Die Bauteile stehen bereits in den Lektions-Texten (`content`) — verifiziert für `projekt` (alle 3 enthalten Widerstand/Steckbrett/LED/Taster/Jumper + das Wort „Bauteil"); für die übrigen praktischen Lektionen bei der Umsetzung pro Lektion prüfen.

**Arbeitsteilung:** Claude **extrahiert je Lektion einen Entwurf** der Bauteilliste aus dem `content` → **Marco prüft & korrigiert** (inhaltliche Hoheit). Befüllung der `parts`-Spalte via `db/seed.mjs` (strukturierte Map pro Lektion, re-seed-fest) ODER gezieltes `UPDATE` via Supabase-MCP — da kleine strukturierte Daten (kein 70-KB-HTML), ist `execute_sql`-UPDATE praktikabel.

## Darstellung (UI)

```
Projekt: Ampel mit Fußgängerüberweg
==================================
  🧰 Das brauchst du
    • 1× Arduino Uno
    • 1× Steckbrett
    • 3× LED (rot, gelb, grün)
    • 2× LED Fußgänger (rot, grün)
    • 5× Widerstand 220 Ω
    • 1× Taster
    • Jumper-Kabel nach Bedarf
----------------------------------
  [Lektions-Inhalt …]
```

- Neue Server-Komponente, z.B. `src/components/parts-list.tsx` — rendert den Block, wenn `lesson.parts` nicht leer ist; sonst nichts.
- Eingebunden in der Lektionsseite (`src/app/modul/[modul]/[lektion]/page.tsx`) **oberhalb** von `<LessonContent>`.
- Styling konsistent mit den vorhandenen Content-Boxen (`.lesson-content`-Box-Stil, z.B. wie `info-card`); Theme-Tokens, dark-mode-fest, mobil sauber.

## Nicht-Ziele (YAGNI — bewusst später)

- Keine Bilder/Icons pro Bauteil.
- Kein Abhaken (Checkliste) und keine Persistenz des Abhakens.
- Keine aggregierte Lehrer-/Einkaufsliste über mehrere Lektionen.

## Umsetzungsschritte (grob, für den Plan)

1. Migration: Spalte `parts jsonb` an `public.lessons` (default `'[]'::jsonb`). Grants prüfen (erbt SELECT von `lessons`).
2. TS-Types neu generieren (`src/lib/database.types.ts`).
3. Bauteildaten je praktischer Lektion aus `content` extrahieren → Marco-Review → `parts` befüllen.
4. `getLesson` (`src/lib/lessons.ts`) um `parts` erweitern; Typ ergänzen.
5. `parts-list.tsx` bauen + in Lektionsseite oberhalb des Contents einbinden.
6. Verifizieren: `tsc --noEmit` + lint + `npm run build`; Visual @375/@1280 (overflow 0); Stichprobe Ampel-Lektion zeigt korrekte Liste.

## Verifikationskriterien

- Praktische Lektionen zeigen den „Das brauchst du"-Block mit korrekten Mengen + Namen; Theorie-Lektionen zeigen ihn nicht.
- Mobil (@375) kein horizontaler Overflow; dark mode sauber.
- Build/Lint/tsc grün.
