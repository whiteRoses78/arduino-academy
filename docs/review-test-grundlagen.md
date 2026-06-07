# Review: Kompetenztest-Fragen — Modul 1 (Grundlagen)

**Stand:** 2026-06-07 — Entwurf zur Freigabe durch Marco
**Umfang:** 5 Lektionen × 6 MC-Fragen = 30 Fragen
**Quelle:** je Lektion ein Subagent aus dem Supabase-Lektionsinhalt (`content.explanation`/`example`).

## Hinweise vor der Freigabe

- **Fakten-Check (Claude):** alle 30 fachlich geprüft — keine Fehler gefunden. Physik (Einheiten, Ohmsches Gesetz `I = U/R`, `5 V / 250 Ω = 20 mA`), PWM-Pins (3,5,6,9,10,11), Breadboard-Verdrahtung, EVA-Prinzip, `delay(1000)=1 s` etc. stimmen.
- **Antwort-Positionen:** Im Entwurf häufen sich die richtigen Antworten oben. In der **finalen Datei verteile ich sie über die 4 Positionen** (der Test mischt nicht automatisch), damit er nicht durch „immer A" lösbar ist. Die markierte richtige Antwort unten bleibt inhaltlich natürlich dieselbe.
- ✅ = richtige Antwort.

---

## Lektion 1 — Was ist ein Arduino? (`was-ist-ein-arduino`)

**1. Wie groß ist ein Arduino ungefähr?**
- So groß wie ein Laptop
- ✅ Etwa so groß wie eine Kreditkarte
- So groß wie ein Smartphone-Ladegerät
- So klein wie ein Reiskorn
> *Erklärung:* In der Lektion wird der Arduino als kleine Schaltzentrale beschrieben, nicht größer als eine Kreditkarte.

**2. Wofür stehen die drei Buchstaben beim EVA-Prinzip?**
- ✅ Eingabe, Verarbeitung, Ausgabe
- Energie, Verbrauch, Anschluss
- Erkennen, Vergleichen, Anzeigen
- Einschalten, Verbinden, Ausschalten
> *Erklärung:* EVA steht für Eingabe, Verarbeitung und Ausgabe — so arbeitet fast jedes technische System.

**3. Beim Nachtlicht-Beispiel: Was übernimmt im EVA-Prinzip die Eingabe?**
- Die LED, die leuchtet
- ✅ Der LDR, der die Helligkeit misst
- Der Arduino, der entscheidet
- Das Programm in der Arduino IDE
> *Erklärung:* Der LDR (Lichtsensor) misst die Helligkeit (Eingabe); der Arduino verarbeitet, die LED ist die Ausgabe.

**4. Was ist das Herzstück eines Arduino?**
- Ein Bildschirm
- ✅ Ein Mikrocontroller
- Eine Festplatte
- Ein Betriebssystem
> *Erklärung:* Das Herzstück ist ein Mikrocontroller, der immer nur eine Aufgabe ausführt, diese aber zuverlässig.

**5. Was ist ein wichtiger Unterschied zwischen einem Computer und einem Arduino?**
- Der Arduino kann mehr Aufgaben gleichzeitig erledigen
- Der Arduino braucht ein Betriebssystem wie Windows
- ✅ Der Arduino hat kein Betriebssystem, sondern führt nur dein Programm aus
- Der Arduino verbraucht deutlich mehr Strom als ein Computer
> *Erklärung:* Anders als ein Computer hat der Arduino kein Betriebssystem — er führt nur dein Programm aus und verbraucht sehr wenig Strom.

**6. Für welche Aufgabe ist ein Arduino typischerweise gut geeignet?**
- Videos abspielen und im Internet surfen
- ✅ Etwas automatisch steuern, zum Beispiel eine Ampel
- Mehrere Spiele gleichzeitig starten
- Große Datenmengen wie ein PC speichern
> *Erklärung:* Ein Arduino wird überall dort eingesetzt, wo etwas automatisch gesteuert werden soll (Ampel, Bewässerung, Nachtlicht).

---

## Lektion 2 — Das Arduino Uno Board (`das-arduino-uno-board`)

**1. Wofür sind die digitalen Pins (0 bis 13) auf dem Arduino Uno gedacht?**
- ✅ Für Ein/Aus-Anschlüsse wie LEDs, Taster und Buzzer
- Nur zum Messen von Temperatur und Licht
- Um das Board mit Strom zu versorgen
- Um das Programm vom Computer hochzuladen
> *Erklärung:* Die digitalen Pins sind Ein/Aus-Anschlüsse und werden für LEDs, Taster und Buzzer genutzt.

**2. Welche Aufgabe hat der ATmega328P auf dem Board?**
- ✅ Er ist der Mikrocontroller-Chip und führt als „Gehirn" dein Programm aus
- Er versorgt das Board mit 5V Strom
- Er verbindet das Board per USB mit dem Computer
- Er misst die Spannung von Sensoren
> *Erklärung:* Der ATmega328P ist der Mikrocontroller, das „Gehirn" des Boards.

