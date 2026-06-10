# Spec: Test-Overlay + Registrierung ausblenden

Datum: 2026-06-10 · Status: von Marco freigegebenes Design (Brainstorming-Dialog)

## Kontext / Problem

- Der Kompetenztest rendert als Block unten auf der Lektionsseite. Während der
  Test läuft, bleibt die komplette Lektion darüber scrollbar — der Test ist
  faktisch „Open Book". Im 1. Klasseneinsatz (08.06.) haben das selbst die
  Schüler:innen als ungeeignet empfunden; Marco bestätigt.
- Nebenbefund: Die Registrierung ist seit 10.06. Supabase-seitig deaktiviert
  (`disable_signup`, Testphase-Härtung). Der sichtbare „Registrieren"-Knopf
  ist damit funktionslos und soll im selben Deploy verschwinden.

## Entscheidungen (Marco, 2026-06-10)

1. **Vollbild-Overlay** statt eigener Test-Seite (kleinster Eingriff, kein
   Routing, Browser-Zurück-Problem entfällt).
2. **Keine Start-Sperre:** Erst Abschicken zählt als Versuch; Neuladen bricht
   den Test folgenlos ab. Der „Neustart-Trick" (starten → Fragen anschauen →
   neu laden → Lektion lesen → erneut starten) ist bekannt und bewusst
   akzeptiert: Der Test läuft beaufsichtigt, und eine harte Sperre würde bei
   Technik-Pannen (Absturz, WLAN) den einzigen Versuch fressen.
3. **Registrieren-Ausblendung im selben Deploy** (ein Push = ein Deploy =
   einmal Netlify-Credits).

## Verhalten: Test-Overlay

- Phase `running` rendert die Fragen in einer Vollbild-Ansicht über der
  ganzen Seite: `fixed inset-0 z-50` (liegt über dem Sticky-Header, der
  `z-40` hat), `bg-background`, eigener Scroll (`overflow-y-auto`).
- Kopfzeile im Overlay: „📝 Kompetenztest — *Lektionstitel*" plus Zähler
  „X von Y beantwortet".
- **Kein Schließen-Knopf** (bewusst). Raus nur über „Abschicken" — oder
  Seite verlassen/neu laden (= Abbruch ohne Versuch, siehe Entscheidung 2).
- Nach dem Abschicken schließt das Overlay; die Auswertung (`TestResultView`)
  erscheint wie bisher im Block auf der Lektionsseite (Nachlesen erwünscht).
- Fehler beim Abschicken: Meldung im Overlay, Overlay bleibt offen.
- Phasen `intro` / `locked` / `done`: unverändert im Block.

## Technik

- `src/components/test/test-runner.tsx`: Overlay-Rendering in Phase
  `running`; Body-Scroll-Lock solange offen (`useEffect`:
  `document.body.style.overflow = "hidden"` + Cleanup); `role="dialog"`
  `aria-modal="true"`; Fokus beim Öffnen auf den Overlay-Container.
- Neuer Prop `lessonTitle`, durchgereicht:
  `modul/[modul]/[lektion]/page.tsx` → `StartTest` → `TestRunner`.
- Unverändert: `test-question-mc.tsx`, `test-result.tsx`, Server Actions,
  RPCs, Datenbank, Ein-Versuch-Logik, Lehrer-Ansicht.

## Registrierung ausblenden

- `src/components/site-header.tsx`: „Registrieren"-Button im ausgeloggten
  Zustand entfernen — nur „Anmelden" bleibt.
- `src/app/(auth)/anmelden/page.tsx`: Hinweis „… Jetzt registrieren"
  entfernen.
- `src/app/(auth)/registrieren/page.tsx`: Formular ersetzen durch eine
  Hinweis-Karte („Konten vergibt aktuell die Lehrkraft") + Link zur
  Anmeldung. Route bleibt bestehen (kein 404 für Lesezeichen).
- `signUpAction` + Signup-Modus der `AuthForm` bleiben im Code erhalten
  (für den späteren öffentlichen Launch) — sie sind nur nicht mehr verlinkt.
  Serverseitig blockt Supabase ohnehin (`signup_disabled`).

## Nicht-Ziele

- Keine Start-Sperre / kein Versuchs-Vermerk beim Starten.
- Kein Schutz gegen zweiten Tab / zweites Gerät (nicht leistbar — Aufsicht).
- Keine Änderung an Fragen, Bewertung oder Lehrer-Übersicht.

## Verifikation (vor dem Push)

- `tsc` + `lint` + `vitest` + `npm run build` grün.
- Lokaler Production-Build, eingeloggter Durchklick: Overlay verdeckt
  Lektion **und** Header, Hintergrund scrollt nicht, Zähler zählt,
  Abschicken → Auswertung im Block; geprüft @375 und @1280.
- Ausgeloggt: Test-Block zeigt Anmelde-Hinweis (unverändert), Header ohne
  „Registrieren", `/registrieren` zeigt die Hinweis-Karte.
- Ein Push auf `main` = ein Netlify-Deploy (Credits!).
