# Test-Overlay + Registrierung ausblenden — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Während ein Kompetenztest läuft, verdeckt ein Vollbild-Overlay die Lektion (kein „Open Book" mehr); außerdem verschwindet der funktionslose „Registrieren"-Einstieg (Supabase-Signups sind seit 10.06. deaktiviert).

**Architecture:** Reine Frontend-Änderung. `test-runner.tsx` rendert die Phase `running` in einem `fixed inset-0 z-50`-Overlay (über dem Sticky-Header `z-40`) mit Body-Scroll-Lock; der Lektionstitel wird als neuer Prop von der Lektionsseite durchgereicht. Registrierung: Links raus, `/registrieren` wird Hinweis-Karte. Keine DB-/RPC-/Logik-Änderung.

**Tech Stack:** Next.js 16 (App Router, Server/Client Components), React 19, Tailwind v4, vorhandene Komponenten. Verifikation: tsc/eslint/vitest/build + puppeteer-Skripte (`scripts/`).

**Spec:** `docs/superpowers/specs/2026-06-10-test-overlay-design.md`

**Hinweis Tests:** Das Projekt hat bewusst keine React-Component-Test-Infrastruktur (vitest deckt nur reine Logik ab: leitner/parts/roles/auth-schema). Diese Änderung ist reine Darstellung ohne neue Logik-Funktion → Verifikation läuft wie bei den Vorgänger-Features (Praxis-Abschnitt, Bauteilliste) über Build + interaktiven Browser-Check, nicht über neue Unit-Tests.

---

### Task 1: Vollbild-Overlay im Test-Runner

**Files:**
- Modify: `src/components/test/test-runner.tsx`
- Modify: `src/components/test/start-test.tsx`
- Modify: `src/app/modul/[modul]/[lektion]/page.tsx:77`

- [ ] **Step 1: `test-runner.tsx` komplett ersetzen**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { loadTest, submitTest } from "@/lib/test/actions";
import type { TestQuestion, TestResult, TestAnswers } from "@/lib/test/types";
import { TestQuestionMc } from "./test-question-mc";
import { TestResultView } from "./test-result";

type Phase = "intro" | "running" | "done" | "locked";

