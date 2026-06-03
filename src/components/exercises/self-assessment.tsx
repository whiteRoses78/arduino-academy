"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { saveLessonProgress } from "@/lib/progress/actions";
import type { Confidence } from "@/lib/leitner";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Confidence; label: string; hint: string }[] = [
  { value: "low", label: "Noch unsicher", hint: "ganz bald wieder" },
  { value: "medium", label: "Ganz okay", hint: "bald wieder" },
  { value: "high", label: "Sitzt sicher", hint: "größerer Abstand" },
];

export function SelfAssessment({
  lessonId,
  isLoggedIn,
}: {
  lessonId: string;
  isLoggedIn: boolean;
}) {
  const [chosen, setChosen] = useState<Confidence | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function choose(confidence: Confidence) {
    if (chosen) return;
    setError(null);

    if (!isLoggedIn) {
      // Anonym: Einschätzung sichtbar machen, aber nicht speichern (Nudge).
      setChosen(confidence);
      return;
    }

    startTransition(async () => {
      const res = await saveLessonProgress(lessonId, confidence);
      if (res.ok) {
        setChosen(confidence);
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <section className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight">
        Geschafft! Wie sicher fühlst du dich?
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Deine ehrliche Einschätzung steuert, wann diese Lektion zur Wiederholung
        dran ist.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => choose(o.value)}
            disabled={isPending || chosen !== null}
            aria-pressed={chosen === o.value}
            className={cn(
              "flex flex-col items-start gap-1 rounded-xl border px-4 py-3 text-left transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              chosen === o.value
                ? "border-primary bg-primary/10"
                : "border-border bg-background hover:border-primary hover:bg-accent",
              chosen !== null && chosen !== o.value && "opacity-50",
              chosen === null && "cursor-pointer",
            )}
          >
            <span className="font-medium">{o.label}</span>
            <span className="text-xs text-muted-foreground">{o.hint}</span>
          </button>
        ))}
      </div>

      {chosen && isLoggedIn && (
        <p className="mt-5 text-sm font-medium text-primary">
          Gespeichert ✓ — du findest die Lektion in deinem Dashboard wieder.
        </p>
      )}

      {chosen && !isLoggedIn && (
        <p className="mt-5 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
          Schön! Damit dein Fortschritt und die cleveren Wiederholungen
          gespeichert werden,{" "}
          <Link
            href="/registrieren"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            leg dir ein Konto an
          </Link>{" "}
          oder{" "}
          <Link
            href="/anmelden"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            melde dich an
          </Link>
          .
        </p>
      )}

      {error && <p className="mt-5 text-sm text-destructive">{error}</p>}
    </section>
  );
}
