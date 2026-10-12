// M5 Steckbrett-Bilder Lektion 1 und 3 (12.10.2026): Die kleine blaue Beschriftung "GND" neben der
// oberen −Schiene rutscht unter das GND-Kabel (vorher lief das Kabel quer durch die Schrift).
// Lektion 1: Bild steht zweimal im Inhalt (Erklärung + Kopie im Praxisteil) -> count: 2.
// Einspielen: siehe Kopf von db/content-patch.mjs.
const from = `<text x="696" y="247" font-size="7" fill="#00c" font-weight="bold">GND</text>`;
const to = `<text x="698" y="257" text-anchor="end" font-size="7" fill="#00c" font-weight="bold">GND</text>`;

export default {
  module: "projekt",
  text: [
    { slug: "ampel-mit-fussgaengerueberweg", from, to, count: 2 },
    { slug: "pruefungsschaltung-komplett", from, to },
  ],
  newExercises: [],
};
