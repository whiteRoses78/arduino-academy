-- M2 Lektion 5 "LED mit Taster steuern" verschlankt (11.10.2026, Marco-Feedback:
-- zu viel Theorie, Praxis fehlt). Die Lektion behandelt nur noch Taster -> LED mit if/else.
-- Raus: Merkkasten Vergleichen/Verknüpfen (-> PWM-Lektion, Patch m2-l5-umzug.sql),
--       bool + Toggle (-> Prüfungsschaltung/Lüftung, Patch m2-l5-umzug.sql).
-- Neu:  Praxis-Block (Steckbrett-Bild wandert aus der Erklärung dorthin).
-- Die beiden SVGs werden in der DB aus dem alten Text übernommen (nicht neu getippt).
-- Einspielen per Supabase-MCP execute_sql; bricht ab, wenn der Alt-Stand nicht passt.
begin;

do $do$
declare
  lid   uuid := 'a350f242-1ced-48bd-a485-863fbf1002aa';
  h     text;
  flow  text;
  board text;
  newh  text;
  prax  jsonb;
begin
  select content->'explanation'->>'html' into h from public.lessons where id = lid;
  if md5(h) <> '5dcb201c3fb318a3384d316ac3f01a00' then
    raise exception 'Lektion 5: Alt-Stand der Erklärung passt nicht';
  end if;
  flow  := substring(h from '<svg viewBox="0 0 460 400".*?</svg>');
  board := substring(h from '<svg viewBox="0 0 700 540".*?</svg>');
  if length(flow) <> 2768 or length(board) <> 11262 then
    raise exception 'Lektion 5: SVG-Längen passen nicht (% / %)', length(flow), length(board);
  end if;
  board := replace(board, 'zur untere −Schiene (GND)', 'zur unteren −Schiene (GND)');

  newh := replace($html$
        <h2>LED mit Taster steuern &ndash; if/else</h2>
        <p>Jetzt kombinierst du <strong>Eingabe</strong> (Taster) und <strong>Ausgabe</strong> (LED): Wenn der Taster gedrückt ist, geht die LED an. Sonst bleibt sie aus. Den Taster kennst du aus Lektion 4, die LED aus Lektion 1. Neu ist nur eine Sache: Der Arduino <strong>trifft eine Entscheidung</strong>.</p>

        <div class="analogy-box">
          <strong>Alltagsanalogie:</strong> Das ist wie eine Türklingel: <em>"Solange du drückst &rarr; es klingelt. Lässt du los &rarr; Ruhe."</em>
        </div>

        <hr class="section-divider">

        <div class="info-card">
          <h3>Entscheiden mit if und else</h3>
          <p><code>if</code> heißt <strong>wenn</strong>, <code>else</code> heißt <strong>sonst</strong>. In der runden Klammer steht eine <strong>Bedingung</strong>, also eine Frage, die der Arduino mit ja oder nein beantwortet:</p>

          <div class="code-card">
            <h4>Grundstruktur</h4>
            <pre><code><span class="keyword">if</span> (bedingung) {
  <span class="comment">// das passiert, WENN die Bedingung stimmt</span>
} <span class="keyword">else</span> {
  <span class="comment">// das passiert SONST</span>
}</code></pre>
          </div>

          <p>Es läuft immer nur <strong>einer</strong> der beiden Teile, nie beide gleichzeitig.</p>
        </div>

        <hr class="section-divider">

        <div class="info-card">
          <h3>Das Programm: Taster gedrückt = LED an</h3>

          <div class="code-card">
            <h4>Taster steuert LED</h4>
            <pre><code><span class="keyword">int</span> tasterPin = <span class="value">7</span>;
<span class="keyword">int</span> ledPin = <span class="value">8</span>;

<span class="keyword">void</span> <span class="function">setup</span>() {
  <span class="function">pinMode</span>(tasterPin, INPUT_PULLUP);  <span class="comment">// Taster mit Pull-up</span>
  <span class="function">pinMode</span>(ledPin, OUTPUT);            <span class="comment">// LED als Ausgang</span>
}

<span class="keyword">void</span> <span class="function">loop</span>() {
  <span class="keyword">int</span> zustand = <span class="function">digitalRead</span>(tasterPin);  <span class="comment">// Taster lesen</span>

  <span class="keyword">if</span> (zustand == LOW) {         <span class="comment">// LOW = gedrückt (Pull-up!)</span>
    <span class="function">digitalWrite</span>(ledPin, HIGH);  <span class="comment">// LED an</span>
  } <span class="keyword">else</span> {
    <span class="function">digitalWrite</span>(ledPin, LOW);   <span class="comment">// LED aus</span>
  }
}</code></pre>
          </div>

          <div class="tip-box">
            <strong>Warum LOW = gedrückt?</strong> Weil wir <code>INPUT_PULLUP</code> verwenden (Lektion 4): Der eingebaute Widerstand zieht den Pin auf HIGH. Erst wenn du drückst, verbindet der Taster den Pin mit GND &rarr; LOW.
          </div>
        </div>

        <div class="warning-box">
          <strong>Achtung, zwei Gleichheitszeichen!</strong> In der Bedingung steht <code>==</code>. Das heißt: <em>"Ist zustand gleich LOW?"</em><br>
          Ein einzelnes <code>=</code> heißt dagegen: <em>"Setze zustand auf LOW!"</em> Dann wird nichts verglichen, und die LED geht nie an.
        </div>

        <hr class="section-divider">

        <div class="info-card">
          <h3>Das Programm als Flussdiagramm</h3>
          <p>Die Bedingung im <code>if</code> wird zur <strong>Raute</strong>. Aus der Raute führen zwei Wege heraus: <strong>ja</strong> (if-Teil) und <strong>nein</strong> (else-Teil).</p>

          [[FLOW]]

          <p>Der Arduino liest den Taster. Ist er gedrückt? Bei <strong>ja</strong> geht die LED an, bei <strong>nein</strong> geht sie aus. Danach beginnt <code>loop()</code> von vorn.</p>
        </div>

        <div class="tip-box">
          <strong>Jetzt bist du dran:</strong> Weiter unten im Abschnitt <strong>&bdquo;Praxis &ndash; selber bauen&ldquo;</strong> findest du das Steckbrett-Bild und die Aufbau-Schritte.
        </div>

        <div class="warning-box">
          <strong>Klappt nicht? So findest du den Fehler</strong>
          <ul style="margin-top:0.5rem; margin-left:1.25rem;">
            <li><strong>LED reagiert nie:</strong> Steht in der Bedingung nur ein <code>=</code>? Zum Vergleichen braucht man <code>==</code>.</li>
            <li><strong>LED leuchtet genau dann, wenn du NICHT drückst:</strong> Bei INPUT_PULLUP ist gedrückt = LOW. Prüfe auf <code>LOW</code>, nicht auf <code>HIGH</code>.</li>
            <li><strong>Gar nichts passiert:</strong> Sind <code>tasterPin</code> (7) und <code>ledPin</code> (8) im Code vertauscht oder die Kabel falsch gesteckt? Ist die LED richtig herum?</li>
          </ul>
        </div>
      $html$, '[[FLOW]]', flow);

  prax := jsonb_set($prax${
 "aufgabe": {
  "titel": "Klingel-Licht: LED leuchtet, solange du drückst",
  "auftrag": "<p>Baue eine Schaltung mit einem Taster an <strong>Pin 7</strong> und einer roten LED an <strong>Pin 8</strong>. Die LED soll leuchten, solange du den Taster drückst.</p><p><strong>Deine zwei Aufgaben:</strong></p><ol><li><strong>Hardware:</strong> Baue die Schaltung nach dem Bild unten auf.</li><li><strong>Software:</strong> Vervollständige das Code-Gerüst weiter unten und lade es auf deinen Arduino.</li></ol><p><strong>Schon fertig? Dann probiere das:</strong></p><ol><li><strong>Umgekehrt:</strong> Die LED leuchtet dauernd und geht nur aus, solange du drückst.</li><li><strong>Blink-Taster:</strong> Die LED blinkt schnell, solange du drückst. Lässt du los, ist sie aus.</li></ol>",
  "lernziel": "Du kannst einen Taster und eine LED gemeinsam anschließen und die LED mit <code>if</code>/<code>else</code> über den Taster steuern."
 },
 "bauteile": [
  {"name": "Arduino Uno", "anzahl": 1},
  {"name": "Steckbrett (Breadboard)", "anzahl": 1},
  {"name": "Taster", "anzahl": 1, "hinweis": "Vier Beinchen, sitzt über der Mittelrinne"},
  {"name": "LED rot", "anzahl": 1, "hinweis": "Langes Bein = Plus (Anode)"},
  {"name": "Widerstand 220 Ω", "anzahl": 1, "hinweis": "Farbcode: rot-rot-braun"},
  {"name": "Jumper-Kabel", "anzahl": 6, "hinweis": "Stecker-Stecker"},
  {"name": "USB-Kabel", "anzahl": 1, "hinweis": "Zum Anschluss an den PC"}
 ],
 "anschluss": {
  "svg": "",
  "schritte": [
   "Stecke den <strong>Taster</strong> über die Mittelrinne: Seine vier Beinchen sitzen in <code>e5</code>, <code>e7</code>, <code>f5</code> und <code>f7</code>. <em>Buchstaben sind die Reihen, Zahlen die Spalten.</em>",
   "Verbinde mit einem <strong>blauen Kabel</strong> <strong>Pin 7</strong> des Arduino mit Loch <code>d5</code>. Über Spalte 5 hängt das Kabel am oberen linken Taster-Bein.",
   "Verbinde mit einem <strong>schwarzen Kabel</strong> Loch <code>g7</code> mit der unteren <strong>&minus;Schiene</strong> (blau). Das ist das Taster-Bein <strong>diagonal</strong> gegenüber.",
   "Stecke den <strong>220&nbsp;&Omega;-Widerstand</strong> von <code>c11</code> nach <code>c12</code>.",
   "Stecke die <strong>LED</strong>: das <strong>lange Bein</strong> (Plus) in <code>a12</code>, das <strong>kurze Bein</strong> (Minus) in <code>a13</code>.",
   "Verbinde mit einem <strong>roten Kabel</strong> <strong>Pin 8</strong> des Arduino mit Loch <code>a11</code>. <em>(So fließt der Strom von Pin&nbsp;8 über den Widerstand zur LED.)</em>",
   "Verbinde mit einem <strong>schwarzen Kabel</strong> Loch <code>b13</code> mit der oberen <strong>&minus;Schiene</strong> (blau).",
   "Verbinde einen <strong>GND-Pin</strong> des Arduino mit der oberen <strong>&minus;Schiene</strong>. Verbinde dann die obere und die untere &minus;Schiene mit einem weiteren schwarzen Kabel (im Bild rechts außen). Ohne diese Brücke hat der Taster keine Verbindung zu GND.",
   "Schließe den Arduino mit dem USB-Kabel an den PC an."
  ]
 },
 "code_hinweise": {
  "geruest": "int tasterPin = 7;\nint ledPin = 8;\n\nvoid setup() {\n  // TODO: Taster-Pin als Eingang mit Pull-up festlegen\n  // TODO: LED-Pin als Ausgang festlegen\n}\n\nvoid loop() {\n  int zustand = digitalRead(tasterPin);\n\n  if (zustand == ?) {      // TODO: Welcher Wert heißt \"gedrückt\"?\n    // TODO: LED einschalten\n  } else {\n    // TODO: LED ausschalten\n  }\n}",
  "tipps": [
   "Der Taster-Pin braucht <code>INPUT_PULLUP</code>, der LED-Pin <code>OUTPUT</code>.",
   "Bei <code>INPUT_PULLUP</code> liefert der gedrückte Taster <code>LOW</code>.",
   "Für den Blink-Taster kennst du schon alles aus Lektion 1: an, <code>delay(200)</code>, aus, <code>delay(200)</code>. Das kommt in den if-Teil."
  ]
 }
}$prax$::jsonb, '{anschluss,svg}', to_jsonb(
    '<figure class="schaltbild-figur"><figcaption><strong>Aufbau am Steckbrett</strong> &mdash; so sieht der echte Aufbau aus:</figcaption>'
    || board || '</figure>'));

  update public.lessons
  set content = jsonb_set(jsonb_set(jsonb_set(content,
        '{explanation,html}', to_jsonb(newh)),
        '{example}', $ex${
 "title": "Schritt für Schritt: Was passiert beim Drücken?",
 "steps": [
  {"label": "Niemand drückt", "html": "Der Pull-up hält Pin 7 auf <code>HIGH</code>. Die Bedingung <code>zustand == LOW</code> stimmt nicht. Also läuft der <code>else</code>-Teil: Die LED ist aus."},
  {"label": "Du drückst", "html": "Der Taster verbindet Pin 7 mit GND. <code>digitalRead(tasterPin)</code> liefert jetzt <code>LOW</code>. Die Bedingung stimmt, der <code>if</code>-Teil läuft: <code>digitalWrite(ledPin, HIGH)</code> schaltet die LED an."},
  {"label": "Du lässt los", "html": "Pin 7 springt zurück auf <code>HIGH</code>. Beim nächsten Durchlauf läuft wieder der <code>else</code>-Teil, die LED geht aus."},
  {"label": "Immer wieder", "html": "<code>loop()</code> läuft viele tausend Mal pro Sekunde. Der Arduino fragt den Taster also ständig neu ab. Darum reagiert die LED sofort."}
 ]
}$ex$::jsonb),
        '{praxis}', prax, true)
  where id = lid and content->'praxis' is null;
  if not found then raise exception 'Lektion 5: Update trifft nicht (Praxis schon da?)'; end if;
