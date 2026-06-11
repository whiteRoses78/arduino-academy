// =========================================================================
// upload-material.mjs — laedt die Modularbeit-Dateien eines Moduls vom
// Desktop in den privaten Storage-Bucket "lehrer-material".
//
// Aufruf:  node db/upload-material.mjs [modulnummer]   (default: 1)
//
// Login laeuft mit dem Admin-Konto; Credentials kommen aus .env.local
// (gitignored, nie committen):
//   MATERIAL_ADMIN_EMAIL=...
//   MATERIAL_ADMIN_PASSWORD=...
// Pures fetch gegen Auth- und Storage-REST-API — keine Dependencies.
// "x-upsert: true" erlaubt Re-Upload nach Korrekturen (UPDATE-Policy).
// =========================================================================

import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const modul = process.argv[2] ?? "1";
const FILES = [
  { local: `arduino-modularbeit-modul${modul}.pdf`, type: "application/pdf" },
  { local: `arduino-modularbeit-modul${modul}-loesung.pdf`, type: "application/pdf" },
  { local: `arduino-modularbeit-modul${modul}.html`, type: "text/html" },
  { local: `arduino-modularbeit-modul${modul}-loesung.html`, type: "text/html" },
];

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
    ".env.local: MATERIAL_ADMIN_EMAIL / MATERIAL_ADMIN_PASSWORD fehlen (Admin-Konto der App)",
  );
}

// --- 1) Als Admin einloggen -> User-JWT (die Storage-Policy prueft die Rolle) ---
const loginRes = await fetch(`${url}/auth/v1/token?grant_type=password`, {
  method: "POST",
  headers: { apikey: key, "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
if (!loginRes.ok) throw new Error(`Login fehlgeschlagen: ${await loginRes.text()}`);
const { access_token } = await loginRes.json();

// --- 2) Dateien hochladen (Bucket-Name = Dateiname ohne "arduino-"-Praefix) ---
for (const f of FILES) {
  const remote = f.local.replace(/^arduino-/, "");
  const body = readFileSync(join(homedir(), "Desktop", f.local));
  const res = await fetch(`${url}/storage/v1/object/lehrer-material/${remote}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${access_token}`,
      "Content-Type": f.type,
      "x-upsert": "true",
    },
    body,
  });
  if (!res.ok) throw new Error(`Upload ${remote}: ${res.status} ${await res.text()}`);
  console.log(`OK: ${remote} (${body.length} Bytes)`);
}
console.log(`Fertig: ${FILES.length} Dateien fuer Modul ${modul} im Bucket lehrer-material.`);
