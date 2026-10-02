// =========================================================================
// content-patch.mjs — gezielte Inhalts-Korrekturen in Supabase (ohne Re-Seed).
//
// Die Vanilla-Quelle existiert lokal nicht mehr -> die DB ist die Quelle der
// Wahrheit. Korrekturen laufen als exakte Text-Ersetzungen (wie CONTENT_PATCHES
// in seed.mjs), damit nur die geänderten Stellen bewegt werden und der
// Schülerfortschritt (user_progress hängt an exercise-IDs) erhalten bleibt.
//
// Ablauf:
//   1. Export der öffentlichen Inhalte (lessons.json, exercises.json) in <dir>
//   2. node db/content-patch.mjs db/patches/m1.mjs <dir> > m1.sql
//      -> prüft: jede Ersetzung kommt im Export GENAU EINMAL vor,
//         schreibt <dir>/expected.json (erwarteter Endzustand)
//   3. m1.sql via Supabase-MCP execute_sql einspielen (bricht komplett ab,
//      wenn eine Ersetzung in der DB nicht genau einmal trifft)
//   4. frischen Export nach <dir2> ziehen, dann:
//      node db/content-patch.mjs --verify <dir> <dir2>
//
// Patch-Datei: export default { module, text: [...], newExercises: [...] }
//   text-Eintrag (from/to = Klartext, NICHT JSON-escaped):
//     { slug, from, to }                    -> lessons.content
//     { slug, from, to, count: N }          -> wie oben, aber ALLE Vorkommen (genau N)
//     { slug, path: [...], old, value }     -> lessons.content: Einzelwert setzen
//     { slug, path: [...], add: value }     -> lessons.content: neuen Schlüssel anlegen
//                                             (bricht ab, wenn er schon existiert)
//     { exercise: "<uuid>", from, to }      -> exercises.payload (nur INNERHALB
//                                             eines Textwerts; jsonb formatiert
//                                             die Struktur anders als JSON.stringify)
//     { exercise: "<uuid>", payload }       -> payload komplett ersetzen
//     { solution: slug, field, from, to }   -> lesson_solutions.<field> (Text)
//   newExercises-Eintrag: { slug, position, type, payload }
// =========================================================================
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);

// Kanonische Form für den Vergleich (Schlüssel sortiert, wie jsonb es tut).
const canon = (v) =>
  Array.isArray(v)
    ? v.map(canon)
    : v && typeof v === "object"
      ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])]))
      : v;

if (args[0] === "--verify") {
  const [, expDir, freshDir] = args;
  const expected = JSON.parse(readFileSync(join(expDir, "expected.json"), "utf8"));
  const lessons = JSON.parse(readFileSync(join(freshDir, "lessons.json"), "utf8"));
  const exercises = JSON.parse(readFileSync(join(freshDir, "exercises.json"), "utf8"));
  let bad = 0;
  for (const [id, content] of Object.entries(expected.lessons)) {
    const got = lessons.find((l) => l.id === id);
    if (JSON.stringify(canon(got?.content)) !== JSON.stringify(canon(content))) {
      console.error(`ABWEICHUNG lesson ${got?.slug ?? id}`);
      bad++;
    }
  }
  for (const [id, payload] of Object.entries(expected.exercises)) {
    const got = exercises.find((e) => e.id === id);
    if (JSON.stringify(canon(got?.payload)) !== JSON.stringify(canon(payload))) {
      console.error(`ABWEICHUNG exercise ${id}`);
      bad++;
    }
  }
  for (const n of expected.newExercises) {
    const lesson = lessons.find((l) => l.module === expected.module && l.slug === n.slug);
    const got = exercises.find((e) => e.lesson_id === lesson?.id && e.position === n.position);
    if (!got || JSON.stringify(canon(got.payload)) !== JSON.stringify(canon(n.payload))) {
      console.error(`FEHLT/ABWEICHUNG neue Übung ${n.slug} #${n.position}`);
      bad++;
    }
  }
  console.log(bad ? `${bad} Abweichung(en)` : "OK: DB entspricht exakt dem erwarteten Stand");
  process.exit(bad ? 1 : 0);
}

