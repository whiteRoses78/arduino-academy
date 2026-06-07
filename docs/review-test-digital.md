# Review: Kompetenztest-Fragen — Modul 2 (Digital)

**Stand:** 2026-06-07 — Entwurf zur Freigabe durch Marco
**Umfang:** 5 Lektionen × 8 MC-Fragen = 40 Fragen (LEDs ansteuern hat bereits einen Test mit 8 Fragen)
**Quelle:** je Lektion ein Subagent aus dem Supabase-Lektionsinhalt (`content.explanation`/`example`).

## Hinweise vor der Freigabe

- **Fakten-Check (Claude):** alle 40 fachlich geprüft — keine Fehler. Pin-Belegungen, `digitalWrite`/`digitalRead`, INPUT_PULLUP (gedrückt = LOW), Ampel-Phasen (Rot → Rot-Gelb → Grün → Gelb), `==` vs `=`, `bool`/`!`-Toggle, Knight-Rider-Rückweg stimmen.
- **Antwort-Positionen:** Bei „LED-Lauflicht", „Taster als Eingabe" und „LED mit Taster steuern" steht die richtige Antwort im Entwurf immer oben — in der **finalen Datei verteile ich die Positionen** (kein „immer A"). Die unten markierte richtige Antwort bleibt inhaltlich dieselbe.
- ✅ = richtige Antwort.

---

## Lektion 2.2 — Wechselblinker (`wechselblinker`)

**1. An welchen beiden Pins werden die LEDs beim Wechselblinker angeschlossen?**
- ✅ Pin 12 und Pin 13
- Pin 1 und Pin 2
- Pin 9 und Pin 10
- Pin 5 und Pin 6
> Im Code steht `int led1 = 12;` und `int led2 = 13;` — die grüne LED hängt an Pin 12, die rote an Pin 13.

**2. Was bedeutet „Wechselblinker" bei diesen zwei LEDs?**
- Beide LEDs leuchten immer gleichzeitig
- ✅ Immer eine LED ist an, die andere aus — dann umgekehrt
- Beide LEDs sind die ganze Zeit aus
- Die LEDs wechseln dauernd ihre Farbe
> Beim Wechselblinker ist in jedem Schritt eine LED an und die andere aus, danach tauschen sie — wie ein Polizeiauto.

**3. Welcher Befehl wird benutzt, um eine LED ein- oder auszuschalten?**
- pinMode()
- ✅ digitalWrite()
- delay()
- setup()
> Mit `digitalWrite(pin, HIGH)` wird die LED eingeschaltet und mit `digitalWrite(pin, LOW)` ausgeschaltet.

**4. Was bewirken die beiden Zeilen digitalWrite(led1, HIGH); und digitalWrite(led2, LOW); zusammen?**
- Beide LEDs gehen an
- Beide LEDs gehen aus
- ✅ LED 1 geht an, LED 2 geht aus
- LED 1 geht aus, LED 2 geht an
> HIGH schaltet LED 1 ein, LOW schaltet LED 2 aus — so leuchtet genau eine der beiden LEDs.

**5. Wofür wird der Befehl delay(1000) im Code gebraucht?**
- Er schaltet eine LED dauerhaft aus
- ✅ Er lässt den Arduino 1 Sekunde (1000 Millisekunden) warten
- Er macht die LED heller
- Er verbindet die LED mit Pin 1000
> `delay(1000)` bedeutet 1000 Millisekunden = 1 Sekunde warten, bevor der nächste Schritt kommt.

**6. Du willst, dass die LEDs schneller im Wechsel blinken. Was musst du im Code ändern?**
- ✅ Den delay()-Wert kleiner machen, z.B. delay(500)
- Den delay()-Wert größer machen, z.B. delay(2000)
- HIGH und LOW vertauschen
- Die Pin-Nummern erhöhen
> Ein kleinerer `delay()`-Wert bedeutet kürzere Pausen, dadurch wechseln die LEDs schneller — z.B. `delay(500)` für einen Warnblinker.

