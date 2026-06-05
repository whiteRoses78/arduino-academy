// Generiert EIN Upsert-Statement aus solutions-data.mjs (DRY: gleiche Quelle
// fuer alle Befuellungen). Ausgabe nach stdout -> via Supabase MCP execute_sql.
//   node db/gen-solutions-sql.mjs            # alle Module
//   node db/gen-solutions-sql.mjs digital    # nur ein Modul
import { SOLUTIONS } from "./solutions-data.mjs";

const filter = process.argv[2]; // optional: nur dieses Modul befuellen

const esc = (v) =>
  v == null || v === "" ? "null" : `'${String(v).replaceAll("'", "''")}'`;

const rows = [];
for (const [module, lessons] of Object.entries(SOLUTIONS)) {
  if (filter && module !== filter) continue;
  for (const [slug, s] of Object.entries(lessons)) {
    rows.push(
      `('${module}','${slug}',${esc(s.sketch)},${esc(s.wiring)},${esc(s.mistakes)},${esc(s.didactics)})`,
    );
  }
}

console.log(`insert into public.lesson_solutions (lesson_id, sketch, wiring, mistakes, didactics)
select l.id, v.sketch, v.wiring, v.mistakes, v.didactics
from (values
${rows.join(",\n")}
) as v(module, slug, sketch, wiring, mistakes, didactics)
join public.lessons l on l.module = v.module and l.slug = v.slug
on conflict (lesson_id) do update set
  sketch = excluded.sketch, wiring = excluded.wiring,
  mistakes = excluded.mistakes, didactics = excluded.didactics, updated_at = now();`);
console.error(`-- ${rows.length} Lösungen`);
