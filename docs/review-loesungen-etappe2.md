# Review: Lehrer-Lösungen Etappe 2 (20 Lektionen)

> **Zweck:** Inhaltliche Prüfung durch Marco, BEVOR die Daten in `db/solutions-data.mjs`
> + die Tabelle `public.lesson_solutions` geschrieben werden.
> Der Text hier ist exakt der finale DB-Inhalt (gerade Anführungszeichen, UTF-8).
>
> **Felder:** `sketch` (Arduino-Code) · `wiring` (Verdrahtung) · `mistakes` (typische Fehler) · `didactics` (Lehrer-Hinweise).
> Theorie-Lektionen (grundlagen) bekommen nur `didactics`.
>
> **Legende „Sketch im Schüler-Content":** JA = vollständiger Code steht schon in der Schüler-Lektion (Lehrer-Lösung = Komfort) · NEIN = echter Mehrwert.

---

## Übersicht

| Modul | Lektion | Felder | Sketch schon sichtbar? |
|---|---|---|---|
| grundlagen | was-ist-ein-arduino | didactics | — (Theorie) |
| grundlagen | das-arduino-uno-board | didactics | — (Theorie) |
| grundlagen | strom-spannung-und-widerstand | didactics | — (Theorie) |
| grundlagen | die-arduino-ide-und-dein-erstes-programm | didactics | — (Theorie) |
| grundlagen | setup-und-loop | didactics | — (Theorie) |
| digital | leds-ansteuern | alle 4 | JA |
| digital | wechselblinker | alle 4 | JA |
| digital | led-lauflicht | alle 4 | JA |
| digital | taster-als-eingabe | alle 4 | JA |
| digital | led-mit-taster-steuern | alle 4 | JA |
| digital | einfache-ampelschaltung | alle 4 | JA |
| analog | spannungsteiler-verstehen | wiring/mistakes/didactics | **reine Theorie, kein Sketch** |
| analog | analoge-eingaenge | alle 4 | JA |
| analog | pwm-dimmen-statt-schalten | alle 4 | JA |
| analog | lichtsensor-ldr | alle 4 | JA |
| analog | ntc-temperatursensor | alle 4 | JA |
| analog | entscheidungen-mit-sensorwerten | alle 4 | JA |
| aktoren | servomotor-ansteuern | alle 4 | JA |
| aktoren | transistor-als-schalter-grundlagen | alle 4 | JA |
| aktoren | dc-motor-mit-l298n | alle 4 | **NEIN (nur Rumpf im Content)** |

---

# Modul: grundlagen (Theorie — nur didactics)

## was-ist-ein-arduino

**didactics:**
- Häufigste Fehlvorstellung: "Arduino = kleiner Computer." Besser so erklären: Ein Arduino ist ein Mikrocontroller, der genau ein Programm dauerhaft ausführt, kein Betriebssystem, keine Multitasking-Fähigkeit. Die Vergleichstabelle Computer vs. Arduino an der Tafel gemeinsam füllen lassen.
- Analogie "Koch mit einem einzigen Rezept" aufgreifen und vom EVA-Prinzip her aufziehen: Eingabe (Sensor) -> Verarbeitung (Arduino entscheidet) -> Ausgabe (Aktor). Schüler:innen für 2-3 Alltagsgeräte selbst EVA-Ketten bilden lassen (Nachtlicht, Ampel, Bewässerung).
- Begriffe sauber trennen: Sensor = misst (LDR, NTC, Taster), Aktor = bewirkt etwas (LED, Motor, Servo). Diese Zuordnung wird in den Folgemodulen ständig gebraucht und ist prüfungsrelevant.
- Prüfungsbezug: Mikrocontroller, Sensor/Aktor, EVA-Prinzip und das Argument "Arduino macht eine Aufgabe zuverlässig statt vieler gleichzeitig" sind typische BW-Einstiegsfragen.
- Wenn ein echtes Board vorhanden ist: herumgehen lassen, Größe (Kreditkarte) und den ATmega-Chip als "Gehirn" zeigen — macht den Unterschied zum PC sofort begreifbar.

---

## das-arduino-uno-board

**didactics:**
- Mit einem echten Uno (oder dem SVG-Board) starten und die Bauteile zeigen lassen, bevor abstrakt geredet wird: USB-Buchse, Strombuchse, ATmega328P, Reset-Knopf, eingebaute LED an Pin 13, Power-LED.
- Pin-Typen klar abgrenzen — das ist der Kern: digitale Pins 0-13 (nur an/aus), analoge Pins A0-A5 (messen 0-5 V), PWM-Pins (mit ~ markiert: 3, 5, 6, 9, 10, 11, für Dimmen/Motorsteuerung). Typischer Fehler: A0-A5 für LEDs nehmen oder PWM mit "analogem Pin" verwechseln.
- Häufige Fehlvorstellung: "GND ist optional." Besser so erklären: Jeder Stromkreis braucht Hin- UND Rückweg. Wasserkreislauf-Analogie: ohne Abfluss fließt nichts. Vergessenes GND ist Schüler-Fehler Nr. 1 beim ersten Aufbau.
- Breadboard-Logik vor dem ersten Stecken klären: Stromschienen (+/-) laufen über die ganze Länge, die 5er-Reihen sind senkrecht je 5 Löcher verbunden, die Mittelrinne trennt oben/unten. LED-Beinchen IMMER in verschiedene Spalten, sonst Kurzschluss.
- Prüfungsbezug: Anzahl und Bezeichnung der Pins (14 digital 0-13, 6 analog A0-A5), Pin-Typ-Zuordnung zu Bauteilen und die Rolle von GND/5V werden abgefragt. "14 digital / 6 analog" als Faktenwissen festhalten.

---

## strom-spannung-und-widerstand

**didactics:**
- Häufigste Fehlvorstellung: "Spannung fließt" bzw. Strom und Spannung verwechselt. Besser mit der Wasser-Analogie: Spannung (U) = Druck, Strom (I) = fließende Wassermenge pro Zeit, Widerstand (R) = enge Stelle im Rohr. Es fließt der Strom, die Spannung treibt an.
- Ohmsches Gesetz I = U / R zentral einführen und das Umstellen üben: aus I = U/R wird R = U/I und U = R*I. Einheiten konsequent: 1 A = 1000 mA. Typischer Rechenfehler ist die A->mA-Umrechnung (0,02 A = 20 mA).
- Vorwiderstand-Rechnung Schritt für Schritt vorrechnen (prüfungsrelevant): R = (U_Quelle - U_LED) / I = (5 V - 2 V) / 0,015 A = 200 Ohm. Dann den nächstgrößeren Normwert 220 Ohm nehmen — daher der 220-Ohm-Standardwert in fast jeder LED-Schaltung.
- Begründen lassen, WARUM eine LED nie ohne Vorwiderstand an 5 V darf: ohne Strombegrenzung fließt zu viel Strom, die LED brennt durch. Die LED braucht ca. 2 V Flussspannung, der Widerstand "verbraucht" den Rest (3 V).
- LED-Polung praktisch zeigen: langes Bein = Anode (+, Richtung Pin/Widerstand), kurzes Bein = Kathode (-, Richtung GND). Merksatz für die Fehlersuche: "LED leuchtet nicht? Erst einmal umdrehen." Falsch herum geht sie meist nicht kaputt, sie sperrt nur.

---

## die-arduino-ide-und-dein-erstes-programm

**didactics:**
- Den Ablauf Schreiben -> Überprüfen (Verify/Kompilieren) -> Hochladen (Upload) sauber trennen: Verify prüft nur auf Fehler und übersetzt in Maschinensprache (kompilieren), Upload schickt das Ergebnis erst aufs Board. Begriffe Sketch, kompilieren, hochladen, Port/Board-Auswahl einführen.
- Mit Blink starten, weil die LED an Pin 13 fest verbaut ist — kein zusätzliches Bauteil nötig, schneller Erfolg. Code Zeile für Zeile: pinMode(13, OUTPUT), digitalWrite(13, HIGH/LOW) als an/aus (5 V / 0 V), delay(1000) als Warten in Millisekunden.
- Häufige Fehlvorstellung: "delay zählt in Sekunden." Besser: delay() arbeitet in Millisekunden, 1000 ms = 1 s, delay(500) = halbe Sekunde. Ebenso: HIGH = an = 5 V (Eselsbrücke: High = hohe Spannung), nicht "halbe Helligkeit".
- Wenn ein Board da ist, einmal live hochladen und die blinkende Onboard-LED zeigen — das macht "Code steuert echte Hardware" greifbar.
- Prüfungsbezug: pinMode/digitalWrite, der Unterschied OUTPUT/INPUT, die Bedeutung von HIGH/LOW und die Reihenfolge Anschließen -> Schreiben -> Überprüfen -> Hochladen sind typische BW-Bausteine. Den 220-Ohm-Vorwiderstand der externen LED mit der vorherigen Lektion verknüpfen.