end $do$;

-- ---------- Übungen: 2 (Zuordnen), 3 und 5 passend zum neuen Stoff ----------
do $do$
begin
  update public.exercises set payload = $p${
 "type": "matching",
 "question": "Ordne die Code-Elemente den richtigen Erklärungen zu:",
 "pairs": [
  {"left": "if (bedingung)", "right": "Prüft, ob eine Bedingung wahr ist"},
  {"left": "else", "right": "Wird ausgeführt, wenn die Bedingung falsch ist"},
  {"left": "== (doppeltes Gleich)", "right": "Vergleicht zwei Werte miteinander"},
  {"left": "= (einfaches Gleich)", "right": "Speichert einen Wert in einer Variablen"},
  {"left": "digitalRead(tasterPin)", "right": "Liest, ob der Taster gerade gedrückt ist"}
 ],
 "explanation": "if prüft eine Bedingung und führt den Code nur aus, wenn sie wahr ist; else springt ein, wenn sie falsch ist. Wichtig ist der Unterschied zwischen == (vergleicht zwei Werte) und einem einzelnen = (speichert einen Wert). digitalRead(tasterPin) liefert den Wert, den die Bedingung dann prüft."
}$p$::jsonb
  where id = '0da7a7e2-6969-4876-b40c-c39fb931363a' and payload->'pairs'->4->>'left' = 'bool';
  if not found then raise exception 'Übung 2 trifft nicht'; end if;

  update public.exercises set payload = $p${
 "type": "multiple-choice",
 "question": "Du hast alles aufgebaut. Aber die LED leuchtet genau dann, wenn du NICHT drückst, und geht beim Drücken aus. Was ist der Fehler?",
 "options": [
  "Die LED steckt falsch herum",
  "Die Bedingung prüft auf HIGH statt auf LOW",
  "Der Vorwiderstand ist zu groß",
  "Das USB-Kabel liefert zu wenig Strom"
 ],
 "correct": 1,
 "explanation": "Richtig! Bei INPUT_PULLUP liefert der gedrückte Taster LOW. Steht in der Bedingung zustand == HIGH, ist sie genau dann wahr, wenn niemand drückt. Mit zustand == LOW passt es.",
 "wrongExplanations": {
  "0": "Eine falsch herum gesteckte LED leuchtet gar nicht. Hier leuchtet sie ja, nur im falschen Moment. Der Fehler steckt also im Code.",
  "2": "Ein zu großer Widerstand macht die LED nur dunkler. Er ändert nichts daran, WANN sie leuchtet.",
  "3": "Bei zu wenig Strom würde gar nichts gehen. Die LED reagiert aber auf den Taster, nur genau verkehrt herum."
 }
}$p$::jsonb
  where id = '554c0b41-9973-46e7-bbb3-d0251816bbca' and payload->>'question' like 'Warum braucht der Toggle-Code%';
  if not found then raise exception 'Übung 3 trifft nicht'; end if;

  update public.exercises set payload = $p${
 "type": "multiple-choice",
 "question": "Der Taster ist NICHT gedrückt. Welcher Befehl wird ausgeführt?\nif (zustand == LOW) { digitalWrite(ledPin, HIGH); } else { digitalWrite(ledPin, LOW); }",
 "options": [
  "digitalWrite(ledPin, HIGH), weil der if-Teil immer zuerst läuft",
  "Beide Befehle nacheinander",
  "digitalWrite(ledPin, LOW), weil der else-Teil läuft",
  "Keiner von beiden"
 ],
 "correct": 2,
 "explanation": "Richtig! Ohne Druck liefert der Taster HIGH. Die Bedingung zustand == LOW ist falsch, also läuft der else-Teil und schaltet die LED aus.",
 "wrongExplanations": {
  "0": "Der if-Teil läuft nur, wenn die Bedingung stimmt. Ohne Druck ist zustand HIGH, die Bedingung zustand == LOW ist also falsch.",
  "1": "Bei if/else läuft immer nur einer der beiden Teile, nie beide. Welcher, entscheidet die Bedingung.",
  "3": "Einer der beiden Teile läuft immer: Stimmt die Bedingung, der if-Teil. Stimmt sie nicht, der else-Teil."
 }
}$p$::jsonb
  where id = '7f0725d8-4803-4840-838d-cb531634e952' and payload->>'question' like 'Im Toggle-Code steht%';
  if not found then raise exception 'Übung 5 trifft nicht'; end if;
