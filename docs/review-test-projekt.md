# Review Kompetenztest — Modul "projekt"

3 Lektionen, 24 Fragen. Richtige Antwort ist mit **✅** markiert.

> Insert in die Prod-DB = sofort live fuer Schueler. Erst nach Marcos Freigabe einspielen.

## ampel-mit-fussgaengerueberweg  (8 Fragen)

**1. An welchem Pin ist in dieser Lektion die gruene LED der Auto-Ampel angeschlossen?**

- A) Pin 4 **✅**
- B) Pin 6
- C) Pin 2
- D) Pin 7

_Erklaerung:_ Laut Pin-Belegung sitzt die gruene Auto-LED an Pin 4 (autoGruen = 4). Pin 2 ist Auto-Rot, Pin 6 ist die gruene Fussgaenger-LED und Pin 7 der Taster - die sind hier falsch.

**2. Wie ist der Taster in dieser Schaltung angeschlossen?**

- A) An Pin 7 mit einem externen 220-Ohm-Widerstand
- B) Zwischen Pin 7 und GND, mit INPUT_PULLUP (kein externer Widerstand) **✅**
- C) An Pin 5 zusammen mit der Fussgaenger-LED
- D) An Pin 7 und dem Plus-Pol (5V)

_Erklaerung:_ Der Taster liegt zwischen Pin 7 und GND und nutzt INPUT_PULLUP, deshalb braucht er keinen externen Widerstand. Ein 220-Ohm-Widerstand gehoert nur zu den LEDs, und an 5V statt GND wuerde die Pull-Up-Logik nicht funktionieren.

**3. Wie erkennt der Code mit INPUT_PULLUP, dass der Taster gedrueckt wurde?**

- A) digitalRead(taster) == HIGH
- B) digitalWrite(taster, HIGH)
- C) digitalRead(taster) == LOW **✅**
- D) analogRead(taster) > 500

_Erklaerung:_ Bei INPUT_PULLUP gilt: gedrueckt = LOW, nicht gedrueckt = HIGH - deshalb prueft der Code auf == LOW. HIGH waere genau der nicht gedrueckte Zustand, digitalWrite ist zum Schreiben (nicht Lesen) und analogRead passt nicht zu einem digitalen Taster.

**4. Was passiert direkt nachdem ein Fussgaenger den Taster drueckt?**

- A) Die Fussgaenger-Ampel wird sofort gruen
- B) Alle LEDs gehen kurz aus
- C) Die Auto-Ampel springt sofort von Gruen auf Rot
- D) Die Auto-Ampel wechselt zuerst auf Gelb (2 Sekunden), dann auf Rot **✅**

_Erklaerung:_ Phase 1 schaltet Auto-Gruen aus und Auto-Gelb fuer 2 Sekunden an, erst danach Rot - genau wie an einer echten Ampel. Sofort gruen oder ein direkter Sprung auf Rot ueberspringt die noetige Gelb-Phase.

**5. Wie lange leuchtet die Fussgaenger-Ampel gruen, bevor sie zu blinken beginnt?**

- A) 5 Sekunden **✅**
- B) 1 Sekunde
- C) 2 Sekunden
- D) 400 Millisekunden

_Erklaerung:_ In Phase 2 steht delay(5000), also 5 Sekunden Gruen. 2 Sekunden ist die Gelb-Phase des Autos, 1 Sekunde die Raeumzeit und 400 ms ist die Blink-Pause - das sind andere Zeiten im Code.

**6. Wofuer wird in dieser Lektion die for-Schleife eingesetzt?**

- A) Um die Auto-Ampel dauerhaft gruen zu halten
- B) Um die gruene Fussgaenger-LED 3-mal blinken zu lassen (Warnung) **✅**
- C) Um den Taster zu entprellen
- D) Um alle Pins im setup als OUTPUT zu definieren

_Erklaerung:_ Die for-Schleife (i = 0; i < 3; i++) laesst die Fussgaenger-Gruen-LED 3-mal blinken, als Warnung vor Rot. Das Entprellen macht ein einzelnes delay(200), und die pinMode-Befehle stehen ohne Schleife im setup.

**7. Wie wechselt die Auto-Ampel am Ende von Rot zurueck auf Gruen?**

