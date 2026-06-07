// Generiert idempotentes Insert-SQL aus test-questions-data.mjs (DRY: gleiche
// Quelle fuer alle Befuellungen). Ausgabe nach stdout -> via Supabase MCP execute_sql.
// Pro Lektion: delete + insert (so bleibt es re-seed-fest / wiederholbar).
//   node db/gen-test-sql.mjs                 # alle Lektionen
//   node db/gen-test-sql.mjs grundlagen      # nur ein Modul
import { TEST_QUESTIONS } from "./test-questions-data.mjs";

const filter = process.argv[2]; // optional: nur dieses Modul befuellen

const esc = (v) => String(v).replaceAll("'", "''");

const blocks = [];
let total = 0;
for (const [key, questions] of Object.entries(TEST_QUESTIONS)) {
  const [module, slug] = key.split("/");
  if (filter && module !== filter) continue;

  const values = questions
    .map((q, i) => {
      const payload = JSON.stringify({
        type: q.type,
        correct: q.correct,
        options: q.options,
        question: q.question,
        explanation: q.explanation,
      });
      return `  (${i + 1},'${esc(q.type)}','${esc(payload)}')`;
    })
    .join(",\n");
  total += questions.length;

  blocks.push(`delete from public.test_questions where lesson_id =
  (select id from public.lessons where module='${esc(module)}' and slug='${esc(slug)}');
insert into public.test_questions (lesson_id, position, type, payload)
select l.id, v.position, v.type, v.payload::jsonb
from (values
${values}
) as v(position, type, payload)
join public.lessons l on l.module='${esc(module)}' and l.slug='${esc(slug)}';`);
}

console.log(blocks.join("\n\n"));
console.error(`-- ${blocks.length} Lektion(en), ${total} Fragen`);
