"use client";

import { cn } from "@/lib/utils";
import type { TestQuestion } from "@/lib/test/types";

// Eine Multiple-Choice-Frage im TEST-Modus: zeigt nur Frage + Optionen, markiert
// die Auswahl — KEIN richtig/falsch-Feedback (anders als die Übungs-Variante).
// Die richtige Antwort ist hier gar nicht bekannt (kommt erst nach dem Abschicken).
export function TestQuestionMc({
  question,
  index,
  selected,
  onSelect,
}: {
  question: TestQuestion;
  index: number;
  selected: number | null;
  onSelect: (optionIndex: number) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="font-medium">
        <span className="text-muted-foreground">{index + 1}. </span>
        <span dangerouslySetInnerHTML={{ __html: question.question }} />
      </p>
      <div className="grid gap-2">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={isSelected}
              className={cn(
                "rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "border-primary bg-primary/10 font-medium"
                  : "border-border bg-card hover:border-primary hover:bg-accent",
              )}
              dangerouslySetInnerHTML={{ __html: opt }}
            />
          );
        })}
      </div>
    </div>
  );
}
