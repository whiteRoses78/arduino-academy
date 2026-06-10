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