---

## setup-und-loop

**didactics:**
- Kernunterscheidung zuerst sichern: setup() läuft genau EINMAL beim Start/Reset, loop() läuft danach ENDLOS wiederholt. Analogie Kochrezept: setup() = Ofen vorheizen (einmal), loop() = rühren/würzen (immer wieder).
- Häufige Fehlvorstellung: "setup() läuft auch immer wieder" oder "Reihenfolge ist egal." Besser: Was nur einmal passieren soll (pinMode, Serial.begin), gehört in setup(); was sich wiederholen soll (Sensor lesen, LED schalten), in loop(). Reset-Knopf = setup() startet neu.
- Die drei Bereiche eines Sketches benennen lassen: Variablen oben (z.B. int ledPin = 13; als "Namensschild" für den Pin), setup() für die Einrichtung, loop() fürs Hauptprogramm. Vorteil der Variable oben: Pin-Wechsel = nur eine Zeile ändern.
- Syntax-Disziplin: Jeder Befehl endet mit Semikolon (wie der Punkt am Satzende) — fehlt es, bricht die IDE mit "expected ';'" ab. Kommentare mit // erklären (werden vom Arduino ignoriert).
- Prüfungsbezug: Die Struktur eines Sketches (Begriff Sketch, setup() einmal / loop() endlos, Semikolon-Regel, Sinn von Variablen und Kommentaren) und das Lesen/Ordnen eines Blink-ähnlichen Programms sind typische BW-Aufgaben.

---

# Modul: digital (alle 4 Felder)

## leds-ansteuern · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// LED an Pin 8 ansteuern (Musterlösung: blinken im Sekundentakt)

int ledPin = 8;   // LED hängt an Pin 8 (Variable statt nackter Zahl = guter Stil)

void setup() {
  pinMode(ledPin, OUTPUT);   // Pin 8 als Ausgang festlegen, damit er Strom liefern kann
}

void loop() {
  digitalWrite(ledPin, HIGH);  // LED an (Pin auf 5 V)
  delay(1000);                 // 1 Sekunde warten (1000 ms)
  digitalWrite(ledPin, LOW);   // LED aus (Pin auf 0 V)
  delay(1000);                 // 1 Sekunde warten
}

// Variante "nur leuchten" (Praxis-Aufgabe): loop() enthält nur digitalWrite(ledPin, HIGH);
```

**wiring:**
LED an Pin 8: Vom Pin 8 geht ein Jumper zum 220-Ohm-Vorwiderstand. Der Widerstand liegt in Reihe zwischen Pin und LED-Anode — die Reihenfolge (Pin -> Widerstand -> Anode oder Pin -> Anode -> Widerstand -> GND) ist egal, Hauptsache der Widerstand sitzt im Stromkreis.
Anode = langes Bein der LED = Plus, zeigt Richtung Pin/Widerstand. Kathode = kurzes Bein = Minus, geht zur GND-Schiene.
Die Kathode per Jumper mit der gemeinsamen Minus-/GND-Schiene des Breadboards verbinden, diese Schiene per Jumper an einen GND-Pin des Arduino.
Eselsbrücke Polung: langes Bein = lang = Plus; Kathode hat ein K wie Kurz.

**mistakes:**
- Vorwiderstand vergessen: LED direkt am Pin überlastet die LED (und den Pin) — sie kann durchbrennen. Immer 220 Ohm in Reihe.
- LED-Polung vertauscht: kurzes Bein (Kathode) am Pin statt an GND — dann leuchtet sie gar nicht. Kaputt geht sie davon aber nicht, einfach umdrehen.
- pinMode() im setup() vergessen: ohne OUTPUT liefert der Pin keinen Strom, die LED bleibt dunkel.
- Pin im Code und gestecktes Kabel stimmen nicht überein: Code sagt Pin 8, Kabel steckt in Pin 7.
- INPUT statt OUTPUT gesetzt: Eingang kann keinen Strom liefern, LED bleibt aus.
- GND-Verbindung zum Arduino vergessen: Breadboard-Minus-Schiene hängt in der Luft, Stromkreis ist nicht geschlossen.

**didactics:**
- Prüfungsbezug: pinMode(pin, OUTPUT) und digitalWrite(pin, HIGH/LOW) sind die absoluten Grundbausteine der BW-Abschlussprüfung — sie tauchen in jeder digitalen Ausgabe-Aufgabe auf, oft kombiniert mit delay().
- Vorwiderstand und Polung an der Tafel als kleine Skizze festhalten (Pin -> 220 Ohm -> Anode (lang) -> Kathode (kurz) -> GND); Schüler:innen den Stromweg einmal mit dem Finger nachfahren lassen.
- Erst Hardware sauber aufbauen und mit der Dauer-AN-Variante testen (loop nur digitalWrite HIGH), dann das Blinken ergänzen — so trennt man Verdrahtungsfehler von Code-Fehlern.

---

## wechselblinker · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// Wechselblinker: zwei LEDs leuchten abwechselnd (wie ein Bahnübergang)

int led1 = 12;   // grüne LED an Pin 12
int led2 = 13;   // rote LED an Pin 13

void setup() {
  pinMode(led1, OUTPUT);   // beide Pins als Ausgang festlegen
  pinMode(led2, OUTPUT);
}

void loop() {
  // Schritt 1: LED 1 an, LED 2 aus
  digitalWrite(led1, HIGH);
  digitalWrite(led2, LOW);
  delay(1000);             // 1 Sekunde halten

  // Schritt 2: LED 1 aus, LED 2 an
  digitalWrite(led1, LOW);
  digitalWrite(led2, HIGH);
  delay(1000);             // 1 Sekunde halten
}
```

**wiring:**
Zwei identisch aufgebaute LED-Stränge: LED 1 (grün) an Pin 12, LED 2 (rot) an Pin 13.
Jede LED bekommt einen eigenen 220-Ohm-Vorwiderstand. Pro Strang: Pin -> 220 Ohm -> Anode (langes Bein) -> Kathode (kurzes Bein) -> GND-Schiene.
Beide Kathoden gehen auf dieselbe gemeinsame Minus-/GND-Schiene des Breadboards; diese Schiene per Jumper an einen GND-Pin des Arduino (ein gemeinsamer GND reicht für beide LEDs).

**mistakes:**
- Nur ein gemeinsamer Widerstand für beide LEDs: jede LED braucht ihren eigenen 220 Ohm, sonst leuchten sie unterschiedlich hell oder beeinflussen sich.
- Beide LEDs an denselben Pin gesteckt: dann blinken sie gleichzeitig statt abwechselnd; jede LED braucht ihren eigenen Pin (12 und 13).
- Polung einer LED vertauscht: ein Strang bleibt dunkel, der andere blinkt.
- delay() zwischen den beiden Schritten vergessen: der Wechsel passiert in Mikrosekunden, das Auge sieht beide LEDs scheinbar dauerhaft (schwach) leuchten.
- Sehr kleines delay (< 100 ms) als Stroboskop: im Unterricht bei >= 200 ms bleiben.

**didactics:**
- Prüfungsbezug: Der Sketch zeigt, dass mehrere Pins unabhängig mit digitalWrite() gesteuert werden — genau dieses parallele Schalten mehrerer Ausgänge ist Grundlage für Ampel- und Lauflicht-Aufgaben der Abschlussprüfung.
- Wichtiges Konzept sichtbar machen: Befehle laufen nacheinander (Mikrosekunden), erst delay() erzeugt eine sichtbare Pause. An der Tafel eine Zustandstabelle (Schritt | LED 1 | LED 2) führen lassen.
- Modular testen: zuerst beide LEDs einzeln mit Dauer-AN prüfen, dann den Wechsel-Code laden — und über das delay() (1000/500/250) das Tempo bewusst variieren lassen.

---

## led-lauflicht · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// LED-Lauflicht: 5 LEDs leuchten nacheinander auf (Knight Rider, hin und zurück)

int led1 = 8;    // 5 LEDs an Pin 8 bis 12
int led2 = 9;
int led3 = 10;
int led4 = 11;
int led5 = 12;
int wartezeit = 150;   // Geschwindigkeit in Millisekunden (kleiner = schneller)

void setup() {
  pinMode(led1, OUTPUT);   // alle 5 Pins als Ausgang
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  pinMode(led5, OUTPUT);
}

