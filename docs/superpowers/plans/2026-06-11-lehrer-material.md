# Lehrer-Material-Ablage — Implementierungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Private Datei-Ablage für Lehrkräfte: Modularbeit-PDFs/HTMLs liegen in einem privaten Supabase-Bucket, abrufbar nur für teacher/admin über die neue Seite `/lehrer/material`.

**Architecture:** Privater Storage-Bucket `lehrer-material` mit RLS-Policies auf `storage.objects` (SELECT: teacher/admin, Schreiben: nur admin) als echte Sicherheitsgrenze. Server Component listet den Bucket und erzeugt signierte 1-h-Download-URLs mit dem Client des eingeloggten Lehrers — kein Service-Role-Key, kein neues Geheimnis. Einmal-Upload per lokalem Node-Script mit Admin-Login.

**Tech Stack:** Next.js 16 Server Components, Supabase Storage (REST + supabase-js), Tailwind v4, vitest. Spec: `docs/superpowers/specs/2026-06-11-lehrer-material-design.md`.

**Wichtig für alle Tasks:** Die PDFs/HTMLs selbst dürfen NIEMALS ins Repo (öffentliches GitHub-Repo, Klassenarbeiten mit Lösungen!). Nur Code/SQL/Doku committen.

---

### Task 1: Storage-Bucket + Policies (Supabase)

**Files:**
- Modify: `db/schema.sql` (Abschnitt ans Dateiende anhängen)

- [ ] **Step 1: Migration per Supabase MCP anwenden**

Tool: `mcp__supabase__apply_migration`, Name `lehrer_material_bucket`, SQL:

```sql
-- ===== Lehrer-Material: privater Bucket + Policies (Spec 2026-06-11) =====
-- Klassenarbeiten mit Loesungen: lesen nur teacher/admin, schreiben nur
-- admin (Upload-Script). Bucket privat -> ohne gueltige Policy kommt
-- niemand ran, egal welche URL er kennt.
insert into storage.buckets (id, name, public)
values ('lehrer-material', 'lehrer-material', false)
on conflict (id) do nothing;

drop policy if exists "teachers read material" on storage.objects;
create policy "teachers read material" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'lehrer-material'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('teacher','admin')
    )
  );

drop policy if exists "admin inserts material" on storage.objects;
create policy "admin inserts material" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'lehrer-material'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "admin updates material" on storage.objects;
create policy "admin updates material" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'lehrer-material'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    bucket_id = 'lehrer-material'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "admin deletes material" on storage.objects;
create policy "admin deletes material" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'lehrer-material'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
```

**Bekannte Stolperstelle:** Wirft die Migration `must be owner of table objects`, dann die vier Policies stattdessen im Supabase-Dashboard anlegen (Storage → Policies → bucket `lehrer-material`), mit exakt denselben USING/WITH-CHECK-Ausdrücken. Der Bucket-Insert funktioniert immer per SQL.

- [ ] **Step 2: Verifizieren**

Tool: `mcp__supabase__execute_sql`:

```sql
select id, public from storage.buckets where id = 'lehrer-material';
select policyname, cmd from pg_policies
where schemaname = 'storage' and tablename = 'objects'
  and policyname like '%material%' order by policyname;
```

Expected: 1 Bucket-Zeile mit `public = false`; 4 Policies (`admin deletes/inserts/updates material`, `teachers read material`) mit cmd DELETE/INSERT/UPDATE/SELECT.

- [ ] **Step 3: Dasselbe SQL ans Ende von `db/schema.sql` anhängen** (identischer Block wie Step 1 — schema.sql ist die fortgeschriebene Schema-Doku, idempotent gehalten wie die bestehenden Abschnitte).

- [ ] **Step 4: Commit**

```bash
git add db/schema.sql
git commit -m "feat(storage): privater Bucket lehrer-material + RLS-Policies (lesen teacher/admin, schreiben admin)"
```

---

### Task 2: Upload-Script + Einmal-Upload Modul 1

**Files:**
- Create: `db/upload-material.mjs`

- [ ] **Step 1: Script schreiben**

```js
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
```

- [ ] **Step 2: CHECKPOINT — Marco bitten, die Admin-Credentials einzutragen**

Marco trägt selbst in `.env.local` (gitignored) zwei Zeilen ein — Werte nie in den Chat schreiben:

```
MATERIAL_ADMIN_EMAIL=<E-Mail des Admin-Kontos der App>
MATERIAL_ADMIN_PASSWORD=<Passwort>
```

Nicht weitermachen, bevor Marco bestätigt hat.

- [ ] **Step 3: Upload ausführen**

```bash
node db/upload-material.mjs 1
```

Expected: 4 × `OK: modularbeit-modul1….` + Fertig-Zeile. Bei `Login fehlgeschlagen`: Credentials in `.env.local` prüfen. Bei `403 … row-level security`: Konto ist kein admin (`select role from profiles where id = …`) oder INSERT-Policy aus Task 1 fehlt.

