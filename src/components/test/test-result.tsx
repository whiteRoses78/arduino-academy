import { cn } from "@/lib/utils";
import type { TestQuestion, TestResult } from "@/lib/test/types";

// Ergebnis-Ansicht NACH dem Abschicken: Punktzahl/Prozent + Auflösung pro Frage.
// Erst hier wird die richtige Antwort (correct) + Erklärung sichtbar.
export function TestResultView({
  questions,
  result,
}: {
  questions: TestQuestion[];
  result: TestResult;
}) {
  const byId = new Map(result.results.map((r) => [r.id, r]));

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-primary/30 bg-primary/5 px-5 py-4 text-center">
        <p className="text-3xl font-bold text-primary">
          {result.score} / {result.max_score}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{result.percent} %</p>
      </div>

      <p className="text-sm text-muted-foreground">
        Das war dein einziger Versuch — das Ergebnis ist gespeichert.
      </p>

      <div className="space-y-6">
        {questions.map((q, qi) => {
          const r = byId.get(q.id);
          return (
            <div key={q.id} className="space-y-2">
              <p className="font-medium">
                <span className="text-muted-foreground">{qi + 1}. </span>
                <span dangerouslySetInnerHTML={{ __html: q.question }} />
              </p>
              <div className="grid gap-2">
                {q.options.map((opt, i) => {
                  const isCorrect = r?.correct === i;
                  const isChosenWrong = r?.selected === i && !r?.is_correct;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm",
                        isCorrect && "border-primary bg-primary/10 font-medium",
                        isChosenWrong &&
                          "border-destructive bg-destructive/10 text-muted-foreground line-through",
                        !isCorrect && !isChosenWrong && "border-border",
                      )}
                    >
                      <span dangerouslySetInnerHTML={{ __html: opt }} />
                      {isCorrect && (
                        <span className="ml-2 shrink-0 text-xs font-medium text-primary">
                          ✓ richtig
                        </span>
                      )}
                      {isChosenWrong && (
                        <span className="ml-2 shrink-0 text-xs font-medium text-destructive no-underline">
                          deine Wahl
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              {r?.explanation && (
                <div
                  className="rounded-lg border-l-4 border-primary bg-primary/5 px-4 py-2 text-sm"
                  dangerouslySetInnerHTML={{ __html: r.explanation }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
