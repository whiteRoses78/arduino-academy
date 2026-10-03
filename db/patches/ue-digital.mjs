// Gesamtprüfung 2026-10-02, Übergreifend: Lektionsverweise als Links, Operatoren, Flussdiagramme (digital).
// Erzeugt mit dem Builder im Scratchpad; Einspielen über db/content-patch.mjs.
export default {
  "module": "digital",
  "text": [
    {
      "slug": "leds-ansteuern",
      "from": "<p>In Lektion 3 hast du schon die eingebaute LED",
      "to": "<p>In <a href=\"/modul/grundlagen/die-arduino-ide-und-dein-erstes-programm\">Modul 1, Lektion 4 &bdquo;Die Arduino IDE &amp; dein erstes Programm&ldquo;</a> hast du schon die eingebaute LED"
    },
    {
      "slug": "led-mit-taster-steuern",
      "from": "Das ist wie der Unterschied zwischen <em>\"Ist die Tür offen?\"</em> (==) und <em>\"Mach die Tür auf!\"</em> (=).\n        </div>",
      "to": "Das ist wie der Unterschied zwischen <em>\"Ist die Tür offen?\"</em> (==) und <em>\"Mach die Tür auf!\"</em> (=).\n        </div>\n\n        <div class=\"info-card\" style=\"border-top: 3px solid #2176AE;\">\n          <h3>Merkkasten: Vergleichen und Verknüpfen</h3>\n          <p>In einer Bedingung vergleichst du zwei Werte. Aus Mathe kennst du &le;, &ge; und &ne;. Die gibt es auf der Tastatur nicht, darum schreibt man sie im Code mit zwei Zeichen:</p>\n          <table class=\"icon-table\">\n            <tr><th>Im Code</th><th>In Mathe</th><th>Bedeutung</th><th>Beispiel</th></tr>\n            <tr><td><code>==</code></td><td>=</td><td>gleich</td><td><code>zustand == LOW</code></td></tr>\n            <tr><td><code>!=</code></td><td>&ne;</td><td>ungleich</td><td><code>zustand != LOW</code> (Taster nicht gedrückt)</td></tr>\n            <tr><td><code>&lt;</code></td><td>&lt;</td><td>kleiner als</td><td><code>wert &lt; 300</code></td></tr>\n            <tr><td><code>&gt;</code></td><td>&gt;</td><td>größer als</td><td><code>wert &gt; 700</code></td></tr>\n            <tr><td><code>&lt;=</code></td><td>&le;</td><td>kleiner oder gleich</td><td><code>winkel &lt;= 180</code></td></tr>\n            <tr><td><code>&gt;=</code></td><td>&ge;</td><td>größer oder gleich</td><td><code>helligkeit &gt;= 255</code></td></tr>\n          </table>\n          <p style=\"margin-top:0.75rem;\">Mehrere Bedingungen verknüpfst du so:</p>\n          <ul>\n            <li><code>&amp;&amp;</code> heißt <strong>UND</strong>: Die Bedingung ist nur wahr, wenn <strong>beide</strong> Teile wahr sind.</li>\n            <li><code>||</code> heißt <strong>ODER</strong>: Die Bedingung ist wahr, wenn <strong>mindestens einer</strong> der Teile wahr ist. Den senkrechten Strich tippst du am Mac mit <code>⌥ + 7</code>, unter Windows mit <code>AltGr + &lt;</code>.</li>\n            <li><code>!</code> heißt <strong>NICHT</strong>: Es dreht wahr und falsch um. Mehr dazu gleich beim Datentyp <code>bool</code>.</li>\n          </ul>\n          <div class=\"analogy-box\">\n            <strong>Alltagsanalogie:</strong> &bdquo;Ich gehe raus, wenn es trocken ist UND ich Zeit habe.&ldquo; Hier muss beides stimmen (<code>&amp;&amp;</code>). &bdquo;Ich nehme den Bus, wenn es regnet ODER ich spät dran bin.&ldquo; Hier reicht ein Grund (<code>||</code>).\n          </div>\n        </div>"
    },
    {
      "slug": "led-mit-taster-steuern",
      "from": "<div class=\"info-card\" style=\"border-top: 3px solid #F59E0B;\">\n          <h3>Neu: bool",
      "to": "<div class=\"info-card\">\n          <h3>Version 1 als Flussdiagramm</h3>\n          <p>Den gleichen Ablauf kannst du als <strong>Flussdiagramm</strong> zeichnen. Die Bedingung im <code>if</code> wird zur <strong>Raute</strong>. Aus der Raute führen zwei Wege heraus: <strong>ja</strong> (if-Teil) und <strong>nein</strong> (else-Teil).</p>\n\n          <svg viewBox=\"0 0 460 400\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Flussdiagramm: Taster lesen, Raute Taster gedrückt, ja LED an, nein LED aus, dann startet loop neu\" style=\"width:100%;max-width:420px;margin:1em auto;display:block;font-family:system-ui,sans-serif;background:#fff;border-radius:8px;\">\n            <defs>\n              <marker id=\"fd2-pfeil\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\">\n                <path d=\"M0,0 L8,4 L0,8 z\" fill=\"#333\"/>\n              </marker>\n            </defs>\n            <ellipse cx=\"230\" cy=\"35\" rx=\"72\" ry=\"24\" fill=\"#2176AE\" stroke=\"#1a5f8a\" stroke-width=\"2\"/>\n            <text x=\"230\" y=\"40\" text-anchor=\"middle\" font-size=\"14\" fill=\"white\" font-weight=\"bold\">Start (loop)</text>\n            <line x1=\"230\" y1=\"59\" x2=\"230\" y2=\"88\" stroke=\"#333\" stroke-width=\"2\" marker-end=\"url(#fd2-pfeil)\"/>\n            <rect x=\"150\" y=\"91\" width=\"160\" height=\"38\" rx=\"4\" fill=\"#fff\" stroke=\"#2176AE\" stroke-width=\"2\"/>\n            <text x=\"230\" y=\"115\" text-anchor=\"middle\" font-size=\"14\" fill=\"#333\">Taster lesen</text>\n            <line x1=\"230\" y1=\"129\" x2=\"230\" y2=\"152\" stroke=\"#333\" stroke-width=\"2\" marker-end=\"url(#fd2-pfeil)\"/>\n            <polygon points=\"230,155 320,205 230,255 140,205\" fill=\"#fff\" stroke=\"#F59E0B\" stroke-width=\"2.5\"/>\n            <text x=\"230\" y=\"201\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\" font-weight=\"bold\">Taster</text>\n            <text x=\"230\" y=\"218\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\" font-weight=\"bold\">gedrückt?</text>\n            <path d=\"M 140 205 L 90 205 L 90 282\" fill=\"none\" stroke=\"#2E7D32\" stroke-width=\"2\" marker-end=\"url(#fd2-pfeil)\"/>\n            <text x=\"100\" y=\"196\" font-size=\"12\" fill=\"#2E7D32\" font-weight=\"bold\">ja</text>\n            <rect x=\"30\" y=\"285\" width=\"120\" height=\"38\" rx=\"4\" fill=\"#fff\" stroke=\"#2E7D32\" stroke-width=\"2\"/>\n            <text x=\"90\" y=\"309\" text-anchor=\"middle\" font-size=\"14\" fill=\"#333\">LED an</text>\n            <path d=\"M 320 205 L 370 205 L 370 282\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"2\" marker-end=\"url(#fd2-pfeil)\"/>\n            <text x=\"328\" y=\"196\" font-size=\"12\" fill=\"#B45309\" font-weight=\"bold\">nein</text>\n            <rect x=\"310\" y=\"285\" width=\"120\" height=\"38\" rx=\"4\" fill=\"#fff\" stroke=\"#F59E0B\" stroke-width=\"2\"/>\n            <text x=\"370\" y=\"309\" text-anchor=\"middle\" font-size=\"14\" fill=\"#333\">LED aus</text>\n            <path d=\"M 90 323 L 90 355 L 370 355 L 370 323\" fill=\"none\" stroke=\"#333\" stroke-width=\"2\"/>\n            <path d=\"M 230 355 L 230 380 L 12 380 L 12 35 L 155 35\" fill=\"none\" stroke=\"#333\" stroke-width=\"2\" marker-end=\"url(#fd2-pfeil)\"/>\n            <text x=\"245\" y=\"374\" font-size=\"11\" fill=\"#666\">loop() startet neu</text>\n          </svg>\n\n          <p><strong>Lies das Diagramm so:</strong> Der Arduino liest den Taster. Die Raute fragt: Ist er gedrückt? Bei <strong>ja</strong> geht die LED an, bei <strong>nein</strong> geht sie aus. Danach beginnt <code>loop()</code> von vorn. Die Raute entspricht <code>if (zustand == LOW)</code>, der ja-Weg dem if-Teil und der nein-Weg dem <code>else</code>-Teil.</p>\n        </div>\n\n        <div class=\"info-card\" style=\"border-top: 3px solid #F59E0B;\">\n          <h3>Neu: bool"
    },
    {
      "slug": "led-lauflicht",
      "from": "Mit einer <strong>for-Schleife</strong> und einem <strong>Array</strong> kannst du dieses Lauflicht in nur 10 Zeilen Code schreiben &ndash; egal ob 5 oder 50 LEDs! Das lernst du in den nächsten Modulen.",
      "to": "Mit einer <strong>for-Schleife</strong> wird so ein Ablauf viel kürzer &ndash; egal ob 5 oder 50 LEDs. Die for-Schleife lernst du beim Servo in <a href=\"/modul/aktoren/servomotor-ansteuern\">Modul 4, Lektion 1 &bdquo;Servomotor ansteuern&ldquo;</a> kennen."
    },
    {
      "slug": "einfache-ampelschaltung",
      "from": "Für unsere einfache Ampel ist das ok. Für komplexere Projekte lernt man später eine bessere Methode (<code>millis()</code>).",
      "to": "Für unsere Ampel ist das ok, und für die Prüfung reicht <code>delay()</code>. Profis nutzen dafür <code>millis()</code>, das brauchst du hier aber nicht."
    }
  ],
  "newExercises": [
    {
      "slug": "led-mit-taster-steuern",
      "position": 4,
      "type": "multiple-choice",
      "payload": {
        "type": "multiple-choice",
        "question": "In einem Flussdiagramm soll stehen: \"Ist der Wert kleiner als 300?\" Mit welchem Symbol zeichnest du das? (Die Symbole kennst du aus dem Lauflicht in Lektion 3.)",
        "options": [
          "Oval",
          "Rechteck",
          "Raute",
          "Pfeil"
        ],
        "correct": 2,
        "explanation": "Richtig! Eine Frage mit ja/nein-Antwort ist eine Entscheidung, und Entscheidungen zeichnet man als Raute. Aus der Raute führen zwei Wege: ja und nein. Im Code wird daraus if (wert < 300) mit if-Teil und else-Teil.",
        "wrongExplanations": {
          "0": "Das Oval steht nur für Start oder Ende des Ablaufs. Eine Frage mit zwei möglichen Antworten braucht ein Symbol, aus dem zwei Wege herausführen.",
          "1": "Ein Rechteck ist eine Anweisung, die einfach ausgeführt wird, zum Beispiel \"LED an\". Hier wird aber etwas gefragt, und je nach Antwort geht es anders weiter.",
          "3": "Pfeile zeigen nur die Richtung, in der der Ablauf weitergeht. Die Frage selbst braucht ein eigenes Symbol mit einem ja-Weg und einem nein-Weg."
        }
      }
    },
    {
      "slug": "led-mit-taster-steuern",
      "position": 5,
      "type": "multiple-choice",
      "payload": {
        "type": "multiple-choice",
        "question": "Im Toggle-Code steht: if (gedrueckt && !letzterDruck). Wann ist diese Bedingung wahr?",
        "options": [
          "Taster jetzt gedrückt ODER vorher gedrückt",
          "Taster wird gedrückt gehalten",
          "Taster jetzt gedrückt UND vorher nicht gedrückt",
          "Taster wurde gerade losgelassen"
        ],
        "correct": 2,
        "explanation": "Richtig! && heißt UND, also müssen beide Teile stimmen. Das ! dreht letzterDruck um: !letzterDruck heißt \"war vorher NICHT gedrückt\". Beides zusammen ist nur im ersten Moment eines neuen Drucks wahr.",
        "wrongExplanations": {
          "0": "Das wäre || (ODER). Hier steht aber && (UND): Beide Teile müssen gleichzeitig stimmen.",
          "1": "Beim Gedrückthalten ist letzterDruck ab dem zweiten Durchlauf true. Dann ist !letzterDruck false, und die ganze Bedingung ist nicht mehr wahr.",
          "3": "Beim Loslassen ist gedrueckt false. Mit && muss aber gedrueckt true sein, sonst ist die ganze Bedingung falsch."
        }
      }
    }
  ]
};