void loop() {
  // Vorwärts: 1 -> 2 -> 3 -> 4 -> 5
  digitalWrite(led1, HIGH); delay(wartezeit); digitalWrite(led1, LOW);
  digitalWrite(led2, HIGH); delay(wartezeit); digitalWrite(led2, LOW);
  digitalWrite(led3, HIGH); delay(wartezeit); digitalWrite(led3, LOW);
  digitalWrite(led4, HIGH); delay(wartezeit); digitalWrite(led4, LOW);
  digitalWrite(led5, HIGH); delay(wartezeit); digitalWrite(led5, LOW);

  // Rückwärts: 4 -> 3 -> 2 (LED 5 und LED 1 NICHT doppelt, sonst stockt es)
  digitalWrite(led4, HIGH); delay(wartezeit); digitalWrite(led4, LOW);
  digitalWrite(led3, HIGH); delay(wartezeit); digitalWrite(led3, LOW);
  digitalWrite(led2, HIGH); delay(wartezeit); digitalWrite(led2, LOW);
}

// Ausblick: Mit einer for-Schleife + Array (späteres Modul) schrumpft dieser Code
// auf wenige Zeilen — egal ob 5 oder 50 LEDs.
```

**wiring:**
Fünf identisch aufgebaute LED-Stränge an Pin 8, 9, 10, 11, 12 (am besten in fünf verschiedenen Farben, das macht die Laufrichtung sichtbar).
Pro LED: Pin -> eigener 220-Ohm-Vorwiderstand -> Anode (langes Bein) -> Kathode (kurzes Bein) -> gemeinsame Minus-/GND-Schiene.
Alle fünf Kathoden auf dieselbe GND-Schiene; diese einmal per Jumper an einen GND-Pin des Arduino. Ordentlich nebeneinander stecken (gleicher Spaltenabstand), damit die Bewegung als "Laufen" erkennbar ist.

**mistakes:**
- LEDs in falscher Pin-Reihenfolge gesteckt: Lauflicht springt unsortiert; Pin-Reihenfolge (8->12) muss zur physischen Reihenfolge passen.
- Ein Vorwiderstand statt fünf: einzelne LEDs leuchten schwächer oder gar nicht — jede LED braucht ihren eigenen 220 Ohm.
- Eine pinMode-Zeile vergessen: die betroffene LED bleibt dunkel, der Lauf hat eine "Lücke".
- LED am Ende nicht wieder auf LOW gesetzt: mehrere LEDs leuchten gleichzeitig statt nacheinander — das Muster "verschmiert".
- Beim Knight Rider LED 5 oder LED 1 im Rückweg doppelt geschaltet: das Lauflicht bleibt an den Enden kurz "hängen".

**didactics:**
- Prüfungsbezug: Der wiederholende, lange Code macht den Bedarf für die for-Schleife greifbar — Schleifen sind ein zentraler BW-Prüfungsbaustein. Hier bewusst zeigen "so geht es ohne", später "so kurz mit Schleife".
- Methodisch: zuerst Version 1 (eine Richtung) laden und verstehen, dann Version 2 (hin und zurück). Die Frage "warum im Rückweg ohne LED 5 und 1?" an der Tafel mit einer Zustandsskizze klären.
- wartezeit als eine Variable nutzen lassen (statt fünf einzelne delay-Zahlen): zeigt den Wert von benannten Konstanten — eine Stelle ändern, alles wird schneller/langsamer. Tempo 200 -> 50 ms ausprobieren.

---

## taster-als-eingabe · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// Taster als Eingabe: Zustand lesen und im Serial Monitor anzeigen

int tasterPin = 7;   // Taster an Pin 7
int zustand;         // hier speichern wir den gelesenen Wert (HIGH oder LOW)

void setup() {
  pinMode(tasterPin, INPUT_PULLUP);  // Eingang MIT internem Pull-up -> kein externer Widerstand nötig
  Serial.begin(9600);                // Serielle Verbindung starten, um Werte am PC anzuzeigen
}

void loop() {
  zustand = digitalRead(tasterPin);  // Pin 7 lesen
  Serial.println(zustand);           // Wert ausgeben: 1 = nicht gedrückt, 0 = gedrückt (Pull-up-Logik!)
  delay(100);                        // kurze Pause, damit der Monitor nicht überflutet wird
}
```

**wiring:**
Taster über die Mittelrinne des Breadboards stecken, sodass die zwei Beinpaare auf gegenüberliegenden Hälften liegen (so sind die intern verbundenen Beine getrennt).
Ein Bein des Tasters per Jumper an Pin 7 (Signal). Das diagonal gegenüberliegende Bein per Jumper an GND.
Dank INPUT_PULLUP ist KEIN externer Widerstand nötig — der interne Pull-up (ca. 20-50 kOhm) zieht den Pin auf HIGH, solange der Taster offen ist. Nur diese zwei Kabel.
Logik merken: nicht gedrückt -> HIGH (1), gedrückt -> LOW (0), weil der Taster den Pin im gedrückten Zustand mit GND verbindet.

**mistakes:**
- Taster nicht über die Mittelrinne, sondern längs gesteckt: die beiden gewählten Beine sind intern dauerhaft verbunden -> Pin liegt fest auf GND, scheint "immer gedrückt".
- Pull-up-Logik falsch verstanden: gedrückt = LOW (0), nicht HIGH. Wer HIGH = gedrückt erwartet, wundert sich über vertauschte Reaktion.
- INPUT_PULLUP vergessen (nur INPUT): Pin schwebt (floating) und liefert zufällige Werte — der Serial Monitor flackert zwischen 0 und 1.
- Serial.begin(9600) vergessen oder andere Baudrate im Monitor eingestellt: keine oder kryptische Ausgabe.
- Falsche Tasterbeine erwischt: die beiden benutzten Beine gehören zur selben internen Brücke -> Taster scheint wirkungslos.

**didactics:**
- Prüfungsbezug: digitalRead(pin) und INPUT_PULLUP sind die Eingabe-Grundbausteine der BW-Abschlussprüfung — Voraussetzung für jede taster-/sensorgesteuerte Aufgabe. Die invertierte Logik (gedrückt = LOW) bewusst thematisieren.
- Serial Monitor als Diagnose-Werkzeug etablieren: Schüler:innen sollen erst den Wert "sehen" (1 <-> 0 beim Drücken), bevor sie damit etwas steuern.
- Floating-Problem mit der Feder-Analogie (Schalter ohne Rückstellung = zufällig) erklären und an der Tafel eine kleine Wahrheitstabelle (Taster | Pin-Zustand | Wert) anlegen. Das Prellen (delay(50)) erst hier kurz ankündigen, vertiefen in der nächsten Lektion.

---

## led-mit-taster-steuern · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// LED mit Taster steuern, Version 1: solange gedrückt = LED an (if/else)

int tasterPin = 7;   // Taster an Pin 7 (Eingang)
int ledPin = 8;      // LED an Pin 8 (Ausgang)

void setup() {
  pinMode(tasterPin, INPUT_PULLUP);  // Taster mit internem Pull-up
  pinMode(ledPin, OUTPUT);           // LED als Ausgang
}

void loop() {
  int zustand = digitalRead(tasterPin);   // Taster lesen

  if (zustand == LOW) {          // LOW = gedrückt (wegen INPUT_PULLUP!); == ist Vergleich, nicht =
    digitalWrite(ledPin, HIGH);  // LED an
  } else {
    digitalWrite(ledPin, LOW);   // LED aus
  }
}

