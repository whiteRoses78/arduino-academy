import { notFound } from "next/navigation";
import Link from "next/link";
import { getLesson, getExercises, type LessonContent } from "@/lib/lessons";
import { createClient } from "@/lib/supabase/server";
import { LessonContentView } from "@/components/lesson-content";
import { ExerciseSection } from "@/components/exercises/exercise-section";
import type { ExercisePayload } from "@/lib/exercises";

type Props = { params: Promise<{ modul: string; lektion: string }> };

export async function generateMetadata({ params }: Props) {
  const { modul, lektion } = await params;
  const lesson = await getLesson(modul, lektion);
  return { title: lesson ? `${lesson.title} — Arduino Academy` : "Lektion" };
}

export default async function LessonPage({ params }: Props) {
  const { modul, lektion } = await params;
  const lesson = await getLesson(modul, lektion);
  if (!lesson) notFound();
  const content = lesson.content as LessonContent;
  const exercises = await getExercises(lesson.id);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href={`/modul/${modul}`}
        className="text-sm text-primary hover:underline"
      >
        ← Zur Übersicht
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        {lesson.title}
      </h1>
      <LessonContentView content={content} />
      <ExerciseSection
        exercises={exercises.map((e) => ({
          id: e.id,
          position: e.position,
          payload: e.payload as ExercisePayload,
        }))}
        seedBase={`L${lesson.legacy_id ?? 0}`}
        lessonId={lesson.id}
        isLoggedIn={!!user}
      />
    </main>
  );
}
