# Review Kompetenztest — Modul "aktoren"

3 Lektionen, 24 Fragen. Richtige Antwort ist mit **✅** markiert.

> Insert in die Prod-DB = sofort live fuer Schueler. Erst nach Marcos Freigabe einspielen.

## servomotor-ansteuern  (8 Fragen)

**1. Welche Zeile muss ganz oben im Programm stehen, damit der Arduino den Befehl Servo ueberhaupt kennt?**

- A) #include <Servo.h> **✅**
- B) import Servo;
- C) Servo.begin();
- D) #define Servo 9

_Erklaerung:_ Richtig ist #include <Servo.h> - damit wird die Servo-Library eingebunden, sonst gibt es den Compiler-Fehler 'Servo was not declared'. import gibt es in Arduino-C nicht, begin() ist fuer andere Bauteile, und #define legt nur eine Ersatz-Zahl fest.

**2. Mit welchem Befehl sagst du dem Arduino, dass dein Servo an Pin 9 angeschlossen ist?**

- A) meinServo.write(9);
- B) meinServo.attach(9); **✅**
- C) meinServo.pin(9);
- D) pinMode(9, OUTPUT);

_Erklaerung:_ attach(9) haengt den Servo einmalig im setup() an Pin 9 - genau so steht es in der Lektion. write(9) wuerde dagegen den Servo auf 9 Grad fahren, pin() gibt es nicht und pinMode() ist fuer LEDs, nicht fuer Servos.

**3. Welche Zahl gibst du bei meinServo.write() an, damit der Arm in die Mittelstellung (nach oben) zeigt?**

- A) 1
- B) 45
- C) 90 **✅**
- D) 180

_Erklaerung:_ Laut Lektion ist 90 die Mittelstellung (Arm zeigt nach oben), 0 ist ganz links und 180 ganz rechts. 45 liegt zwischen links und Mitte, und 1 waere fast ganz links - beides ist nicht die Mitte.

**4. An welchen Anschluss am Arduino gehoert das rote Servo-Kabel?**

- A) an einen GND-Pin
- B) an Pin 13
- C) an Pin 9 (Signal)
- D) an +5V **✅**

_Erklaerung:_ Rot ist die Plus-/Versorgungsspannung und gehoert an +5V. GND ist fuer das braune/schwarze Kabel, das orange/gelbe Signal-Kabel kommt an Pin 9, und Pin 13 wird laut Lektion vermieden (dort sitzt die Onboard-LED).

**5. Welche Servo-Kabelfarbe ist das Steuer-Signal und gehoert an einen digitalen Pin wie Pin 9?**

- A) orange (oder gelb) **✅**
- B) rot
- C) braun
- D) blau

_Erklaerung:_ Das orange (oder gelbe) Kabel ist das Steuer-Signal und kommt an einen digitalen Pin, z.B. Pin 9. Braun ist Minus/GND, rot ist Plus/5V, und blau kommt beim Servo gar nicht vor.

**6. Warum steht im Beispiel nach jedem write() ein delay(1000)?**

- A) Damit der Arduino nicht ueberhitzt
- B) Damit der Servo Zeit hat, die Position zu erreichen, bevor der naechste Befehl kommt **✅**
- C) Weil der Servo sonst kaputtgeht
- D) Damit die Library geladen wird

_Erklaerung:_ Ohne das delay() bekaeme der Servo sofort den naechsten Befehl und koennte sich nicht sichtbar bewegen - mechanisch braucht er etwas Zeit. Ueberhitzen oder Kaputtgehen durch fehlendes delay nennt die Lektion nicht, und die Library wird durch #include geladen, nicht durch delay.

**7. Was bewirkt diese Schleife: for (int winkel = 0; winkel <= 180; winkel++) { meinServo.write(winkel); delay(15); } ?**

- A) Der Servo springt sofort von 0 auf 180 Grad
- B) Der Servo bleibt bei 0 Grad stehen
- C) Der Servo faehrt Grad fuer Grad langsam von 0 bis 180 Grad **✅**
- D) Der Servo dreht sich endlos im Kreis

