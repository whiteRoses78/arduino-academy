"use client";

import { useEffect, useRef, useState } from "react";
import { seededOrder, type OrderingPayload } from "@/lib/exercises";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Ordering({
  payload,
  seed,
  onSolved,
}: {
  payload: OrderingPayload;
  seed: string;
  onSolved?: () => void;
}) {
  // current = aktuelle Reihenfolge als Original-Indizes, deterministisch gemischt.
  const [current, setCurrent] = useState<number[]>(() =>
    seededOrder(payload.items.length, seed),
  );
  const [checked, setChecked] = useState(false);

  const correct = payload.correctOrder;
  const isDone = current.every((v, i) => v === correct[i]);
  const solved = checked && isDone;

  // Meldet einmal nach oben, sobald richtig geloest (Abschluss-Erkennung).
  const reported = useRef(false);
  useEffect(() => {
    if (solved && !reported.current) {
      reported.current = true;
      onSolved?.();
    }
  }, [solved, onSolved]);
  const correctCount = current.filter((v, i) => v === correct[i]).length;

  function move(pos: number, dir: -1 | 1) {
    const j = pos + dir;
    if (j < 0 || j >= current.length) return;
    setCurrent((c) => {
      const n = [...c];
      [n[pos], n[j]] = [n[j], n[pos]];
      return n;
    });
    setChecked(false);
  }

  return (
    <div className="space-y-3">
      <p className="font-medium" dangerouslySetInnerHTML={{ __html: payload.question }} />
      <ol className="space-y-2">
        {current.map((origIdx, pos) => (
          <li
            key={origIdx}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2 text-sm",
              checked
                ? current[pos] === correct[pos]
                  ? "border-primary bg-primary/10"
                  : "border-destructive bg-destructive/10"
                : "border-border bg-card",
            )}
          >
            <span
              className="flex-1"
              dangerouslySetInnerHTML={{ __html: payload.items[origIdx] }}
            />
            <span className="flex shrink-0 flex-col leading-none">
              <button
                type="button"
                onClick={() => move(pos, -1)}
                disabled={pos === 0 || solved}
                aria-label="nach oben"
                className="px-2 py-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => move(pos, 1)}
                disabled={pos === current.length - 1 || solved}
                aria-label="nach unten"
                className="px-2 py-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                ▼
              </button>
            </span>
          </li>
        ))}
      </ol>
      {!solved ? (
        <div className="space-y-2">
          <Button type="button" variant="secondary" onClick={() => setChecked(true)}>
            Prüfen
          </Button>
          {checked && !isDone && (
            <p className="text-sm text-destructive">
              {correctCount} von {current.length} an der richtigen Position.
            </p>
          )}
        </div>
      ) : (
        <div
          className="rounded-lg border-l-4 border-primary bg-primary/10 px-4 py-3 text-sm"
          dangerouslySetInnerHTML={{ __html: payload.explanation }}
        />
      )}
    </div>
  );
}