- [ ] **Step 4: Upload in der DB verifizieren**

Tool: `mcp__supabase__execute_sql`:

```sql
select name, metadata->>'size' as bytes
from storage.objects where bucket_id = 'lehrer-material' order by name;
```

Expected: genau 4 Zeilen (`modularbeit-modul1.pdf`, `modularbeit-modul1-loesung.pdf`, `modularbeit-modul1.html`, `modularbeit-modul1-loesung.html`), Größen plausibel (PDFs ~400–490 KB, HTMLs ~30 KB).

- [ ] **Step 5: Commit (nur das Script — Dateien und Credentials bleiben draußen!)**

```bash
git add db/upload-material.mjs
git commit -m "feat(storage): Upload-Script fuer Lehrer-Material (Admin-Login, Modul-Parameter)"
```

---

### Task 3: formatBytes-Helfer (TDD)

**Files:**
- Create: `src/lib/format.ts`
- Test: `src/lib/format.test.ts`

- [ ] **Step 1: Failing Test schreiben**

```ts
import { describe, expect, it } from "vitest";
import { formatBytes } from "./format";

describe("formatBytes", () => {
  it("zeigt Bytes unter 1 KB direkt", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(512)).toBe("512 B");
  });

  it("rundet KB ohne Dezimalstelle", () => {
    expect(formatBytes(2048)).toBe("2 KB");
    expect(formatBytes(580578)).toBe("567 KB");
  });

  it("zeigt MB mit einer Dezimalstelle und deutschem Komma", () => {
    expect(formatBytes(1572864)).toBe("1,5 MB");
  });
});
```

- [ ] **Step 2: Test laufen lassen — muss fehlschlagen**

Run: `npx vitest run src/lib/format.test.ts`
Expected: FAIL — `Cannot find module './format'` (o. ä.).

- [ ] **Step 3: Minimale Implementierung**

```ts
// Dateigroesse menschenlesbar (deutsch: Komma als Dezimaltrenner).
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}
```

- [ ] **Step 4: Test laufen lassen — muss bestehen**

Run: `npx vitest run src/lib/format.test.ts`
Expected: PASS (3 Tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/format.ts src/lib/format.test.ts
git commit -m "feat(lib): formatBytes-Helfer (deutsche Formatierung) inkl. Tests"
```

---

### Task 4: Seite /lehrer/material

**Files:**
- Create: `src/app/lehrer/material/page.tsx`

- [ ] **Step 1: Server Component schreiben**

```tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth/role";
import { canViewSolutions } from "@/lib/roles";
import { formatBytes } from "@/lib/format";

export const metadata: Metadata = { title: "Material" };

// Lehrer-/Admin-Ablage: listet den privaten Storage-Bucket "lehrer-material"
// und erzeugt pro Datei eine signierte Download-URL (1 h gueltig, mit
// download-Disposition). Der Guard hier ist nur UI-Schutz — die echte
// Sicherheitsgrenze ist die Storage-RLS-Policy ("teachers read material").
const dateFmt = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "short",
  timeZone: "Europe/Berlin",
});

