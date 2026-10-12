-- Modul 4 und 5 nach demselben Muster wie Modul 2 und 3 (12.10.2026): nur Ergänzungen, keine Streichung.
--   1. Praxis-Block für "Ampel mit Fußgängerüberweg" und "Nachtabschaltung mit Lichtsensor" (Modul 5);
--      das Steckbrett-Bild wird per SQL aus der Erklärung kopiert. Damit hat jede praktische
--      Lektion des Kurses einen Praxis-Block.
--   2. Zusatzaufgaben ("Schon fertig?") für "Transistor als Schalter" und "DC-Motor mit L298N" (Modul 4).
--   3. Lehrer-Lösungen um die Praxis-Hinweise ergänzt.
-- Erzeugt mit einem Hilfsskript, damit die JSON-Blöcke sicher gültig sind.
-- Eingespielt am 12.10.2026 per MCP in Teilen (Ampel-Block wegen "Invalid or expired requestState"
-- in zwei Schritten: erst Praxis ohne code_hinweise, dann code_hinweise + Lösung). Der Endstand
-- wurde per Export exakt gegen diese Datei verglichen.
begin;

do $do$
declare
  r     record;
  h     text;
  board text;
begin
  for r in
    select * from (values
    -- ---------------------------------------------------------------- Ampel mit Fußgängerüberweg
    ('2a1bc144-f9b6-4e9c-a594-a128f72c6594'::uuid, '09d8aab23abc5ea65d74a408fa7f8205',
     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 700".*?</svg>', 22253,
     $prax${
 "aufgabe": {
  "titel": "Fußgängerampel bauen: Grün auf Knopfdruck",
  "auftrag": "<p>Baue die <strong>Auto-Ampel</strong> (Rot, Gelb, Grün), die <strong>Fußgänger-Ampel</strong> (Rot, Grün) und den <strong>Taster</strong> auf. Drückt ein Fußgänger den Taster, läuft der Ablauf aus der Lektion einmal durch.</p><p><strong>Deine drei Aufgaben:</strong></p><ol><li><strong>Hardware:</strong> Baue die Schaltung nach dem Steckbrett-Bild und den Schritten unten auf.</li><li><strong>Software:</strong> Vervollständige das Code-Gerüst. Phase 1 ist schon fertig, die Phasen 2 bis 4 schreibst du.</li><li><strong>Testen:</strong> Lade das Programm hoch, drück den Taster und vergleiche mit dem Ablauf oben in der Lektion.</li></ol><p><strong>Geschafft, wenn:</strong> Nach dem Start leuchten Auto-Grün und Fußgänger-Rot. Nach einem Tastendruck: Auto-Gelb (2&nbsp;s) &rarr; Auto-Rot &rarr; 1&nbsp;s Pause &rarr; Fußgänger-Grün (5&nbsp;s) &rarr; Fußgänger-Grün blinkt 3-mal &rarr; Fußgänger-Rot &rarr; Auto Rot-Gelb (1&nbsp;s) &rarr; Auto-Grün.</p><p><strong>Schon fertig? Dann probiere das:</strong></p><ol><li><strong>Mehr Zeit:</strong> Die Fußgänger sollen 8 Sekunden Grün haben.</li><li><strong>Länger warnen:</strong> Fußgänger-Grün soll 5-mal blinken statt 3-mal.</li><li><strong>Signal kommt:</strong> Direkt nach dem Tastendruck blinkt Fußgänger-Rot 2-mal (300&nbsp;ms aus, 300&nbsp;ms an). So sieht der Fußgänger, dass sein Druck angekommen ist. Erst danach wird die Auto-Ampel gelb.</li></ol>",
  "lernziel": "Du kannst eine Ampel mit Fußgängerüberweg aufbauen und den Ablauf mit <code>if</code>, <code>delay()</code> und einer <code>for</code>-Schleife programmieren."
 },
 "bauteile": [
  {
   "name": "Arduino Uno",
   "anzahl": 1
  },
  {
   "name": "Steckbrett (Breadboard)",
   "anzahl": 1
  },
  {
   "name": "LED rot",
   "anzahl": 2,
   "hinweis": "Auto-Rot und Fußgänger-Rot"
  },
  {
   "name": "LED gelb",
   "anzahl": 1
  },
  {
   "name": "LED grün",
   "anzahl": 2,
   "hinweis": "Auto-Grün und Fußgänger-Grün"
  },
  {
   "name": "Widerstand 220 Ω",
   "anzahl": 5,
   "hinweis": "Farbcode: rot-rot-braun. Einer pro LED."
  },
  {
   "name": "Taster",
   "anzahl": 1,
   "hinweis": "Vier Beinchen, sitzt über der Mittelrinne"
  },
  {
   "name": "Jumper-Kabel",
   "anzahl": 14,
   "hinweis": "6 für die Pins 2 bis 7, 8 schwarze für GND"
  },
  {
   "name": "USB-Kabel",
   "anzahl": 1,
   "hinweis": "Strom + Programm-Upload"
  }
 ],
 "anschluss": {
  "svg": "",
  "schritte": [
   "Verbinde einen <strong>GND-Pin</strong> des Arduino mit einem <strong>schwarzen Kabel</strong> mit der <strong>oberen &minus;Schiene</strong> (blau).",
   "Verbinde mit einem <strong>schwarzen Kabel</strong> die obere &minus;Schiene mit der <strong>unteren &minus;Schiene</strong> (im Bild rechts außen). Jetzt liegt auch unten GND an.",
   "<strong>Auto-Rot:</strong> Stecke einen 220&nbsp;&Omega;-Widerstand von Loch <code>c3</code> nach <code>c4</code>. Die Löcher liegen direkt nebeneinander: Biege die Beinchen eng zusammen oder stell den Widerstand aufrecht. Stecke eine rote LED mit dem <strong>langen Bein</strong> in <code>a4</code> und dem kurzen in <code>a5</code>. Stecke ein schwarzes Kabel von <code>b5</code> in die obere &minus;Schiene. <em>Buchstaben sind die Reihen, Zahlen die Spalten.</em>",
   "<strong>Auto-Gelb</strong> geht genauso, nur 4 Spalten weiter rechts: Widerstand von <code>c7</code> nach <code>c8</code>, gelbe LED mit dem langen Bein in <code>a8</code> und dem kurzen in <code>a9</code>, schwarzes Kabel von <code>b9</code> in die obere &minus;Schiene.",
   "<strong>Auto-Grün:</strong> Widerstand von <code>c11</code> nach <code>c12</code>, grüne LED in <code>a12</code> (lang) und <code>a13</code> (kurz), schwarzes Kabel von <code>b13</code> in die obere &minus;Schiene.",
   "<strong>Fußgänger-Rot:</strong> Widerstand von <code>c15</code> nach <code>c16</code>, rote LED in <code>a16</code> (lang) und <code>a17</code> (kurz), schwarzes Kabel von <code>b17</code> in die obere &minus;Schiene.",
   "<strong>Fußgänger-Grün:</strong> Widerstand von <code>c19</code> nach <code>c20</code>, grüne LED in <code>a20</code> (lang) und <code>a21</code> (kurz), schwarzes Kabel von <code>b21</code> in die obere &minus;Schiene.",
   "Jetzt die fünf Pin-Kabel: <strong>Pin 2</strong> nach <code>e3</code>, <strong>Pin 3</strong> nach <code>e7</code>, <strong>Pin 4</strong> nach <code>e11</code>, <strong>Pin 5</strong> nach <code>e15</code>, <strong>Pin 6</strong> nach <code>e19</code>. Jedes Kabel landet in der Spalte, in der sein Widerstand beginnt.",
   "Stecke den <strong>Taster</strong> über die Mittelrinne. Seine vier Beinchen sitzen in <code>e23</code>, <code>e25</code>, <code>f23</code> und <code>f25</code>. <em>Im Bild ist der Taster etwas schmaler gezeichnet.</em>",
   "Verbinde <strong>Pin 7</strong> mit einem <strong>blauen Kabel</strong> mit Loch <code>d23</code>. Über Spalte 23 hängt das Kabel am oberen linken Taster-Bein.",
   "Stecke ein <strong>schwarzes Kabel</strong> von Loch <code>g25</code> in die <strong>untere &minus;Schiene</strong>. Das ist das Taster-Bein <strong>diagonal</strong> gegenüber.",
   "Prüfe alles noch einmal: Jede LED hat ihren eigenen Widerstand, jedes kurze LED-Bein hat ein schwarzes Kabel zur &minus;Schiene. Dann lade dein Programm hoch und drück den Taster."
  ]
 },
 "code_hinweise": {
  "geruest": "int autoRot = 2;     // Auto-Ampel: rote LED\nint autoGelb = 3;    // Auto-Ampel: gelbe LED\nint autoGruen = 4;   // Auto-Ampel: grüne LED\nint fussRot = 5;     // Fußgänger-Ampel: rote LED\nint fussGruen = 6;   // Fußgänger-Ampel: grüne LED\nint taster = 7;      // Taster für Fußgänger\n\nvoid setup() {\n  pinMode(autoRot, OUTPUT);\n  pinMode(autoGelb, OUTPUT);\n  pinMode(autoGruen, OUTPUT);\n  pinMode(fussRot, OUTPUT);\n  pinMode(fussGruen, OUTPUT);\n  // TODO: Taster-Pin als Eingang mit Pull-up festlegen\n\n  // Startzustand: Auto Grün, Fußgänger Rot\n  digitalWrite(autoGruen, HIGH);\n  digitalWrite(fussRot, HIGH);\n}\n\nvoid loop() {\n  if (digitalRead(taster) == LOW) {\n    delay(200);   // Entprellung\n\n    // Phase 1: Auto von Grün über Gelb auf Rot (schon fertig)\n    digitalWrite(autoGruen, LOW);\n    digitalWrite(autoGelb, HIGH);\n    delay(2000);\n    digitalWrite(autoGelb, LOW);\n    digitalWrite(autoRot, HIGH);\n    delay(1000);  // Räumzeit\n\n    // TODO Phase 2: Fußgänger-Rot aus, Fußgänger-Grün an, 5 Sekunden warten\n\n    // TODO Phase 3: Fußgänger-Grün blinkt 3-mal (for-Schleife),\n    //               danach Grün aus, Rot an, 1 Sekunde warten\n\n    // TODO Phase 4: Auto-Gelb dazuschalten (Rot-Gelb), 1 Sekunde warten,\n    //               dann Rot und Gelb aus, Grün an\n  }\n}",
  "tipps": [
   "Der Taster-Pin bekommt <code>INPUT_PULLUP</code>. Gedrückt liefert er dann <code>LOW</code>.",
   "Blinken in Phase 3: In der <code>for</code>-Schleife steht Grün aus, 400&nbsp;ms warten, Grün an, 400&nbsp;ms warten.",
   "Rot-Gelb in Phase 4: Rot bleibt an, Gelb kommt nur dazu.",
   "<strong>Klappt nicht?</strong> Der Ablauf startet dauernd von selbst: Die beiden Kabel hängen an Taster-Beinen, die im Taster verbunden sind. Nimm das diagonal gegenüberliegende Bein. Oder dein Code prüft auf <code>== HIGH</code> statt <code>== LOW</code>.",
   "Der Ablauf startet nie: Das Kabel von Pin 7 oder das schwarze Kabel steckt nicht in der Spalte eines Taster-Beins. Oder die Brücke zwischen oberer und unterer &minus;Schiene fehlt.",
   "Eine LED bleibt dunkel: Dreh sie um (langes Bein zum Widerstand). Vergleiche die Pin-Nummer im Code mit dem Kabel am Arduino."
  ]
 }
}$prax$,
     $sol$

// Praxis: Das Gerüst gibt Pins, setup() (ohne die Taster-Zeile) und Phase 1 vor.
// Die Phasen 2 bis 4 stehen oben im Sketch.
// Zusatz 1 (Mehr Zeit): delay(5000) in Phase 2 wird delay(8000).
// Zusatz 2 (Länger warnen): in der for-Schleife i < 5 statt i < 3.
// Zusatz 3 (Signal kommt): direkt nach delay(200), noch vor Phase 1:
//   for (int i = 0; i < 2; i++) {
//     digitalWrite(fussRot, LOW);
//     delay(300);
//     digitalWrite(fussRot, HIGH);
//     delay(300);
//   }$sol$),
    -- ---------------------------------------------------------------- Nachtabschaltung mit Lichtsensor
    ('f90fcd75-5d30-4895-b575-4ccb6cc9b453'::uuid, '6bedce8b343c27463b8e0767d25e8bba',
     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 760".*?</svg>', 20225,
     $prax${
 "aufgabe": {
  "titel": "Nachtmodus einbauen: Ampel mit Lichtsensor",
  "auftrag": "<p>Erweitere deine <strong>Fußgängerampel aus Lektion 1</strong> um einen <strong>LDR</strong>. Bei Helligkeit läuft die Ampel normal. Bei Dunkelheit sind alle LEDs aus, nur Auto-Gelb blinkt.</p><p><strong>Deine vier Aufgaben:</strong></p><ol><li><strong>Hardware:</strong> Die Ampel bleibt stecken. Ergänze den LDR-Spannungsteiler nach dem Steckbrett-Bild und den Schritten unten.</li><li><strong>Messen:</strong> Lade den Kalibrierungs-Sketch aus dem Beispiel oben hoch. Notiere deinen Wert bei Raumlicht und deinen Wert mit der Hand über dem LDR. Deine <code>SCHWELLE</code> liegt dazwischen.</li><li><strong>Software:</strong> Öffne dein Ampel-Programm aus Lektion 1 und speichere es unter einem neuen Namen. Bau die <code>loop()</code> nach dem Code-Gerüst um.</li><li><strong>Testen:</strong> Prüfe beide Fälle: Hand weg und Hand über dem LDR.</li></ol><p><strong>Geschafft, wenn:</strong> Hand weg &rarr; Auto-Grün und Fußgänger-Rot leuchten, der Taster startet den Ablauf. Hand über den LDR &rarr; alle LEDs aus, nur Auto-Gelb blinkt, der Taster reagiert nicht.</p><p><strong>Schon fertig? Dann probiere das:</strong></p><ol><li><strong>Ruhiger blinken:</strong> Nachts soll Auto-Gelb 1 Sekunde an und 1 Sekunde aus sein.</li><li><strong>Messwert anzeigen:</strong> Lass den <code>lichtWert</code> auch im Ampel-Programm im Serial Monitor mitlaufen (dazu gehört <code>Serial.begin(9600);</code> in <code>setup()</code>). Schatte den LDR langsam ab: Bei welchem Wert schaltet deine Ampel um?</li></ol>",
  "lernziel": "Du kannst eine fertige Schaltung um einen LDR erweitern, den Schwellenwert an deinem Aufbau messen und mit <code>if/else</code> zwischen Tagbetrieb und Nachtmodus umschalten."
 },
 "bauteile": [
  {
   "name": "Deine Fußgängerampel aus Lektion 1",
   "anzahl": 1,
   "hinweis": "Bleibt komplett stecken."
  },
  {
   "name": "LDR (Fotowiderstand)",
   "anzahl": 1,
   "hinweis": "Nicht gepolt &ndash; die Beine dürfen beliebig herum."
  },
  {
   "name": "Widerstand 10 kΩ",
   "anzahl": 1,
   "hinweis": "Farbcode: braun-schwarz-orange"
  },
  {
   "name": "Jumper-Kabel",
   "anzahl": 4,
   "hinweis": "2&times; rot (5V), orange (A0), schwarz (GND)"
  },
  {
   "name": "USB-Kabel",
   "anzahl": 1,
   "hinweis": "Für Strom + Serial Monitor"
  }
 ],
 "anschluss": {
  "svg": "",
  "schritte": [
   "Zieh das USB-Kabel ab. Die Ampel aus Lektion 1 bleibt so stecken, wie sie ist.",
   "Verbinde den <strong>5V-Pin</strong> mit einem <strong>roten Kabel</strong> mit der <strong>oberen +Schiene</strong> (rot).",
   "Stecke den <strong>LDR</strong> in die Löcher <code>b26</code> und <code>b27</code>.",
   "Stecke ein <strong>rotes Kabel</strong> von Loch <code>a26</code> in die obere <strong>+Schiene</strong>. Jetzt hängt ein LDR-Bein an 5V.",
   "Stecke den <strong>10&nbsp;k&Omega;-Widerstand</strong> von Loch <code>d27</code> nach <code>d28</code>. Spalte 27 ist jetzt der Knoten zwischen LDR und 10&nbsp;k&Omega;.",
   "Verbinde Pin <strong>A0</strong> mit einem <strong>orangen Kabel</strong> mit Loch <code>e27</code> (Knoten).",
   "Stecke ein <strong>schwarzes Kabel</strong> von Loch <code>e28</code> in die <strong>untere &minus;Schiene</strong>. Sie ist über die Brücke aus Lektion 1 mit GND verbunden.",
   "Steck das USB-Kabel wieder an. Lade den Kalibrierungs-Sketch hoch, öffne den Serial Monitor (9600 Baud) und notiere Hellwert und Dunkelwert.",
   "Lade dein umgebautes Ampel-Programm hoch und halte die Hand über den LDR."
  ]
 },
 "code_hinweise": {
  "geruest": "// Pins und setup() bleiben wie in Lektion 1.\n// Neu sind diese zwei Zeilen über setup():\nint SCHWELLE = 300;   // TODO: deinen eigenen Wert eintragen\nint lichtWert;        // Messwert vom LDR\n\nvoid loop() {\n  // TODO: LDR an A0 lesen und in lichtWert speichern\n\n  if (lichtWert > SCHWELLE) {\n    // HELL: normaler Ampelbetrieb\n    digitalWrite(autoGelb, LOW);\n    digitalWrite(autoGruen, HIGH);\n    digitalWrite(fussRot, HIGH);\n\n    if (digitalRead(taster) == LOW) {\n      // TODO: Hierhin gehört dein kompletter Ablauf aus Lektion 1\n      //       (von delay(200) bis Auto-Grün an)\n    }\n  } else {\n    // DUNKEL: Nachtmodus\n    // TODO: Auto-Rot, Auto-Grün, Fußgänger-Rot und Fußgänger-Grün ausschalten\n    // TODO: Auto-Gelb an, 500 ms warten, Auto-Gelb aus, 500 ms warten\n  }\n}",
  "tipps": [
   "Bei diesem Aufbau gilt: hell = hoher Wert, dunkel = niedriger Wert.",
   "Für <code>analogRead(A0)</code> brauchst du kein <code>pinMode()</code>.",
   "Der Wechsel in den Nachtmodus kommt manchmal erst nach ein paar Sekunden: Während der Ablauf nach einem Tastendruck läuft, liest der Arduino den LDR nicht. Das ist in Ordnung.",
   "<strong>Klappt nicht?</strong> Die Ampel bleibt immer im Nachtmodus: Dein Hellwert liegt unter der <code>SCHWELLE</code>. Miss neu und trag einen kleineren Wert ein.",
   "Die Ampel geht nie in den Nachtmodus: Dein Dunkelwert liegt über der <code>SCHWELLE</code>. Oder der Messwert ist immer 1023: Dann fehlt der 10-k&Omega;-Widerstand oder das schwarze Kabel von <code>e28</code> zur &minus;Schiene.",
   "Messwert immer 0: Ein rotes Kabel fehlt oder der LDR hat keinen Kontakt.",
   "Nachts leuchtet noch eine LED mit: Im Dunkel-Zweig fehlt das Ausschalten dieser LED."
  ]
 }
}$prax$,
     $sol$

// Praxis: Die Schüler:innen messen zuerst Hell- und Dunkelwert (Kalibrierungs-Sketch aus dem
// Beispiel) und tragen ihre eigene SCHWELLE ein. Der Sketch oben ist die Lösung des Gerüsts.
// Im Gerüst ist lichtWert oben als eigene Zeile angelegt, in loop() steht dann nur
//   lichtWert = analogRead(A0);
// (Im Sketch oben wird lichtWert direkt in loop() angelegt und A0 heißt ldrPin.)
// Zusatz 1 (Ruhiger blinken): im Nachtmodus beide delay(500) durch delay(1000) ersetzen.
// Zusatz 2 (Messwert anzeigen): Serial.begin(9600); in setup() und Serial.println(lichtWert);
// in loop() - so wie im Sketch oben schon enthalten.$sol$)
    ) as v(id, htmlmd5, svgre, svglen, prax, sol)
  loop
    select content->'explanation'->>'html' into h from public.lessons where id = r.id;
    if md5(h) <> r.htmlmd5 then raise exception 'Lektion %: Alt-Stand passt nicht', r.id; end if;
    board := substring(h from r.svgre);
    if board is null or length(board) <> r.svglen or position('Breadboard' in board) = 0 then
      raise exception 'Lektion %: Steckbrett-Bild passt nicht (Länge %)', r.id, length(board);
    end if;

    update public.lessons
    set content = jsonb_set(content, '{praxis}',
          jsonb_set(r.prax::jsonb, '{anschluss,svg}', to_jsonb(
            '<figure class="schaltbild-figur"><figcaption><strong>Aufbau am Steckbrett</strong> &mdash; so sieht der echte Aufbau aus:</figcaption>'
            || board || '</figure>')), true)
    where id = r.id and content->'praxis' is null;
    if not found then raise exception 'Lektion %: Praxis schon vorhanden', r.id; end if;

    update public.lesson_solutions set sketch = sketch || r.sol, updated_at = now()
    where lesson_id = r.id and position('Praxis' in sketch) = 0;
    if not found then raise exception 'Lektion %: Lehrer-Lösung trifft nicht', r.id; end if;
  end loop;
end $do$;

do $do$
declare
  r record;
  a text;
begin
  for r in
    select * from (values
    -- ---------------------------------------------------------------- Transistor als Schalter
    ('0721f031-6fae-4ed6-96b3-b0d44f715434'::uuid, '006696e21225b10d5fdf181df1e80755',
     $add$<p><strong>Geschafft, wenn:</strong> Der Motor läuft 2 Sekunden, steht 2 Sekunden und beginnt dann von vorn.</p><p><strong>Schon fertig? Dann probiere das:</strong></p><ol><li><strong>Anderer Takt:</strong> Der Motor soll 1 Sekunde laufen und 3 Sekunden stehen.</li><li><strong>Langsamer drehen:</strong> Ersetze <code>digitalWrite(motorPin, HIGH)</code> durch <code>analogWrite(motorPin, 128)</code>. Das kennst du vom Dimmen der LED. Hörst du, dass der Motor langsamer läuft? Läuft er gar nicht an, nimm 180.</li></ol>$add$,
     $sol$

// Praxis-Zusatz 1 (Anderer Takt): delay(1000) nach dem Einschalten, delay(3000) nach dem Ausschalten.
// Praxis-Zusatz 2 (Langsamer drehen): analogWrite(motorPin, 128) statt digitalWrite(motorPin, HIGH).
// Pin 9 ist PWM-fähig. Kleine Motoren laufen bei 128 manchmal nicht an, dann 180 nehmen.$sol$),
    -- ---------------------------------------------------------------- DC-Motor mit L298N
    ('15445005-466b-4b5c-a5d8-88a28d289cc7'::uuid, 'c513b2ab5f50ceb06c040b17a44ad2ad',
     $add$<p><strong>Schon fertig? Dann probiere das:</strong></p><ol><li><strong>Sauberer Wechsel:</strong> Nach dem Rückwärtslauf springt der Motor sofort wieder auf vorwärts. Bau auch dort 2 Sekunden Stopp ein.</li><li><strong>Drei Gänge:</strong> Ersetze die 5 Sekunden Vorwärts durch drei Gänge: erst 3 Sekunden langsam (<code>analogWrite(pinENA, 120)</code>), dann 3 Sekunden mittel (180), dann 3 Sekunden schnell (255). Läuft der Motor bei 120 nicht an, nimm 150.</li></ol>$add$,
     $sol$

// Praxis-Zusatz 1 (Sauberer Wechsel): der Stopp-Block am Ende von loop() im Sketch oben.
// Praxis-Zusatz 2 (Drei Gänge): IN1 HIGH, IN2 LOW einmal setzen, dann
//   analogWrite(pinEn, 120); delay(3000);
//   analogWrite(pinEn, 180); delay(3000);
//   analogWrite(pinEn, 255); delay(3000);
// danach weiter mit Stopp und Rückwärtslauf. Läuft der Motor bei 120 nicht an: 150 nehmen.
// (Im Schüler-Gerüst heißt der Pin pinENA, im Sketch oben pinEn.)$sol$)
    ) as v(id, altmd5, zusatz, sol)
  loop
    select content->'praxis'->'aufgabe'->>'auftrag' into a from public.lessons where id = r.id;
    if a is null or md5(a) <> r.altmd5 then raise exception 'Lektion %: Auftrag passt nicht zum Alt-Stand', r.id; end if;

    update public.lessons
    set content = jsonb_set(content, '{praxis,aufgabe,auftrag}', to_jsonb(a || r.zusatz))
    where id = r.id;

    update public.lesson_solutions set sketch = sketch || r.sol, updated_at = now()
    where lesson_id = r.id and position('Praxis' in sketch) = 0;
    if not found then raise exception 'Lektion %: Lehrer-Lösung trifft nicht', r.id; end if;
  end loop;
end $do$;

commit;
