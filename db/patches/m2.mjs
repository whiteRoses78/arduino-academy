// M2 Digital — Korrekturen aus der Gesamtprüfung vom 02.10.2026.
// Einspielen: siehe Kopf von db/content-patch.mjs. Generiert, nicht von Hand ändern.
export default {
 "module": "digital",
 "text": [
  {
   "slug": "taster-als-eingabe",
   "from": "            <!-- ===== KABEL: senkrecht ===== -->\n            <!-- Pin 7 → Sp.8 Reihe e (Taster Bein 1 oben) - Pin-Position x=200 = Sp.8 (60+7*20=200) -->\n            <line x1=\"200\" y1=\"118\" x2=\"200\" y2=\"296\" stroke=\"#66f\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"200\" cy=\"296\" r=\"3.5\" fill=\"#66f\" stroke=\"#008\" stroke-width=\"0.8\"/>\n            <!-- GND → obere -Schiene (x=380) -->\n            <line x1=\"380\" y1=\"118\" x2=\"380\" y2=\"210\" stroke=\"#333\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"380\" cy=\"210\" r=\"3.5\" fill=\"#333\"/>\n\n            <!-- ===== BREADBOARD ===== -->",
   "to": "            <!-- ===== BREADBOARD ===== -->"
  },
  {
   "slug": "taster-als-eingabe",
   "from": "            <!-- ===== TASTER über Mittelrinne (Sp.8 Reihe e + Sp.10 Reihe f, diagonal) ===== -->",
   "to": "            <!-- ===== KABEL (nach dem Breadboard gezeichnet, Enden sichtbar) ===== -->\n            <!-- Pin 7 → Sp.8 Reihe e (Taster Bein 1 oben) - Pin-Position x=200 = Sp.8 (60+7*20=200) -->\n            <line x1=\"200\" y1=\"118\" x2=\"200\" y2=\"296\" stroke=\"#66f\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"200\" cy=\"296\" r=\"3.5\" fill=\"#66f\" stroke=\"#008\" stroke-width=\"0.8\"/>\n            <!-- GND → obere -Schiene (x=380) -->\n            <line x1=\"380\" y1=\"118\" x2=\"380\" y2=\"210\" stroke=\"#333\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"380\" cy=\"210\" r=\"3.5\" fill=\"#333\"/>\n\n            <!-- ===== TASTER über Mittelrinne (Sp.8 Reihe e + Sp.10 Reihe f, diagonal) ===== -->"
  },
  {
   "slug": "led-mit-taster-steuern",
   "from": "\n            <line x1=\"260\" y1=\"310\" x2=\"260\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "led-mit-taster-steuern",
   "from": "\n            <line x1=\"280\" y1=\"310\" x2=\"280\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "led-mit-taster-steuern",
   "from": "<line x1=\"300\" y1=\"240\" x2=\"300\" y2=\"212\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"300\" cy=\"254\" r=\"2.5\" fill=\"#222\"/><polyline points=\"300,254 312,247 312,212\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "led-mit-taster-steuern",
   "from": "            <!-- ===== KABEL: senkrecht ===== -->\n            <!-- Pin 7 → Sp.5 Reihe e (Taster Bein 1 oben) -->\n            <line x1=\"140\" y1=\"118\" x2=\"140\" y2=\"296\" stroke=\"#66f\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"140\" cy=\"296\" r=\"3.5\" fill=\"#66f\" stroke=\"#008\" stroke-width=\"0.8\"/>\n            <!-- Pin 8 → Sp.11 Reihe a (LED-Widerstand) -->\n            <line x1=\"260\" y1=\"118\" x2=\"260\" y2=\"240\" stroke=\"#E74C3C\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"260\" cy=\"240\" r=\"3.5\" fill=\"#E74C3C\" stroke=\"#800\" stroke-width=\"0.8\"/>\n            <!-- GND → obere -Schiene -->\n            <line x1=\"380\" y1=\"118\" x2=\"380\" y2=\"210\" stroke=\"#333\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"380\" cy=\"210\" r=\"3.5\" fill=\"#333\"/>\n\n            <!-- ===== BREADBOARD ===== -->",
   "to": "            <!-- ===== BREADBOARD ===== -->"
  },
  {
   "slug": "led-mit-taster-steuern",
   "from": "            <!-- ===== TASTER (Sp.5 Reihe e + Sp.7 Reihe f, über Mittelrinne) ===== -->",
   "to": "            <!-- ===== KABEL (nach dem Breadboard gezeichnet, Enden sichtbar) ===== -->\n            <!-- Pin 7 → Sp.5 Reihe e (Taster Bein 1 oben) -->\n            <line x1=\"140\" y1=\"118\" x2=\"140\" y2=\"296\" stroke=\"#66f\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"140\" cy=\"296\" r=\"3.5\" fill=\"#66f\" stroke=\"#008\" stroke-width=\"0.8\"/>\n            <!-- Pin 8 → Sp.11 Reihe a (LED-Widerstand) -->\n            <line x1=\"260\" y1=\"118\" x2=\"260\" y2=\"240\" stroke=\"#E74C3C\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"260\" cy=\"240\" r=\"3.5\" fill=\"#E74C3C\" stroke=\"#800\" stroke-width=\"0.8\"/>\n            <!-- GND → obere -Schiene -->\n            <line x1=\"380\" y1=\"118\" x2=\"380\" y2=\"210\" stroke=\"#333\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"380\" cy=\"210\" r=\"3.5\" fill=\"#333\"/>\n\n            <!-- ===== TASTER (Sp.5 Reihe e + Sp.7 Reihe f, über Mittelrinne) ===== -->"
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "\n            <line x1=\"100\" y1=\"268\" x2=\"100\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "\n            <line x1=\"120\" y1=\"268\" x2=\"120\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "\n            <line x1=\"180\" y1=\"268\" x2=\"180\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "\n            <line x1=\"200\" y1=\"268\" x2=\"200\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "\n            <line x1=\"260\" y1=\"268\" x2=\"260\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "\n            <line x1=\"280\" y1=\"268\" x2=\"280\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "<line x1=\"140\" y1=\"240\" x2=\"140\" y2=\"212\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"140\" cy=\"254\" r=\"2.5\" fill=\"#222\"/><polyline points=\"140,254 152,247 152,212\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "<line x1=\"220\" y1=\"240\" x2=\"220\" y2=\"212\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"220\" cy=\"254\" r=\"2.5\" fill=\"#222\"/><polyline points=\"220,254 232,247 232,212\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "<line x1=\"300\" y1=\"240\" x2=\"300\" y2=\"212\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"300\" cy=\"254\" r=\"2.5\" fill=\"#222\"/><polyline points=\"300,254 312,247 312,212\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "            <!-- ===== KABEL: senkrecht ===== -->\n            <line x1=\"100\" y1=\"118\" x2=\"100\" y2=\"240\" stroke=\"#E74C3C\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"100\" cy=\"240\" r=\"3.5\" fill=\"#E74C3C\" stroke=\"#800\" stroke-width=\"0.8\"/>\n            <line x1=\"180\" y1=\"118\" x2=\"180\" y2=\"240\" stroke=\"#F1C40F\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"180\" cy=\"240\" r=\"3.5\" fill=\"#F1C40F\" stroke=\"#770\" stroke-width=\"0.8\"/>\n            <line x1=\"260\" y1=\"118\" x2=\"260\" y2=\"240\" stroke=\"#2ECC71\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"260\" cy=\"240\" r=\"3.5\" fill=\"#2ECC71\" stroke=\"#040\" stroke-width=\"0.8\"/>\n            <line x1=\"380\" y1=\"118\" x2=\"380\" y2=\"210\" stroke=\"#333\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"380\" cy=\"210\" r=\"3.5\" fill=\"#333\"/>\n\n            <!-- ===== BREADBOARD ===== -->",
   "to": "            <!-- ===== BREADBOARD ===== -->"
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "            <!-- ===== BAUTEILE (3 LED-Kreise) ===== -->",
   "to": "            <!-- ===== KABEL (nach dem Breadboard gezeichnet, Enden sichtbar) ===== -->\n            <line x1=\"100\" y1=\"118\" x2=\"100\" y2=\"240\" stroke=\"#E74C3C\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"100\" cy=\"240\" r=\"3.5\" fill=\"#E74C3C\" stroke=\"#800\" stroke-width=\"0.8\"/>\n            <line x1=\"180\" y1=\"118\" x2=\"180\" y2=\"240\" stroke=\"#F1C40F\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"180\" cy=\"240\" r=\"3.5\" fill=\"#F1C40F\" stroke=\"#770\" stroke-width=\"0.8\"/>\n            <line x1=\"260\" y1=\"118\" x2=\"260\" y2=\"240\" stroke=\"#2ECC71\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"260\" cy=\"240\" r=\"3.5\" fill=\"#2ECC71\" stroke=\"#040\" stroke-width=\"0.8\"/>\n            <line x1=\"380\" y1=\"118\" x2=\"380\" y2=\"210\" stroke=\"#333\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"380\" cy=\"210\" r=\"3.5\" fill=\"#333\"/>\n\n            <!-- ===== BAUTEILE (3 LED-Kreise) ===== -->"
  },
  {
   "slug": "leds-ansteuern",
   "from": "\n            <line x1=\"140\" y1=\"240\" x2=\"140\" y2=\"260\" stroke=\"#864\" stroke-width=\"1.2\"/>",
   "to": ""
  },
  {
   "slug": "leds-ansteuern",
   "from": "\n            <line x1=\"160\" y1=\"240\" x2=\"160\" y2=\"216\" stroke=\"#864\" stroke-width=\"1.2\"/>",
   "to": ""
  },
  {
   "slug": "leds-ansteuern",
   "from": "<line x1=\"180\" y1=\"214\" x2=\"180\" y2=\"182\" stroke=\"#222\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"180\" cy=\"228\" r=\"2.5\" fill=\"#222\"/><polyline points=\"180,228 192,221 192,182\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "leds-ansteuern",
   "from": "            <!-- ===== KABEL: ARDUINO -> BREADBOARD ===== -->\n            <!-- Pin 8 -> Sp.3 Reihe e (gelb, x=140) -->\n            <line x1=\"140\" y1=\"107\" x2=\"140\" y2=\"260\" stroke=\"#cc0\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n            <circle cx=\"140\" cy=\"260\" r=\"3\" fill=\"#cc0\" stroke=\"#660\" stroke-width=\"0.8\"/>\n\n            <!-- GND -> obere -Schiene (schwarz, x=200) -->\n            <line x1=\"200\" y1=\"107\" x2=\"200\" y2=\"182\" stroke=\"#222\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n            <circle cx=\"200\" cy=\"182\" r=\"3\" fill=\"#222\"/>\n\n            <!-- ===== BREADBOARD (unten) ===== -->",
   "to": "            <!-- ===== BREADBOARD (unten) ===== -->"
  },
  {
   "slug": "leds-ansteuern",
   "from": "            <!-- ===== BAUTEILE ===== -->",
   "to": "            <!-- ===== KABEL (nach dem Breadboard gezeichnet, Enden sichtbar) ===== -->\n            <!-- Pin 8 -> Sp.3 Reihe e (gelb, x=140) -->\n            <line x1=\"140\" y1=\"107\" x2=\"140\" y2=\"260\" stroke=\"#cc0\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n            <circle cx=\"140\" cy=\"260\" r=\"3\" fill=\"#cc0\" stroke=\"#660\" stroke-width=\"0.8\"/>\n\n            <!-- GND -> obere -Schiene (schwarz, x=200) -->\n            <line x1=\"200\" y1=\"107\" x2=\"200\" y2=\"182\" stroke=\"#222\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n            <circle cx=\"200\" cy=\"182\" r=\"3\" fill=\"#222\"/>\n\n            <!-- ===== BAUTEILE ===== -->"
  },
  {
   "slug": "wechselblinker",
   "from": "\n            <line x1=\"140\" y1=\"268\" x2=\"140\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "wechselblinker",
   "from": "\n            <line x1=\"180\" y1=\"268\" x2=\"180\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "wechselblinker",
   "from": "\n            <line x1=\"260\" y1=\"268\" x2=\"260\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "wechselblinker",
   "from": "\n            <line x1=\"300\" y1=\"268\" x2=\"300\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "wechselblinker",
   "from": "<line x1=\"200\" y1=\"240\" x2=\"200\" y2=\"212\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"200\" cy=\"254\" r=\"2.5\" fill=\"#222\"/><polyline points=\"200,254 212,247 212,212\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "wechselblinker",
   "from": "<line x1=\"320\" y1=\"240\" x2=\"320\" y2=\"212\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"320\" cy=\"254\" r=\"2.5\" fill=\"#222\"/><polyline points=\"320,254 332,247 332,212\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "wechselblinker",
   "from": "            <!-- ===== KABEL: senkrecht ===== -->\n            <!-- Pin 12 (grün) → Sp.5 Reihe a -->\n            <line x1=\"140\" y1=\"118\" x2=\"140\" y2=\"240\" stroke=\"#27AE60\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"140\" cy=\"240\" r=\"3.5\" fill=\"#27AE60\" stroke=\"#040\" stroke-width=\"0.8\"/>\n            <!-- Pin 13 (rot) → Sp.11 Reihe a -->\n            <line x1=\"260\" y1=\"118\" x2=\"260\" y2=\"240\" stroke=\"#E74C3C\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"260\" cy=\"240\" r=\"3.5\" fill=\"#E74C3C\" stroke=\"#800\" stroke-width=\"0.8\"/>\n            <!-- GND → obere -Schiene (Sp.17, x=380) -->\n            <line x1=\"380\" y1=\"118\" x2=\"380\" y2=\"210\" stroke=\"#333\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"380\" cy=\"210\" r=\"3.5\" fill=\"#333\"/>\n\n            <!-- ===== BREADBOARD (unten, volle Breite) ===== -->",
   "to": "            <!-- ===== BREADBOARD (unten, volle Breite) ===== -->"
  },
  {
   "slug": "wechselblinker",
   "from": "            <!-- ===== BAUTEILE ===== -->",
   "to": "            <!-- ===== KABEL (nach dem Breadboard gezeichnet, Enden sichtbar) ===== -->\n            <!-- Pin 12 (grün) → Sp.5 Reihe a -->\n            <line x1=\"140\" y1=\"118\" x2=\"140\" y2=\"240\" stroke=\"#27AE60\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"140\" cy=\"240\" r=\"3.5\" fill=\"#27AE60\" stroke=\"#040\" stroke-width=\"0.8\"/>\n            <!-- Pin 13 (rot) → Sp.11 Reihe a -->\n            <line x1=\"260\" y1=\"118\" x2=\"260\" y2=\"240\" stroke=\"#E74C3C\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"260\" cy=\"240\" r=\"3.5\" fill=\"#E74C3C\" stroke=\"#800\" stroke-width=\"0.8\"/>\n            <!-- GND → obere -Schiene (Sp.17, x=380) -->\n            <line x1=\"380\" y1=\"118\" x2=\"380\" y2=\"210\" stroke=\"#333\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"380\" cy=\"210\" r=\"3.5\" fill=\"#333\"/>\n\n            <!-- ===== BAUTEILE ===== -->"
  },
  {
   "slug": "led-lauflicht",
   "from": "\n            <line x1=\"100\" y1=\"268\" x2=\"100\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "led-lauflicht",
   "from": "\n            <line x1=\"120\" y1=\"268\" x2=\"120\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "led-lauflicht",
   "from": "\n            <line x1=\"180\" y1=\"268\" x2=\"180\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "led-lauflicht",
   "from": "\n            <line x1=\"200\" y1=\"268\" x2=\"200\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "led-lauflicht",
   "from": "\n            <line x1=\"260\" y1=\"268\" x2=\"260\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "led-lauflicht",
   "from": "\n            <line x1=\"280\" y1=\"268\" x2=\"280\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "led-lauflicht",
   "from": "\n            <line x1=\"340\" y1=\"268\" x2=\"340\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "led-lauflicht",
   "from": "\n            <line x1=\"360\" y1=\"268\" x2=\"360\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "led-lauflicht",
   "from": "\n            <line x1=\"420\" y1=\"268\" x2=\"420\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "led-lauflicht",
   "from": "\n            <line x1=\"440\" y1=\"268\" x2=\"440\" y2=\"240\" stroke=\"#864\" stroke-width=\"1.5\"/>",
   "to": ""
  },
  {
   "slug": "led-lauflicht",
   "from": "<line x1=\"140\" y1=\"240\" x2=\"140\" y2=\"212\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"140\" cy=\"254\" r=\"2.5\" fill=\"#222\"/><polyline points=\"140,254 152,247 152,212\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "led-lauflicht",
   "from": "<line x1=\"220\" y1=\"240\" x2=\"220\" y2=\"212\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"220\" cy=\"254\" r=\"2.5\" fill=\"#222\"/><polyline points=\"220,254 232,247 232,212\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "led-lauflicht",
   "from": "<line x1=\"300\" y1=\"240\" x2=\"300\" y2=\"212\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"300\" cy=\"254\" r=\"2.5\" fill=\"#222\"/><polyline points=\"300,254 312,247 312,212\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "led-lauflicht",
   "from": "<line x1=\"380\" y1=\"240\" x2=\"380\" y2=\"212\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"380\" cy=\"254\" r=\"2.5\" fill=\"#222\"/><polyline points=\"380,254 392,247 392,212\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "led-lauflicht",
   "from": "<line x1=\"460\" y1=\"240\" x2=\"460\" y2=\"212\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
   "to": "<circle cx=\"460\" cy=\"254\" r=\"2.5\" fill=\"#222\"/><polyline points=\"460,254 472,247 472,212\" fill=\"none\" stroke=\"#222\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
  },
  {
   "slug": "led-lauflicht",
   "from": "            <!-- ===== KABEL: senkrecht (Pin X → Sp.Y Reihe a) ===== -->\n            <line x1=\"100\" y1=\"118\" x2=\"100\" y2=\"240\" stroke=\"#E74C3C\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"100\" cy=\"240\" r=\"3.5\" fill=\"#E74C3C\" stroke=\"#800\" stroke-width=\"0.8\"/>\n            <line x1=\"180\" y1=\"118\" x2=\"180\" y2=\"240\" stroke=\"#E67E22\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"180\" cy=\"240\" r=\"3.5\" fill=\"#E67E22\" stroke=\"#933\" stroke-width=\"0.8\"/>\n            <line x1=\"260\" y1=\"118\" x2=\"260\" y2=\"240\" stroke=\"#F1C40F\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"260\" cy=\"240\" r=\"3.5\" fill=\"#F1C40F\" stroke=\"#770\" stroke-width=\"0.8\"/>\n            <line x1=\"340\" y1=\"118\" x2=\"340\" y2=\"240\" stroke=\"#2ECC71\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"340\" cy=\"240\" r=\"3.5\" fill=\"#2ECC71\" stroke=\"#040\" stroke-width=\"0.8\"/>\n            <line x1=\"420\" y1=\"118\" x2=\"420\" y2=\"240\" stroke=\"#3498db\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"420\" cy=\"240\" r=\"3.5\" fill=\"#3498db\" stroke=\"#005\" stroke-width=\"0.8\"/>\n            <!-- GND → obere -Schiene -->\n            <line x1=\"540\" y1=\"118\" x2=\"540\" y2=\"210\" stroke=\"#333\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"540\" cy=\"210\" r=\"3.5\" fill=\"#333\"/>\n\n            <!-- ===== BREADBOARD ===== -->",
   "to": "            <!-- ===== BREADBOARD ===== -->"
  },
  {
   "slug": "led-lauflicht",
   "from": "            <!-- ===== BAUTEILE (5 LED-Kreise: Pin-Sp → 220Ω horizontal → LED-Anode-Sp → LED-Kathode-Sp → GND) ===== -->",
   "to": "            <!-- ===== KABEL (nach dem Breadboard gezeichnet, Enden sichtbar) ===== -->\n            <line x1=\"100\" y1=\"118\" x2=\"100\" y2=\"240\" stroke=\"#E74C3C\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"100\" cy=\"240\" r=\"3.5\" fill=\"#E74C3C\" stroke=\"#800\" stroke-width=\"0.8\"/>\n            <line x1=\"180\" y1=\"118\" x2=\"180\" y2=\"240\" stroke=\"#E67E22\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"180\" cy=\"240\" r=\"3.5\" fill=\"#E67E22\" stroke=\"#933\" stroke-width=\"0.8\"/>\n            <line x1=\"260\" y1=\"118\" x2=\"260\" y2=\"240\" stroke=\"#F1C40F\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"260\" cy=\"240\" r=\"3.5\" fill=\"#F1C40F\" stroke=\"#770\" stroke-width=\"0.8\"/>\n            <line x1=\"340\" y1=\"118\" x2=\"340\" y2=\"240\" stroke=\"#2ECC71\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"340\" cy=\"240\" r=\"3.5\" fill=\"#2ECC71\" stroke=\"#040\" stroke-width=\"0.8\"/>\n            <line x1=\"420\" y1=\"118\" x2=\"420\" y2=\"240\" stroke=\"#3498db\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"420\" cy=\"240\" r=\"3.5\" fill=\"#3498db\" stroke=\"#005\" stroke-width=\"0.8\"/>\n            <!-- GND → obere -Schiene -->\n            <line x1=\"540\" y1=\"118\" x2=\"540\" y2=\"210\" stroke=\"#333\" stroke-width=\"2.8\" stroke-linecap=\"round\"/>\n            <circle cx=\"540\" cy=\"210\" r=\"3.5\" fill=\"#333\"/>\n\n            <!-- ===== BAUTEILE (5 LED-Kreise: Pin-Sp → 220Ω horizontal → LED-Anode-Sp → LED-Kathode-Sp → GND) ===== -->"
  },
  {
   "slug": "leds-ansteuern",
   "from": "Das <strong>kurze Beinchen</strong> der LED verbindest du mit der <strong>GND-Leiste</strong> auf dem Breadboard (blaue Linie).",
   "to": "Das <strong>kurze Beinchen</strong> der LED verbindest du mit der <strong>GND-Schiene (−)</strong> auf dem Steckbrett (blaue Linie). Verbinde die GND-Schiene mit einem schwarzen Kabel mit einem <strong>GND-Pin</strong> am Arduino – sonst fehlt dem Strom der Rückweg."
  },
  {
   "slug": "leds-ansteuern",
   "from": "Stecke die LED senkrecht in das Steckbrett, <strong>ueber die Mittelluecke</strong>: der <strong>lange Anschluss</strong> (Anode, +) in Loch <code>f12</code>, der <strong>kurze Anschluss</strong> (Kathode, &minus;) genau gegenueber in <code>e12</code>.",
   "to": "Stecke die LED waagrecht in die obere Hälfte des Steckbretts: das <strong>lange Bein</strong> (Anode, +) in Loch <code>a4</code>, das <strong>kurze Bein</strong> (Kathode, &minus;) in <code>a5</code>. <em>Buchstaben sind die Reihen, Zahlen die Spalten.</em>"
  },
  {
   "slug": "leds-ansteuern",
   "from": "Stecke den 220&nbsp;&Omega;-Widerstand <strong>waagrecht</strong> in das Steckbrett: ein Bein in <code>g12</code> (gleiche Reihe wie die LED-Anode), das andere Bein 3 Reihen weiter in <code>g15</code>.",
   "to": "Stecke den 220&nbsp;&Omega;-Widerstand von <code>c3</code> nach <code>c4</code>. Über Spalte 4 ist er jetzt mit dem langen LED-Bein verbunden &ndash; die fünf Löcher einer Spalte (a bis e) hängen innen zusammen."
  },
  {
   "slug": "leds-ansteuern",
   "from": "Verbinde mit einem <strong>roten Jumper-Kabel</strong> <strong>Pin 8</strong> des Arduino mit Loch <code>h15</code>. <em>(Dadurch fliesst der Strom von Pin&nbsp;8 ueber den Widerstand zur LED.)</em>",
   "to": "Verbinde mit einem <strong>gelben Jumper-Kabel</strong> <strong>Pin 8</strong> des Arduino mit Loch <code>e3</code>. <em>(So fließt der Strom von Pin&nbsp;8 über den Widerstand zur LED.)</em>"
  },
  {
   "slug": "leds-ansteuern",
   "from": "Verbinde mit einem <strong>schwarzen Jumper-Kabel</strong> Loch <code>d12</code> (gleiche Reihe wie die LED-Kathode) mit einem <strong>GND-Pin</strong> des Arduino. <em>Tipp: GND gibt es mehrmals &mdash; im Schaltbild nutzen wir den <strong>GND auf der Digital-Pin-Reihe</strong> (links neben AREF).</em>",
   "to": "Verbinde mit einem <strong>schwarzen Jumper-Kabel</strong> Loch <code>b5</code> (Spalte der LED-Kathode) mit der oberen <strong>&minus;Schiene</strong> (blau). Verbinde außerdem einen <strong>GND-Pin</strong> des Arduino mit derselben &minus;Schiene. <em>Tipp: GND gibt es mehrmals &ndash; auf der Digital-Pin-Reihe sitzt einer zwischen AREF und Pin&nbsp;13.</em>"
  },
  {
   "slug": "leds-ansteuern",
   "path": [
    "praxis",
    "bauteile",
    4,
    "anzahl"
   ],
   "old": 2,
   "value": 3
  },
  {
   "slug": "leds-ansteuern",
   "from": "lektion-05-led-pin8-aufbau.svg?v=8",
   "to": "lektion-05-led-pin8-aufbau.svg?v=9"
  },
  {
   "slug": "leds-ansteuern",
   "from": "<strong>pinMode() vergessen:</strong> LED bleibt dunkel, kein Strom am Ausgang.",
   "to": "<strong>pinMode() vergessen:</strong> LED bleibt dunkel oder glimmt nur ganz schwach &ndash; der Pin liefert dann kaum Strom."
  },
  {
   "slug": "leds-ansteuern",
   "from": "Vergiss <code>pinMode()</code> im setup() nicht — sonst leuchtet nichts.",
   "to": "Vergiss <code>pinMode()</code> im setup() nicht — sonst bleibt die LED dunkel oder glimmt nur schwach."
  },
  {
   "slug": "leds-ansteuern",
   "from": "So musst du bei einer Aenderung nur eine Stelle anpassen!\n        </div>",
   "to": "So musst du bei einer Aenderung nur eine Stelle anpassen!\n        </div>\n\n        <div class=\"warning-box\">\n          <strong>Klappt nicht? So findest du den Fehler</strong>\n          <ul style=\"margin-top:0.5rem; margin-left:1.25rem;\">\n            <li><strong>LED bleibt dunkel:</strong> Ist sie richtig herum? Das lange Bein zeigt Richtung Widerstand/Pin, das kurze Richtung GND. Umdrehen schadet ihr nicht.</li>\n            <li><strong>Gar nichts passiert:</strong> Ist die GND-Schiene mit einem GND-Pin am Arduino verbunden? Ohne Rückweg ist der Stromkreis offen.</li>\n            <li><strong>LED glimmt nur ganz schwach:</strong> <code>pinMode(8, OUTPUT);</code> im <code>setup()</code> vergessen.</li>\n            <li><strong>Immer noch dunkel:</strong> Steckt das Kabel wirklich in dem Pin, der im Code steht (Pin 8 und nicht Pin 7)?</li>\n          </ul>\n        </div>"
  },
  {
   "slug": "wechselblinker",
   "from": "Im Unterricht lieber bei 200ms oder mehr bleiben.\n        </div>",
   "to": "Im Unterricht lieber bei 200ms oder mehr bleiben.\n        </div>\n\n        <div class=\"warning-box\">\n          <strong>Klappt nicht? So findest du den Fehler</strong>\n          <ul style=\"margin-top:0.5rem; margin-left:1.25rem;\">\n            <li><strong>Beide LEDs blinken gleichzeitig statt abwechselnd:</strong> Stecken beide an demselben Pin? Oder stehen im Code in einem Schritt beide auf HIGH?</li>\n            <li><strong>Eine LED bleibt dunkel:</strong> Polung dieser LED prüfen (langes Bein Richtung Widerstand). Hat sie ihren eigenen 220-&Omega;-Widerstand?</li>\n            <li><strong>Beide leuchten schwach und dauerhaft:</strong> Zwischen den beiden Schritten fehlt ein <code>delay()</code> &ndash; der Wechsel ist dann zu schnell fürs Auge.</li>\n          </ul>\n        </div>"
  },
  {
   "slug": "led-lauflicht",
   "from": "<h3>Die Schaltung: 5 LEDs in Reihe</h3>",
   "to": "<h3>Die Schaltung: 5 LEDs nebeneinander, jede an ihrem eigenen Pin</h3>"
  },
  {
   "slug": "led-lauflicht",
   "from": "Stecke <strong>5 LEDs</strong> in einer Reihe ins Breadboard.",
   "to": "Stecke <strong>5 LEDs</strong> nebeneinander ins Steckbrett."
  },
  {
   "slug": "led-lauflicht",
   "from": "Genau diesen Ablauf schreibt spaeter die for-Schleife in einer einzigen Zeile.</p>\n        </div>",
   "to": "Genau diesen Ablauf schreibt spaeter die for-Schleife in einer einzigen Zeile.</p>\n        </div>\n\n        <div class=\"warning-box\">\n          <strong>Klappt nicht? So findest du den Fehler</strong>\n          <ul style=\"margin-top:0.5rem; margin-left:1.25rem;\">\n            <li><strong>Mehrere LEDs leuchten gleichzeitig:</strong> Bei einer LED fehlt das <code>digitalWrite(..., LOW)</code> nach ihrer Leuchtzeit.</li>\n            <li><strong>Eine LED bleibt dunkel, das Lauflicht hat eine Lücke:</strong> Für diesen Pin fehlt <code>pinMode(..., OUTPUT)</code> &ndash; oder die LED steckt falsch herum.</li>\n            <li><strong>Das Licht springt durcheinander:</strong> Die Kabel an Pin 8 bis 12 stecken nicht in derselben Reihenfolge wie die LEDs auf dem Steckbrett.</li>\n          </ul>\n        </div>"
  },
  {
   "slug": "taster-als-eingabe",
   "from": "Stecke den Taster ueber den <strong>Mittelsteg</strong> des Breadboards. Er hat vier Beinchen &ndash; je zwei sind intern verbunden.",
   "to": "Stecke den Taster über die <strong>Mittelrinne</strong> des Steckbretts. Er hat vier Beinchen &ndash; je zwei sind innen fest verbunden. Welche das sind, sieht man von außen nicht."
  },
  {
   "slug": "taster-als-eingabe",
   "from": "Verbinde das gegenueberliegende Beinchen mit <strong>GND</strong> (schwarzes Kabel). Das war&rsquo;s an Verkabelung!",
   "to": "Verbinde das <strong>diagonal</strong> gegenüberliegende Beinchen mit <strong>GND</strong> (schwarzes Kabel), wie im Bild (Spalte 8 oben, Spalte 10 unten). Diagonal klappt immer, egal wie der Taster gedreht ist. Das war&rsquo;s an Verkabelung!"
  },
  {
   "slug": "taster-als-eingabe",
   "from": "Nur 2 Kabel – so einfach!</text>\n          </svg>",
   "to": "Nur 2 Kabel – so einfach!</text>\n          </svg>\n\n          <figure style=\"margin:1.25rem 0;\">\n            <figcaption style=\"font-weight:bold;margin-bottom:0.4rem;\">Schaltplan: Taster an Pin 7 mit INPUT_PULLUP</figcaption>\n            <svg viewBox=\"0 0 420 262\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Schaltplan: Taster an Pin 7 mit INPUT_PULLUP\" style=\"width:100%;max-width:420px;height:auto;background:#fafafa;border:1px solid #ddd;border-radius:8px;font-family:system-ui,sans-serif;\">\n\n              <rect x=\"20\" y=\"20\" width=\"150\" height=\"190\" rx=\"10\" fill=\"#E8F1FA\" stroke=\"#0068B5\" stroke-width=\"2\"/>\n              <text x=\"95\" y=\"40\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#0068B5\">Arduino</text>\n              <rect x=\"28\" y=\"50\" width=\"134\" height=\"100\" rx=\"6\" fill=\"none\" stroke=\"#888\" stroke-dasharray=\"4,3\"/>\n              <text x=\"95\" y=\"65\" text-anchor=\"middle\" font-size=\"9\" fill=\"#555\">eingebaut (INPUT_PULLUP)</text>\n              <text x=\"70\" y=\"88\" text-anchor=\"middle\" font-size=\"11\" fill=\"#c0392b\" font-weight=\"bold\">5 V</text>\n              <line x1=\"70\" y1=\"92\" x2=\"70\" y2=\"98\" stroke=\"#333\" stroke-width=\"2\"/>\n              <rect x=\"63\" y=\"98\" width=\"14\" height=\"32\" fill=\"#fff\" stroke=\"#E67E22\" stroke-width=\"2\"/>\n              <text x=\"84\" y=\"118\" font-size=\"9\" fill=\"#555\">Pull-up</text>\n              <line x1=\"70\" y1=\"130\" x2=\"70\" y2=\"170\" stroke=\"#333\" stroke-width=\"2\"/>\n              <circle cx=\"70\" cy=\"170\" r=\"3\" fill=\"#333\"/>\n              <line x1=\"70\" y1=\"170\" x2=\"170\" y2=\"170\" stroke=\"#333\" stroke-width=\"2\"/>\n              <text x=\"160\" y=\"164\" text-anchor=\"end\" font-size=\"11\" font-weight=\"bold\" fill=\"#333\">Pin 7</text>\n              <text x=\"160\" y=\"200\" text-anchor=\"end\" font-size=\"11\" font-weight=\"bold\" fill=\"#333\">GND</text>\n              <line x1=\"170\" y1=\"170\" x2=\"250\" y2=\"170\" stroke=\"#333\" stroke-width=\"2\"/>\n              <circle cx=\"254\" cy=\"170\" r=\"3\" fill=\"#333\"/>\n              <line x1=\"254\" y1=\"170\" x2=\"296\" y2=\"154\" stroke=\"#333\" stroke-width=\"2\"/>\n              <line x1=\"276\" y1=\"162\" x2=\"276\" y2=\"140\" stroke=\"#333\" stroke-width=\"1.5\" stroke-dasharray=\"3,2\"/>\n              <line x1=\"268\" y1=\"140\" x2=\"284\" y2=\"140\" stroke=\"#333\" stroke-width=\"2.5\"/>\n              <circle cx=\"300\" cy=\"170\" r=\"3\" fill=\"#333\"/>\n              <text x=\"277\" y=\"128\" text-anchor=\"middle\" font-size=\"11\" fill=\"#222\" font-weight=\"bold\">Taster (Schließer)</text>\n              <line x1=\"300\" y1=\"170\" x2=\"360\" y2=\"170\" stroke=\"#333\" stroke-width=\"2\"/>\n              <line x1=\"360\" y1=\"170\" x2=\"360\" y2=\"196\" stroke=\"#333\" stroke-width=\"2\"/>\n              <line x1=\"360\" y1=\"196\" x2=\"170\" y2=\"196\" stroke=\"#333\" stroke-width=\"2\"/>\n              <text x=\"230\" y=\"230\" text-anchor=\"middle\" font-size=\"11\" fill=\"#333\">Nicht gedrückt: Pull-up zieht Pin 7 auf 5 V → HIGH (1)</text>\n              <text x=\"230\" y=\"248\" text-anchor=\"middle\" font-size=\"11\" fill=\"#333\">Gedrückt: Pin 7 direkt mit GND verbunden → LOW (0)</text>\n            </svg>\n          </figure>\n          <p><strong>Schließer</strong> heißt: Der Taster schließt den Stromkreis nur, solange du drückst. Den Pull-up-Widerstand musst du nicht stecken &ndash; er sitzt schon im Arduino und wird mit <code>INPUT_PULLUP</code> eingeschaltet.</p>"
  },
  {
   "slug": "taster-als-eingabe",
   "from": "Profis nutzen aufwaendigere Methoden, aber die brauchen wir erst spaeter.</p>\n        </div>",
   "to": "Profis nutzen aufwaendigere Methoden, aber die brauchen wir erst spaeter.</p>\n        </div>\n\n        <div class=\"warning-box\">\n          <strong>Klappt nicht? So findest du den Fehler</strong>\n          <ul style=\"margin-top:0.5rem; margin-left:1.25rem;\">\n            <li><strong>Monitor zeigt immer 0, auch ohne Drücken:</strong> Deine Kabel hängen an zwei Beinen, die im Taster fest verbunden sind. Stecke das GND-Kabel an das <strong>diagonal</strong> gegenüberliegende Bein.</li>\n            <li><strong>Immer 1, Drücken ändert nichts:</strong> Stecken beide Kabel wirklich in der Spalte eines Taster-Beins? Sitzt der Taster ganz im Steckbrett?</li>\n            <li><strong>Nichts oder Zeichensalat im Monitor:</strong> <code>Serial.begin(9600)</code> im Code und 9600 Baud im Serial Monitor müssen gleich sein.</li>\n            <li><strong>Der Wert springt zufällig zwischen 0 und 1:</strong> Im Code steht <code>INPUT</code> statt <code>INPUT_PULLUP</code> &ndash; der Pin „schwebt“.</li>\n          </ul>\n        </div>"
  },
  {
   "slug": "led-mit-taster-steuern",
   "from": "<code>if (zustand = LOW)</code> &rarr; <strong>Falsch!</strong> Setzt den Wert auf LOW (und die Bedingung ist immer \"wahr\").<br>",
   "to": "<code>if (zustand = LOW)</code> &rarr; <strong>Falsch!</strong> Das setzt zustand auf LOW (= 0). 0 zählt als „falsch“ &ndash; die Bedingung ist also <strong>nie</strong> erfüllt, die LED geht nie an.<br>"
  },
  {
   "slug": "led-mit-taster-steuern",
   "from": "<strong>Alltagsanalogie:</strong> Das ist wie ein normaler Lichtschalter: <em>\"Wenn Schalter an &rarr; Licht an. Wenn Schalter aus &rarr; Licht aus.\"</em>",
   "to": "<strong>Alltagsanalogie:</strong> Das ist wie eine Türklingel: <em>\"Solange du drückst &rarr; es klingelt. Lässt du los &rarr; Ruhe.\"</em>"
  },
  {
   "slug": "led-mit-taster-steuern",
   "from": "Das ist wie ein Lichtschalter – jedes Mal druecken wechselt den Zustand.</p>",
   "to": "Das ist wie ein Lichtschalter – jedes Mal druecken wechselt den Zustand.</p>\n          <ul style=\"margin-top:0.5rem;\">\n            <li><code>&amp;&amp;</code> heißt <strong>UND</strong>: Die Bedingung ist nur wahr, wenn <strong>beide</strong> Teile wahr sind. <code>gedrueckt &amp;&amp; !letzterDruck</code> bedeutet: Taster ist jetzt gedrückt UND war vorher nicht gedrückt.</li>\n            <li>Ein Vergleich wie <code>(digitalRead(7) == LOW)</code> ergibt selbst <code>true</code> oder <code>false</code>. Dieses Ergebnis kann man in einer bool-Variablen speichern: <code>bool gedrueckt = (digitalRead(7) == LOW);</code></li>\n            <li><code>digitalWrite()</code> versteht auch <code>true</code> (= HIGH) und <code>false</code> (= LOW). Darum funktioniert <code>digitalWrite(ledPin, ledAn);</code></li>\n          </ul>"
  },
  {
   "slug": "led-mit-taster-steuern",
   "from": "Was passiert, wenn du den <code>delay(50)</code> weglässt? Die LED flackert, weil der Taster prellt und mehrfach erkannt wird.",
   "to": "Was passiert, wenn du den <code>delay(50)</code> weglässt? Manchmal schaltet die LED bei einem Druck gar nicht um oder springt sofort zurück. Der Taster prellt und wird mehrfach erkannt."
  },
  {
   "slug": "led-mit-taster-steuern",
   "from": "digitalWrite(8,HIGH) → LED an</text>\n          </svg>\n        </div>",
   "to": "digitalWrite(8,HIGH) → LED an</text>\n          </svg>\n        </div>\n\n        <div class=\"warning-box\">\n          <strong>Klappt nicht? So findest du den Fehler</strong>\n          <ul style=\"margin-top:0.5rem; margin-left:1.25rem;\">\n            <li><strong>LED reagiert nie:</strong> Steht in der Bedingung nur ein <code>=</code>? Zum Vergleichen braucht man <code>==</code>.</li>\n            <li><strong>LED leuchtet genau dann, wenn du NICHT drückst:</strong> Bei INPUT_PULLUP ist gedrückt = LOW. Prüfe auf <code>LOW</code>, nicht auf <code>HIGH</code>.</li>\n            <li><strong>Toggle springt unkontrolliert:</strong> Das <code>delay(50)</code> zum Entprellen fehlt.</li>\n            <li><strong>Gar nichts passiert:</strong> Sind <code>tasterPin</code> (7) und <code>ledPin</code> (8) im Code vertauscht oder die Kabel falsch gesteckt?</li>\n          </ul>\n        </div>"
  },
  {
   "exercise": "554c0b41-9973-46e7-bbb3-d0251816bbca",
   "from": "(tausende Male pro Sekunde!)",
   "to": "(mit delay(50) etwa 20-mal pro Sekunde)"
  },
  {
   "exercise": "554c0b41-9973-46e7-bbb3-d0251816bbca",
   "from": "Die LED wuerde wild flackern, solange du den Taster haeltst.",
   "to": "Solange du den Taster haeltst, wuerde die LED staendig hin- und herschalten."
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "Basis fuer dein Pruefungsprojekt in Modul 4",
   "to": "Basis fuer dein Pruefungsprojekt in Modul 5 (Projekt)"
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "Basis fuer das <strong>Pruefungsprojekt in Modul 4</strong>",
   "to": "Basis fuer das <strong>Pruefungsprojekt in Modul 5 (Projekt)</strong>"
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "dein Prüfungsprojekt (Modul 4)!</text>\n          </svg>",
   "to": "dein Prüfungsprojekt (Modul 5)!</text>\n          </svg>\n\n          <figure style=\"margin:1.25rem 0;\">\n            <figcaption style=\"font-weight:bold;margin-bottom:0.4rem;\">Schaltplan: Ampel an Pin 2, 3 und 4</figcaption>\n            <svg viewBox=\"0 0 420 262\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Schaltplan: Ampel an Pin 2, 3 und 4\" style=\"width:100%;max-width:420px;height:auto;background:#fafafa;border:1px solid #ddd;border-radius:8px;font-family:system-ui,sans-serif;\">\n\n              <text x=\"20\" y=\"49\" font-size=\"12\" font-weight=\"bold\" fill=\"#333\">Pin 2</text>\n              <circle cx=\"70\" cy=\"45\" r=\"3\" fill=\"#333\"/>\n              <line x1=\"70\" y1=\"45\" x2=\"110\" y2=\"45\" stroke=\"#333\" stroke-width=\"2\"/>\n              <rect x=\"110\" y=\"36\" width=\"44\" height=\"18\" fill=\"#fff\" stroke=\"#E67E22\" stroke-width=\"2\"/>\n              <text x=\"132\" y=\"31\" text-anchor=\"middle\" font-size=\"10\" fill=\"#555\">220 Ω</text>\n              <line x1=\"154\" y1=\"45\" x2=\"210\" y2=\"45\" stroke=\"#333\" stroke-width=\"2\"/>\n              <polygon points=\"210,34 210,56 230,45\" fill=\"#fff\" stroke=\"#E74C3C\" stroke-width=\"2.5\"/>\n              <line x1=\"230\" y1=\"34\" x2=\"230\" y2=\"56\" stroke=\"#333\" stroke-width=\"2.5\"/>\n              <text x=\"220\" y=\"71\" text-anchor=\"middle\" font-size=\"10\" fill=\"#555\">LED rot</text>\n              <line x1=\"230\" y1=\"45\" x2=\"330\" y2=\"45\" stroke=\"#333\" stroke-width=\"2\"/>\n              <circle cx=\"330\" cy=\"45\" r=\"3\" fill=\"#333\"/>\n              <text x=\"20\" y=\"109\" font-size=\"12\" font-weight=\"bold\" fill=\"#333\">Pin 3</text>\n              <circle cx=\"70\" cy=\"105\" r=\"3\" fill=\"#333\"/>\n              <line x1=\"70\" y1=\"105\" x2=\"110\" y2=\"105\" stroke=\"#333\" stroke-width=\"2\"/>\n              <rect x=\"110\" y=\"96\" width=\"44\" height=\"18\" fill=\"#fff\" stroke=\"#E67E22\" stroke-width=\"2\"/>\n              <text x=\"132\" y=\"91\" text-anchor=\"middle\" font-size=\"10\" fill=\"#555\">220 Ω</text>\n              <line x1=\"154\" y1=\"105\" x2=\"210\" y2=\"105\" stroke=\"#333\" stroke-width=\"2\"/>\n              <polygon points=\"210,94 210,116 230,105\" fill=\"#fff\" stroke=\"#F1C40F\" stroke-width=\"2.5\"/>\n              <line x1=\"230\" y1=\"94\" x2=\"230\" y2=\"116\" stroke=\"#333\" stroke-width=\"2.5\"/>\n              <text x=\"220\" y=\"131\" text-anchor=\"middle\" font-size=\"10\" fill=\"#555\">LED gelb</text>\n              <line x1=\"230\" y1=\"105\" x2=\"330\" y2=\"105\" stroke=\"#333\" stroke-width=\"2\"/>\n              <circle cx=\"330\" cy=\"105\" r=\"3\" fill=\"#333\"/>\n              <text x=\"20\" y=\"169\" font-size=\"12\" font-weight=\"bold\" fill=\"#333\">Pin 4</text>\n              <circle cx=\"70\" cy=\"165\" r=\"3\" fill=\"#333\"/>\n              <line x1=\"70\" y1=\"165\" x2=\"110\" y2=\"165\" stroke=\"#333\" stroke-width=\"2\"/>\n              <rect x=\"110\" y=\"156\" width=\"44\" height=\"18\" fill=\"#fff\" stroke=\"#E67E22\" stroke-width=\"2\"/>\n              <text x=\"132\" y=\"151\" text-anchor=\"middle\" font-size=\"10\" fill=\"#555\">220 Ω</text>\n              <line x1=\"154\" y1=\"165\" x2=\"210\" y2=\"165\" stroke=\"#333\" stroke-width=\"2\"/>\n              <polygon points=\"210,154 210,176 230,165\" fill=\"#fff\" stroke=\"#27AE60\" stroke-width=\"2.5\"/>\n              <line x1=\"230\" y1=\"154\" x2=\"230\" y2=\"176\" stroke=\"#333\" stroke-width=\"2.5\"/>\n              <text x=\"220\" y=\"191\" text-anchor=\"middle\" font-size=\"10\" fill=\"#555\">LED grün</text>\n              <line x1=\"230\" y1=\"165\" x2=\"330\" y2=\"165\" stroke=\"#333\" stroke-width=\"2\"/>\n              <circle cx=\"330\" cy=\"165\" r=\"3\" fill=\"#333\"/>\n              <line x1=\"330\" y1=\"45\" x2=\"330\" y2=\"215\" stroke=\"#333\" stroke-width=\"2\"/>\n              <line x1=\"314\" y1=\"215\" x2=\"346\" y2=\"215\" stroke=\"#333\" stroke-width=\"2.5\"/>\n              <line x1=\"319\" y1=\"220\" x2=\"341\" y2=\"220\" stroke=\"#333\" stroke-width=\"2.5\"/>\n              <line x1=\"324\" y1=\"225\" x2=\"336\" y2=\"225\" stroke=\"#333\" stroke-width=\"2.5\"/>\n              <text x=\"356\" y=\"222\" font-size=\"12\" font-weight=\"bold\" fill=\"#333\">GND</text>\n              <text x=\"210\" y=\"250\" text-anchor=\"middle\" font-size=\"10\" fill=\"#333\">Drei gleiche Zweige: jede LED hat ihren eigenen Pin und Vorwiderstand.</text>\n            </svg>\n          </figure>"
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "Stecke die drei LEDs ins Breadboard: <strong>Rot</strong> oben, <strong>Gelb</strong> Mitte, <strong>Gruen</strong> unten &ndash; wie bei einer echten Ampel.",
   "to": "Stecke die drei LEDs nebeneinander ins Steckbrett: <strong>Rot</strong> links, <strong>Gelb</strong> in der Mitte, <strong>Grün</strong> rechts &ndash; wie im Bild."
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "Alle kurzen Beinchen kommen auf die <strong>GND-Leiste</strong> des Breadboards. Die GND-Leiste mit einem <strong>GND-Pin</strong> am Arduino verbinden.",
   "to": "Alle kurzen Beinchen kommen auf die <strong>GND-Schiene (−)</strong> des Steckbretts. Die GND-Schiene mit einem <strong>GND-Pin</strong> am Arduino verbinden."
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "<div class=\"tip-box\">\n            <strong>Vorteil:</strong>",
   "to": "<p><strong>So kommen die Werte in die Funktion:</strong> Beim Aufruf <code>ampelSchalten(true, true, false, 1000);</code> werden die Werte der Reihe nach eingesetzt: <code>rot = true</code>, <code>gelb = true</code>, <code>gruen = false</code>, <code>dauer = 1000</code>. Die Platzhalter in der Klammer der Funktion heißen <strong>Parameter</strong>. Und <code>digitalWrite()</code> versteht auch <code>true</code> (= HIGH) und <code>false</code> (= LOW).</p>\n\n          <div class=\"tip-box\">\n            <strong>Vorteil:</strong>"
  },
  {
   "slug": "einfache-ampelschaltung",
   "from": "musst du nur die Funktion <code>ampelSchalten()</code> anpassen &ndash; nicht vier Stellen im Code!\n          </div>\n        </div>",
   "to": "musst du nur die Funktion <code>ampelSchalten()</code> anpassen &ndash; nicht vier Stellen im Code!\n          </div>\n        </div>\n\n        <div class=\"warning-box\">\n          <strong>Klappt nicht? So findest du den Fehler</strong>\n          <ul style=\"margin-top:0.5rem; margin-left:1.25rem;\">\n            <li><strong>Zwei Farben leuchten, wo nur eine soll:</strong> In dieser Phase wurde eine andere LED nicht mit <code>LOW</code> ausgeschaltet. (Nur bei Rot-Gelb sollen zwei leuchten.)</li>\n            <li><strong>Eine Phase blitzt nur kurz auf:</strong> <code>delay()</code> zählt in Millisekunden &ndash; 5 Sekunden sind <code>delay(5000)</code>, nicht <code>delay(5)</code>.</li>\n            <li><strong>Die Farben sind vertauscht:</strong> Pins im Code und Kabel passen nicht zusammen (Rot = Pin 2, Gelb = Pin 3, Grün = Pin 4).</li>\n            <li><strong>Eine Farbe bleibt immer dunkel:</strong> Diese LED steckt falsch herum.</li>\n          </ul>\n        </div>"
  },
  {
   "exercise": "fb957047-07cd-4782-9004-05eafadd2d0e",
   "payload": {
    "type": "multiple-choice",
    "correct": 1,
    "options": [
     "Rot → Gruen → Gelb → Rot",
     "Rot → Rot-Gelb → Gruen → Gelb → Rot",
     "Rot → Gelb → Gruen → Rot-Gelb → Rot",
     "Rot → Rot-Gelb → Gelb → Gruen → Rot"
    ],
    "question": "Die Ampel steht gerade auf Rot. In welcher Reihenfolge geht es weiter?",
    "explanation": "Die deutsche Ampelfolge ist: Rot (Halt) → Rot-Gelb (Achtung, gleich Gruen) → Gruen (Fahren) → Gelb (Achtung, gleich Rot). Die Rot-Gelb-Phase gibt es nur in wenigen Laendern!",
    "wrongExplanations": {
     "0": "Da fehlt die Rot-Gelb-Phase. In Deutschland kommt zwischen Rot und Gruen IMMER Rot-Gelb als Achtung-Signal. Direkt von Rot auf Gruen springen nur Ampeln im Ausland.",
     "2": "Falsche Reihenfolge: Rot-Gelb kommt VOR Gruen, nicht danach. Eselsbruecke: Rot-Gelb heisst \"gleich darfst du fahren\", nicht \"gleich musst du halten\".",
     "3": "Nach Rot-Gelb kommt sofort Gruen. Gelb allein kommt erst nach Gruen, als Warnung vor Rot."
    }
   }
  },
  {
   "solution": "leds-ansteuern",
   "field": "mistakes",
   "from": "• pinMode() im setup() vergessen: ohne OUTPUT liefert der Pin keinen Strom, die LED bleibt dunkel.",
   "to": "• pinMode() im setup() vergessen: ohne OUTPUT liefert der Pin kaum Strom, die LED bleibt dunkel oder glimmt nur ganz schwach (HIGH schaltet dann nur den internen Pull-up ein)."
  },
  {
   "solution": "led-mit-taster-steuern",
   "field": "mistakes",
   "from": "Bedingung ist quasi immer \"wahr\", LED reagiert falsch.",
   "to": "LOW ist 0, die Zuweisung liefert 0 = falsch: die Bedingung ist NIE erfüllt, die LED geht nie an."
  }
 ],
 "newExercises": []
};
