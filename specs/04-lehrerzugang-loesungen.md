# Spec 04 — Lehrerzugang mit Lösungen

**Status:** Design freigegeben (Marco, 2026-06-05). Implementierung offen.
**Brainstorming-Ergebnis** der Roadmap-Sitzung 2026-06-05 (2. Teilprojekt nach der Bauteilliste).

## Ziel

Lehrkräfte sehen pro Lektion einen **Lehrer-only-Zusatzinhalt** — eine Musterlösung mit fertigem Sketch, Aufbau-Hinweis, häufigen Schülerfehlern und didaktischem Hinweis. Schülerinnen und Schüler sehen diesen Inhalt **nicht** (echter serverseitiger Schutz). Das Feature ist zugleich das **Fundament fürs spätere Verkaufen** der App an Schulen/Lehrkräfte.

## Entscheidungen (aus dem Brainstorming)

- **Was ist „Lösung":** Lehrer-only Zusatzinhalt pro Lektion (NICHT die bereits sichtbaren Übungs-Lösungen anders dargestellt, sondern neuer Content).
- **Rollen-Vergabe:** manuell. Jemand wird zum Lehrer, indem ein Admin ihn freischaltet. Self-Service/Verkaufs-Code ist eine **spätere Ausbaustufe** (siehe Nicht-Ziele).
- **Freischalt-Komfort:** über eine **Mini-Admin-Seite** in der App (nicht nur per DB-Befehl). Marco hat bewusst den Knopf statt des nackten SQL gewählt.
- **Reichweite:** **alle 23 Lektionen**. Praktische Lektionen bekommen Sketch + Hinweise; Theorie-Lektionen (grundlagen) meist nur didaktische Hinweise (Sketch/Aufbau bleiben leer).
- **Lösungs-Felder (alle optional):** `sketch` (kompletter Code), `wiring` (Aufbau-/Verdrahtungshinweis als Text), `mistakes` (häufige Schülerfehler), `didactics` (didaktischer Hinweis / Unterrichtstipp).
- **Einpflege:** Claude **entwirft je Lektion** (Sketch aus dem vorhandenen `content`-Code zusammenstellen + Hinweis-Felder) → **Marco prüft & korrigiert** (inhaltliche Hoheit). Daten re-seed-fest im Repo + DB — wie bei der Bauteilliste.
- **Position:** Lehrer-Block **unten** in der Lektion (nach Inhalt + Übungen), **klappbar**, standardmäßig zugeklappt.
- **Schutz:** echter serverseitiger Schutz (RLS), nicht nur UI-Verstecken.

## Datenmodell

### 1. Rollen — neue Spalte `role` auf `public.profiles`
- `role text not null default 'student'`, Check `role in ('student','teacher','admin')`.
- `student` = Standard (keine Lösungen). `teacher` = sieht Lösungen. `admin` = teacher + darf Rollen vergeben.
- **Bootstrap:** Marcos Account wird **einmalig** per Migration/MCP auf `admin` gesetzt (der erste Admin kann nicht per UI entstehen).

### 2. Lösungen — neue Tabelle `public.lesson_solutions`
```
lesson_id   uuid primary key references public.lessons(id) on delete cascade
sketch      text          -- kompletter Arduino-Sketch (nullable)
wiring      text          -- Aufbau-/Verdrahtungshinweis (nullable)
mistakes    text          -- häufige Schülerfehler (nullable)
didactics   text          -- didaktischer Hinweis (nullable)
updated_at  timestamptz not null default now()
```
- Eine Zeile pro Lektion (nur wo Inhalt existiert). Vier nullable Textfelder — Theorie-Lektionen füllen oft nur `didactics`.
- **Warum eigene Tabelle (nicht Spalte auf `lessons`):** `lessons` ist public-read (`grant select … to anon, authenticated`). Eine Spalte dort wäre für jeden lesbar — auch wenn die UI sie versteckt. Eine eigene Tabelle bekommt eine eigene, strenge RLS.

### 3. Schutz (RLS + Grants)
- RLS aktiv. **SELECT-Policy:** nur eingeloggte Lehrer/Admins —
  `using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('teacher','admin')))`.
- **Kein** INSERT/UPDATE/DELETE für anon/authenticated — Content kommt via Migration/Service-Role/Seed (wie die Lerninhalte).
- **Grants** (Grants-Gap dieses Projekts beachten — keine Supabase-Defaults): `grant select on public.lesson_solutions to authenticated;`. **Kein** Grant für `anon` (Nicht-Eingeloggte sehen nichts). RLS schränkt `authenticated` zusätzlich auf Lehrer/Admins ein.
- Folge: Ein Schüler bekommt vom Server **gar nichts** zurück — die Lösung verlässt die DB nie.

### 4. Rollenänderung sicher (ohne Service-Role-Key in der App)
- Die App nutzt nur den Publishable-Key (anon) und kommt nicht an `auth.users` (dort liegt die E-Mail). Lösung: Postgres-Funktion **`public.set_teacher_role(target_email text, make_teacher boolean)`**, `security definer`, die (a) prüft, dass `auth.uid()` Rolle `admin` hat, (b) den User per E-Mail in `auth.users` findet und (c) `profiles.role` auf `teacher`/`student` setzt. Aufruf aus der Admin-Seite via RPC. `execute` nur für `authenticated` (interner Admin-Check schützt zusätzlich).

## Komponenten / Dateien