/* --- Version 2: Toggle (ein Druck an, nächster Druck aus, wie ein echter Lichtschalter) ---

int tasterPin = 7;
int ledPin = 8;
bool ledAn = false;           // merkt sich den LED-Zustand
bool letzterDruck = false;    // war der Taster im letzten Durchlauf schon gedrückt?

void setup() {
  pinMode(tasterPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  bool gedrueckt = (digitalRead(tasterPin) == LOW);

  if (gedrueckt && !letzterDruck) {   // nur bei NEUEM Druck reagieren (Flankenerkennung)
    ledAn = !ledAn;                   // Zustand umdrehen
    digitalWrite(ledPin, ledAn);
  }

  letzterDruck = gedrueckt;           // aktuellen Zustand für den nächsten Durchlauf merken
  delay(50);                          // entprellen (Bouncing abfangen)
}
*/
```

**wiring:**
Kombination aus den zwei vorigen Lektionen. Taster: ein Bein an Pin 7, das diagonal gegenüberliegende an GND — über die Mittelrinne gesteckt, dank INPUT_PULLUP kein externer Widerstand.
LED: Pin 8 -> 220-Ohm-Vorwiderstand -> Anode (langes Bein) -> Kathode (kurzes Bein) -> GND-Schiene.
Beide Bauteile teilen sich die gemeinsame GND-Schiene des Breadboards; diese einmal per Jumper an einen GND-Pin des Arduino. Stromweg: Taster gedrückt -> digitalRead(7) = LOW -> digitalWrite(8, HIGH) -> LED leuchtet.

**mistakes:**
- = statt == in der Bedingung: if (zustand = LOW) weist zu statt zu vergleichen — Bedingung ist quasi immer "wahr", LED reagiert falsch. Klassiker, gezielt thematisieren.
- Pull-up-Logik vertauscht: auf HIGH statt LOW geprüft -> LED leuchtet, wenn NICHT gedrückt wird.
- Toggle ohne letzterDruck (Flankenerkennung): die LED schaltet bei jedem loop()-Durchlauf (tausende/Sekunde) um -> wildes Flackern, solange man hält.
- delay(50) zum Entprellen weggelassen: ein Tastendruck wird durch Prellen als mehrere erkannt, der Toggle "springt" unkontrolliert.
- tasterPin und ledPin im Code vertauscht oder Kabel falsch gesteckt: Eingang/Ausgang verwechselt.

**didactics:**
- Prüfungsbezug: Hier verbinden sich die Kern-Prüfungsbausteine — digitalRead, if/else, digitalWrite, INPUT_PULLUP. Das Muster "Eingang abfragen -> Bedingung -> Ausgang schalten" ist das Grundgerüst fast jeder Steuerungs-Aufgabe der BW-Abschlussprüfung.
- Den Unterschied = (zuweisen) vs. == (vergleichen) explizit an der Tafel gegenüberstellen ("Mach die Tür auf!" vs. "Ist die Tür offen?") — das ist der häufigste Logikfehler.
- Stufenweise: erst Version 1 (gedrückt = an) stabil zum Laufen bringen, dann Version 2 (Toggle). Die Zustandstabelle (Taster jetzt | Taster vorher | Aktion) hilft, die Flankenerkennung zu verstehen — und das delay(50)-Entprellen durch Weglassen einmal bewusst "kaputt" zeigen.

---

## einfache-ampelschaltung · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// Einfache Ampelschaltung: deutsche Phasenfolge Rot -> Rot-Gelb -> Grün -> Gelb

int rotPin   = 2;   // rote LED an Pin 2
int gelbPin  = 3;   // gelbe LED an Pin 3
int gruenPin = 4;   // grüne LED an Pin 4

void setup() {
  pinMode(rotPin, OUTPUT);     // alle drei Pins als Ausgang
  pinMode(gelbPin, OUTPUT);
  pinMode(gruenPin, OUTPUT);
}

void loop() {
  // Phase 1: ROT (5 s)
  digitalWrite(rotPin, HIGH);
  digitalWrite(gelbPin, LOW);
  digitalWrite(gruenPin, LOW);
  delay(5000);

  // Phase 2: ROT + GELB (1 s)
  digitalWrite(rotPin, HIGH);
  digitalWrite(gelbPin, HIGH);
  digitalWrite(gruenPin, LOW);
  delay(1000);

  // Phase 3: GRÜN (5 s)
  digitalWrite(rotPin, LOW);
  digitalWrite(gelbPin, LOW);
  digitalWrite(gruenPin, HIGH);
  delay(5000);

  // Phase 4: GELB (2 s)
  digitalWrite(rotPin, LOW);
  digitalWrite(gelbPin, HIGH);
  digitalWrite(gruenPin, LOW);
  delay(2000);
}

/* --- Elegantere Variante mit eigener Hilfsfunktion (weniger Wiederholung) ---

int rotPin = 2, gelbPin = 3, gruenPin = 4;

// Eigene Funktion: Ampel auf einen Zustand schalten und Zeit halten
void ampelSchalten(bool rot, bool gelb, bool gruen, int dauer) {
  digitalWrite(rotPin, rot);
  digitalWrite(gelbPin, gelb);
  digitalWrite(gruenPin, gruen);
  delay(dauer);
}

void setup() {
  pinMode(rotPin, OUTPUT);
  pinMode(gelbPin, OUTPUT);
  pinMode(gruenPin, OUTPUT);
}

void loop() {
  ampelSchalten(true,  false, false, 5000);  // Rot
  ampelSchalten(true,  true,  false, 1000);  // Rot-Gelb
  ampelSchalten(false, false, true,  5000);  // Grün
  ampelSchalten(false, true,  false, 2000);  // Gelb
}
*/
```

**wiring:**
Drei LEDs wie eine echte Ampel anordnen: Rot oben (Pin 2), Gelb Mitte (Pin 3), Grün unten (Pin 4).
Pro LED: Pin -> eigener 220-Ohm-Vorwiderstand -> Anode (langes Bein) -> Kathode (kurzes Bein) -> gemeinsame Minus-/GND-Schiene.
Alle drei Kathoden auf dieselbe GND-Schiene; diese einmal per Jumper an einen GND-Pin des Arduino. Drei Vorwiderstände, einer pro LED.

**mistakes:**
- Ein gemeinsamer Vorwiderstand für alle drei LEDs: ungleiche Helligkeit; jede LED braucht ihren eigenen 220 Ohm.
- Phasen-Reihenfolge falsch: in Deutschland gilt Rot -> Rot-Gelb -> Grün -> Gelb. Wer Rot-Gelb weglässt oder hinter Grün setzt, baut eine falsche Ampel — prüfungsrelevanter Inhaltsfehler.
- In einer Phase die anderen LEDs nicht aktiv auf LOW gesetzt: vorherige LED leuchtet weiter, mehrere Lichter gleichzeitig (außer der gewollten Phase Rot-Gelb).
- LED-Polung einer Lampe vertauscht: eine Ampelfarbe bleibt dauerhaft dunkel.
- delay() in Millisekunden missverstanden: delay(5) statt delay(5000) — Phase blitzt nur kurz auf statt 5 Sekunden.
- Pin im Code und Steckplatz vertauscht (Rot/Gelb/Grün durcheinander): Reihenfolge der Farben stimmt nicht mit dem Code überein.

**didactics:**
- Prüfungsbezug: Diese Schaltung ist die Basis für das Prüfungsprojekt (Modul 5). Sie bündelt pinMode, digitalWrite, delay und die feste Ablauflogik — und lässt sich exakt um typische Prüfungserweiterungen ergänzen (Fußgänger-Taster mit digitalRead/if, Nachtmodus mit blinkendem Gelb, zweite Ampel für die Querstraße).
- Die deutsche Phasenfolge inkl. Rot-Gelb als Zustandstabelle (Phase | Rot | Gelb | Grün | Dauer) an der Tafel führen lassen, bevor codiert wird — Hardware und Code aus einer gemeinsamen Tabelle ableiten beugt Logikfehlern vor.
- Die Hilfsfunktion ampelSchalten() als didaktischen Höhepunkt nutzen: erst die lange, wiederholende Version verstehen, dann die kompakte Funktions-Version — das motiviert eigene Funktionen (Modularität) und bereitet auf wartbaren Code in der Prüfung vor.

---

# Modul: analog

## spannungsteiler-verstehen · *reine Theorie — kein Sketch*

> **Entscheidung des Entwurf-Agenten:** Diese Lektion ist im Quell-Inhalt rein konzeptionell/rechnerisch (Spannungsteiler-Formel, Praxis-Tab nur Multimeter-Messung, ausdrücklich "Kein Arduino-Code nötig"). `analogRead()` kommt erst in der Folgelektion. Daher: kein `sketch`, nur `wiring` (Mess-/Demo-Schaltung) + `mistakes` + `didactics`. **→ Marco: einverstanden, oder lieber gar keinen Lösungsblock für diese Lektion?**

**wiring:**
Fester Demo-Spannungsteiler als Reihenschaltung zwischen 5V und GND: 5V -> R1 (10-kOhm-Festwiderstand, oben) -> Mittelknoten (Abgriff U2) -> R2 (10-kOhm-Festwiderstand, unten) -> GND. Gemessen wird mit dem Multimeter (Gleichspannung, V=) zwischen dem Mittelknoten und GND: schwarze Messleitung an GND, rote an den Knoten zwischen R1 und R2. Erwartung bei zwei gleichen 10-kOhm-Widerständen: U2 ca. 2,5 V (die 5 V werden halbiert). Variante R2 = 20 kOhm -> U2 = 5 V * 20/(10+20) ca. 3,33 V; R1 = 20 kOhm (R2 = 10 kOhm) -> U2 ca. 1,67 V. Merkregel: U2 fällt immer über dem unteren Widerstand R2 ab. Der Arduino dient hier nur als 5-V-Quelle (USB anstecken). Dieser Mittelknoten ist genau der Punkt, an den in allen Folgelektionen A0 angeschlossen wird; statt eines festen R2 sitzt dort später der Sensor (LDR/NTC).