- A) Direkt von Rot auf Gruen ohne Zwischenschritt
- B) Erst Gelb allein, dann Gruen
- C) Rot und Gelb leuchten gleichzeitig (1 Sekunde), dann Gruen **✅**
- D) Erst aus, dann blinkt sie 3-mal, dann Gruen

_Erklaerung:_ In Phase 4 bleibt Rot an und Gelb wird dazugeschaltet (Rot-Gelb fuer 1 Sekunde), danach Gruen - so wie eine echte deutsche Ampel. Ein direkter Sprung oder nur Gelb allein entspricht nicht dem Code; das Blinken gehoert zur Fussgaenger-LED.

**8. Warum gibt es zwischen Auto-Rot und Fussgaenger-Gruen eine Pause von etwa 1 Sekunde (delay(1000))?**

- A) Damit der Arduino Zeit zum Neustarten hat
- B) Damit die rote LED nicht ueberhitzt
- C) Weil der Taster sonst doppelt ausloest
- D) Als Raeumzeit, damit fahrende Autos die Kreuzung noch verlassen koennen **✅**

_Erklaerung:_ Die 1 Sekunde ist die Raeumzeit: Autos, die noch unterwegs sind, sollen die Kreuzung verlassen, bevor Fussgaenger gruen bekommen. Mit Neustart, Tastenprellen oder Ueberhitzung hat dieses delay nichts zu tun.

## nachtabschaltung-mit-lichtsensor  (8 Fragen)

**1. Wie ist der LDR in dieser Lektion als Spannungsteiler geschaltet?**

- A) 5V -> LDR -> Pin A0 -> 10-kOhm-Widerstand -> GND **✅**
- B) GND -> LDR -> Pin A0 -> 10-kOhm-Widerstand -> 5V
- C) 5V -> 10-kOhm-Widerstand -> Pin A0 -> LDR -> 5V
- D) Pin A0 -> LDR -> 5V, ohne weiteren Widerstand

_Erklaerung:_ In der Lektion sitzt der LDR oben an 5V, danach kommt der Abgriff an A0 und ein 10-kOhm-Widerstand nach GND. Die anderen Varianten vertauschen 5V/GND oder lassen den Festwiderstand weg, dann funktioniert der Spannungsteiler nicht.

**2. Es ist sehr hell. Welchen analogRead(A0)-Wert misst der Arduino laut Lektion ungefaehr?**

- A) Einen niedrigen Wert (z.B. 50-200)
- B) Einen hohen Wert (z.B. 800-1000) **✅**
- C) Genau 0, weil der LDR den Strom sperrt
- D) Immer genau 300, den Schwellenwert

_Erklaerung:_ In dieser Schaltung gilt: hell = hoher Wert. Bei viel Licht hat der LDR wenig Widerstand, deshalb misst A0 einen hohen Wert (800-1000). Niedrige Werte gehoeren zur Dunkelheit, 0 oder 300 sind erfundene Festwerte.

**3. Was macht die Nachtabschaltung in dieser Lektion genau?**

- A) Sie schaltet die Ampel bei Helligkeit EIN und bei Dunkelheit AUS
- B) Sie dimmt die LEDs je nach Helligkeit stufenlos
- C) Sie laesst die Ampel nur bei Dunkelheit laufen und schaltet bei Helligkeit alle LEDs aus **✅**
- D) Sie schaltet bei Dunkelheit ein zusaetzliches Nachtlicht ein

_Erklaerung:_ Laut Lektion ist die Ampel nur aktiv, wenn es dunkel genug ist; bei Helligkeit schlaeft sie und alle LEDs gehen aus. Das ist genau umgekehrt zur Strassenlaterne und hat nichts mit Dimmen oder einem extra Nachtlicht zu tun.

**4. Im Code steht: if (lichtWert <= SCHWELLE) { ... }. Wann wird dieser Block ausgefuehrt?**

- A) Wenn es hell ist, dann schlaeft die Ampel
- B) Wenn lichtWert genau 1023 betraegt
- C) Wenn der Taster gedrueckt wird
- D) Wenn es dunkel ist, dann ist die Ampel aktiv **✅**

_Erklaerung:_ Ein kleiner Lichtwert bedeutet Dunkelheit; lichtWert <= SCHWELLE ist also der Dunkel-Fall, in dem die Ampel normal laeuft. Der else-Zweig gehoert zu hell, 1023 waere sehr hell, und der Taster wird erst innerhalb des Dunkel-Blocks geprueft.

