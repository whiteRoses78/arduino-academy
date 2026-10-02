// M5 Projekt — Korrekturen aus der Gesamtprüfung vom 02.10.2026.
// Einspielen: siehe Kopf von db/content-patch.mjs. Generiert, nicht von Hand ändern.
export default {
 "module": "projekt",
 "text": [
  {
   "slug": "ampel-mit-fussgaengerueberweg",
   "from": "Stecke den <strong>Taster</strong> über die Mittelrille des Steckbretts.",
   "to": "Stecke den <strong>Taster</strong> über die Mittelrinne des Steckbretts."
  },
  {
   "slug": "ampel-mit-fussgaengerueberweg",
   "path": [
    "example",
    "steps",
    3,
    "html"
   ],
   "old": "Code hochladen. Die Auto-Ampel sollte Grün leuchten, die Fußgänger-Ampel Rot. Drücke den Taster und beobachte den kompletten Ablauf. Zähle mit: Gelb 2s, Rot, Fußgänger-Grün 5s, Blinken, Rot-Gelb 1s, Grün.",
   "value": "Code hochladen. Die Auto-Ampel sollte Grün leuchten, die Fußgänger-Ampel Rot. Drücke den Taster und beobachte den kompletten Ablauf. Zähle mit: Gelb 2s, Rot, Fußgänger-Grün 5s, Blinken, Rot-Gelb 1s, Grün.<div class=\"tip-box\" style=\"margin-top:0.75rem;\"><strong>Klappt nicht? So suchst du den Fehler:</strong><ul style=\"margin:0.4rem 0 0 1.25rem;\"><li><strong>Sequenz startet dauernd von selbst:</strong> Die Taster-Beinchen sind immer verbunden. Steck den Taster über die Mittelrinne und nutze zwei diagonal gegenüberliegende Beinchen. Oder dein Code prüft auf <code>== HIGH</code> statt <code>== LOW</code>.</li><li><strong>Sequenz startet nie:</strong> Das Kabel von Pin 7 oder von GND steckt nicht in der Spalte eines Taster-Beinchens.</li><li><strong>Eine LED bleibt dunkel:</strong> Dreh sie um (langes Bein zum Widerstand). Vergleiche die Pin-Nummer im Code mit dem Kabel am Arduino.</li></ul></div>"
  },
  {
   "slug": "ampel-mit-fussgaengerueberweg",
   "from": "<h3>Neu: Die for-Schleife</h3>\n          <p>Fuer das Blinken der Fussgaenger-LED brauchen wir eine <strong>for-Schleife</strong> – sie wiederholt etwas eine bestimmte Anzahl von Malen.</p>",
   "to": "<h3>Wiederholung: Die for-Schleife</h3>\n          <p>Die <strong>for-Schleife</strong> kennst du vom Servo-Sweep in Modul 4: Dort hast du damit Winkel hochgezählt. Hier zählen wir Blinkvorgänge der Fußgänger-LED. Die Schleife wiederholt etwas eine bestimmte Anzahl von Malen.</p>"
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "from": "Unter 300 = dunkel = Ampel aktiv.",
   "to": "Unter 300 = dunkel = Nachtmodus (nur Gelb blinkt)."
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "path": [
    "example",
    "steps",
    3,
    "html"
   ],
   "old": "Baue den Schwellenwert in deinen Ampel-Code ein. Halte die Hand über den LDR → Ampel geht an (dunkel). Nimm die Hand weg → alle LEDs aus (hell). Klappt? Perfekt!",
   "value": "Baue den Schwellenwert in deinen Ampel-Code ein. Nimm die Hand weg (hell) → die Ampel läuft normal: Auto Grün, Fußgänger Rot, der Taster startet die Sequenz. Halte die Hand über den LDR (dunkel) → alle LEDs aus, nur Auto-Gelb blinkt. Klappt? Perfekt!<div class=\"tip-box\" style=\"margin-top:0.75rem;\"><strong>Klappt nicht? So suchst du den Fehler:</strong><ul style=\"margin:0.4rem 0 0 1.25rem;\"><li><strong>Serial Monitor zeigt immer 0 oder 1023:</strong> Das A0-Kabel steckt nicht in der Spalte zwischen LDR und 10-kOhm-Widerstand, oder ein Bein des Spannungsteilers hat keinen Kontakt.</li><li><strong>Ampel bleibt immer im Nachtmodus (oder nie):</strong> Notiere Hell- und Dunkelwert aus dem Serial Monitor und lege die SCHWELLE dazwischen.</li></ul></div>"
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "from": "Nachts blinken sie nur noch gelb oder gehen komplett aus. Warum? Weil nachts kaum Verkehr ist und die Ampel Strom sparen kann.",
   "to": "Nachts blinkt nur noch das gelbe Licht der Auto-Ampel, die Fußgänger-Ampel ist aus. Warum? Weil nachts kaum Verkehr ist und die Ampel Strom sparen kann."
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "from": "Tagsüber ist sie aus (hell genug). Wenn es dunkel wird, schaltet sie sich automatisch ein. Unsere Ampel macht es genau umgekehrt: Sie ist nur aktiv, wenn es dunkel genug ist (= normaler Betrieb im Dunkeln). Wenn es hell ist (tagsüber an einer ruhigen Straße), \"schläft\" sie.",
   "to": "Tagsüber ist sie aus (hell genug). Wenn es dunkel wird, schaltet sie sich automatisch ein. Genauso entscheidet unsere Ampel mit dem LDR: Tagsüber läuft sie normal. Wird es dunkel, schaltet sie von selbst in den Nachtmodus und lässt nur noch Gelb blinken."
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "from": "<line x1=\"560\" y1=\"280\" x2=\"560\" y2=\"250\" stroke=\"#c00\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"560\" cy=\"294\" r=\"2.5\" fill=\"#c00\"/><polyline points=\"560,294 550,294 550,230\" fill=\"none\" stroke=\"#c00\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"550\" cy=\"230\" r=\"2.5\" fill=\"#c00\"/>"
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "from": "Die Idee ist einfach: In der <code>loop()</code> prüfen wir <strong>zuerst</strong>, ob es dunkel genug ist. Nur dann läuft die Ampel normal. Wenn es hell ist, sind alle LEDs aus.",
   "to": "Die Idee ist einfach: In der <code>loop()</code> prüfen wir <strong>zuerst</strong>, ob es hell genug ist. Dann läuft die Ampel normal. Ist es dunkel, schaltet sie in den Nachtmodus: alle LEDs aus, nur Auto-Gelb blinkt."
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "from": "<div class=\"info-card\" style=\"border-top: 3px solid #e74c3c;\">\n            <h3>Wenn hell (Wert > Schwelle)</h3>\n            <p>Alle LEDs ausschalten. Die Ampel \"schläft\". Kein Ampelbetrieb nötig.</p>\n          </div>\n          <div class=\"info-card\" style=\"border-top: 3px solid #2ecc71;\">\n            <h3>Wenn dunkel (Wert <= Schwelle)</h3>\n            <p>Normaler Ampelbetrieb: Auto Grün, Fußgänger Rot. Taster reagiert wie gewohnt.</p>\n          </div>",
   "to": "<div class=\"info-card\" style=\"border-top: 3px solid #2ecc71;\">\n            <h3>Wenn hell (Wert > Schwelle)</h3>\n            <p>Normaler Ampelbetrieb: Auto Grün, Fußgänger Rot. Der Taster startet wie gewohnt die Sequenz.</p>\n          </div>\n          <div class=\"info-card\" style=\"border-top: 3px solid #f1c40f;\">\n            <h3>Wenn dunkel (Wert <= Schwelle)</h3>\n            <p>Nachtmodus: Alle LEDs aus, nur Auto-Gelb blinkt. Der Taster wird nicht beachtet.</p>\n          </div>"
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "from": "bei Wert &le; 300 ist es dunkel – nur dann läuft die Ampel.",
   "to": "bei Wert &le; 300 ist es dunkel – dann blinkt nur Gelb. Darüber läuft die Ampel normal."
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "from": "st.textContent=dunkel?'Ampel AKTIV – normaler Betrieb':'Ampel schläft – alle LEDs aus';st.style.color=dunkel?'#27AE60':'#999';",
   "to": "st.textContent=dunkel?'Nachtmodus – nur Gelb blinkt':'Ampel läuft normal';st.style.color=dunkel?'#B7950B':'#27AE60';"
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "from": "<strong id=\"ldrsim-status\" style=\"color:#999;\">Ampel schläft – alle LEDs aus</strong>",
   "to": "<strong id=\"ldrsim-status\" style=\"color:#27AE60;\">Ampel läuft normal</strong>"
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "from": "Genau bei <strong>300</strong> \"wacht\" die Ampel auf (Wert &le; 300 = dunkel = normaler Betrieb).",
   "to": "Genau bei <strong>300</strong> schaltet die Ampel in den Nachtmodus (Wert &le; 300 = dunkel = nur Gelb blinkt)."
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "from": "<pre><code><span class=\"keyword\">int</span> SCHWELLE = <span class=\"value\">300</span>;  <span class=\"comment\">// Schwellenwert – anpassen!</span>\n\n<span class=\"keyword\">void</span> <span class=\"function\">loop</span>() {\n  <span class=\"keyword\">int</span> lichtWert = <span class=\"function\">analogRead</span>(A0);  <span class=\"comment\">// LDR auslesen</span>\n\n  <span class=\"keyword\">if</span> (lichtWert <= SCHWELLE) {\n    <span class=\"comment\">// --- DUNKEL: Ampel ist aktiv ---</span>\n    <span class=\"comment\">// Normalzustand herstellen</span>\n    <span class=\"function\">digitalWrite</span>(autoGruen, HIGH);\n    <span class=\"function\">digitalWrite</span>(fussRot, HIGH);\n\n    <span class=\"comment\">// Auf Tastendruck pruefen</span>\n    <span class=\"keyword\">if</span> (<span class=\"function\">digitalRead</span>(taster) == LOW) {\n      <span class=\"comment\">// ... Ampel-Sequenz wie in Lektion 21 ...</span>\n    }\n  } <span class=\"keyword\">else</span> {\n    <span class=\"comment\">// --- HELL: Ampel schlaeft ---</span>\n    <span class=\"function\">digitalWrite</span>(autoRot, LOW);\n    <span class=\"function\">digitalWrite</span>(autoGelb, LOW);\n    <span class=\"function\">digitalWrite</span>(autoGruen, LOW);\n    <span class=\"function\">digitalWrite</span>(fussRot, LOW);\n    <span class=\"function\">digitalWrite</span>(fussGruen, LOW);\n  }\n}</code></pre>",
   "to": "<pre><code><span class=\"keyword\">int</span> SCHWELLE = <span class=\"value\">300</span>;  <span class=\"comment\">// Schwellenwert – anpassen!</span>\n\n<span class=\"keyword\">void</span> <span class=\"function\">loop</span>() {\n  <span class=\"keyword\">int</span> lichtWert = <span class=\"function\">analogRead</span>(A0);  <span class=\"comment\">// LDR auslesen</span>\n\n  <span class=\"keyword\">if</span> (lichtWert > SCHWELLE) {\n    <span class=\"comment\">// --- HELL (Tag): normaler Ampelbetrieb ---</span>\n    <span class=\"function\">digitalWrite</span>(autoGelb, LOW);    <span class=\"comment\">// Gelb aus (blinkt nur nachts)</span>\n    <span class=\"function\">digitalWrite</span>(autoGruen, HIGH);\n    <span class=\"function\">digitalWrite</span>(fussRot, HIGH);\n\n    <span class=\"comment\">// Auf Tastendruck prüfen</span>\n    <span class=\"keyword\">if</span> (<span class=\"function\">digitalRead</span>(taster) == LOW) {\n      <span class=\"comment\">// ... Ampel-Sequenz wie in Lektion 21 ...</span>\n    }\n  } <span class=\"keyword\">else</span> {\n    <span class=\"comment\">// --- DUNKEL (Nacht): Nachtmodus, nur Auto-Gelb blinkt ---</span>\n    <span class=\"function\">digitalWrite</span>(autoRot, LOW);\n    <span class=\"function\">digitalWrite</span>(autoGruen, LOW);\n    <span class=\"function\">digitalWrite</span>(fussRot, LOW);\n    <span class=\"function\">digitalWrite</span>(fussGruen, LOW);\n    <span class=\"function\">digitalWrite</span>(autoGelb, HIGH);  <span class=\"comment\">// Gelb an ...</span>\n    <span class=\"function\">delay</span>(<span class=\"value\">500</span>);\n    <span class=\"function\">digitalWrite</span>(autoGelb, LOW);   <span class=\"comment\">// ... und wieder aus = Blinken</span>\n    <span class=\"function\">delay</span>(<span class=\"value\">500</span>);\n  }\n}</code></pre>"
  },
  {
   "slug": "nachtabschaltung-mit-lichtsensor",
   "from": "Was bei deinem Nachbarn 300 ist, kann bei dir 200 oder 400 sein.\n        </div>",
   "to": "Was bei deinem Nachbarn 300 ist, kann bei dir 200 oder 400 sein.\n        </div>\n\n        <div class=\"tip-box\">\n          <strong>Flackert die Ampel in der Dämmerung?</strong> Liegt der LDR-Wert genau um die Schwelle, springt die Ampel ständig zwischen Tagbetrieb und Nachtmodus hin und her. Abhilfe: zwei Schwellen mit einer Puffer-Zone dazwischen, wie in Modul 3 in der Lektion &bdquo;Entscheidungen mit Sensorwerten&ldquo;. Das nennt man <strong>Hysterese</strong>.\n        </div>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "path": [
    "example",
    "steps",
    3,
    "html"
   ],
   "old": "Baue den <strong>LDR-Spannungsteiler</strong> an A0 auf. Kalibriere den Schwellenwert mit dem Serial Monitor. Teste: Hand drüber (dunkel) → Ampel aktiv. Hand weg (hell) → Ampel aus. <strong>Funktioniert?</strong> Fertig!",
   "value": "Baue den <strong>LDR-Spannungsteiler</strong> an A0 auf. Kalibriere den Schwellenwert mit dem Serial Monitor. Teste: Hand weg (hell) → normaler Ampelbetrieb. Hand drüber (dunkel) → alle LEDs aus, nur Auto-Gelb blinkt. <strong>Funktioniert?</strong> Fertig!"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "path": [
    "example",
    "steps",
    4,
    "html"
   ],
   "old": "<strong>Gehe den kompletten Ablauf einmal durch:</strong> Ampel aus (hell) → Hand über LDR → Ampel an → Taster drücken → komplette Sequenz beobachten → Hand vom LDR → Ampel aus. Alles korrekt? Dann bist du prüfungsbereit!",
   "value": "<strong>Gehe den kompletten Ablauf einmal durch:</strong> Ampel läuft normal (hell) → Taster drücken → komplette Sequenz beobachten → Hand über den LDR → nur Gelb blinkt, der Taster reagiert nicht → Hand weg → Ampel läuft wieder normal. Alles korrekt? Dann bist du prüfungsbereit!"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "von dir auf der Lötplatine angeschlossen",
   "to": "von dir angeschlossen (auf Breadboard oder Platine)"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "Lochstreifen-Kupferplatine",
   "to": "Streifenrasterplatine",
   "count": 2
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<strong>Lochstreifenplatine</strong>",
   "to": "<strong>Streifenrasterplatine</strong>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<li>Steuerung mit if/else + Zustandsmaschine ✅</li>",
   "to": "<li>Steuerung mit if/else und einer festen Ablauf-Reihenfolge (Phasen 1–4) ✅</li>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<h3>Kompletter Schaltplan (Pin für Pin)</h3>",
   "to": "<h3>Pin-Belegung (Pin für Pin)</h3>\n          <p>Die Schaltzeichen dazu kennst du aus den Teil-Schaltplänen: LED mit Vorwiderstand (Modul 2) und LDR-Spannungsteiler (Modul 3). In der Prüfung zeichnest du daraus deinen eigenen Gesamt-Schaltplan.</p>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<line x1=\"560\" y1=\"280\" x2=\"560\" y2=\"250\" stroke=\"#c00\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"560\" cy=\"294\" r=\"2.5\" fill=\"#c00\"/><polyline points=\"560,294 550,294 550,230\" fill=\"none\" stroke=\"#c00\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"550\" cy=\"230\" r=\"2.5\" fill=\"#c00\"/>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<line x1=\"589\" y1=\"320\" x2=\"589\" y2=\"328\" stroke=\"#c00\" stroke-width=\"1.2\"/>\n            <line x1=\"594\" y1=\"320\" x2=\"594\" y2=\"328\" stroke=\"#a52\" stroke-width=\"1.2\"/>",
   "to": "<line x1=\"589\" y1=\"320\" x2=\"589\" y2=\"328\" stroke=\"#000\" stroke-width=\"1.2\"/>\n            <line x1=\"594\" y1=\"320\" x2=\"594\" y2=\"328\" stroke=\"#f80\" stroke-width=\"1.2\"/>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<li><strong>LDR prüfen:</strong> Ist es dunkel genug? (analogRead(A0) <= SCHWELLE)</li>\n            <li><strong>Wenn HELL:</strong> Alle LEDs aus → Ampel \"schläft\" → zurück zu Schritt 1</li>\n            <li><strong>Wenn DUNKEL:</strong> Normalzustand → Auto Grün, Fußgänger Rot</li>",
   "to": "<li><strong>LDR prüfen:</strong> Ist es hell genug? (analogRead(A0) > SCHWELLE)</li>\n            <li><strong>Wenn DUNKEL:</strong> Nachtmodus → alle LEDs aus, nur Auto-Gelb blinkt (0,5 s an, 0,5 s aus). Der Taster wird nachts nicht beachtet → zurück zu Schritt 1</li>\n            <li><strong>Wenn HELL:</strong> Normalzustand → Auto Grün, Fußgänger Rot</li>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<span class=\"comment\">// ========== NACHTMODUS PRUEFEN ==========</span>\n  <span class=\"keyword\">if</span> (lichtWert <= SCHWELLE) {\n    <span class=\"comment\">// --- ES IST DUNKEL: Ampel aktiv ---</span>\n\n    <span class=\"comment\">// Normalzustand: Auto Gruen, Fussgaenger Rot</span>\n    <span class=\"function\">digitalWrite</span>(autoGruen, HIGH);",
   "to": "<span class=\"comment\">// ========== HELLIGKEIT PRUEFEN ==========</span>\n  <span class=\"keyword\">if</span> (lichtWert > SCHWELLE) {\n    <span class=\"comment\">// --- ES IST HELL (Tag): normaler Ampelbetrieb ---</span>\n\n    <span class=\"comment\">// Normalzustand: Auto Gruen, Fussgaenger Rot</span>\n    <span class=\"function\">digitalWrite</span>(autoGelb, LOW);    <span class=\"comment\">// Gelb aus (blinkt nur nachts)</span>\n    <span class=\"function\">digitalWrite</span>(autoGruen, HIGH);"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<span class=\"comment\">// --- ES IST HELL: Ampel schlaeft ---</span>\n    <span class=\"function\">digitalWrite</span>(autoRot, LOW);\n    <span class=\"function\">digitalWrite</span>(autoGelb, LOW);\n    <span class=\"function\">digitalWrite</span>(autoGruen, LOW);\n    <span class=\"function\">digitalWrite</span>(fussRot, LOW);\n    <span class=\"function\">digitalWrite</span>(fussGruen, LOW);\n  }",
   "to": "<span class=\"comment\">// --- ES IST DUNKEL (Nacht): Nachtmodus, nur Auto-Gelb blinkt ---</span>\n    <span class=\"function\">digitalWrite</span>(autoRot, LOW);\n    <span class=\"function\">digitalWrite</span>(autoGruen, LOW);\n    <span class=\"function\">digitalWrite</span>(fussRot, LOW);\n    <span class=\"function\">digitalWrite</span>(fussGruen, LOW);\n    <span class=\"function\">digitalWrite</span>(autoGelb, HIGH);   <span class=\"comment\">// Gelb an ...</span>\n    <span class=\"function\">delay</span>(<span class=\"value\">500</span>);\n    <span class=\"function\">digitalWrite</span>(autoGelb, LOW);    <span class=\"comment\">// ... und wieder aus = Blinken</span>\n    <span class=\"function\">delay</span>(<span class=\"value\">500</span>);\n  }"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<span class=\"comment\">// Kurze Pause (stabiler Ablauf)</span>\n}</code></pre>\n        </div>\n\n        <hr class=\"section-divider\">",
   "to": "<span class=\"comment\">// Kurze Pause (stabiler Ablauf)</span>\n}</code></pre>\n        </div>\n\n        <div class=\"tip-box\">\n          <strong>Flackert die Ampel in der Dämmerung?</strong> Liegt der LDR-Wert genau um die Schwelle, springt die Ampel ständig zwischen Tagbetrieb und Nachtmodus hin und her. Abhilfe: zwei Schwellen mit einer Puffer-Zone dazwischen, wie in Modul 3 in der Lektion &bdquo;Entscheidungen mit Sensorwerten&ldquo;. Das nennt man <strong>Hysterese</strong>.\n        </div>\n\n        <hr class=\"section-divider\">"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "oder du nimmst einfach einen scharfen Cuttermesser.",
   "to": "oder du nimmst einfach ein scharfes Cuttermesser."
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<strong>320 °C</strong> für bleihaltiges Lot (60/40), <strong>340–360 °C</strong> für bleifreies Lot.",
   "to": "Für unser <strong>bleifreies Lot</strong> etwa <strong>340–360 °C</strong>."
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "In der Schule meist bleihaltig (60 % Zinn, 40 % Blei) – schmilzt einfacher und niedriger.",
   "to": "Bei uns <strong>bleifrei</strong>. Es schmilzt erst bei etwa 220 °C, deshalb muss der Kolben heißer sein als bei altem, bleihaltigem Lot."
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<h4 style=\"margin-top:1.5rem;\">Der Lötvorgang Schritt für Schritt</h4>",
   "to": "<div class=\"warning-box\" style=\"margin-top:1.5rem;\">\n            <strong>Sicher löten – diese Regeln gelten immer:</strong>\n            <ul style=\"margin-top:0.5rem; margin-left:1.25rem;\">\n              <li>Den Lötkolben <strong>immer in die Ablage</strong> stellen, nie auf den Tisch legen.</li>\n              <li>Spitze und frische Lötstelle <strong>nicht anfassen</strong>: Die Spitze wird bis zu 360 °C heiß.</li>\n              <li><strong>Lötrauch nicht einatmen:</strong> Absaugung einschalten oder Fenster öffnen, den Kopf nicht direkt über die Lötstelle halten.</li>\n              <li><strong>Schutzbrille</strong> tragen, auch beim Abknipsen der Beinchen.</li>\n              <li>Nach dem Löten <strong>Hände waschen</strong>. Am Lötplatz nicht essen und nicht trinken.</li>\n            </ul>\n          </div>\n\n          <h4 style=\"margin-top:1.5rem;\">Der Lötvorgang Schritt für Schritt</h4>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "aussieht wie eine kleine <em>Kuppel</em> oder ein <em>Berg mit spitzem Gipfel</em>, ist sie meist kalt.",
   "to": "aussieht wie eine kleine <em>Kuppel</em> (ein runder Klumpen), ist sie meist kalt."
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "Wenn unsicher: Nochmal heiß machen, frisches Lot dazu, kurz halten.</p>",
   "to": "Wenn unsicher: Nochmal heiß machen, frisches Lot dazu, kurz halten.</p>\n          <p><strong>Gut zu wissen:</strong> Bleifreies Lot glänzt auch bei einer guten Lötstelle etwas weniger. Entscheidend sind die Kegelform und dass das Lot Bein und Pad sauber umschließt.</p>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "Relais = elektronischer Schalter, der mit einem 5-V-Signal vom Arduino eine getrennte Last (z.&nbsp;B. 230 V) schaltet.",
   "to": "Relais = elektronischer Schalter, der mit einem 5-V-Signal vom Arduino einen getrennten Stromkreis schaltet (z.&nbsp;B. eine Kleinspannungs-Lampe mit eigener Batterie). <strong>Netzspannung (230 V) ist im Unterricht und in der Prüfung tabu.</strong> Das Relais-Modul hatten wir im Kurs nicht: Den Anschluss klärst du mit deiner Lehrkraft."
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<tr><td>DC-Motor (max. 100 mA)</td><td>per NPN-Transistor (BC547) + Freilaufdiode an Pin 9 (PWM). Stärkerer Motor &rarr; BC337 (800 mA) oder TIP120 (5 A).</td></tr>",
   "to": "<tr><td>DC-Motor (max. 100 mA)</td><td>Motor zwischen +5V und Collector des BC547, Emitter an GND (Aufbau wie in Modul 4, Lektion &bdquo;Transistor als Schalter&ldquo;). Stärkerer Motor &rarr; L298N (Modul 4).</td></tr>\n            <tr><td>Widerstand 1 kOhm (braun-schwarz-rot)</td><td>Pin 9 (PWM) &rarr; 1 kOhm &rarr; Basis des BC547. Begrenzt den Basisstrom und schützt den Pin.</td></tr>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<tr><td>Freilaufdiode 1N4148</td><td>parallel zum Motor (Kathode/Ring an +5V) &mdash; schützt den Arduino vor Spannungsspitzen</td></tr>",
   "to": "<tr><td>Freilaufdiode 1N4148 (oder 1N4007)</td><td>parallel zum Motor (Kathode/Ring an +5V) &mdash; schützt den Transistor vor der Spannungsspitze der Motorspule</td></tr>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<span class=\"comment\">// Zustand</span>\n<span class=\"keyword\">bool</span> lueftungAn = <span class=\"value\">false</span>;",
   "to": "<span class=\"comment\">// Zustand</span>\n<span class=\"keyword\">bool</span> lueftungAn = <span class=\"value\">false</span>;\n<span class=\"keyword\">bool</span> letzterDruck = <span class=\"value\">false</span>;  <span class=\"comment\">// war der Taster beim letzten Durchlauf gedrückt?</span>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<span class=\"comment\">// Taster: ein/aus umschalten</span>\n  <span class=\"comment\">// Hinweis: vereinfacht. In der echten Pruefung Edge-Detection (alten</span>\n  <span class=\"comment\">// Zustand vs. neuen vergleichen), sonst togglet es waehrend des Druecks.</span>\n  <span class=\"keyword\">if</span> (<span class=\"function\">digitalRead</span>(tasterPin) == LOW) {\n    lueftungAn = !lueftungAn;\n    <span class=\"function\">delay</span>(<span class=\"value\">300</span>);   <span class=\"comment\">// Entprellung</span>\n  }",
   "to": "<span class=\"comment\">// Taster: ein/aus umschalten – nur bei einem NEUEN Druck,</span>\n  <span class=\"comment\">// wie in Modul 2 (LED mit Taster steuern)</span>\n  <span class=\"keyword\">bool</span> gedrueckt = (<span class=\"function\">digitalRead</span>(tasterPin) == LOW);\n  <span class=\"keyword\">if</span> (gedrueckt &amp;&amp; !letzterDruck) {\n    lueftungAn = !lueftungAn;\n  }\n  letzterDruck = gedrueckt;   <span class=\"comment\">// das delay(100) am Ende reicht als Entprellung</span>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "Achtung: Transistor und Freilaufdiode sind Pflicht für den DC-Motor, sonst geht der Arduino kaputt.",
   "to": "Achtung: Transistor, Basiswiderstand und Freilaufdiode sind Pflicht für den DC-Motor. Ohne Transistor überlastet der Motor den Arduino-Pin, ohne Diode kann die Spannungsspitze den Transistor zerstören."
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "GND (l&auml;ngstes Bein)",
   "to": "l&auml;ngstes Bein: GND (gem. Kathode)"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<li>Das <strong>l&auml;ngste Bein</strong> ist die <strong>gemeinsame Kathode</strong> &rarr; direkt an GND.</li>",
   "to": "<li>Das <strong>l&auml;ngste Bein</strong> ist das gemeinsame Bein. Bei der Bauform im Bild ist es die <strong>gemeinsame Kathode</strong> &rarr; direkt an GND.</li>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<li>Die drei Farb-Beine an <strong>drei PWM-Pins</strong> (die mit der Tilde&nbsp;~, z.&nbsp;B. 9, 10, 11).</li>\n          </ul>",
   "to": "<li>Die drei Farb-Beine an <strong>drei PWM-Pins</strong> (die mit der Tilde&nbsp;~, z.&nbsp;B. 9, 10, 11).</li>\n          </ul>\n\n          <div class=\"warning-box\">\n            <strong>Achtung, zwei Bauformen:</strong> Es gibt auch RGB-LEDs mit <strong>gemeinsamer Anode</strong>. Dort kommt das längste Bein an <strong>5V</strong>, und die Werte drehen sich um: <code>255</code> = aus, <code>0</code> = volle Helligkeit. Welche Bauform du hast, zeigt ein kurzer Test: Bleibt die LED mit dem langen Bein an GND dunkel, steck es an 5V.\n          </div>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<td>L19, (Regensensor = LDR-Variante)</td>",
   "to": "<td>L19; Regensensor: neues Bauteil</td>"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "Den Rest hast du in den Vorgängerlektionen schon geübt.",
   "to": "Die meisten Bauteile kennst du aus den Vorgängerlektionen. <strong>Relais-Modul, Lichtschranke, Regensensor, Umschalter und Summer</strong> hatten wir im Kurs nicht praktisch: Wie sie angeschlossen werden, klärst du mit deiner Lehrkraft."
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "Steuersignal &rarr; Pin 7.",
   "to": "Pin und Schaltlogik (HIGH oder LOW = an) klärst du mit deiner Lehrkraft, im Skelett ist es Pin 7."
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "// Heizen (Pin 7 schaltet Relais!)",
   "to": "// Heizen (bei manchen Relais-Modulen ist LOW = an – Lehrkraft fragen)"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "silbrig / glänzend / kegelförmig",
   "to": "silbrig / glatt / kegelförmig"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "Muss über die Mittelrille des Steckbretts",
   "to": "Muss über die Mittelrinne des Steckbretts"
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "from": "<li><strong>DC-Motor ohne Freilaufdiode</strong> – Spannungsspitzen zerstören den Arduino.",
   "to": "<li><strong>DC-Motor ohne Freilaufdiode</strong> – Die Spannungsspitze der Motorspule kann den Transistor zerstören."
  },
  {
   "slug": "pruefungsschaltung-komplett",
   "path": [
    "praxis"
   ],
   "add": {
    "aufgabe": {
     "titel": "Transfer-Aufgabe: Lampe mit Dämmerungssensor",
     "auftrag": "<p>Eine Lampe an der Hauswand soll Strom sparen: <strong>Nur wenn es dunkel ist</strong>, schaltet ein Tastendruck die Lampe für <strong>10 Sekunden</strong> ein. Bei Helligkeit bleibt sie aus, auch wenn jemand drückt. (Das ist eine Übungsaufgabe von uns, keine offizielle Prüfungsaufgabe.)</p><p><strong>Du baust nichts neu:</strong> Deine Prüfungsschaltung bleibt stecken. Die <strong>gelbe LED an Pin 3</strong> ist jetzt die Lampe. Taster (Pin 7) und LDR (A0) bleiben, wo sie sind.</p><p><strong>Deine Aufgaben:</strong></p><ol><li><strong>Messen:</strong> Lies Hell- und Dunkelwert im Serial Monitor ab und lege deine <code>SCHWELLE</code> dazwischen.</li><li><strong>Planen:</strong> Schreib in Worten auf, was bei Helligkeit passieren soll, was bei Dunkelheit und was bei Dunkelheit mit Tastendruck.</li><li><strong>Programmieren:</strong> Schreib einen neuen Sketch. Das Gerüst unten gibt dir nur den Aufbau als Kommentare vor.</li><li><strong>Testen:</strong> Prüfe alle drei Fälle aus Schritt 2.</li></ol><p><strong>Geschafft, wenn:</strong> Hand über den LDR und Taster drücken &rarr; die gelbe LED leuchtet 10 Sekunden und geht dann aus. Ohne Hand (hell) und Taster drücken &rarr; die LED bleibt aus.</p>",
     "lernziel": "Du kannst das Muster <em>Sensor messen &rarr; if/else entscheiden &rarr; Aktor schalten</em> auf eine neue Aufgabe übertragen und zwei Bedingungen (dunkel und Taster gedrückt) ineinander schachteln."
    },
    "bauteile": [
     {
      "name": "Deine fertige Prüfungsschaltung",
      "anzahl": 1,
      "hinweis": "Genutzt werden die gelbe LED (Pin 3), der Taster (Pin 7) und der LDR (A0)."
     },
     {
      "name": "USB-Kabel",
      "anzahl": 1,
      "hinweis": "Für Strom und Serial Monitor"
     }
    ],
    "anschluss": {
     "schritte": [
      "Lass die Prüfungsschaltung so stecken, wie sie ist.",
      "Die anderen vier LEDs bleiben einfach aus. Du brauchst sie in deinem Sketch nicht.",
      "Lade dein neues Programm hoch und öffne den <strong>Serial Monitor</strong> (9600 Baud)."
     ]
    },
    "code_hinweise": {
     "geruest": "// Außenbeleuchtung – Gerüst (nur Kommentare, den Code schreibst du)\n\n// 1. Pins festlegen: Lampe (gelbe LED) an Pin 3, Taster an Pin 7, LDR an A0\n// 2. SCHWELLE festlegen (dein Wert zwischen Hell- und Dunkelwert)\n\n// setup():\n//   Lampe als Ausgang, Taster mit INPUT_PULLUP, Serial Monitor starten\n\n// loop():\n//   LDR-Wert lesen und im Serial Monitor ausgeben\n//   WENN es dunkel ist:\n//     WENN der Taster gedrückt ist:\n//       Lampe an, 10 Sekunden warten, Lampe aus\n//   SONST (hell):\n//     Lampe aus",
     "tipps": [
      "Zwei Bedingungen: Setz die Taster-Abfrage <strong>in</strong> den Dunkel-Zweig. Das ist dasselbe Muster wie in der Prüfungsschaltung (LDR außen, Taster innen), nur steckt der Taster dort im Hell-Zweig.",
      "<code>delay(10000)</code> wartet 10 Sekunden. In dieser Zeit reagiert der Arduino auf nichts anderes. Das ist hier in Ordnung.",
      "<strong>Klappt nicht? LED geht auch bei Licht an:</strong> Deine Bedingung ist falsch herum. Hier gilt: dunkel = kleiner Wert, also <code>lichtWert &lt;= SCHWELLE</code>.",
      "<strong>LED geht nie an:</strong> Liegt dein Dunkelwert im Serial Monitor wirklich unter der SCHWELLE? Prüfst du den Taster auf <code>== LOW</code>?",
      "<strong>LED leuchtet dauernd:</strong> Fehlt das Ausschalten nach dem <code>delay(10000)</code>?"
     ]
    }
   }
  },
  {
   "exercise": "af42b62b-892b-49b1-b41d-19152b72a259",
   "from": "SAUBER = silbrig, glänzend, kegelförmig.",
   "to": "SAUBER = silbrig, glatt, kegelförmig (bleifreies Lot glänzt etwas weniger)."
  },
  {
   "exercise": "d77c7798-2820-41fc-84d7-102bb96195f9",
   "payload": {
    "type": "multiple-choice",
    "correct": 2,
    "options": [
     "Die komplette Ampel-Sequenz startet sofort",
     "Alle LEDs gehen aus, die Ampel schläft",
     "Alle LEDs aus, nur Auto-Gelb blinkt (Nachtmodus)",
     "Die Ampel läuft normal weiter, nur der Taster ist gesperrt"
    ],
    "question": "Was passiert in der Prüfungsschaltung, wenn der LDR-Wert unter dem Schwellenwert liegt (oder genau gleich ist)?",
    "explanation": "Ein kleiner LDR-Wert bedeutet: Es ist dunkel (Nacht). Dann greift der else-Zweig: Alle LEDs werden ausgeschaltet und nur Auto-Gelb blinkt, wie bei einer echten Ampel nachts. Den Taster beachtet die Ampel in dieser Zeit nicht.",
    "wrongExplanations": {
     "0": "Die Sequenz startet nur bei Helligkeit UND Tastendruck. Nachts wird der Taster gar nicht abgefragt.",
     "1": "Ganz aus wäre unübersichtlicher: Das gelbe Blinken zeigt Autofahrern nachts, dass hier eine Ampel steht.",
     "3": "Bei Dunkelheit läuft die Ampel nicht normal weiter. Grün und Rot gehen aus, nur Gelb blinkt."
    }
   }
  }
 ]
};