const [patchFile, expDir] = args;
const patch = (await import(pathToFileURL(resolve(patchFile)).href)).default;
const lessons = JSON.parse(readFileSync(join(expDir, "lessons.json"), "utf8"));
const exercises = JSON.parse(readFileSync(join(expDir, "exercises.json"), "utf8"));

// Klartext -> so, wie er im JSON-Text (content::text) steht.
const jsonEsc = (s) => JSON.stringify(s).slice(1, -1);
const count = (hay, needle) => hay.split(needle).length - 1;

// Dollar-Quoting mit eindeutigem Tag, damit Inhalte nichts escapen müssen.
let tagNo = 0;
const dq = (s) => {
  let tag;
  do tag = `$q${++tagNo}$`;
  while (s.includes(tag));
  return `${tag}${s}${tag}`;
};

const texts = { lessons: {}, exercises: {} };
const errors = [];
const sql = ["begin;"];

patch.text.forEach((p, i) => {
  const label = `#${i + 1} ${p.slug ?? p.exercise ?? p.solution}`;
  if (p.solution) {
    const col = p.field;
    if (!["sketch", "wiring", "mistakes", "didactics"].includes(col)) {
      errors.push(`${label}: unbekanntes Feld ${col}`);
      return;
    }
    sql.push(`do $do$ declare f text := ${dq(p.from)}; t text := ${dq(p.to)}; begin
  update public.lesson_solutions s set ${col} = replace(${col}, f, t)
  from public.lessons l
  where l.id = s.lesson_id and l.module = '${patch.module}' and l.slug = '${p.solution}'
    and (length(${col}) - length(replace(${col}, f, ''))) = length(f);
  if not found then raise exception 'Patch ${label} trifft nicht genau einmal'; end if;
end $do$;`);
    return;
  }
  if (p.slug && p.path && "add" in p) {
    // Neuen Schlüssel anlegen (z. B. einen ganzen Praxis-Block), nur wenn er fehlt.
    const row = lessons.find((l) => l.module === patch.module && l.slug === p.slug);
    if (!row) return errors.push(`${label}: Zeile nicht gefunden`);
    const obj = JSON.parse(texts.lessons[row.id] ?? JSON.stringify(row.content));
    let cur = obj;
    for (const k of p.path.slice(0, -1)) cur = cur?.[k];
    const last = p.path.at(-1);
    if (!cur || typeof cur !== "object" || last in cur)
      return errors.push(`${label}: Pfad ${p.path.join(".")} existiert schon oder Eltern fehlen`);
    cur[last] = p.add;
    texts.lessons[row.id] = JSON.stringify(obj);
    const pg = `{${p.path.join(",")}}`;
    sql.push(`do $do$ begin
  update public.lessons set content = jsonb_set(content, '${pg}', ${dq(JSON.stringify(p.add))}::jsonb, true)
  where id = '${row.id}' and content #> '${pg}' is null;
  if not found then raise exception 'Patch ${label} (neu) trifft nicht'; end if;
end $do$;`);
    return;
  }
  if (p.slug && p.path) {
    // Einzelwert an einem Pfad setzen (z. B. Zahl in einer Liste), mit Prüfung des alten Werts.
    const row = lessons.find((l) => l.module === patch.module && l.slug === p.slug);
    if (!row) return errors.push(`${label}: Zeile nicht gefunden`);
    const obj = JSON.parse(texts.lessons[row.id] ?? JSON.stringify(row.content));
    let cur = obj;
    for (const k of p.path.slice(0, -1)) cur = cur?.[k];
    const last = p.path.at(-1);
    if (JSON.stringify(cur?.[last]) !== JSON.stringify(p.old))
      return errors.push(`${label}: Pfad ${p.path.join(".")} hat nicht den erwarteten alten Wert`);
    cur[last] = p.value;
    texts.lessons[row.id] = JSON.stringify(obj);
    const pg = `{${p.path.join(",")}}`;
    sql.push(`do $do$ begin
  update public.lessons set content = jsonb_set(content, '${pg}', ${dq(JSON.stringify(p.value))}::jsonb)
  where id = '${row.id}' and content #> '${pg}' = ${dq(JSON.stringify(p.old))}::jsonb;
  if not found then raise exception 'Patch ${label} (Pfad) trifft nicht'; end if;
end $do$;`);
    return;
  }
  if (p.exercise && p.payload) {
    // Struktur-Änderung (neues Paar, neue Reihenfolge): ganzes payload tauschen.
    const row = exercises.find((e) => e.id === p.exercise);
    if (!row) return errors.push(`${label}: Übung nicht gefunden`);
    if (texts.exercises[row.id]) return errors.push(`${label}: payload-Tausch und Text-Patch gemischt`);
    texts.exercises[row.id] = JSON.stringify(p.payload);
    sql.push(`update public.exercises set payload = ${dq(JSON.stringify(p.payload))}::jsonb where id = '${row.id}';`);
    return;
  }
  const isLesson = !!p.slug;
  const row = isLesson
    ? lessons.find((l) => l.module === patch.module && l.slug === p.slug)
    : exercises.find((e) => e.id === p.exercise);
  if (!row) return errors.push(`${label}: Zeile nicht gefunden`);
  const store = isLesson ? texts.lessons : texts.exercises;
  store[row.id] ??= JSON.stringify(isLesson ? row.content : row.payload);
  const from = jsonEsc(p.from);
  const to = jsonEsc(p.to);
  const want = p.count ?? 1;
  const n = count(store[row.id], from);
  if (n !== want) return errors.push(`${label}: "${p.from.slice(0, 60)}…" kommt ${n}x vor (erwartet ${want})`);
  store[row.id] = store[row.id].replaceAll(from, () => to);
  const [table, col, key] = isLesson
    ? ["lessons", "content", `id = '${row.id}'`]
    : ["exercises", "payload", `id = '${row.id}'`];
  sql.push(`do $do$ declare f text := ${dq(from)}; t text := ${dq(to)}; begin
  update public.${table} set ${col} = replace(${col}::text, f, t)::jsonb
  where ${key} and (length(${col}::text) - length(replace(${col}::text, f, ''))) = ${want} * length(f);
  if not found then raise exception 'Patch ${label} trifft nicht genau ${want}x'; end if;
end $do$;`);
});

