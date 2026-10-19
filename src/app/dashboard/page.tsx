import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckCircle2, Circle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getModules } from "@/lib/lessons";
import { isDue, todayStr } from "@/lib/leitner";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // Fallback — der eigentliche Schutz sitzt in proxy.ts.
  if (!user) redirect("/anmelden");

  const [modules, { data: lessonRows }, { data: rows }, { data: attempts }] =
    await Promise.all([
      getModules(),
      supabase
        .from("lessons")
        .select("id, title, module, slug, position")
        .order("position", { ascending: true }),
      supabase
        .from("user_progress")
        .select("lesson_id, status, box, due_date")
        .eq("user_id", user.id),
      // RLS liefert nur die eigenen Versuche (ein Versuch pro Lektion).
      supabase
        .from("test_attempts")
        .select("lesson_id, percent")
        .eq("user_id", user.id),
    ]);

  const lessons = lessonRows ?? [];
  const progress = rows ?? [];
  const today = todayStr();

  const lessonById = new Map(lessons.map((l) => [l.id, l]));
  const completedIds = new Set(
    progress.filter((p) => p.status === "completed").map((p) => p.lesson_id),
  );
  const testPercent = new Map(
    (attempts ?? []).map((a) => [a.lesson_id, a.percent]),
  );

  const due = progress
    .filter((p) => p.due_date && isDue(p.due_date, today))
    .sort((a, b) => (a.due_date! < b.due_date! ? -1 : 1));

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/" className="text-sm text-primary hover:underline">
        ← Alle Module
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        Dein Dashboard
      </h1>
      <p className="mt-2 text-muted-foreground">
        {completedIds.size} von {lessons.length} Lektionen abgeschlossen ·{" "}
        {testPercent.size} von {lessons.length} Kompetenztests gemacht
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight">
          Jetzt zur Wiederholung fällig
        </h2>
        {due.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Nichts fällig — gut gemacht! Schau später wieder vorbei.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {due.map((p) => {
              const l = lessonById.get(p.lesson_id);
              if (!l) return null;
              return (
                <li key={p.lesson_id}>
                  <Link
                    href={`/modul/${l.module}/${l.slug}`}
                    className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Card className="transition-shadow hover:shadow-md">
                      <CardHeader>
                        <CardTitle className="text-base">{l.title}</CardTitle>
                        <CardDescription>
                          Fach {p.box} · fällig seit {p.due_date}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Dein Fortschritt
        </h2>
        {completedIds.size === 0 && testPercent.size === 0 && (
          <Button asChild className="mt-4">
            <Link href="/modul/grundlagen">Mit den Grundlagen starten</Link>
          </Button>
        )}

        <div className="mt-4 space-y-8">
          {modules.map((m, i) => {
            const moduleLessons = lessons.filter((l) => l.module === m.slug);
            if (moduleLessons.length === 0) return null;
            const doneCount = moduleLessons.filter((l) =>
              completedIds.has(l.id),
            ).length;
            const testCount = moduleLessons.filter((l) =>
              testPercent.has(l.id),
            ).length;

            return (
              <div key={m.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold">
                    Modul {i + 1} – {m.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {doneCount}/{moduleLessons.length} Lektionen · {testCount}/
                    {moduleLessons.length} Tests
                  </span>
                </div>

                <ul className="mt-2 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                  {moduleLessons.map((l, j) => {
                    const done = completedIds.has(l.id);
                    const percent = testPercent.get(l.id);
                    return (
                      <li key={l.id}>
                        <Link
                          href={`/modul/${l.module}/${l.slug}`}
                          className="flex min-h-11 flex-col gap-1.5 px-4 py-3 text-sm transition-colors duration-150 ease-out hover:bg-accent focus-visible:bg-accent focus-visible:outline-none sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                        >
                          <span className="flex items-baseline gap-2">
                            <span className="w-5 shrink-0 text-xs text-muted-foreground">
                              {j + 1}
                            </span>
                            <span className="font-medium">{l.title}</span>
                          </span>
                          <span className="flex shrink-0 gap-4 pl-7 text-xs sm:pl-0">
                            <Status done={done}>
                              {done ? "Lektion fertig" : "Lektion offen"}
                            </Status>
                            <Status done={percent !== undefined}>
                              {percent !== undefined
                                ? `Test ${percent} %`
                                : "Test offen"}
                            </Status>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

// Kleines Status-Label: Häkchen (erledigt) oder leerer Kreis (offen).
function Status({
  done,
  children,
}: {
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 ${
        done ? "font-medium text-primary" : "text-muted-foreground"
      }`}
    >
      {done ? (
        <CheckCircle2 className="size-4" aria-hidden />
      ) : (
        <Circle className="size-4" aria-hidden />
      )}
      {children}
    </span>
  );
}
