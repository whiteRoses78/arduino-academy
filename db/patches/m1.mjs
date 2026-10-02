// M1 Grundlagen — Korrekturen aus der Gesamtprüfung vom 02.10.2026.
// Einspielen: siehe Kopf von db/content-patch.mjs. Generiert, nicht von Hand ändern.
export default {
 "module": "grundlagen",
 "text": [
  {
   "slug": "was-ist-ein-arduino",
   "from": "<p>Beispiel Nachtlicht: Der <strong>LDR misst</strong>",
   "to": "<p><strong>Sensor oder Aktor?</strong> <strong>Sensoren</strong> messen etwas: Ein Taster meldet \"gedrückt?\", ein Lichtsensor (LDR) die Helligkeit, ein Temperatursensor (NTC) die Temperatur. <strong>Aktoren</strong> bewirken etwas: Eine LED leuchtet, ein Motor dreht, ein Servo stellt einen Winkel ein, ein Summer piept. Merksatz: Sensoren sind die Sinnesorgane des Arduino, Aktoren seine Hände.</p>\n          <p>Beispiel Nachtlicht: Der <strong>LDR misst</strong>"
  },
  {
   "exercise": "9edc4d7a-1594-4472-8fde-97353368f5af",
   "payload": {
    "type": "matching",
    "pairs": [
     {
      "left": "Mikrocontroller",
      "right": "Das Gehirn des Arduino"
     },
     {
      "left": "Programm",
      "right": "Die Anweisung, die der Arduino ausführt"
     },
     {
      "left": "Sensor",
      "right": "Misst etwas (z.B. Licht, Temperatur)"
     },
     {
      "left": "LED",
      "right": "Kleines Lämpchen, das leuchten kann"
     },
     {
      "left": "Aktor",
      "right": "Bewirkt etwas (z.B. Motor dreht)"
     }
    ],
    "question": "Ordne die Begriffe den richtigen Beschreibungen zu:",
    "explanation": "Der Mikrocontroller ist der zentrale Chip, der alles steuert &ndash; deshalb das Gehirn. Das Programm sagt ihm Schritt für Schritt, was er tun soll. Ein Sensor liefert Messwerte aus der Umwelt, und eine LED ist ein Bauteil, das als sichtbares Signal leuchtet. Ein Aktor ist das Gegenstück zum Sensor: Er misst nichts, sondern bewirkt etwas, zum Beispiel ein Motor, der sich dreht."
   }
  },
  {
   "slug": "das-arduino-uno-board",
   "from": "<svg viewBox=\"0 0 600 380\" style=\"width:100%;max-width:600px;margin:1em auto;display:block;font-family:system-ui;\">\n          <!-- Board -->\n          <rect x=\"50\" y=\"30\" width=\"500\" height=\"320\" rx=\"12\" fill=\"#0068B5\" stroke=\"#004080\" stroke-width=\"2\"/>\n          <!-- USB -->\n          <rect x=\"50\" y=\"140\" width=\"40\" height=\"60\" rx=\"4\" fill=\"#888\" stroke=\"#555\" stroke-width=\"1.5\"/>\n          <text x=\"30\" y=\"175\" text-anchor=\"end\" font-size=\"12\" fill=\"#333\">USB</text>\n          <!-- Strombuchse -->\n          <rect x=\"50\" y=\"250\" width=\"35\" height=\"40\" rx=\"6\" fill=\"#333\" stroke=\"#111\" stroke-width=\"1.5\"/>\n          <text x=\"30\" y=\"275\" text-anchor=\"end\" font-size=\"12\" fill=\"#333\">Strom</text>\n          <!-- Digitale Pins -->\n          <g>\n            <text x=\"300\" y=\"22\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\" font-weight=\"bold\">Digitale Pins (0–13)</text>\n            <g id=\"digital-pins\">\n              <rect x=\"130\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"155\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"180\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"205\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"230\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"255\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"280\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"320\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"345\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"370\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"395\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"420\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"445\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n              <rect x=\"470\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n            </g>\n            <text x=\"138\" y=\"68\" font-size=\"9\" fill=\"#333\">0</text>\n            <text x=\"163\" y=\"68\" font-size=\"9\" fill=\"#333\">1</text>\n            <text x=\"188\" y=\"68\" font-size=\"9\" fill=\"#333\">2</text>\n            <text x=\"213\" y=\"68\" font-size=\"9\" fill=\"#333\">3</text>\n            <text x=\"233\" y=\"68\" font-size=\"9\" fill=\"#333\">4</text>\n            <text x=\"258\" y=\"68\" font-size=\"9\" fill=\"#333\">5</text>\n            <text x=\"283\" y=\"68\" font-size=\"9\" fill=\"#333\">6</text>\n            <text x=\"323\" y=\"68\" font-size=\"9\" fill=\"#333\">7</text>\n            <text x=\"348\" y=\"68\" font-size=\"9\" fill=\"#333\">8</text>\n            <text x=\"373\" y=\"68\" font-size=\"9\" fill=\"#333\">9</text>\n            <text x=\"393\" y=\"68\" font-size=\"9\" fill=\"#333\">10</text>\n            <text x=\"418\" y=\"68\" font-size=\"9\" fill=\"#333\">11</text>\n            <text x=\"443\" y=\"68\" font-size=\"9\" fill=\"#333\">12</text>\n            <text x=\"468\" y=\"68\" font-size=\"9\" fill=\"#333\">13</text>\n          </g>\n          <!-- PWM Markierung -->\n          <text x=\"215\" y=\"82\" font-size=\"10\" fill=\"#E67E22\">~ = PWM (3, 5, 6, 9, 10, 11)</text>\n          <!-- Analoge Pins -->\n          <g>\n            <text x=\"300\" y=\"365\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\" font-weight=\"bold\">Analoge Pins (A0–A5)</text>\n            <rect x=\"180\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n            <rect x=\"210\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n            <rect x=\"240\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n            <rect x=\"270\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n            <rect x=\"300\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n            <rect x=\"330\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n            <text x=\"183\" y=\"324\" font-size=\"9\" fill=\"#333\">A0</text>\n            <text x=\"213\" y=\"324\" font-size=\"9\" fill=\"#333\">A1</text>\n            <text x=\"243\" y=\"324\" font-size=\"9\" fill=\"#333\">A2</text>\n            <text x=\"273\" y=\"324\" font-size=\"9\" fill=\"#333\">A3</text>\n            <text x=\"303\" y=\"324\" font-size=\"9\" fill=\"#333\">A4</text>\n            <text x=\"333\" y=\"324\" font-size=\"9\" fill=\"#333\">A5</text>\n          </g>\n          <!-- Strom-Pins -->\n          <g>\n            <rect x=\"400\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#C0392B\"/>\n            <rect x=\"430\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n            <rect x=\"460\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n            <text x=\"402\" y=\"324\" font-size=\"9\" fill=\"#C0392B\">5V</text>\n            <text x=\"427\" y=\"324\" font-size=\"9\" fill=\"#333\">3.3V</text>\n            <text x=\"460\" y=\"324\" font-size=\"9\" fill=\"#333\">GND</text>\n          </g>\n          <!-- Mikrocontroller-Chip -->\n          <rect x=\"200\" y=\"140\" width=\"180\" height=\"80\" rx=\"4\" fill=\"#222\" stroke=\"#111\" stroke-width=\"1.5\"/>\n          <text x=\"290\" y=\"180\" text-anchor=\"middle\" font-size=\"13\" fill=\"#aaa\">ATmega328P</text>\n          <text x=\"290\" y=\"198\" text-anchor=\"middle\" font-size=\"10\" fill=\"#777\">Mikrocontroller</text>\n          <!-- Reset-Button -->\n          <circle cx=\"480\" cy=\"170\" r=\"14\" fill=\"#C0392B\" stroke=\"#922\" stroke-width=\"1.5\"/>\n          <text x=\"480\" y=\"175\" text-anchor=\"middle\" font-size=\"10\" fill=\"white\" font-weight=\"bold\">RST</text>\n          <text x=\"510\" y=\"175\" font-size=\"11\" fill=\"#333\">Reset</text>\n          <!-- LED 13 -->\n          <circle cx=\"480\" cy=\"110\" r=\"6\" fill=\"#F1C40F\" stroke=\"#D4AC0D\" stroke-width=\"1\"/>\n          <text x=\"495\" y=\"114\" font-size=\"10\" fill=\"#333\">LED (Pin 13)</text>\n          <!-- Power LED -->\n          <circle cx=\"130\" cy=\"300\" r=\"6\" fill=\"#2ECC71\" stroke=\"#27AE60\" stroke-width=\"1\"/>\n          <text x=\"145\" y=\"304\" font-size=\"10\" fill=\"#333\">Power-LED</text>\n        </svg>",
   "to": "<svg viewBox=\"0 0 600 380\" style=\"width:100%;max-width:600px;margin:1em auto;display:block;font-family:system-ui;\" role=\"img\" aria-label=\"Arduino Uno von oben, USB-Buchse links\">\n          <!-- Board (Draufsicht wie auf dem Tisch: USB links) -->\n          <rect x=\"50\" y=\"30\" width=\"500\" height=\"320\" rx=\"12\" fill=\"#0068B5\" stroke=\"#004080\" stroke-width=\"2\"/>\n          <!-- USB + Strombuchse -->\n          <rect x=\"50\" y=\"110\" width=\"40\" height=\"60\" rx=\"4\" fill=\"#888\" stroke=\"#555\" stroke-width=\"1.5\"/>\n          <text x=\"46\" y=\"145\" text-anchor=\"end\" font-size=\"12\" fill=\"#333\">USB</text>\n          <rect x=\"50\" y=\"250\" width=\"35\" height=\"40\" rx=\"6\" fill=\"#333\" stroke=\"#111\" stroke-width=\"1.5\"/>\n          <text x=\"46\" y=\"275\" text-anchor=\"end\" font-size=\"12\" fill=\"#333\">Strom</text>\n          <!-- Digitale Pins: links AREF, GND, 13…8 | Lücke | 7…0 -->\n          <text x=\"300\" y=\"22\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\" font-weight=\"bold\">Digitale Pins (0–13)</text>\n          <rect x=\"130\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"138\" y=\"68\" text-anchor=\"middle\" font-size=\"7\" fill=\"#EAF2FF\">AREF</text>\n          <rect x=\"152\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"160\" y=\"68\" text-anchor=\"middle\" font-size=\"7\" fill=\"#EAF2FF\">GND</text>\n          <rect x=\"174\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"182\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">13</text>\n          <rect x=\"196\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"204\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">12</text>\n          <rect x=\"218\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"226\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">11</text>\n          <text x=\"226\" y=\"80\" text-anchor=\"middle\" font-size=\"12\" fill=\"#FFC067\" font-weight=\"bold\">~</text>\n          <rect x=\"240\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"248\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">10</text>\n          <text x=\"248\" y=\"80\" text-anchor=\"middle\" font-size=\"12\" fill=\"#FFC067\" font-weight=\"bold\">~</text>\n          <rect x=\"262\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"270\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">9</text>\n          <text x=\"270\" y=\"80\" text-anchor=\"middle\" font-size=\"12\" fill=\"#FFC067\" font-weight=\"bold\">~</text>\n          <rect x=\"284\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"292\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">8</text>\n          <rect x=\"320\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"328\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">7</text>\n          <rect x=\"342\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"350\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">6</text>\n          <text x=\"350\" y=\"80\" text-anchor=\"middle\" font-size=\"12\" fill=\"#FFC067\" font-weight=\"bold\">~</text>\n          <rect x=\"364\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"372\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">5</text>\n          <text x=\"372\" y=\"80\" text-anchor=\"middle\" font-size=\"12\" fill=\"#FFC067\" font-weight=\"bold\">~</text>\n          <rect x=\"386\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"394\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">4</text>\n          <rect x=\"408\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"416\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">3</text>\n          <text x=\"416\" y=\"80\" text-anchor=\"middle\" font-size=\"12\" fill=\"#FFC067\" font-weight=\"bold\">~</text>\n          <rect x=\"430\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"438\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">2</text>\n          <rect x=\"452\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"460\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">1</text>\n          <rect x=\"474\" y=\"32\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"482\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">0</text>\n          <text x=\"320\" y=\"97\" font-size=\"10\" fill=\"#FFC067\">~ = PWM (3, 5, 6, 9, 10, 11)</text>\n          <!-- Untere Leiste: Strom-Pins | Lücke | A0…A5 -->\n          <rect x=\"150\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"158\" y=\"322\" text-anchor=\"middle\" font-size=\"8\" fill=\"#EAF2FF\">3.3V</text>\n          <rect x=\"172\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#C0392B\"/>\n          <text x=\"180\" y=\"322\" text-anchor=\"middle\" font-size=\"8\" fill=\"#FFB3B3\">5V</text>\n          <rect x=\"194\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"202\" y=\"322\" text-anchor=\"middle\" font-size=\"8\" fill=\"#EAF2FF\">GND</text>\n          <rect x=\"216\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"224\" y=\"322\" text-anchor=\"middle\" font-size=\"8\" fill=\"#EAF2FF\">GND</text>\n          <rect x=\"238\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"246\" y=\"322\" text-anchor=\"middle\" font-size=\"8\" fill=\"#EAF2FF\">Vin</text>\n          <text x=\"205\" y=\"368\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\" font-weight=\"bold\">Strom-Pins</text>\n          <rect x=\"300\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"308\" y=\"322\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">A0</text>\n          <rect x=\"322\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"330\" y=\"322\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">A1</text>\n          <rect x=\"344\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"352\" y=\"322\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">A2</text>\n          <rect x=\"366\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"374\" y=\"322\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">A3</text>\n          <rect x=\"388\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"396\" y=\"322\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">A4</text>\n          <rect x=\"410\" y=\"328\" width=\"16\" height=\"22\" rx=\"2\" fill=\"#222\"/>\n          <text x=\"418\" y=\"322\" text-anchor=\"middle\" font-size=\"9\" fill=\"#EAF2FF\">A5</text>\n          <text x=\"363\" y=\"368\" text-anchor=\"middle\" font-size=\"13\" fill=\"#333\" font-weight=\"bold\">Analoge Pins (A0–A5)</text>\n          <!-- Reset-Knopf oben links neben USB -->\n          <circle cx=\"108\" cy=\"84\" r=\"12\" fill=\"#C0392B\" stroke=\"#922\" stroke-width=\"1.5\"/>\n          <text x=\"108\" y=\"88\" text-anchor=\"middle\" font-size=\"8\" fill=\"white\" font-weight=\"bold\">RST</text>\n          <text x=\"108\" y=\"108\" text-anchor=\"middle\" font-size=\"10\" fill=\"#EAF2FF\">Reset</text>\n          <!-- Board-LED L an Pin 13 -->\n          <circle cx=\"182\" cy=\"120\" r=\"6\" fill=\"#F1C40F\" stroke=\"#D4AC0D\" stroke-width=\"1\"/>\n          <text x=\"194\" y=\"124\" font-size=\"10\" fill=\"#EAF2FF\">LED L (Pin 13)</text>\n          <!-- Mikrocontroller-Chip -->\n          <rect x=\"270\" y=\"200\" width=\"200\" height=\"70\" rx=\"4\" fill=\"#222\" stroke=\"#111\" stroke-width=\"1.5\"/>\n          <text x=\"370\" y=\"232\" text-anchor=\"middle\" font-size=\"13\" fill=\"#aaa\">ATmega328P</text>\n          <text x=\"370\" y=\"250\" text-anchor=\"middle\" font-size=\"10\" fill=\"#777\">Mikrocontroller</text>\n          <!-- Power-LED -->\n          <circle cx=\"500\" cy=\"130\" r=\"6\" fill=\"#2ECC71\" stroke=\"#27AE60\" stroke-width=\"1\"/>\n          <text x=\"500\" y=\"152\" text-anchor=\"middle\" font-size=\"10\" fill=\"#EAF2FF\">Power-LED</text>\n          </svg>"
  },
  {
   "slug": "das-arduino-uno-board",
   "from": "<tr><td><strong>Digitale Pins (0-13)</strong></td><td>Ein/Aus-Anschlüsse</td><td>LEDs, Taster, Buzzer</td></tr>",
   "to": "<tr><td><strong>Digitale Pins (0-13)</strong></td><td>Ein/Aus-Anschlüsse</td><td>LEDs, Taster, Buzzer (nimm Pin 2 bis 13, siehe Tipp unten)</td></tr>"
  },
  {
   "slug": "das-arduino-uno-board",
   "from": "wie ein Wasserkreislauf ohne Abfluss.\n        </div>",
   "to": "wie ein Wasserkreislauf ohne Abfluss.\n        </div>\n\n        <div class=\"tip-box\">\n          <strong>Tipp: Pin 0 und 1 frei lassen.</strong> Über diese beiden Pins spricht der Arduino per USB mit dem Computer (beschriftet mit RX und TX). Steckt dort ein Bauteil, kann das Hochladen fehlschlagen. Nimm für LEDs und Taster deshalb Pin 2 bis 13.\n        </div>"
  },
  {
   "slug": "das-arduino-uno-board",
   "from": "Analoge Pins wandeln die gemessene Spannung (0–5V) mit 10-Bit-Auflösung in einen Wert zwischen 0 und 1023 um – nicht nur an/aus.",
   "to": "Analoge Pins wandeln die gemessene Spannung (0–5V) in einen Wert zwischen 0 und 1023 um – nicht nur an/aus."
  },
  {
   "slug": "das-arduino-uno-board",
   "from": "Zum Dimmen brauchst du einen <strong>PWM-Pin</strong> (mit ~ markiert). Nur diese Pins können Zwischenwerte ausgeben.",
   "to": "Zum Dimmen brauchst du einen <strong>PWM-Pin</strong> (mit ~ markiert). Diese Pins schalten sehr schnell an und aus – für dein Auge wirkt die LED dann dunkler. Genaueres lernst du in Modul 3."
  },
  {
   "exercise": "16f913dd-5b7f-427b-9eb1-0660922d76ff",
   "from": "Ordne die Bauteile dem richtigen Pin-Typ zu:",
   "to": "Ordne jeder Aufgabe den passenden Anschluss zu:"
  },
  {
   "slug": "strom-spannung-und-widerstand",
   "from": "Den interaktiven Regler dazu findest du gleich in der Lektion <em>\"Die Arduino IDE & dein erstes Programm\"</em>.",
   "to": "Ausprobieren kannst du das mit dem Regler in der nächsten Lektion <em>\"Die Arduino IDE & dein erstes Programm\"</em>."
  },
  {
   "slug": "strom-spannung-und-widerstand",
   "from": "welcher Vorwiderstand bei 5&nbsp;V und 20&nbsp;mA nötig ist:",
   "to": "welcher Vorwiderstand bei 5&nbsp;V und 15&nbsp;mA nötig ist:"
  },
  {
   "slug": "strom-spannung-und-widerstand",
   "from": "var r=Math.round(ur/0.02);",
   "to": "var r=Math.round(ur/0.015);"
  },
  {
   "slug": "strom-spannung-und-widerstand",
   "from": "R = U<sub>R</sub> &divide; 0,02&nbsp;A = <strong><span id=\"vorwsim-r\">150</span>",
   "to": "R = U<sub>R</sub> &divide; 0,015&nbsp;A = <strong><span id=\"vorwsim-r\">200</span>"
  },
  {
   "slug": "strom-spannung-und-widerstand",
   "from": "<span id=\"vorwsim-norm\">150</span>",
   "to": "<span id=\"vorwsim-norm\">220</span>"
  },
  {
   "slug": "strom-spannung-und-widerstand",
   "from": "<p>Bisher hast du Schaltungen als <strong>Breadboard-Ansicht</strong> gesehen &ndash; also so, wie sie real auf dem Steckbrett aussehen. In der Technik (und in der Prüfung!) benutzt man stattdessen den <strong>Schaltplan</strong>:",
   "to": "<p>Später baust du Schaltungen auf dem Steckbrett (Breadboard) auf. Um sie zu planen und in der Prüfung zu zeichnen, benutzt man den <strong>Schaltplan</strong>:"
  },
  {
   "slug": "strom-spannung-und-widerstand",
   "from": "<line x1=\"104\" y1=\"232\" x2=\"148\" y2=\"216\" stroke=\"#333\" stroke-width=\"2\"/>",
   "to": "<line x1=\"104\" y1=\"232\" x2=\"148\" y2=\"216\" stroke=\"#333\" stroke-width=\"2\"/>\n              <line x1=\"126\" y1=\"224\" x2=\"126\" y2=\"210\" stroke=\"#333\" stroke-width=\"1.5\" stroke-dasharray=\"3,2\"/>\n              <line x1=\"119\" y1=\"210\" x2=\"133\" y2=\"210\" stroke=\"#333\" stroke-width=\"2\"/>"
  },
  {
   "slug": "strom-spannung-und-widerstand",
   "from": "<text x=\"380\" y=\"230\" text-anchor=\"middle\" font-size=\"13\" fill=\"#222\">Taster / Schalter<tspan x=\"380\" dy=\"14\" font-size=\"11\" fill=\"#666\">offen = kein Strom, geschlossen = Strom</tspan></text>",
   "to": "<text x=\"380\" y=\"224\" text-anchor=\"middle\" font-size=\"13\" fill=\"#222\">Taster<tspan x=\"380\" dy=\"14\" font-size=\"11\" fill=\"#666\">geschlossen nur, solange du drückst</tspan><tspan x=\"380\" dy=\"13\" font-size=\"11\" fill=\"#666\">(Schalter: gleiches Symbol ohne Druckknopf)</tspan></text>"
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "<h3>Installation</h3>\n          <ol class=\"step-list\">\n            <li>Gehe auf <code>arduino.cc/en/software</code></li>\n            <li>Lade die Arduino IDE 2 herunter (kostenlos)</li>\n            <li>Installieren, Arduino per USB anschließen</li>\n            <li>Board auswählen: <strong>Arduino Uno</strong></li>\n            <li>Port auswählen (wird automatisch erkannt)</li>\n          </ol>",
   "to": "<h3>Vorbereitung: Board und Port wählen</h3>\n          <p>An den Schulrechnern ist die Arduino IDE schon installiert. Zu Hause kannst du sie kostenlos von <code>arduino.cc/en/software</code> laden.</p>\n          <ol class=\"step-list\">\n            <li>Arduino per USB-Kabel an den Computer anschließen</li>\n            <li>Board auswählen: <strong>Arduino Uno</strong></li>\n            <li>Port auswählen. Der <strong>Port</strong> ist der USB-Anschluss, an dem dein Arduino hängt (unter Windows z.B. COM3). Meist steht \"Arduino Uno\" schon daneben.</li>\n          </ol>"
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "<td>Prüft, ob dein Code Fehler hat</td>",
   "to": "<td>Übersetzt deinen Code in Befehle, die der Chip versteht (das heißt <strong>kompilieren</strong>), und findet dabei Tippfehler</td>"
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "<li><code>delay(1000)</code> – Wartet 1000 Millisekunden = 1 Sekunde</li>\n          </ul>\n        </div>",
   "to": "<li><code>delay(1000)</code> – Wartet 1000 Millisekunden = 1 Sekunde</li>\n          </ul>\n        </div>\n\n        <div class=\"warning-box\">\n          <strong>Klappt nicht? So findest du den Fehler</strong>\n          <ul style=\"margin-top:0.5rem; margin-left:1.25rem;\">\n            <li><strong>Rote Meldung nach ✓ Überprüfen:</strong> Die IDE markiert die Zeile mit dem Fehler. Meist fehlt ein Semikolon <code>;</code> oder eine Klammer – oft in der Zeile <em>davor</em>. Achte auch auf Groß- und Kleinschreibung: <code>pinmode</code> ist falsch, <code>pinMode</code> richtig.</li>\n            <li><strong>Kein Port in der Liste:</strong> USB-Kabel ab- und wieder anstecken. Der Eintrag, der dann neu erscheint, ist dein Arduino. Hilft das nicht, ein anderes Kabel probieren – manche USB-Kabel laden nur und übertragen keine Daten.</li>\n            <li><strong>Hochladen bricht ab:</strong> Ist als Board \"Arduino Uno\" gewählt und der richtige Port? Kabel kurz ab- und anstecken, dann noch einmal hochladen.</li>\n            <li><strong>Hochladen klappt, aber nichts blinkt:</strong> Schau auf die kleine LED mit dem Buchstaben \"L\" neben Pin 13 – nicht auf die grüne Power-LED, die leuchtet immer.</li>\n          </ul>\n        </div>"
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "<p>Eine externe LED an Pin 13 – die einfachste Schaltung:</p>",
   "to": "<p><strong>Nur zum Anschauen:</strong> So sähe Blink mit einer externen LED an Pin 13 aus. Selbst aufbauen wirst du so eine Schaltung in Modul 2 (\"LEDs ansteuern\"). Die eingebaute Board-LED würde dabei mitblinken.</p>"
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "<!-- Beine: Sp.5 Reihe c → Reihe a (Pin-Anschluss), Sp.7 Reihe c → Reihe a (LED-Anode-Anschluss) -->\n            <line x1=\"140\" y1=\"268\" x2=\"140\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>\n            <line x1=\"180\" y1=\"268\" x2=\"180\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": "<!-- Widerstand steckt in 5c und 7c; die 5er-Spalten verbinden ihn mit Pin-Kabel (5a) und LED-Anode (7a) -->"
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "<!-- Kathoden-Jumper: Sp.8 Reihe a → obere -Schiene -->\n            <line x1=\"200\" y1=\"240\" x2=\"200\" y2=\"212\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<!-- Kathoden-Jumper: Sp.8 Reihe b → obere -Schiene (eigenes Loch, nicht das der LED) -->\n            <circle cx=\"200\" cy=\"254\" r=\"2.5\" fill=\"#222\"/>\n            <polyline points=\"200,254 214,247 214,212\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "<text x=\"185\" y=\"222\" text-anchor=\"middle\" font-size=\"7\" fill=\"#c62828\" font-weight=\"bold\">LED</text>",
   "to": "<text x=\"185\" y=\"222\" text-anchor=\"middle\" font-size=\"7\" fill=\"#c62828\" font-weight=\"bold\">LED</text>\n            <text x=\"172\" y=\"236\" text-anchor=\"end\" font-size=\"6\" fill=\"#2E7D32\" font-weight=\"bold\">+</text>"
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "<rect x=\"20\" y=\"440\" width=\"660\" height=\"70\" rx=\"6\" fill=\"#fff\" stroke=\"#ddd\" stroke-width=\"1\"/>",
   "to": "<rect x=\"20\" y=\"440\" width=\"660\" height=\"86\" rx=\"6\" fill=\"#fff\" stroke=\"#ddd\" stroke-width=\"1\"/>"
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "<text x=\"32\" y=\"496\" font-size=\"8.5\" fill=\"#555\">Stromfluss: Pin 13 → 220Ω → LED Anode → LED Kathode → GND</text>",
   "to": "<text x=\"32\" y=\"496\" font-size=\"8.5\" fill=\"#555\">Stromfluss: Pin 13 → 220Ω → LED Anode → LED Kathode → GND</text>\n            <text x=\"32\" y=\"514\" font-size=\"8.5\" fill=\"#555\">LED-Polung: Dreieck-Seite = langes Bein (Anode, +) in Sp.7 · Strich-Seite = kurzes Bein (Kathode, −) in Sp.8</text>"
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "<svg viewBox=\"0 0 700 520\"",
   "to": "<svg viewBox=\"0 0 700 534\""
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "s.textContent='Zu viel Strom - die LED brennt durch!';",
   "to": "s.textContent='Mehr als 20 mA – zu viel: Die LED wird überlastet und kann durchbrennen.';"
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "document.getElementById('vwr-i').textContent=I.toFixed(1);",
   "to": "document.getElementById('vwr-i').textContent=I.toFixed(1).replace('.',',');"
  },
  {
   "slug": "die-arduino-ide-und-dein-erstes-programm",
   "from": "<span id=\"vwr-i\">13.6</span>",
   "to": "<span id=\"vwr-i\">13,6</span>"
  },
  {
   "exercise": "dca53f99-6f21-405d-892d-3f8bf866e174",
   "payload": {
    "type": "ordering",
    "items": [
     "Auf \"Hochladen\" klicken",
     "Code in der IDE schreiben",
     "Prüfen, ob die LED blinkt",
     "Auf \"Überprüfen\" klicken"
    ],
    "question": "Bringe die Schritte zum Hochladen in die richtige Reihenfolge:",
    "explanation": "Erst schreibst du den Code. Mit \"Überprüfen\" übersetzt die IDE ihn und findet Tippfehler &ndash; das geht sogar ohne angeschlossenen Arduino. Spätestens vor dem \"Hochladen\" muss der Arduino per USB verbunden und der Port gewählt sein. Zum Schluss prüfst du am Board, ob die LED wirklich blinkt.",
    "correctOrder": [
     1,
     3,
     0,
     2
    ]
   }
  },
  {
   "slug": "setup-und-loop",
   "from": "<span class=\"keyword\">int</span> tasterPin = <span class=\"value\">7</span>;\n",
   "to": ""
  },
  {
   "slug": "setup-und-loop",
   "from": "<span class=\"function\">digitalWrite</span>(ledPin, HIGH);\n  <span class=\"function\">delay</span>(<span class=\"value\">1000</span>);\n}</code></pre>",
   "to": "<span class=\"function\">digitalWrite</span>(ledPin, HIGH);\n  <span class=\"function\">delay</span>(<span class=\"value\">1000</span>);\n  <span class=\"function\">digitalWrite</span>(ledPin, LOW);\n  <span class=\"function\">delay</span>(<span class=\"value\">1000</span>);\n  <span class=\"comment\">// danach geht es sofort wieder oben in loop() los</span>\n}</code></pre>"
  },
  {
   "slug": "setup-und-loop",
   "from": "<strong>loop()</strong> = Kochen – rühren, würzen, probieren → <em>wiederholt sich</em> bis es fertig ist",
   "to": "<strong>loop()</strong> = Kochen ohne Ende – rühren, würzen, probieren und sofort wieder von vorn, solange der Arduino Strom hat. Ein \"fertig\" gibt es bei loop() nicht."
  },
  {
   "slug": "setup-und-loop",
   "from": "<svg viewBox=\"0 0 500 260\"",
   "to": "<svg viewBox=\"0 0 530 260\""
  },
  {
   "slug": "setup-und-loop",
   "from": "<li><code>int tasterPin = 7;</code></li>\n              <li><code>bool ledAn = false;</code></li>",
   "to": "<li><code>int tasterPin = 7;</code></li>\n              <li><code>int wartezeit = 500;</code></li>"
  },
  {
   "slug": "setup-und-loop",
   "from": "Wenn du die LED später an einen anderen Pin steckst, änderst du nur eine einzige Zeile.\n        </div>",
   "to": "Wenn du die LED später an einen anderen Pin steckst, änderst du nur eine einzige Zeile.\n        </div>\n\n        <div class=\"info-card\">\n          <h3>Was bedeuten int und void?</h3>\n          <ul>\n            <li><code>int</code> steht vor einer Variablen und heißt: Hier wird eine <strong>ganze Zahl</strong> gespeichert (z.B. 13 oder 500, keine Kommazahl).</li>\n            <li><code>void</code> steht vor <code>setup()</code> und <code>loop()</code> und heißt: Diese Funktion liefert kein Ergebnis zurück. Merk es dir einfach als festen Teil der Schreibweise.</li>\n          </ul>\n        </div>"
  },
  {
   "slug": "setup-und-loop",
   "from": "Der Serial Monitor wird mit 9600 Baud gestartet.",
   "to": "Der Serial Monitor wird mit 9600 Baud gestartet. Baud ist die Übertragungsgeschwindigkeit. Im Serial Monitor muss dieselbe Zahl (9600) eingestellt sein, sonst erscheint nur Zeichensalat."
  },
  {
   "exercise": "918ee6ef-70e6-4e0c-b8a6-39816f1ae4ce",
   "from": "In welcher Reihenfolge werden diese Codezeilen ausgeführt?",
   "to": "In welcher Reihenfolge passiert das, wenn der Arduino startet?"
  },
  {
   "solution": "die-arduino-ide-und-dein-erstes-programm",
   "field": "didactics",
   "from": "die Reihenfolge Anschließen -> Schreiben -> Überprüfen -> Hochladen sind typische BW-Bausteine.",
   "to": "die Reihenfolge Schreiben -> Überprüfen -> Hochladen (spätestens vor dem Hochladen anschließen + Port wählen) sind typische BW-Bausteine."
  }
 ],
 "newExercises": [
  {
   "slug": "strom-spannung-und-widerstand",
   "position": 7,
   "type": "multiple-choice",
   "payload": {
    "type": "multiple-choice",
    "question": "Zwei rote LEDs (je 2&nbsp;V) sind in Reihe an 5&nbsp;V angeschlossen. Wie viel Spannung bleibt für den Vorwiderstand?",
    "options": [
     "1 V",
     "3 V",
     "5 V",
     "4 V"
    ],
    "correct": 0,
    "explanation": "Richtig! In Reihe addieren sich die Spannungen: 2&nbsp;V + 2&nbsp;V = 4&nbsp;V brauchen die LEDs. Für den Widerstand bleibt 5&nbsp;V &minus; 4&nbsp;V = 1&nbsp;V.",
    "wrongExplanations": {
     "1": "3&nbsp;V blieben bei nur EINER LED übrig. In Reihe brauchen beide LEDs zusammen 2&nbsp;V + 2&nbsp;V = 4&nbsp;V &ndash; also bleibt nur 1&nbsp;V.",
     "2": "Die 5&nbsp;V teilen sich auf alle Bauteile in der Reihe auf. Die LEDs brauchen zusammen 4&nbsp;V, für den Widerstand bleibt 1&nbsp;V.",
     "3": "4&nbsp;V brauchen die beiden LEDs zusammen. Gefragt ist der Rest für den Widerstand: 5&nbsp;V &minus; 4&nbsp;V = 1&nbsp;V."
    }
   }
  },
  {
   "slug": "strom-spannung-und-widerstand",
   "position": 8,
   "type": "multiple-choice",
   "payload": {
    "type": "multiple-choice",
    "question": "Drei LEDs sollen parallel am Arduino leuchten. Wie viele Vorwiderstände brauchst du?",
    "options": [
     "Einen für alle zusammen",
     "Drei – jede LED bekommt ihren eigenen",
     "Keinen, weil sie parallel sind",
     "Zwei"
    ],
    "correct": 1,
    "explanation": "Richtig! In der Parallelschaltung hat jede LED ihren eigenen Zweig. Jeder Zweig braucht einen eigenen Vorwiderstand, der den Strom für genau diese LED begrenzt.",
    "wrongExplanations": {
     "0": "Ein gemeinsamer Widerstand reicht nicht: Die LEDs teilen sich den Strom dann ungleich auf. Die LED mit der kleinsten Flussspannung bekommt am meisten ab und kann überlastet werden.",
     "2": "Auch parallel gilt: Ohne Vorwiderstand fließt durch jede LED viel zu viel Strom.",
     "3": "Es gibt drei Zweige mit je einer LED &ndash; jeder Zweig braucht seinen eigenen Vorwiderstand, also drei."
    }
   }
  }
 ]
};