_Erklaerung:_ Die for-Schleife zaehlt winkel von 0 in Einer-Schritten bis 180 hoch und faehrt bei jedem Schritt einen Grad weiter - das kurze delay(15) macht die Bewegung fluessig (sanfter Sweep). Ein hartes Springen waere ohne Schleife, stehenbleiben passt nicht zum Hochzaehlen, und ein normaler Servo dreht maximal 180 Grad, nicht endlos.

**8. Ein Schueler laedt sein Programm hoch, aber der Servo brummt nur und bewegt sich nicht. Was ist laut Lektion die wahrscheinlichste Ursache?**

- A) Das delay() ist zu lang eingestellt
- B) Die Library wurde doppelt eingebunden
- C) Der Wert in write() ist groesser als 90
- D) Das Signal-Kabel ist nicht angeschlossen oder steckt am falschen Pin **✅**

_Erklaerung:_ Brummen ohne Bewegung heisst laut Lektion: das orange/gelbe Signal-Kabel haengt nicht an Pin 9 oder steckt falsch - pruefen, ob attach(9) zum Anschluss passt. Ein langes delay laesst den Servo nur warten, write()-Werte bis 180 sind erlaubt, und ein doppeltes #include erzeugt einen anderen Fehler.

## transistor-als-schalter-grundlagen  (8 Fragen)

**1. Warum darf man einen kleinen DC-Motor nicht direkt an einen Arduino-Pin anschliessen, sondern braucht einen Transistor?**

- A) Weil der Arduino-Pin nur etwa 20 mA liefert, der Motor aber 50-100 mA zieht und der Pin sonst durchbrennt **✅**
- B) Weil der Arduino-Pin nur Wechselstrom liefert, der Motor aber Gleichstrom braucht
- C) Weil der Motor sonst rueckwaerts laufen wuerde
- D) Weil der Arduino-Pin zu viel Strom liefert und den Motor sofort zerstoert

_Erklaerung:_ Ein Pin liefert nur ca. 20 mA (kurz bis 40 mA), ein Hobby-Motor zieht 50-100 mA - bei Direktanschluss brennt der Pin durch. Der Arduino liefert immer Gleichstrom (kein Wechselstrom), und das Problem ist zu wenig, nicht zu viel Pin-Strom.

**2. Du haeltst einen BC547 so, dass die flache Seite mit dem Aufdruck dich anschaut und die Beine nach unten zeigen. Wie heissen die Beine von links nach rechts?**

- A) Emitter - Basis - Collector
- B) Collector - Basis - Emitter **✅**
- C) Basis - Collector - Emitter
- D) Collector - Emitter - Basis

_Erklaerung:_ Beim BC547 gilt mit flacher Seite zum Betrachter von links: C - B - E (Merksatz 'Chef Befiehlt Ende'). Die anderen Reihenfolgen wuerden Collector und Emitter vertauschen - dann laeuft der Motor staendig oder gar nicht.

**3. Welche Aufgabe hat der 1 kOhm-Widerstand zwischen Arduino-Pin und Basis des Transistors?**

- A) Er sorgt dafuer, dass der Motor langsamer dreht
- B) Er erhoeht die Spannung am Motor auf 9 V
- C) Er begrenzt den Basis-Strom auf ca. 4 mA, damit der Arduino-Pin nicht zerstoert wird **✅**
- D) Er glaettet das PWM-Signal, damit der Motor ruhig laeuft

_Erklaerung:_ Die Basis-Emitter-Strecke wirkt wie eine Diode; ohne Widerstand wuerde der Strom den Pin grillen. 1 kOhm begrenzt den Basis-Strom auf ca. 4 mA. Mit der Drehzahl, der Motorspannung oder PWM-Glaettung hat der Basiswiderstand nichts zu tun.

**4. Wozu dient die Freilaufdiode (1N4148) parallel zum Motor?**

- A) Sie verstaerkt das Signal vom Arduino-Pin
- B) Sie begrenzt den Strom durch den Motor auf 20 mA
- C) Sie macht aus Gleichstrom Wechselstrom fuer den Motor
- D) Sie faengt die hohe Spannungsspitze ab, die beim Abschalten des Motors entsteht, und schuetzt so den Transistor **✅**

