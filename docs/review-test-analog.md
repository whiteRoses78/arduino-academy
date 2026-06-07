# Review Kompetenztest — Modul "analog"

6 Lektionen, 48 Fragen. Richtige Antwort ist mit **✅** markiert.

> Insert in die Prod-DB = sofort live fuer Schueler. Erst nach Marcos Freigabe einspielen.

## spannungsteiler-verstehen  (8 Fragen)

**1. Was macht ein Spannungsteiler aus zwei Widerstaenden, die in Reihe zwischen +5 V und GND liegen?**

- A) Er teilt die Versorgungsspannung auf, sodass am Abgriff in der Mitte eine kleinere Spannung U2 anliegt. **✅**
- B) Er verdoppelt die 5 V auf 10 V am Abgriff.
- C) Er macht aus Gleichspannung eine Wechselspannung.
- D) Er liefert am Abgriff immer genau 5 V, egal welche Widerstaende man nimmt.

_Erklaerung:_ Am Abgriff in der Mitte liegt eine Teilspannung U2 an, die kleiner als 5 V ist. Ein Teiler kann nicht verdoppeln (kein 10 V), erzeugt keine Wechselspannung und liefert nicht immer 5 V - U2 haengt vom Widerstandsverhaeltnis ab.

**2. Mit welcher Formel berechnet man die abgegriffene Spannung U2?**

- A) U2 = Uges · R1 / (R1 + R2)
- B) U2 = Uges · R2 / (R1 + R2) **✅**
- C) U2 = Uges · (R1 + R2) / R2
- D) U2 = Uges · R2 / R1

_Erklaerung:_ Im Zaehler steht der untere Widerstand R2 (an dem U2 abgegriffen wird), im Nenner die Summe beider Widerstaende. Mit R1 im Zaehler bekaeme man die Spannung an R1, die anderen beiden Brueche sind keine gueltige Teilerformel.

**3. Du baust einen Spannungsteiler mit zwei gleich grossen 10-kΩ-Widerstaenden an 5 V. Welche Spannung misst das Multimeter am Abgriff?**

- A) 5 V, weil beide Widerstaende gleich sind
- B) 0 V, weil sich die Widerstaende aufheben
- C) 2,5 V, weil die Spannung genau halbiert wird **✅**
- D) 1,25 V, weil ein Viertel uebrig bleibt

_Erklaerung:_ Bei zwei gleichen Widerstaenden wird die Spannung genau halbiert: 5 V · 10/(10+10) = 2,5 V. Gleiche Widerstaende heben sich nicht auf (nicht 0 V) und liefern auch nicht die volle Spannung (nicht 5 V).

**4. R1 = 10 kΩ und R2 = 20 kΩ liegen an 5 V. Wie gross ist U2?**

- A) 1,67 V
- B) 2,50 V
- C) 3,33 V **✅**
- D) 5,00 V

_Erklaerung:_ U2 = 5 V · 20/(10+20) = 5 V · 2/3 ≈ 3,33 V - der groessere untere Widerstand bekommt das groessere Stueck. 1,67 V ergaebe sich, wenn man R1 und R2 vertauscht; 2,50 V nur bei gleichen Widerstaenden.

**5. Welche Eselsbruecke beschreibt richtig, wie sich U2 verhaelt?**

- A) Unten waechst, U2 waechst - je groesser R2, desto groesser U2. **✅**
- B) Oben waechst, U2 waechst - je groesser R1, desto groesser U2.
- C) U2 bleibt immer gleich, egal wie gross die Widerstaende sind.
- D) Je kleiner beide Widerstaende, desto groesser U2.

_Erklaerung:_ Je groesser der untere Widerstand R2 im Verhaeltnis, desto mehr Spannung bleibt fuer U2 - daher unten waechst, U2 waechst. Ein groesseres R1 (oben) macht U2 dagegen kleiner, und U2 ist keineswegs konstant.

**6. Warum steckt ein Spannungsteiler in fast jedem analogen Sensor (z. B. NTC oder LDR)?**

