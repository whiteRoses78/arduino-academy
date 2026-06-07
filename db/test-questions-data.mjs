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
};