**mistakes:**
- R1 und R2 vertauscht (oben/unten): Bei zwei gleichen 10-kOhm-Widerständen fällt es nicht auf (immer 2,5 V) — erst im Vergleichsversuch mit 20 kOhm zeigt sich der Fehler.
- Multimeter nicht am Mittelknoten, sondern direkt an 5V (ca. 5 V) oder an GND (ca. 0 V) gemessen — sieht aus wie ein Schaltungsfehler, ist aber ein Messfehler.
- Multimeter auf Wechselspannung (V~) statt Gleichspannung (V=) -> Wert wackelt; auf Widerstandsmessung (Ohm) -> gar keine Spannung.
- Formel falsch herum: R1 (oberer Widerstand) in den Zähler gesetzt — das berechnet die Spannung über R1, nicht den Abgriff U2. Im Zähler steht immer der Widerstand, an dem abgegriffen wird (R2).
- Arduino nicht per USB versorgt -> kein Strom -> Multimeter zeigt 0 V.

**didactics:**
- Bewusst machen: Dies ist die rechnerische Vorstufe ohne Code. Das Ergebnis U2 wird erst in der nächsten Lektion über analogRead() (0-1023) in eine Zahl gewandelt — Brücke explizit benennen: 2,5 V -> ca. 512, 5 V -> 1023, 0 V -> 0.
- Der Spannungsteiler ist der RSAP-Kernbaustein: Dämmerungsschalter, Temperaturanzeige, Gewächshaus-Lüftung beruhen alle darauf. Wer das Verhältnis-Prinzip beherrscht, hat den halben Pflichtteil im Griff.
- Den Spezialfall "gleiche Widerstände -> halbe Spannung" als Schätzfrage drillen — kommt in der Prüfung häufig vor. Das Multimeter ist hier das Diagnose-Werkzeug, das später der Serial Monitor übernimmt.

---

## analoge-eingaenge · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// Potentiometer auslesen und im Serial Monitor anzeigen
// Spannungsteiler: 5V -> Poti -> GND, Mittelabgriff an A0

const int POTI_PIN = A0;   // Potentiometer-Mittelabgriff an A0
int sensorWert;            // Variable für den Messwert (0 bis 1023)

void setup() {
  Serial.begin(9600);      // Serielle Verbindung zum PC starten (9600 Baud)
  // Hinweis: analogRead braucht KEIN pinMode() -
  // analoge Pins sind automatisch Eingänge.
}

void loop() {
  sensorWert = analogRead(POTI_PIN);  // Spannung an A0 -> Zahl 0..1023

  Serial.print("Poti-Wert: ");
  Serial.println(sensorWert);         // Wert anzeigen (println = neue Zeile)

  // Optional: Umrechnung in Volt (Punkt bei 5.0 nicht vergessen!)
  float volt = sensorWert * 5.0 / 1023;
  Serial.print("Spannung: ");
  Serial.print(volt);
  Serial.println(" V");

  delay(200);                         // 5 Messungen pro Sekunde
}
```

**wiring:**
Potentiometer (10 kOhm) ist ein verstellbarer Spannungsteiler mit drei Beinen: linkes Bein an 5V, mittleres Bein (Schleifer/Abgriff) an A0, rechtes Bein an GND (5V und GND an den äußeren Beinen sind vertauschbar — das kehrt nur die Drehrichtung um). Der Mittelabgriff liefert eine stufenlose Spannung zwischen 0 V (ganz links) und 5 V (ganz rechts); A0 misst genau diese Spannung. Ergebnis: ganz links -> analogRead = 0, Mitte -> ca. 512, ganz rechts -> 1023. Kein Vorwiderstand und kein pinMode() nötig. USB anstecken, Serial Monitor mit 9600 Baud öffnen, dann am Poti drehen.

**mistakes:**
- Mittleres Bein (Abgriff) nicht an A0, sondern an 5V oder GND -> konstanter Wert (1023 bzw. 0), Drehen ändert nichts.
- digitalRead() statt analogRead() verwendet -> nur 0/1 statt 0-1023; analoger Verlauf geht verloren.
- Poti versehentlich an einen digitalen Pin (z. B. 2) statt an A0-A5 angeschlossen.
- pinMode(A0, INPUT) im setup geschrieben — überflüssig (schadet nicht, zeigt aber Missverständnis: analoge Pins sind automatisch Eingänge).
- Umrechnung in Volt mit ganzen Zahlen: wert * 5 / 1023 schneidet Nachkommastellen ab. Der Punkt bei 5.0 macht daraus eine Fließkommarechnung.
- Baudrate im Serial Monitor (z. B. 115200) passt nicht zu Serial.begin(9600) -> Kauderwelsch.

**didactics:**
- Zentrale Prüfungsunterscheidung verankern: analog = analogRead(), Pins A0-A5, Wertebereich 0-1023 (10-Bit-Wandler) — digital = digitalRead(), Pins 0-13, nur HIGH/LOW. Analogie Dimmer vs. Lichtschalter.
- Das Poti ist der ungefährliche Einstieg in den Spannungsteiler: Hier "dreht" der Schüler den Widerstand selbst — beim LDR/NTC dreht später die Umwelt. Diese Brücke explizit ziehen.
- Serial Monitor als Diagnose-Werkzeug: erst die echten Zahlen beim Drehen beobachten, bevor in der Folgelektion map() und Schwellenwerte darauf aufbauen. 512 als "Mitte = halbe Spannung" mit dem Spannungsteiler-Spezialfall der Vorlektion verknüpfen.

---

## pwm-dimmen-statt-schalten · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// LED-Helligkeit stufenlos mit Potentiometer steuern (PWM)
// Poti an A0 liefert 0..1023 -> map() -> analogWrite(0..255) dimmt LED

const int POTI_PIN = A0;   // Potentiometer-Abgriff an A0
const int LED_PIN  = 9;    // LED an PWM-Pin ~9 (nur ~3, ~5, ~6, ~9, ~10, ~11!)

void setup() {
  pinMode(LED_PIN, OUTPUT);   // LED-Pin als Ausgang
  Serial.begin(9600);         // Serial Monitor zum Kontrollieren
}

void loop() {
  int potiWert = analogRead(POTI_PIN);            // 0..1023 (10 Bit)
  int ledWert  = map(potiWert, 0, 1023, 0, 255);  // umrechnen auf 0..255 (8 Bit)

  analogWrite(LED_PIN, ledWert);                  // LED dimmen

  Serial.print("Poti: ");
  Serial.print(potiWert);
  Serial.print("  ->  LED: ");
  Serial.println(ledWert);

  delay(100);
}
```

**wiring:**
Zwei getrennte Teile auf einem Breadboard. Eingang: Potentiometer (10 kOhm) als Spannungsteiler — linkes Bein an 5V, Mittelabgriff an A0, rechtes Bein an GND. Ausgang: LED an PWM-Pin ~9 -> Anode (langes Bein) über 220-Ohm-Vorwiderstand zum Pin ~9, Kathode (kurzes Bein) an GND. Wichtig: Die LED muss an einem mit Tilde (~) markierten Pin hängen — an einem normalen Digitalpin (z. B. 8) macht analogWrite() nur ganz an/aus statt dimmen. analogWrite() braucht Werte 0-255 (0 = aus, 255 = voll), analogRead() liefert 0-1023 — deshalb die map()-Umrechnung.

**mistakes:**
- LED an einem Nicht-PWM-Pin (z. B. Pin 8, ohne ~) -> kein Dimmen, nur an/aus. PWM-Pins am Uno: ~3, ~5, ~6, ~9, ~10, ~11.
- map() vergessen und den rohen analogRead-Wert (0-1023) direkt an analogWrite() gegeben -> Werte über 255 werden zurückgefaltet (Modulo 256), die Helligkeit "springt" unsinnig.
- analogWrite-Wert größer als 255 (oder negativ) -> undefiniertes/überlaufendes Verhalten; Bereich ist fest 0-255.
- 220-Ohm-Vorwiderstand für die LED weggelassen -> LED wird überlastet und kann durchbrennen.
- LED falsch herum (Anode/Kathode vertauscht) -> leuchtet gar nicht; Kathode = kurzes Bein an GND.
- analogWrite() mit analogRead() verwechselt (schreiben vs. lesen) bzw. digitalWrite() benutzt -> nur HIGH/LOW, kein Dimmen.
- Argument-Reihenfolge von map() durcheinander: map(wert, vonMin, vonMax, zuMin, zuMax) — Quell- vor Zielbereich.

