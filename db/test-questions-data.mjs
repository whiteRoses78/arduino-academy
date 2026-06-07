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
};
