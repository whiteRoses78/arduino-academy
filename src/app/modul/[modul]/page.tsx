import { notFound } from "next/navigation";
import Link from "next/link";
import { getModule } from "@/lib/lessons";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { params: Promise<{ modul: string }> };

export async function generateMetadata({ params }: Props) {
  const { modul } = await params;
  const data = await getModule(modul);
  return { title: data ? `${data.course.title} — Arduino Academy` : "Modul" };
}

export default async function ModulePage({ params }: Props) {
  const { modul } = await params;
  const data = await getModule(modul);
  if (!data) notFound();
  const { course, lessons } = data;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{course.title}</h1>
      {course.description && (
        <p className="mt-2 text-muted-foreground">{course.description}</p>
      )}

      <ol className="mt-8 flex flex-col gap-3">
        {lessons.map((l) => (
          <li key={l.id}>
            <Link
              href={`/modul/${modul}/${l.slug}`}
              className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Card className="transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:ring-foreground/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {l.position}
                  </span>
                  <CardTitle className="text-lg">{l.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
