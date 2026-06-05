// =========================================================================
// seed.mjs — migriert ein Vanilla-Modul (LESSONS_*) nach Supabase.
//
// Aufruf:  node db/seed.mjs [modul]   (default: grundlagen)
//
// Schreibt DIREKT via @supabase/supabase-js (Daten gehen Node -> Supabase,
// nicht ueber den Agent-Kontext). Voraussetzung: temporaere anon-Insert-
// Policy ist aktiv (wird per MCP vor/nach dem Lauf gesetzt/entfernt), da
// die Inhalts-Tabellen sonst nur public-read sind.
//
// Faithful 1:1: lesson.content = {explanation, example, ...} (alles ausser
// id/title/exercises); jede Uebung -> exercises-Zeile (payload = ganzes
// Uebungsobjekt). Reihenfolge = Datei-Reihenfolge.
// =========================================================================

import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
// PostgREST-Client direkt (kein Realtime/WebSocket -> laeuft auch auf Node 20).
import { PostgrestClient } from "@supabase/postgrest-js";
// Bauteildaten je Lektion (Spec 03) -> re-seed-fest in die parts-Spalte.
import { PARTS } from "./parts-data.mjs";

const VANILLA_DIR = join(homedir(), "Desktop/Arduino-Lernprogramm/js");

const MODULES = {
  grundlagen: {
    file: "lessons-grundlagen.js",
    globalVar: "LESSONS_GRUNDLAGEN",
    title: "Grundlagen",
    description:
      "Einstieg in Arduino: Board, Strom/Spannung/Widerstand, IDE und das setup()/loop()-Prinzip.",
  },
  digital: {
    file: "lessons-digital.js",
    globalVar: "LESSONS_DIGITAL",
    title: "Digital",
    description:
      "Digitale Ein- und Ausgänge: LEDs ansteuern, Blink- und Lauflichter, Taster als Eingabe und eine erste Ampelschaltung.",
  },
  analog: {
    file: "lessons-analog.js",
    globalVar: "LESSONS_ANALOG",
    title: "Analog",
    description:
      "Analoge Signale und Sensoren: Spannungsteiler, analoge Eingänge, PWM zum Dimmen, Licht- und Temperatursensor, Entscheidungen mit Sensorwerten.",
  },
  aktoren: {
    file: "lessons-aktoren.js",
    globalVar: "LESSONS_AKTOREN",
    title: "Aktoren",
    description:
      "Dinge bewegen: Servomotor ansteuern, Transistor als Schalter und DC-Motor mit dem L298N-Treiber.",
  },
  projekt: {
    file: "lessons-projekt.js",
    globalVar: "LESSONS_PROJEKT",
    title: "Projekt",
    description:
      "Alles zusammengesetzt: Ampel mit Fußgängerüberweg, Nachtabschaltung mit Lichtsensor und die komplette Prüfungsschaltung.",
  },
};

const moduleKey = process.argv[2] ?? "grundlagen";
const cfg = MODULES[moduleKey];
if (!cfg) throw new Error(`Unbekanntes Modul: ${moduleKey}. Bekannt: ${Object.keys(MODULES).join(", ")}`);

// --- .env.local einlesen (ohne dotenv-Dependency) ---
const env = Object.fromEntries(
  readFileSync(join(import.meta.dirname, "..", ".env.local"), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trimStart().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error(".env.local: URL oder Publishable-Key fehlt");

const supabase = new PostgrestClient(`${url}/rest/v1`, {
  headers: { apikey: key, Authorization: `Bearer ${key}` },
});

// --- Vanilla-Daten laden (globale const -> via new Function einsammeln) ---
const code = readFileSync(join(VANILLA_DIR, cfg.file), "utf8");
const LESSONS = new Function(`${code}\nreturn ${cfg.globalVar};`)();
if (!Array.isArray(LESSONS) || LESSONS.length === 0) {
  throw new Error(`${cfg.globalVar} leer oder nicht ladbar`);
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/&/g, " und ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// --- Content-Patches: gezielte Korrekturen an der Vanilla-Quelle, die wir hier
// (statt im unangetasteten Original) anwenden. Exakte HTML-Substrings, damit
// Re-Seeds die Fixes mittragen. ---
const CONTENT_PATCHES = [
  // LED-Polung-SVG (Modul grundlagen): "Anode (+)" lag mittig auf dem langen
  // Bein (x=138) -> links daneben (x=120, rechtsbündig), analog zu "Kathode".
  {
    from: '<text x="138" y="130" text-anchor="middle" font-size="11" fill="#1e8449" font-weight="bold">Anode (+)</text>',
    to: '<text x="120" y="120" text-anchor="end" font-size="11" fill="#1e8449" font-weight="bold">Anode (+)</text>',
  },
];

function patchHtml(html) {
  let out = html;
  for (const p of CONTENT_PATCHES) out = out.split(p.from).join(p.to);
  return out;
}

// Wendet die Patches auf alle HTML-Felder eines content-Objekts an.
function patchContent(content) {
  if (content?.explanation?.html) {
    content.explanation.html = patchHtml(content.explanation.html);
  }
  if (Array.isArray(content?.example?.steps)) {
    content.example.steps = content.example.steps.map((s) => ({
      ...s,
      html: typeof s.html === "string" ? patchHtml(s.html) : s.html,
    }));
  }
  return content;
}

function die(label, error) {
  if (error) {
    console.error(`FEHLER (${label}):`, error.message ?? error);
    process.exit(1);
  }
}

// --- 1) Kurs anlegen ---
const { data: course, error: cErr } = await supabase
  .from("courses")
  .insert({ slug: moduleKey, title: cfg.title, description: cfg.description })
  .select("id")
  .single();
die("courses.insert", cErr);

// --- 2) Lektionen anlegen ---
const lessons = LESSONS.map((lesson, i) => {
  const { id, title, exercises, ...content } = lesson;
  return {
    row: {
      course_id: course.id,
      legacy_id: id,
      position: i + 1,
      module: moduleKey,
      slug: slugify(title),
      title,
      content: patchContent(content),
      parts: PARTS[moduleKey]?.[slugify(title)] ?? [],
      exam_relevant: false,
    },
    exercises: exercises ?? [],
  };
});

const { data: insertedLessons, error: lErr } = await supabase
  .from("lessons")
  .insert(lessons.map((l) => l.row))
  .select("id, legacy_id");
die("lessons.insert", lErr);

const idByLegacy = new Map(insertedLessons.map((l) => [l.legacy_id, l.id]));

// --- 3) Uebungen anlegen ---
const exerciseRows = [];
for (const l of lessons) {
  const lessonId = idByLegacy.get(l.row.legacy_id);
  l.exercises.forEach((ex, ei) => {
    exerciseRows.push({
      lesson_id: lessonId,
      position: ei + 1,
      type: ex.type,
      payload: ex,
    });
  });
}

const { error: eErr } = await supabase.from("exercises").insert(exerciseRows);
die("exercises.insert", eErr);

// --- Summary ---
const byType = exerciseRows.reduce((acc, e) => ((acc[e.type] = (acc[e.type] ?? 0) + 1), acc), {});
console.log(`OK: Modul "${moduleKey}" migriert.`);
console.log(`  Kurs:      ${course.id}`);
console.log(`  Lektionen: ${insertedLessons.length}`);
console.log(`  Uebungen:  ${exerciseRows.length}`, byType);