**3. Warum musst du bei einem Stromkreis den GND-Anschluss anschließen?**
- ✅ Damit der Strom über GND zurückfließen kann und der Stromkreis geschlossen ist
- Weil GND das Programm neu startet
- Weil GND die Spannung von 5V auf 3.3V senkt
- Weil ohne GND das Programm nicht hochgeladen werden kann
> *Erklärung:* Jeder Stromkreis braucht Hin- und Rückweg: Der Strom fließt über GND zurück, sonst ist der Kreis nicht geschlossen.

**4. Welche Pins brauchst du, wenn du eine LED dimmen möchtest?**
- ✅ PWM-Pins (mit ~ markiert, z.B. 3, 5, 6, 9, 10, 11)
- Die analogen Pins A0 bis A5
- Den Reset-Button
- Die Strombuchse
> *Erklärung:* Nur die PWM-Pins (mit ~ markiert) können Zwischenwerte ausgeben und damit dimmen.

**5. An welche Art von Pin schließt du einen Lichtsensor an?**
- ✅ An einen analogen Pin (z.B. A0)
- An einen digitalen Pin (z.B. Pin 8)
- An den GND-Pin
- An den USB-Anschluss
> *Erklärung:* Ein Lichtsensor misst Werte und braucht einen analogen Pin wie A0.

**6. Wie sind die Löcher der mittleren 5er-Reihen auf dem Breadboard verbunden?**
- ✅ Immer 5 Löcher senkrecht in einer Spalte sind verbunden
- Die ganze Reihe waagerecht über die volle Länge ist verbunden
- Es sind gar keine Löcher miteinander verbunden
- Alle Löcher des Breadboards sind untereinander verbunden
> *Erklärung:* Im Mittelbereich sind jeweils 5 Löcher senkrecht (eine Spalte) verbunden; die Mittelrinne trennt obere und untere Hälfte.

---

## Lektion 3 — Strom, Spannung & Widerstand (`strom-spannung-und-widerstand`)

**1. Welche Einheit gehört zur elektrischen Spannung (U)?**
- ✅ Volt (V)
- Ampere (A)
- Ohm
- Watt
> *Erklärung:* Die Spannung wird in Volt (V) gemessen. Der Arduino liefert z.B. 5 V.

**2. In der Wasser-Analogie: Wofür steht der Widerstand (R)?**
- Für den Druck, mit dem das Wasser drückt
- ✅ Für eine enge Stelle im Rohr, die den Durchfluss bremst
- Für die Wassermenge, die pro Sekunde fließt
- Für die Länge des Rohrs
> *Erklärung:* Der Widerstand ist wie eine enge Stelle im Rohr: Je enger, desto weniger Strom fließt.

**3. Wie lautet das Ohmsche Gesetz?**
- I = U mal R
- ✅ I = U geteilt durch R
- I = R geteilt durch U
- I = U plus R
> *Erklärung:* Das Ohmsche Gesetz lautet I = U / R (Strom = Spannung geteilt durch Widerstand).

**4. An einem Widerstand von 250 Ω liegen 5 V an. Wie groß ist der Strom?**
- ✅ 0,02 A (20 mA)
- 2 A
- 50 mA
- 1250 mA
> *Erklärung:* Mit I = U / R ergibt sich 5 V / 250 Ω = 0,02 A = 20 mA.

**5. Was passiert mit dem Strom, wenn der Widerstand bei gleicher Spannung größer wird?**
- Der Strom wird größer
- ✅ Der Strom wird kleiner
- Der Strom bleibt genau gleich
- Der Strom hört ganz auf
> *Erklärung:* Großer Widerstand bedeutet kleiner Strom — eine engere Stelle lässt weniger durch.

**6. Warum braucht eine LED am Arduino einen Vorwiderstand?**
- Damit die LED heller leuchtet als ohne
- Damit die LED auch falsch herum leuchtet
- ✅ Weil sie sonst zu viel Strom zieht und durchbrennt
- Weil sie sonst zu wenig Spannung bekommt
> *Erklärung:* Ohne Vorwiderstand zieht die LED zu viel Strom und brennt durch; der Vorwiderstand begrenzt ihn.

---

## Lektion 4 — Die Arduino IDE & dein erstes Programm (`die-arduino-ide-und-dein-erstes-programm`)

**1. Was ist die Arduino IDE?**
- ✅ Das Programm auf dem Computer, in dem man den Code für den Arduino schreibt
- Ein Bauteil, das auf das Arduino-Board gesteckt wird
- Eine besondere LED, die auf dem Arduino eingebaut ist
- Ein Kabel, mit dem man den Arduino an den Strom anschließt
> *Erklärung:* Die IDE ist das Programm am Computer zum Code-Schreiben — wie ein Texteditor mit Superkräften, der den Code auch hochlädt.