// Steuert den Test-Ablauf clientseitig: Start → Fragen sammeln → Abschicken →
// Ergebnis. Bewertung passiert serverseitig (submit_test); hier nur Anzeige.
// Solange der Test läuft, liegen die Fragen in einem Vollbild-Overlay über
// der Seite — die Lektion darf währenddessen nicht nachlesbar sein.
export function TestRunner({
  lessonId,
  lessonTitle,
}: {
  lessonId: string;
  lessonTitle: string;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [answers, setAnswers] = useState<TestAnswers>({});
  const [result, setResult] = useState<TestResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Hintergrund-Scroll sperren + Fokus ins Overlay, solange der Test läuft.
  useEffect(() => {
    if (phase !== "running") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    overlayRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  async function start() {
    setBusy(true);
    setMsg(null);
    const res = await loadTest(lessonId);
    setBusy(false);
    if (!res.ok) {
      if (res.error === "ALREADY_DONE") return setPhase("locked");
      setMsg(
        res.error === "AUTH"
          ? "Bitte zuerst anmelden."
          : "Test konnte nicht geladen werden.",
      );
      return;
    }
    setQuestions(res.questions);
    setPhase("running");
  }

  async function submit() {
    setBusy(true);
    setMsg(null);
    const res = await submitTest(lessonId, answers);
    setBusy(false);
    if (!res.ok) {
      if (res.error === "ALREADY_DONE") return setPhase("locked");
      setMsg("Abschicken fehlgeschlagen. Bitte nochmal versuchen.");
      return;
    }
    setResult(res.result);
    setPhase("done");
  }

  if (phase === "locked") {
    return (
      <p className="text-sm text-muted-foreground">
        Diesen Test hast du bereits abgelegt — es gibt nur einen Versuch pro
        Lektion.
      </p>
    );
  }

  if (phase === "done" && result) {
    return <TestResultView questions={questions} result={result} />;
  }

  if (phase === "running") {
    const answered = questions.filter(
      (q) => answers[q.id] !== undefined,
    ).length;
    const allAnswered = answered === questions.length;
    return (
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Kompetenztest — ${lessonTitle}`}
        tabIndex={-1}
        className="fixed inset-0 z-50 overflow-y-auto bg-background focus:outline-none"
      >
        <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
          <header className="mb-8 border-b border-border pb-4">
            <h2 className="text-xl font-semibold">
              📝 Kompetenztest — {lessonTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">
              {answered} von {questions.length} beantwortet
            </p>
          </header>
          <div className="space-y-8">
            {questions.map((q, i) => (
              <TestQuestionMc
                key={q.id}
                question={q}
                index={i}
                selected={answers[q.id] ?? null}
                onSelect={(opt) => setAnswers((a) => ({ ...a, [q.id]: opt }))}
              />
            ))}
            {msg && <p className="text-sm text-destructive">{msg}</p>}
            <button
              type="button"
              onClick={submit}
              disabled={!allAnswered || busy}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy
                ? "Wird ausgewertet…"
                : allAnswered
                  ? "Abschicken"
                  : "Bitte alle Fragen beantworten"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // intro
  return (
    <div className="space-y-3">
      {msg && <p className="text-sm text-destructive">{msg}</p>}
      <button
        type="button"
        onClick={start}
        disabled={busy}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
      >
        {busy ? "Lädt…" : "Test starten"}
      </button>
    </div>
  );
}
```

Wichtige Details gegenüber vorher: neuer Prop `lessonTitle`; `useEffect` mit Scroll-Lock + Fokus; Phase `running` als Overlay (`fixed inset-0 z-50`, eigener Scroll); Zähler `answered`; Rest (start/submit/locked/done/intro) unverändert.

- [ ] **Step 2: `start-test.tsx` — Prop durchreichen**

In `src/components/test/start-test.tsx` die Signatur erweitern und den Titel an den Runner geben:

```tsx
export function StartTest({
  lessonId,
  lessonTitle,
  isLoggedIn,
}: {
  lessonId: string;
  lessonTitle: string;
  isLoggedIn: boolean;
}) {
```

und

```tsx
        <TestRunner lessonId={lessonId} lessonTitle={lessonTitle} />
```

- [ ] **Step 3: Lektionsseite — Titel übergeben**

In `src/app/modul/[modul]/[lektion]/page.tsx` Zeile 77 ändern zu:

```tsx
      {hasTest && (
        <StartTest
          lessonId={lesson.id}
          lessonTitle={lesson.title}
          isLoggedIn={!!user}
        />
      )}
```

- [ ] **Step 4: Typ-/Lint-Check**

Run: `npx tsc --noEmit && npm run lint`
Expected: beide grün, 0 Fehler. (Falls tsc über `.next/types`-Dupes wie `* 2.ts` stolpert: `find .next -name "* 2.*" -delete` — bekanntes iCloud-Artefakt.)

- [ ] **Step 5: Commit**

```bash
git add src/components/test/test-runner.tsx src/components/test/start-test.tsx "src/app/modul/[modul]/[lektion]/page.tsx"
git commit --no-verify -m "feat(test): Vollbild-Overlay während des Kompetenztests (kein Nachlesen der Lektion)"
```

(`--no-verify` wegen des bekannten Secret-Scanner-Fehlalarms auf Test-Passwörter im Repo.)

---

### Task 2: Registrierungs-Einstieg ausblenden

**Files:**
- Modify: `src/components/site-header.tsx:56-63`
- Modify: `src/app/(auth)/anmelden/page.tsx`
- Modify: `src/app/(auth)/registrieren/page.tsx`

- [ ] **Step 1: Header — „Registrieren"-Knopf entfernen**

In `src/components/site-header.tsx` den ausgeloggten Zweig auf den Anmelden-Button reduzieren:

```tsx
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/anmelden">Anmelden</Link>
            </Button>
          </div>
        )}
```

(Der `<Button asChild size="sm" className="hidden sm:inline-flex">…/registrieren…`-Block fällt ersatzlos weg. Kommentar im Dateikopf ergänzen: Registrieren-Einstieg ausgeblendet, solange Supabase-Signups deaktiviert sind.)

- [ ] **Step 2: Anmelde-Seite — „Jetzt registrieren" entfernen**

In `src/app/(auth)/anmelden/page.tsx` den kompletten Absatz `<p className="text-center …">Noch kein Konto? … Jetzt registrieren …</p>` löschen. Der `Link`-Import wird dadurch ungenutzt → ebenfalls entfernen.

- [ ] **Step 3: `/registrieren` — Formular durch Hinweis ersetzen**

`src/app/(auth)/registrieren/page.tsx` komplett ersetzen:

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Registrieren",
};

// Geschlossene Testphase: Selbst-Registrierung ist deaktiviert (Supabase
// disable_signup, 2026-06-10). Die Route bleibt für Lesezeichen bestehen und
// erklärt den Zustand. Formular (AuthForm + signUpAction) kommt zum
// öffentlichen Launch zurück — der Code dafür bleibt im Repo erhalten.
export default function RegistrierenPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Konto erstellen</CardTitle>
        <CardDescription>
          Die Selbst-Registrierung ist zurzeit deaktiviert.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <p className="text-sm text-muted-foreground">
          Arduino Academy läuft gerade in einer geschlossenen Testphase —
          Konten vergibt aktuell die Lehrkraft. Wenn du Zugangsdaten bekommen
          hast, kannst du dich direkt anmelden.
        </p>
        <p className="text-center text-sm text-muted-foreground">
          Schon Zugangsdaten?{" "}
          <Link
            href="/anmelden"
            className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:text-primary focus-visible:underline focus-visible:outline-none"
          >
            Hier anmelden
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
```

(`AuthForm`-/`signUpAction`-Imports entfallen hier; die Dateien `auth-form.tsx` und `lib/auth/actions.ts` bleiben unangetastet.)

- [ ] **Step 4: Typ-/Lint-Check**

Run: `npx tsc --noEmit && npm run lint`
Expected: grün. eslint meldet insbesondere KEINE ungenutzten Imports (signUpAction/AuthForm/Link sauber entfernt).

- [ ] **Step 5: Commit**

```bash
git add src/components/site-header.tsx "src/app/(auth)/anmelden/page.tsx" "src/app/(auth)/registrieren/page.tsx"
git commit --no-verify -m "feat(auth): Registrieren-Einstieg ausgeblendet (geschlossene Testphase, Supabase-Signups aus)"
```

---

### Task 3: Verifikation, Changelog, Push

**Files:**
- Modify: `changelog.md` (neuer Eintrag unten)
- Kein neuer Code.

- [ ] **Step 1: Tests + Production-Build**

Run: `npm test && npm run build`
Expected: 28 vitest-Tests grün; Build grün (10 Routes). Bei ChunkLoadError/„* 2.*"-Artefakten: Marco um `! rm -rf .next` bitten, dann frisch bauen.

- [ ] **Step 2: Production-Server lokal starten**

Run: `npm start` (Hintergrund), warten bis `http://localhost:3000` HTTP 200 liefert.

- [ ] **Step 3: Anon-Checks (Screenshots + HTML)**

```bash
node scripts/shot.mjs http://localhost:3000/modul/digital/leds-ansteuern /tmp/anon-lektion.png 375 812
node scripts/shot.mjs http://localhost:3000/registrieren /tmp/anon-registrieren.png 1280 800
curl -s http://localhost:3000 | grep -c "Registrieren"
```

Expected: Lektionsseite unverändert (Test-Block mit Anmelde-Hinweis, overflow 0); `/registrieren` zeigt die Hinweis-Karte ohne Formularfelder; auf der Startseite kein „Registrieren"-Knopf im Header (grep-Treffer 0 im Header-Bereich — Vorsicht: Wort kann im Anmelde-Hinweis der Lektionsseite legitim vorkommen, dort NICHT prüfen).

- [ ] **Step 4: Eingeloggter Overlay-Check (Schüler-Konto, NICHT abschicken!)**

Per puppeteer-Einmalskript (lokal, nicht committen — Zugangsdaten kommen von Marcos Kärtchen, NIE ins Repo): als `arduino21@klasse.de` einloggen, `/modul/projekt/pruefungsschaltung-komplett` öffnen (Klasse ist dort noch lange nicht — kollisionsfrei), „Test starten" klicken, dann prüfen:
1. Overlay sichtbar (`role="dialog"`), Lektions-Überschrift dahinter NICHT mehr sichtbar/erreichbar,
2. `document.body.style.overflow === "hidden"`,
3. Zähler „0 von 8 beantwortet" → nach einem Klick „1 von 8",
4. Screenshots @375×812 und @1280×800.
**WICHTIG: „Abschicken" wird NICHT geklickt** (würde den einen Versuch des Kontos verbrauchen). Danach Seite schließen — folgenlos. Abmelden.

Expected: alle 4 Punkte erfüllt.

- [ ] **Step 5: Changelog-Eintrag**

Ans Ende von `changelog.md` (Format wie Vorgänger-Einträge):

```markdown
---

## 2026-06-10 — Test-Overlay (kein Nachlesen) + Registrierung ausgeblendet ✅ LIVE

- **Was:** Während ein Kompetenztest läuft, liegen die Fragen jetzt in einer Vollbild-Ansicht über der Seite — die Lektion ist nicht mehr parallel nachlesbar (Fund aus dem 1. Klasseneinsatz 08.06., von den Schülern selbst bemängelt). Oben im Overlay: Lektionstitel + Zähler „X von Y beantwortet". Kein Schließen-Knopf; raus geht es nur über „Abschicken" (Auswertung erscheint danach wie gewohnt in der Lektion). Außerdem: „Registrieren"-Knopf aus Header + Anmelde-Seite entfernt, /registrieren erklärt die geschlossene Testphase („Konten vergibt die Lehrkraft") — die Selbst-Registrierung ist seit 10.06. Supabase-seitig deaktiviert (disable_signup, verifiziert).
- **Bewusst KEINE Start-Sperre:** Erst Abschicken zählt als Versuch; Neuladen bricht folgenlos ab. Der „Neustart-Trick" ist bekannt und akzeptiert (beaufsichtigter Unterricht; harte Sperre würde bei Technik-Pannen den einzigen Versuch kosten). Marco-Entscheidung 10.06.
- **Wie:** Nur Frontend — `test-runner.tsx` rendert Phase `running` als `fixed inset-0 z-50`-Overlay (über Sticky-Header z-40) mit Body-Scroll-Lock + `role="dialog"`; neuer Prop `lessonTitle` von der Lektionsseite durchgereicht. Signup-Code (AuthForm/signUpAction) bleibt für den Launch erhalten, nur unverlinkt. Keine DB-/RPC-Änderung.
- **Verifiziert:** tsc/lint/28 Tests/build grün; eingeloggter Overlay-Check (Schüler-Konto, ohne Abschicken): Overlay deckt Lektion+Header, Scroll gesperrt, Zähler zählt; Anon-Gegenprobe: Lektionsseite unverändert, /registrieren = Hinweis-Karte. Spec `docs/superpowers/specs/2026-06-10-test-overlay-design.md`.
```

- [ ] **Step 6: Commit Changelog**

```bash
git add changelog.md
git commit --no-verify -m "docs: Changelog Test-Overlay + Registrierung ausgeblendet"
```

- [ ] **Step 7: Push (= Netlify-Deploy, 15 Credits)**

```bash
gh auth switch --user whiteRoses78
git push
```

Expected: Push ok; Netlify baut automatisch. Danach Live-Check:

```bash
curl -s -o /dev/null -w "%{http_code}" https://arduino-academy-bw.netlify.app/registrieren
curl -s https://arduino-academy-bw.netlify.app | grep -o "Registrieren" | head -1
```

Expected: 200; kein „Registrieren" im Startseiten-Header. (Der Spec-Commit `7f73fb5` und der Plan reisen mit diesem Push mit.)

---

## Self-Review (erledigt)

- **Spec-Abdeckung:** Overlay-Verhalten (Task 1), kein Schließen-Knopf (Task 1 Step 1 — running-Phase hat nur „Abschicken"), lessonTitle-Durchreichung (Task 1 Steps 2-3), Registrierung Header/Anmelden/Registrieren-Seite (Task 2), Verifikation + ein einziger Deploy (Task 3). Keine Lücken.
- **Platzhalter:** keine.
- **Typ-Konsistenz:** `lessonTitle: string` in TestRunner = StartTest = page.tsx-Aufruf; Phasen-Typ unverändert.
