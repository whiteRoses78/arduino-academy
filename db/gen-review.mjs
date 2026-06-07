// Erzeugt ein lesbares Review-Markdown der Testfragen eines Moduls (fuer Marcos
// Freigabe) aus test-questions-data.mjs -- gleiche Quelle wie der DB-Insert, also
// zeigt das Review exakt das, was eingespielt wird.
//   node db/gen-review.mjs analog > docs/review-test-analog.md
import { TEST_QUESTIONS } from "./test-questions-data.mjs";

const modul = process.argv[2];
if (!modul) {
  console.error("Usage: node db/gen-review.mjs <modul>");
  process.exit(1);
}

const lektionen = Object.entries(TEST_QUESTIONS).filter(([k]) => k.startsWith(modul + "/"));
const gesamt = lektionen.reduce((s, [, qs]) => s + qs.length, 0);

const out = [];
out.push(`# Review Kompetenztest — Modul "${modul}"`);
out.push("");
out.push(`${lektionen.length} Lektionen, ${gesamt} Fragen. Richtige Antwort ist mit **✅** markiert.`);
out.push("");
out.push("> Insert in die Prod-DB = sofort live fuer Schueler. Erst nach Marcos Freigabe einspielen.");
out.push("");

for (const [key, qs] of lektionen) {
  const slug = key.split("/")[1];
  out.push(`## ${slug}  (${qs.length} Fragen)`);
  out.push("");
  qs.forEach((q, i) => {
    out.push(`**${i + 1}. ${q.question}**`);
    out.push("");
    q.options.forEach((o, j) => {
      const mark = j === q.correct ? " **✅**" : "";
      out.push(`- ${String.fromCharCode(65 + j)}) ${o}${mark}`);
    });
    out.push("");
    out.push(`_Erklaerung:_ ${q.explanation}`);
    out.push("");
  });
}

console.log(out.join("\n"));
