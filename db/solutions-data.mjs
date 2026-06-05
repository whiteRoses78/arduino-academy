// =========================================================================
// solutions-data.mjs — Lehrer-Lösungen je Lektion (Spec 04).
//
// Quelle der Wahrheit für die Tabelle public.lesson_solutions. Von Marco
// inhaltlich geprüft (2026-06-05). Keys: module -> slug (DB-Slugs).
//
// Felder (alle optional): sketch (Code), wiring, mistakes, didactics.
// Befüllung via db/gen-solutions-sql.mjs -> MCP execute_sql (Upsert).
// Etappe 1: die 3 Projekt-Lektionen. Weitere folgen modulweise.
// =========================================================================

export const SOLUTIONS = {
  projekt: {
    "ampel-mit-fussgaengerueberweg": {
      sketch: `// ===== Ampel mit Fußgängerüberweg =====
// Auto-Ampel (Rot/Gelb/Grün) + Fußgänger-Ampel (Rot/Grün) + Anforderungstaster

// ----- Pin-Definitionen -----
int autoRot   = 2;   // Auto-Ampel: Rote LED
int autoGelb  = 3;   // Auto-Ampel: Gelbe LED
int autoGruen = 4;   // Auto-Ampel: Grüne LED
int fussRot   = 5;   // Fußgänger-Ampel: Rote LED
int fussGruen = 6;   // Fußgänger-Ampel: Grüne LED
int taster    = 7;   // Anforderungstaster (Fußgänger)

void setup() {
  // Alle LED-Pins als Ausgang
  pinMode(autoRot, OUTPUT);
  pinMode(autoGelb, OUTPUT);
  pinMode(autoGruen, OUTPUT);
  pinMode(fussRot, OUTPUT);
  pinMode(fussGruen, OUTPUT);

  // Taster als Eingang mit internem Pull-Up-Widerstand
  // INPUT_PULLUP: nicht gedrückt = HIGH, gedrückt = LOW
  pinMode(taster, INPUT_PULLUP);

  // Startzustand: Autos fahren (Grün), Fußgänger warten (Rot)
  digitalWrite(autoGruen, HIGH);
  digitalWrite(fussRot, HIGH);
}

void loop() {
  // Taster abfragen: LOW = gedrückt
  if (digitalRead(taster) == LOW) {
    delay(200);  // Entprellung: kurz warten

    // --- Phase 1: Auto von Grün auf Rot ---
    digitalWrite(autoGruen, LOW);   // Auto Grün aus
    digitalWrite(autoGelb, HIGH);   // Auto Gelb an
    delay(2000);                    // 2 s Gelb
    digitalWrite(autoGelb, LOW);    // Auto Gelb aus
    digitalWrite(autoRot, HIGH);    // Auto Rot an
    delay(1000);                    // 1 s Räumzeit

    // --- Phase 2: Fußgänger Grün ---
    digitalWrite(fussRot, LOW);     // Fußg. Rot aus
    digitalWrite(fussGruen, HIGH);  // Fußg. Grün an
    delay(5000);                    // 5 s Grün

    // --- Phase 3: Fußgänger-Grün blinkt 3-mal (Warnung) ---
    for (int i = 0; i < 3; i++) {
      digitalWrite(fussGruen, LOW);
      delay(400);
      digitalWrite(fussGruen, HIGH);
      delay(400);
    }
    digitalWrite(fussGruen, LOW);   // Fußg. Grün aus
    digitalWrite(fussRot, HIGH);    // Fußg. Rot an
    delay(1000);                    // kurze Pause

    // --- Phase 4: Auto von Rot auf Grün ---
    digitalWrite(autoGelb, HIGH);   // Rot-Gelb-Phase
    delay(1000);                    // 1 s
    digitalWrite(autoRot, LOW);     // Auto Rot aus
    digitalWrite(autoGelb, LOW);    // Auto Gelb aus
    digitalWrite(autoGruen, HIGH);  // Auto Grün an (zurück zum Normalzustand)
  }
}`,
      wiring: `Auto-Ampel: rote LED an Pin 2, gelbe an Pin 3, grüne an Pin 4 — jede Anode (langes Bein) über einen eigenen 220-Ω-Vorwiderstand an den Pin.
Fußgänger-Ampel: rote LED an Pin 5, grüne an Pin 6, ebenfalls je 220 Ω.
Alle Kathoden (kurzes Bein) gemeinsam auf die GND-Schiene.
Taster über die Mittelrinne: ein Bein an Pin 7, das diagonal gegenüberliegende an GND — dank INPUT_PULLUP kein externer Widerstand nötig.
Insgesamt 5 Vorwiderstände, Arduino-GND einmal mit der GND-Schiene verbinden.`,
      mistakes: `• LED-Polung vertauscht: Anode (langes Bein, +) über den Widerstand zum Pin, Kathode (kurz) auf GND — sonst leuchtet sie nicht.
• Vorwiderstand vergessen: LED direkt am Pin wird überlastet und kann durchbrennen.
• Taster-Logik verkehrt: bei INPUT_PULLUP ist gedrückt = LOW; wer auf == HIGH prüft, löst die Sequenz nie (oder dauernd) aus.
• Externen Pull-Down/Pull-Up am Taster gesetzt, obwohl INPUT_PULLUP den internen schon bereitstellt.
• delay-Blockade missverstanden: während der delay()-Phasen reagiert nichts auf neue Tastendrücke — das ist hier gewollt.`,
      didactics: `• Erst die Zustandstabelle (welche LED in welcher Phase an/aus) an der Tafel entwickeln, dann den Code dazu schreiben.
• Prüfungsbezug: pinMode/digitalWrite/digitalRead, INPUT_PULLUP und die if-Abfrage sind typische BW-Abschlussprüfungs-Bausteine.
• Die for-Schleife (Blinken) vorab isoliert üben lassen ("klatsche 3-mal"), bevor sie im großen Sketch auftaucht.`,
    },
    "nachtabschaltung-mit-lichtsensor": {
      sketch: `// ===========================================================
//  Nachtabschaltung mit Lichtsensor (LDR)
//  Ampel mit Fußgängerüberweg + LDR-Nachtabschaltung an A0
//  Hell  -> Ampel "schläft" (alle LEDs aus)
//  Dunkel-> normaler Ampelbetrieb mit Taster-Anforderung
// ===========================================================

// ===== Pin-Definitionen =====
int autoRot    = 2;   // Auto-Ampel: Rote LED
int autoGelb   = 3;   // Auto-Ampel: Gelbe LED
int autoGruen  = 4;   // Auto-Ampel: Grüne LED
int fussRot    = 5;   // Fußgänger-Ampel: Rote LED
int fussGruen  = 6;   // Fußgänger-Ampel: Grüne LED
int taster     = 7;   // Taster für Fußgänger (INPUT_PULLUP)
int ldrPin     = A0;  // LDR-Spannungsteiler (Lichtsensor)

// Schwellenwert: unter diesem Wert = dunkel = Ampel aktiv.
// WICHTIG: pro Aufbau mit dem Serial Monitor kalibrieren!
int SCHWELLE   = 300;

void setup() {
  pinMode(autoRot, OUTPUT);
  pinMode(autoGelb, OUTPUT);
  pinMode(autoGruen, OUTPUT);
  pinMode(fussRot, OUTPUT);
  pinMode(fussGruen, OUTPUT);
  pinMode(taster, INPUT_PULLUP);
  // A0 (LDR) ist von Haus aus analoger Eingang - kein pinMode nötig.
  Serial.begin(9600);  // für die Kalibrierung des Schwellenwerts
}

void loop() {
  int lichtWert = analogRead(ldrPin);  // LDR auslesen (0..1023)
  Serial.println(lichtWert);           // Hilfe beim Kalibrieren

  if (lichtWert <= SCHWELLE) {
    // ===== DUNKEL: Ampel ist aktiv =====
    digitalWrite(autoGruen, HIGH);   // Normalzustand: Auto Grün
    digitalWrite(fussRot, HIGH);     // Fußgänger Rot

    if (digitalRead(taster) == LOW) {
      delay(200);  // Entprellung

      // --- Phase 1: Auto von Grün auf Rot ---
      digitalWrite(autoGruen, LOW);
      digitalWrite(autoGelb, HIGH);
      delay(2000);
      digitalWrite(autoGelb, LOW);
      digitalWrite(autoRot, HIGH);
      delay(1000);

      // --- Phase 2: Fußgänger Grün ---
      digitalWrite(fussRot, LOW);
      digitalWrite(fussGruen, HIGH);
      delay(5000);

      // --- Phase 3: Fußgänger blinkt (Warnung) ---
      for (int i = 0; i < 3; i++) {
        digitalWrite(fussGruen, LOW);
        delay(400);
        digitalWrite(fussGruen, HIGH);
        delay(400);
      }
      digitalWrite(fussGruen, LOW);
      digitalWrite(fussRot, HIGH);
      delay(1000);

      // --- Phase 4: Auto von Rot auf Grün ---
      digitalWrite(autoGelb, HIGH);
      delay(1000);
      digitalWrite(autoRot, LOW);
      digitalWrite(autoGelb, LOW);
      digitalWrite(autoGruen, HIGH);
    }
  } else {
    // ===== HELL: Ampel schläft (alle LEDs aus) =====
    digitalWrite(autoRot, LOW);
    digitalWrite(autoGelb, LOW);
    digitalWrite(autoGruen, LOW);
    digitalWrite(fussRot, LOW);
    digitalWrite(fussGruen, LOW);
  }
}`,
      wiring: `Ampel-Teil wie gehabt: jede LED über 220 Ω an ihren Pin (Auto Rot=2, Gelb=3, Grün=4, Fußgänger Rot=5, Grün=6), alle Kathoden an die GND-Schiene.
Taster zwischen Pin 7 und GND (INPUT_PULLUP, kein externer Widerstand).
LDR-Spannungsteiler neu: 5V → LDR → A0-Knoten → 10-kΩ-Widerstand → GND; A0 greift am Knoten zwischen LDR und Festwiderstand ab.
So gilt: hell = hoher A0-Wert, dunkel = niedriger A0-Wert.
Obere und untere Minus-Schiene mit einer GND-Brücke verbinden.`,
      mistakes: `• LDR und 10-kΩ-Widerstand im Spannungsteiler vertauscht → Hell/Dunkel-Logik kehrt sich um.
• A0 nicht am Mittelknoten abgegriffen, sondern direkt an 5V/GND → konstanter Wert (1023 bzw. 0).
• Schwellenwert geraten statt mit dem Serial Monitor kalibriert → Ampel schaltet nie oder dauernd.
• analogRead vom falschen Pin / mit digitalRead verwechselt → kein sinnvoller Helligkeitswert.
• 10-kΩ-Festwiderstand vergessen (LDR ohne Teiler an A0) → A0 "floatet", Werte springen.`,
      didactics: `• Schwellenwert experimentell mit dem Serial Monitor bestimmen (Wert bei Raumlicht vs. Hand über dem LDR notieren).
• Bewusst machen: A0 ist analog (0–1023), die LED-/Taster-Pins sind digital (HIGH/LOW) — zentrale Prüfungsunterscheidung.
• Vorstufe zur kompletten Prüfungsschaltung: wer Spannungsteiler und if-Abfrage hier versteht, kann sie dort sicher ergänzen.`,
    },
    "pruefungsschaltung-komplett": {
      sketch: `// ==========================================
// PRÜFUNGSSCHALTUNG – Arduino Ampel komplett
// Auto-Ampel + Fußgänger + Taster + LDR
// ==========================================

// --- Pin-Definitionen ---
int autoRot    = 2;    // Auto-Ampel: Rote LED
int autoGelb   = 3;    // Auto-Ampel: Gelbe LED
int autoGruen  = 4;    // Auto-Ampel: Grüne LED
int fussRot    = 5;    // Fußgänger: Rote LED
int fussGruen  = 6;    // Fußgänger: Grüne LED
int taster     = 7;    // Taster (Fußgänger-Anforderung)
int ldrPin     = A0;   // LDR am analogen Eingang A0

// --- Einstellungen ---
int SCHWELLE   = 300;  // Schwellenwert Tag/Nacht (unter 300 = dunkel)
                       // Mit Serial Monitor kalibrieren!

void setup() {
  pinMode(autoRot, OUTPUT);
  pinMode(autoGelb, OUTPUT);
  pinMode(autoGruen, OUTPUT);
  pinMode(fussRot, OUTPUT);
  pinMode(fussGruen, OUTPUT);
  pinMode(taster, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Ampel gestartet!");
}

void loop() {
  int lichtWert = analogRead(ldrPin);   // LDR-Wert auslesen
  Serial.print("LDR: ");
  Serial.println(lichtWert);            // zum Kalibrieren

  if (lichtWert <= SCHWELLE) {
    // --- ES IST DUNKEL: Ampel aktiv ---
    digitalWrite(autoGruen, HIGH);      // Normalzustand: Auto Grün
    digitalWrite(fussRot, HIGH);        // Fußgänger Rot

    if (digitalRead(taster) == LOW) {
      delay(200);  // Entprellung

      // PHASE 1: Auto Grün -> Gelb -> Rot
      digitalWrite(autoGruen, LOW);
      digitalWrite(autoGelb, HIGH);
      delay(2000);
      digitalWrite(autoGelb, LOW);
      digitalWrite(autoRot, HIGH);
      delay(1000);

      // PHASE 2: Fußgänger Grün
      digitalWrite(fussRot, LOW);
      digitalWrite(fussGruen, HIGH);
      delay(5000);

      // PHASE 3: Fußgänger blinkt
      for (int i = 0; i < 3; i++) {
        digitalWrite(fussGruen, LOW);
        delay(400);
        digitalWrite(fussGruen, HIGH);
        delay(400);
      }
      digitalWrite(fussGruen, LOW);
      digitalWrite(fussRot, HIGH);
      delay(1000);

      // PHASE 4: Auto Rot-Gelb -> Grün
      digitalWrite(autoGelb, HIGH);
      delay(1000);
      digitalWrite(autoRot, LOW);
      digitalWrite(autoGelb, LOW);
      digitalWrite(autoGruen, HIGH);
    }
  } else {
    // --- ES IST HELL: Ampel schläft ---
    digitalWrite(autoRot, LOW);
    digitalWrite(autoGelb, LOW);
    digitalWrite(autoGruen, LOW);
    digitalWrite(fussRot, LOW);
    digitalWrite(fussGruen, LOW);
  }

  delay(100);  // kurze Pause (stabiler Ablauf)
}`,
      wiring: `5 LEDs je über einen eigenen 220-Ω-Vorwiderstand an die Pins: Auto-Rot=2, Auto-Gelb=3, Auto-Grün=4, Fußgänger-Rot=5, Fußgänger-Grün=6.
Pin → Widerstand → Anode (+, langes Bein); Kathode (−, kurz/abgeflacht) jeder LED auf die gemeinsame GND-Schiene.
Taster zwischen Pin 7 und GND (INPUT_PULLUP, gedrückt = LOW).
LDR-Spannungsteiler: 5V → LDR → Knoten → 10-kΩ-Widerstand → GND; vom Knoten eine Leitung zu A0.
Obere und untere GND-Schiene mit einer Brücke verbinden (gemeinsame Masse).
SCHWELLE (300) nach dem Aufbau mit dem Serial Monitor an die Raumhelligkeit anpassen.`,
      mistakes: `• LED falschherum gesteckt: Kathode (kurz/flache Seite) muss an GND, sonst leuchtet nichts.
• Vorwiderstand vergessen oder zu klein → LED brennt durch oder Pin wird überlastet.
• Taster: externen Widerstand erwartet statt INPUT_PULLUP; auf HIGH statt LOW abgefragt (Logik invertiert).
• LDR-Spannungsteiler nur halb verdrahtet: 10 kΩ fehlt oder A0 direkt an 5V/GND → A0 misst nur 0 oder 1023.
• Schwellenwert nicht kalibriert → Ampel bleibt dauerhaft aus oder an.
• Gemeinsame Masse vergessen: obere/untere GND-Schiene nicht gebrückt → Taster oder LDR-Zweig funktioniert nicht.`,
      didactics: `• Modular aufbauen und einzeln testen: erst Auto-Ampel (3 LEDs), dann Fußgänger (2 LEDs), dann Taster, zuletzt LDR — Fehler sofort lokalisierbar.
• Serial Monitor als Diagnose-Werkzeug einüben: LDR-Rohwerte ablesen und SCHWELLE bewusst setzen statt raten.
• Prüfungs-Zeitmanagement: zuerst den lauffähigen Kern (LEDs + kommentierter Code) sichern, Feinheiten wie die Blink-Phase danach.`,
    },
  },
};