- A) Weil der Sensor seinen Widerstand aendert und sich dadurch U2 aendert. **✅**
- B) Weil der Sensor die 5 V auf 12 V hochsetzt.
- C) Weil der Sensor die Spannung in Strom umwandelt, den der Arduino zaehlt.
- D) Weil der Sensor das Programm direkt steuert, ohne dass sich eine Spannung aendert.

_Erklaerung:_ Ein NTC oder LDR ist ein veraenderlicher Widerstand: aendert er sich, aendert sich auch U2 - genau dieses Spannungssignal liest der Arduino ein. Ein Sensor setzt die Spannung nicht hoch und wandelt sie nicht in einen gezaehlten Strom um.

**7. In einem Teiler ist R1 = 10 kΩ fest, R2 ist ein NTC. Bei Hitze sinkt der NTC von 10 kΩ auf 4 kΩ. Was passiert mit U2 (Versorgung 5 V)?**

- A) U2 steigt von 2,5 V auf etwa 3,5 V.
- B) U2 bleibt unveraendert bei 2,5 V.
- C) U2 sinkt von 2,5 V auf etwa 1,43 V. **✅**
- D) U2 springt sofort auf 5 V.

_Erklaerung:_ Wird der untere Widerstand kleiner, wird auch U2 kleiner: 5 V · 4/(10+4) ≈ 1,43 V. Da R2 sinkt, kann U2 nicht steigen oder gleich bleiben, und auf die volle Versorgungsspannung springt es nur, wenn der obere Widerstand verschwindet.

**8. Mit welchem Befehl liest der Arduino die Spannung U2 am Abgriff spaeter als Zahl ein?**

- A) digitalWrite(pin, HIGH)
- B) analogRead(pin) **✅**
- C) delay(1000)
- D) pinMode(pin, OUTPUT)

_Erklaerung:_ analogRead(pin) wandelt die anliegende Spannung in eine Zahl von 0 bis 1023 um - so wird aus U2 ein verarbeitbarer Wert. digitalWrite schaltet nur an/aus, delay wartet, und pinMode legt nur die Pin-Richtung fest.

## analoge-eingaenge  (8 Fragen)

**1. Was ist der wichtigste Unterschied zwischen einem digitalen und einem analogen Eingang am Arduino?**

- A) Ein digitaler Eingang kennt nur die Werte 0 oder 1, ein analoger Eingang erkennt viele Werte dazwischen **✅**
- B) Ein analoger Eingang ist schneller als ein digitaler Eingang
- C) Ein digitaler Eingang funktioniert nur mit 5V, ein analoger nur mit 3V
- D) Ein analoger Eingang kann nur an oder aus erkennen, ein digitaler alle Stufen

_Erklaerung:_ Digital ist wie ein Lichtschalter (nur an/aus = LOW/HIGH), analog wie ein Dimmer mit allen Werten dazwischen. Die letzte Option vertauscht genau diese beiden Begriffe.

**2. Welchen Wertebereich liefert der Befehl analogRead() zurück?**

- A) 0 bis 100
- B) 0 bis 255
- C) 0 bis 1023 **✅**
- D) 0 bis 5

_Erklaerung:_ analogRead() liefert immer Werte von 0 bis 1023, weil der Arduino einen 10-Bit-Wandler mit 1024 Stufen hat. 0 bis 255 wäre 8 Bit, 0 bis 5 ist die Spannung in Volt, nicht der Messwert.

**3. An welche Pins schliesst du ein Potentiometer an, um es mit analogRead() auszulesen?**

- A) An die digitalen Pins 0 bis 13
- B) An die analogen Pins A0 bis A5 **✅**
- C) Nur an Pin 13 (LED-Pin)
- D) An den USB-Anschluss

_Erklaerung:_ Analoge Eingänge liegen an den Pins A0 bis A5. Die Pins 0 bis 13 sind die digitalen Pins (für digitalRead/digitalWrite), nicht für analogRead gedacht.

**4. Du drehst das Potentiometer genau in die Mittelstellung. Welchen Wert zeigt der Serial Monitor ungefähr an?**

- A) 0
- B) ungefähr 512 **✅**
- C) 1023
- D) 2,5