end $do$;

-- ---------- Kompetenztest: Fragen 4-8 an den neuen Stoff anpassen (IDs bleiben) ----------
do $do$
begin
  update public.test_questions
  set payload = jsonb_set(payload, '{question}', to_jsonb('Was passiert im Programm, wenn die Bedingung if (zustand == LOW) wahr ist?'::text))
  where id = '90dc9872-3a79-46aa-8e04-b66f23f3c65f' and payload->>'question' like 'Was passiert in Version 1,%';
  if not found then raise exception 'Testfrage 4 trifft nicht'; end if;

  update public.test_questions set payload = $p${
 "type": "multiple-choice",
 "question": "Die LED geht nie an, obwohl du den Taster drückst. Welcher Tippfehler in der Bedingung ist die Ursache?",
 "options": [
  "Dort steht HIGH statt LOW",
  "Dort steht = (Zuweisung) statt == (Vergleich)",
  "Dort fehlt das Wort else",
  "Dort steht LOW in Großbuchstaben"
 ],
 "correct": 1,
 "explanation": "== vergleicht zwei Werte, = setzt einen Wert. Schreibt man if (zustand = LOW), wird zustand auf LOW (= 0) gesetzt. 0 zählt als falsch, die Bedingung ist also nie erfüllt."
}$p$::jsonb
  where id = 'bf5345dc-6f8f-4b80-892e-2eb4e06c4daf' and payload->'options'->>3 = 'int mit bool zu verwechseln';
  if not found then raise exception 'Testfrage 5 trifft nicht'; end if;

  update public.test_questions set payload = $p${
 "type": "multiple-choice",
 "question": "Welche zwei pinMode-Einstellungen braucht das Programm für Taster und LED?",
 "options": [
  "Taster: OUTPUT, LED: INPUT_PULLUP",
  "Taster: OUTPUT, LED: OUTPUT",
  "Taster: INPUT_PULLUP, LED: OUTPUT",
  "Taster: INPUT_PULLUP, LED: INPUT_PULLUP"
 ],
 "correct": 2,
 "explanation": "Der Taster ist eine Eingabe und bekommt INPUT_PULLUP. Die LED ist eine Ausgabe und bekommt OUTPUT."
}$p$::jsonb
  where id = 'a100536b-5474-4429-b784-df5df26c6dfe' and payload->>'question' like 'Welche zwei Werte kann ein Datentyp bool%';
  if not found then raise exception 'Testfrage 6 trifft nicht'; end if;

  update public.test_questions set payload = $p${
 "type": "multiple-choice",
 "question": "Wozu braucht das Programm den else-Teil?",
 "options": [
  "Damit die LED heller leuchtet",
  "Damit der Taster entprellt wird",
  "Damit das Programm nach dem Drücken neu startet",
  "Damit die LED wieder ausgeht, wenn der Taster nicht gedrückt ist"
 ],
 "correct": 3,
 "explanation": "Der else-Teil läuft, wenn die Bedingung nicht stimmt, also wenn niemand drückt. Dort wird die LED ausgeschaltet. Ohne else bliebe sie nach dem ersten Druck an."
}$p$::jsonb
  where id = 'ff85a11e-65de-430d-bc48-57f05f44fcb5' and payload->>'question' like 'Was bewirkt das Ausrufezeichen%';
  if not found then raise exception 'Testfrage 7 trifft nicht'; end if;

  update public.test_questions set payload = $p${
 "type": "multiple-choice",
 "question": "Wie oft fragt der Arduino in diesem Programm den Taster ab?",
 "options": [
  "Bei jedem Durchlauf von loop(), also ständig neu",
  "Nur ein einziges Mal beim Einschalten",
  "Genau einmal pro Sekunde",
  "Nur, wenn die LED gerade aus ist"
 ],
 "correct": 0,
 "explanation": "digitalRead() und die if-Abfrage stehen in loop(). loop() wiederholt sich ständig, darum reagiert die LED sofort auf den Taster."
}$p$::jsonb
  where id = '30dec774-8329-4f39-bcec-af0f42976935' and payload->>'question' like 'Wozu dient die Variable letzterDruck%';
  if not found then raise exception 'Testfrage 8 trifft nicht'; end if;
