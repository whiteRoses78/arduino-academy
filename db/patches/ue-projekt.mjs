// Gesamtprüfung 2026-10-02, Übergreifend: Lektionsverweise als Links, Operatoren, Flussdiagramme (projekt).
// Erzeugt mit dem Builder im Scratchpad; Einspielen über db/content-patch.mjs.
export default {
  "module": "projekt",
  "text": [
    {
      "slug": "nachtabschaltung-mit-lichtsensor",
      "from": "► Erweiterung gegenüber L21:",
      "to": "► Erweiterung gegenüber Lektion 1:"
    },
    {
      "slug": "nachtabschaltung-mit-lichtsensor",
      "from": "► Nächste Stufe (L23):",
      "to": "► Nächste Stufe (Lektion 3):"
    },
    {
      "slug": "nachtabschaltung-mit-lichtsensor",
      "from": "// ... Ampel-Sequenz wie in Lektion 21 ...",
      "to": "// ... Ampel-Sequenz wie in Lektion 1 ..."
    },
    {
      "slug": "pruefungsschaltung-komplett",
      "from": "(Sektion 4)",
      "to": "(Abschnitt &bdquo;Vom Breadboard zur gelöteten Schaltung&ldquo; weiter unten)",
      "count": 2
    },
    {
      "slug": "pruefungsschaltung-komplett",
      "from": "Weitere Pool-Aufgaben siehe Sektion 5 unten.",
      "to": "Weitere Pool-Aufgaben siehe Abschnitt &bdquo;Andere Pool-Aufgaben am Beispiel&ldquo; weiter unten."
    },
    {
      "slug": "pruefungsschaltung-komplett",
      "from": "Lektion 16 (NTC verstehen und auslesen) und Lektion 18 (Servomotor ansteuern).",
      "to": "<a href=\"/modul/analog/ntc-temperatursensor\">Modul 3, Lektion 5 &bdquo;NTC-Temperatursensor&ldquo;</a> und <a href=\"/modul/aktoren/servomotor-ansteuern\">Modul 4, Lektion 1 &bdquo;Servomotor ansteuern&ldquo;</a>."
    },
    {
      "slug": "pruefungsschaltung-komplett",
      "from": "(siehe L20 Plus-Box)",
      "to": "(siehe Modul 4, Lektion 2, Plus-Box PWM)"
    },
    {
      "slug": "pruefungsschaltung-komplett",
      "from": "Lektion 19 (DC-Motor mit Transistor – inklusive Freilaufdiode!) und Lektion 16 (NTC).",
      "to": "<a href=\"/modul/aktoren/transistor-als-schalter-grundlagen\">Modul 4, Lektion 2 &bdquo;Transistor als Schalter (Grundlagen)&ldquo;</a> (inklusive Freilaufdiode!) und <a href=\"/modul/analog/ntc-temperatursensor\">Modul 3, Lektion 5 &bdquo;NTC-Temperatursensor&ldquo;</a>."
    },
    {
      "slug": "pruefungsschaltung-komplett",
      "from": "<strong>Kopplung an den NTC (L16):</strong>",
      "to": "<strong>Kopplung an den NTC</strong> (<a href=\"/modul/analog/ntc-temperatursensor\">Modul 3, Lektion 5</a>):"
    },
    {
      "slug": "pruefungsschaltung-komplett",
      "from": "kennst du schon aus L5 (LED), L14 (PWM) und L16 (NTC).",
      "to": "kennst du schon aus <a href=\"/modul/digital/leds-ansteuern\">Modul 2, Lektion 1 &bdquo;LEDs ansteuern&ldquo;</a>, <a href=\"/modul/analog/pwm-dimmen-statt-schalten\">Modul 3, Lektion 3 &bdquo;PWM: Dimmen statt Schalten&ldquo;</a> und <a href=\"/modul/analog/ntc-temperatursensor\">Modul 3, Lektion 5 &bdquo;NTC-Temperatursensor&ldquo;</a>."
    },
    {
      "slug": "pruefungsschaltung-komplett",
      "from": "<table class=\"icon-table\">\n            <tr><th>Pool-Aufgabe</th><th>Bauteile</th><th>Vorlauf-Lektionen</th><th>In dieser Lektion gezeigt?</th></tr>\n            <tr><td><strong>Ampel</strong> (Mobilität)</td><td>5 LEDs, Taster, LDR</td><td>L5, L8, L10, L15, L21</td><td>&#10003; Sektion 3 (oben)</td></tr>\n            <tr><td><strong>Gewächshaus</strong> (Bautechnik)</td><td>NTC, Servo, Glühlampe</td><td>L16, L19</td><td>&#10003; Sektion 5a</td></tr>\n            <tr><td><strong>Lüftung</strong> (Bautechnik)</td><td>DC-Motor, NTC, Taster</td><td>L16, L20</td><td>&#10003; Sektion 5b</td></tr>\n            <tr><td>Außenbeleuchtung</td><td>LED, Taster, LDR</td><td>L5, L8, L15</td><td>sinngemäß Sektion 3</td></tr>\n            <tr><td>Temperaturanzeige (Farbe)</td><td>RGB-LED, Taster, NTC</td><td>L16 (NTC), L23 (diese Lektion)</td><td>&#10003; Plus-Box &bdquo;RGB-LED&ldquo; (oben)</td></tr>\n            <tr><td>Dimmer</td><td>LED, Taster, Poti</td><td>L13, L14</td><td>aus L13/L14</td></tr>\n            <tr><td>Treppenhauslicht</td><td>LED, 2× Taster, Poti</td><td>L8, L13, L14</td><td>aus L8/L13</td></tr>\n            <tr><td>Scheibenwischer</td><td>Servo, Umschalter, Regensensor</td><td>L19; Regensensor: neues Bauteil</td><td>aus L19</td></tr>\n            <tr><td>Kurvenlicht</td><td>LED, Servo, Poti</td><td>L13, L19</td><td>aus L13/L19</td></tr>\n            <tr><td>Fahrradlicht</td><td>LED, Umschalter, LDR</td><td>L8, L15</td><td>aus L15/L8</td></tr>\n            <tr><td>Bohrmaschine</td><td>DC-Motor, Schalter, Poti</td><td>L13, L20</td><td>aus L20/L13</td></tr>\n            <tr><td>Alarmanlage</td><td>Summer, Taster, Lichtschranke</td><td>L8 (Taster)</td><td>Summer-Abschnitt in L18 (Servomotor-Lektion)</td></tr>\n          </table>",
      "to": "<table class=\"icon-table\">\n            <tr><th>Pool-Aufgabe</th><th>Bauteile</th><th>Vorlauf-Lektionen</th><th>In dieser Lektion gezeigt?</th></tr>\n            <tr><td><strong>Ampel</strong> (Mobilität)</td><td>5 LEDs, Taster, LDR</td><td><a href=\"/modul/digital/leds-ansteuern\">LEDs ansteuern</a>, <a href=\"/modul/digital/taster-als-eingabe\">Taster als Eingabe</a>, <a href=\"/modul/digital/einfache-ampelschaltung\">Einfache Ampelschaltung</a>, <a href=\"/modul/analog/lichtsensor-ldr\">Lichtsensor (LDR)</a>, <a href=\"/modul/analog/entscheidungen-mit-sensorwerten\">Entscheidungen mit Sensorwerten</a>, <a href=\"/modul/projekt/ampel-mit-fussgaengerueberweg\">Ampel mit Fußgängerüberweg</a>, <a href=\"/modul/projekt/nachtabschaltung-mit-lichtsensor\">Nachtabschaltung mit Lichtsensor</a></td><td>&#10003; Hauptschaltung (oben)</td></tr>\n            <tr><td><strong>Gewächshaus</strong> (Bautechnik)</td><td>NTC, Servo, Glühlampe</td><td><a href=\"/modul/analog/ntc-temperatursensor\">NTC-Temperatursensor</a>, <a href=\"/modul/analog/entscheidungen-mit-sensorwerten\">Entscheidungen mit Sensorwerten</a>, <a href=\"/modul/aktoren/servomotor-ansteuern\">Servomotor ansteuern</a></td><td>&#10003; Showcase 5a</td></tr>\n            <tr><td><strong>Lüftung</strong> (Bautechnik)</td><td>DC-Motor, NTC, Taster</td><td><a href=\"/modul/digital/led-mit-taster-steuern\">LED mit Taster steuern</a>, <a href=\"/modul/analog/ntc-temperatursensor\">NTC-Temperatursensor</a>, <a href=\"/modul/analog/entscheidungen-mit-sensorwerten\">Entscheidungen mit Sensorwerten</a>, <a href=\"/modul/analog/pwm-dimmen-statt-schalten\">PWM: Dimmen statt Schalten</a>, <a href=\"/modul/aktoren/transistor-als-schalter-grundlagen\">Transistor als Schalter (Grundlagen)</a></td><td>&#10003; Showcase 5b</td></tr>\n            <tr><td>Außenbeleuchtung</td><td>LED, Taster, LDR</td><td><a href=\"/modul/digital/leds-ansteuern\">LEDs ansteuern</a>, <a href=\"/modul/digital/taster-als-eingabe\">Taster als Eingabe</a>, <a href=\"/modul/analog/lichtsensor-ldr\">Lichtsensor (LDR)</a></td><td>sinngemäß wie die Hauptschaltung</td></tr>\n            <tr><td>Temperaturanzeige (Farbe)</td><td>RGB-LED, Taster, NTC</td><td><a href=\"/modul/analog/ntc-temperatursensor\">NTC-Temperatursensor</a>, <a href=\"/modul/analog/pwm-dimmen-statt-schalten\">PWM: Dimmen statt Schalten</a></td><td>&#10003; Plus-Wissen &bdquo;RGB-LED&ldquo; (oben)</td></tr>\n            <tr><td>Dimmer</td><td>LED, Taster, Poti</td><td><a href=\"/modul/digital/taster-als-eingabe\">Taster als Eingabe</a>, <a href=\"/modul/analog/analoge-eingaenge\">Analoge Eingänge</a>, <a href=\"/modul/analog/pwm-dimmen-statt-schalten\">PWM: Dimmen statt Schalten</a></td><td>&ndash;</td></tr>\n            <tr><td>Treppenhauslicht</td><td>LED, 2× Taster, Poti</td><td><a href=\"/modul/digital/taster-als-eingabe\">Taster als Eingabe</a>, <a href=\"/modul/analog/analoge-eingaenge\">Analoge Eingänge</a>, <a href=\"/modul/analog/pwm-dimmen-statt-schalten\">PWM: Dimmen statt Schalten</a></td><td>&ndash;</td></tr>\n            <tr><td>Scheibenwischer</td><td>Servo, Umschalter, Regensensor</td><td><a href=\"/modul/digital/taster-als-eingabe\">Taster als Eingabe</a>, <a href=\"/modul/aktoren/servomotor-ansteuern\">Servomotor ansteuern</a>; Regensensor: neues Bauteil</td><td>&ndash;</td></tr>\n            <tr><td>Kurvenlicht</td><td>LED, Servo, Poti</td><td><a href=\"/modul/analog/analoge-eingaenge\">Analoge Eingänge</a>, <a href=\"/modul/analog/pwm-dimmen-statt-schalten\">PWM: Dimmen statt Schalten</a>, <a href=\"/modul/aktoren/servomotor-ansteuern\">Servomotor ansteuern</a></td><td>&ndash;</td></tr>\n            <tr><td>Fahrradlicht</td><td>LED, Umschalter, LDR</td><td><a href=\"/modul/digital/taster-als-eingabe\">Taster als Eingabe</a>, <a href=\"/modul/analog/lichtsensor-ldr\">Lichtsensor (LDR)</a></td><td>&ndash;</td></tr>\n            <tr><td>Bohrmaschine</td><td>DC-Motor, Schalter, Poti</td><td><a href=\"/modul/analog/analoge-eingaenge\">Analoge Eingänge</a>, <a href=\"/modul/analog/pwm-dimmen-statt-schalten\">PWM: Dimmen statt Schalten</a>, <a href=\"/modul/aktoren/transistor-als-schalter-grundlagen\">Transistor als Schalter (Grundlagen)</a>, <a href=\"/modul/aktoren/dc-motor-mit-l298n\">DC-Motor mit L298N</a></td><td>&ndash;</td></tr>\n            <tr><td>Alarmanlage</td><td>Summer, Taster, Lichtschranke</td><td><a href=\"/modul/digital/taster-als-eingabe\">Taster als Eingabe</a></td><td>Summer-Abschnitt in <a href=\"/modul/aktoren/servomotor-ansteuern\">Servomotor ansteuern</a></td></tr>\n          </table>"
    },
    {
      "slug": "nachtabschaltung-mit-lichtsensor",
      "from": "wie in Modul 3 in der Lektion &bdquo;Entscheidungen mit Sensorwerten&ldquo;.",
      "to": "wie in <a href=\"/modul/analog/entscheidungen-mit-sensorwerten\">Modul 3, Lektion 6 &bdquo;Entscheidungen mit Sensorwerten&ldquo;</a>."
    },
    {
      "slug": "pruefungsschaltung-komplett",
      "from": "wie in Modul 3 in der Lektion &bdquo;Entscheidungen mit Sensorwerten&ldquo;.",
      "to": "wie in <a href=\"/modul/analog/entscheidungen-mit-sensorwerten\">Modul 3, Lektion 6 &bdquo;Entscheidungen mit Sensorwerten&ldquo;</a>."
    },
    {
      "slug": "pruefungsschaltung-komplett",
      "from": "            <li><strong>Zurück zu Schritt 1</strong> (loop wiederholt sich)</li>\n          </ol>",
      "to": "            <li><strong>Zurück zu Schritt 1</strong> (loop wiederholt sich)</li>\n          </ol>\n          <p style=\"margin-top:1rem;\">Als <strong>Flussdiagramm</strong> sieht das so aus. In der Prüfung musst du so ein Diagramm lesen oder selbst zeichnen können:</p>\n          <svg viewBox=\"0 0 520 570\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Flussdiagramm der Prüfungsschaltung: LDR lesen, Raute ist es hell, nein Nachtmodus, ja Normalzustand, Raute Taster gedrückt, ja Ampel-Sequenz, danach startet loop neu\" style=\"width:100%;max-width:480px;margin:1em auto;display:block;font-family:system-ui,sans-serif;background:#fff;border-radius:8px;\">\n            <defs>\n              <marker id=\"fd5-pfeil\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\">\n                <path d=\"M0,0 L8,4 L0,8 z\" fill=\"#333\"/>\n              </marker>\n            </defs>\n            <ellipse cx=\"260\" cy=\"32\" rx=\"72\" ry=\"22\" fill=\"#2176AE\" stroke=\"#1a5f8a\" stroke-width=\"2\"/>\n            <text x=\"260\" y=\"37\" text-anchor=\"middle\" font-size=\"14\" fill=\"white\" font-weight=\"bold\">Start (loop)</text>\n            <line x1=\"260\" y1=\"54\" x2=\"260\" y2=\"77\" stroke=\"#333\" stroke-width=\"2\" marker-end=\"url(#fd5-pfeil)\"/>\n            <rect x=\"180\" y=\"80\" width=\"160\" height=\"36\" rx=\"4\" fill=\"#fff\" stroke=\"#2176AE\" stroke-width=\"2\"/>\n            <text x=\"260\" y=\"103\" text-anchor=\"middle\" font-size=\"14\" fill=\"#333\">LDR-Wert lesen</text>\n            <line x1=\"260\" y1=\"116\" x2=\"260\" y2=\"137\" stroke=\"#333\" stroke-width=\"2\" marker-end=\"url(#fd5-pfeil)\"/>\n            <polygon points=\"260,140 380,190 260,240 140,190\" fill=\"#fff\" stroke=\"#F59E0B\" stroke-width=\"2.5\"/>\n            <text x=\"260\" y=\"186\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\" font-weight=\"bold\">Ist es hell?</text>\n            <text x=\"260\" y=\"203\" text-anchor=\"middle\" font-size=\"11\" fill=\"#333\">lichtWert &gt; SCHWELLE</text>\n            <path d=\"M 140 190 L 80 190 L 80 257\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"2\" marker-end=\"url(#fd5-pfeil)\"/>\n            <text x=\"92\" y=\"181\" font-size=\"12\" fill=\"#B45309\" font-weight=\"bold\">nein</text>\n            <rect x=\"15\" y=\"260\" width=\"130\" height=\"62\" rx=\"4\" fill=\"#fff\" stroke=\"#F59E0B\" stroke-width=\"2\"/>\n            <text x=\"80\" y=\"282\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\" font-weight=\"bold\">Nachtmodus:</text>\n            <text x=\"80\" y=\"298\" text-anchor=\"middle\" font-size=\"12\" fill=\"#333\">alle LEDs aus,</text>\n            <text x=\"80\" y=\"313\" text-anchor=\"middle\" font-size=\"12\" fill=\"#333\">Auto-Gelb blinkt</text>\n            <line x1=\"260\" y1=\"240\" x2=\"260\" y2=\"263\" stroke=\"#2E7D32\" stroke-width=\"2\" marker-end=\"url(#fd5-pfeil)\"/>\n            <text x=\"270\" y=\"256\" font-size=\"12\" fill=\"#2E7D32\" font-weight=\"bold\">ja</text>\n            <rect x=\"175\" y=\"266\" width=\"170\" height=\"44\" rx=\"4\" fill=\"#fff\" stroke=\"#2E7D32\" stroke-width=\"2\"/>\n            <text x=\"260\" y=\"285\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\">Auto Grün,</text>\n            <text x=\"260\" y=\"301\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\">Fußgänger Rot</text>\n            <line x1=\"260\" y1=\"310\" x2=\"260\" y2=\"333\" stroke=\"#333\" stroke-width=\"2\" marker-end=\"url(#fd5-pfeil)\"/>\n            <polygon points=\"260,336 355,381 260,426 165,381\" fill=\"#fff\" stroke=\"#F59E0B\" stroke-width=\"2.5\"/>\n            <text x=\"260\" y=\"377\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\" font-weight=\"bold\">Taster</text>\n            <text x=\"260\" y=\"394\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\" font-weight=\"bold\">gedrückt?</text>\n            <line x1=\"260\" y1=\"426\" x2=\"260\" y2=\"451\" stroke=\"#2E7D32\" stroke-width=\"2\" marker-end=\"url(#fd5-pfeil)\"/>\n            <text x=\"270\" y=\"443\" font-size=\"12\" fill=\"#2E7D32\" font-weight=\"bold\">ja</text>\n            <rect x=\"165\" y=\"454\" width=\"190\" height=\"44\" rx=\"4\" fill=\"#fff\" stroke=\"#2E7D32\" stroke-width=\"2\"/>\n            <text x=\"260\" y=\"473\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\">Ampel-Sequenz:</text>\n            <text x=\"260\" y=\"489\" text-anchor=\"middle\" font-size=\"12\" fill=\"#333\">Fußgänger bekommt Grün</text>\n            <path d=\"M 355 381 L 490 381\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"2\"/>\n            <text x=\"368\" y=\"372\" font-size=\"12\" fill=\"#B45309\" font-weight=\"bold\">nein</text>\n            <path d=\"M 355 476 L 490 476\" fill=\"none\" stroke=\"#333\" stroke-width=\"2\"/>\n            <path d=\"M 80 322 L 80 535 L 490 535\" fill=\"none\" stroke=\"#333\" stroke-width=\"2\"/>\n            <path d=\"M 490 535 L 490 32 L 335 32\" fill=\"none\" stroke=\"#333\" stroke-width=\"2\" marker-end=\"url(#fd5-pfeil)\"/>\n            <text x=\"285\" y=\"555\" text-anchor=\"middle\" font-size=\"11\" fill=\"#666\">loop() startet neu</text>\n          </svg>\n          <p><strong>Lies das Diagramm so:</strong> Zuerst entscheidet die obere Raute über Tag oder Nacht. Nur am Tag (ja-Weg) fragt die zweite Raute den Taster ab. Nachts führt der nein-Weg am Taster vorbei. Darum wird er im Dunkeln nicht beachtet. Die beiden Rauten entsprechen den beiden <code>if</code>-Abfragen im Code unten.</p>"
    }
  ],
  "newExercises": [
    {
      "slug": "pruefungsschaltung-komplett",
      "position": 8,
      "type": "multiple-choice",
      "payload": {
        "type": "multiple-choice",
        "question": "Schau dir das Flussdiagramm der Prüfungsschaltung an. Es ist hell, und niemand drückt den Taster. Was passiert?",
        "options": [
          "Auto-Gelb blinkt",
          "Die Fußgänger-Ampel wird grün",
          "Alle LEDs gehen aus",
          "Auto bleibt Grün, Fußgänger Rot"
        ],
        "correct": 3,
        "explanation": "Richtig! Bei hell geht es auf dem ja-Weg weiter: Auto Grün, Fußgänger Rot. Die Taster-Raute antwortet nein, also führt der Weg direkt zurück zum Start. Die Ampel bleibt im Normalzustand, bis jemand drückt.",
        "wrongExplanations": {
          "0": "Gelb blinkt nur im Nachtmodus. Den erreicht der Ablauf nur auf dem nein-Weg der oberen Raute, also wenn es dunkel ist.",
          "1": "Fußgänger-Grün gibt es nur in der Ampel-Sequenz. Die liegt auf dem ja-Weg der Taster-Raute. Ohne Tastendruck kommt der Ablauf dort nicht hin.",
          "2": "Alle LEDs aus ist der Nachtmodus. Es ist aber hell, also läuft der Normalbetrieb mit Auto Grün und Fußgänger Rot."
        }
      }
    }
  ]
};
