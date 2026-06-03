"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { recordCompletion, todayStr } from "@/lib/leitner";

// Eingabe der Selbsteinschätzung: Lektion (uuid) + Sicherheitsgrad.
const inputSchema = z.object({
  lessonId: z.uuid(),
  confidence: z.enum(["low", "medium", "high"]),
});

export type SaveResult = { ok: true } | { ok: false; error: string };

// Schreibt Abschluss + Selbsteinschätzung in user_progress und berechnet per
// Leitner das neue Fach + Fälligkeit. Nur für eingeloggte Nutzer; RLS sorgt
// zusätzlich dafür, dass jeder nur seine eigene Zeile schreiben kann.
export async function saveLessonProgress(
  lessonId: string,
  confidence: string,
): Promise<SaveResult> {
  const parsed = inputSchema.safeParse({ lessonId, confidence });
  if (!parsed.success) {
    return { ok: false, error: "Ungültige Eingabe." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Bitte zuerst anmelden." };
  }

  try {
    // Aktuelles Fach holen — entscheidet Erstabschluss vs. Wiederholung.
    const { data: existing } = await supabase
      .from("user_progress")
      .select("box")
      .eq("user_id", user.id)
      .eq("lesson_id", parsed.data.lessonId)
      .maybeSingle();

    const update = recordCompletion(
      { box: existing?.box ?? null },
      parsed.data.confidence,
      todayStr(),
    );

    const nowIso = new Date().toISOString();
    const { error } = await supabase.from("user_progress").upsert({
      user_id: user.id,
      lesson_id: parsed.data.lessonId,
      status: update.status,
      box: update.box,
      due_date: update.due_date,
      last_reviewed: update.last_reviewed,
      confidence: update.confidence,
      updated_at: nowIso,
      // completed_at nur beim Erstabschluss setzen (bleibt danach erhalten).
      ...(existing ? {} : { completed_at: nowIso }),
    });

    if (error) {
      return { ok: false, error: "Speichern fehlgeschlagen." };
    }
  } catch {
    return { ok: false, error: "Speichern gerade nicht möglich." };
  }

  revalidatePath("/dashboard");
  return { ok: true };
}
