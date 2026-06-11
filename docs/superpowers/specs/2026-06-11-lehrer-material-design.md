# Spec: Lehrer-Material-Ablage (private Datei-Ablage für Modularbeiten & Co.)

Datum: 2026-06-11 · Status: ✅ umgesetzt (11.06.2026, inkl. Upload Modul 1, Sicherheitstests student/teacher/anon und Mobile-Header-Fix)

## Kontext / Problem

Die Modularbeit Modul 1 (Arbeit + Lösung, je HTML-Master + PDF) liegt nur
lokal auf Marcos Desktop — bewusst NICHT im öffentlichen GitHub-Repo, denn
es sind Klassenarbeiten mit Lösungen. Marco möchte sie „aufgeräumt und
alles an einem Ort": in der App, im Lehrerbereich. Mit den Modularbeiten
2–5 kommen weitere Dateien dazu; perspektivisch auch anderes
Lehrer-Material (z. B. Zugangskarten-PDFs).

**Sicherheits-Anforderung Nr. 1:** Schüler dürfen die Dateien unter keinen
Umständen erreichen — weder über die UI noch über erratene URLs.

## Marco-Entscheidungen (2026-06-11)

1. **Allgemeine Ablage**, nicht nur Modularbeiten: Die Seite listet
   einfach alles, was im Bucket liegt — neues Material braucht keine
   Code-Änderung.
2. **Keine Upload-UI** (KISS): Hochladen läuft über ein lokales Script
   (Claude) oder das Supabase-Dashboard. Die App kann nur
   anzeigen/herunterladen.
3. **Ansatz A komplett**: privater Bucket + Storage-Zugriffsregeln +
   signierte URLs; hochgeladen werden alle 4 Modul-1-Dateien
   (2 PDFs + 2 HTML-Master als Quellsicherung).

## Architektur (Ansatz A)

- **Privater Storage-Bucket `lehrer-material`** (public=false) im
  bestehenden Supabase-Projekt.
- **Storage-Policies auf `storage.objects`** (Sicherheitsgrenze in der DB,
  wie überall in der App):
  - SELECT (lesen/auflisten): nur eingeloggte Nutzer mit
    `profiles.role IN ('teacher','admin')`.
  - INSERT/UPDATE/DELETE: nur `profiles.role = 'admin'` (fürs
    Upload-Script; die App selbst schreibt nie).
- **Kein Service-Role-Key in der App oder bei Netlify** — die signierten
  URLs erzeugt der Server-Client des eingeloggten Lehrers; das erlaubt
  die SELECT-Policy.

## Seite `/lehrer/material`

- Server Component nach dem Muster von `/lehrer/tests`:
  Guard `canViewSolutions(await getCurrentUserRole())`, sonst
  `redirect("/")` (UI-Schutz; die echte Grenze ist die Storage-Policy).
- `storage.from("lehrer-material").list()` → Tabelle mit Dateiname,
  Größe, Änderungsdatum, Download-Knopf; sortiert nach Dateiname.
- Pro Datei `createSignedUrl(name, 3600)` → Download-Link, 1 h gültig
  (bei jedem Seitenaufruf frisch erzeugt; ein abgelaufener Link aus
  einem alten Tab liefert nur einen Supabase-Fehler, keine Datei).
- Leerer Bucket → Hinweis „Noch kein Material vorhanden."
- List-/URL-Fehler → Fehlermeldung auf der Seite statt leerer Liste.
- Mobile-first; Tabelle bei Bedarf in `overflow-x-auto`-Wrapper.

## Navigation

- `site-header.tsx`: neben dem bestehenden „Tests"-Link ein
  „Material"-Link, sichtbar nur bei `canSeeTests` (= teacher/admin).
  Für Schüler unsichtbar.

## Einmal-Upload (Script)

- `db/upload-material.mjs` nach dem Muster von `db/seed.mjs`:
  meldet sich per E-Mail+Passwort mit Marcos Admin-Konto an
  (Credentials werden beim Ausführen übergeben, landen nicht im Repo)
  und lädt die 4 Modul-1-Dateien vom Desktop in den Bucket.
- Dateinamen im Bucket sprechend halten, z. B.
  `modularbeit-modul1.pdf`, `modularbeit-modul1-loesung.pdf`,
  `modularbeit-modul1.html`, `modularbeit-modul1-loesung.html`.
- Dasselbe Script wird für die Modularbeiten 2–5 wiederverwendet.

## Verifikation

- Lehrer-Login: Seite sichtbar, Liste zeigt 4 Dateien, Download liefert
  das korrekte PDF.
- Schüler-Login: kein „Material"-Link, direkter Seitenaufruf →
  Redirect auf „/", direkter Storage-Zugriff (z. B. via API mit
  Schüler-Token) → von der Policy verweigert.
- Ausgeloggt: Seitenaufruf → Redirect.

## Bewusst NICHT in Scope (YAGNI)

- Upload-/Lösch-UI in der App.
- Ordner-Struktur/Kategorien im Bucket (eine flache Liste reicht).
- Vorschau/Viewer — der Browser öffnet PDFs selbst.

## Hinweise

- Netlify-Deploy kostet 15 Credits — ggf. mit nächster Änderung bündeln.
- Memory „Supabase Grants-Gap" betrifft neue **Tabellen**;
  `storage.objects` existiert mit Standard-Grants, hier reichen Policies.
  Im Zweifel beim Implementieren mit einem Schüler-Token gegentesten.
