-- Modul 3 nach demselben Muster wie Modul 2 (12.10.2026, Marco: "schau dir Modul 3 genauso an").
--   1. PWM (Lektion 3): Fading-Programm, Tipp zu || und der Merkkasten "Vergleichen und Verknüpfen"
--      entfallen. Die Lektion behandelt analogWrite + map() + Poti-Dimmer. Das Fading-Programm
--      bleibt als Ausblick in der Lehrer-Lösung.
--   2. Entscheidungen mit Sensorwerten (Lektion 6): kleiner Merkkasten nur mit den Vergleichszeichen,
--      dort wo < und > zum ersten Mal mit Zahlen gebraucht werden. UND steht in Modul 5 (Lüftung),
--      ODER wird nirgends mehr gebraucht.
--   3. Praxis-Block für "Analoge Eingänge" (Lektion 2) und "Lichtsensor (LDR)" (Lektion 4);
--      das Steckbrett-Bild wird per SQL aus der Erklärung kopiert.
begin;

do $do$
declare
  h    text;
  newh text;
  f    text;
  t    text;
begin
  -- 1. PWM
  select content->'explanation'->>'html' into h from public.lessons where id = '4bf4e7fc-3713-42b1-92f0-a6cd292f74b0';
  if md5(h) <> '1a05fa5cf639bfdef99b69f8126f6b45' then raise exception 'PWM: Alt-Stand passt nicht'; end if;
  newh := regexp_replace(h,
    '<div class="code-card">\s*<h4>LED SANFT HELLER UND DUNKLER \(FADING\)</h4>.*(<hr class="section-divider">\s*<div class="info-card">\s*<h3>Die map\(\)-Funktion)',
    $r$<div class="tip-box">
          <strong>So benutzt du den Befehl:</strong> <code>analogWrite(9, 127);</code> dimmt die LED an Pin 9 auf halbe Helligkeit. Der Pin muss vorher im <code>setup()</code> mit <code>pinMode(9, OUTPUT);</code> als Ausgang festgelegt sein.
        </div>

        $r$ || '\1');
  if length(h) - length(newh) <> 3500 or position('Merkkasten' in newh) > 0 or position('schritt' in newh) > 0
     or position('||' in newh) > 0 or position('<h3>Der Befehl: analogWrite()</h3>' in newh) = 0 then
    raise exception 'PWM: Abschnitt nicht sauber entfernt (Differenz %)', length(h) - length(newh);
  end if;
  update public.lessons set content = jsonb_set(content, '{explanation,html}', to_jsonb(newh))
  where id = '4bf4e7fc-3713-42b1-92f0-a6cd292f74b0';

  -- 2. Lektion 6: Merkkasten Vergleichszeichen vor "Was ist ein Schwellenwert?"
  select content->'explanation'->>'html' into h from public.lessons where id = '3b20b4a5-fa9d-4076-8486-9c84081398c6';
  if md5(h) <> 'b19739d42b3758344999556cc1275437' then raise exception 'Lektion 6 (M3): Alt-Stand passt nicht'; end if;
  f := $f$<div class="info-card">
          <h3>Was ist ein Schwellenwert?</h3>$f$;
  t := $t$<div class="tip-box">
          <strong>Merkkasten: Vergleichszeichen im Code.</strong> Bei Zahlen fragst du in der Bedingung: kleiner oder größer? Die Zeichen &le; und &ge; gibt es auf der Tastatur nicht, darum schreibt man sie mit zwei Zeichen:
          <table class="icon-table" style="margin-top:0.5rem;">
            <tr><th>Im Code</th><th>In Mathe</th><th>Bedeutung</th><th>Beispiel</th></tr>
            <tr><td><code>&lt;</code></td><td>&lt;</td><td>kleiner als</td><td><code>sensorWert &lt; 300</code></td></tr>
            <tr><td><code>&gt;</code></td><td>&gt;</td><td>größer als</td><td><code>sensorWert &gt; 700</code></td></tr>
            <tr><td><code>&lt;=</code></td><td>&le;</td><td>kleiner oder gleich</td><td><code>sensorWert &lt;= 300</code></td></tr>
            <tr><td><code>&gt;=</code></td><td>&ge;</td><td>größer oder gleich</td><td><code>sensorWert &gt;= 700</code></td></tr>
          </table>
        </div>

        <div class="info-card">
          <h3>Was ist ein Schwellenwert?</h3>$t$;
  if (length(h) - length(replace(h, f, ''))) <> length(f) then
    raise exception 'Lektion 6 (M3): Einfügestelle nicht genau einmal';
  end if;
  update public.lessons set content = jsonb_set(content, '{explanation,html}', to_jsonb(replace(h, f, t)))
  where id = '3b20b4a5-fa9d-4076-8486-9c84081398c6';

  -- Lehrer-Lösung PWM: Fading als Ausblick behalten
  update public.lesson_solutions set sketch = sketch || $s$