export default async function TeacherMaterialPage() {
  if (!canViewSolutions(await getCurrentUserRole())) redirect("/");

  const supabase = await createClient();
  const { data: listed, error: listError } = await supabase.storage
    .from("lehrer-material")
    .list("", { sortBy: { column: "name", order: "asc" } });

  // Ordner-Platzhalter haben id = null -> nur echte Dateien anzeigen.
  const files = (listed ?? []).filter((f) => f.id !== null);

  // Signierte URLs in einem Rutsch; download:true erzwingt "Speichern unter".
  const urls = new Map<string, string>();
  let signError: string | null = null;
  if (files.length > 0) {
    const { data: signed, error } = await supabase.storage
      .from("lehrer-material")
      .createSignedUrls(
        files.map((f) => f.name),
        3600,
        { download: true },
      );
    if (error) signError = error.message;
    for (const s of signed ?? []) {
      if (s.signedUrl && s.path) urls.set(s.path, s.signedUrl);
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Material</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Interne Ablage für Lehrkräfte — Modularbeiten, Lösungen und weiteres
        Material. Download-Links sind 1 Stunde gültig.
      </p>

      {(listError || signError) && (
        <p className="mt-6 text-sm text-destructive">
          Fehler beim Laden der Ablage: {listError?.message ?? signError}
        </p>
      )}

      {!listError && files.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          Noch kein Material vorhanden.
        </p>
      )}

      {files.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Datei</th>
                <th className="py-2 pr-4 font-medium">Größe</th>
                <th className="py-2 pr-4 font-medium">Stand</th>
                <th className="py-2 font-medium">
                  <span className="sr-only">Aktion</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((f) => {
                const href = urls.get(f.name);
                return (
                  <tr key={f.name} className="border-b border-border/50">
                    <td className="py-2 pr-4 font-medium">{f.name}</td>
                    <td className="py-2 pr-4 tabular-nums">
                      {typeof f.metadata?.size === "number"
                        ? formatBytes(f.metadata.size)
                        : "—"}
                    </td>
                    <td className="py-2 pr-4 tabular-nums">
                      {f.updated_at
                        ? dateFmt.format(new Date(f.updated_at))
                        : "—"}
                    </td>
                    <td className="py-2 text-right">
                      {href ? (
                        <a
                          href={href}
                          className="inline-block py-2 font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:underline focus-visible:outline-none"
                        >
                          Herunterladen
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
```

- [ ] **Step 2: Dev-Server-Smoke-Test**

Run: `npm run dev`, dann als Lehrer/Admin einloggen und `http://localhost:3000/lehrer/material` öffnen.
Expected: Tabelle mit den 4 Dateien aus Task 2, Größen/Datum gefüllt, Download-Klick lädt das PDF.

- [ ] **Step 3: Commit**

```bash
git add src/app/lehrer/material/page.tsx
git commit -m "feat(lehrer): /lehrer/material — private Material-Ablage mit signierten Downloads"
```

---

### Task 5: Material-Link im Header

**Files:**
- Modify: `src/components/site-header.tsx:38-42` (direkt nach dem Tests-Link-Block)

- [ ] **Step 1: Link ergänzen**

Nach dem bestehenden `{canSeeTests && (… href="/lehrer/tests" …)}`-Block einfügen:

```tsx
            {canSeeTests && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/lehrer/material">Material</Link>
              </Button>
            )}
```

- [ ] **Step 2: Sichtprüfung im Dev-Server**

Als Lehrer: Header zeigt „Tests" und „Material". Als Schüler (z. B. arduino01@klasse.de): keiner von beiden Links sichtbar.

- [ ] **Step 3: Commit**

```bash
git add src/components/site-header.tsx
git commit -m "feat(lehrer): Material-Link im Header (nur teacher/admin)"
```

---

### Task 6: Verifikation (rules/verification.md)

**Files:** keine neuen — reine Prüfung.

- [ ] **Step 1: Tests, Lint, Build**

```bash
npm test && npm run lint && npm run build
```

Expected: alle grün, Build ohne TypeScript-Fehler.

- [ ] **Step 2: Negativ-Test Schüler (die eigentliche Sicherheitsprüfung)**

Mit einem Schüler-Konto (z. B. arduino01@klasse.de):
1. Login in der App → Header zeigt KEIN „Material".
2. `http://localhost:3000/lehrer/material` direkt aufrufen → Redirect auf `/`.
3. Storage-API direkt mit Schüler-JWT (Token z. B. aus den Browser-DevTools-Cookies oder per Login-curl wie im Upload-Script):

```bash
curl -s -X POST "$SUPABASE_URL/storage/v1/object/list/lehrer-material" \
  -H "apikey: $PUBLISHABLE_KEY" -H "Authorization: Bearer $SCHUELER_JWT" \
  -H "Content-Type: application/json" -d '{"prefix":""}'
```

Expected: leeres Array `[]` (RLS filtert alles weg) — auf keinen Fall Dateinamen.
4. Ausgeloggt (privates Fenster): `http://localhost:3000/lehrer/material` → Redirect auf `/`.
5. Signierte URL eines Lehrers in einem privaten Fenster (ausgeloggt) öffnen → Download funktioniert (so sind signierte URLs gedacht: Träger-Token in der URL, 1 h gültig — deshalb stehen sie nie irgendwo statisch).

- [ ] **Step 3: Positiv-Test Lehrer + Viewports**

Als Lehrer: `/lehrer/material` in 375 px, 768 px, 1280 px prüfen — kein Overflow (Tabelle scrollt ggf. horizontal), Tap-Target „Herunterladen" ≥ 44 px hoch, Hover-/Focus-State sichtbar. Download eines PDFs öffnen und Inhalt stichprobenartig prüfen (Wortmarke „Arduino Academy" oben rechts).

- [ ] **Step 4: Spec-Status setzen + Abschluss-Commit (falls noch uncommittete Reste)**

In `docs/superpowers/specs/2026-06-11-lehrer-material-design.md` den Status auf „✅ umgesetzt (Datum)" setzen.

```bash
git add docs/superpowers/specs/2026-06-11-lehrer-material-design.md
git commit -m "docs(spec): Lehrer-Material-Ablage als umgesetzt markiert"
```

**Deploy ist bewusst NICHT Teil dieses Plans:** Netlify-Deploy kostet 15 Credits — Marco entscheidet, ob sofort deployen oder mit der nächsten Änderung bündeln.