**didactics:**
- Den Doppel-Charakter klarmachen: analogRead() (Eingang, 0-1023, 10 Bit) vs. analogWrite() (Ausgang, 0-255, 8 Bit, nur PWM-Pins). PWM ist kein echtes Analog-Signal, sondern schnelles Ein-/Ausschalten (ca. 490 Hz) -> Auge nimmt Durchschnitt wahr.
- map() als "Währungsrechner" zwischen 0-1023 und 0-255 einführen — diese Umrechnung ist ein wiederkehrender Prüfungsbaustein. Über die Zielwerte experimentieren lassen (map(..., 0, 100) begrenzt die Maximalhelligkeit).
- Serial Monitor parallel zur LED laufen lassen: Schüler sehen Poti-Wert und LED-Wert gleichzeitig — macht die Kette Eingang->Verarbeitung->Ausgang greifbar. Brücke zur Prüfungsschaltung: dieselbe Kette LDR/NTC -> map -> Aktor steuert später Dimmen statt hartem Schalten.

---

## lichtsensor-ldr · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// Lichtsensor (LDR) auslesen und im Serial Monitor anzeigen
// LDR-Spannungsteiler: 5V -> LDR -> A0-Knoten -> 10 kOhm -> GND
// Hell = hoher Wert, dunkel = niedriger Wert

const int LDR_PIN = A0;   // LDR-Abgriff (Knoten) an A0
int ldrWert;              // Messwert 0..1023

void setup() {
  Serial.begin(9600);     // Serial Monitor starten - zum Kalibrieren!
}

void loop() {
  ldrWert = analogRead(LDR_PIN);   // Helligkeit als Zahl 0..1023

  Serial.print("Helligkeit: ");
  Serial.println(ldrWert);

  delay(300);                      // ca. 3 Messungen pro Sekunde
}
```

**wiring:**
LDR-Spannungsteiler: 5V -> LDR -> A0-Knoten -> 10-kOhm-Festwiderstand -> GND; A0 greift am Knoten zwischen LDR und Festwiderstand ab. Bei dieser Anordnung (LDR oben, 10 kOhm unten) gilt: hell -> LDR-Widerstand klein -> der meiste Spannungsabfall liegt über dem unteren 10 kOhm -> hoher A0-Wert (ca. 920); dunkel -> LDR-Widerstand groß (ca. 100 kOhm) -> niedriger A0-Wert (ca. 100). Der 10-kOhm-Festwiderstand ist kein Schutz-, sondern der Mess-Partner — ohne ihn lägen am A0 nur 0 V oder 5 V und es gäbe keinen Helligkeitsverlauf. Beine des LDR sind nicht gepolt. USB anstecken, Serial Monitor 9600 Baud.

**mistakes:**
- LDR und 10-kOhm-Widerstand im Spannungsteiler vertauscht -> Hell/Dunkel-Logik kehrt sich um (dann hell = niedriger Wert).
- A0 nicht am Mittelknoten abgegriffen, sondern direkt an 5V/GND -> konstanter Wert (1023 bzw. 0), reagiert nicht auf Licht.
- 10-kOhm-Festwiderstand ganz weggelassen -> kein Spannungsteiler; A0 "schwimmt" oder zeigt 5V, kein sinnvoller Helligkeitswert.
- Schwellenwert geraten statt mit Serial Monitor kalibriert — die typischen Werte (hell ca. 920, dunkel ca. 100) hängen stark von LDR und Raumlicht ab.
- digitalRead() statt analogRead() -> nur HIGH/LOW, der feine Helligkeitsverlauf geht verloren.

**didactics:**
- Bewusst machen: A0 reagiert auf die Spannung am Knoten — nicht direkt auf den Widerstand. Der Arduino kann keinen Widerstand messen, nur Spannung; deshalb der Spannungsteiler-Trick (Rückbezug zur Spannungsteiler-Lektion).
- Serial Monitor als Kalibrier-Werkzeug zwingend einsetzen: Schüler notieren ihre echten Hell-/Dunkel-Werte — diese Zahlen sind die Grundlage für den Schwellenwert in der Folgelektion. Kein Schwellenwert ohne vorherige Messung.
- Diese Lektion ist die direkte Vorstufe zur Prüfungsschaltung (LDR-Nachtabschaltung): hier nur Sensor auslesen, das Schalten der LED per if folgt in "Entscheidungen mit Sensorwerten".

---

## ntc-temperatursensor · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// NTC-Temperatursensor auslesen und im Serial Monitor beobachten
// Spannungsteiler: 5V -> 10 kOhm (fest, oben) -> A0-Knoten -> NTC (unten) -> GND
// Heißer Sensor = kleiner Zahlenwert

const int NTC_PIN = A0;   // Abgriff zwischen Festwiderstand und NTC an A0
int wert;                 // Messwert 0..1023

void setup() {
  Serial.begin(9600);     // Serielle Verbindung 9600 Baud - zum Kalibrieren
}

void loop() {
  wert = analogRead(NTC_PIN);   // Spannung am Knoten -> Zahl 0..1023
  Serial.println(wert);         // Wert ausgeben (eine Zeile pro Messung)
  delay(500);                   // halbe Sekunde Pause
}
```

**wiring:**
NTC-Spannungsteiler: 5V -> 10-kOhm-Festwiderstand (R1, oben) -> A0-Knoten -> NTC (R2, unten) -> GND; A0 greift am Knoten zwischen Festwiderstand und NTC ab. Auf die Reihenfolge achten: NTC sitzt unten gegen GND, der feste 10 kOhm oben gegen 5V. Bei dieser Anordnung gilt: kalt -> NTC-Widerstand hoch -> hoher A0-Wert (0 °C ca. 786); warm/heiß -> NTC-Widerstand niedrig -> niedriger A0-Wert (Zimmer 25 °C ca. 511, 50 °C ca. 270). Die NTC-Beine sind nicht gepolt. USB anstecken, Serial Monitor 9600 Baud öffnen, dann Finger auf den NTC legen -> Wert sinkt; loslassen -> Wert steigt nach einigen Sekunden zurück (thermische Trägheit ist normal).

**mistakes:**
- NTC und 10-kOhm-Festwiderstand vertauscht (NTC oben statt unten) -> Temperatur-Logik kehrt sich um: warm würde dann hoher Wert ergeben.
- A0 nicht am Mittelknoten, sondern an 5V -> konstant 1023; an GND -> konstant 0. Reagiert nicht auf Temperatur.
- Festwiderstand weggelassen oder Mittelpunkt-Kabel offen -> Pin "floatet", Wert wackelt wild.
- Schwellenwert geraten statt mit Serial Monitor kalibriert — Zimmertemperatur-Wert (ca. 480-540) je nach NTC-Modell und Raumtemperatur erst ablesen.
- PTC statt NTC verbaut (oder ein normaler Festwiderstand) -> Wert reagiert kaum/falsch herum auf Erwärmung.
- Merksatz falsch herum gemerkt: heiß = KLEINER Zahlenwert (nicht größer).

**didactics:**
- Kernmerksatz drillen: "Heißer Sensor, kleiner Zahlenwert." Ursache über den Spannungsteiler herleiten (NTC unten, R sinkt -> U2 sinkt -> analogRead sinkt) — nicht auswendig, sondern aus dem Prinzip der Vorlektion ableiten.
- NTC ist RSAP-Pflichtstoff und taucht in mehreren Pool-Aufgaben auf (Temperaturanzeige, Gewächshaus-Lüftung mit Servo, Lüfter-Steuerung) — alle starten mit "NTC im Spannungsteiler -> analogRead".
- Serial Monitor als Kalibrier-Werkzeug: erst Werte bei Zimmer- und Fingerwärme ablesen, dann in der Folgelektion mit if einen Schwellenwert darauf aufsetzen. Diese Kalibrier-Disziplin ist prüfungsrelevant.

---

## entscheidungen-mit-sensorwerten · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// Automatisches Nachtlicht mit Hysterese (zwei Schwellenwerte)
// LDR-Spannungsteiler an A0, LED an Pin 8 (digital, ein/aus)
// Dunkel = niedriger LDR-Wert -> LED an

const int LDR_PIN     = A0;   // LDR-Spannungsteiler an A0
const int LED_PIN     = 8;    // LED an digitalem Pin 8
const int SCHWELLE_AN  = 250; // LED an, wenn dunkler als 250
const int SCHWELLE_AUS = 350; // LED aus, wenn heller als 350
// Wichtig: AN-Schwelle < AUS-Schwelle -> Puffer-Zone gegen Flackern

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);                       // zum Kalibrieren der Schwellen
  Serial.println("Nachtlicht gestartet!");
}

