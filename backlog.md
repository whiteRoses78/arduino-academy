# Backlog

Ideen-Parkplatz. Was später vielleicht rein soll, aber nicht in den aktuellen Scope passt.

Format: Stichpunkt, optional mit Datum + Begründung.

---

## Gesamtprüfung 2026-10-02

Details, Fixes und Gegenprüfung: lokaler Prüfbericht (nicht im Repo). ❓ = braucht Marcos Angabe, (UI) = nur nach Rückfrage.

- [x] [KRITISCH] App · Rechte-Lücke in der Datenbank — behoben 02.10.2026
- [ ] [KRITISCH] M2 · Erklärung zu `if (zustand = LOW)` falsch („immer wahr“ statt nie wahr)
- [ ] [KRITISCH] M2 · Ampel-Reihenfolge: richtige Antwort im Test als falsch gewertet (Wertung prüfen)
- [ ] [KRITISCH] M3 · Spannungsteiler-Praxis: c8/c10 ergibt keinen Stromkreis
- [ ] [KRITISCH] M4 · Testfrage belohnt falsche Diagnose „C/E vertauscht → Motor läuft ständig“
- [ ] [KRITISCH] M4 · Tipp „5–9 V an 5V-Pin“ zerstört den Arduino ❓
- [ ] [KRITISCH] M5 · „Nachtabschaltung“ schaltet tagsüber ab, Titel/Einleitung widersprechen ❓
- [x] [WICHTIG] M1 · Board-Grafik gegenüber echtem Uno gespiegelt — erledigt 02.10.
- [x] [WICHTIG] M1 · Breadboard-Grafik L4: zwei Drähte pro Loch — erledigt 02.10.
- [x] [WICHTIG] M1 · LED-Strom widersprüchlich (15/20 mA, 220/150 Ω, „brennt durch“) — erledigt 02.10.
- [x] [WICHTIG] M1 · Reihenfolge-Übung „Hochladen“ wertet richtige Abläufe falsch — erledigt 02.10.
- [x] [WICHTIG] M1 · Keine Fehlersuche beim ersten Hochladen / Port — erledigt 02.10.
- [x] [WICHTIG] M1 · Kompetenztest nur Wissen, Dubletten zu Übungen — erledigt 02.10.
- [x] [WICHTIG] M1 · Reihen-/Parallelschaltung ohne Übung — erledigt 02.10.
- [x] [WICHTIG] M1 · Kochrezept-Analogie widerspricht „loop endlos“ — erledigt 02.10.
- [x] [WICHTIG] M1 · int/void/kompilieren/Port/Baud nie erklärt — erledigt 02.10.
- [x] [WICHTIG] M1 · Begriff „Aktor“ nie erklärt — erledigt 02.10.
- [x] [WICHTIG] M1 · Pins 0/1 (RX/TX) ohne Warnhinweis — erledigt 02.10.
- [ ] [WICHTIG] M2 · Praxis L1: Steckplätze passen nicht zum Bild
- [ ] [WICHTIG] M2 · L1-Beispiel: GND-Schiene nie mit Arduino verbunden
- [ ] [WICHTIG] M2 · Taster „gegenüber“ statt diagonal, keine Fehlerhilfe
- [ ] [WICHTIG] M2 · Fehlersuche fehlt in 5 von 6 Lektionen
- [ ] [WICHTIG] M2 · Ab L2 kein Schaltplan mit Schaltzeichen
- [ ] [WICHTIG] M2 · &&, bool-Vergleich, digitalWrite(bool), Parameter unerklärt
- [ ] [WICHTIG] M2 · Kompetenztest: Detailfragen, Dubletten, keine Fehlersuche
- [ ] [WICHTIG] M2 · „pinMode vergessen → dunkel“ (glimmt in Wahrheit)
- [ ] [WICHTIG] M3 · Poti-Belegung: Text, SVGs und Lösung widersprechen sich
- [ ] [WICHTIG] M3 · NTC-Aufbau: Text ≠ Bild, Jumperzahl, A0-Kabel im SVG
- [ ] [WICHTIG] M3 · LDR-Pupillen-Analogie verdreht (auch Testfrage)
- [ ] [WICHTIG] M3 · LDR-Bild LED an Pin 2 statt 8 / LED in Bauteilliste ❓
- [ ] [WICHTIG] M3 · Keine Norm-Schaltzeichen für Poti und LDR
- [ ] [WICHTIG] M3 · Nachtlicht/LDR/PWM ohne Praxis und Fehlersuche
- [ ] [WICHTIG] M3 · NTC-Beispiel: Anhauchen ≠ 50 °C
- [ ] [WICHTIG] M3 · Ordering Nachtlicht: Reihenfolge unlogisch
- [ ] [WICHTIG] M3 · Spannungsteiler-Einstieg „warm = höhere Spannung“
- [ ] [WICHTIG] M3 · NTC-Fehlerdiagnose falsch (nur in praxis.loesung, erledigt sich mit App-Fund)
- [ ] [WICHTIG] M3 · Spannungsteiler-Lösung 5 mA statt 2,5 mA (nur in praxis.loesung)
- [ ] [WICHTIG] M4 · L298N-Tabelle: LOW/LOW ist Bremse
- [ ] [WICHTIG] M4 · Servo-SVG: Spalte 9 statt 10, zwei Kabel in einem Loch
- [ ] [WICHTIG] M4 · Servo-SVG: Stecker mit „−“ in der Mitte
- [ ] [WICHTIG] M4 · Motor/BC547-Grenze/RE-140/L298N-Spannung ❓
- [ ] [WICHTIG] M4 · HC-SR04 nur Code-Bruchstück ❓
- [ ] [WICHTIG] M4 · Feedback „Servo hat keine Polung“
- [ ] [WICHTIG] M4 · Servo: 3 statt 6 Jumper in der Liste
- [ ] [WICHTIG] M4 · −Schiene „oben“ im Text, unten im Bild
- [ ] [WICHTIG] M4 · L298N: GND als Male-Female, M/F unerklärt
- [ ] [WICHTIG] M5 · LDR-Bein im SVG auf GND-Schiene
- [ ] [WICHTIG] M5 · 10-kΩ-Widerstand mit 120-Ω-Ringen
- [ ] [WICHTIG] M5 · Lüftung: Basiswiderstand fehlt
- [ ] [WICHTIG] M5 · Relais „z. B. 230 V“, Pool-Bauteile unerklärt ❓
- [ ] [WICHTIG] M5 · Löten ohne Sicherheitsregeln ❓
- [ ] [WICHTIG] M5 · Lötstellen-Faustregel widerspricht sich
- [ ] [WICHTIG] M5 · Testfrage: vertauschter Spannungsteiler „funktioniert nicht“
- [ ] [WICHTIG] M5 · Keine Schüler-Fehlersuche in L1/L2
- [ ] [WICHTIG] M5 · Keine Praxis-/Transfer-Aufgabe im Projektmodul
- [ ] [WICHTIG] M5 · Lüftungs-Skelett mit fehlerhaftem Toggle
- [ ] [WICHTIG] M5 · „Zustandsmaschine“ unerklärt
- [ ] [WICHTIG] M5 · RGB-LED nur gemeinsame Kathode ❓
- [ ] [WICHTIG] Übergreifend · Lektionsverweise (L5, L19, Lektion 11 …) falsch/unauffindbar
- [ ] [WICHTIG] Übergreifend · Ersatzschreibungen ae/oe/ue in M2–M5 (Wortliste, kein Regex)
- [ ] [WICHTIG] Übergreifend · Operatoren ||, <=, >=, != nie erklärt
- [ ] [WICHTIG] Übergreifend · Flussdiagramm nur einmal gezeigt
- [ ] [WICHTIG] App · Zugriffsschutz für Lehrer-Inhalte nachschärfen (Details im lokalen Prüfbericht)
- [ ] [WICHTIG] App · Ordering-Pfeile zu klein (UI)
- [ ] [WICHTIG] App · Header/Prüfen/Login unter 44 px (UI)
- [ ] [WICHTIG] App · iOS-Zoom bei Auswahlliste/Input (UI)
- [ ] [WICHTIG] App · Zwei Zuordnungsübungen ungemischt (UI)
- [ ] [WICHTIG] App · Datenschutzerklärung ohne Testergebnisse ❓
- [ ] [NICE] 37 weitere Politur-Funde (alle Module + App) → siehe `PRUEFBERICHT-2026-10-02.md`