**5. In der Kalibrierung misst du: Raumlicht 750, Hand drueber (dunkel) 80. Welcher Schwellenwert ist laut Lektion sinnvoll?**

- A) 300, also zwischen beiden Werten **✅**
- B) 1000, also ueber beiden Werten
- C) 50, also unter beiden Werten
- D) Der Schwellenwert ist egal, jeder Wert funktioniert

_Erklaerung:_ Ein guter Schwellenwert liegt zwischen Hell- und Dunkelwert, in der Lektion 300. Liegt er ueber oder unter beiden Werten, kann die Schaltung Hell und Dunkel nicht mehr unterscheiden; egal ist er also nicht.

**6. An welchem Pin wird der LDR ausgelesen und warum gerade dort?**

- A) An Pin 13, weil dort die eingebaute LED sitzt
- B) An Pin A0, weil das ein analoger Eingang ist und Werte von 0 bis 1023 messen kann **✅**
- C) An GND, weil der LDR mit Masse verbunden ist
- D) An 5V, weil der LDR dort den Strom bekommt

_Erklaerung:_ Der LDR-Abgriff haengt an A0, einem analogen Eingang, der fein abgestufte Werte von 0 bis 1023 liefert. GND und 5V sind nur Versorgungsanschluesse, und Pin 13 ist ein digitaler Pin fuer die Onboard-LED.

**7. Womit liest man die LDR-Werte zum Kalibrieren aus, bevor man den Schwellenwert festlegt?**

- A) Mit einem zweiten Arduino als Messgeraet
- B) Mit einem Lineal am Steckbrett
- C) Mit dem Serial Monitor in der Arduino IDE **✅**
- D) Mit der eingebauten LED an Pin 13

_Erklaerung:_ Die Lektion laesst analogRead(A0) per Serial.println ausgeben und im Serial Monitor ablesen, um Hell- und Dunkelwert zu notieren. Die anderen Optionen koennen keine Zahlenwerte des Sensors anzeigen.

**8. Warum betont die Lektion, dass jeder den Schwellenwert an seinem eigenen Aufbau neu einstellen muss?**

- A) Weil sich der Arduino jeden Tag anders verhaelt
- B) Weil der Serial Monitor falsche Werte anzeigt
- C) Weil 300 nur fuer die eingebaute LED gilt
- D) Weil die LDR-Werte bei jedem Aufbau und Raum etwas anders sind **✅**

_Erklaerung:_ Laut Warnhinweis haengen die LDR-Werte von Bauteil und Umgebungslicht ab, deshalb kann der passende Schwellenwert bei dir 200, bei anderen 400 sein. Der Serial Monitor zeigt korrekte Werte, und 300 hat nichts mit der Onboard-LED zu tun.

## pruefungsschaltung-komplett  (8 Fragen)

**1. Welche Anforderung muss eine Schaltung laut Lektion erfuellen, damit sie fuer die Realschulabschlusspruefung Technik (RSAP) zaehlt?**

- A) Mindestens 1 Sensor und 2 Aktoren ODER 2 Sensoren und 1 Aktor, davon mindestens 1 analoger Sensor **✅**
- B) Mindestens 3 Aktoren und kein Sensor
- C) Genau 5 LEDs und ein Taster
- D) Nur ein einziger digitaler Sensor reicht aus

_Erklaerung:_ Die Lektion nennt als Pflicht: 1 Sensor + 2 Aktoren ODER 2 Sensoren + 1 Aktor, und mindestens 1 externer Sensor muss analog sein. Ein reines Taster-Setup (nur digital) reicht laut Lektion ausdruecklich nicht.

**2. An welchem Pin haengt in der Pruefungsschaltung der LDR (Lichtsensor)?**

- A) Pin 7
- B) Pin A0 **✅**
- C) Pin 2
- D) Pin 6

_Erklaerung:_ Der LDR wird laut Schaltplan am analogen Eingang A0 ausgelesen (analogRead(A0)). Pin 7 ist der Taster, Pin 2 die rote Auto-LED, Pin 6 die gruene Fussgaenger-LED.

**3. Warum gilt die Ampel-Schaltung laut Lektion als RSAP-konform?**

