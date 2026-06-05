// =========================================================================
// parts-data.mjs — Bauteildaten je praktischer Lektion (Spec 03).
//
// Quelle der Wahrheit fuer die parts-Spalte auf public.lessons. Von Marco
// inhaltlich geprueft (2026-06-05). Keys: module -> slug (exakt die DB-Slugs).
//
// Format pro Eintrag: { name, qty? }. qty optional -> "nach Bedarf"-Mengen
// (Jumper-Kabel) ohne qty. Reihenfolge = Anzeige-Reihenfolge.
//
// Von db/seed.mjs beim Lektions-Insert mitgeschrieben (re-seed-fest).
// =========================================================================

export const PARTS = {
  digital: {
    "leds-ansteuern": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "LED rot", qty: 1 },
      { name: "Widerstand 220 Ω", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "wechselblinker": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "LED grün", qty: 1 },
      { name: "LED rot", qty: 1 },
      { name: "Widerstand 220 Ω", qty: 2 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "led-lauflicht": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "LED verschiedene Farben (rot, orange, gelb, grün, blau)", qty: 5 },
      { name: "Widerstand 220 Ω", qty: 5 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "taster-als-eingabe": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "Taster", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "led-mit-taster-steuern": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "LED rot", qty: 1 },
      { name: "Widerstand 220 Ω", qty: 1 },
      { name: "Taster", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "einfache-ampelschaltung": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "LED rot", qty: 1 },
      { name: "LED gelb", qty: 1 },
      { name: "LED grün", qty: 1 },
      { name: "Widerstand 220 Ω", qty: 3 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
  },
  analog: {
    "spannungsteiler-verstehen": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "Widerstand 10 kΩ", qty: 2 },
      { name: "Widerstand 20 kΩ", qty: 1 },
      { name: "Multimeter", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "analoge-eingaenge": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "Potentiometer 10 kΩ", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "pwm-dimmen-statt-schalten": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "Potentiometer 10 kΩ", qty: 1 },
      { name: "LED", qty: 1 },
      { name: "Widerstand 220 Ω", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "lichtsensor-ldr": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "Fotowiderstand (LDR)", qty: 1 },
      { name: "Widerstand 10 kΩ", qty: 1 },
      { name: "LED", qty: 1 },
      { name: "Widerstand 220 Ω", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "ntc-temperatursensor": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "NTC-Widerstand 10 kΩ", qty: 1 },
      { name: "Widerstand 10 kΩ", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "entscheidungen-mit-sensorwerten": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "Fotowiderstand (LDR)", qty: 1 },
      { name: "Widerstand 10 kΩ", qty: 1 },
      { name: "LED", qty: 1 },
      { name: "Widerstand 220 Ω", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
  },
  aktoren: {
    "servomotor-ansteuern": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "Servomotor SG90", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "transistor-als-schalter-grundlagen": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "DC-Motor (3–6 V)", qty: 1 },
      { name: "NPN-Transistor BC547", qty: 1 },
      { name: "Widerstand 1 kΩ", qty: 1 },
      { name: "Freilaufdiode (1N4148/1N4007)", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "dc-motor-mit-l298n": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Motortreiber L298N", qty: 1 },
      { name: "DC-Motor", qty: 1 },
      { name: "Externe Stromversorgung 6–12 V (Batterie/Netzteil)", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
  },
  projekt: {
    "ampel-mit-fussgaengerueberweg": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "LED Auto-Ampel (rot, gelb, grün)", qty: 3 },
      { name: "LED Fußgänger (rot, grün)", qty: 2 },
      { name: "Widerstand 220 Ω", qty: 5 },
      { name: "Taster", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "nachtabschaltung-mit-lichtsensor": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "LED Auto-Ampel (rot, gelb, grün)", qty: 3 },
      { name: "LED Fußgänger (rot, grün)", qty: 2 },
      { name: "Widerstand 220 Ω", qty: 5 },
      { name: "Taster", qty: 1 },
      { name: "Fotowiderstand (LDR)", qty: 1 },
      { name: "Widerstand 10 kΩ", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
    "pruefungsschaltung-komplett": [
      { name: "Arduino Uno", qty: 1 },
      { name: "Steckbrett", qty: 1 },
      { name: "LED Auto-Ampel (rot, gelb, grün)", qty: 3 },
      { name: "LED Fußgänger (rot, grün)", qty: 2 },
      { name: "Widerstand 220 Ω", qty: 5 },
      { name: "Taster", qty: 1 },
      { name: "Fotowiderstand (LDR)", qty: 1 },
      { name: "Widerstand 10 kΩ", qty: 1 },
      { name: "Jumper-Kabel nach Bedarf" },
    ],
  },
};
