// Re-seed-feste Quelle der Kompetenztest-Fragen je Lektion (Marco-geprueft).
// Eingespielt wird via MCP execute_sql (test_questions erlaubt keinen anon-Insert).
// Format pro Frage = Vanilla-MC-Payload: {type, question, options[], correct, explanation}.
// Schluessel = "<modul>/<slug>" der Lektion.

export const TEST_QUESTIONS = {
  "digital/leds-ansteuern": [
    {
      type: "multiple-choice",
      question: "Warum braucht eine LED einen Vorwiderstand?",
      options: [
        "Damit die LED heller leuchtet",
        "Damit der Strom begrenzt wird und die LED nicht durchbrennt",
        "Damit der Arduino schneller arbeitet",
        "Damit die LED blinkt",
      ],
      correct: 1,
      explanation:
        "Ohne Vorwiderstand fließt zu viel Strom durch die LED und sie brennt durch. 220 Ω ist der Standardwert für die meisten LEDs.",
    },
    {
      type: "multiple-choice",
      question: "Welcher Code lässt eine LED an Pin 5 leuchten (nicht blinken)?",
      options: [
        "pinMode(5, INPUT); digitalWrite(5, HIGH);",
        "pinMode(5, OUTPUT); digitalWrite(5, HIGH);",
        "pinMode(5, OUTPUT); digitalRead(5);",
        "analogWrite(5, HIGH);",
      ],
      correct: 1,
      explanation:
        "Erst den Pin als OUTPUT setzen, dann mit digitalWrite(5, HIGH) einschalten. Ohne OUTPUT-Modus kann der Pin keinen Strom liefern.",
    },
    {
      type: "multiple-choice",
      question: "Was bewirkt der Befehl digitalWrite(8, LOW)?",
      options: [
        "Der Pin 8 wird eingeschaltet (5 Volt)",
        "Der Pin 8 wird ausgeschaltet (0 Volt) — die LED geht aus",
        "Der Pin 8 wird als Ausgang festgelegt",
        "Der Zustand von Pin 8 wird ausgelesen",
      ],
      correct: 1,
      explanation:
        "LOW setzt den Pin auf 0 Volt — die LED bekommt keinen Strom und geht aus. HIGH wäre 5 Volt (an).",
    },
    {
      type: "multiple-choice",
      question: "Wohin gehört der Befehl pinMode(8, OUTPUT)?",
      options: [
        "In setup(), weil er nur einmal am Anfang nötig ist",
        "In loop(), damit er ständig wiederholt wird",
        "Er ist gar nicht nötig",
        "Es ist egal, wo er steht",
      ],
      correct: 0,
      explanation:
        "pinMode legt einmalig fest, dass der Pin ein Ausgang ist. Das gehört in setup(), das genau einmal beim Start läuft.",
    },
    {
      type: "multiple-choice",
      question: "Das lange Beinchen einer LED ist…",
      options: [
        "der Pluspol (Anode) — es kommt Richtung Plus / Vorwiderstand",
        "der Minuspol (Kathode) und kommt an GND",
        "egal — eine LED kann man beliebig herum einbauen",
        "der Anschluss für ein Datenkabel",
      ],
      correct: 0,
      explanation:
        "Das lange Bein ist die Anode (Plus). Eine LED hat eine Richtung (Polung) — falsch herum leuchtet sie nicht. Kurzes Bein = Kathode (Minus) an GND.",
    },
    {
      type: "multiple-choice",
      question: "Was passiert, wenn du pinMode(8, OUTPUT) vergisst?",
      options: [
        "Die LED leuchtet trotzdem ganz normal",
        "Der Pin kann keinen Strom liefern — die LED bleibt dunkel",
        "Der Arduino startet gar nicht",
        "Die LED blinkt unkontrolliert",
      ],
      correct: 1,
      explanation:
        "Ohne OUTPUT ist der Pin kein richtiger Ausgang und versorgt die LED nicht zuverlässig mit Strom — sie bleibt dunkel.",
    },
    {
      type: "multiple-choice",
      question:
        "Welcher Widerstandswert ist der typische Standardwert für eine einfache LED am Arduino?",
      options: [
        "220 Ω",
        "10 Ω",
        "10 000 Ω (10 kΩ)",
        "0 Ω (kein Widerstand nötig)",
      ],
      correct: 0,
      explanation:
        "220 Ω begrenzt den Strom auf ein sicheres Maß, die LED leuchtet aber noch hell. 10 Ω lässt zu viel Strom durch, 10 kΩ macht sie sehr dunkel, ganz ohne Widerstand brennt sie durch.",
    },
    {
      type: "multiple-choice",
      question: "HIGH bedeutet an einem digitalen Pin…",
      options: [
        "5 Volt (eingeschaltet)",
        "0 Volt (ausgeschaltet)",
        "3 Volt (halbe Helligkeit)",
        "eine zufällige Spannung",
      ],
      correct: 0,
      explanation:
        "HIGH = 5 Volt = an, LOW = 0 Volt = aus. Eine halbe Helligkeit ginge nur mit analogWrite() / PWM, nicht mit digitalWrite().",
    },
  ],

  "grundlagen/was-ist-ein-arduino": [
    {
      type: "multiple-choice",
      question: "Wie groß ist ein Arduino ungefähr?",
      options: [
        "So groß wie ein Laptop",
        "Etwa so groß wie eine Kreditkarte",
        "So groß wie ein Smartphone-Ladegerät",
        "So klein wie ein Reiskorn",
      ],
      correct: 1,
      explanation:
        "In der Lektion wird der Arduino als kleine Schaltzentrale beschrieben, die nicht größer als eine Kreditkarte ist.",
    },
    {
      type: "multiple-choice",
      question: "Wofür stehen die drei Buchstaben beim EVA-Prinzip?",
      options: [
        "Eingabe, Verarbeitung, Ausgabe",
        "Energie, Verbrauch, Anschluss",
        "Erkennen, Vergleichen, Anzeigen",
        "Einschalten, Verbinden, Ausschalten",
      ],
      correct: 0,
      explanation:
        "EVA steht für Eingabe, Verarbeitung und Ausgabe — so arbeitet fast jedes technische System.",
    },
    {
      type: "multiple-choice",
      question:
        "Beim Nachtlicht-Beispiel: Was übernimmt im EVA-Prinzip die Eingabe?",
      options: [
        "Die LED, die leuchtet",
        "Der LDR, der die Helligkeit misst",
        "Der Arduino, der entscheidet",
        "Das Programm in der Arduino IDE",
      ],
      correct: 1,
      explanation:
        "Der LDR (Lichtsensor) misst die Helligkeit und liefert damit die Eingabe; der Arduino verarbeitet sie und die LED ist die Ausgabe.",
    },
    {
      type: "multiple-choice",
      question: "Was ist das Herzstück eines Arduino?",
      options: ["Ein Bildschirm", "Ein Mikrocontroller", "Eine Festplatte", "Ein Betriebssystem"],
      correct: 1,
      explanation:
        "Das Herzstück des Arduino ist ein Mikrocontroller, der immer nur eine Aufgabe ausführt, diese aber zuverlässig und ohne Pause.",
    },
    {
      type: "multiple-choice",
      question:
        "Was ist ein wichtiger Unterschied zwischen einem Computer und einem Arduino?",
      options: [
        "Der Arduino kann mehr Aufgaben gleichzeitig erledigen",
        "Der Arduino braucht ein Betriebssystem wie Windows",
        "Der Arduino hat kein Betriebssystem, sondern führt nur dein Programm aus",
        "Der Arduino verbraucht deutlich mehr Strom als ein Computer",
      ],
      correct: 2,
      explanation:
        "Anders als ein Computer hat der Arduino kein Betriebssystem — er führt nur das von dir geschriebene Programm aus und verbraucht dabei sehr wenig Strom.",
    },
    {
      type: "multiple-choice",
      question: "Für welche Aufgabe ist ein Arduino typischerweise gut geeignet?",
      options: [
        "Videos abspielen und im Internet surfen",
        "Etwas automatisch steuern, zum Beispiel eine Ampel",
        "Mehrere Spiele gleichzeitig starten",
        "Große Datenmengen wie ein PC speichern",
      ],
      correct: 1,
      explanation:
        "Ein Arduino wird überall dort eingesetzt, wo etwas automatisch gesteuert werden soll, etwa bei einer Ampelsteuerung, einem Bewässerungssystem oder einem Nachtlicht.",
    },
  ],

  "grundlagen/das-arduino-uno-board": [
    {
      type: "multiple-choice",
      question: "Wofür sind die digitalen Pins (0 bis 13) auf dem Arduino Uno gedacht?",
      options: [
        "Nur zum Messen von Temperatur und Licht",
        "Um das Board mit Strom zu versorgen",
        "Für Ein/Aus-Anschlüsse wie LEDs, Taster und Buzzer",
        "Um das Programm vom Computer hochzuladen",
      ],
      correct: 2,
      explanation:
        "Laut Lektion sind die digitalen Pins Ein/Aus-Anschlüsse und werden für LEDs, Taster und Buzzer genutzt.",
    },
    {
      type: "multiple-choice",
      question: "Welche Aufgabe hat der ATmega328P auf dem Board?",
      options: [
        "Er ist der Mikrocontroller-Chip und führt als 'Gehirn' dein Programm aus",
        "Er versorgt das Board mit 5V Strom",
        "Er verbindet das Board per USB mit dem Computer",
        "Er misst die Spannung von Sensoren",
      ],
      correct: 0,
      explanation:
        "Der ATmega328P ist der Mikrocontroller, das 'Gehirn' des Boards, das dein Programm ausführt.",
    },
    {
      type: "multiple-choice",
      question: "Warum musst du bei einem Stromkreis den GND-Anschluss anschließen?",
      options: [
        "Weil GND das Programm neu startet",
        "Weil GND die Spannung von 5V auf 3.3V senkt",
        "Weil ohne GND das Programm nicht hochgeladen werden kann",
        "Damit der Strom über GND zurückfließen kann und der Stromkreis geschlossen ist",
      ],
      correct: 3,
      explanation:
        "Jeder Stromkreis braucht Hin- und Rückweg: Der Strom fließt über GND zurück, sonst ist der Kreis nicht geschlossen und es passiert nichts.",
    },
    {
      type: "multiple-choice",
      question: "Welche Pins brauchst du, wenn du eine LED dimmen möchtest?",
      options: [
        "Die analogen Pins A0 bis A5",
        "PWM-Pins (mit ~ markiert, z.B. 3, 5, 6, 9, 10, 11)",
        "Den Reset-Button",
        "Die Strombuchse",
      ],
      correct: 1,
      explanation:
        "Nur die PWM-Pins (mit ~ markiert) können Zwischenwerte ausgeben und damit dimmen oder Motoren steuern.",
    },
    {
      type: "multiple-choice",
      question: "An welche Art von Pin schließt du einen Lichtsensor an?",
      options: [
        "An einen digitalen Pin (z.B. Pin 8)",
        "An den GND-Pin",
        "An einen analogen Pin (z.B. A0)",
        "An den USB-Anschluss",
      ],
      correct: 2,
      explanation:
        "Ein Lichtsensor misst Werte und braucht deshalb einen analogen Pin wie A0, der nicht nur an/aus, sondern Messwerte erfasst.",
    },
    {
      type: "multiple-choice",
      question: "Wie sind die Löcher der mittleren 5er-Reihen auf dem Breadboard verbunden?",
      options: [
        "Die ganze Reihe waagerecht über die volle Länge ist verbunden",
        "Es sind gar keine Löcher miteinander verbunden",
        "Alle Löcher des Breadboards sind untereinander verbunden",
        "Immer 5 Löcher senkrecht in einer Spalte sind verbunden",
      ],
      correct: 3,
      explanation:
        "Im Mittelbereich sind jeweils 5 Löcher senkrecht (eine Spalte) verbunden; die Mittelrinne trennt die obere von der unteren Hälfte.",
    },
  ],

  "grundlagen/strom-spannung-und-widerstand": [
    {
      type: "multiple-choice",
      question: "Welche Einheit gehört zur elektrischen Spannung (U)?",
      options: ["Volt (V)", "Ampere (A)", "Ohm", "Watt"],
      correct: 0,
      explanation:
        "Die Spannung wird in Volt (V) gemessen. Der Arduino liefert zum Beispiel 5 V.",
    },
    {
      type: "multiple-choice",
      question: "In der Wasser-Analogie aus der Lektion: Wofür steht der Widerstand (R)?",
      options: [
        "Für den Druck, mit dem das Wasser drückt",
        "Für eine enge Stelle im Rohr, die den Durchfluss bremst",
        "Für die Wassermenge, die pro Sekunde fließt",
        "Für die Länge des Rohrs",
      ],
      correct: 1,
      explanation:
        "Der Widerstand ist wie eine enge Stelle im Rohr: Je enger, desto weniger Wasser (Strom) fließt durch.",
    },
    {
      type: "multiple-choice",
      question: "Wie lautet das Ohmsche Gesetz?",
      options: [
        "I = U mal R",
        "I = U geteilt durch R",
        "I = R geteilt durch U",
        "I = U plus R",
      ],
      correct: 1,
      explanation:
        "Das Ohmsche Gesetz lautet I = U / R, also Strom = Spannung geteilt durch Widerstand.",
    },
    {
      type: "multiple-choice",
      question: "An einem Widerstand von 250 Ω liegen 5 V an. Wie groß ist der Strom?",
      options: ["0,02 A (20 mA)", "2 A", "50 mA", "1250 mA"],
      correct: 0,
      explanation:
        "Mit I = U / R ergibt sich 5 V / 250 Ω = 0,02 A, das sind 20 mA.",
    },
    {
      type: "multiple-choice",
      question:
        "Was passiert mit dem Strom, wenn der Widerstand bei gleicher Spannung größer wird?",
      options: [
        "Der Strom wird größer",
        "Der Strom wird kleiner",
        "Der Strom bleibt genau gleich",
        "Der Strom hört ganz auf",
      ],
      correct: 1,
      explanation:
        "Großer Widerstand bedeutet kleiner Strom: Eine engere Stelle lässt weniger durch.",
    },
    {
      type: "multiple-choice",
      question: "Warum braucht eine LED am Arduino einen Vorwiderstand?",
      options: [
        "Damit die LED heller leuchtet als ohne",
        "Damit die LED auch falsch herum leuchtet",
        "Weil sie sonst zu viel Strom zieht und durchbrennt",
        "Weil sie sonst zu wenig Spannung bekommt",
      ],
      correct: 2,
      explanation:
        "Ohne Vorwiderstand zieht die LED viel zu viel Strom und brennt durch. Der Vorwiderstand begrenzt den Strom auf einen sicheren Wert.",
    },
  ],

  "grundlagen/die-arduino-ide-und-dein-erstes-programm": [
    {
      type: "multiple-choice",
      question: "Was ist die Arduino IDE?",
      options: [
        "Das Programm auf dem Computer, in dem man den Code für den Arduino schreibt",
        "Ein Bauteil, das auf das Arduino-Board gesteckt wird",
        "Eine besondere LED, die auf dem Arduino eingebaut ist",
        "Ein Kabel, mit dem man den Arduino an den Strom anschließt",
      ],
      correct: 0,
      explanation:
        "Die Arduino IDE ist das Programm auf dem Computer, in dem man den Code schreibt — wie ein Texteditor mit Superkräften, der den Code auch auf den Arduino hochladen kann.",
    },
    {
      type: "multiple-choice",
      question: "Welcher Button prüft, ob dein Code Fehler hat?",
      options: ["Hochladen (Upload)", "Serial Monitor", "Überprüfen (Verify)", "Port auswählen"],
      correct: 2,
      explanation:
        "Der Button Überprüfen (Verify) mit dem Häkchen-Symbol prüft, ob der Code Fehler enthält. Beim Überprüfen wird der Code kompiliert.",
    },
    {
      type: "multiple-choice",
      question: "Was macht der Button Hochladen (Upload)?",
      options: [
        "Er speichert den Code nur auf dem Computer",
        "Er schickt den Code auf den Arduino",
        "Er zeigt Nachrichten vom Arduino an",
        "Er lädt die Arduino IDE aus dem Internet herunter",
      ],
      correct: 1,
      explanation:
        "Der Button Hochladen (Upload) mit dem Pfeil-Symbol schickt den fertigen Code auf den Arduino.",
    },
    {
      type: "multiple-choice",
      question:
        "Warum braucht man für das erste Programm Blink kein zusätzliches Bauteil?",
      options: [
        "Weil Blink ganz ohne LED funktioniert",
        "Weil die LED an Pin 13 schon auf dem Board eingebaut ist",
        "Weil die IDE die LED auf dem Bildschirm anzeigt",
        "Weil der Arduino den Strom selbst erzeugt",
      ],
      correct: 1,
      explanation:
        "Beim Blink-Programm blinkt die LED an Pin 13, die bereits auf dem Board eingebaut ist — man braucht also kein zusätzliches Bauteil.",
    },
    {
      type: "multiple-choice",
      question: "Was bewirkt die Zeile pinMode(13, OUTPUT); im Blink-Sketch?",
      options: [
        "Sie schaltet die LED sofort an",
        "Sie legt Pin 13 als Ausgang fest",
        "Sie lässt den Arduino 13 Sekunden warten",
        "Sie liest einen Wert von Pin 13 ein",
      ],
      correct: 1,
      explanation:
        "pinMode(13, OUTPUT) sagt dem Arduino, dass Pin 13 ein Ausgang ist — also ein Pin, über den der Arduino etwas ansteuert.",
    },
    {
      type: "multiple-choice",
      question: "Im Blink-Programm steht zweimal delay(1000);. Was bedeutet das?",
      options: [
        "Der Arduino wartet jeweils 1000 Millisekunden, also 1 Sekunde",
        "Der Arduino blinkt 1000-mal hintereinander",
        "Pin 1000 wird eingeschaltet",
        "Die LED bekommt 1000 Volt",
      ],
      correct: 0,
      explanation:
        "delay(1000) lässt den Arduino 1000 Millisekunden warten, das entspricht genau 1 Sekunde. Dadurch bleibt die LED je 1 Sekunde an und aus.",
    },
  ],

  "grundlagen/setup-und-loop": [
    {
      type: "multiple-choice",
      question: "Wie oft wird der Code in setup() ausgeführt?",
      options: [
        "Endlos immer wieder",
        "Genau einmal beim Start",
        "Gar nicht, er ist nur ein Kommentar",
        "Jedes Mal, wenn man einen Taster drückt",
      ],
      correct: 1,
      explanation:
        "setup() läuft laut Lektion einmal beim Start des Arduino, um alles einzurichten.",
    },
    {
      type: "multiple-choice",
      question: "Was passiert mit dem Code in loop()?",
      options: [
        "Er wird nur einmal am Anfang ausgeführt",
        "Er läuft erst, wenn setup() fertig gelöscht ist",
        "Er wird endlos immer wiederholt",
        "Er wird vom Arduino ignoriert",
      ],
      correct: 2,
      explanation:
        "loop() ist das Hauptprogramm und wird laut Lektion endlos wiederholt: loop -> loop -> loop ...",
    },
    {
      type: "multiple-choice",
      question:
        "In welchen Bereich gehört der Befehl pinMode(ledPin, OUTPUT) am besten?",
      options: [
        "In setup(), weil das Pins einmalig einrichtet",
        "In loop(), weil es sich ständig wiederholen muss",
        "Ganz oben bei den Variablen",
        "In keinen Bereich, das ist ein Kommentar",
      ],
      correct: 0,
      explanation:
        "pinMode() richtet einen Pin ein. Solche einmaligen Einrichtungen gehören laut Lektion in setup().",
    },
    {
      type: "multiple-choice",
      question: "Wo im Sketch legst du Namen wie int ledPin = 13; fest?",
      options: [
        "Mitten in loop()",
        "Direkt nach dem letzten Befehl in setup()",
        "Das darf man im Sketch gar nicht",
        "Ganz oben bei den Variablen, vor setup()",
      ],
      correct: 3,
      explanation:
        "Variablen werden laut Lektion im Bereich Variablen ganz oben vor setup() festgelegt, damit setup() und loop() den Namen nutzen können.",
    },
    {
      type: "multiple-choice",
      question: "In welcher Reihenfolge arbeitet der Arduino die Bereiche ab?",
      options: [
        "loop(), dann setup(), dann Variablen",
        "Variablen, dann setup(), dann loop() immer wieder",
        "setup(), dann Variablen, dann einmal loop()",
        "Erst loop() endlos, danach setup()",
      ],
      correct: 1,
      explanation:
        "Die Lektion nennt die feste Reihenfolge: Variablen -> setup() -> loop() -> loop() -> loop() ...",
    },
    {
      type: "multiple-choice",
      question: "Wozu dienen Kommentare, die mit // beginnen?",
      options: [
        "Sie schalten die LED ein",
        "Sie ersetzen das Semikolon am Befehlsende",
        "Sie sind nur Notizen für dich; der Arduino ignoriert sie",
        "Sie sorgen dafür, dass loop() nur einmal läuft",
      ],
      correct: 2,
      explanation:
        "Laut Lektion ignoriert der Arduino Kommentare mit //; sie sind nur als Erinnerung für dich gedacht.",
    },
  ],

  "digital/wechselblinker": [
    {
      type: "multiple-choice",
      question: "An welchen beiden Pins werden die LEDs beim Wechselblinker angeschlossen?",
      options: ["Pin 12 und Pin 13", "Pin 1 und Pin 2", "Pin 9 und Pin 10", "Pin 5 und Pin 6"],
      correct: 0,
      explanation:
        "Im Code steht int led1 = 12; und int led2 = 13; — die grüne LED hängt an Pin 12, die rote an Pin 13.",
    },
    {
      type: "multiple-choice",
      question: "Was bedeutet 'Wechselblinker' bei diesen zwei LEDs?",
      options: [
        "Beide LEDs leuchten immer gleichzeitig",
        "Immer eine LED ist an, die andere aus — dann umgekehrt",
        "Beide LEDs sind die ganze Zeit aus",
        "Die LEDs wechseln dauernd ihre Farbe",
      ],
      correct: 1,
      explanation:
        "Beim Wechselblinker ist in jedem Schritt eine LED an und die andere aus, danach tauschen sie — wie ein Polizeiauto.",
    },
    {
      type: "multiple-choice",
      question: "Welcher Befehl wird benutzt, um eine LED ein- oder auszuschalten?",
      options: ["pinMode()", "digitalWrite()", "delay()", "setup()"],
      correct: 1,
      explanation:
        "Mit digitalWrite(pin, HIGH) wird die LED eingeschaltet und mit digitalWrite(pin, LOW) ausgeschaltet.",
    },
    {
      type: "multiple-choice",
      question:
        "Was bewirken die beiden Zeilen digitalWrite(led1, HIGH); und digitalWrite(led2, LOW); zusammen?",
      options: [
        "Beide LEDs gehen an",
        "Beide LEDs gehen aus",
        "LED 1 geht an, LED 2 geht aus",
        "LED 1 geht aus, LED 2 geht an",
      ],
      correct: 2,
      explanation:
        "HIGH schaltet LED 1 ein, LOW schaltet LED 2 aus — so leuchtet genau eine der beiden LEDs.",
    },
    {
      type: "multiple-choice",
      question: "Wofür wird der Befehl delay(1000) im Code gebraucht?",
      options: [
        "Er schaltet eine LED dauerhaft aus",
        "Er lässt den Arduino 1 Sekunde (1000 Millisekunden) warten",
        "Er macht die LED heller",
        "Er verbindet die LED mit Pin 1000",
      ],
      correct: 1,
      explanation:
        "delay(1000) bedeutet 1000 Millisekunden = 1 Sekunde warten, bevor der nächste Schritt kommt.",
    },
    {
      type: "multiple-choice",
      question:
        "Du willst, dass die LEDs schneller im Wechsel blinken. Was musst du im Code ändern?",
      options: [
        "Den delay()-Wert kleiner machen, z.B. delay(500)",
        "Den delay()-Wert größer machen, z.B. delay(2000)",
        "HIGH und LOW vertauschen",
        "Die Pin-Nummern erhöhen",
      ],
      correct: 0,
      explanation:
        "Ein kleinerer delay()-Wert bedeutet kürzere Pausen, dadurch wechseln die LEDs schneller — z.B. delay(500) für einen Warnblinker.",
    },
    {
      type: "multiple-choice",
      question:
        "Warum sieht es für unsere Augen so aus, als würden beide digitalWrite-Befehle gleichzeitig passieren, obwohl sie untereinander stehen?",
      options: [
        "Weil der Arduino beide Zeilen wirklich exakt gleichzeitig ausführt",
        "Weil der Arduino sie in winzigen Mikrosekunden nacheinander ausführt",
        "Weil eine LED kaputt ist",
        "Weil delay() die Befehle zusammenfasst",
      ],
      correct: 1,
      explanation:
        "Der Arduino führt die Befehle in Mikrosekunden nacheinander aus — das ist so schnell, dass es für unsere Augen gleichzeitig wirkt.",
    },
    {
      type: "multiple-choice",
      question: "Welche Aufgabe haben die beiden pinMode()-Befehle im setup()?",
      options: [
        "Sie schalten die LEDs sofort an",
        "Sie legen fest, dass Pin 12 und Pin 13 als Ausgang (OUTPUT) arbeiten",
        "Sie bestimmen, wie lange die LEDs leuchten",
        "Sie verbinden die LEDs mit der GND-Schiene",
      ],
      correct: 1,
      explanation:
        "Mit pinMode(led1, OUTPUT); und pinMode(led2, OUTPUT); wird im setup() festgelegt, dass beide Pins als Ausgang arbeiten und LEDs steuern können.",
    },
  ],

  "digital/led-lauflicht": [
    {
      type: "multiple-choice",
      question: "An welche Pins werden die 5 LEDs beim Lauflicht angeschlossen?",
      options: [
        "Pin 1, 2, 3, 4 und 5",
        "Pin 8, 9, 10, 11 und 12",
        "Pin 0, 5, 10, 15 und 20",
        "Pin A0, A1, A2, A3 und A4",
      ],
      correct: 1,
      explanation:
        "Laut Lektion werden die 5 LEDs an die digitalen Pins 8, 9, 10, 11 und 12 angeschlossen.",
    },
    {
      type: "multiple-choice",
      question: "Welches Bauteil braucht jede einzelne LED zusätzlich, damit sie nicht kaputtgeht?",
      options: [
        "Einen Kondensator",
        "Einen zweiten Arduino",
        "Einen 220-Ohm-Widerstand",
        "Einen Taster",
      ],
      correct: 2,
      explanation:
        "Jede LED bekommt einen eigenen 220-Ohm-Widerstand, fünf insgesamt.",
    },
    {
      type: "multiple-choice",
      question: "Wie ist jede LED in der Schaltung aufgebaut?",
      options: [
        "220Ω → GND → LED → Pin",
        "GND → LED → Pin",
        "Pin → LED → Pin",
        "Pin → 220Ω → LED → GND",
      ],
      correct: 3,
      explanation:
        "Für alle 5 LEDs derselbe Weg: vom Pin über den 220-Ohm-Widerstand zur LED und dann zu GND (Masse).",
    },
    {
      type: "multiple-choice",
      question: "Welcher Befehl schaltet eine LED ein (zum Leuchten)?",
      options: [
        "digitalWrite(led1, HIGH);",
        "digitalWrite(led1, LOW);",
        "pinMode(led1, OUTPUT);",
        "delay(led1);",
      ],
      correct: 0,
      explanation:
        "digitalWrite(led1, HIGH) setzt den Pin auf HIGH und die LED leuchtet; LOW würde sie ausschalten.",
    },
    {
      type: "multiple-choice",
      question: "Wozu dient der Befehl delay(wartezeit); im Code?",
      options: [
        "Er schaltet die LED dauerhaft aus",
        "Er macht eine kurze Pause, damit die LED eine Weile sichtbar leuchtet",
        "Er legt fest, an welchem Pin die LED hängt",
        "Er macht die LED heller",
      ],
      correct: 1,
      explanation:
        "delay(wartezeit) hält das Programm kurz an, sodass jede LED eine Weile leuchtet, bevor die nächste drankommt.",
    },
    {
      type: "multiple-choice",
      question: "Was muss im setup für jede LED festgelegt werden?",
      options: [
        "digitalWrite(ledX, HIGH); — die LED wird eingeschaltet",
        "pinMode(ledX, INPUT); — der Pin wird als Eingang gesetzt",
        "pinMode(ledX, OUTPUT); — der Pin wird als Ausgang gesetzt",
        "delay(ledX); — eine Pause wird gesetzt",
      ],
      correct: 2,
      explanation:
        "Im setup wird jeder LED-Pin mit pinMode(..., OUTPUT) als Ausgang festgelegt, damit der Arduino Strom an die LED schicken kann.",
    },
    {
      type: "multiple-choice",
      question: "Beim Knight Rider (hin und zurück) — welche LEDs werden auf dem Rückweg ausgelassen?",
      options: [
        "Es wird keine ausgelassen",
        "LED 2 und LED 3",
        "LED 3 und LED 4",
        "LED 5 und LED 1",
      ],
      correct: 3,
      explanation:
        "Der Rückweg geht nur 4 → 3 → 2. LED 5 und LED 1 werden ausgelassen, damit die Bewegung flüssig bleibt.",
    },
    {
      type: "multiple-choice",
      question: "Was passiert, wenn du wartezeit von 200 auf 50 verkleinerst?",
      options: [
        "Das Lauflicht läuft schneller",
        "Das Lauflicht läuft langsamer",
        "Die LEDs leuchten heller",
        "Es leuchten mehr LEDs gleichzeitig",
      ],
      correct: 0,
      explanation:
        "wartezeit ist die Pause in Millisekunden. Eine kleinere Zahl bedeutet kürzere Pausen, also läuft das Lauflicht schneller.",
    },
  ],

  "digital/taster-als-eingabe": [
    {
      type: "multiple-choice",
      question:
        "Welcher Befehl liest den Zustand eines Pins ein, also ob am Pin ein Signal anliegt?",
      options: [
        "digitalWrite(pin, HIGH)",
        "digitalRead(pin)",
        "pinMode(pin, OUTPUT)",
        "Serial.begin(9600)",
      ],
      correct: 1,
      explanation:
        "Mit digitalRead(pin) liest der Arduino den Zustand eines Pins aus und erkennt so, ob ein Taster gedrückt ist.",
    },
    {
      type: "multiple-choice",
      question: "Was bedeutet es, wenn digitalRead() den Wert HIGH zurückgibt?",
      options: [
        "Der Pin ist kaputt",
        "Am Pin liegen 0 Volt an",
        "Am Pin liegen 5 Volt an",
        "Der Arduino sendet gerade Daten",
      ],
      correct: 2,
      explanation: "HIGH bedeutet, dass am Pin 5 Volt anliegen, LOW bedeutet 0 Volt.",
    },
    {
      type: "multiple-choice",
      question:
        "Du nutzt INPUT_PULLUP. Welchen Wert misst der Arduino, wenn der Taster gedrückt wird?",
      options: ["5 Volt", "HIGH", "Mal HIGH, mal LOW", "LOW"],
      correct: 3,
      explanation:
        "Bei INPUT_PULLUP ist die Logik umgekehrt: gedrückt ergibt LOW, nicht gedrückt ergibt HIGH.",
    },
    {
      type: "multiple-choice",
      question: "Warum gibt ein schwebender (floating) Pin zufällige Werte aus?",
      options: [
        "Weil der Pin mit nichts verbunden ist und der Arduino nicht weiß, ob er HIGH oder LOW messen soll",
        "Weil der Taster zu schnell gedrückt wird",
        "Weil 5 Volt zu viel Strom sind",
        "Weil der Serial Monitor nicht geöffnet ist",
      ],
      correct: 0,
      explanation:
        "Ohne feste Verbindung hängt der Pin in der Luft, daher misst der Arduino zufällig mal HIGH und mal LOW.",
    },
    {
      type: "multiple-choice",
      question: "Wozu dient ein Pull-up-Widerstand bei einem Taster?",
      options: [
        "Er zieht den Pin auf LOW (0V), solange der Taster nicht gedrückt ist",
        "Er zieht den Pin auf HIGH (5V), solange der Taster nicht gedrückt ist",
        "Er macht die LED heller",
        "Er erhöht die Spannung auf 9 Volt",
      ],
      correct: 1,
      explanation:
        "Der Pull-up-Widerstand zieht den Pin auf HIGH und sorgt für eine sichere Grundstellung, wenn der Taster nicht gedrückt ist.",
    },
    {
      type: "multiple-choice",
      question: "Mit welchem Befehl aktivierst du den eingebauten Pull-up-Widerstand des Arduino?",
      options: [
        "pinMode(pin, INPUT)",
        "pinMode(pin, OUTPUT)",
        "pinMode(pin, INPUT_PULLUP)",
        "digitalRead(pin, PULLUP)",
      ],
      correct: 2,
      explanation:
        "Mit pinMode(pin, INPUT_PULLUP) schaltet der Arduino seinen eingebauten Pull-up-Widerstand ein, ein externer Widerstand ist dann nicht nötig.",
    },
    {
      type: "multiple-choice",
      question: "Wie wird der Taster bei der INPUT_PULLUP-Methode angeschlossen?",
      options: [
        "Zwischen zwei verschiedenen GND-Anschlüssen",
        "Zwischen Pin und 5V, mit externem Widerstand",
        "Nur an 5V",
        "Zwischen Pin und GND, ohne externen Widerstand",
      ],
      correct: 3,
      explanation:
        "Bei INPUT_PULLUP wird der Taster einfach zwischen Pin und GND angeschlossen, ein externer Widerstand ist nicht erforderlich.",
    },
    {
      type: "multiple-choice",
      question: "Was versteht man unter dem Prellen (Bouncing) eines Tasters?",
      options: [
        "Der Kontakt springt beim Drücken kurz hin und her, sodass ein Druck mehrfach erkannt wird",
        "Der Taster wird zu heiß und schaltet ab",
        "Die LED blinkt unkontrolliert",
        "Der Pin liefert dauerhaft 5 Volt",
      ],
      correct: 0,
      explanation:
        "Beim Prellen springt der Kontakt für wenige Millisekunden hin und her, dagegen hilft im Code ein delay(50).",
    },
  ],

  "digital/led-mit-taster-steuern": [
    {
      type: "multiple-choice",
      question:
        "Welche Programmstruktur sorgt dafür, dass der Arduino eine Entscheidung treffen kann (Taster gedrückt oder nicht)?",
      options: [
        "Die pinMode-Funktion",
        "Die if/else-Struktur",
        "Die delay-Funktion",
        "Die digitalWrite-Funktion",
      ],
      correct: 1,
      explanation:
        "Mit if und else trifft der Arduino Entscheidungen: Ist die Bedingung wahr, läuft der if-Teil, sonst der else-Teil.",
    },
    {
      type: "multiple-choice",
      question: "Mit welchem Befehl liest der Arduino ein, ob der Taster gerade gedrückt ist?",
      options: [
        "pinMode(tasterPin, OUTPUT)",
        "digitalWrite(tasterPin, HIGH)",
        "digitalRead(tasterPin)",
        "delay(tasterPin)",
      ],
      correct: 2,
      explanation:
        "digitalRead(tasterPin) liest den Zustand des Eingangs-Pins ein und gibt zurück, ob dort HIGH oder LOW anliegt.",
    },
    {
      type: "multiple-choice",
      question: "Warum bedeutet bei dieser Schaltung LOW, dass der Taster gedrückt ist?",
      options: [
        "Weil die LED den Pin auf LOW zieht, sobald sie leuchtet",
        "Weil ein gedrückter Taster immer Strom liefert und HIGH erzeugt",
        "Weil digitalRead beim Drücken automatisch HIGH zurückgibt",
        "Weil INPUT_PULLUP den Pin auf HIGH zieht und der Druck ihn mit GND auf LOW verbindet",
      ],
      correct: 3,
      explanation:
        "INPUT_PULLUP zieht den Pin im Ruhezustand auf HIGH. Erst beim Drücken wird der Pin mit GND verbunden und damit LOW.",
    },
    {
      type: "multiple-choice",
      question: "Was passiert in Version 1, wenn die Bedingung if (zustand == LOW) wahr ist?",
      options: [
        "digitalWrite(ledPin, HIGH) schaltet die LED an",
        "digitalWrite(ledPin, LOW) schaltet die LED aus",
        "Der Taster wird auf OUTPUT gestellt",
        "Das Programm startet neu von vorne",
      ],
      correct: 0,
      explanation:
        "Ist zustand == LOW (Taster gedrückt), wird der if-Teil ausgeführt und digitalWrite(ledPin, HIGH) schaltet die LED an.",
    },
    {
      type: "multiple-choice",
      question: "Was ist der häufigste Anfänger-Fehler, vor dem die Lektion warnt?",
      options: [
        "HIGH mit LOW zu verwechseln",
        "= (Zuweisung) mit == (Vergleich) zu verwechseln",
        "setup mit loop zu verwechseln",
        "int mit bool zu verwechseln",
      ],
      correct: 1,
      explanation:
        "== vergleicht zwei Werte, = setzt einen Wert. Schreibt man if (zustand = LOW), wird der Wert gesetzt und die Bedingung ist immer wahr.",
    },
    {
      type: "multiple-choice",
      question: "Welche zwei Werte kann ein Datentyp bool annehmen?",
      options: ["0 bis 255", "HIGH oder LOW", "true oder false", "an, aus oder unbekannt"],
      correct: 2,
      explanation: "bool kann nur true (wahr) oder false (falsch) sein, also genau zwei Werte.",
    },
    {
      type: "multiple-choice",
      question: "Was bewirkt das Ausrufezeichen ! bei einem bool-Wert, z.B. in ledAn = !ledAn?",
      options: [
        "Es macht aus dem bool eine Zahl",
        "Es verdoppelt den Wert",
        "Es löscht die Variable komplett",
        "Es dreht den Wert um: aus true wird false und umgekehrt",
      ],
      correct: 3,
      explanation:
        "Das ! kehrt den bool-Wert um. War ledAn vorher false, wird es true und umgekehrt — so entsteht der Toggle-Effekt.",
    },
    {
      type: "multiple-choice",
      question: "Wozu dient die Variable letzterDruck im Toggle-Programm?",
      options: [
        "Sie merkt sich, ob der Taster im letzten Durchlauf schon gedrückt war, damit nur bei einem NEUEN Druck umgeschaltet wird",
        "Sie zählt, wie oft die LED insgesamt geleuchtet hat",
        "Sie speichert, an welchem Pin der Taster angeschlossen ist",
        "Sie misst, wie lange der Taster gedrückt gehalten wird",
      ],
      correct: 0,
      explanation:
        "letzterDruck speichert den Tasterzustand vom vorherigen Durchlauf. So wird nur einmal umgeschaltet, auch wenn man den Taster gedrückt hält.",
    },
  ],

  "digital/einfache-ampelschaltung": [
    {
      type: "multiple-choice",
      question: "An welche Pins werden die drei LEDs der Ampelschaltung angeschlossen?",
      options: [
        "Rot an Pin 2, Gelb an Pin 3, Grün an Pin 4",
        "Rot an Pin 1, Gelb an Pin 2, Grün an Pin 3",
        "Alle drei LEDs an Pin 13",
        "Rot an Pin 4, Gelb an Pin 3, Grün an Pin 2",
      ],
      correct: 0,
      explanation:
        "Laut Lektion liegt die rote LED an Pin 2, die gelbe an Pin 3 und die grüne an Pin 4.",
    },
    {
      type: "multiple-choice",
      question: "In welcher Reihenfolge durchläuft die deutsche Ampel ihre vier Phasen?",
      options: [
        "Rot → Grün → Gelb → Rot-Gelb",
        "Rot → Rot-Gelb → Grün → Gelb",
        "Grün → Gelb → Rot → Rot-Gelb",
        "Rot → Gelb → Grün → Rot-Gelb",
      ],
      correct: 1,
      explanation:
        "Die deutsche Ampel folgt dem Ablauf Rot, dann Rot-Gelb, dann Grün und schließlich Gelb, bevor es wieder von vorne beginnt.",
    },
    {
      type: "multiple-choice",
      question:
        "Welche Ampelphase gibt es laut Lektion vor allem in Deutschland und nur in wenigen anderen Ländern?",
      options: [
        "Die Phase Rot-Gelb",
        "Die Phase nur Gelb",
        "Die Phase nur Grün",
        "Die Phase nur Rot",
      ],
      correct: 0,
      explanation:
        "In vielen Ländern springt die Ampel direkt von Rot auf Grün. Die Phase Rot-Gelb ist eine deutsche Besonderheit.",
    },
    {
      type: "multiple-choice",
      question: "Wie lange dauert die Grün-Phase in der Ampelschaltung der Lektion?",
      options: ["1 Sekunde", "2 Sekunden", "5 Sekunden", "10 Sekunden"],
      correct: 2,
      explanation: "Laut Phasentabelle und Code (delay(5000)) leuchtet Grün 5 Sekunden lang.",
    },
    {
      type: "multiple-choice",
      question: "Mit welchem Befehl schaltest du eine bestimmte LED an einem Pin ein?",
      options: [
        "pinMode(rotPin, OUTPUT)",
        "delay(rotPin)",
        "digitalWrite(rotPin, HIGH)",
        "digitalWrite(rotPin, LOW)",
      ],
      correct: 2,
      explanation:
        "digitalWrite(pin, HIGH) schaltet den Pin auf AN. Mit LOW würde die LED ausgeschaltet.",
    },
    {
      type: "multiple-choice",
      question: "Wofür sorgt der Befehl delay(1000) im Ampel-Code?",
      options: [
        "Der Arduino wartet 1 Sekunde",
        "Der Arduino wartet 1000 Sekunden",
        "Der Arduino schaltet alle LEDs auf einmal an",
        "Der Arduino startet das Programm neu",
      ],
      correct: 0,
      explanation:
        "delay(millisekunden) hält das Programm an. 1000 Millisekunden sind genau 1 Sekunde.",
    },
    {
      type: "multiple-choice",
      question: "Was ist laut Lektion der Nachteil von delay()?",
      options: [
        "delay() macht die LEDs dunkler",
        "Während delay() läuft, kann der Arduino nichts anderes tun",
        "delay() funktioniert nur mit roten LEDs",
        "delay() verbraucht zu viel Strom",
      ],
      correct: 1,
      explanation:
        "Während delay() läuft, ist der Arduino sozusagen eingefroren und kann nichts anderes erledigen. Für komplexere Projekte lernt man später millis().",
    },
    {
      type: "multiple-choice",
      question: "Warum lohnt es sich, eine eigene Funktion wie ampelSchalten() zu verwenden?",
      options: [
        "Damit die LEDs heller leuchten",
        "Damit der Arduino schneller hochfährt",
        "Weil man dann keine Widerstände mehr braucht",
        "Weil der Code kürzer und übersichtlicher wird und Änderungen nur an einer Stelle nötig sind",
      ],
      correct: 3,
      explanation:
        "Die Hilfsfunktion fasst die wiederkehrenden Befehle zusammen. Der Code wird kürzer und lesbarer, und Änderungen muss man nur an einer Stelle vornehmen.",
    },
  ],
  "analog/spannungsteiler-verstehen": [
    {
      type: "multiple-choice",
      question: "Was macht ein Spannungsteiler aus zwei Widerstaenden, die in Reihe zwischen +5 V und GND liegen?",
      options: [
        "Er teilt die Versorgungsspannung auf, sodass am Abgriff in der Mitte eine kleinere Spannung U2 anliegt.",
        "Er verdoppelt die 5 V auf 10 V am Abgriff.",
        "Er macht aus Gleichspannung eine Wechselspannung.",
        "Er liefert am Abgriff immer genau 5 V, egal welche Widerstaende man nimmt.",
      ],
      correct: 0,
      explanation:
        "Am Abgriff in der Mitte liegt eine Teilspannung U2 an, die kleiner als 5 V ist. Ein Teiler kann nicht verdoppeln (kein 10 V), erzeugt keine Wechselspannung und liefert nicht immer 5 V - U2 haengt vom Widerstandsverhaeltnis ab.",
    },
    {
      type: "multiple-choice",
      question: "Mit welcher Formel berechnet man die abgegriffene Spannung U2?",
      options: [
        "U2 = Uges · R1 / (R1 + R2)",
        "U2 = Uges · R2 / (R1 + R2)",
        "U2 = Uges · (R1 + R2) / R2",
        "U2 = Uges · R2 / R1",
      ],
      correct: 1,
      explanation:
        "Im Zaehler steht der untere Widerstand R2 (an dem U2 abgegriffen wird), im Nenner die Summe beider Widerstaende. Mit R1 im Zaehler bekaeme man die Spannung an R1, die anderen beiden Brueche sind keine gueltige Teilerformel.",
    },
    {
      type: "multiple-choice",
      question: "Du baust einen Spannungsteiler mit zwei gleich grossen 10-kΩ-Widerstaenden an 5 V. Welche Spannung misst das Multimeter am Abgriff?",
      options: [
        "5 V, weil beide Widerstaende gleich sind",
        "0 V, weil sich die Widerstaende aufheben",
        "2,5 V, weil die Spannung genau halbiert wird",
        "1,25 V, weil ein Viertel uebrig bleibt",
      ],
      correct: 2,
      explanation:
        "Bei zwei gleichen Widerstaenden wird die Spannung genau halbiert: 5 V · 10/(10+10) = 2,5 V. Gleiche Widerstaende heben sich nicht auf (nicht 0 V) und liefern auch nicht die volle Spannung (nicht 5 V).",
    },
    {
      type: "multiple-choice",
      question: "R1 = 10 kΩ und R2 = 20 kΩ liegen an 5 V. Wie gross ist U2?",
      options: [
        "1,67 V",
        "2,50 V",
        "3,33 V",
        "5,00 V",
      ],
      correct: 2,
      explanation:
        "U2 = 5 V · 20/(10+20) = 5 V · 2/3 ≈ 3,33 V - der groessere untere Widerstand bekommt das groessere Stueck. 1,67 V ergaebe sich, wenn man R1 und R2 vertauscht; 2,50 V nur bei gleichen Widerstaenden.",
    },
    {
      type: "multiple-choice",
      question: "Welche Eselsbruecke beschreibt richtig, wie sich U2 verhaelt?",
      options: [
        "Unten waechst, U2 waechst - je groesser R2, desto groesser U2.",
        "Oben waechst, U2 waechst - je groesser R1, desto groesser U2.",
        "U2 bleibt immer gleich, egal wie gross die Widerstaende sind.",
        "Je kleiner beide Widerstaende, desto groesser U2.",
      ],
      correct: 0,
      explanation:
        "Je groesser der untere Widerstand R2 im Verhaeltnis, desto mehr Spannung bleibt fuer U2 - daher unten waechst, U2 waechst. Ein groesseres R1 (oben) macht U2 dagegen kleiner, und U2 ist keineswegs konstant.",
    },
    {
      type: "multiple-choice",
      question: "Warum steckt ein Spannungsteiler in fast jedem analogen Sensor (z. B. NTC oder LDR)?",
      options: [
        "Weil der Sensor seinen Widerstand aendert und sich dadurch U2 aendert.",
        "Weil der Sensor die 5 V auf 12 V hochsetzt.",
        "Weil der Sensor die Spannung in Strom umwandelt, den der Arduino zaehlt.",
        "Weil der Sensor das Programm direkt steuert, ohne dass sich eine Spannung aendert.",
      ],
      correct: 0,
      explanation:
        "Ein NTC oder LDR ist ein veraenderlicher Widerstand: aendert er sich, aendert sich auch U2 - genau dieses Spannungssignal liest der Arduino ein. Ein Sensor setzt die Spannung nicht hoch und wandelt sie nicht in einen gezaehlten Strom um.",
    },
    {
      type: "multiple-choice",
      question: "In einem Teiler ist R1 = 10 kΩ fest, R2 ist ein NTC. Bei Hitze sinkt der NTC von 10 kΩ auf 4 kΩ. Was passiert mit U2 (Versorgung 5 V)?",
      options: [
        "U2 steigt von 2,5 V auf etwa 3,5 V.",
        "U2 bleibt unveraendert bei 2,5 V.",
        "U2 sinkt von 2,5 V auf etwa 1,43 V.",
        "U2 springt sofort auf 5 V.",
      ],
      correct: 2,
      explanation:
        "Wird der untere Widerstand kleiner, wird auch U2 kleiner: 5 V · 4/(10+4) ≈ 1,43 V. Da R2 sinkt, kann U2 nicht steigen oder gleich bleiben, und auf die volle Versorgungsspannung springt es nur, wenn der obere Widerstand verschwindet.",
    },
    {
      type: "multiple-choice",
      question: "Mit welchem Befehl liest der Arduino die Spannung U2 am Abgriff spaeter als Zahl ein?",
      options: [
        "digitalWrite(pin, HIGH)",
        "analogRead(pin)",
        "delay(1000)",
        "pinMode(pin, OUTPUT)",
      ],
      correct: 1,
      explanation:
        "analogRead(pin) wandelt die anliegende Spannung in eine Zahl von 0 bis 1023 um - so wird aus U2 ein verarbeitbarer Wert. digitalWrite schaltet nur an/aus, delay wartet, und pinMode legt nur die Pin-Richtung fest.",
    },
  ],

  "analog/analoge-eingaenge": [
    {
      type: "multiple-choice",
      question: "Was ist der wichtigste Unterschied zwischen einem digitalen und einem analogen Eingang am Arduino?",
      options: [
        "Ein digitaler Eingang kennt nur die Werte 0 oder 1, ein analoger Eingang erkennt viele Werte dazwischen",
        "Ein analoger Eingang ist schneller als ein digitaler Eingang",
        "Ein digitaler Eingang funktioniert nur mit 5V, ein analoger nur mit 3V",
        "Ein analoger Eingang kann nur an oder aus erkennen, ein digitaler alle Stufen",
      ],
      correct: 0,
      explanation:
        "Digital ist wie ein Lichtschalter (nur an/aus = LOW/HIGH), analog wie ein Dimmer mit allen Werten dazwischen. Die letzte Option vertauscht genau diese beiden Begriffe.",
    },
    {
      type: "multiple-choice",
      question: "Welchen Wertebereich liefert der Befehl analogRead() zurück?",
      options: [
        "0 bis 100",
        "0 bis 255",
        "0 bis 1023",
        "0 bis 5",
      ],
      correct: 2,
      explanation:
        "analogRead() liefert immer Werte von 0 bis 1023, weil der Arduino einen 10-Bit-Wandler mit 1024 Stufen hat. 0 bis 255 wäre 8 Bit, 0 bis 5 ist die Spannung in Volt, nicht der Messwert.",
    },
    {
      type: "multiple-choice",
      question: "An welche Pins schliesst du ein Potentiometer an, um es mit analogRead() auszulesen?",
      options: [
        "An die digitalen Pins 0 bis 13",
        "An die analogen Pins A0 bis A5",
        "Nur an Pin 13 (LED-Pin)",
        "An den USB-Anschluss",
      ],
      correct: 1,
      explanation:
        "Analoge Eingänge liegen an den Pins A0 bis A5. Die Pins 0 bis 13 sind die digitalen Pins (für digitalRead/digitalWrite), nicht für analogRead gedacht.",
    },
    {
      type: "multiple-choice",
      question: "Du drehst das Potentiometer genau in die Mittelstellung. Welchen Wert zeigt der Serial Monitor ungefähr an?",
      options: [
        "0",
        "ungefähr 512",
        "1023",
        "2,5",
      ],
      correct: 1,
      explanation:
        "In der Mitte liegt etwa die halbe Spannung an, also etwa die Hälfte von 1023, das ergibt rund 512. 0 ist ganz links, 1023 ganz rechts, und 2,5 wäre die Spannung in Volt.",
    },
    {
      type: "multiple-choice",
      question: "Warum reicht der analogRead()-Wert genau bis 1023 und nicht weiter?",
      options: [
        "Weil der Arduino nur bis 1023 zählen kann",
        "Weil 1023 die höchste gerade Zahl ist",
        "Weil der 10-Bit-Wandler die Spannung in 1024 Stufen (0 bis 1023) aufteilt",
        "Weil das Potentiometer maximal 1023 Ohm hat",
      ],
      correct: 2,
      explanation:
        "Der 10-Bit-Analog-Digital-Wandler teilt 0V bis 5V in 1024 Stufen auf, gezählt von 0 bis 1023. Mit dem Widerstand des Potentiometers in Ohm oder der Zählgrenze des Arduino hat diese Zahl nichts zu tun.",
    },
    {
      type: "multiple-choice",
      question: "Welcher Befehl muss im setup() stehen, damit du die Werte im Serial Monitor sehen kannst?",
      options: [
        "Serial.begin(9600);",
        "pinMode(A0, INPUT);",
        "analogRead(A0);",
        "Serial.println(9600);",
      ],
      correct: 0,
      explanation:
        "Serial.begin(9600) startet die Verbindung zum Serial Monitor und gehört ins setup(). pinMode brauchst du für analoge Pins gar nicht, analogRead und Serial.println gehören in den loop().",
    },
    {
      type: "multiple-choice",
      question: "Ein Mitschüler schreibt im setup() den Befehl pinMode(A0, INPUT);, bevor er analogRead(A0) nutzt. Was stimmt?",
      options: [
        "Ohne diese Zeile funktioniert analogRead() gar nicht",
        "Diese Zeile ist nötig, damit der Pin Spannung liefert",
        "Diese Zeile ist nicht nötig, weil analoge Pins automatisch Eingänge sind",
        "Diese Zeile macht aus dem analogen Pin einen digitalen Pin",
      ],
      correct: 2,
      explanation:
        "Für analogRead() braucht man keinen pinMode-Befehl, die analogen Pins sind automatisch als Eingang konfiguriert. Die Zeile schadet zwar nicht, ist aber überflüssig und ändert die Pin-Art nicht.",
    },
    {
      type: "multiple-choice",
      question: "Du willst den Messwert in Volt umrechnen. Welche Schreibweise liefert ein genaues Ergebnis mit Nachkommastellen?",
      options: [
        "float volt = wert * 5 / 1023;",
        "float volt = wert * 5.0 / 1023;",
        "float volt = wert / 1023 * 5;",
        "float volt = wert * 1023 / 5;",
      ],
      correct: 1,
      explanation:
        "Nur mit dem Punkt bei 5.0 rechnet der Arduino mit Kommazahlen, sonst schneidet er die Nachkommastellen ab. Bei wert/1023 ohne Punkt käme zuerst 0 heraus, und wert*1023/5 ist die falsche Formel.",
    },
  ],

  "analog/pwm-dimmen-statt-schalten": [
    {
      type: "multiple-choice",
      question: "Wofuer steht die Abkuerzung PWM?",
      options: [
        "Power-Watt-Messung",
        "Puls-Weiten-Modulation",
        "Pin-Wechsel-Methode",
        "Programm-Wert-Modus",
      ],
      correct: 1,
      explanation:
        "PWM steht fuer Puls-Weiten-Modulation: Der Pin wird sehr schnell ein- und ausgeschaltet, sodass eine Durchschnittshelligkeit entsteht. Die anderen Begriffe klingen aehnlich technisch, kommen aber in der Lektion nicht vor und sind erfunden.",
    },
    {
      type: "multiple-choice",
      question: "Welchen Befehl brauchst du, um eine LED zu dimmen (stufenlos heller und dunkler machen)?",
      options: [
        "analogWrite()",
        "digitalWrite()",
        "analogRead()",
        "pinMode()",
      ],
      correct: 0,
      explanation:
        "Zum Dimmen nutzt man analogWrite(), das viele Helligkeitsstufen ausgeben kann. digitalWrite() kennt nur an/aus, analogRead() liest einen Eingang und pinMode() legt nur die Richtung des Pins fest.",
    },
    {
      type: "multiple-choice",
      question: "Welchen Wertebereich erwartet analogWrite()?",
      options: [
        "0 bis 100",
        "0 bis 1023",
        "0 bis 255",
        "0 bis 490",
      ],
      correct: 2,
      explanation:
        "analogWrite() arbeitet mit Werten von 0 bis 255 (255 = volle Helligkeit). 0 bis 1023 gehoert zu analogRead (Eingang), 100 waere Prozent und 490 ist die PWM-Frequenz pro Sekunde.",
    },
    {
      type: "multiple-choice",
      question: "Du moechtest eine LED per analogWrite() dimmen. An welchen Pin musst du sie anschliessen?",
      options: [
        "An jeden beliebigen digitalen Pin",
        "An einen Pin mit Tilde, z.B. ~9",
        "An einen Analog-Pin wie A0",
        "An Pin 8",
      ],
      correct: 1,
      explanation:
        "analogWrite() funktioniert nur an PWM-Pins, die auf dem Board mit einer Tilde (~) markiert sind, z.B. ~9. Ein normaler Pin wie 8 schaltet nur ganz an/aus, und A0-Pins sind Eingaenge zum Auslesen.",
    },
    {
      type: "multiple-choice",
      question: "Was ist der Hauptunterschied zwischen analogRead() und analogWrite()?",
      options: [
        "analogRead() schreibt Werte raus, analogWrite() liest Werte ein",
        "analogRead() liest einen Eingang (0-1023), analogWrite() schreibt einen Ausgang (0-255)",
        "Beide lesen Werte ein, nur mit anderem Bereich",
        "analogRead() ist fuer LEDs, analogWrite() fuer Sensoren",
      ],
      correct: 1,
      explanation:
        "analogRead() ist ein Eingang und liefert Werte von 0 bis 1023 (z.B. vom Sensor), analogWrite() ist ein Ausgang und schreibt Werte von 0 bis 255 (z.B. zur LED). Die anderen Optionen vertauschen Richtung oder Aufgabe der beiden Befehle.",
    },
    {
      type: "multiple-choice",
      question: "Mit welchem Befehl rechnest du den Poti-Wert (0 bis 1023) in einen passenden Wert fuer analogWrite() (0 bis 255) um?",
      options: [
        "delay()",
        "Serial.print()",
        "pinMode()",
        "map()",
      ],
      correct: 3,
      explanation:
        "map() rechnet einen Wertebereich in einen anderen um, z.B. map(potiWert, 0, 1023, 0, 255). delay() wartet nur, Serial.print() zeigt Werte an und pinMode() stellt die Pin-Richtung ein.",
    },
    {
      type: "multiple-choice",
      question: "Ungefaehr wie hell leuchtet eine LED bei analogWrite(9, 127)?",
      options: [
        "Etwa halb so hell (rund 50%)",
        "Gar nicht, die LED bleibt aus",
        "Voll an (100%)",
        "Nur ganz kurz an, dann aus",
      ],
      correct: 0,
      explanation:
        "127 liegt etwa in der Mitte zwischen 0 und 255, daher leuchtet die LED rund 50 Prozent hell. 0 waere aus, 255 waere voll an, und ein kurzes Aufblitzen passt zu keinem festen analogWrite-Wert.",
    },
    {
      type: "multiple-choice",
      question: "Du schliesst die LED versehentlich an Pin 8 an (kein PWM-Pin) und nutzt analogWrite(8, 127). Was passiert?",
      options: [
        "Die LED leuchtet trotzdem genau halb hell",
        "Der Arduino geht kaputt",
        "Die LED leuchtet nicht halb hell, sondern wird nur ganz an oder ganz aus geschaltet",
        "Pin 8 wird automatisch zu einem PWM-Pin",
      ],
      correct: 2,
      explanation:
        "An einem Pin ohne Tilde funktioniert echtes Dimmen nicht: Statt halber Helligkeit wird die LED nur ganz an oder ganz aus geschaltet. Der Arduino nimmt dabei keinen Schaden und ein Pin kann nicht von selbst zum PWM-Pin werden.",
    },
  ],

  "analog/lichtsensor-ldr": [
    {
      type: "multiple-choice",
      question: "Wofuer steht die Abkuerzung LDR und was macht dieses Bauteil?",
      options: [
        "Es ist ein lichtabhaengiger Widerstand: Er aendert seinen Widerstand je nachdem, wie hell es ist.",
        "Es ist eine besonders helle LED, die man zum Beleuchten benutzt.",
        "Es ist ein Sensor, der die Temperatur in der Umgebung misst.",
        "Es ist ein fester Widerstand, der immer genau 10 kOhm hat.",
      ],
      correct: 0,
      explanation:
        "LDR heisst Light Dependent Resistor, also lichtabhaengiger Widerstand. Eine LED leuchtet, misst aber nichts; Temperatur misst ein anderer Sensor; und der feste 10-kOhm-Widerstand ist in der Schaltung das Gegenstueck zum LDR, nicht der LDR selbst.",
    },
    {
      type: "multiple-choice",
      question: "Wie veraendert sich der Widerstand des LDR, wenn es HELLER wird?",
      options: [
        "Der Widerstand bleibt gleich, nur die Spannung aendert sich.",
        "Der Widerstand wird groesser (z.B. von 1 kOhm auf 100 kOhm).",
        "Der Widerstand wird kleiner (z.B. von 100 kOhm auf 1 kOhm).",
        "Der LDR wird heiss und schaltet sich ab.",
      ],
      correct: 2,
      explanation:
        "Bei Helligkeit sinkt der LDR-Widerstand (hell ~1 kOhm, dunkel ~100 kOhm) - wie die Pupille, die bei Licht klein wird. Dass der Widerstand steigt, ist genau der umgekehrte Denkfehler; gleich bleibt er nicht, und mit Hitze hat das nichts zu tun.",
    },
    {
      type: "multiple-choice",
      question: "Warum braucht man fuer den LDR ueberhaupt einen Spannungsteiler mit einem 10-kOhm-Widerstand?",
      options: [
        "Damit der LDR nicht zu heiss wird und kaputtgeht.",
        "Weil der Arduino keinen Widerstand direkt messen kann, sondern nur Spannung.",
        "Weil der LDR sonst zu wenig Strom bekommt, um zu leuchten.",
        "Damit man zwei LDR gleichzeitig anschliessen kann.",
      ],
      correct: 1,
      explanation:
        "Der Arduino kann nur eine Spannung messen, keinen Widerstand. Der Spannungsteiler wandelt die Widerstandsaenderung des LDR in eine messbare Spannung um. Ein LDR leuchtet nicht, und mit Ueberhitzung oder zwei Sensoren hat der Spannungsteiler nichts zu tun.",
    },
    {
      type: "multiple-choice",
      question: "In welcher Reihenfolge ist die Schaltung in dieser Lektion aufgebaut?",
      options: [
        "GND -> LDR -> A0 -> 10-kOhm-Widerstand -> 5V",
        "A0 -> 5V -> LDR -> 10-kOhm-Widerstand -> GND",
        "5V -> 10-kOhm-Widerstand -> A0 -> LDR -> GND",
        "5V -> LDR -> Knotenpunkt (A0) -> 10-kOhm-Widerstand -> GND",
      ],
      correct: 3,
      explanation:
        "In dieser Schaltung liegt der LDR oben an 5V, dann folgt der Knotenpunkt mit A0 und darunter der 10-kOhm-Widerstand zu GND. Die anderen Reihenfolgen vertauschen Plus und Minus oder setzen LDR und Festwiderstand falsch herum - dann wuerde die Messung nicht zur Lektion passen.",
    },
    {
      type: "multiple-choice",
      question: "Es ist HELL. Welchen Wert zeigt analogRead(A0) bei dieser Schaltung ungefaehr an?",
      options: [
        "Einen hohen Wert (etwa 920).",
        "Einen niedrigen Wert (etwa 100).",
        "Immer genau 512, egal wie hell es ist.",
        "Gar keinen Wert, weil der LDR bei Licht den Strom sperrt.",
      ],
      correct: 0,
      explanation:
        "Bei Helligkeit wird der LDR-Widerstand klein, fast die ganze Spannung faellt ueber dem unteren 10-kOhm-Widerstand ab, und genau die misst A0 - daher ein hoher Wert (~920). Der niedrige Wert gilt fuer Dunkelheit; 512 waere nur Zufall, und der LDR sperrt nichts.",
    },
    {
      type: "multiple-choice",
      question: "Du deckst den LDR mit der Hand ab (es wird dunkel). Was passiert mit dem analogRead-Wert?",
      options: [
        "Er bleibt unveraendert, weil A0 nur die 5V misst.",
        "Er steigt auf etwa 1000.",
        "Er sinkt auf einen niedrigen Wert (etwa 100).",
        "Er springt auf negative Werte.",
      ],
      correct: 2,
      explanation:
        "Dunkel bedeutet hoher LDR-Widerstand, dadurch faellt nur noch wenig Spannung ueber dem 10-kOhm-Widerstand ab, und A0 misst einen niedrigen Wert (~100). Ein Anstieg waere der umgekehrte Fall (hell), unveraendert bleibt der Wert nicht, und negativ kann analogRead nie werden (0 bis 1023).",
    },
    {
      type: "multiple-choice",
      question: "Welche Code-Zeile liest den Lichtwert des LDR vom Pin A0 ein?",
      options: [
        "digitalWrite(A0, HIGH);",
        "ldrWert = analogRead(ldrPin);",
        "Serial.begin(9600);",
        "pinMode(A0, OUTPUT);",
      ],
      correct: 1,
      explanation:
        "analogRead(ldrPin) liest die Spannung an A0 als Zahl von 0 bis 1023 ein - genau das brauchen wir fuer den LDR. digitalWrite schaltet einen Pin nur ein/aus, Serial.begin startet nur den Serial Monitor, und pinMode auf OUTPUT wuerde den Pin zum Ausgang machen statt zum Messeingang.",
    },
    {
      type: "multiple-choice",
      question: "Du willst aus dem LDR ein Nachtlicht bauen: Die LED soll angehen, wenn es DUNKEL wird. Worauf muss dein Programm bei dieser Schaltung achten?",
      options: [
        "Es schaltet die LED ein, wenn der analogRead-Wert UNTER einen Schwellwert faellt.",
        "Es schaltet die LED ein, wenn der analogRead-Wert UEBER einen Schwellwert steigt.",
        "Es schaltet die LED ein, sobald 5V am LDR anliegen.",
        "Es schaltet die LED nur ein, wenn der Wert genau 512 betraegt.",
      ],
      correct: 0,
      explanation:
        "Dunkel ergibt bei dieser Schaltung einen niedrigen Wert, also muss die LED angehen, wenn der Wert UNTER den Schwellwert faellt. Ueber dem Schwellwert waere es ja hell. Die 5V liegen dauerhaft an, und ein fester Wert wie 512 wuerde fast nie exakt getroffen.",
    },
  ],

  "analog/ntc-temperatursensor": [
    {
      type: "multiple-choice",
      question: "Wofuer steht die Abkuerzung NTC?",
      options: [
        "Negative Temperature Coefficient (negativer Temperaturkoeffizient)",
        "Normale Temperatur-Charakteristik",
        "New Temperature Control",
        "Niedrige Temperatur-Comparison",
      ],
      correct: 0,
      explanation:
        "NTC heisst Negative Temperature Coefficient: der Widerstand sinkt, wenn die Temperatur steigt. Die anderen Begriffe gibt es so nicht; das Wort negativ beschreibt den gegenlaeufigen Zusammenhang.",
    },
    {
      type: "multiple-choice",
      question: "Was passiert mit dem Widerstand eines NTC, wenn er waermer wird?",
      options: [
        "Der Widerstand bleibt immer gleich",
        "Der Widerstand steigt",
        "Der Widerstand sinkt",
        "Der Widerstand wird zu Spannung",
      ],
      correct: 2,
      explanation:
        "Bei einem NTC gilt: warm = kleiner Widerstand (heiss haut ab). Steigen wuerde er nur bei einem PTC; gleich bleibt nur ein normaler Festwiderstand.",
    },
    {
      type: "multiple-choice",
      question: "Ein 10-kOhm-NTC hat seinen Nennwiderstand von 10 kOhm bei welcher Temperatur?",
      options: [
        "bei 0 Grad C",
        "bei 25 Grad C (Zimmertemperatur)",
        "bei 50 Grad C",
        "bei 100 Grad C",
      ],
      correct: 1,
      explanation:
        "Der Nennwert eines 10-kOhm-NTC gilt bei 25 Grad C, also Zimmertemperatur. Bei 0 Grad C waeren es ca. 33 kOhm, bei 50 Grad C nur ca. 3,6 kOhm.",
    },
    {
      type: "multiple-choice",
      question: "Warum braucht man bei einem NTC ueberhaupt einen Spannungsteiler mit festem Widerstand?",
      options: [
        "Damit der NTC nicht zu heiss wird",
        "Weil der Arduino keinen Widerstand messen kann, sondern nur Spannung",
        "Damit der Wert immer genau 511 ist",
        "Weil der NTC sonst kaputtgeht",
      ],
      correct: 1,
      explanation:
        "Der Arduino kann nur Spannung am Pin messen, keinen Widerstand. Der feste Widerstand wandelt die Widerstandsaenderung in eine messbare Spannung um. Der Wert 511 gilt nur bei Zimmertemperatur, nicht immer.",
    },
    {
      type: "multiple-choice",
      question: "In dieser Lektion sitzt der NTC unten (an GND) und der feste 10-kOhm-Widerstand oben (an 5V), A0 greift den Mittelpunkt ab. Was misst der Arduino, wenn der NTC heiss wird?",
      options: [
        "Der analogRead-Wert wird groesser",
        "Der analogRead-Wert bleibt bei 1023",
        "Der analogRead-Wert wird kleiner",
        "Der analogRead-Wert springt auf 0",
      ],
      correct: 2,
      explanation:
        "Heiss bedeutet kleiner NTC-Widerstand, dadurch faellt am NTC (unten) weniger Spannung ab, also wird auch der Wert an A0 kleiner. Merksatz: heisser Sensor, kleiner Zahlenwert. Auf 0 oder 1023 springt der Wert nur bei einem Verdrahtungsfehler.",
    },
    {
      type: "multiple-choice",
      question: "Bei Zimmertemperatur (25 Grad C) sind R1 = 10 kOhm und der NTC = 10 kOhm gleich gross. Welche Sensorspannung U2 ergibt sich und welcher analogRead-Wert ungefaehr?",
      options: [
        "5 V und etwa 1023",
        "2,5 V und etwa 511",
        "0 V und etwa 0",
        "1,32 V und etwa 270",
      ],
      correct: 1,
      explanation:
        "Bei zwei gleichen Widerstaenden teilt sich die Spannung genau in der Mitte: U2 = 5 V mal 10/(10+10) = 2,5 V, das ergibt analogRead etwa 511. 1,32 V und 270 gilt erst bei 50 Grad C, wenn der NTC kleiner geworden ist.",
    },
    {
      type: "multiple-choice",
      question: "Du legst den Finger auf den NTC und siehst im Serial Monitor zuerst 511, dann 421. Was bedeutet das?",
      options: [
        "Der NTC ist kaputt, denn der Wert darf nicht sinken",
        "Der NTC wurde durch den Finger waermer, deshalb sinkt der Wert",
        "Der Finger hat den NTC abgekuehlt",
        "Der Arduino misst jetzt Volt statt einer Zahl",
      ],
      correct: 1,
      explanation:
        "Der Finger (ca. 35 Grad C) erwaermt den NTC, sein Widerstand sinkt und damit auch der Zahlenwert von 511 auf etwa 421 - genau das erwartete Verhalten, kein Defekt. Abkuehlen wuerde den Wert steigen lassen.",
    },
    {
      type: "multiple-choice",
      question: "Im Code steht int wert = analogRead(NTC_PIN);. Welchen Zahlenbereich kann die Variable wert annehmen?",
      options: [
        "0 bis 1023",
        "0 bis 255",
        "0 bis 5",
        "minus 100 bis plus 100",
      ],
      correct: 0,
      explanation:
        "Der AD-Wandler des Arduino liefert immer Werte von 0 bis 1023. 0 bis 255 waere ein 8-Bit-Wert (z.B. bei analogWrite), 0 bis 5 verwechselt den Zahlenwert mit der Spannung in Volt.",
    },
  ],

  "analog/entscheidungen-mit-sensorwerten": [
    {
      type: "multiple-choice",
      question: "Warum ist es nuetzlich, dass der Arduino mit if/else auf Sensorwerte reagiert?",
      options: [
        "Damit der Arduino nur noch HIGH und LOW unterscheiden muss",
        "Damit man die LED gar nicht mehr an einen Pin anschliessen muss",
        "Damit der Arduino selbst entscheidet und automatisch reagiert, z.B. eine LED ein- oder ausschaltet",
        "Damit der Sensor mehr Strom verbraucht und heller leuchtet",
      ],
      correct: 2,
      explanation:
        "Mit if/else trifft der Arduino selbst eine Entscheidung anhand des Sensorwerts und reagiert automatisch (wie eine Strassenlaterne). Die anderen Optionen beschreiben gerade das Gegenteil oder technischen Unsinn: analoge Werte sind ja Zahlen, nicht nur HIGH/LOW.",
    },
    {
      type: "multiple-choice",
      question: "Was ist mit dem Begriff Schwellenwert (z.B. 300) gemeint?",
      options: [
        "Die Grenze, ab der der Arduino seine Entscheidung trifft",
        "Der hoechstmoegliche Wert, den analogRead() liefern kann",
        "Die Anzahl der LEDs, die man anschliessen darf",
        "Die Zeit in Millisekunden, die delay() wartet",
      ],
      correct: 0,
      explanation:
        "Der Schwellenwert ist die selbst festgelegte Grenze zwischen hell und dunkel, an der die Entscheidung kippt. Der Maximalwert von analogRead (1023), die LED-Anzahl oder eine delay-Zeit haben nichts mit dieser Grenze zu tun.",
    },
    {
      type: "multiple-choice",
      question: "Im Nachtlicht-Code steht: if (helligkeit < schwelleAn). Was passiert, wenn helligkeit kleiner als schwelleAn ist?",
      options: [
        "Die LED wird ausgeschaltet, weil es zu hell ist",
        "Die LED wird eingeschaltet, weil es dunkel ist",
        "Der Arduino startet komplett neu",
        "Der Schwellenwert wird automatisch erhoeht",
      ],
      correct: 1,
      explanation:
        "Ein kleiner LDR-Wert bedeutet wenig Licht, also dunkel, deshalb geht die LED an (digitalWrite HIGH). Aus geht sie im else if, wenn der Wert ueber schwelleAus liegt, also bei hell.",
    },
    {
      type: "multiple-choice",
      question: "Dein LDR zeigt bei Raumlicht ca. 600 und bei abgedecktem Sensor ca. 100. Welcher Schwellenwert ist sinnvoll?",
      options: [
        "Etwa 1023, also der hoechste Wert",
        "Etwa 50, also unter dem Dunkelwert",
        "Etwa 300, also ungefaehr in der Mitte",
        "Etwa 700, also ueber dem Hellwert",
      ],
      correct: 2,
      explanation:
        "Der Schwellenwert sollte zwischen hell (600) und dunkel (100) liegen, damit beide Zustaende sicher erkannt werden, z.B. 300. Werte ausserhalb dieser Spanne (50, 700, 1023) wuerden nie oder immer ausloesen.",
    },
    {
      type: "multiple-choice",
      question: "Wie nennt man das Problem, wenn die LED an einem einzelnen Schwellenwert staendig an und aus geht, weil der Sensorwert leicht schwankt?",
      options: [
        "Flackern",
        "Spannungsteilung",
        "Dimmen",
        "Pulsweitenmodulation",
      ],
      correct: 0,
      explanation:
        "Wenn der Wert um den Schwellenwert herum schwankt (z.B. 298 bis 302), schaltet die LED staendig um, das nennt man Flackern. Dimmen und Pulsweitenmodulation betreffen das Helligkeit-Regeln, Spannungsteilung ist die LDR-Schaltung.",
    },
    {
      type: "multiple-choice",
      question: "Wie verhindert die Hysterese das Flackern?",
      options: [
        "Sie erhoeht die Geschwindigkeit, mit der analogRead() liest",
        "Sie verwendet zwei verschiedene Schwellenwerte mit einer Puffer-Zone dazwischen",
        "Sie schaltet den Serial Monitor aus, damit nichts mehr stoert",
        "Sie ersetzt die LED durch einen staerkeren Widerstand",
      ],
      correct: 1,
      explanation:
        "Hysterese nutzt eine Einschalt- und eine Ausschaltschwelle (z.B. 250 und 350); im Bereich dazwischen aendert sich nichts, dieser Puffer stoppt das Flackern. Lesegeschwindigkeit, Serial Monitor oder ein Widerstand-Tausch loesen das Problem nicht.",
    },
    {
      type: "multiple-choice",
      question: "Im Nachtlicht ist schwelleAn = 250 und schwelleAus = 350. Was passiert, wenn der gemessene Wert genau 300 betraegt?",
      options: [
        "Die LED geht an, weil 300 ueber 250 liegt",
        "Die LED geht aus, weil 300 unter 350 liegt",
        "Es aendert sich nichts, der Wert liegt in der Puffer-Zone",
        "Der Arduino zeigt eine Fehlermeldung an",
      ],
      correct: 2,
      explanation:
        "300 ist weder kleiner als schwelleAn (250) noch groesser als schwelleAus (350), also greift der else-Zweig: die LED behaelt ihren Zustand, der Wert liegt im Puffer. Eine Fehlermeldung gibt es nicht, das ist genau der gewuenschte stabile Bereich.",
    },
    {
      type: "multiple-choice",
      question: "Mit welcher Struktur kann man mehrere Helligkeitsstufen (z.B. sehr dunkel, Daemmerung, hell) unterscheiden?",
      options: [
        "Mit einem einzigen if ganz ohne else",
        "Mit map(), das die Stufen automatisch zaehlt",
        "Mit pinMode() fuer jede Stufe",
        "Mit if / else if / else und mehreren Schwellenwerten",
      ],
      correct: 3,
      explanation:
        "Gestaffelte Schwellenwerte prueft man der Reihe nach mit if / else if / else, so wird genau ein passender Zweig ausgefuehrt. map() rechnet nur Wertebereiche um und pinMode() legt nur die Pin-Richtung fest, beide unterscheiden keine Stufen.",
    },
  ],
  "aktoren/servomotor-ansteuern": [
    {
      type: "multiple-choice",
      question: "Welche Zeile muss ganz oben im Programm stehen, damit der Arduino den Befehl Servo ueberhaupt kennt?",
      options: [
        "#include <Servo.h>",
        "import Servo;",
        "Servo.begin();",
        "#define Servo 9",
      ],
      correct: 0,
      explanation:
        "Richtig ist #include <Servo.h> - damit wird die Servo-Library eingebunden, sonst gibt es den Compiler-Fehler 'Servo was not declared'. import gibt es in Arduino-C nicht, begin() ist fuer andere Bauteile, und #define legt nur eine Ersatz-Zahl fest.",
    },
    {
      type: "multiple-choice",
      question: "Mit welchem Befehl sagst du dem Arduino, dass dein Servo an Pin 9 angeschlossen ist?",
      options: [
        "meinServo.write(9);",
        "meinServo.attach(9);",
        "meinServo.pin(9);",
        "pinMode(9, OUTPUT);",
      ],
      correct: 1,
      explanation:
        "attach(9) haengt den Servo einmalig im setup() an Pin 9 - genau so steht es in der Lektion. write(9) wuerde dagegen den Servo auf 9 Grad fahren, pin() gibt es nicht und pinMode() ist fuer LEDs, nicht fuer Servos.",
    },
    {
      type: "multiple-choice",
      question: "Welche Zahl gibst du bei meinServo.write() an, damit der Arm in die Mittelstellung (nach oben) zeigt?",
      options: [
        "1",
        "45",
        "90",
        "180",
      ],
      correct: 2,
      explanation:
        "Laut Lektion ist 90 die Mittelstellung (Arm zeigt nach oben), 0 ist ganz links und 180 ganz rechts. 45 liegt zwischen links und Mitte, und 1 waere fast ganz links - beides ist nicht die Mitte.",
    },
    {
      type: "multiple-choice",
      question: "An welchen Anschluss am Arduino gehoert das rote Servo-Kabel?",
      options: [
        "an einen GND-Pin",
        "an Pin 13",
        "an Pin 9 (Signal)",
        "an +5V",
      ],
      correct: 3,
      explanation:
        "Rot ist die Plus-/Versorgungsspannung und gehoert an +5V. GND ist fuer das braune/schwarze Kabel, das orange/gelbe Signal-Kabel kommt an Pin 9, und Pin 13 wird laut Lektion vermieden (dort sitzt die Onboard-LED).",
    },
    {
      type: "multiple-choice",
      question: "Welche Servo-Kabelfarbe ist das Steuer-Signal und gehoert an einen digitalen Pin wie Pin 9?",
      options: [
        "orange (oder gelb)",
        "rot",
        "braun",
        "blau",
      ],
      correct: 0,
      explanation:
        "Das orange (oder gelbe) Kabel ist das Steuer-Signal und kommt an einen digitalen Pin, z.B. Pin 9. Braun ist Minus/GND, rot ist Plus/5V, und blau kommt beim Servo gar nicht vor.",
    },
    {
      type: "multiple-choice",
      question: "Warum steht im Beispiel nach jedem write() ein delay(1000)?",
      options: [
        "Damit der Arduino nicht ueberhitzt",
        "Damit der Servo Zeit hat, die Position zu erreichen, bevor der naechste Befehl kommt",
        "Weil der Servo sonst kaputtgeht",
        "Damit die Library geladen wird",
      ],
      correct: 1,
      explanation:
        "Ohne das delay() bekaeme der Servo sofort den naechsten Befehl und koennte sich nicht sichtbar bewegen - mechanisch braucht er etwas Zeit. Ueberhitzen oder Kaputtgehen durch fehlendes delay nennt die Lektion nicht, und die Library wird durch #include geladen, nicht durch delay.",
    },
    {
      type: "multiple-choice",
      question: "Was bewirkt diese Schleife: for (int winkel = 0; winkel <= 180; winkel++) { meinServo.write(winkel); delay(15); } ?",
      options: [
        "Der Servo springt sofort von 0 auf 180 Grad",
        "Der Servo bleibt bei 0 Grad stehen",
        "Der Servo faehrt Grad fuer Grad langsam von 0 bis 180 Grad",
        "Der Servo dreht sich endlos im Kreis",
      ],
      correct: 2,
      explanation:
        "Die for-Schleife zaehlt winkel von 0 in Einer-Schritten bis 180 hoch und faehrt bei jedem Schritt einen Grad weiter - das kurze delay(15) macht die Bewegung fluessig (sanfter Sweep). Ein hartes Springen waere ohne Schleife, stehenbleiben passt nicht zum Hochzaehlen, und ein normaler Servo dreht maximal 180 Grad, nicht endlos.",
    },
    {
      type: "multiple-choice",
      question: "Ein Schueler laedt sein Programm hoch, aber der Servo brummt nur und bewegt sich nicht. Was ist laut Lektion die wahrscheinlichste Ursache?",
      options: [
        "Das delay() ist zu lang eingestellt",
        "Die Library wurde doppelt eingebunden",
        "Der Wert in write() ist groesser als 90",
        "Das Signal-Kabel ist nicht angeschlossen oder steckt am falschen Pin",
      ],
      correct: 3,
      explanation:
        "Brummen ohne Bewegung heisst laut Lektion: das orange/gelbe Signal-Kabel haengt nicht an Pin 9 oder steckt falsch - pruefen, ob attach(9) zum Anschluss passt. Ein langes delay laesst den Servo nur warten, write()-Werte bis 180 sind erlaubt, und ein doppeltes #include erzeugt einen anderen Fehler.",
    },
  ],

  "aktoren/transistor-als-schalter-grundlagen": [
    {
      type: "multiple-choice",
      question: "Warum darf man einen kleinen DC-Motor nicht direkt an einen Arduino-Pin anschliessen, sondern braucht einen Transistor?",
      options: [
        "Weil der Arduino-Pin nur etwa 20 mA liefert, der Motor aber 50-100 mA zieht und der Pin sonst durchbrennt",
        "Weil der Arduino-Pin nur Wechselstrom liefert, der Motor aber Gleichstrom braucht",
        "Weil der Motor sonst rueckwaerts laufen wuerde",
        "Weil der Arduino-Pin zu viel Strom liefert und den Motor sofort zerstoert",
      ],
      correct: 0,
      explanation:
        "Ein Pin liefert nur ca. 20 mA (kurz bis 40 mA), ein Hobby-Motor zieht 50-100 mA - bei Direktanschluss brennt der Pin durch. Der Arduino liefert immer Gleichstrom (kein Wechselstrom), und das Problem ist zu wenig, nicht zu viel Pin-Strom.",
    },
    {
      type: "multiple-choice",
      question: "Du haeltst einen BC547 so, dass die flache Seite mit dem Aufdruck dich anschaut und die Beine nach unten zeigen. Wie heissen die Beine von links nach rechts?",
      options: [
        "Emitter - Basis - Collector",
        "Collector - Basis - Emitter",
        "Basis - Collector - Emitter",
        "Collector - Emitter - Basis",
      ],
      correct: 1,
      explanation:
        "Beim BC547 gilt mit flacher Seite zum Betrachter von links: C - B - E (Merksatz 'Chef Befiehlt Ende'). Die anderen Reihenfolgen wuerden Collector und Emitter vertauschen - dann laeuft der Motor staendig oder gar nicht.",
    },
    {
      type: "multiple-choice",
      question: "Welche Aufgabe hat der 1 kOhm-Widerstand zwischen Arduino-Pin und Basis des Transistors?",
      options: [
        "Er sorgt dafuer, dass der Motor langsamer dreht",
        "Er erhoeht die Spannung am Motor auf 9 V",
        "Er begrenzt den Basis-Strom auf ca. 4 mA, damit der Arduino-Pin nicht zerstoert wird",
        "Er glaettet das PWM-Signal, damit der Motor ruhig laeuft",
      ],
      correct: 2,
      explanation:
        "Die Basis-Emitter-Strecke wirkt wie eine Diode; ohne Widerstand wuerde der Strom den Pin grillen. 1 kOhm begrenzt den Basis-Strom auf ca. 4 mA. Mit der Drehzahl, der Motorspannung oder PWM-Glaettung hat der Basiswiderstand nichts zu tun.",
    },
    {
      type: "multiple-choice",
      question: "Wozu dient die Freilaufdiode (1N4148) parallel zum Motor?",
      options: [
        "Sie verstaerkt das Signal vom Arduino-Pin",
        "Sie begrenzt den Strom durch den Motor auf 20 mA",
        "Sie macht aus Gleichstrom Wechselstrom fuer den Motor",
        "Sie faengt die hohe Spannungsspitze ab, die beim Abschalten des Motors entsteht, und schuetzt so den Transistor",
      ],
      correct: 3,
      explanation:
        "Der Motor ist eine Spule: Beim Abschalten entsteht eine sehr hohe Spannungsspitze in umgekehrter Richtung, die den Transistor zerstoeren wuerde. Die Diode fuehrt diese Spitze sicher ab. Verstaerken tut der Transistor, nicht die Diode; eine Strombegrenzung leistet sie nicht.",
    },
    {
      type: "multiple-choice",
      question: "Wie muss die Freilaufdiode beim Einbau gepolt sein?",
      options: [
        "Der Ring (Kathode) zeigt zur +5V-Seite des Motors",
        "Der Ring (Kathode) zeigt zur GND-Seite",
        "Die Diode wird ohne Beachtung der Richtung eingebaut, sie funktioniert in beide Richtungen",
        "Der Ring (Kathode) zeigt zum Arduino-Pin 9",
      ],
      correct: 0,
      explanation:
        "Der Ring (Kathode) muss zur +5V-Seite zeigen; so sperrt die Diode im Normalbetrieb und leitet nur die Spannungsspitze ab. Falsch herum eingebaut schliesst sie die Versorgung kurz - der Motor laeuft nicht und es kann rauchen.",
    },
    {
      type: "multiple-choice",
      question: "Was bewirkt die Code-Zeile digitalWrite(motorPin, HIGH); in diesem Programm?",
      options: [
        "Pin 9 liefert 0 V, der Transistor sperrt und der Motor stoppt",
        "Pin 9 liefert 5 V, Strom fliesst in die Basis, der Transistor leitet und der Motor laeuft",
        "Pin 9 liest den Zustand des Motors ein",
        "Pin 9 dreht den Motor in die andere Richtung",
      ],
      correct: 1,
      explanation:
        "HIGH bedeutet 5 V am Pin: Strom fliesst ueber den Basiswiderstand in die Basis, der Transistor macht auf und der Motor laeuft. LOW (0 V) wuerde ihn stoppen; digitalWrite sendet aus, liest nichts ein, und die Drehrichtung aendert sich dabei nicht.",
    },
    {
      type: "multiple-choice",
      question: "Im setup() steht pinMode(motorPin, OUTPUT);. Warum genau OUTPUT und nicht INPUT?",
      options: [
        "Weil nur OUTPUT-Pins eine Freilaufdiode brauchen",
        "Weil OUTPUT den Motor vor Ueberhitzung schuetzt",
        "Weil Pin 9 ein Signal aussenden soll (Transistor steuern), nicht etwas einlesen",
        "Weil INPUT nur fuer Servomotoren funktioniert",
      ],
      correct: 2,
      explanation:
        "Pin 9 soll etwas aussenden (den Transistor schalten), deshalb OUTPUT - INPUT waere zum Einlesen, z.B. eines Tasters. OUTPUT hat nichts mit Ueberhitzungsschutz, Diode oder Servos zu tun.",
    },
    {
      type: "multiple-choice",
      question: "Ein Schueler baut alles auf, aber der Motor laeuft staendig - auch wenn der Pin auf LOW steht. Was ist laut Lektion die wahrscheinliche Ursache?",
      options: [
        "Der Basiswiderstand ist zu gross gewaehlt",
        "Die Freilaufdiode fehlt",
        "Pin 9 ist nicht PWM-faehig",
        "Collector und Emitter des BC547 wurden vertauscht",
      ],
      correct: 3,
      explanation:
        "Laut Lektion bedeutet 'Motor laeuft staendig, auch bei LOW', dass Collector und Emitter vertauscht sind (beim BC547: C-B-E von links). Eine fehlende Diode macht ruckeligen Lauf, ein zu grosser Widerstand schwaches Schalten, und Pin 9 ist sehr wohl PWM-faehig.",
    },
  ],

  "aktoren/dc-motor-mit-l298n": [
    {
      type: "multiple-choice",
      question: "Warum wird der DC-Motor in dieser Lektion ueber einen Motortreiber L298N angesteuert und nicht ueber einen einzelnen Transistor?",
      options: [
        "Weil der L298N die Drehrichtung umkehren kann (vorwaerts/rueckwaerts) und genug Motorstrom aus einer eigenen Quelle schaltet",
        "Weil ein Transistor zu teuer fuer die Pruefung ist",
        "Weil der Arduino ohne L298N gar keinen Strom liefert",
        "Weil der L298N den Motor leiser macht",
      ],
      correct: 0,
      explanation:
        "Ein Transistor schaltet den Motor nur an/aus in immer derselben Richtung; der L298N hat eine H-Bruecke und eigene Stromversorgung, daher Vorwaerts/Rueckwaerts und mehr Strom. Preis, Lautstaerke oder gar kein Strom sind keine Gruende aus der Lektion.",
    },
    {
      type: "multiple-choice",
      question: "An welchen Arduino-Pin ist im BW-Skript der Enable-Pin ENA (Drehzahl) angeschlossen?",
      options: [
        "Pin 9",
        "Pin 10",
        "Pin 8",
        "Pin 13",
      ],
      correct: 1,
      explanation:
        "Laut Anschlusstabelle der Lektion geht ENA an Pin 10 (~ PWM) fuer die Drehzahl. Pin 9 ist IN1 und Pin 8 ist IN2 (beide fuer die Drehrichtung), Pin 13 kommt nicht vor.",
    },
    {
      type: "multiple-choice",
      question: "Womit wird die Drehzahl (Geschwindigkeit) des Motors gesteuert?",
      options: [
        "Mit digitalWrite(IN1, HIGH)",
        "Mit delay() im loop()",
        "Mit analogWrite(ENA, ...) und einem Wert von 0 bis 255",
        "Mit pinMode(ENA, OUTPUT)",
      ],
      correct: 2,
      explanation:
        "Die Drehzahl regelt analogWrite auf den PWM-Pin ENA mit Werten 0..255 (0=steht, 255=voll). digitalWrite auf IN1/IN2 setzt die Richtung, delay() nur Wartezeit, pinMode legt nur die Pin-Richtung fest.",
    },
    {
      type: "multiple-choice",
      question: "Welche Pin-Belegung laesst den Motor in EINE Richtung drehen?",
      options: [
        "IN1 = LOW und IN2 = LOW",
        "IN1 = HIGH und IN2 = HIGH",
        "ENA = 0",
        "IN1 = HIGH und IN2 = LOW",
      ],
      correct: 3,
      explanation:
        "IN1 und IN2 muessen unterschiedlich sein, damit der Motor dreht: HIGH/LOW ist eine Richtung. Beide LOW bedeutet Stopp, ENA=0 schaltet den Motor aus; beide HIGH ist in der Lektions-Tabelle keine Drehrichtung.",
    },
    {
      type: "multiple-choice",
      question: "Wie stoppt man den Motor laut Lektion am einfachsten?",
      options: [
        "IN1 und IN2 beide auf LOW setzen (oder ENA auf 0)",
        "IN1 auf HIGH und IN2 auf LOW setzen",
        "Den GND-Pin abziehen",
        "delay(2000) aufrufen",
      ],
      correct: 0,
      explanation:
        "Sind beide Eingaenge gleich (beide LOW), steht der Motor; alternativ ENA auf 0. HIGH/LOW lasst ihn drehen, GND abziehen ist kein Programmierschritt, delay() haelt nur das Programm an, stoppt aber nicht den Motor.",
    },
    {
      type: "multiple-choice",
      question: "Im Beispiel-Sketch steht: analogWrite(pinEn, vmax / 2); digitalWrite(pinIN1, LOW); digitalWrite(pinIN2, HIGH);. Was passiert?",
      options: [
        "Der Motor dreht mit voller Drehzahl in Richtung 1",
        "Der Motor dreht mit halber Drehzahl in die umgekehrte Richtung",
        "Der Motor steht still",
        "Der Motor blinkt",
      ],
      correct: 1,
      explanation:
        "vmax/2 (=128) ist halbe Drehzahl, und IN1=LOW mit IN2=HIGH ist die umgekehrte Richtung. Voll waere vmax (255), Stillstand waere beide IN gleich, und ein Motor blinkt nicht.",
    },
    {
      type: "multiple-choice",
      question: "Warum muss der GND des L298N mit dem GND des Arduino verbunden sein?",
      options: [
        "Damit der Motor schneller dreht",
        "Damit der Arduino die Motorbatterie auflaedt",
        "Damit die Steuersignale einen gemeinsamen Bezugspunkt haben, sonst funktioniert nichts",
        "Damit die LED am Modul leuchtet",
      ],
      correct: 2,
      explanation:
        "Ohne gemeinsamen GND haben die kleinen Steuersignale keinen gemeinsamen Bezugspunkt und nichts funktioniert. Mit Drehzahl, Aufladen oder einer LED hat die GND-Verbindung laut Lektion nichts zu tun.",
    },
    {
      type: "multiple-choice",
      question: "Was bewirkt analogWrite(10, 0); im Sketch?",
      options: [
        "Der Motor laeuft mit voller Drehzahl",
        "Pin 10 wird als Eingang gesetzt",
        "Der Motor wechselt die Drehrichtung",
        "Der Motor steht (ENA aus)",
      ],
      correct: 3,
      explanation:
        "ENA (Pin 10) auf 0 gibt den Motor nicht frei, also steht er. Voll waere 255, die Richtung legen IN1/IN2 fest, und die Pin-Richtung aendert nur pinMode, nicht analogWrite.",
    },
  ],
};