_Erklaerung:_ Der Motor ist eine Spule: Beim Abschalten entsteht eine sehr hohe Spannungsspitze in umgekehrter Richtung, die den Transistor zerstoeren wuerde. Die Diode fuehrt diese Spitze sicher ab. Verstaerken tut der Transistor, nicht die Diode; eine Strombegrenzung leistet sie nicht.

**5. Wie muss die Freilaufdiode beim Einbau gepolt sein?**

- A) Der Ring (Kathode) zeigt zur +5V-Seite des Motors **✅**
- B) Der Ring (Kathode) zeigt zur GND-Seite
- C) Die Diode wird ohne Beachtung der Richtung eingebaut, sie funktioniert in beide Richtungen
- D) Der Ring (Kathode) zeigt zum Arduino-Pin 9

_Erklaerung:_ Der Ring (Kathode) muss zur +5V-Seite zeigen; so sperrt die Diode im Normalbetrieb und leitet nur die Spannungsspitze ab. Falsch herum eingebaut schliesst sie die Versorgung kurz - der Motor laeuft nicht und es kann rauchen.

**6. Was bewirkt die Code-Zeile digitalWrite(motorPin, HIGH); in diesem Programm?**

- A) Pin 9 liefert 0 V, der Transistor sperrt und der Motor stoppt
- B) Pin 9 liefert 5 V, Strom fliesst in die Basis, der Transistor leitet und der Motor laeuft **✅**
- C) Pin 9 liest den Zustand des Motors ein
- D) Pin 9 dreht den Motor in die andere Richtung

_Erklaerung:_ HIGH bedeutet 5 V am Pin: Strom fliesst ueber den Basiswiderstand in die Basis, der Transistor macht auf und der Motor laeuft. LOW (0 V) wuerde ihn stoppen; digitalWrite sendet aus, liest nichts ein, und die Drehrichtung aendert sich dabei nicht.

**7. Im setup() steht pinMode(motorPin, OUTPUT);. Warum genau OUTPUT und nicht INPUT?**

- A) Weil nur OUTPUT-Pins eine Freilaufdiode brauchen
- B) Weil OUTPUT den Motor vor Ueberhitzung schuetzt
- C) Weil Pin 9 ein Signal aussenden soll (Transistor steuern), nicht etwas einlesen **✅**
- D) Weil INPUT nur fuer Servomotoren funktioniert

_Erklaerung:_ Pin 9 soll etwas aussenden (den Transistor schalten), deshalb OUTPUT - INPUT waere zum Einlesen, z.B. eines Tasters. OUTPUT hat nichts mit Ueberhitzungsschutz, Diode oder Servos zu tun.

**8. Ein Schueler baut alles auf, aber der Motor laeuft staendig - auch wenn der Pin auf LOW steht. Was ist laut Lektion die wahrscheinliche Ursache?**

- A) Der Basiswiderstand ist zu gross gewaehlt
- B) Die Freilaufdiode fehlt
- C) Pin 9 ist nicht PWM-faehig
- D) Collector und Emitter des BC547 wurden vertauscht **✅**

_Erklaerung:_ Laut Lektion bedeutet 'Motor laeuft staendig, auch bei LOW', dass Collector und Emitter vertauscht sind (beim BC547: C-B-E von links). Eine fehlende Diode macht ruckeligen Lauf, ein zu grosser Widerstand schwaches Schalten, und Pin 9 ist sehr wohl PWM-faehig.

## dc-motor-mit-l298n  (8 Fragen)

**1. Warum wird der DC-Motor in dieser Lektion ueber einen Motortreiber L298N angesteuert und nicht ueber einen einzelnen Transistor?**

- A) Weil der L298N die Drehrichtung umkehren kann (vorwaerts/rueckwaerts) und genug Motorstrom aus einer eigenen Quelle schaltet **✅**
- B) Weil ein Transistor zu teuer fuer die Pruefung ist
- C) Weil der Arduino ohne L298N gar keinen Strom liefert
- D) Weil der L298N den Motor leiser macht

_Erklaerung:_ Ein Transistor schaltet den Motor nur an/aus in immer derselben Richtung; der L298N hat eine H-Bruecke und eigene Stromversorgung, daher Vorwaerts/Rueckwaerts und mehr Strom. Preis, Lautstaerke oder gar kein Strom sind keine Gruende aus der Lektion.