**7. Warum sieht es für unsere Augen so aus, als würden beide digitalWrite-Befehle gleichzeitig passieren, obwohl sie untereinander stehen?**
- Weil der Arduino beide Zeilen wirklich exakt gleichzeitig ausführt
- ✅ Weil der Arduino sie in winzigen Mikrosekunden nacheinander ausführt
- Weil eine LED kaputt ist
- Weil delay() die Befehle zusammenfasst
> Der Arduino führt die Befehle in Mikrosekunden nacheinander aus — so schnell, dass es für unsere Augen gleichzeitig wirkt.

**8. Welche Aufgabe haben die beiden pinMode()-Befehle im setup()?**
- Sie schalten die LEDs sofort an
- ✅ Sie legen fest, dass Pin 12 und Pin 13 als Ausgang (OUTPUT) arbeiten
- Sie bestimmen, wie lange die LEDs leuchten
- Sie verbinden die LEDs mit der GND-Schiene
> Mit `pinMode(led1, OUTPUT);` und `pinMode(led2, OUTPUT);` wird im setup() festgelegt, dass beide Pins als Ausgang arbeiten und LEDs steuern können.

---

## Lektion 2.3 — LED-Lauflicht (`led-lauflicht`)

**1. An welche Pins werden die 5 LEDs beim Lauflicht angeschlossen?**
- ✅ Pin 8, 9, 10, 11 und 12
- Pin 1, 2, 3, 4 und 5
- Pin 0, 5, 10, 15 und 20
- Pin A0, A1, A2, A3 und A4
> Laut Lektion werden die 5 LEDs an die digitalen Pins 8, 9, 10, 11 und 12 angeschlossen.

**2. Welches Bauteil braucht jede einzelne LED zusätzlich, damit sie nicht kaputtgeht?**
- ✅ Einen 220-Ohm-Widerstand
- Einen zweiten Arduino
- Einen Kondensator
- Einen Taster
> Jede LED bekommt einen eigenen 220-Ohm-Widerstand, fünf insgesamt.

**3. Wie ist jede LED in der Schaltung aufgebaut?**
- ✅ Pin → 220Ω → LED → GND
- GND → LED → Pin
- Pin → LED → Pin
- 220Ω → GND → LED → Pin
> Für alle 5 LEDs derselbe Weg: vom Pin über den 220-Ohm-Widerstand zur LED und dann zu GND (Masse).

**4. Welcher Befehl schaltet eine LED ein (zum Leuchten)?**
- ✅ digitalWrite(led1, HIGH);
- digitalWrite(led1, LOW);
- pinMode(led1, OUTPUT);
- delay(led1);
> `digitalWrite(led1, HIGH)` setzt den Pin auf HIGH und die LED leuchtet; LOW würde sie ausschalten.

**5. Wozu dient der Befehl delay(wartezeit); im Code?**
- ✅ Er macht eine kurze Pause, damit die LED eine Weile sichtbar leuchtet
- Er schaltet die LED dauerhaft aus
- Er legt fest, an welchem Pin die LED hängt
- Er macht die LED heller
> `delay(wartezeit)` hält das Programm kurz an, sodass jede LED eine Weile leuchtet, bevor die nächste drankommt.

**6. Was muss im setup für jede LED festgelegt werden?**
- ✅ pinMode(ledX, OUTPUT); — der Pin wird als Ausgang gesetzt
- pinMode(ledX, INPUT); — der Pin wird als Eingang gesetzt
- digitalWrite(ledX, HIGH); — die LED wird eingeschaltet
- delay(ledX); — eine Pause wird gesetzt
> Im setup wird jeder LED-Pin mit `pinMode(..., OUTPUT)` als Ausgang festgelegt, damit der Arduino Strom an die LED schicken kann.

**7. Beim Knight Rider (hin und zurück) — welche LEDs werden auf dem Rückweg ausgelassen?**
- ✅ LED 5 und LED 1
- LED 2 und LED 3
- LED 3 und LED 4
- Es wird keine ausgelassen
> Der Rückweg geht nur 4 → 3 → 2. LED 5 und LED 1 werden ausgelassen, damit die Bewegung flüssig bleibt.