_Erklaerung:_ In der Mitte liegt etwa die halbe Spannung an, also etwa die Hälfte von 1023, das ergibt rund 512. 0 ist ganz links, 1023 ganz rechts, und 2,5 wäre die Spannung in Volt.

**5. Warum reicht der analogRead()-Wert genau bis 1023 und nicht weiter?**

- A) Weil der Arduino nur bis 1023 zählen kann
- B) Weil 1023 die höchste gerade Zahl ist
- C) Weil der 10-Bit-Wandler die Spannung in 1024 Stufen (0 bis 1023) aufteilt **✅**
- D) Weil das Potentiometer maximal 1023 Ohm hat

_Erklaerung:_ Der 10-Bit-Analog-Digital-Wandler teilt 0V bis 5V in 1024 Stufen auf, gezählt von 0 bis 1023. Mit dem Widerstand des Potentiometers in Ohm oder der Zählgrenze des Arduino hat diese Zahl nichts zu tun.

**6. Welcher Befehl muss im setup() stehen, damit du die Werte im Serial Monitor sehen kannst?**

- A) Serial.begin(9600); **✅**
- B) pinMode(A0, INPUT);
- C) analogRead(A0);
- D) Serial.println(9600);

_Erklaerung:_ Serial.begin(9600) startet die Verbindung zum Serial Monitor und gehört ins setup(). pinMode brauchst du für analoge Pins gar nicht, analogRead und Serial.println gehören in den loop().

**7. Ein Mitschüler schreibt im setup() den Befehl pinMode(A0, INPUT);, bevor er analogRead(A0) nutzt. Was stimmt?**

- A) Ohne diese Zeile funktioniert analogRead() gar nicht
- B) Diese Zeile ist nötig, damit der Pin Spannung liefert
- C) Diese Zeile ist nicht nötig, weil analoge Pins automatisch Eingänge sind **✅**
- D) Diese Zeile macht aus dem analogen Pin einen digitalen Pin

_Erklaerung:_ Für analogRead() braucht man keinen pinMode-Befehl, die analogen Pins sind automatisch als Eingang konfiguriert. Die Zeile schadet zwar nicht, ist aber überflüssig und ändert die Pin-Art nicht.

**8. Du willst den Messwert in Volt umrechnen. Welche Schreibweise liefert ein genaues Ergebnis mit Nachkommastellen?**

- A) float volt = wert * 5 / 1023;
- B) float volt = wert * 5.0 / 1023; **✅**
- C) float volt = wert / 1023 * 5;
- D) float volt = wert * 1023 / 5;

_Erklaerung:_ Nur mit dem Punkt bei 5.0 rechnet der Arduino mit Kommazahlen, sonst schneidet er die Nachkommastellen ab. Bei wert/1023 ohne Punkt käme zuerst 0 heraus, und wert*1023/5 ist die falsche Formel.

## pwm-dimmen-statt-schalten  (8 Fragen)

**1. Wofuer steht die Abkuerzung PWM?**

- A) Power-Watt-Messung
- B) Puls-Weiten-Modulation **✅**
- C) Pin-Wechsel-Methode
- D) Programm-Wert-Modus

_Erklaerung:_ PWM steht fuer Puls-Weiten-Modulation: Der Pin wird sehr schnell ein- und ausgeschaltet, sodass eine Durchschnittshelligkeit entsteht. Die anderen Begriffe klingen aehnlich technisch, kommen aber in der Lektion nicht vor und sind erfunden.

**2. Welchen Befehl brauchst du, um eine LED zu dimmen (stufenlos heller und dunkler machen)?**

- A) analogWrite() **✅**
- B) digitalWrite()
- C) analogRead()
- D) pinMode()

_Erklaerung:_ Zum Dimmen nutzt man analogWrite(), das viele Helligkeitsstufen ausgeben kann. digitalWrite() kennt nur an/aus, analogRead() liest einen Eingang und pinMode() legt nur die Richtung des Pins fest.

**3. Welchen Wertebereich erwartet analogWrite()?**

- A) 0 bis 100
- B) 0 bis 1023
- C) 0 bis 255 **✅**
- D) 0 bis 490