for (const n of patch.newExercises ?? []) {
  const lesson = lessons.find((l) => l.module === patch.module && l.slug === n.slug);
  if (!lesson) {
    errors.push(`neue Übung: Lektion ${n.slug} fehlt`);
    continue;
  }
  if (exercises.some((e) => e.lesson_id === lesson.id && e.position === n.position)) {
    errors.push(`neue Übung: ${n.slug} Position ${n.position} ist schon belegt`);
    continue;
  }
  sql.push(`insert into public.exercises (lesson_id, position, type, payload)
values ('${lesson.id}', ${n.position}, ${dq(n.type)}, ${dq(JSON.stringify(n.payload))}::jsonb);`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
sql.push("commit;");

// Erwarteten Endzustand für --verify ablegen.
const expected = { module: patch.module, lessons: {}, exercises: {}, newExercises: patch.newExercises ?? [] };
for (const [id, t] of Object.entries(texts.lessons)) expected.lessons[id] = JSON.parse(t);
for (const [id, t] of Object.entries(texts.exercises)) expected.exercises[id] = JSON.parse(t);
writeFileSync(join(expDir, "expected.json"), JSON.stringify(expected));

console.log(sql.join("\n"));
console.error(`OK: ${patch.text.length} Ersetzungen, ${(patch.newExercises ?? []).length} neue Übungen`);