- A) Weil sie 3 analoge Sensoren benutzt
- B) Weil sie nur einen Taster und sonst nichts braucht
- C) Weil sie 2 Sensoren (LDR analog + Taster digital) und 5 Aktoren (LEDs) mit if/else-Steuerung hat **✅**
- D) Weil sie ganz ohne Code auskommt

_Erklaerung:_ Laut Lektion erfuellt die Ampel die Pflicht durch 2 Sensoren (LDR analog + Taster digital), 5 Aktoren (LEDs) und Steuerung mit if/else plus Zustandsmaschine. Ein analoger Sensor (LDR) ist dabei, deshalb ist sie konform.

**4. Was passiert in der Schaltung, wenn der LDR misst, dass es HELL ist?**

- A) Die komplette Ampel-Sequenz startet sofort
- B) Der Taster wird dauerhaft gesperrt
- C) Nur die Fussgaenger-Ampel leuchtet gruen
- D) Alle LEDs werden ausgeschaltet, die Ampel schlaeft **✅**

_Erklaerung:_ Im else-Zweig (hell) werden alle fuenf LEDs auf LOW gesetzt, die Ampel schlaeft. Erst wenn der LDR dunkel meldet (Wert unter der SCHWELLE), wird die Ampel aktiv und prueft den Taster.

**5. Der Taster ist als INPUT_PULLUP konfiguriert. Wann erkennt der Code, dass er gedrueckt wurde?**

- A) Wenn digitalRead(taster) den Wert LOW liefert **✅**
- B) Wenn analogRead(taster) ueber 300 liegt
- C) Wenn digitalRead(taster) den Wert HIGH liefert
- D) Wenn der LDR gleichzeitig hell misst

_Erklaerung:_ Bei INPUT_PULLUP ist der Eingang normalerweise HIGH und wird beim Druecken auf LOW gezogen; der Code prueft genau digitalRead(taster) == LOW. analogRead passt nicht, weil der Taster ein digitaler Eingang an Pin 7 ist.

**6. In welcher Reihenfolge empfiehlt die Lektion, die Pruefungsschaltung aufzubauen?**

- A) Zuerst den LDR, dann den Taster, dann alle LEDs auf einmal
- B) Erst die Auto-Ampel (3 LEDs), dann die Fussgaenger-Ampel, dann den Taster, zum Schluss den LDR **✅**
- C) Alles gleichzeitig zusammenstecken und am Ende einmal testen
- D) Erst den Code komplett schreiben, dann gar nichts mehr testen

_Erklaerung:_ Die Lektion raet, systematisch aufzubauen: erst Auto-Ampel, dann Fussgaenger-Ampel, dann Taster, zuletzt LDR, und nach jedem Bauteil zu testen. Alles auf einmal aufzubauen macht die Fehlersuche schwerer.

**7. Welche Aussage ueber die Variable SCHWELLE = 300 im Code ist richtig?**

- A) Sie legt fest, wie viele Sekunden Gelb leuchtet
- B) Sie bestimmt, an welchem Pin der LDR haengt
- C) Sie ist der Lichtgrenzwert: Werte unter 300 bedeuten dunkel; sie muss mit dem Serial Monitor kalibriert werden **✅**
- D) Sie gibt an, wie viele LEDs angeschlossen sind

_Erklaerung:_ Im Code steht SCHWELLE = 300 als Tag/Nacht-Grenzwert (unter 300 = dunkel), und der Kommentar sagt ausdruecklich, dass man ihn mit dem Serial Monitor kalibrieren muss, weil die LDR-Werte je nach Raum schwanken.

**8. Welcher der genannten Fehler gehoert laut Lektion zu den haeufigen Pruefungsfehlern?**

- A) Den Arduino zu schnell programmieren
- B) Den Serial Monitor zum Kalibrieren benutzen
- C) Zu viele Kommentare in den Code schreiben
- D) GND (Masse) zu vergessen, sodass keine LED leuchtet **✅**

_Erklaerung:_ Die Lektion listet 'GND vergessen' als haeufigen Fehler auf, weil ohne Masse keine LED leuchtet. Kommentare und das Kalibrieren mit dem Serial Monitor empfiehlt die Lektion dagegen ausdruecklich als gutes Vorgehen.