**8. Was passiert, wenn du wartezeit von 200 auf 50 verkleinerst?**
- ✅ Das Lauflicht läuft schneller
- Das Lauflicht läuft langsamer
- Die LEDs leuchten heller
- Es leuchten mehr LEDs gleichzeitig
> `wartezeit` ist die Pause in Millisekunden. Eine kleinere Zahl bedeutet kürzere Pausen, also läuft das Lauflicht schneller.

---

## Lektion 2.4 — Taster als Eingabe (`taster-als-eingabe`)

**1. Welcher Befehl liest den Zustand eines Pins ein, also ob am Pin ein Signal anliegt?**
- ✅ digitalRead(pin)
- digitalWrite(pin, HIGH)
- pinMode(pin, OUTPUT)
- Serial.begin(9600)
> Mit `digitalRead(pin)` liest der Arduino den Zustand eines Pins aus und erkennt so, ob ein Taster gedrückt ist.

**2. Was bedeutet es, wenn digitalRead() den Wert HIGH zurückgibt?**
- ✅ Am Pin liegen 5 Volt an
- Am Pin liegen 0 Volt an
- Der Pin ist kaputt
- Der Arduino sendet gerade Daten
> HIGH bedeutet, dass am Pin 5 Volt anliegen, LOW bedeutet 0 Volt.

**3. Du nutzt INPUT_PULLUP. Welchen Wert misst der Arduino, wenn der Taster gedrückt wird?**
- ✅ LOW
- HIGH
- Mal HIGH, mal LOW
- 5 Volt
> Bei INPUT_PULLUP ist die Logik umgekehrt: gedrückt ergibt LOW, nicht gedrückt ergibt HIGH.

**4. Warum gibt ein schwebender (floating) Pin zufällige Werte aus?**
- ✅ Weil der Pin mit nichts verbunden ist und der Arduino nicht weiß, ob er HIGH oder LOW messen soll
- Weil der Taster zu schnell gedrückt wird
- Weil 5 Volt zu viel Strom sind
- Weil der Serial Monitor nicht geöffnet ist
> Ohne feste Verbindung hängt der Pin in der Luft, daher misst der Arduino zufällig mal HIGH und mal LOW.

**5. Wozu dient ein Pull-up-Widerstand bei einem Taster?**
- ✅ Er zieht den Pin auf HIGH (5V), solange der Taster nicht gedrückt ist
- Er zieht den Pin auf LOW (0V), solange der Taster nicht gedrückt ist
- Er macht die LED heller
- Er erhöht die Spannung auf 9 Volt
> Der Pull-up-Widerstand zieht den Pin auf HIGH und sorgt für eine sichere Grundstellung, wenn der Taster nicht gedrückt ist.

**6. Mit welchem Befehl aktivierst du den eingebauten Pull-up-Widerstand des Arduino?**
- ✅ pinMode(pin, INPUT_PULLUP)
- pinMode(pin, OUTPUT)
- pinMode(pin, INPUT)
- digitalRead(pin, PULLUP)
> Mit `pinMode(pin, INPUT_PULLUP)` schaltet der Arduino seinen eingebauten Pull-up-Widerstand ein, ein externer Widerstand ist dann nicht nötig.

**7. Wie wird der Taster bei der INPUT_PULLUP-Methode angeschlossen?**
- ✅ Zwischen Pin und GND, ohne externen Widerstand
- Zwischen Pin und 5V, mit externem Widerstand
- Nur an 5V
- Zwischen zwei verschiedenen GND-Anschlüssen
> Bei INPUT_PULLUP wird der Taster einfach zwischen Pin und GND angeschlossen, ein externer Widerstand ist nicht erforderlich.

