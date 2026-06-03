import Link from "next/link";
import { getModules } from "@/lib/lessons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default async function Home() {
  const modules = await getModules();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12 sm:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Arduino Academy
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Technik verstehen für die Realschul-Abschlussprüfung — interaktiv, mit
          sofortigem Feedback und cleverem Wiederholen.
        </p>
      </div>

      {modules.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          Die Module konnten gerade nicht geladen werden. Bitte später erneut
          versuchen.
        </p>
      ) : (
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {modules.map((m, i) => (
            <li key={m.id} className="contents">
              <Link
                href={`/modul/${m.slug}`}
                className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Card className="h-full gap-3 transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:ring-foreground/20">
                  <CardHeader className="gap-2.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <CardTitle className="text-xl">{m.title}</CardTitle>
                    </div>
                    {m.description && (
                      <CardDescription>{m.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <span className="text-sm font-medium text-muted-foreground">
                      {m.lessonCount}{" "}
                      {m.lessonCount === 1 ? "Lektion" : "Lektionen"}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