void loop() {
  int helligkeit = analogRead(LDR_PIN);     // Lichtwert 0..1023

  if (helligkeit < SCHWELLE_AN) {
    digitalWrite(LED_PIN, HIGH);            // dunkel -> LED an
    Serial.print("DUNKEL -> LED AN  | Wert: ");
  }
  else if (helligkeit > SCHWELLE_AUS) {
    digitalWrite(LED_PIN, LOW);             // hell -> LED aus
    Serial.print("HELL   -> LED AUS | Wert: ");
  }
  else {
    // Puffer-Zone (250..350): Zustand bewusst NICHT ändern
    Serial.print("Puffer-Zone       | Wert: ");
  }

  Serial.println(helligkeit);
  delay(300);
}
```

**wiring:**
Zwei Teile. Sensor: LDR-Spannungsteiler 5V -> LDR -> A0-Knoten -> 10-kOhm-Festwiderstand -> GND (A0 am Mittelknoten) — dunkel = niedriger Wert, hell = hoher Wert. Aktor: LED an digitalem Pin 8 -> Anode (langes Bein) über 220-Ohm-Vorwiderstand zum Pin 8, Kathode (kurzes Bein) an GND. Hier wird die LED nur geschaltet (HIGH/LOW), also reicht ein normaler Digitalpin — kein PWM nötig. Vor dem Hochladen mit dem Serial Monitor (9600 Baud) die echten Hell-/Dunkel-Werte ablesen und SCHWELLE_AN/SCHWELLE_AUS daran anpassen.

**mistakes:**
- Nur ein Schwellenwert statt Hysterese -> LED flackert, wenn der LDR-Wert um die Schwelle schwankt (z. B. 298/302). Lösung: zwei Schwellen mit Puffer-Zone.
- Schwellen falsch herum: SCHWELLE_AN >= SCHWELLE_AUS gesetzt -> keine saubere Puffer-Zone, Logik kippt. Es muss gelten: AN-Schwelle < AUS-Schwelle.
- Vergleichsrichtung verwechselt: bei dieser Schaltung ist dunkel = NIEDRIGER Wert, also < SCHWELLE_AN für "LED an" — nicht >.
- Schwellenwerte aus dem Beispiel (250/350) blind übernommen statt mit Serial Monitor kalibriert.
- In der Puffer-Zone (else-Zweig) den LED-Zustand doch geändert -> Hysterese-Effekt zerstört.
- 220-Ohm-Vorwiderstand der LED weggelassen oder LED verpolt (Kathode = kurzes Bein an GND).
- analogRead (Sensor, 0-1023) und digitalWrite (LED, HIGH/LOW) verwechselt — Eingang lesen vs. Ausgang schreiben.

**didactics:**
- Hier schließt sich die Kette: analoger Eingang (analogRead, 0-1023) trifft per if/else if/else eine Entscheidung und steuert einen digitalen Ausgang (digitalWrite, HIGH/LOW). Diese Trennung analog-rein/digital-raus ist prüfungszentral.
- Hysterese als Profi-Konzept vermitteln (Thermostat-Analogie: unter 19 °C an, über 21 °C aus): zwei Schwellen + Puffer-Zone verhindern Flackern. Zeigt in der Prüfung Mitdenken und ist im Prüfungsprojekt (Ampel mit Nachtabschaltung) direkt verwertbar.
- Workflow festklopfen: erst Hardware bauen -> dann mit Serial Monitor echte Werte messen -> dann Schwellen festlegen -> zuletzt if-Logik schreiben. Diese Reihenfolge (Messen vor Programmieren) ist die Kernkompetenz für die RSAP-Sensor-Aufgaben. Diese Lektion ist die direkte Vollausbaustufe der LDR-Nachtabschaltung.

---

# Modul: aktoren

## servomotor-ansteuern · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// Servomotor ansteuern -- SG90-Servo bewegt sich endlos hin und her
// Pin 9 = Signal-Pin (orange/gelbes Kabel des Servos)

#include <Servo.h>      // Servo-Bibliothek einbinden (Pflicht ganz oben)

Servo meinServo;        // eigene Servo-Variable -- das ist UNSER Servo

void setup() {
  meinServo.attach(9);  // Servo hängt am Signal-Pin 9 (nur einmal nötig)
}

void loop() {
  meinServo.write(0);   // ganz nach links (0 Grad)
  delay(1000);          // 1 Sekunde stehen bleiben
  meinServo.write(180); // ganz nach rechts (180 Grad)
  delay(1000);          // 1 Sekunde stehen bleiben
}

// Variante "sanfter Sweep" (statt der zwei write() oben im loop):
//   for (int winkel = 0;   winkel <= 180; winkel++) { meinServo.write(winkel); delay(15); }
//   for (int winkel = 180; winkel >= 0;  winkel--) { meinServo.write(winkel); delay(15); }
// Die for-Schleife fährt alle Zwischenwinkel an -> flüssige Bewegung statt Sprung.
```

**wiring:**
SG90-Servo hat ein dreiadriges Kabel. Braun (oder schwarz) = Masse an einen GND-Pin des Arduino. Rot = Versorgung an 5V. Orange (oder gelb) = Signal an Pin 9. Die kleinen SG90 dürfen direkt am Arduino-5V hängen (USB-Strom reicht für einen Servo). Merkhilfe: das außenliegende Kabel ist immer das Signal, die Mitte immer Plus (rot). Über das Breadboard: rotes Servokabel auf die +Schiene, braunes auf die -Schiene, oranges zu Pin 9. Größere Servos oder mehrere Servos brauchen eine externe 5-V-Versorgung; deren Masse muss zwingend mit dem Arduino-GND verbunden werden (gemeinsame Masse). Niemals Plus (rot) mit dem Signal-Pin verwechseln — das kann den Arduino-Pin durchbrennen.

**mistakes:**
- Plus (rot) und Masse (braun) vertauscht -> Servo überhitzt, im schlimmsten Fall stirbt auch der Arduino-Pin.
- Signal-Kabel (orange) nicht oder am falschen Pin angeschlossen -> Servo brummt, bewegt sich aber nicht; prüfen ob wirklich an Pin 9 und ob im Code attach(9) steht.
- #include <Servo.h> vergessen -> Compiler-Fehler "Servo was not declared".
- Nur ein write() im loop() (zweiten vergessen) -> Servo zuckt einmal und steht dann still.
- Größeren Servo am Arduino-5V betrieben -> Arduino startet bei jeder Bewegung neu (Stromversorgung bricht ein); externe 5-V-Quelle mit gemeinsamer Masse nötig.
- Servo-Arm von Hand gedreht während er angesteuert wird -> beschädigt das Getriebe.
- Winkel > 180 in write() geschrieben -> Standard-SG90 fährt nur 0 bis 180 Grad.

