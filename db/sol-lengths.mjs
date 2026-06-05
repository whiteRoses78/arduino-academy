// Gibt je Lösung die Zeichenlängen der vier Felder aus (Soll-Werte).
// Dient als Transport-Kontrolle: Soll (hier) vs. Ist (DB-LENGTH()).
//   node db/sol-lengths.mjs [modul]
import { SOLUTIONS } from "./solutions-data.mjs";

const filter = process.argv[2];
const L = (v) => (v == null ? 0 : String(v).length);

let n = 0;
for (const [module, lessons] of Object.entries(SOLUTIONS)) {
  if (filter && module !== filter) continue;
  for (const [slug, s] of Object.entries(lessons)) {
    n++;
    console.log(
      `${module}/${slug}  sk=${L(s.sketch)} wi=${L(s.wiring)} mi=${L(s.mistakes)} di=${L(s.didactics)}`,
    );
  }
}
console.error(`-- ${n} Lösungen`);
