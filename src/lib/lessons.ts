import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
export type ExerciseRow = Database["public"]["Tables"]["exercises"]["Row"];

// Form des content-JSONB (faithful zur Vanilla-Struktur lessons-grundlagen.js).
export type LessonContent = {
  explanation?: { html?: string };
  example?: { title?: string; steps?: { label: string; html: string }[] };
};

// Modul (= Kurs) + seine Lektionen, sortiert nach position. null = nicht gefunden.
export async function getModule(slug: string) {
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();
  if (!course) return null;

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", course.id)
    .order("position", { ascending: true });

  return { course, lessons: lessons ?? [] };
}

// Einzelne Lektion über Modul-Slug + Lektions-Slug. null = nicht gefunden.
export async function getLesson(moduleSlug: string, lessonSlug: string) {
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", moduleSlug)
    .single();
  if (!course) return null;

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", course.id)
    .eq("slug", lessonSlug)
    .single();

  return lesson; // Lesson | null
}

// Übungen einer Lektion, sortiert nach position.
export async function getExercises(lessonId: string): Promise<ExerciseRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("exercises")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("position", { ascending: true });
  return data ?? [];
}

// Feste didaktische Reihenfolge der Module. courses hat keine position-Spalte;
// diese Ordnung ist eine fachliche Entscheidung und soll re-seed-fest sein.
const MODULE_ORDER = ["grundlagen", "digital", "analog", "aktoren", "projekt"];

function moduleOrderIndex(slug: string): number {
  const i = MODULE_ORDER.indexOf(slug);
  return i === -1 ? MODULE_ORDER.length : i; // Unbekannte ans Ende
}

export type ModuleSummary = Course & { lessonCount: number };

// Alle Module (= Kurse) mit Lektionszahl, in didaktischer Reihenfolge.
export async function getModules(): Promise<ModuleSummary[]> {
  const supabase = await createClient();
  const [{ data: courses }, { data: lessons }] = await Promise.all([
    supabase.from("courses").select("*"),
    supabase.from("lessons").select("module"),
  ]);
  if (!courses) return [];

  const counts = new Map<string, number>();
  for (const l of lessons ?? []) {
    counts.set(l.module, (counts.get(l.module) ?? 0) + 1);
  }

  return courses
    .map((c) => ({ ...c, lessonCount: counts.get(c.slug) ?? 0 }))
    .sort((a, b) => moduleOrderIndex(a.slug) - moduleOrderIndex(b.slug));
}