_Erklaerung:_ analogWrite() arbeitet mit Werten von 0 bis 255 (255 = volle Helligkeit). 0 bis 1023 gehoert zu analogRead (Eingang), 100 waere Prozent und 490 ist die PWM-Frequenz pro Sekunde.

**4. Du moechtest eine LED per analogWrite() dimmen. An welchen Pin musst du sie anschliessen?**

- A) An jeden beliebigen digitalen Pin
- B) An einen Pin mit Tilde, z.B. ~9 **✅**
- C) An einen Analog-Pin wie A0
- D) An Pin 8

_Erklaerung:_ analogWrite() funktioniert nur an PWM-Pins, die auf dem Board mit einer Tilde (~) markiert sind, z.B. ~9. Ein normaler Pin wie 8 schaltet nur ganz an/aus, und A0-Pins sind Eingaenge zum Auslesen.

**5. Was ist der Hauptunterschied zwischen analogRead() und analogWrite()?**

- A) analogRead() schreibt Werte raus, analogWrite() liest Werte ein
- B) analogRead() liest einen Eingang (0-1023), analogWrite() schreibt einen Ausgang (0-255) **✅**
- C) Beide lesen Werte ein, nur mit anderem Bereich
- D) analogRead() ist fuer LEDs, analogWrite() fuer Sensoren

_Erklaerung:_ analogRead() ist ein Eingang und liefert Werte von 0 bis 1023 (z.B. vom Sensor), analogWrite() ist ein Ausgang und schreibt Werte von 0 bis 255 (z.B. zur LED). Die anderen Optionen vertauschen Richtung oder Aufgabe der beiden Befehle.

**6. Mit welchem Befehl rechnest du den Poti-Wert (0 bis 1023) in einen passenden Wert fuer analogWrite() (0 bis 255) um?**

- A) delay()
- B) Serial.print()
- C) pinMode()
- D) map() **✅**

_Erklaerung:_ map() rechnet einen Wertebereich in einen anderen um, z.B. map(potiWert, 0, 1023, 0, 255). delay() wartet nur, Serial.print() zeigt Werte an und pinMode() stellt die Pin-Richtung ein.

**7. Ungefaehr wie hell leuchtet eine LED bei analogWrite(9, 127)?**

- A) Etwa halb so hell (rund 50%) **✅**
- B) Gar nicht, die LED bleibt aus
- C) Voll an (100%)
- D) Nur ganz kurz an, dann aus

_Erklaerung:_ 127 liegt etwa in der Mitte zwischen 0 und 255, daher leuchtet die LED rund 50 Prozent hell. 0 waere aus, 255 waere voll an, und ein kurzes Aufblitzen passt zu keinem festen analogWrite-Wert.

**8. Du schliesst die LED versehentlich an Pin 8 an (kein PWM-Pin) und nutzt analogWrite(8, 127). Was passiert?**

- A) Die LED leuchtet trotzdem genau halb hell
- B) Der Arduino geht kaputt
- C) Die LED leuchtet nicht halb hell, sondern wird nur ganz an oder ganz aus geschaltet **✅**
- D) Pin 8 wird automatisch zu einem PWM-Pin

_Erklaerung:_ An einem Pin ohne Tilde funktioniert echtes Dimmen nicht: Statt halber Helligkeit wird die LED nur ganz an oder ganz aus geschaltet. Der Arduino nimmt dabei keinen Schaden und ein Pin kann nicht von selbst zum PWM-Pin werden.

## lichtsensor-ldr  (8 Fragen)

**1. Wofuer steht die Abkuerzung LDR und was macht dieses Bauteil?**

- A) Es ist ein lichtabhaengiger Widerstand: Er aendert seinen Widerstand je nachdem, wie hell es ist. **✅**
- B) Es ist eine besonders helle LED, die man zum Beleuchten benutzt.
- C) Es ist ein Sensor, der die Temperatur in der Umgebung misst.
- D) Es ist ein fester Widerstand, der immer genau 10 kOhm hat.

_Erklaerung:_ LDR heisst Light Dependent Resistor, also lichtabhaengiger Widerstand. Eine LED leuchtet, misst aber nichts; Temperatur misst ein anderer Sensor; und der feste 10-kOhm-Widerstand ist in der Schaltung das Gegenstueck zum LDR, nicht der LDR selbst.