/* --- Nur als Ausblick für die Lehrkraft (nicht mehr Stoff der Lektion): LED sanft heller und dunkler (Fading) ---

int ledPin = 9;       // PWM-Pin!
int helligkeit = 0;   // Startwert
int schritt = 5;      // Änderung pro Durchlauf

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  analogWrite(ledPin, helligkeit);    // Helligkeit setzen
  helligkeit = helligkeit + schritt;  // Helligkeit ändern

  if (helligkeit <= 0 || helligkeit >= 255) {   // || heißt ODER
    schritt = -schritt;               // Richtung umkehren
  }
  delay(30);
}
*/$s$, updated_at = now()
  where lesson_id = '4bf4e7fc-3713-42b1-92f0-a6cd292f74b0' and position('Fading' in sketch) = 0;
  if not found then raise exception 'Lehrer-Lösung PWM trifft nicht'; end if;

  -- Verweis in der Lehrer-Lösung von Modul 2, Lektion 5 nachziehen (zeigte auf den Merkkasten bei PWM)
  f := 'die Vergleichszeichen (<=, >=, ||) in Modul 3 bei PWM';
  update public.lesson_solutions
  set didactics = replace(didactics, f, 'die Vergleichszeichen (<, >, <=, >=) in Modul 3, Lektion 6'), updated_at = now()
  where lesson_id = 'a350f242-1ced-48bd-a485-863fbf1002aa' and position(f in didactics) > 0;
  if not found then raise exception 'Lehrer-Lösung M2 L5: Verweis trifft nicht'; end if;
end $do$;

-- 3. Praxis-Blöcke
do $do$
declare
  r     record;
  h     text;
  board text;