- **`src/lib/auth/role.ts`** (server-only) — `getUserRole()` liest `profiles.role` des eingeloggten Users; Helfer `isTeacher()`, `isAdmin()`. Eine zentrale Stelle, kein verstreuter Rollen-Check.
- **`src/components/teacher-solution.tsx`** — klappbarer Block (`<details>`, kein JS) „🔒 Für Lehrer: Lösung & Hinweise". Rendert nur gefüllte Felder; Code in `<pre>`. Rendert nichts, wenn alle Felder leer.
- **`src/app/modul/[modul]/[lektion]/page.tsx`** — am Ende: wenn `isTeacher`/`isAdmin`, Lösung holen und `<TeacherSolution>` rendern.
- **`src/app/admin/page.tsx`** + **`actions.ts`** — Admin-Seite (redirect, falls nicht admin): E-Mail-Feld → Server Action ruft `set_teacher_role(email, true)`; Liste aktueller Lehrer mit „zurückstufen" (`…, false`).
- **`db/solutions-data.mjs`** — re-seed-feste Lösungsdaten (Marco-geprüft), Keys `module → slug`. Befüllung via MCP `execute_sql` + Seed-Integration (analog `parts-data.mjs`).
- **Migration** — `profiles.role`, `lesson_solutions` (+ RLS/Grants), `set_teacher_role`-Funktion; `db/schema.sql` dokumentieren.
- **TS-Types** neu generieren.

## Darstellung (UI)

```
[Lektions-Inhalt …]
[Übungen …]
──────────────────────────────────
▸ 🔒 Für Lehrer: Lösung & Hinweise        (zugeklappt; nur teacher/admin)
   ── aufgeklappt: ──
   📋 Musterlösung (Sketch)   <pre>void setup() { … }</pre>
   🔌 Aufbau                  Pin 8 → 220 Ω → LED → GND …
   ⚠ Häufige Fehler           LED falsch herum; Vorwiderstand vergessen …
   🎓 Didaktik                Erst messen, dann rechnen …
```
- Abgesetzter Stil (Theme-Tokens, dark-mode-fest), klar als Lehrer-Bereich erkennbar. Nur gefüllte Felder erscheinen.

## Content-Vorgehen (Etappen)

Wegen Umfang (23 Lektionen) in Etappen, je mit Marco-Review:
1. **Durchstich:** 3 Projekte (Ampel, Nachtabschaltung, Prüfungsschaltung) — Sketch aus `content` ziehen, Felder entwerfen, Marco prüft, befüllen, am Gerät sehen.
2. Danach modulweise (digital → analog → aktoren), zuletzt grundlagen (nur `didactics`).

Beim Entwurf je Lektion prüfen, ob der komplette Sketch schon im Schüler-`content` steht (dann ist `sketch` ggf. redundant → Schwerpunkt auf `wiring`/`mistakes`/`didactics`) oder nur ein Ausschnitt (dann Komplettlösung in `sketch`).

## Nicht-Ziele (YAGNI — bewusst später)

- **Kein** Self-Service-/Verkaufs-Code zur Lehrer-Freischaltung. **⚠ MERKPOSTEN für den Verkauf:** Vor einem echten Verkauf MUSS die Rollen-Vergabe von „Admin schaltet manuell frei" auf eine sichere Self-Service-Form (z.B. verkaufter Lizenz-/Lehrer-Code, ggf. mit E-Mail-Verifikation) umgestellt werden — sonst skaliert es nicht. Siehe [[project-saas-verkauf-hosting]].
- Kein Lösungs-Editor in der App (Marco prüft Entwürfe statt selbst zu tippen) — mögliche spätere Ausbaustufe.
- Keine Bilder/Verdrahtungsfotos (nur Text).
- Keine Schüler-/Klassenverwaltung, kein Lehrer-Dashboard über Schülerfortschritt.

## Umsetzungsschritte (grob, für den Plan)

1. Migration: `profiles.role` (+ Check, Marco→admin), `lesson_solutions` (+ RLS + Grants), `set_teacher_role`-Funktion. `db/schema.sql` aktualisieren.
2. TS-Types neu generieren.
3. `src/lib/auth/role.ts` (`getUserRole`/`isTeacher`/`isAdmin`) + Tests.
4. `src/components/teacher-solution.tsx` (klappbarer Block, nur gefüllte Felder).
5. Lösung in der Lektionsseite holen (rollenabhängig) + Block einbinden.
6. Admin-Seite `/admin` + Server Action (`set_teacher_role` via RPC) + Guard.
7. Content Etappe 1 (3 Projekte): `db/solutions-data.mjs` entwerfen → Marco-Review → befüllen (+ Seed-Integration).
8. Verifizieren: tsc/lint/build/Tests; manueller Sicherheitstest (Schüler bekommt 0 Lösungs-Daten, Lehrer sieht sie); Visual @375/@1280; Admin-Flow (Lehrer freischalten/zurückstufen).

## Verifikationskriterien

- Eingeloggte Lehrer/Admins sehen den Lösungs-Block (nur gefüllte Felder); Schüler und Nicht-Eingeloggte sehen ihn nicht — **und** bekommen die Daten auch über die API/DB nicht (RLS verweigert).
- Admin kann über `/admin` einen Account per E-Mail zum Lehrer machen und zurückstufen; Nicht-Admins werden von `/admin` weggeleitet.
- Theorie-Lektion zeigt (für Lehrer) nur die gefüllten Felder, meist `didactics`.
- Mobil (@375) kein Overflow; dark mode sauber. Build/Lint/tsc/Tests grün.