**2. Wie veraendert sich der Widerstand des LDR, wenn es HELLER wird?**

- A) Der Widerstand bleibt gleich, nur die Spannung aendert sich.
- B) Der Widerstand wird groesser (z.B. von 1 kOhm auf 100 kOhm).
- C) Der Widerstand wird kleiner (z.B. von 100 kOhm auf 1 kOhm). **✅**
- D) Der LDR wird heiss und schaltet sich ab.

_Erklaerung:_ Bei Helligkeit sinkt der LDR-Widerstand (hell ~1 kOhm, dunkel ~100 kOhm) - wie die Pupille, die bei Licht klein wird. Dass der Widerstand steigt, ist genau der umgekehrte Denkfehler; gleich bleibt er nicht, und mit Hitze hat das nichts zu tun.

**3. Warum braucht man fuer den LDR ueberhaupt einen Spannungsteiler mit einem 10-kOhm-Widerstand?**

- A) Damit der LDR nicht zu heiss wird und kaputtgeht.
- B) Weil der Arduino keinen Widerstand direkt messen kann, sondern nur Spannung. **✅**
- C) Weil der LDR sonst zu wenig Strom bekommt, um zu leuchten.
- D) Damit man zwei LDR gleichzeitig anschliessen kann.

_Erklaerung:_ Der Arduino kann nur eine Spannung messen, keinen Widerstand. Der Spannungsteiler wandelt die Widerstandsaenderung des LDR in eine messbare Spannung um. Ein LDR leuchtet nicht, und mit Ueberhitzung oder zwei Sensoren hat der Spannungsteiler nichts zu tun.

**4. In welcher Reihenfolge ist die Schaltung in dieser Lektion aufgebaut?**

- A) GND -> LDR -> A0 -> 10-kOhm-Widerstand -> 5V
- B) A0 -> 5V -> LDR -> 10-kOhm-Widerstand -> GND
- C) 5V -> 10-kOhm-Widerstand -> A0 -> LDR -> GND
- D) 5V -> LDR -> Knotenpunkt (A0) -> 10-kOhm-Widerstand -> GND **✅**

_Erklaerung:_ In dieser Schaltung liegt der LDR oben an 5V, dann folgt der Knotenpunkt mit A0 und darunter der 10-kOhm-Widerstand zu GND. Die anderen Reihenfolgen vertauschen Plus und Minus oder setzen LDR und Festwiderstand falsch herum - dann wuerde die Messung nicht zur Lektion passen.

**5. Es ist HELL. Welchen Wert zeigt analogRead(A0) bei dieser Schaltung ungefaehr an?**

- A) Einen hohen Wert (etwa 920). **✅**
- B) Einen niedrigen Wert (etwa 100).
- C) Immer genau 512, egal wie hell es ist.
- D) Gar keinen Wert, weil der LDR bei Licht den Strom sperrt.

_Erklaerung:_ Bei Helligkeit wird der LDR-Widerstand klein, fast die ganze Spannung faellt ueber dem unteren 10-kOhm-Widerstand ab, und genau die misst A0 - daher ein hoher Wert (~920). Der niedrige Wert gilt fuer Dunkelheit; 512 waere nur Zufall, und der LDR sperrt nichts.

**6. Du deckst den LDR mit der Hand ab (es wird dunkel). Was passiert mit dem analogRead-Wert?**

- A) Er bleibt unveraendert, weil A0 nur die 5V misst.
- B) Er steigt auf etwa 1000.
- C) Er sinkt auf einen niedrigen Wert (etwa 100). **✅**
- D) Er springt auf negative Werte.

_Erklaerung:_ Dunkel bedeutet hoher LDR-Widerstand, dadurch faellt nur noch wenig Spannung ueber dem 10-kOhm-Widerstand ab, und A0 misst einen niedrigen Wert (~100). Ein Anstieg waere der umgekehrte Fall (hell), unveraendert bleibt der Wert nicht, und negativ kann analogRead nie werden (0 bis 1023).