begin
  for r in
    select * from (values
    -- ---------------------------------------------------------------- Analoge Eingänge
    ('98547158-add9-4cac-ac00-bc2ac5e3bb2e'::uuid, '<svg viewBox="0 0 700 520".*?</svg>', 8931, $prax${
 "aufgabe": {
  "titel": "Poti auslesen: 0 bis 1023 im Serial Monitor",
  "auftrag": "<p>Schließe ein <strong>Potentiometer</strong> an <code>A0</code> an. Der Serial Monitor soll den Wert anzeigen, den der Arduino beim Drehen misst.</p><p><strong>Deine drei Aufgaben:</strong></p><ol><li><strong>Hardware:</strong> Baue die Schaltung nach dem Steckbrett-Bild und den Schritten unten auf.</li><li><strong>Software:</strong> Vervollständige das Code-Gerüst und lade es hoch.</li><li><strong>Testen:</strong> Öffne den Serial Monitor und dreh das Poti langsam von ganz links nach ganz rechts.</li></ol><p><strong>Geschafft, wenn:</strong> Poti ganz links &rarr; <code>0</code>. Poti ganz rechts &rarr; <code>1023</code>. Dazwischen ändert sich der Wert stufenlos.</p><p><strong>Schon fertig? Dann probiere das:</strong></p><ol><li><strong>Zielwert treffen:</strong> Dein Nachbar nennt eine Zahl zwischen 0 und 1023. Stell das Poti so ein, dass du sie möglichst genau triffst.</li><li><strong>Kabel tauschen:</strong> Vertausche das rote und das schwarze Kabel am Poti. Was ändert sich beim Drehen?</li></ol>",
  "lernziel": "Du kannst ein Potentiometer an einen analogen Eingang anschließen und seinen Wert mit <code>analogRead()</code> auslesen."
 },
 "bauteile": [
  {"name": "Arduino Uno", "anzahl": 1},
  {"name": "Steckbrett (Breadboard)", "anzahl": 1},
  {"name": "Potentiometer 10 kΩ", "anzahl": 1, "hinweis": "3 Beine: außen GND und 5V, in der Mitte der Abgriff für A0"},
  {"name": "Jumper-Kabel", "anzahl": 3, "hinweis": "schwarz (GND), orange (A0), rot (5V)"},
  {"name": "USB-Kabel", "anzahl": 1, "hinweis": "Für Strom + Serial Monitor"}
 ],
 "anschluss": {
  "svg": "",
  "schritte": [
   "Stecke das <strong>Potentiometer</strong> mit seinen drei Beinen in die Löcher <code>b7</code>, <code>b11</code> und <code>b15</code>. <em>Stehen die Beine bei deinem Poti enger? Dann nimm drei andere Spalten &ndash; wichtig ist nur: jedes Bein in eine eigene Spalte, und die Kabel kommen in dieselben Spalten.</em>",
   "Verbinde einen <strong>GND-Pin</strong> des Arduino mit einem <strong>schwarzen Kabel</strong> mit Loch <code>a7</code> (linkes Poti-Bein).",
   "Verbinde Pin <strong>A0</strong> mit einem <strong>orangen Kabel</strong> mit Loch <code>a11</code> (mittleres Bein = Abgriff).",
   "Verbinde den <strong>5V-Pin</strong> mit einem <strong>roten Kabel</strong> mit Loch <code>a15</code> (rechtes Poti-Bein).",
   "Lade dein Programm hoch, öffne den Serial Monitor (9600 Baud) und dreh langsam am Poti."
  ]
 },
 "code_hinweise": {
  "geruest": "int sensorWert;  // Variable für den Messwert\n\nvoid setup() {\n  // TODO: Serial Monitor mit 9600 Baud starten\n}\n\nvoid loop() {\n  // TODO: Wert von Pin A0 lesen und in sensorWert speichern\n\n  Serial.print(\"Poti-Wert: \");\n  Serial.println(sensorWert);\n  delay(200);\n}",
  "tipps": [
   "Für <code>analogRead()</code> brauchst du kein <code>pinMode()</code>. Die analogen Pins sind automatisch Eingänge.",
   "<strong>Klappt nicht?</strong> Wert immer 0: Das rote 5V-Kabel fehlt oder steckt nicht in Spalte 15 (<code>a15</code>).",
   "Wert immer 1023: Das schwarze GND-Kabel fehlt oder steckt nicht in Spalte 7 (<code>a7</code>).",
   "Werte springen wild, auch ohne Drehen: Das orange A0-Kabel steckt nicht in Spalte 11.",
   "Serial Monitor zeigt Kauderwelsch: Unten rechts muss 9600 Baud stehen."
  ]
 }
}$prax$,
     $sol$

// Praxis-Zusatz 1 (Zielwert treffen): reine Übung, keine Code-Änderung.
// Praxis-Zusatz 2 (Kabel tauschen): 5V und GND an den äußeren Beinen vertauscht -> nur die
// Drehrichtung kehrt sich um (links = 1023, rechts = 0). Schadet dem Poti nicht.$sol$),
    -- ---------------------------------------------------------------- Lichtsensor (LDR)
    ('59e5eb55-67da-4d91-a6f9-45c0a36d4e72'::uuid, '<svg viewBox="0 0 700 580".*?</svg>', 11839, $prax${
 "aufgabe": {
  "titel": "Licht messen: LDR-Werte im Serial Monitor",
  "auftrag": "<p>Baue einen <strong>LDR-Spannungsteiler</strong> an <code>A0</code>. Der Serial Monitor soll anzeigen, wie hell es gerade ist.</p><p><strong>Deine drei Aufgaben:</strong></p><ol><li><strong>Hardware:</strong> Baue die Schaltung nach dem Steckbrett-Bild und den Schritten unten auf.</li><li><strong>Software:</strong> Vervollständige das Code-Gerüst und lade es hoch.</li><li><strong>Messen:</strong> Notiere deinen Wert bei Raumlicht und deinen Wert mit der Hand über dem LDR. Die beiden Zahlen brauchst du in Lektion 6 für das Nachtlicht.</li></ol><p><strong>Geschafft, wenn:</strong> Hand über den LDR &rarr; der Wert sinkt deutlich. Hand weg &rarr; der Wert steigt wieder.</p><p><strong>Schon fertig? Dann probiere das:</strong></p><ol><li><strong>Hell-Rekord:</strong> Leuchte mit einer Lampe auf den LDR. Welchen höchsten Wert schaffst du?</li><li><strong>Dunkel-Rekord:</strong> Decke den LDR komplett ab, zum Beispiel mit einer Stiftkappe. Welchen niedrigsten Wert schaffst du?</li></ol>",
  "lernziel": "Du kannst einen LDR mit einem 10-k&Omega;-Widerstand als Spannungsteiler aufbauen und die Helligkeit mit <code>analogRead()</code> messen."
 },
 "bauteile": [
  {"name": "Arduino Uno", "anzahl": 1},
  {"name": "Steckbrett (Breadboard)", "anzahl": 1},
  {"name": "LDR (Fotowiderstand)", "anzahl": 1, "hinweis": "Nicht gepolt &ndash; die Beine dürfen beliebig herum."},
  {"name": "Widerstand 10 kΩ", "anzahl": 1, "hinweis": "Farbcode: braun-schwarz-orange"},
  {"name": "Jumper-Kabel", "anzahl": 4, "hinweis": "rot (5V), orange (A0), 2&times; schwarz (GND)"},
  {"name": "USB-Kabel", "anzahl": 1, "hinweis": "Für Strom + Serial Monitor"},
  {"name": "LED und Widerstand 220 Ω", "hinweis": "Nur für Lektion 6: Du kannst sie jetzt schon mit aufbauen (dann 2 Jumper-Kabel mehr)."}
 ],
 "anschluss": {
  "svg": "",
  "schritte": [
   "Verbinde den <strong>5V-Pin</strong> mit einem <strong>roten Kabel</strong> mit Loch <code>a5</code>.",
   "Stecke den <strong>LDR</strong> in die Löcher <code>c5</code> und <code>c9</code>.",
   "Stecke den <strong>10&nbsp;k&Omega;-Widerstand</strong> von Loch <code>e9</code> nach <code>e13</code>. Spalte 9 ist jetzt der Knoten zwischen LDR und 10&nbsp;k&Omega;.",
   "Stecke ein <strong>schwarzes Kabel</strong> von Loch <code>a13</code> in die <strong>&minus;Schiene</strong> oben.",
   "Verbinde Pin <strong>A0</strong> mit einem <strong>orangen Kabel</strong> mit Loch <code>a9</code> (Knoten).",
   "Verbinde einen <strong>GND-Pin</strong> mit einem <strong>schwarzen Kabel</strong> mit der <strong>&minus;Schiene</strong> oben.",
   "<em>Für Lektion 6 schon vorbereiten (wird hier noch nicht geschaltet):</em> 220&nbsp;&Omega;-Widerstand von <code>c17</code> nach <code>c18</code>, LED mit dem langen Bein in <code>a18</code> und dem kurzen in <code>a19</code>, schwarzes Kabel von <code>b19</code> in die &minus;Schiene oben, grünes Kabel von <strong>Pin 8</strong> nach <code>a17</code>.",
   "Lade dein Programm hoch, öffne den Serial Monitor (9600 Baud) und halte die Hand über den LDR."
  ]
 },
 "code_hinweise": {
  "geruest": "int ldrPin = A0;   // Knoten zwischen LDR und 10 kΩ\nint ldrWert;       // Variable für den Messwert\n\nvoid setup() {\n  // TODO: Serial Monitor mit 9600 Baud starten\n}\n\nvoid loop() {\n  // TODO: Lichtwert an ldrPin lesen und in ldrWert speichern\n\n  Serial.print(\"Helligkeit: \");\n  Serial.println(ldrWert);\n  delay(300);\n}",
  "tipps": [
   "Bei diesem Aufbau gilt: hell = hoher Wert, dunkel = niedriger Wert.",
   "<strong>Klappt nicht?</strong> Wert immer 0: Das 5V-Kabel oder der LDR hat keinen Kontakt. Wert immer 1023: Der 10-k&Omega;-Widerstand fehlt oder ein schwarzes Kabel fehlt (von <code>a13</code> zur &minus;Schiene oder vom GND-Pin zur &minus;Schiene).",
   "Werte springen wild: Das A0-Kabel steckt nicht in Spalte 9.",
   "Serial Monitor zeigt Kauderwelsch: Unten rechts muss 9600 Baud stehen."
  ]
 }
}$prax$,
     $sol$

// Praxis: Die Schüler:innen notieren Hell- und Dunkelwert (Grundlage für die Schwellen in Lektion 6).
// Zusätze "Hell-Rekord" / "Dunkel-Rekord": reine Messaufgaben ohne Code-Änderung. Typisch sind
// Werte von 800 bis 950 unter einer Lampe und deutlich unter 100 bei vollständig abgedecktem LDR.$sol$)
    ) as v(id, svgre, svglen, prax, sol)
  loop
    select content->'explanation'->>'html' into h from public.lessons where id = r.id;
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

commit;
