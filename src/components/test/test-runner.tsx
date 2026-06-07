"use client";

import { useState } from "react";
import { loadTest, submitTest } from "@/lib/test/actions";
import type { TestQuestion, TestResult, TestAnswers } from "@/lib/test/types";
import { TestQuestionMc } from "./test-question-mc";
import { TestResultView } from "./test-result";

type Phase = "intro" | "running" | "done" | "locked";

// Steuert den Test-Ablauf clientseitig: Start → Fragen sammeln → Abschicken →
// Ergebnis. Bewertung passiert serverseitig (submit_test); hier nur Anzeige.
export function TestRunner({ lessonId }: { lessonId: string }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [answers, setAnswers] = useState<TestAnswers>({});
  const [result, setResult] = useState<TestResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

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
    const allAnswered = questions.every((q) => answers[q.id] !== undefined);
    return (
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
