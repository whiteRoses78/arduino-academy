"use client";

import { useState } from "react";
import type { ExercisePayload } from "@/lib/exercises";
import { Exercise } from "./exercise";
import { SelfAssessment } from "./self-assessment";

type Item = { id: string; position: number; payload: ExercisePayload };

export function ExerciseSection({
  exercises,
  seedBase,
  lessonId,
  isLoggedIn,
}: {
  exercises: Item[];
  seedBase: string;
  lessonId: string;
  isLoggedIn: boolean;
}) {
  // IDs der richtig geloesten Uebungen. Lektion = abgeschlossen, wenn alle drin.
  const [solved, setSolved] = useState<Set<string>>(new Set());

  if (exercises.length === 0) return null;

  const allSolved = solved.size === exercises.length;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">Übungen</h2>
      <div className="mt-6 space-y-8">
        {exercises.map((ex, i) => (
          <div key={ex.id}>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Übung {i + 1}
            </p>
            <Exercise
              payload={ex.payload}
              seed={`${seedBase}E${ex.position}`}
              onSolved={() =>
                setSolved((prev) => {
                  if (prev.has(ex.id)) return prev;
                  const next = new Set(prev);
                  next.add(ex.id);
                  return next;
                })
              }
            />
          </div>
        ))}
      </div>
      {allSolved && (
        <SelfAssessment lessonId={lessonId} isLoggedIn={isLoggedIn} />
      )}
    </section>
  );
}
