// M5 Steckbrett-Bilder (12.10.2026): Beschriftungen entzerrt.
//   - "TASTER" steht eine Zeile über "LDR-SENSOR" (vorher stießen beide aneinander).
//   - "GND" am rechten Kabel steht senkrecht links neben dem Kabel (vorher am Bildrand angeschnitten).
// Lektion 1 und 2: Das Bild steht zweimal im Inhalt (Erklärung + Kopie im Praxisteil) -> count: 2.
// Einspielen: siehe Kopf von db/content-patch.mjs.
const gndFrom = `<text x="712" y="355" text-anchor="middle" font-size="7" fill="#333" font-style="italic" font-weight="bold">GND</text>`;
const gndTo = `<text x="708" y="355" text-anchor="middle" font-size="7" fill="#333" font-style="italic" font-weight="bold" transform="rotate(-90 708 355)">GND</text>`;

export default {
  module: "projekt",
  text: [
    { slug: "ampel-mit-fussgaengerueberweg", from: gndFrom, to: gndTo, count: 2 },
    { slug: "nachtabschaltung-mit-lichtsensor", from: gndFrom, to: gndTo, count: 2 },
    {
      slug: "nachtabschaltung-mit-lichtsensor",
      from: `<text x="588" y="178" text-anchor="middle" font-size="12" fill="#c60"`,
      to: `<text x="588" y="200" text-anchor="middle" font-size="12" fill="#c60"`,
      count: 2,
    },
    { slug: "pruefungsschaltung-komplett", from: gndFrom, to: gndTo },
    {
      slug: "pruefungsschaltung-komplett",
      from: `<text x="510" y="200" text-anchor="middle" font-size="12" fill="#44c"`,
      to: `<text x="510" y="178" text-anchor="middle" font-size="12" fill="#44c"`,
    },
  ],
  newExercises: [],
};