end $do$;

-- ---------- Lehrer-Lösung: ohne Toggle, mit den zwei Zusatzaufgaben ----------
do $do$
begin
  update public.lesson_solutions set
    sketch = $s$// LED mit Taster steuern: solange gedrückt = LED an (if/else)

int tasterPin = 7;   // Taster an Pin 7 (Eingang)
int ledPin = 8;      // LED an Pin 8 (Ausgang)

void setup() {
  pinMode(tasterPin, INPUT_PULLUP);  // Taster mit internem Pull-up
  pinMode(ledPin, OUTPUT);           // LED als Ausgang
}

void loop() {
  int zustand = digitalRead(tasterPin);   // Taster lesen

  if (zustand == LOW) {          // LOW = gedrückt (wegen INPUT_PULLUP!); == ist Vergleich, nicht =
    digitalWrite(ledPin, HIGH);  // LED an
  } else {
    digitalWrite(ledPin, LOW);   // LED aus
  }
}

/* --- Zusatz 1 "Umgekehrt": HIGH und LOW in den beiden digitalWrite-Zeilen tauschen ---

  if (zustand == LOW) {
    digitalWrite(ledPin, LOW);   // gedrückt: LED aus
  } else {
    digitalWrite(ledPin, HIGH);  // nicht gedrückt: LED an
  }

   --- Zusatz 2 "Blink-Taster": im if-Teil blinken, im else-Teil aus ---

  if (zustand == LOW) {
    digitalWrite(ledPin, HIGH);
    delay(200);
    digitalWrite(ledPin, LOW);
    delay(200);
  } else {
    digitalWrite(ledPin, LOW);
  }
*/$s$,
    wiring = $s$Aufbau wie im Praxis-Bild. Taster über der Mittelrinne (Beine e5, e7, f5, f7): Pin 7 an d5, das diagonal gegenüberliegende Bein über g7 an die untere Minus-Schiene. Dank INPUT_PULLUP kein externer Widerstand.