**8. Was versteht man unter dem Prellen (Bouncing) eines Tasters?**
- ✅ Der Kontakt springt beim Drücken kurz hin und her, sodass ein Druck mehrfach erkannt wird
- Der Taster wird zu heiß und schaltet ab
- Die LED blinkt unkontrolliert
- Der Pin liefert dauerhaft 5 Volt
> Beim Prellen springt der Kontakt für wenige Millisekunden hin und her, dagegen hilft im Code ein `delay(50)`.

---

## Lektion 2.5 — LED mit Taster steuern (`led-mit-taster-steuern`)

**1. Welche Programmstruktur sorgt dafür, dass der Arduino eine Entscheidung treffen kann (Taster gedrückt oder nicht)?**
- ✅ Die if/else-Struktur
- Die pinMode-Funktion
- Die delay-Funktion
- Die digitalWrite-Funktion
> Mit if und else trifft der Arduino Entscheidungen: Ist die Bedingung wahr, läuft der if-Teil, sonst der else-Teil.

**2. Mit welchem Befehl liest der Arduino ein, ob der Taster gerade gedrückt ist?**
- ✅ digitalRead(tasterPin)
- digitalWrite(tasterPin, HIGH)
- pinMode(tasterPin, OUTPUT)
- delay(tasterPin)
> `digitalRead(tasterPin)` liest den Zustand des Eingangs-Pins ein und gibt zurück, ob dort HIGH oder LOW anliegt.

**3. Warum bedeutet bei dieser Schaltung LOW, dass der Taster gedrückt ist?**
- ✅ Weil INPUT_PULLUP den Pin auf HIGH zieht und der Druck ihn mit GND auf LOW verbindet
- Weil ein gedrückter Taster immer Strom liefert und HIGH erzeugt
- Weil digitalRead beim Drücken automatisch HIGH zurückgibt
- Weil die LED den Pin auf LOW zieht, sobald sie leuchtet
> INPUT_PULLUP zieht den Pin im Ruhezustand auf HIGH. Erst beim Drücken wird der Pin mit GND verbunden und damit LOW.

**4. Was passiert in Version 1, wenn die Bedingung if (zustand == LOW) wahr ist?**
- ✅ digitalWrite(ledPin, HIGH) schaltet die LED an
- digitalWrite(ledPin, LOW) schaltet die LED aus
- Der Taster wird auf OUTPUT gestellt
- Das Programm startet neu von vorne
> Ist `zustand == LOW` (Taster gedrückt), wird der if-Teil ausgeführt und `digitalWrite(ledPin, HIGH)` schaltet die LED an.

**5. Was ist der häufigste Anfänger-Fehler, vor dem die Lektion warnt?**
- ✅ = (Zuweisung) mit == (Vergleich) zu verwechseln
- HIGH mit LOW zu verwechseln
- setup mit loop zu verwechseln
- int mit bool zu verwechseln
> `==` vergleicht zwei Werte, `=` setzt einen Wert. Schreibt man `if (zustand = LOW)`, wird der Wert gesetzt und die Bedingung ist immer wahr.

**6. Welche zwei Werte kann ein Datentyp bool annehmen?**
- ✅ true oder false
- HIGH oder LOW
- 0 bis 255
- an, aus oder unbekannt
> `bool` kann nur true (wahr) oder false (falsch) sein, also genau zwei Werte.

**7. Was bewirkt das Ausrufezeichen ! bei einem bool-Wert, z.B. in ledAn = !ledAn?**
- ✅ Es dreht den Wert um: aus true wird false und umgekehrt
- Es verdoppelt den Wert
- Es löscht die Variable komplett
- Es macht aus dem bool eine Zahl
> Das `!` kehrt den bool-Wert um. War `ledAn` vorher false, wird es true und umgekehrt — so entsteht der Toggle-Effekt.