**7. Welche Code-Zeile liest den Lichtwert des LDR vom Pin A0 ein?**

- A) digitalWrite(A0, HIGH);
- B) ldrWert = analogRead(ldrPin); **✅**
- C) Serial.begin(9600);
- D) pinMode(A0, OUTPUT);

_Erklaerung:_ analogRead(ldrPin) liest die Spannung an A0 als Zahl von 0 bis 1023 ein - genau das brauchen wir fuer den LDR. digitalWrite schaltet einen Pin nur ein/aus, Serial.begin startet nur den Serial Monitor, und pinMode auf OUTPUT wuerde den Pin zum Ausgang machen statt zum Messeingang.

**8. Du willst aus dem LDR ein Nachtlicht bauen: Die LED soll angehen, wenn es DUNKEL wird. Worauf muss dein Programm bei dieser Schaltung achten?**

- A) Es schaltet die LED ein, wenn der analogRead-Wert UNTER einen Schwellwert faellt. **✅**
- B) Es schaltet die LED ein, wenn der analogRead-Wert UEBER einen Schwellwert steigt.
- C) Es schaltet die LED ein, sobald 5V am LDR anliegen.
- D) Es schaltet die LED nur ein, wenn der Wert genau 512 betraegt.

_Erklaerung:_ Dunkel ergibt bei dieser Schaltung einen niedrigen Wert, also muss die LED angehen, wenn der Wert UNTER den Schwellwert faellt. Ueber dem Schwellwert waere es ja hell. Die 5V liegen dauerhaft an, und ein fester Wert wie 512 wuerde fast nie exakt getroffen.

## ntc-temperatursensor  (8 Fragen)

**1. Wofuer steht die Abkuerzung NTC?**

- A) Negative Temperature Coefficient (negativer Temperaturkoeffizient) **✅**
- B) Normale Temperatur-Charakteristik
- C) New Temperature Control
- D) Niedrige Temperatur-Comparison

_Erklaerung:_ NTC heisst Negative Temperature Coefficient: der Widerstand sinkt, wenn die Temperatur steigt. Die anderen Begriffe gibt es so nicht; das Wort negativ beschreibt den gegenlaeufigen Zusammenhang.

**2. Was passiert mit dem Widerstand eines NTC, wenn er waermer wird?**

- A) Der Widerstand bleibt immer gleich
- B) Der Widerstand steigt
- C) Der Widerstand sinkt **✅**
- D) Der Widerstand wird zu Spannung

_Erklaerung:_ Bei einem NTC gilt: warm = kleiner Widerstand (heiss haut ab). Steigen wuerde er nur bei einem PTC; gleich bleibt nur ein normaler Festwiderstand.

**3. Ein 10-kOhm-NTC hat seinen Nennwiderstand von 10 kOhm bei welcher Temperatur?**

- A) bei 0 Grad C
- B) bei 25 Grad C (Zimmertemperatur) **✅**
- C) bei 50 Grad C
- D) bei 100 Grad C

_Erklaerung:_ Der Nennwert eines 10-kOhm-NTC gilt bei 25 Grad C, also Zimmertemperatur. Bei 0 Grad C waeren es ca. 33 kOhm, bei 50 Grad C nur ca. 3,6 kOhm.

**4. Warum braucht man bei einem NTC ueberhaupt einen Spannungsteiler mit festem Widerstand?**

- A) Damit der NTC nicht zu heiss wird
- B) Weil der Arduino keinen Widerstand messen kann, sondern nur Spannung **✅**
- C) Damit der Wert immer genau 511 ist
- D) Weil der NTC sonst kaputtgeht

_Erklaerung:_ Der Arduino kann nur Spannung am Pin messen, keinen Widerstand. Der feste Widerstand wandelt die Widerstandsaenderung in eine messbare Spannung um. Der Wert 511 gilt nur bei Zimmertemperatur, nicht immer.

**5. In dieser Lektion sitzt der NTC unten (an GND) und der feste 10-kOhm-Widerstand oben (an 5V), A0 greift den Mittelpunkt ab. Was misst der Arduino, wenn der NTC heiss wird?**

