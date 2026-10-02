// M4 Aktoren — Korrekturen aus der Gesamtprüfung vom 02.10.2026.
// Einspielen: siehe Kopf von db/content-patch.mjs. Generiert, nicht von Hand ändern.
export default {
 "module": "aktoren",
 "text": [
  {
   "slug": "servomotor-ansteuern",
   "from": "Den genauen Pulse-Code zu schreiben waere kompliziert",
   "to": "Die genauen Stromimpulse selbst zu programmieren wäre kompliziert"
  },
  {
   "slug": "servomotor-ansteuern",
   "from": "lektion-32-servo-aufbau.svg?v=8\" alt=\"Steckbrett-Aufbau Servo: Servo direkt mit Jumper-Kabeln an Arduino - rot zu 5V, schwarz zu GND, gelb zu Pin 9\"",
   "to": "lektion-32-servo-aufbau.svg?v=9\" alt=\"Steckbrett-Aufbau Servo: rot an +Schiene, braun an −Schiene, orange über b10 und a10 zu Pin 9\""
  },
  {
   "slug": "servomotor-ansteuern",
   "from": "Dann nimm ein staerkeres USB-Netzteil oder eine externe 5V-Quelle fuer den Servo.",
   "to": "Probiere einen anderen USB-Port oder frag deine Lehrkraft. <strong>Nie</strong> den 9-V-Block an den Servo &ndash; der SG90 verträgt höchstens etwa 6 V."
  },
  {
   "slug": "servomotor-ansteuern",
   "from": "USB-Strom reicht nicht. Externe 5V-Versorgung anschliessen (Servo direkt ans Netzteil, GND mit Arduino-GND verbinden).",
   "to": "USB-Strom reicht nicht. Anderen USB-Port probieren. Hilft das nicht, braucht der Servo eine eigene 5-V-Quelle (GND mit Arduino-GND verbinden) &ndash; <strong>nie</strong> den 9-V-Block, der SG90 verträgt höchstens etwa 6 V."
  },
  {
   "slug": "servomotor-ansteuern",
   "from": "das kurze <code>delay(15)</code> gibt ihm Zeit dafuer und macht die Bewegung fluessig.</p>",
   "to": "das kurze <code>delay(15)</code> gibt ihm Zeit dafuer und macht die Bewegung fluessig.</p>\n            <p>Die zweite Schleife zählt rückwärts: <code>winkel--</code> zieht nach jedem Durchlauf 1 ab, und sie läuft, solange <code>winkel &gt;= 0</code> ist.</p>"
  },
  {
   "slug": "servomotor-ansteuern",
   "from": "Er sollte sich alle 1 Sekunde sichtbar bewegen.</li></ol>",
   "to": "Er sollte sich alle 1 Sekunde sichtbar bewegen.</li></ol><p><strong>Erweiterung:</strong> Ersetze die beiden <code>write()</code>-Befehle durch einen Sweep mit zwei for-Schleifen (<code>delay(15)</code>, siehe Beispiel). Geschafft, wenn der Arm gleichmäßig hin- und herfährt.</p>"
  },
  {
   "slug": "servomotor-ansteuern",
   "from": "<pre style=\"background:#f5f5f5;padding:0.8rem;border-left:3px solid #2980B9;\">\ndigitalWrite(trigPin, LOW);\ndelayMicroseconds(2);\ndigitalWrite(trigPin, HIGH);     // kurzen Ping ausloesen\ndelayMicroseconds(10);\ndigitalWrite(trigPin, LOW);\n\nlong dauer = pulseIn(echoPin, HIGH);  // Laufzeit in Mikrosekunden\nlong cm = dauer / 58;                 // Umrechnung in Zentimeter</pre>",
   "to": "<pre style=\"background:#f5f5f5;padding:0.8rem;border-left:3px solid #2980B9;\">\nconst int trigPin = 7;   // Trig an Pin 7\nconst int echoPin = 6;   // Echo an Pin 6\n\nvoid setup() {\n  pinMode(trigPin, OUTPUT);\n  pinMode(echoPin, INPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  digitalWrite(trigPin, LOW);\n  delayMicroseconds(2);\n  digitalWrite(trigPin, HIGH);     // kurzen Ping auslösen\n  delayMicroseconds(10);\n  digitalWrite(trigPin, LOW);\n\n  long dauer = pulseIn(echoPin, HIGH);  // Laufzeit in Mikrosekunden\n  long cm = dauer / 58;                 // Umrechnung in Zentimeter\n  Serial.println(cm);                   // Entfernung im Seriellen Monitor anzeigen\n  delay(200);\n}</pre>\n\n          <p><strong>Zwei neue Befehle:</strong> <code>delayMicroseconds(10)</code> wartet wie <code>delay()</code>, nur in Mikrosekunden (1&nbsp;&micro;s ist eine millionstel Sekunde) &ndash; der Ping muss genau 10&nbsp;&micro;s lang sein. <code>long</code> ist wie <code>int</code>, nur für sehr große Zahlen: Die Laufzeit in &micro;s passt nicht immer in ein <code>int</code>.</p>"
  },
  {
   "slug": "servomotor-ansteuern",
   "path": [
    "praxis",
    "bauteile"
   ],
   "old": [
    {
     "name": "Arduino Uno",
     "anzahl": 1
    },
    {
     "name": "Steckbrett (Breadboard)",
     "anzahl": 1,
     "hinweis": "Fuer saubere Stromverteilung"
    },
    {
     "name": "Servo SG90 (oder vergleichbar)",
     "anzahl": 1,
     "hinweis": "Mit angeloetetem Kabel, drei Adern"
    },
    {
     "name": "Jumper-Kabel Male-Male",
     "anzahl": 3,
     "hinweis": "rot, schwarz, gelb/orange"
    },
    {
     "name": "USB-Kabel",
     "anzahl": 1,
     "hinweis": "Strom + Programm-Upload"
    }
   ],
   "value": [
    {
     "name": "Arduino Uno",
     "anzahl": 1
    },
    {
     "name": "Steckbrett (Breadboard)",
     "anzahl": 1,
     "hinweis": "Fuer saubere Stromverteilung"
    },
    {
     "name": "Servo SG90 (oder vergleichbar)",
     "anzahl": 1,
     "hinweis": "Mit angeloetetem Kabel, drei Adern"
    },
    {
     "name": "Jumper-Kabel Male-Male",
     "anzahl": 6,
     "hinweis": "Male = Stecker mit Stift, Female = Buchse mit Loch. 2 für 5V/GND zum Steckbrett, 3 als Verlängerung am Servo-Stecker, 1 für Pin 9"
    },
    {
     "name": "USB-Kabel",
     "anzahl": 1,
     "hinweis": "Strom + Programm-Upload"
    }
   ]
  },
  {
   "slug": "servomotor-ansteuern",
   "path": [
    "praxis",
    "anschluss",
    "schritte"
   ],
   "old": [
    "Stecke das <strong>rote Jumper-Kabel</strong> in den <strong>5V-Pin</strong> des Arduino und das andere Ende an die <strong>+Schiene</strong> oben am Breadboard.",
    "Stecke das <strong>schwarze Jumper-Kabel</strong> in einen <strong>GND-Pin</strong> des Arduino und das andere Ende an die <strong>&minus;Schiene</strong> oben am Breadboard.",
    "Stecke den Servo-Stecker (3 Pins) auf drei Male-Male-Jumper-Kabel: <strong>rotes</strong> Servokabel auf die <strong>+Schiene</strong>, <strong>braunes/schwarzes</strong> auf die <strong>&minus;Schiene</strong>, <strong>oranges/gelbes</strong> auf Loch <code>a10</code> am Breadboard.",
    "Verbinde mit einem <strong>gelben Jumper-Kabel</strong> Loch <code>b10</code> (gleiche Spalte wie das Signal-Kabel des Servos) mit <strong>Pin 9</strong> am Arduino.",
    "Pruefe noch einmal: ROT auf +Schiene, BRAUN/SCHWARZ auf -Schiene, ORANGE/GELB ueber das Breadboard zu Pin 9. <strong>Niemals</strong> die Polung vertauschen!",
    "Schliesse den Arduino mit dem USB-Kabel an den Computer. Lade dein Programm hoch.",
    "Beobachte den Servo: Der Arm sollte sich alle 1 Sekunde sichtbar bewegen &ndash; abwechselnd ganz nach links und ganz nach rechts."
   ],
   "value": [
    "Stecke das <strong>rote Jumper-Kabel</strong> in den <strong>5V-Pin</strong> des Arduino und das andere Ende an die <strong>+Schiene (rot, oben am Steckbrett)</strong>.",
    "Stecke das <strong>schwarze Jumper-Kabel</strong> in einen <strong>GND-Pin</strong> des Arduino und das andere Ende an die <strong>&minus;Schiene (blau, unten am Steckbrett &ndash; wie im Bild)</strong>.",
    "Stecke drei Male-Male-Jumper-Kabel in die Buchsen des Servo-Steckers (Reihenfolge am Stecker: braun | rot | orange). Dann: <strong>rotes</strong> Servokabel in die <strong>+Schiene</strong>, <strong>braunes/schwarzes</strong> in die <strong>&minus;Schiene</strong>, <strong>oranges/gelbes</strong> in Loch <code>b10</code>.",
    "Verbinde mit einem <strong>orangen Jumper-Kabel</strong> Loch <code>a10</code> (gleiche Spalte wie das Signal-Kabel des Servos) mit <strong>Pin 9</strong> am Arduino.",
    "Prüfe noch einmal: ROT auf +Schiene, BRAUN/SCHWARZ auf &minus;Schiene, ORANGE/GELB über Spalte 10 zu Pin 9. Alle Minus-Kabel kommen in dieselbe blaue Schiene. <strong>Niemals</strong> die Polung vertauschen!",
    "Schliesse den Arduino mit dem USB-Kabel an den Computer. Lade dein Programm hoch.",
    "Beobachte den Servo: Der Arm sollte sich alle 1 Sekunde sichtbar bewegen &ndash; abwechselnd ganz nach links und ganz nach rechts."
   ]
  },
  {
   "exercise": "0f231a45-d655-46a3-b9fe-2debd4b321dd",
   "from": "Anode und Kathode sind LED-Begriffe. Ein Servo hat keine Polung in dem Sinne &ndash; er hat Versorgungs- und Signalanschluesse.",
   "to": "Anode und Kathode sind Begriffe von der LED (Diode). Eine Polung hat der Servo trotzdem: Rot an 5V, Braun/Schwarz an GND &ndash; vertauscht kann er kaputtgehen."
  },
  {
   "slug": "transistor-als-schalter-grundlagen",
   "path": [
    "praxis",
    "loesung",
    "haeufige_fehler"
   ],
   "old": [
    "<strong>Motor laeuft gar nicht und der Transistor wird heiss:</strong> Diode falsch herum eingebaut &ndash; der Ring muss zur +5V-Seite zeigen. Sofort Strom abschalten, Diode umdrehen.",
    "<strong>Motor laeuft staendig, auch wenn der Pin LOW ist:</strong> Du hast Collector und Emitter vertauscht. Beim BC547 (flache Seite zum Betrachter): C-B-E von links.",
    "<strong>Motor zuckt nur und es riecht warm:</strong> Basiswiderstand vergessen &ndash; der Pin liefert ungebremst Strom in die Basis und der Pin geht kaputt. Sofort abschalten und 1 k&Omega; nachruesten.",
    "<strong>Arduino startet bei jedem Motor-Start neu:</strong> USB-Strom reicht nicht aus. Externes 5&ndash;9 V Netzteil an Vin / 5V anschliessen (GND verbinden!) oder anderen USB-Port testen.",
    "<strong>Compiler-Fehler bei digitalWrite:</strong> Vergiss nicht das Komma zwischen Pin-Nummer und HIGH/LOW &ndash; <code>digitalWrite(motorPin, HIGH);</code> ist richtig, <code>digitalWrite(motorPin HIGH);</code> nicht.",
    "<strong>Motor knattert / dreht ruckelig:</strong> Diode fehlt oder ist defekt. Die Spannungsspitzen beim Abschalten stoeren den Transistor &ndash; immer eine 1N4148 / 1N4007 parallel zum Motor mit Ring zu +5V."
   ],
   "value": [
    "<strong>Motor laeuft gar nicht und der Transistor wird heiss:</strong> Diode falsch herum eingebaut &ndash; der Ring muss zur +5V-Seite zeigen. Sofort Strom abschalten, Diode umdrehen.",
    "<strong>Motor läuft gar nicht oder nur ganz schwach:</strong> Collector und Emitter vertauscht. Beim BC547 (flache Seite zu dir, Beine nach unten): C-B-E von links.",
    "<strong>Motor zuckt nur und es riecht warm:</strong> Basiswiderstand vergessen &ndash; der Pin liefert ungebremst Strom in die Basis und der Pin geht kaputt. Sofort abschalten und 1 k&Omega; nachruesten.",
    "<strong>Arduino startet bei jedem Motor-Start neu:</strong> USB-Strom reicht nicht. Probiere zuerst einen anderen USB-Port. Hilft das nicht, frag deine Lehrkraft. <strong>Nie</strong> den 9-V-Block oder mehr als 5 V an den 5V-Pin oder die +Schiene &ndash; das zerstört den Arduino und überlastet den 3&ndash;6-V-Motor.",
    "<strong>Compiler-Fehler bei digitalWrite:</strong> Vergiss nicht das Komma zwischen Pin-Nummer und HIGH/LOW &ndash; <code>digitalWrite(motorPin, HIGH);</code> ist richtig, <code>digitalWrite(motorPin HIGH);</code> nicht.",
    "<strong>Diode vergessen:</strong> Der Motor läuft zunächst ganz normal &ndash; aber beim Abschalten kann die Spannungsspitze der Motorspule den Transistor zerstören. Deshalb immer eine 1N4148 / 1N4007 parallel zum Motor, Ring zu +5V.",
    "<strong>Motor läuft ständig, auch wenn der Pin LOW ist:</strong> Das zweite Motorkabel steckt in der &minus;Schiene statt in der Collector-Spalte. Dann hängt der Motor direkt an 5 V und GND, der Transistor wird umgangen."
   ]
  },
  {
   "slug": "transistor-als-schalter-grundlagen",
   "path": [
    "praxis",
    "bauteile"
   ],
   "old": [
    {
     "name": "Arduino Uno",
     "anzahl": 1
    },
    {
     "name": "Steckbrett (Breadboard)",
     "anzahl": 1
    },
    {
     "name": "Kleiner DC-Motor (3-6 V, max. 100 mA)",
     "anzahl": 1,
     "hinweis": "z.B. Mabuchi RE-140 oder vergleichbarer Hobby-Motor mit max. ca. 100 mA Stromaufnahme"
    },
    {
     "name": "NPN-Transistor BC547",
     "anzahl": 1,
     "hinweis": "Flache Seite zum Aufdruck: C-B-E von links"
    },
    {
     "name": "Widerstand 1 k&Omega; (braun-schwarz-rot)",
     "anzahl": 1,
     "hinweis": "Basisvorwiderstand"
    },
    {
     "name": "Diode 1N4148 (oder 1N4007)",
     "anzahl": 1,
     "hinweis": "Freilaufdiode, Ring = Kathode"
    },
    {
     "name": "Jumper-Kabel Male-Male",
     "anzahl": 4,
     "hinweis": "fuer +5V, GND, Pin 9 und Motor-Anschluesse"
    },
    {
     "name": "USB-Kabel",
     "anzahl": 1,
     "hinweis": "Strom + Programm-Upload"
    }
   ],
   "value": [
    {
     "name": "Arduino Uno",
     "anzahl": 1
    },
    {
     "name": "Steckbrett (Breadboard)",
     "anzahl": 1
    },
    {
     "name": "Kleiner DC-Motor (3-6 V, max. 100 mA)",
     "anzahl": 1,
     "hinweis": "Der BC547 schafft höchstens ca. 100 mA. Wird der Transistor heiß, ist der Motor zu stark &ndash; dann den L298N aus der nächsten Lektion nehmen."
    },
    {
     "name": "NPN-Transistor BC547",
     "anzahl": 1,
     "hinweis": "Flache Seite mit Aufdruck zu dir, Beine nach unten: C-B-E von links"
    },
    {
     "name": "Widerstand 1 k&Omega; (braun-schwarz-rot)",
     "anzahl": 1,
     "hinweis": "Basisvorwiderstand"
    },
    {
     "name": "Diode 1N4148 (oder 1N4007)",
     "anzahl": 1,
     "hinweis": "Freilaufdiode, Ring = Kathode"
    },
    {
     "name": "Jumper-Kabel Male-Male",
     "anzahl": 4,
     "hinweis": "fuer +5V, GND, Pin 9 und Motor-Anschluesse"
    },
    {
     "name": "USB-Kabel",
     "anzahl": 1,
     "hinweis": "Strom + Programm-Upload"
    }
   ]
  },
  {
   "slug": "transistor-als-schalter-grundlagen",
   "path": [
    "praxis",
    "anschluss",
    "schritte"
   ],
   "old": [
    "<strong>Erinnerung zum Breadboard:</strong> In der oberen Haelfte sind die Reihen <code>a</code>&ndash;<code>e</code> einer <em>Spalte</em> elektrisch miteinander verbunden. Wenn du also Bauteile in Spalte 10 (in unterschiedlichen Reihen) steckst, haengen alle am selben Knoten.",
    "Stecke ein <strong>rotes Jumper-Kabel</strong> vom <strong>5V-Pin</strong> des Arduino in die <strong>+Schiene</strong> oben am Breadboard.",
    "Stecke ein <strong>schwarzes Jumper-Kabel</strong> von einem <strong>GND-Pin</strong> des Arduino in die <strong>&minus;Schiene</strong> oben am Breadboard.",
    "Setze den <strong>BC547-Transistor</strong> ins Breadboard so, dass die <strong>flache Seite</strong> dich anschaut. Die drei Beine kommen in drei nebeneinanderliegende Spalten der oberen Haelfte, alle in <strong>Reihe e</strong>. Von <strong>links</strong>: <strong>Collector (C)</strong> in <code>e10</code>, <strong>Basis (B)</strong> in <code>e11</code>, <strong>Emitter (E)</strong> in <code>e12</code>.",
    "Verbinde mit einem <strong>schwarzen Jumper-Kabel</strong> die <strong>Emitter-Spalte</strong> (z.B. <code>a12</code>, gleiche Spalte wie e12) mit der <strong>&minus;Schiene</strong> &ndash; so haengt der Emitter an GND.",
    "Stecke den <strong>1 k&Omega;-Widerstand</strong> mit einem Bein in die <strong>Basis-Spalte</strong> (z.B. <code>d11</code>, gleiche Spalte wie e11) und mit dem anderen Bein in eine <strong>freie Spalte</strong> daneben (z.B. <code>d14</code>).",
    "Verbinde mit einem <strong>gelben Jumper-Kabel</strong> die freie Spalte vom Widerstand (<code>b14</code>) mit <strong>Pin 9</strong> am Arduino.",
    "Stecke den <strong>Motor</strong> mit seinen zwei Kabeln: ein Kabel an die <strong>+Schiene</strong> (Motor-Plus an +5V), das andere Kabel in die <strong>Collector-Spalte</strong> &ndash; z.B. <code>b10</code> (gleiche Spalte wie der Collector in e10).",
    "Stecke die <strong>Diode</strong> parallel zum Motor &ndash; <strong>Achtung Polung</strong>: Der <strong>Ring</strong> der Diode (Kathode) muss zur <strong>+Schiene</strong> zeigen. Also: Ring-Bein in das +Schiene-Loch ueber Spalte 10, anderes Bein in <code>a10</code> (gleiche Spalte wie das Motor-Kabel in b10 und der Collector in e10).",
    "Pruefe alles noch einmal langsam: Transistor-Beine richtig (C-B-E von links)? Ring der Diode wirklich zur +Schiene? Widerstand zwischen Basis und Pin 9? Erst dann den Arduino per USB anschliessen.",
    "Lade das Programm hoch. Der Motor sollte sofort anlaufen, 2 Sekunden drehen, 2 Sekunden pausieren &ndash; endlos."
   ],
   "value": [
    "<strong>Erinnerung zum Breadboard:</strong> In der oberen Haelfte sind die Reihen <code>a</code>&ndash;<code>e</code> einer <em>Spalte</em> elektrisch miteinander verbunden. Wenn du also Bauteile in Spalte 10 (in unterschiedlichen Reihen) steckst, haengen alle am selben Knoten.",
    "Stecke ein <strong>rotes Jumper-Kabel</strong> vom <strong>5V-Pin</strong> des Arduino in die <strong>+Schiene (rot, oben am Steckbrett)</strong>.",
    "Stecke ein <strong>schwarzes Jumper-Kabel</strong> von einem <strong>GND-Pin</strong> des Arduino in die <strong>&minus;Schiene (blau, unten am Steckbrett &ndash; wie im Bild)</strong>. Alle Minus-Kabel kommen in dieselbe blaue Schiene.",
    "Setze den <strong>BC547-Transistor</strong> ins Breadboard so, dass die <strong>flache Seite</strong> dich anschaut. Die drei Beine kommen in drei nebeneinanderliegende Spalten der oberen Haelfte, alle in <strong>Reihe e</strong>. Von <strong>links</strong>: <strong>Collector (C)</strong> in <code>e10</code>, <strong>Basis (B)</strong> in <code>e11</code>, <strong>Emitter (E)</strong> in <code>e12</code>.",
    "Verbinde mit einem <strong>schwarzen Jumper-Kabel</strong> die <strong>Emitter-Spalte</strong> (z.B. <code>a12</code>, gleiche Spalte wie e12) mit der <strong>&minus;Schiene</strong> &ndash; so haengt der Emitter an GND.",
    "Stecke den <strong>1 k&Omega;-Widerstand</strong> mit einem Bein in die <strong>Basis-Spalte</strong> (z.B. <code>d11</code>, gleiche Spalte wie e11) und mit dem anderen Bein in eine <strong>freie Spalte</strong> daneben (z.B. <code>d14</code>).",
    "Verbinde mit einem <strong>gelben Jumper-Kabel</strong> die freie Spalte vom Widerstand (<code>b14</code>) mit <strong>Pin 9</strong> am Arduino.",
    "Stecke den <strong>Motor</strong> mit seinen zwei Kabeln: ein Kabel an die <strong>+Schiene</strong> (Motor-Plus an +5V), das andere Kabel in die <strong>Collector-Spalte</strong> &ndash; z.B. <code>b10</code> (gleiche Spalte wie der Collector in e10).",
    "Stecke die <strong>Diode</strong> parallel zum Motor &ndash; <strong>Achtung Polung</strong>: Der <strong>Ring</strong> der Diode (Kathode) muss zur <strong>+Schiene</strong> zeigen. Also: Ring-Bein in das +Schiene-Loch ueber Spalte 10, anderes Bein in <code>a10</code> (gleiche Spalte wie das Motor-Kabel in b10 und der Collector in e10).",
    "Pruefe alles noch einmal langsam: Transistor-Beine richtig (C-B-E von links)? Ring der Diode wirklich zur +Schiene? Widerstand zwischen Basis und Pin 9? Erst dann den Arduino per USB anschliessen.",
    "Lade das Programm hoch. Der Motor sollte sofort anlaufen, 2 Sekunden drehen, 2 Sekunden pausieren &ndash; endlos."
   ]
  },
  {
   "slug": "transistor-als-schalter-grundlagen",
   "from": "Du hast den zweiten <code>digitalWrite()</code>-Befehl wahrscheinlich noch nicht ergaenzt.",
   "to": "Du hast den zweiten <code>digitalWrite()</code>-Befehl wahrscheinlich noch nicht ergaenzt. Steht er da, prüfe das zweite Motorkabel: Es muss in der Collector-Spalte stecken, nicht in der &minus;Schiene."
  },
  {
   "slug": "transistor-als-schalter-grundlagen",
   "from": "USB-Strom ist zu schwach. Anderen USB-Port testen oder externes 5V-Netzteil.",
   "to": "USB-Strom ist zu schwach. Anderen USB-Port testen oder Lehrkraft fragen. <strong>Nie</strong> den 9-V-Block an den 5V-Pin oder die +Schiene!"
  },
  {
   "slug": "transistor-als-schalter-grundlagen",
   "from": "funktioniert wie ein <strong>elektrisches Relais</strong>: Ein winziges Steuer-Signal",
   "to": "funktioniert wie ein <strong>elektrisches Relais</strong> (ein Relais ist ein Schalter, den ein kleiner Strom per Magnet umlegt): Ein winziges Steuer-Signal"
  },
  {
   "slug": "transistor-als-schalter-grundlagen",
   "from": "Datenblatt checken oder mit dem Multimeter im Diodentest die Basis suchen (sie hat eine Diodenstrecke zu C und zu E).",
   "to": "Lehrkraft oder Datenblatt (Beschreibung des Herstellers) fragen."
  },
  {
   "slug": "transistor-als-schalter-grundlagen",
   "from": "Der BC547 ist nur fuer Motoren bis ca. <strong>100 mA</strong> ausgelegt (Datenblatt). Fuer staerkere Motoren (Bohrmaschinen-Modell, kraeftige Geblaese) brauchst du einen staerkeren Transistor &ndash; z.B. <strong>BC337</strong> (bis 800 mA) oder <strong>TIP120</strong> (bis 5 A). Die Schaltung bleibt sonst gleich.",
   "to": "Für den BC547 gilt: Motor höchstens ca. <strong>100 mA</strong>. Unabhängig davon liefert USB nur begrenzt Strom. Für stärkere Motoren reicht der BC547 nicht &ndash; dafür gibt es den <strong>Motortreiber L298N</strong> aus der nächsten Lektion."
  },
  {
   "slug": "transistor-als-schalter-grundlagen",
   "from": "<li>Bei <strong>groesseren Motoren</strong> (&gt; 200 mA) reicht der USB-Strom nicht. Dann externe 5&ndash;9 V Versorgung anschliessen und GND mit Arduino-GND verbinden.</li>",
   "to": "<li><strong>Nie mehr als 5 V an den 5V-Pin</strong> oder die +Schiene &ndash; auch nicht den 9-V-Block. Startet der Arduino beim Motor-Start neu, probiere einen anderen USB-Port oder frag deine Lehrkraft.</li>"
  },
  {
   "slug": "dc-motor-mit-l298n",
   "from": "<tr><td>LOW</td><td>LOW</td><td><strong>Stopp</strong> (Motor laeuft aus)</td></tr>",
   "to": "<tr><td>LOW</td><td>LOW</td><td><strong>Stopp</strong> (Bremse)</td></tr>"
  },
  {
   "slug": "dc-motor-mit-l298n",
   "from": "Sind beide gleich, steht der Motor.</p>",
   "to": "Sind beide gleich, steht der Motor.</p>\n          <p>Mit <code>analogWrite(ENA, 0)</code> ist der Motor dagegen abgeschaltet und läuft frei aus.</p>"
  },
  {
   "slug": "dc-motor-mit-l298n",
   "from": "Die Motorspannung (z.B. 6&ndash;12 V) kommt aus einer <strong>eigenen Quelle</strong> (Batterie/Netzteil), nicht aus dem Arduino.",
   "to": "Die Motorspannung kommt aus einer <strong>eigenen Quelle</strong> (bei uns ein <strong>9-V-Block</strong>), nicht aus dem Arduino. Faustregel: Der L298N verbraucht selbst etwa 2 V &ndash; vom 9-V-Block kommen am Motor also rund 7 V an."
  },
  {
   "slug": "dc-motor-mit-l298n",
   "from": "Arduino, L298N-Modul, Motor und externes Netzteil verkabeln.",
   "to": "Arduino, L298N-Modul, Motor und 9-V-Block verkabeln."
  },
  {
   "slug": "dc-motor-mit-l298n",
   "from": "den Motorstrom aus dem Batteriepack:",
   "to": "den Motorstrom aus dem 9-V-Block:"
  },
  {
   "slug": "dc-motor-mit-l298n",
   "from": "Batteriepack Plus an 12V, Minus an GND des L298N",
   "to": "9-V-Block Plus an 12V, Minus an GND des L298N"
  },
  {
   "slug": "dc-motor-mit-l298n",
   "from": ">Batteriepack 6-12 V</text>",
   "to": ">9-V-Block</text>"
  },
  {
   "slug": "dc-motor-mit-l298n",
   "from": "Motorstrom kommt IMMER aus dem externen Netzteil ueber die 12V-Klemme des L298N.",
   "to": "Motorstrom kommt IMMER aus dem 9-V-Block über die 12V-Klemme des L298N."
  },
  {
   "slug": "dc-motor-mit-l298n",
   "from": "Frische Batterien oder Netzteil verwenden.",
   "to": "Frischen 9-V-Block verwenden."
  },
  {
   "slug": "dc-motor-mit-l298n",
   "path": [
    "praxis",
    "bauteile"
   ],
   "old": [
    {
     "name": "Arduino Uno",
     "anzahl": 1
    },
    {
     "name": "Motortreiber-Modul L298N",
     "anzahl": 1,
     "hinweis": "Doppel-H-Bruecke; wir nutzen Motor A (OUT1/OUT2, ENA, IN1, IN2)"
    },
    {
     "name": "DC-Motor (Gleichstrommotor)",
     "anzahl": 1,
     "hinweis": "z.B. 6-12 V Getriebemotor"
    },
    {
     "name": "Externes Netzteil oder Batteriepack (6-12 V)",
     "anzahl": 1,
     "hinweis": "versorgt NUR den Motor ueber den L298N &ndash; niemals den Motor aus dem Arduino speisen!"
    },
    {
     "name": "Jumper-Kabel Male-Female",
     "anzahl": 4,
     "hinweis": "fuer ENA, IN1, IN2 und GND zwischen Arduino und L298N"
    },
    {
     "name": "USB-Kabel",
     "anzahl": 1,
     "hinweis": "Strom fuer den Arduino + Programm-Upload"
    }
   ],
   "value": [
    {
     "name": "Arduino Uno",
     "anzahl": 1
    },
    {
     "name": "Motortreiber-Modul L298N",
     "anzahl": 1,
     "hinweis": "Doppel-H-Bruecke; wir nutzen Motor A (OUT1/OUT2, ENA, IN1, IN2)"
    },
    {
     "name": "DC-Motor (Gleichstrommotor)",
     "anzahl": 1,
     "hinweis": "z.B. 6-V-Getriebemotor; vom 9-V-Block kommen am Motor rund 7 V an (ca. 2 V verbraucht der L298N). Bei kleinen 3-6-V-Motoren nicht lange Vollgas: lieber analogWrite(ENA, 200)."
    },
    {
     "name": "9-V-Block mit Anschluss-Clip",
     "anzahl": 1,
     "hinweis": "versorgt NUR den Motor über den L298N &ndash; niemals an den Arduino oder ans Steckbrett!"
    },
    {
     "name": "Jumper-Kabel Male-Female (Stecker&ndash;Buchse)",
     "anzahl": 3,
     "hinweis": "Male = Stecker mit Stift, Female = Buchse mit Loch. Für Pin 10/9/8 &rarr; ENA/IN1/IN2"
    },
    {
     "name": "Jumper-Kabel Male-Male (Stecker&ndash;Stecker)",
     "anzahl": 1,
     "hinweis": "für Arduino-GND &rarr; GND-Schraubklemme"
    },
    {
     "name": "USB-Kabel",
     "anzahl": 1,
     "hinweis": "Strom fuer den Arduino + Programm-Upload"
    }
   ]
  },
  {
   "slug": "dc-motor-mit-l298n",
   "path": [
    "praxis",
    "anschluss",
    "schritte"
   ],
   "old": [
    "<strong>Bevor du steckst:</strong> Arduino vom USB trennen und Batteriepack noch NICHT anschliessen &ndash; verkabelt wird immer stromlos.",
    "Verbinde mit einem <strong>orangen Jumper-Kabel</strong> <strong>Pin 10</strong> des Arduino mit <strong>ENA</strong> am L298N. Falls auf ENA ein kleiner <strong>Jumper (Steckbruecke)</strong> steckt: abziehen, sonst laeuft der Motor immer mit Vollgas.",
    "Verbinde <strong>Pin 9</strong> mit <strong>IN1</strong> und <strong>Pin 8</strong> mit <strong>IN2</strong> am L298N.",
    "Verbinde mit einem <strong>schwarzen Jumper-Kabel</strong> einen <strong>GND-Pin</strong> des Arduino mit dem <strong>GND</strong> der L298N-Schraubklemme. <strong>Sicherheits-Check gemeinsame Masse:</strong> Arduino-GND, L298N-GND und Batterie-Minus muessen alle am selben Punkt haengen &ndash; sonst \"versteht\" der L298N die Arduino-Signale nicht.",
    "Schraube die beiden <strong>Motor-Kabel</strong> an <strong>OUT1</strong> und <strong>OUT2</strong> (Motor A) fest.",
    "Schliesse das <strong>Batteriepack</strong> an: <strong>Plus an die 12V-Klemme</strong>, <strong>Minus an die GND-Klemme</strong> des L298N. Kontrolliere, dass der <strong>5V-Regler-Jumper</strong> (5V_EN) auf dem Modul gesteckt ist &ndash; er erzeugt aus der Motorspannung die 5 V fuer die Logik des L298N.",
    "<strong>Letzter Sicherheits-Check vor dem Strom:</strong> Kein Kabel vom Motor oder Batteriepack fuehrt direkt zum Arduino? Plus und Minus am L298N nicht vertauscht? Erst dann Arduino per USB anschliessen.",
    "Lade das vervollstaendigte Programm hoch.",
    "<strong>Test-Beobachtung:</strong> Der Motor laeuft 5 Sekunden vorwaerts (volle Drehzahl), steht 2 Sekunden still, dreht dann 5 Sekunden <em>hoerbar langsamer</em> rueckwaerts &ndash; und beginnt von vorn. Dreht er zuerst \"falsch herum\", tausche einfach die beiden Motorkabel an OUT1/OUT2."
   ],
   "value": [
    "<strong>Bevor du steckst:</strong> Arduino vom USB trennen und 9-V-Block noch NICHT anschliessen &ndash; verkabelt wird immer stromlos.",
    "Verbinde mit einem <strong>orangen Male-Female-Jumper-Kabel</strong> <strong>Pin 10</strong> des Arduino mit <strong>ENA</strong> am L298N. Falls auf ENA ein kleiner <strong>Jumper (Steckbruecke)</strong> steckt: abziehen, sonst laeuft der Motor immer mit Vollgas.",
    "Verbinde <strong>Pin 9</strong> mit <strong>IN1</strong> und <strong>Pin 8</strong> mit <strong>IN2</strong> am L298N.",
    "Verbinde mit einem <strong>schwarzen Male-Male-Jumper-Kabel</strong> (Stecker passt in die Schraubklemme) einen <strong>GND-Pin</strong> des Arduino mit dem <strong>GND</strong> der L298N-Schraubklemme. <strong>Sicherheits-Check gemeinsame Masse:</strong> Arduino-GND, L298N-GND und Minus vom 9-V-Block muessen alle am selben Punkt haengen &ndash; sonst \"versteht\" der L298N die Arduino-Signale nicht.",
    "Schraube die beiden <strong>Motor-Kabel</strong> an <strong>OUT1</strong> und <strong>OUT2</strong> (Motor A) fest.",
    "Schliesse den <strong>9-V-Block</strong> an: <strong>Plus an die 12V-Klemme</strong>, <strong>Minus an die GND-Klemme</strong> des L298N. Kontrolliere, dass der <strong>5V-Regler-Jumper</strong> (5V_EN) auf dem Modul gesteckt ist &ndash; er erzeugt aus der Motorspannung die 5 V fuer die Logik des L298N.",
    "<strong>Letzter Sicherheits-Check vor dem Strom:</strong> Kein Kabel vom Motor oder 9-V-Block fuehrt direkt zum Arduino? Plus und Minus am L298N nicht vertauscht? Erst dann Arduino per USB anschliessen.",
    "Lade das vervollstaendigte Programm hoch.",
    "<strong>Test-Beobachtung:</strong> Der Motor laeuft 5 Sekunden vorwaerts (volle Drehzahl), steht 2 Sekunden still, dreht dann 5 Sekunden <em>hoerbar langsamer</em> rueckwaerts &ndash; und beginnt von vorn. Dreht er zuerst \"falsch herum\", tausche einfach die beiden Motorkabel an OUT1/OUT2."
   ]
  },
  {
   "solution": "transistor-als-schalter-grundlagen",
   "field": "wiring",
   "from": "Bei größeren Motoren (> ca. 200 mA) externe 5-9-V-Versorgung anschließen und deren Masse mit dem Arduino-GND verbinden (gemeinsame Masse). Hinweis: Der BC547 ist nur bis ca. 100 mA belastbar; für stärkere Motoren BC337 oder TIP120 bei sonst gleicher Schaltung.",
   "to": "Nie mehr als 5 V an den 5V-Pin bzw. die +Schiene (auch keinen 9-V-Block): Startet der Arduino beim Motor-Start neu, anderen USB-Port probieren. Hinweis: Der BC547 ist nur bis ca. 100 mA belastbar; für stärkere Motoren den L298N (nächste Lektion) nehmen."
  },
  {
   "solution": "transistor-als-schalter-grundlagen",
   "field": "mistakes",
   "from": "Freilaufdiode weggelassen -> Spannungsspitze der Spule beim Abschalten zerstört den Transistor; Motor knattert/dreht ruckelig.",
   "to": "Freilaufdiode weggelassen -> Motor läuft zunächst normal, aber die Spannungsspitze der Spule beim Abschalten kann den Transistor zerstören."
  },
  {
   "solution": "transistor-als-schalter-grundlagen",
   "field": "mistakes",
   "from": "Collector und Emitter vertauscht -> Motor läuft dauernd, auch bei Pin LOW.",
   "to": "Collector und Emitter vertauscht -> Motor läuft gar nicht oder nur ganz schwach.\n• Zweites Motorkabel in der −Schiene statt in der Collector-Spalte -> Motor läuft dauernd, auch bei Pin LOW (Transistor umgangen)."
  },
  {
   "solution": "transistor-als-schalter-grundlagen",
   "field": "mistakes",
   "from": "• Gemeinsame Masse zwischen externer Motorversorgung und Arduino-GND vergessen -> Steuersignal hat keinen Bezugspunkt.",
   "to": "• Mehr als 5 V (z.B. 9-V-Block) an 5V-Pin/+Schiene -> zerstört den Arduino und überlastet den Motor."
  },
  {
   "solution": "dc-motor-mit-l298n",
   "field": "wiring",
   "from": "Die Motorspannung (laut Skript z.B. 6-12 V) kommt aus einer eigenen Quelle (Batterie/Netzteil) an den Versorgungseingang",
   "to": "Die Motorspannung kommt aus einer eigenen Quelle (bei uns ein 9-V-Block; am Motor kommen rund 7 V an, kleine Motoren nicht lange mit Vollgas betreiben) an den Versorgungseingang"
  }
 ]
};
