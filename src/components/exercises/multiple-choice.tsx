"use client";

import { useEffect, useRef, useState } from "react";
import { shuffleMc, type MultipleChoicePayload } from "@/lib/exercises";
import { cn } from "@/lib/utils";

export function MultipleChoice({
  payload,
  seed,
  onSolved,
}: {
  payload: MultipleChoicePayload;
  seed: string;
  onSolved?: () => void;
}) {
  // Einmal deterministisch mischen (kein Positions-Bias, SSR-stabil).
  const [p] = useState(() => shuffleMc(payload, seed));
  const [eliminated, setEliminated] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [feedback, setFeedback] = useState<{ html: string; correct: boolean } | null>(
    null,
  );

  // Meldet einmal nach oben, sobald richtig geloest (Abschluss-Erkennung).
  const reported = useRef(false);
  useEffect(() => {
    if (solved && !reported.current) {
      reported.current = true;
      onSolved?.();
    }
  }, [solved, onSolved]);

  function choose(i: number) {
    if (solved || eliminated.includes(i)) return;
    if (i === p.correct) {
      setSolved(true);
      setFeedback({ html: p.explanation, correct: true });
    } else {
      setEliminated((e) => [...e, i]);
      const wrong =
        p.wrongExplanations?.[String(i)] ??
        p.hint ??
        "Leider falsch. Versuch es nochmal!";
      setFeedback({ html: wrong, correct: false });
    }
  }

  return (
    <div className="space-y-3">
      <p className="font-medium" dangerouslySetInnerHTML={{ __html: p.question }} />
      <div className="grid gap-2">
        {p.options.map((opt, i) => {
          const isCorrect = solved && i === p.correct;
          const isWrong = eliminated.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={solved || isWrong}
              className={cn(
                "rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isCorrect && "border-primary bg-primary/10 font-medium",
                isWrong && "border-destructive bg-destructive/10 text-muted-foreground line-through",
                !isCorrect &&
                  !isWrong &&
                  "border-border bg-card hover:border-primary hover:bg-accent",
              )}
              dangerouslySetInnerHTML={{ __html: opt }}
            />
          );
        })}
      </div>
      {feedback && (
        <div
          className={cn(
            "rounded-lg border-l-4 px-4 py-3 text-sm",
            feedback.correct
              ? "border-primary bg-primary/10"
              : "border-destructive bg-destructive/10",
          )}
          dangerouslySetInnerHTML={{ __html: feedback.html }}
        />
      )}
    </div>
  );
}