- A) Der analogRead-Wert wird groesser
- B) Der analogRead-Wert bleibt bei 1023
- C) Der analogRead-Wert wird kleiner **✅**
- D) Der analogRead-Wert springt auf 0

_Erklaerung:_ Heiss bedeutet kleiner NTC-Widerstand, dadurch faellt am NTC (unten) weniger Spannung ab, also wird auch der Wert an A0 kleiner. Merksatz: heisser Sensor, kleiner Zahlenwert. Auf 0 oder 1023 springt der Wert nur bei einem Verdrahtungsfehler.

**6. Bei Zimmertemperatur (25 Grad C) sind R1 = 10 kOhm und der NTC = 10 kOhm gleich gross. Welche Sensorspannung U2 ergibt sich und welcher analogRead-Wert ungefaehr?**

- A) 5 V und etwa 1023
- B) 2,5 V und etwa 511 **✅**
- C) 0 V und etwa 0
- D) 1,32 V und etwa 270

_Erklaerung:_ Bei zwei gleichen Widerstaenden teilt sich die Spannung genau in der Mitte: U2 = 5 V mal 10/(10+10) = 2,5 V, das ergibt analogRead etwa 511. 1,32 V und 270 gilt erst bei 50 Grad C, wenn der NTC kleiner geworden ist.

**7. Du legst den Finger auf den NTC und siehst im Serial Monitor zuerst 511, dann 421. Was bedeutet das?**

- A) Der NTC ist kaputt, denn der Wert darf nicht sinken
- B) Der NTC wurde durch den Finger waermer, deshalb sinkt der Wert **✅**
- C) Der Finger hat den NTC abgekuehlt
- D) Der Arduino misst jetzt Volt statt einer Zahl

_Erklaerung:_ Der Finger (ca. 35 Grad C) erwaermt den NTC, sein Widerstand sinkt und damit auch der Zahlenwert von 511 auf etwa 421 - genau das erwartete Verhalten, kein Defekt. Abkuehlen wuerde den Wert steigen lassen.

**8. Im Code steht int wert = analogRead(NTC_PIN);. Welchen Zahlenbereich kann die Variable wert annehmen?**

- A) 0 bis 1023 **✅**
- B) 0 bis 255
- C) 0 bis 5
- D) minus 100 bis plus 100

_Erklaerung:_ Der AD-Wandler des Arduino liefert immer Werte von 0 bis 1023. 0 bis 255 waere ein 8-Bit-Wert (z.B. bei analogWrite), 0 bis 5 verwechselt den Zahlenwert mit der Spannung in Volt.

## entscheidungen-mit-sensorwerten  (8 Fragen)

**1. Warum ist es nuetzlich, dass der Arduino mit if/else auf Sensorwerte reagiert?**

- A) Damit der Arduino nur noch HIGH und LOW unterscheiden muss
- B) Damit man die LED gar nicht mehr an einen Pin anschliessen muss
- C) Damit der Arduino selbst entscheidet und automatisch reagiert, z.B. eine LED ein- oder ausschaltet **✅**
- D) Damit der Sensor mehr Strom verbraucht und heller leuchtet

_Erklaerung:_ Mit if/else trifft der Arduino selbst eine Entscheidung anhand des Sensorwerts und reagiert automatisch (wie eine Strassenlaterne). Die anderen Optionen beschreiben gerade das Gegenteil oder technischen Unsinn: analoge Werte sind ja Zahlen, nicht nur HIGH/LOW.

**2. Was ist mit dem Begriff Schwellenwert (z.B. 300) gemeint?**

- A) Die Grenze, ab der der Arduino seine Entscheidung trifft **✅**
- B) Der hoechstmoegliche Wert, den analogRead() liefern kann
- C) Die Anzahl der LEDs, die man anschliessen darf
- D) Die Zeit in Millisekunden, die delay() wartet

_Erklaerung:_ Der Schwellenwert ist die selbst festgelegte Grenze zwischen hell und dunkel, an der die Entscheidung kippt. Der Maximalwert von analogRead (1023), die LED-Anzahl oder eine delay-Zeit haben nichts mit dieser Grenze zu tun.