LED: Pin 8 -> a11, 220-Ohm-Vorwiderstand c11 -> c12, LED mit Anode (langes Bein) in a12 und Kathode (kurzes Bein) in a13, b13 an die obere Minus-Schiene.
GND-Pin des Arduino an die obere Minus-Schiene; obere und untere Minus-Schiene mit einem Kabel verbinden (sonst hat der Taster kein GND). Stromweg: Taster gedrückt -> digitalRead(7) = LOW -> digitalWrite(8, HIGH) -> LED leuchtet.$s$,
    mistakes = $s$• = statt == in der Bedingung: if (zustand = LOW) weist zu statt zu vergleichen — LOW ist 0, die Zuweisung liefert 0 = falsch: die Bedingung ist NIE erfüllt, die LED geht nie an. Klassiker, gezielt thematisieren.
• Pull-up-Logik vertauscht: auf HIGH statt LOW geprüft -> LED leuchtet, wenn NICHT gedrückt wird.
• Brücke zwischen oberer und unterer Minus-Schiene vergessen: der Taster hängt an der unteren Schiene und hat dann keine GND-Verbindung -> Drücken bewirkt nichts.
• Taster-Kabel an zwei intern verbundenen Beinen statt diagonal: Pin liegt dauerhaft auf GND, LED leuchtet immer.
• tasterPin und ledPin im Code vertauscht oder Kabel falsch gesteckt: Eingang/Ausgang verwechselt.$s$,
    didactics = $s$• Prüfungsbezug: Hier verbinden sich die Kern-Prüfungsbausteine — digitalRead, if/else, digitalWrite, INPUT_PULLUP. Das Muster "Eingang abfragen -> Bedingung -> Ausgang schalten" ist das Grundgerüst fast jeder Steuerungs-Aufgabe der BW-Abschlussprüfung.