**8. Wozu dient die Variable letzterDruck im Toggle-Programm?**
- ✅ Sie merkt sich, ob der Taster im letzten Durchlauf schon gedrückt war, damit nur bei einem NEUEN Druck umgeschaltet wird
- Sie zählt, wie oft die LED insgesamt geleuchtet hat
- Sie speichert, an welchem Pin der Taster angeschlossen ist
- Sie misst, wie lange der Taster gedrückt gehalten wird
> `letzterDruck` speichert den Tasterzustand vom vorherigen Durchlauf. So wird nur einmal umgeschaltet, auch wenn man den Taster gedrückt hält.

---

## Lektion 2.6 — Einfache Ampelschaltung (`einfache-ampelschaltung`)

**1. An welche Pins werden die drei LEDs der Ampelschaltung angeschlossen?**
- ✅ Rot an Pin 2, Gelb an Pin 3, Grün an Pin 4
- Rot an Pin 1, Gelb an Pin 2, Grün an Pin 3
- Alle drei LEDs an Pin 13
- Rot an Pin 4, Gelb an Pin 3, Grün an Pin 2
> Laut Lektion liegt die rote LED an Pin 2, die gelbe an Pin 3 und die grüne an Pin 4.

**2. In welcher Reihenfolge durchläuft die deutsche Ampel ihre vier Phasen?**
- Rot → Grün → Gelb → Rot-Gelb
- ✅ Rot → Rot-Gelb → Grün → Gelb
- Grün → Gelb → Rot → Rot-Gelb
- Rot → Gelb → Grün → Rot-Gelb
> Die deutsche Ampel folgt dem Ablauf Rot, dann Rot-Gelb, dann Grün und schließlich Gelb, bevor es wieder von vorne beginnt.

**3. Welche Ampelphase gibt es laut Lektion vor allem in Deutschland und nur in wenigen anderen Ländern?**
- ✅ Die Phase Rot-Gelb
- Die Phase nur Gelb
- Die Phase nur Grün
- Die Phase nur Rot
> In vielen Ländern springt die Ampel direkt von Rot auf Grün. Die Phase Rot-Gelb ist eine deutsche Besonderheit.

**4. Wie lange dauert die Grün-Phase in der Ampelschaltung der Lektion?**
- 1 Sekunde
- 2 Sekunden
- ✅ 5 Sekunden
- 10 Sekunden
> Laut Phasentabelle und Code (`delay(5000)`) leuchtet Grün 5 Sekunden lang.

**5. Mit welchem Befehl schaltest du eine bestimmte LED an einem Pin ein?**
- pinMode(rotPin, OUTPUT)
- delay(rotPin)
- ✅ digitalWrite(rotPin, HIGH)
- digitalWrite(rotPin, LOW)
> `digitalWrite(pin, HIGH)` schaltet den Pin auf AN. Mit LOW würde die LED ausgeschaltet.

**6. Wofür sorgt der Befehl delay(1000) im Ampel-Code?**
- ✅ Der Arduino wartet 1 Sekunde
- Der Arduino wartet 1000 Sekunden
- Der Arduino schaltet alle LEDs auf einmal an
- Der Arduino startet das Programm neu
> `delay(millisekunden)` hält das Programm an. 1000 Millisekunden sind genau 1 Sekunde.

**7. Was ist laut Lektion der Nachteil von delay()?**
- delay() macht die LEDs dunkler
- ✅ Während delay() läuft, kann der Arduino nichts anderes tun
- delay() funktioniert nur mit roten LEDs
- delay() verbraucht zu viel Strom
> Während `delay()` läuft, ist der Arduino sozusagen eingefroren und kann nichts anderes erledigen. Für komplexere Projekte lernt man später `millis()`.

**8. Warum lohnt es sich, eine eigene Funktion wie ampelSchalten() zu verwenden?**
- Damit die LEDs heller leuchten
- Damit der Arduino schneller hochfährt
- Weil man dann keine Widerstände mehr braucht
- ✅ Weil der Code kürzer und übersichtlicher wird und Änderungen nur an einer Stelle nötig sind
> Die Hilfsfunktion fasst die wiederkehrenden Befehle zusammen. Der Code wird kürzer und lesbarer, und Änderungen muss man nur an einer Stelle vornehmen.