**3. Im Nachtlicht-Code steht: if (helligkeit < schwelleAn). Was passiert, wenn helligkeit kleiner als schwelleAn ist?**

- A) Die LED wird ausgeschaltet, weil es zu hell ist
- B) Die LED wird eingeschaltet, weil es dunkel ist **✅**
- C) Der Arduino startet komplett neu
- D) Der Schwellenwert wird automatisch erhoeht

_Erklaerung:_ Ein kleiner LDR-Wert bedeutet wenig Licht, also dunkel, deshalb geht die LED an (digitalWrite HIGH). Aus geht sie im else if, wenn der Wert ueber schwelleAus liegt, also bei hell.

**4. Dein LDR zeigt bei Raumlicht ca. 600 und bei abgedecktem Sensor ca. 100. Welcher Schwellenwert ist sinnvoll?**

- A) Etwa 1023, also der hoechste Wert
- B) Etwa 50, also unter dem Dunkelwert
- C) Etwa 300, also ungefaehr in der Mitte **✅**
- D) Etwa 700, also ueber dem Hellwert

_Erklaerung:_ Der Schwellenwert sollte zwischen hell (600) und dunkel (100) liegen, damit beide Zustaende sicher erkannt werden, z.B. 300. Werte ausserhalb dieser Spanne (50, 700, 1023) wuerden nie oder immer ausloesen.

**5. Wie nennt man das Problem, wenn die LED an einem einzelnen Schwellenwert staendig an und aus geht, weil der Sensorwert leicht schwankt?**

- A) Flackern **✅**
- B) Spannungsteilung
- C) Dimmen
- D) Pulsweitenmodulation

_Erklaerung:_ Wenn der Wert um den Schwellenwert herum schwankt (z.B. 298 bis 302), schaltet die LED staendig um, das nennt man Flackern. Dimmen und Pulsweitenmodulation betreffen das Helligkeit-Regeln, Spannungsteilung ist die LDR-Schaltung.

**6. Wie verhindert die Hysterese das Flackern?**

- A) Sie erhoeht die Geschwindigkeit, mit der analogRead() liest
- B) Sie verwendet zwei verschiedene Schwellenwerte mit einer Puffer-Zone dazwischen **✅**
- C) Sie schaltet den Serial Monitor aus, damit nichts mehr stoert
- D) Sie ersetzt die LED durch einen staerkeren Widerstand

_Erklaerung:_ Hysterese nutzt eine Einschalt- und eine Ausschaltschwelle (z.B. 250 und 350); im Bereich dazwischen aendert sich nichts, dieser Puffer stoppt das Flackern. Lesegeschwindigkeit, Serial Monitor oder ein Widerstand-Tausch loesen das Problem nicht.

**7. Im Nachtlicht ist schwelleAn = 250 und schwelleAus = 350. Was passiert, wenn der gemessene Wert genau 300 betraegt?**

- A) Die LED geht an, weil 300 ueber 250 liegt
- B) Die LED geht aus, weil 300 unter 350 liegt
- C) Es aendert sich nichts, der Wert liegt in der Puffer-Zone **✅**
- D) Der Arduino zeigt eine Fehlermeldung an

_Erklaerung:_ 300 ist weder kleiner als schwelleAn (250) noch groesser als schwelleAus (350), also greift der else-Zweig: die LED behaelt ihren Zustand, der Wert liegt im Puffer. Eine Fehlermeldung gibt es nicht, das ist genau der gewuenschte stabile Bereich.

**8. Mit welcher Struktur kann man mehrere Helligkeitsstufen (z.B. sehr dunkel, Daemmerung, hell) unterscheiden?**

- A) Mit einem einzigen if ganz ohne else
- B) Mit map(), das die Stufen automatisch zaehlt
- C) Mit pinMode() fuer jede Stufe
- D) Mit if / else if / else und mehreren Schwellenwerten **✅**

_Erklaerung:_ Gestaffelte Schwellenwerte prueft man der Reihe nach mit if / else if / else, so wird genau ein passender Zweig ausgefuehrt. map() rechnet nur Wertebereiche um und pinMode() legt nur die Pin-Richtung fest, beide unterscheiden keine Stufen.

