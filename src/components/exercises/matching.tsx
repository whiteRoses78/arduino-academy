"use client";

import { useEffect, useRef, useState } from "react";
import { decodeEntities, seededOrder, type MatchingPayload } from "@/lib/exercises";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Matching({
  payload,
  seed,
  onSolved,
}: {
  payload: MatchingPayload;
  seed: string;
  onSolved?: () => void;
}) {
  const rights = payload.pairs.map((p) => p.right);
  // Rechte Begriffe deterministisch gemischt (sonst stünden sie direkt daneben).
  const [order] = useState(() => seededOrder(rights.length, seed));
  const shuffledRights = order.map((i) => rights[i]);

  // Pro linker Zeile: gewählter Index in shuffledRights (oder null).
  const [selection, setSelection] = useState<(number | null)[]>(() =>
    payload.pairs.map(() => null),
  );
  const [checked, setChecked] = useState(false);

  const isRowCorrect = (i: number) =>
    selection[i] !== null && shuffledRights[selection[i]!] === payload.pairs[i].right;
  const allCorrect = payload.pairs.every((_, i) => isRowCorrect(i));
  const solved = checked && allCorrect;

  // Meldet einmal nach oben, sobald richtig geloest (Abschluss-Erkennung).
  const reported = useRef(false);
  useEffect(() => {
    if (solved && !reported.current) {
      reported.current = true;
      onSolved?.();
    }
  }, [solved, onSolved]);

  return (
    <div className="space-y-3">
      <p className="font-medium" dangerouslySetInnerHTML={{ __html: payload.question }} />
      <div className="space-y-2">
        {payload.pairs.map((pair, i) => (
          <div key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span
              className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm"
              dangerouslySetInnerHTML={{ __html: pair.left }}
            />
            <span className="shrink-0 text-muted-foreground">→</span>
            <select
              className={cn(
                "flex-1 rounded-lg border bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                checked && selection[i] !== null
                  ? isRowCorrect(i)
                    ? "border-primary bg-primary/10"
                    : "border-destructive bg-destructive/10"
                  : "border-border",
              )}
              value={selection[i] ?? ""}
              disabled={solved}
              onChange={(e) => {
                const v = e.target.value === "" ? null : Number(e.target.value);
                setSelection((s) => s.map((x, idx) => (idx === i ? v : x)));
                setChecked(false);
              }}
            >
              <option value="">– wählen –</option>
              {shuffledRights.map((r, ri) => (
                <option key={ri} value={ri}>
                  {decodeEntities(r)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {!solved && (
        <Button
          type="button"
          variant="secondary"
          onClick={() => setChecked(true)}
          disabled={selection.some((s) => s === null)}
        >
          Prüfen
        </Button>
      )}
      {checked && !allCorrect && (
        <p className="text-sm text-destructive">
          Noch nicht ganz — die rot markierten Zuordnungen stimmen nicht.
        </p>
      )}
      {solved && (
        <div
          className="rounded-lg border-l-4 border-primary bg-primary/10 px-4 py-3 text-sm"
          dangerouslySetInnerHTML={{ __html: payload.explanation }}
        />
      )}
    </div>
  );
}
