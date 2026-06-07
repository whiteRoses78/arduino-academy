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
};
