import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isDue, todayStr } from "@/lib/leitner";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Dashboard" };

type LessonRef = {
  title: string;
  module: string;
  slug: string;
} | null;

// Supabase liefert die verbundene Lektion je nach Inferenz als Objekt oder
// (selten) als 1-Element-Array -> robust entpacken.
function lessonOf(lessons: LessonRef | LessonRef[]): LessonRef {
  return Array.isArray(lessons) ? (lessons[0] ?? null) : lessons;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // Fallback — der eigentliche Schutz sitzt in proxy.ts.
  if (!user) redirect("/anmelden");

  const { data: rows } = await supabase
    .from("user_progress")
    .select("status, box, due_date, confidence, lessons(title, module, slug)")
    .eq("user_id", user.id);

  const { count: totalLessons } = await supabase
    .from("lessons")
    .select("id", { count: "exact", head: true });

  const progress = rows ?? [];
  const today = todayStr();

  const completed = progress.filter((p) => p.status === "completed");
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
        {completed.length} von {totalLessons ?? "?"} Lektionen abgeschlossen.
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
            {due.map((p, i) => {
              const l = lessonOf(p.lessons);
              if (!l) return null;
              return (
                <li key={i}>
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
        <h2 className="text-xl font-semibold tracking-tight">Abgeschlossen</h2>
        {completed.length === 0 ? (
          <div className="mt-3">
            <p className="text-sm text-muted-foreground">
              Noch keine Lektion abgeschlossen.
            </p>
            <Button asChild className="mt-4">
              <Link href="/modul/grundlagen">Mit den Grundlagen starten</Link>
            </Button>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {completed.map((p, i) => {
              const l = lessonOf(p.lessons);
              if (!l) return null;
              return (
                <li key={i}>
                  <Link
                    href={`/modul/${l.module}/${l.slug}`}
                    className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary hover:bg-accent"
                  >
                    <span>{l.title}</span>
                    <span className="text-xs text-muted-foreground">
                      Fach {p.box}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
