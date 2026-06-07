"use server";

import { createClient } from "@/lib/supabase/server";
import type { TestQuestion, TestResult, TestAnswers } from "./types";

// Die DEFINER-RPC-Fehler werden auf wenige, im UI behandelbare Codes gemappt.
type ErrorCode = "ALREADY_DONE" | "AUTH" | "GENERIC";

function classify(message: string): ErrorCode {
  if (message.includes("TEST_BEREITS_ABGELEGT")) return "ALREADY_DONE";
  if (message.includes("anmelden")) return "AUTH";
  return "GENERIC";
}

export type LoadResult =
  | { ok: true; questions: TestQuestion[] }
  | { ok: false; error: ErrorCode };

// Lädt die Testfragen OHNE Lösung (RPC strippt correct/explanation).
// Wirft serverseitig, wenn schon ein Versuch existiert -> ALREADY_DONE.
export async function loadTest(lessonId: string): Promise<LoadResult> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_test_questions", {
    p_lesson_id: lessonId,
  });
  if (error) return { ok: false, error: classify(error.message) };

  const questions: TestQuestion[] = (data ?? []).map((q) => ({
    id: q.id,
    position: q.position,
    type: "multiple-choice",
    question: q.question,
    options: Array.isArray(q.options) ? (q.options as string[]) : [],
  }));
  return { ok: true, questions };
}

export type SubmitResult =
  | { ok: true; result: TestResult }
  | { ok: false; error: ErrorCode };

// Schickt die Antworten ab. Bewertung + Speichern (genau ein Versuch) passieren
// serverseitig in der RPC; hier kommt nur das fertige Ergebnis zurück.
export async function submitTest(
  lessonId: string,
  answers: TestAnswers,
): Promise<SubmitResult> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("submit_test", {
    p_lesson_id: lessonId,
    p_answers: answers,
  });
  if (error) return { ok: false, error: classify(error.message) };
  return { ok: true, result: data as unknown as TestResult };
}