**2. An welchen Arduino-Pin ist im BW-Skript der Enable-Pin ENA (Drehzahl) angeschlossen?**

- A) Pin 9
- B) Pin 10 **✅**
- C) Pin 8
- D) Pin 13

_Erklaerung:_ Laut Anschlusstabelle der Lektion geht ENA an Pin 10 (~ PWM) fuer die Drehzahl. Pin 9 ist IN1 und Pin 8 ist IN2 (beide fuer die Drehrichtung), Pin 13 kommt nicht vor.

**3. Womit wird die Drehzahl (Geschwindigkeit) des Motors gesteuert?**

- A) Mit digitalWrite(IN1, HIGH)
- B) Mit delay() im loop()
- C) Mit analogWrite(ENA, ...) und einem Wert von 0 bis 255 **✅**
- D) Mit pinMode(ENA, OUTPUT)

_Erklaerung:_ Die Drehzahl regelt analogWrite auf den PWM-Pin ENA mit Werten 0..255 (0=steht, 255=voll). digitalWrite auf IN1/IN2 setzt die Richtung, delay() nur Wartezeit, pinMode legt nur die Pin-Richtung fest.

**4. Welche Pin-Belegung laesst den Motor in EINE Richtung drehen?**

- A) IN1 = LOW und IN2 = LOW
- B) IN1 = HIGH und IN2 = HIGH
- C) ENA = 0
- D) IN1 = HIGH und IN2 = LOW **✅**

_Erklaerung:_ IN1 und IN2 muessen unterschiedlich sein, damit der Motor dreht: HIGH/LOW ist eine Richtung. Beide LOW bedeutet Stopp, ENA=0 schaltet den Motor aus; beide HIGH ist in der Lektions-Tabelle keine Drehrichtung.

**5. Wie stoppt man den Motor laut Lektion am einfachsten?**

- A) IN1 und IN2 beide auf LOW setzen (oder ENA auf 0) **✅**
- B) IN1 auf HIGH und IN2 auf LOW setzen
- C) Den GND-Pin abziehen
- D) delay(2000) aufrufen

_Erklaerung:_ Sind beide Eingaenge gleich (beide LOW), steht der Motor; alternativ ENA auf 0. HIGH/LOW lasst ihn drehen, GND abziehen ist kein Programmierschritt, delay() haelt nur das Programm an, stoppt aber nicht den Motor.

**6. Im Beispiel-Sketch steht: analogWrite(pinEn, vmax / 2); digitalWrite(pinIN1, LOW); digitalWrite(pinIN2, HIGH);. Was passiert?**

- A) Der Motor dreht mit voller Drehzahl in Richtung 1
- B) Der Motor dreht mit halber Drehzahl in die umgekehrte Richtung **✅**
- C) Der Motor steht still
- D) Der Motor blinkt

_Erklaerung:_ vmax/2 (=128) ist halbe Drehzahl, und IN1=LOW mit IN2=HIGH ist die umgekehrte Richtung. Voll waere vmax (255), Stillstand waere beide IN gleich, und ein Motor blinkt nicht.

**7. Warum muss der GND des L298N mit dem GND des Arduino verbunden sein?**

- A) Damit der Motor schneller dreht
- B) Damit der Arduino die Motorbatterie auflaedt
- C) Damit die Steuersignale einen gemeinsamen Bezugspunkt haben, sonst funktioniert nichts **✅**
- D) Damit die LED am Modul leuchtet

_Erklaerung:_ Ohne gemeinsamen GND haben die kleinen Steuersignale keinen gemeinsamen Bezugspunkt und nichts funktioniert. Mit Drehzahl, Aufladen oder einer LED hat die GND-Verbindung laut Lektion nichts zu tun.

**8. Was bewirkt analogWrite(10, 0); im Sketch?**

- A) Der Motor laeuft mit voller Drehzahl
- B) Pin 10 wird als Eingang gesetzt
- C) Der Motor wechselt die Drehrichtung
- D) Der Motor steht (ENA aus) **✅**

_Erklaerung:_ ENA (Pin 10) auf 0 gibt den Motor nicht frei, also steht er. Voll waere 255, die Richtung legen IN1/IN2 fest, und die Pin-Richtung aendert nur pinMode, nicht analogWrite.