**2. Welcher Button prüft, ob dein Code Fehler hat?**
- Hochladen (Upload)
- Serial Monitor
- ✅ Überprüfen (Verify)
- Port auswählen
> *Erklärung:* „Überprüfen" (Verify, Häkchen-Symbol) prüft den Code auf Fehler und kompiliert ihn.

**3. Was macht der Button „Hochladen" (Upload)?**
- Er speichert den Code nur auf dem Computer
- ✅ Er schickt den Code auf den Arduino
- Er zeigt Nachrichten vom Arduino an
- Er lädt die Arduino IDE aus dem Internet herunter
> *Erklärung:* „Hochladen" (Pfeil-Symbol) schickt den fertigen Code auf den Arduino.

**4. Warum braucht man für das erste Programm „Blink" kein zusätzliches Bauteil?**
- Weil Blink ganz ohne LED funktioniert
- ✅ Weil die LED an Pin 13 schon auf dem Board eingebaut ist
- Weil die IDE die LED auf dem Bildschirm anzeigt
- Weil der Arduino den Strom selbst erzeugt
> *Erklärung:* Beim Blink-Programm blinkt die bereits eingebaute LED an Pin 13 — kein Zusatzbauteil nötig.

**5. Was bewirkt die Zeile `pinMode(13, OUTPUT);` im Blink-Sketch?**
- Sie schaltet die LED sofort an
- ✅ Sie legt Pin 13 als Ausgang fest
- Sie lässt den Arduino 13 Sekunden warten
- Sie liest einen Wert von Pin 13 ein
> *Erklärung:* `pinMode(13, OUTPUT)` sagt dem Arduino, dass Pin 13 ein Ausgang ist.

**6. Im Blink-Programm steht zweimal `delay(1000);`. Was bedeutet das?**
- ✅ Der Arduino wartet jeweils 1000 Millisekunden, also 1 Sekunde
- Der Arduino blinkt 1000-mal hintereinander
- Pin 1000 wird eingeschaltet
- Die LED bekommt 1000 Volt
> *Erklärung:* `delay(1000)` wartet 1000 ms = 1 Sekunde — die LED bleibt je 1 Sekunde an und aus.

---

## Lektion 5 — setup() und loop() (`setup-und-loop`)

**1. Wie oft wird der Code in `setup()` ausgeführt?**
- ✅ Genau einmal beim Start
- Endlos immer wieder
- Gar nicht, er ist nur ein Kommentar
- Jedes Mal, wenn man einen Taster drückt
> *Erklärung:* `setup()` läuft einmal beim Start, um alles einzurichten.

**2. Was passiert mit dem Code in `loop()`?**
- ✅ Er wird endlos immer wiederholt
- Er wird nur einmal am Anfang ausgeführt
- Er läuft erst, wenn `setup()` fertig gelöscht ist
- Er wird vom Arduino ignoriert
> *Erklärung:* `loop()` ist das Hauptprogramm und wird endlos wiederholt.

**3. In welchen Bereich gehört der Befehl `pinMode(ledPin, OUTPUT)` am besten?**
- ✅ In `setup()`, weil das Pins einmalig einrichtet
- In `loop()`, weil es sich ständig wiederholen muss
- Ganz oben bei den Variablen
- In keinen Bereich, das ist ein Kommentar
> *Erklärung:* `pinMode()` richtet einen Pin ein — solche einmaligen Einrichtungen gehören in `setup()`.

**4. Wo im Sketch legst du Namen wie `int ledPin = 13;` fest?**
- ✅ Ganz oben bei den Variablen, vor `setup()`
- Mitten in `loop()`
- Direkt nach dem letzten Befehl in `setup()`
- Das darf man im Sketch gar nicht
> *Erklärung:* Variablen werden ganz oben (vor `setup()`) festgelegt, damit `setup()` und `loop()` sie nutzen können.

**5. In welcher Reihenfolge arbeitet der Arduino die Bereiche ab?**
- ✅ Variablen, dann `setup()`, dann `loop()` immer wieder
- `loop()`, dann `setup()`, dann Variablen
- `setup()`, dann Variablen, dann einmal `loop()`
- Erst `loop()` endlos, danach `setup()`
> *Erklärung:* Feste Reihenfolge: Variablen → `setup()` → `loop()` → `loop()` → …

**6. Wozu dienen Kommentare, die mit `//` beginnen?**
- ✅ Sie sind nur Notizen für dich; der Arduino ignoriert sie
- Sie schalten die LED ein
- Sie ersetzen das Semikolon am Befehlsende
- Sie sorgen dafür, dass `loop()` nur einmal läuft
> *Erklärung:* Der Arduino ignoriert `//`-Kommentare; sie sind nur als Erinnerung für dich gedacht.