• Den Unterschied = (zuweisen) vs. == (vergleichen) explizit an der Tafel gegenüberstellen ("Mach die Tür auf!" vs. "Ist die Tür offen?") — das ist der häufigste Logikfehler.
• Die Lektion ist bewusst schlank: nur Taster -> LED mit if/else, dann sofort bauen. Der Umschalter (Toggle mit bool und Merk-Variable) kommt erst in Modul 5 bei der Lüftung, die Vergleichszeichen (<=, >=, ||) in Modul 3 bei PWM. Schnelle Schüler:innen bekommen die zwei Zusatzaufgaben im Praxisteil (Umgekehrt, Blink-Taster).$s$,
    updated_at = now()
  where lesson_id = 'a350f242-1ced-48bd-a485-863fbf1002aa' and sketch like '%Version 2: Toggle%';
  if not found then raise exception 'Lehrer-Lösung L5 trifft nicht'; end if;

  update public.lesson_solutions
  set didactics = replace(didactics, 'erst hier kurz ankündigen, vertiefen in der nächsten Lektion', 'hier nur kurz ankündigen'),
      updated_at = now()
  where lesson_id = '185aa5cd-823e-4a7a-b361-8adf7f6081de'
    and didactics like '%erst hier kurz ankündigen, vertiefen in der nächsten Lektion%';
  if not found then raise exception 'Lehrer-Lösung L4 trifft nicht'; end if;
end $do$;

commit;