**didactics:**
- Prüfungskern "Aktor ansteuern": Der Servo ist der Einstieg in bewegte Aktoren. Hier die saubere Pin-Zuordnung 5V/GND/Signal einüben — in RSAP-Pool-Aufgaben (Gewächshaus-Belüftung 0°/90°, Scheibenwischer 30°-150°, Kurvenlicht 60°-120°) wird dieses Grundgerüst nur um einen Sensor (NTC/Poti/Schalter) erweitert.
- Grundprinzip gemeinsame Masse: Sobald ein größerer/zweiter Servo extern versorgt wird, muss dessen GND mit dem Arduino-GND verbunden sein — sonst hat das Signal keinen Bezugspunkt. Dasselbe Prinzip wie später beim L298N.
- Konzept-Bruch benennen: Erstmals eine Library (#include), eine eigene Bauteil-Variable (Servo meinServo;) und neue Methoden (attach()/write()). attach() übernimmt das pinMode() automatisch — gut zum Kontrastieren mit der digitalWrite()-Welt des Transistors.

---

## transistor-als-schalter-grundlagen · *Sketch im Schüler-Content: JA*

**sketch:**
```cpp
// Transistor als Schalter -- DC-Motor 2 s an, 2 s aus
// BC547 (NPN) als Low-Side-Schalter, Basis über 1-kOhm-Widerstand an Pin 9
// motorPin steuert die BASIS des Transistors -- nicht den Motor direkt!

const int motorPin = 9;            // Pin an der Transistor-Basis (über 1 kOhm)

void setup() {
  pinMode(motorPin, OUTPUT);       // Pin 9 als Ausgang (sendet das Steuersignal)
}

void loop() {
  digitalWrite(motorPin, HIGH);    // 5 V -> Basisstrom -> Transistor leitet -> Motor an
  delay(2000);                     // 2 Sekunden laufen lassen
  digitalWrite(motorPin, LOW);     // 0 V -> kein Basisstrom -> Transistor sperrt -> Motor aus
  delay(2000);                     // 2 Sekunden Pause
}

// Plus-Variante Drehzahl (Pin 9 ist PWM-fähig):
//   analogWrite(motorPin, 128);   // halbe Drehzahl
//   analogWrite(motorPin, 255);   // volle Drehzahl
```

**wiring:**
BC547 mit der flachen (beschrifteten) Seite zum Betrachter, Beine nach unten: von links Collector (C) - Basis (B) - Emitter (E). Emitter an GND. Collector an ein Motorkabel; das andere Motorkabel an +5V (Low-Side-Schaltung: Motor zwischen +5V und Collector). Basis über einen 1-kOhm-Widerstand an Pin 9 — der Widerstand begrenzt den Basisstrom auf ca. 4 mA und schützt den Arduino-Pin. Parallel zum Motor kommt die Freilaufdiode 1N4148 (ersatzweise 1N4007): der Ring (Kathode) zeigt zur +5V-Seite, das andere Bein an die Collector-Seite. Im Normalbetrieb sperrt sie, beim Abschalten leitet sie die Spannungsspitze der Motorspule sicher ab. Bei größeren Motoren (> ca. 200 mA) externe 5-9-V-Versorgung anschließen und deren Masse mit dem Arduino-GND verbinden (gemeinsame Masse). Hinweis: Der BC547 ist nur bis ca. 100 mA belastbar; für stärkere Motoren BC337 oder TIP120 bei sonst gleicher Schaltung.

**mistakes:**
- Motor direkt an einen Arduino-Pin statt über den Transistor -> Pin zieht zu viel Strom (Motor 50-100 mA, Pin nur ca. 20 mA) und brennt durch.
- Basiswiderstand (1 kOhm) vergessen -> ungebremster Basisstrom killt den Pin; Motor zuckt nur.
- Freilaufdiode weggelassen -> Spannungsspitze der Spule beim Abschalten zerstört den Transistor; Motor knattert/dreht ruckelig.
- Diode falsch herum (Ring nicht zur +5V-Seite) -> kurzschließt die Versorgung, Motor läuft gar nicht, Transistor wird heiß.
- Collector und Emitter vertauscht -> Motor läuft dauernd, auch bei Pin LOW.
- Gemeinsame Masse zwischen externer Motorversorgung und Arduino-GND vergessen -> Steuersignal hat keinen Bezugspunkt.

**didactics:**
- Prüfungskern "Aktor ansteuern" / Transistorgrundschaltung: Hier wird das zentrale Argument aufgebaut — ein Arduino-Pin liefert nur ca. 20-40 mA, ein Motor braucht das Mehrfache, also übernimmt der Transistor das Schalten des großen Stroms aus einer separaten Quelle, der Pin steuert nur. Diese Begründung ist prüfungsrelevant und kehrt beim L298N wieder.
- Drei Bauteile zuordnen lassen: Transistor = Schalter, 1-kOhm-Widerstand = schützt den Pin (begrenzt Basisstrom), Freilaufdiode = schützt den Transistor (fängt Spannungsspitze der Spule). Die Diodenpolung (Ring zur +-Seite) ist der häufigste Fehler — als eigenen Prüfpunkt vor dem Einschalten etablieren.
- Software-Sicht entkoppelt von Hardware: Der Code ist identisch zur LED-Ansteuerung (digitalWrite HIGH/LOW). PWM hier nur als Plus-Box (analogWrite für Drehzahl). Wichtige Klarstellung: Laut BW-Skript wird der DC-Motor selbst mit dem L298N gesteuert, nicht mit Einzeltransistor; diese Lektion ist die Grundlage.

---

## dc-motor-mit-l298n · *Sketch im Schüler-Content: NEIN (nur Rumpf)*

> **Hinweis des Entwurf-Agenten:** Im Schüler-Content steht nur der `loop()`-Rumpf, kein zusammenhängender lauffähiger Komplett-Sketch. Der folgende setzt die Code-Schnipsel zu einem vollständigen Programm zusammen. Pin-Belegung aus der Quelle übernommen: ENA=10, IN1=9, IN2=8. **→ Marco: Pin-Belegung gegen euer Material gegenchecken.**

**sketch:**
```cpp
// DC-Motor mit L298N -- Richtung (IN1/IN2) + Drehzahl (ENA per PWM)
// Pin-Belegung laut BW-Skript: ENA = 10 (PWM, ~), IN1 = 9, IN2 = 8

int pinEn  = 10;   // zu ENA (Enable A) -- Drehzahl, muss PWM-Pin sein
int pinIN1 = 9;    // zu IN1           -- Drehrichtung (mit IN2)
int pinIN2 = 8;    // zu IN2           -- Drehrichtung (mit IN1)
int vmax   = 255;  // maximale Drehzahl (0..255)

void setup() {
  pinMode(pinEn,  OUTPUT);     // alle drei Steuer-Pins sind Ausgänge
  pinMode(pinIN1, OUTPUT);
  pinMode(pinIN2, OUTPUT);
}

void loop() {
  analogWrite(pinEn, vmax);    // volle Drehzahl
  digitalWrite(pinIN1, HIGH);  // Richtung 1 (vorwärts)
  digitalWrite(pinIN2, LOW);
  delay(5000);

  digitalWrite(pinIN1, LOW);   // Stopp (beide IN gleich -> Motor steht)
  digitalWrite(pinIN2, LOW);
  delay(2000);

  analogWrite(pinEn, vmax / 2); // halbe Drehzahl
  digitalWrite(pinIN1, LOW);    // Richtung 2 (rückwärts, IN1/IN2 vertauscht)
  digitalWrite(pinIN2, HIGH);
  delay(5000);

  digitalWrite(pinIN1, LOW);   // Stopp
  digitalWrite(pinIN2, LOW);
  delay(2000);
}
```

**wiring:**
Motor A an die Klemmen OUT1/OUT2 des L298N-Moduls. Die Motorspannung (laut Skript z.B. 6-12 V) kommt aus einer eigenen Quelle (Batterie/Netzteil) an den Versorgungseingang des Moduls — nicht aus dem Arduino. Zwingend: GND des L298N-Moduls mit dem GND des Arduino verbinden (gemeinsame Masse), sonst haben die Steuersignale keinen gemeinsamen Bezugspunkt. Steuerleitungen: ENA an Pin 10 (PWM-Pin mit ~, für die Drehzahl), IN1 an Pin 9, IN2 an Pin 8 (beide für die Drehrichtung). Falls am ENA-Eingang ein Jumper steckt, muss er entfernt werden, damit Pin 10 die Drehzahl per PWM regeln kann — bleibt der Jumper drauf, läuft der Motor immer mit voller Drehzahl. Im Inneren sitzt eine H-Brücke (vier Schalter), die den Strom in beide Richtungen durch den Motor schickt — daher Vorwärts/Rückwärts.

**mistakes:**
- GND von L298N-Modul und Arduino nicht verbunden -> häufigster Fehler bei externen Lasten: Steuersignale ohne gemeinsamen Bezugspunkt, Motor reagiert nicht.
- Motorspannung aus dem Arduino statt aus eigener Quelle ziehen wollen -> Arduino liefert nur ca. 20-40 mA, viel zu wenig für den Motor.
- ENA-Jumper auf dem Modul gelassen -> ENA liegt fest auf HIGH, keine Drehzahlregelung über analogWrite (Motor immer voll).
- ENA an einen Nicht-PWM-Pin gehängt -> analogWrite kann die Drehzahl nicht stufenlos regeln (Pin 10 hat ~, ist PWM-fähig).
- IN1 und IN2 gleich gesetzt (beide HIGH oder beide LOW) -> Motor dreht nicht; für Drehung müssen sie unterschiedlich sein.
- analogRead/pinMode(..., INPUT) am ENA statt analogWrite/OUTPUT -> Pin kann nichts ausgeben, Motor bleibt aus.

**didactics:**
- Prüfungskern "Aktor ansteuern": Im BW-Skript wird der Gleichstrommotor ausschließlich über den L298N gesteuert, nicht über einen Einzeltransistor. Der Treiber liefert, was der Arduino-Pin (ca. 20-40 mA) nicht kann: hohen Motorstrom (bis ca. 2 A) aus eigener Versorgung. Diese Begründung und die exakte Pin-Belegung (ENA=10, IN1=9, IN2=8) sollten sitzen.
- Grundprinzip gemeinsame Masse explizit machen: Modul-GND und Arduino-GND verbinden ist die Voraussetzung, dass kleine Steuersignale wirken — dasselbe Prinzip wie bei extern versorgten Servos und beim Transistor.
- Saubere Trennung Richtung vs. Drehzahl: IN1/IN2 (digitalWrite, müssen unterschiedlich sein) bestimmen die Richtung, ENA (analogWrite 0-255 am PWM-Pin) bestimmt die Drehzahl. Anknüpfen an die PWM-Lektion: 255 = dauerhaft an, 0 = aus, Zwischenwerte = mittlere Geschwindigkeit. Stopp = beide IN auf LOW oder ENA auf 0.
