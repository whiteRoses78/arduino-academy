// =========================================================================
// export-ergebnisse.mjs — schreibt die Testergebnisse als CSV auf den Desktop.
//
// Aufruf:  node db/export-ergebnisse.mjs [zieldatei.csv]
//          (default: ~/Desktop/arduino-ergebnisse.csv)
//
// Aufbau = Matrix wie /lehrer/tests: eine Zeile pro Konto und Modul,
// eine Spalte je Lektion (L1..L6), Zelle = Prozent. Unten eine Legende,
// welche Lektion hinter L1..L6 steckt, und die Konten ohne jeden Versuch.
//
// Login laeuft mit einem Lehrer- oder Admin-Konto; Credentials aus .env.local
// (gitignored, nie committen) — dieselben Variablen wie beim Upload-Script:
//   MATERIAL_ADMIN_EMAIL=...
//   MATERIAL_ADMIN_PASSWORD=...
// Pures fetch gegen Auth- und REST-API, keine Dependencies. Reines Lesen:
// das Script schreibt NICHTS in die Datenbank.
// =========================================================================

import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const outPath = process.argv[2] ?? join(homedir(), "Desktop", "arduino-ergebnisse.csv");

// Reihenfolge der Module wie in der App (didaktisch, nicht alphabetisch).
const MODULE_ORDER = ["grundlagen", "digital", "analog", "aktoren", "projekt"];

// Klassen-Zuordnung ueber die Kontonummer — Spiegel von src/lib/klassen.ts.
// Bei neuen Klassen dort UND hier erweitern.
function klasse(email) {
  const m = /^arduino(\d{2})@klasse\.de$/.exec(email.toLowerCase());
  if (!m) return "Weitere";
  const n = Number(m[1]);
  if (n >= 1 && n <= 20) return "Klasse 1";
  if (n >= 21 && n <= 30) return "Klasse 2";
  return "Weitere";
}

// --- .env.local einlesen (ohne dotenv-Dependency, wie seed.mjs) ---
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
const email = env.MATERIAL_ADMIN_EMAIL;
const password = env.MATERIAL_ADMIN_PASSWORD;
if (!url || !key) throw new Error(".env.local: URL oder Publishable-Key fehlt");
if (!email || !password) {
  throw new Error(
    ".env.local: MATERIAL_ADMIN_EMAIL / MATERIAL_ADMIN_PASSWORD fehlen (Lehrer- oder Admin-Konto)",
  );
}

// --- 1) Einloggen -> User-JWT (die RPC prueft die Rolle teacher/admin) ---
const loginRes = await fetch(`${url}/auth/v1/token?grant_type=password`, {
  method: "POST",
  headers: { apikey: key, "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
if (!loginRes.ok) throw new Error(`Login fehlgeschlagen: ${await loginRes.text()}`);
const { access_token } = await loginRes.json();
const auth = { apikey: key, Authorization: `Bearer ${access_token}` };

// --- 2) Lektionen holen (public-read) = die Spalten, auch ungetestete ---
const lessonsRes = await fetch(
  `${url}/rest/v1/lessons?select=module,slug,title,position&order=position`,
  { headers: auth },
);
if (!lessonsRes.ok) throw new Error(`Lektionen: ${await lessonsRes.text()}`);
const lessons = await lessonsRes.json();

// --- 3) Ergebnisse holen (RPC, nur teacher/admin) ---
const resultsRes = await fetch(`${url}/rest/v1/rpc/list_all_test_results`, {
  method: "POST",
  headers: { ...auth, "Content-Type": "application/json" },
  body: "{}",
});
if (!resultsRes.ok) throw new Error(`Ergebnisse: ${await resultsRes.text()}`);
const rows = await resultsRes.json();

// --- 4) Matrix aufbauen ---
// Spalten je Modul: nach position sortiert -> L1, L2, ...
const spalten = new Map(); // modul -> [{slug,title}]
for (const m of MODULE_ORDER) {
  spalten.set(
    m,
    lessons
      .filter((l) => l.module === m)
      .sort((a, b) => a.position - b.position)
      .map((l) => ({ slug: l.slug, title: l.title })),
  );
}
const maxSpalten = Math.max(...[...spalten.values()].map((s) => s.length));

// Versuche eintragen: konto -> modul -> slug -> prozent
const werte = new Map();
const konten = new Set();
for (const r of rows) {
  konten.add(r.email);
  if (!r.lesson_slug) continue; // Konto ohne jeden Versuch
  if (!werte.has(r.email)) werte.set(r.email, new Map());
  const proModul = werte.get(r.email);
  if (!proModul.has(r.module)) proModul.set(r.module, new Map());
  proModul.get(r.module).set(r.lesson_slug, r.percent);
}

// --- 5) CSV schreiben (Semikolon + BOM = Excel/Numbers auf Deutsch) ---
const zeilen = [];
const kopf = ["Konto", "Klasse", "Modul"];
for (let i = 1; i <= maxSpalten; i++) kopf.push(`L${i}`);
kopf.push("Schnitt");
zeilen.push(kopf.join(";"));

const sortiert = [...konten].sort();
for (const konto of sortiert) {
  const proModul = werte.get(konto);
  if (!proModul) continue; // ohne Versuch -> steht unten in der Fussnote
  for (const modul of MODULE_ORDER) {
    const treffer = proModul.get(modul);
    if (!treffer) continue; // in diesem Modul nichts gemacht -> keine Leerzeile
    const zelle = spalten
      .get(modul)
      .map((l) => (treffer.has(l.slug) ? String(treffer.get(l.slug)) : "-"));
    const vorhanden = [...treffer.values()];
    const schnitt = Math.round(vorhanden.reduce((a, b) => a + b, 0) / vorhanden.length);
    // Module mit weniger Lektionen: restliche Spalten leer lassen
    while (zelle.length < maxSpalten) zelle.push("");
    zeilen.push([konto, klasse(konto), modul, ...zelle, String(schnitt)].join(";"));
  }
}

// Legende: welche Lektion ist L1, L2, ...
zeilen.push("");
zeilen.push("Legende: welche Lektion steckt hinter L1, L2, ...");
zeilen.push(["Modul", ...Array.from({ length: maxSpalten }, (_, i) => `L${i + 1}`)].join(";"));
for (const modul of MODULE_ORDER) {
  const titel = spalten.get(modul).map((l) => l.title.replaceAll(";", ","));
  while (titel.length < maxSpalten) titel.push("");
  zeilen.push([modul, ...titel].join(";"));
}

// Konten ohne jeden Versuch
const ohne = sortiert.filter((k) => !werte.has(k));
zeilen.push("");
zeilen.push(
  ohne.length ? `Noch kein Versuch (${ohne.length}): ${ohne.join(", ")}` : "Alle Konten haben mindestens einen Versuch.",
);

writeFileSync(outPath, "﻿" + zeilen.join("\n") + "\n", "utf8");
const datenzeilen = zeilen.length - 1;
console.log(`Fertig: ${outPath}`);
console.log(`${sortiert.length} Konten, ${rows.filter((r) => r.lesson_slug).length} Versuche, ${datenzeilen} Zeilen geschrieben.`);
