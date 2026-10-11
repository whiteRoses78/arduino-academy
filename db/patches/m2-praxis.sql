-- M2: Praxis-Block für die vier Lektionen, die noch keinen hatten (11.10.2026):
-- Wechselblinker, LED-Lauflicht, Taster als Eingabe, Einfache Ampelschaltung.
-- Die Erklärung bleibt unverändert. Das Steckbrett-Bild wird in der DB aus der Erklärung
-- in den Praxis-Block KOPIERT (erstes SVG der Lektion), damit der Block für sich steht.
-- Die Lehrer-Lösung bekommt je einen Nachsatz zu den Zusatzaufgaben.
begin;

do $do$
declare
  r     record;
  h     text;
  board text;
begin
  for r in
    select * from (values
    -- ---------------------------------------------------------------- Wechselblinker
    ('c1b417bc-5154-46fe-941a-51e225e79418'::uuid, 11004, $prax${
 "aufgabe": {
  "titel": "Bahnübergang: Zwei LEDs blinken abwechselnd",
  "auftrag": "<p>Baue eine Schaltung mit einer grünen LED an <strong>Pin 12</strong> und einer roten LED an <strong>Pin 13</strong>. Die beiden LEDs sollen abwechselnd je 1 Sekunde leuchten.</p><p><strong>Deine zwei Aufgaben:</strong></p><ol><li><strong>Hardware:</strong> Baue die Schaltung nach dem Bild unten auf.</li><li><strong>Software:</strong> Vervollständige das Code-Gerüst weiter unten und lade es auf deinen Arduino.</li></ol><p><strong>Schon fertig? Dann probiere das:</strong></p><ol><li><strong>Schneller:</strong> Die LEDs wechseln viermal pro Sekunde.</li><li><strong>Polizeilicht:</strong> Die grüne LED blitzt zweimal kurz auf, danach die rote zweimal kurz. Und wieder von vorn.</li></ol>",
  "lernziel": "Du kannst zwei LEDs an verschiedenen Pins anschließen und sie im Wechsel schalten."
 },
 "bauteile": [
  {"name": "Arduino Uno", "anzahl": 1},
  {"name": "Steckbrett (Breadboard)", "anzahl": 1},
  {"name": "LED grün", "anzahl": 1, "hinweis": "Langes Bein = Plus (Anode)"},
  {"name": "LED rot", "anzahl": 1, "hinweis": "Langes Bein = Plus (Anode)"},
  {"name": "Widerstand 220 Ω", "anzahl": 2, "hinweis": "Farbcode: rot-rot-braun"},
  {"name": "Jumper-Kabel", "anzahl": 5, "hinweis": "Stecker-Stecker"},
  {"name": "USB-Kabel", "anzahl": 1, "hinweis": "Zum Anschluss an den PC"}
 ],
 "anschluss": {
  "svg": "",
  "schritte": [
   "Stecke den ersten <strong>220&nbsp;&Omega;-Widerstand</strong> von <code>c5</code> nach <code>c7</code>. <em>Buchstaben sind die Reihen, Zahlen die Spalten.</em>",
   "Stecke die <strong>grüne LED</strong>: das <strong>lange Bein</strong> (Plus) in <code>a7</code>, das <strong>kurze Bein</strong> (Minus) in <code>a8</code>.",
   "Verbinde mit einem <strong>grünen Kabel</strong> <strong>Pin 12</strong> des Arduino mit Loch <code>a5</code>.",
   "Verbinde mit einem <strong>schwarzen Kabel</strong> Loch <code>b8</code> mit der oberen <strong>&minus;Schiene</strong> (blau).",
   "Jetzt die zweite LED genauso: Widerstand von <code>c11</code> nach <code>c13</code>, <strong>rote LED</strong> mit dem langen Bein in <code>a13</code> und dem kurzen in <code>a14</code>.",
   "Verbinde mit einem <strong>roten Kabel</strong> <strong>Pin 13</strong> des Arduino mit Loch <code>a11</code>.",
   "Verbinde mit einem <strong>schwarzen Kabel</strong> Loch <code>b14</code> mit der oberen <strong>&minus;Schiene</strong>.",
   "Verbinde einen <strong>GND-Pin</strong> des Arduino mit der oberen <strong>&minus;Schiene</strong>.",
   "Schließe den Arduino mit dem USB-Kabel an den PC an."
  ]
 },
 "code_hinweise": {
  "geruest": "int led1 = 12;  // grüne LED\nint led2 = 13;  // rote LED\n\nvoid setup() {\n  // TODO: beide Pins als Ausgang festlegen\n}\n\nvoid loop() {\n  // Schritt 1: LED 1 an, LED 2 aus\n  // TODO\n  // TODO: 1 Sekunde warten\n\n  // Schritt 2: LED 1 aus, LED 2 an\n  // TODO\n  // TODO: 1 Sekunde warten\n}",
  "tipps": [
   "Jeder Schritt braucht <strong>zwei</strong> <code>digitalWrite()</code>-Befehle: einen für jede LED.",
   "Ohne <code>delay()</code> wechseln die LEDs so schnell, dass du nichts erkennst.",
   "Polizeilicht: Ein kurzer Blitz ist an, <code>delay(200)</code>, aus, <code>delay(200)</code>. Das brauchst du zweimal pro LED."
  ]
 }
}$prax$,
     $sol$

// Praxis-Zusatz 1 (schneller): beide delay(1000) durch delay(250) ersetzen.
// Praxis-Zusatz 2 (Polizeilicht): LED 1 zweimal an / delay(200) / aus / delay(200),
// danach dasselbe mit LED 2. Die jeweils andere LED bleibt dabei LOW.$sol$),
    -- ---------------------------------------------------------------- LED-Lauflicht
    ('c271c8d7-ce1d-4bba-a2fa-22a2d102d033'::uuid, 15469, $prax${
 "aufgabe": {
  "titel": "Lauflicht: 5 LEDs leuchten nacheinander",
  "auftrag": "<p>Baue eine Reihe aus fünf LEDs an den <strong>Pins 8 bis 12</strong>. Das Licht soll von links nach rechts durch die Reihe laufen und dann wieder links beginnen.</p><p><strong>Deine zwei Aufgaben:</strong></p><ol><li><strong>Hardware:</strong> Baue die Schaltung nach dem Bild unten auf.</li><li><strong>Software:</strong> Vervollständige das Code-Gerüst weiter unten und lade es auf deinen Arduino.</li></ol><p><strong>Schon fertig? Dann probiere das:</strong></p><ol><li><strong>Tempo:</strong> Ändere <code>wartezeit</code> auf 50 und danach auf 500. Was passiert?</li><li><strong>Hin und zurück:</strong> Das Licht läuft nach rechts und danach wieder zurück nach links.</li></ol>",
  "lernziel": "Du kannst fünf LEDs an eigene Pins anschließen und sie nacheinander schalten."
 },
 "bauteile": [
  {"name": "Arduino Uno", "anzahl": 1},
  {"name": "Steckbrett (Breadboard)", "anzahl": 1},
  {"name": "LEDs in verschiedenen Farben", "anzahl": 5, "hinweis": "Im Bild: rot, orange, gelb, grün, blau"},
  {"name": "Widerstand 220 Ω", "anzahl": 5, "hinweis": "Farbcode: rot-rot-braun"},
  {"name": "Jumper-Kabel", "anzahl": 11, "hinweis": "Stecker-Stecker"},
  {"name": "USB-Kabel", "anzahl": 1, "hinweis": "Zum Anschluss an den PC"}
 ],
 "anschluss": {
  "svg": "",
  "schritte": [
   "Stecke die fünf <strong>220&nbsp;&Omega;-Widerstände</strong>: von <code>c3</code> nach <code>c4</code>, von <code>c7</code> nach <code>c8</code>, von <code>c11</code> nach <code>c12</code>, von <code>c15</code> nach <code>c16</code> und von <code>c19</code> nach <code>c20</code>. <em>Buchstaben sind die Reihen, Zahlen die Spalten.</em>",
   "Stecke die fünf <strong>LEDs</strong>, immer das <strong>lange Bein links</strong>: <code>a4</code>/<code>a5</code>, <code>a8</code>/<code>a9</code>, <code>a12</code>/<code>a13</code>, <code>a16</code>/<code>a17</code> und <code>a20</code>/<code>a21</code>.",
   "Verbinde die Pins mit den Widerständen: <strong>Pin 8</strong> mit <code>a3</code>, <strong>Pin 9</strong> mit <code>a7</code>, <strong>Pin 10</strong> mit <code>a11</code>, <strong>Pin 11</strong> mit <code>a15</code> und <strong>Pin 12</strong> mit <code>a19</code>.",
   "Verbinde mit fünf <strong>schwarzen Kabeln</strong> die Löcher <code>b5</code>, <code>b9</code>, <code>b13</code>, <code>b17</code> und <code>b21</code> mit der oberen <strong>&minus;Schiene</strong> (blau). Das sind die Spalten der kurzen LED-Beine.",
   "Verbinde einen <strong>GND-Pin</strong> des Arduino mit der oberen <strong>&minus;Schiene</strong>.",
   "Schließe den Arduino mit dem USB-Kabel an den PC an."
  ]
 },
 "code_hinweise": {
  "geruest": "int led1 = 8;\nint led2 = 9;\nint led3 = 10;\nint led4 = 11;\nint led5 = 12;\nint wartezeit = 200;  // Geschwindigkeit in ms\n\nvoid setup() {\n  // TODO: alle 5 Pins als Ausgang festlegen\n}\n\nvoid loop() {\n  // LED 1 leuchtet kurz auf\n  digitalWrite(led1, HIGH);\n  delay(wartezeit);\n  digitalWrite(led1, LOW);\n\n  // TODO: dasselbe für LED 2 bis LED 5\n}",
  "tipps": [
   "Bleibt eine LED dunkel? Dann fehlt ihre <code>pinMode()</code>-Zeile oder sie steckt falsch herum.",
   "Leuchten mehrere LEDs gleichzeitig? Dann fehlt ein <code>digitalWrite(..., LOW)</code>.",
   "Hin und zurück: Nach LED 5 kommen LED 4, 3 und 2. LED 5 und LED 1 nicht doppelt, sonst stockt das Licht an den Enden."
  ]
 }
}$prax$,
     $sol$

// Praxis: Die Grundaufgabe ist nur der Vorwärts-Teil (eine Richtung; im Code-Gerüst steht wartezeit = 200, im Sketch oben 150).
// Zusatz 2 (hin und zurück) ist der komplette Sketch oben.$sol$),
    -- ---------------------------------------------------------------- Taster als Eingabe
    ('185aa5cd-823e-4a7a-b361-8adf7f6081de'::uuid, 9538, $prax${
 "aufgabe": {
  "titel": "Taster abfragen: 0 oder 1 im Serial Monitor",
  "auftrag": "<p>Schließe einen Taster an <strong>Pin 7</strong> an. Der Serial Monitor soll <code>1</code> zeigen, solange niemand drückt, und <code>0</code>, solange du drückst.</p><p><strong>Deine zwei Aufgaben:</strong></p><ol><li><strong>Hardware:</strong> Baue die Schaltung nach dem Bild unten auf.</li><li><strong>Software:</strong> Vervollständige das Code-Gerüst weiter unten und lade es auf deinen Arduino. Öffne danach den Serial Monitor (Lupe oben rechts in der IDE).</li></ol><p><strong>Schon fertig? Dann probiere das:</strong></p><ol><li><strong>Langsamer:</strong> Ändere <code>delay(100)</code> in <code>delay(1000)</code>. Drücke den Taster nur ganz kurz. Was fällt dir auf?</li><li><strong>Schwebender Pin:</strong> Ersetze <code>INPUT_PULLUP</code> durch <code>INPUT</code> und beobachte die Werte, ohne zu drücken. Stelle danach wieder <code>INPUT_PULLUP</code> ein.</li></ol>",
  "lernziel": "Du kannst einen Taster mit <code>INPUT_PULLUP</code> anschließen und seinen Zustand mit <code>digitalRead()</code> auslesen."
 },
 "bauteile": [
  {"name": "Arduino Uno", "anzahl": 1},
  {"name": "Steckbrett (Breadboard)", "anzahl": 1},
  {"name": "Taster", "anzahl": 1, "hinweis": "Vier Beinchen, sitzt über der Mittelrinne"},
  {"name": "Jumper-Kabel", "anzahl": 4, "hinweis": "Stecker-Stecker"},
  {"name": "USB-Kabel", "anzahl": 1, "hinweis": "Zum Anschluss an den PC"}
 ],
 "anschluss": {
  "svg": "",
  "schritte": [
   "Stecke den <strong>Taster</strong> über die Mittelrinne: Seine vier Beinchen sitzen in <code>e8</code>, <code>e10</code>, <code>f8</code> und <code>f10</code>. <em>Buchstaben sind die Reihen, Zahlen die Spalten.</em>",
   "Verbinde mit einem <strong>blauen Kabel</strong> <strong>Pin 7</strong> des Arduino mit Loch <code>d8</code>. Über Spalte 8 hängt das Kabel am oberen linken Taster-Bein.",
   "Verbinde mit einem <strong>schwarzen Kabel</strong> Loch <code>g10</code> mit der unteren <strong>&minus;Schiene</strong> (blau). Das ist das Taster-Bein <strong>diagonal</strong> gegenüber.",
   "Verbinde einen <strong>GND-Pin</strong> des Arduino mit der oberen <strong>&minus;Schiene</strong>. Verbinde dann die obere und die untere &minus;Schiene mit einem weiteren schwarzen Kabel (im Bild rechts außen).",
   "Schließe den Arduino mit dem USB-Kabel an den PC an."
  ]
 },
 "code_hinweise": {
  "geruest": "int tasterPin = 7;\nint zustand;\n\nvoid setup() {\n  // TODO: Taster-Pin als Eingang mit Pull-up festlegen\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // TODO: Taster-Pin lesen und das Ergebnis in zustand speichern\n  Serial.println(zustand);\n  delay(100);\n}",
  "tipps": [
   "Lesen geht mit <code>digitalRead(tasterPin)</code>. Das Ergebnis speicherst du mit <code>zustand = ...;</code>",
   "Im Serial Monitor muss unten rechts <strong>9600 Baud</strong> eingestellt sein.",
   "Zeigt der Monitor immer 0? Dann stecken beide Kabel an Beinen, die im Taster verbunden sind. Nimm das diagonal gegenüberliegende Bein."
  ]
 }
}$prax$,
     $sol$

// Praxis-Zusatz 1: Mit delay(1000) erscheint nur ein Wert pro Sekunde. Kurze Tastendrücke
// zwischen zwei Abfragen werden verpasst.
// Praxis-Zusatz 2: Mit INPUT statt INPUT_PULLUP schwebt der Pin. Ohne Drücken können die
// Werte zufällig zwischen 0 und 1 springen (je nach Aufbau auch mal stabil bleiben).$sol$),
    -- ---------------------------------------------------------------- Einfache Ampelschaltung
    ('797263ef-56c1-4a6d-9dff-ad745c330c1a'::uuid, 12665, $prax${
 "aufgabe": {
  "titel": "Deine Ampel: Rot, Rot-Gelb, Grün, Gelb",
  "auftrag": "<p>Baue eine Ampel mit drei LEDs: Rot an <strong>Pin 2</strong>, Gelb an <strong>Pin 3</strong>, Grün an <strong>Pin 4</strong>. Sie soll die deutsche Phasenfolge zeigen: Rot (5 s), Rot-Gelb (1 s), Grün (5 s), Gelb (2 s).</p><p><strong>Deine zwei Aufgaben:</strong></p><ol><li><strong>Hardware:</strong> Baue die Schaltung nach dem Bild unten auf.</li><li><strong>Software:</strong> Vervollständige das Code-Gerüst weiter unten und lade es auf deinen Arduino.</li></ol><p><strong>Schon fertig? Dann probiere das:</strong></p><ol><li><strong>Eilige Ampel:</strong> Halbiere alle Zeiten.</li><li><strong>Nachtmodus:</strong> Schreibe ein zweites Programm, in dem nur die gelbe LED im Sekundentakt blinkt. Rot und Grün bleiben aus.</li></ol>",
  "lernziel": "Du kannst drei LEDs als Ampel aufbauen und die vier Ampelphasen mit <code>digitalWrite()</code> und <code>delay()</code> programmieren."
 },
 "bauteile": [
  {"name": "Arduino Uno", "anzahl": 1},
  {"name": "Steckbrett (Breadboard)", "anzahl": 1},
  {"name": "LED rot", "anzahl": 1, "hinweis": "Langes Bein = Plus (Anode)"},
  {"name": "LED gelb", "anzahl": 1, "hinweis": "Langes Bein = Plus (Anode)"},
  {"name": "LED grün", "anzahl": 1, "hinweis": "Langes Bein = Plus (Anode)"},
  {"name": "Widerstand 220 Ω", "anzahl": 3, "hinweis": "Farbcode: rot-rot-braun"},
  {"name": "Jumper-Kabel", "anzahl": 7, "hinweis": "Stecker-Stecker"},
  {"name": "USB-Kabel", "anzahl": 1, "hinweis": "Zum Anschluss an den PC"}
 ],
 "anschluss": {
  "svg": "",
  "schritte": [
   "Stecke die drei <strong>220&nbsp;&Omega;-Widerstände</strong>: von <code>c3</code> nach <code>c4</code>, von <code>c7</code> nach <code>c8</code> und von <code>c11</code> nach <code>c12</code>. <em>Buchstaben sind die Reihen, Zahlen die Spalten.</em>",
   "Stecke die drei <strong>LEDs</strong>, immer das <strong>lange Bein links</strong>: Rot in <code>a4</code>/<code>a5</code>, Gelb in <code>a8</code>/<code>a9</code>, Grün in <code>a12</code>/<code>a13</code>.",
   "Verbinde die Pins mit den Widerständen: <strong>Pin 2</strong> mit <code>a3</code> (rotes Kabel), <strong>Pin 3</strong> mit <code>a7</code> (gelbes Kabel), <strong>Pin 4</strong> mit <code>a11</code> (grünes Kabel).",
   "Verbinde mit drei <strong>schwarzen Kabeln</strong> die Löcher <code>b5</code>, <code>b9</code> und <code>b13</code> mit der oberen <strong>&minus;Schiene</strong> (blau). Das sind die Spalten der kurzen LED-Beine.",
   "Verbinde einen <strong>GND-Pin</strong> des Arduino mit der oberen <strong>&minus;Schiene</strong>.",
   "Schließe den Arduino mit dem USB-Kabel an den PC an."
  ]
 },
 "code_hinweise": {
  "geruest": "int rotPin   = 2;\nint gelbPin  = 3;\nint gruenPin = 4;\n\nvoid setup() {\n  // TODO: alle 3 Pins als Ausgang festlegen\n}\n\nvoid loop() {\n  // Phase 1: ROT (5 Sekunden)\n  digitalWrite(rotPin, HIGH);\n  digitalWrite(gelbPin, LOW);\n  digitalWrite(gruenPin, LOW);\n  delay(5000);\n\n  // TODO Phase 2: ROT + GELB (1 Sekunde)\n\n  // TODO Phase 3: GRÜN (5 Sekunden)\n\n  // TODO Phase 4: GELB (2 Sekunden)\n}",
  "tipps": [
   "Setze in <strong>jeder</strong> Phase alle drei LEDs, auch die, die aus sein sollen. Sonst leuchtet eine LED aus der Phase davor weiter.",
   "<code>delay()</code> rechnet in Millisekunden: 5 Sekunden sind <code>delay(5000)</code>.",
   "Nachtmodus: Gelb an, <code>delay(1000)</code>, Gelb aus, <code>delay(1000)</code>."
  ]
 }
}$prax$,
     $sol$

// Praxis-Zusatz 1 (eilige Ampel): alle delay-Werte halbieren (2500 / 500 / 2500 / 1000).
// Praxis-Zusatz 2 (Nachtmodus): im setup() Rot und Grün auf LOW, im loop() nur
// digitalWrite(gelbPin, HIGH); delay(1000); digitalWrite(gelbPin, LOW); delay(1000);$sol$)
    ) as v(id, svglen, prax, sol)
  loop
    select content->'explanation'->>'html' into h from public.lessons where id = r.id;
    board := substring(h from '<svg.*?</svg>');
    if board is null or length(board) <> r.svglen or position('Breadboard' in board) = 0 then
      raise exception 'Lektion %: Steckbrett-Bild passt nicht (Länge %)', r.id, length(board);
    end if;
    board := replace(board, 'zur untere −Schiene', 'zur unteren −Schiene');

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

commit;
