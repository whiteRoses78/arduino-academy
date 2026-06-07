import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth/role";
import { canViewSolutions } from "@/lib/roles";
import { getLesson } from "@/lib/lessons";

export const metadata: Metadata = { title: "Test-Ergebnisse" };

// Lehrer-/Admin-Übersicht der Kompetenztest-Ergebnisse. Durchstich: feste
// LEDs-Lektion. Daten via SECURITY-DEFINER-RPC list_test_results (RLS + RPC
// erlauben den Blick auf fremde Konten nur teacher/admin). Klarnamen bleiben
// offline (Zuordnung über die Zugangskärtchen).
export default async function TeacherTestsPage() {
  if (!canViewSolutions(await getCurrentUserRole())) redirect("/");

  const lesson = await getLesson("digital", "leds-ansteuern");
  const supabase = await createClient();
  const { data: results } = lesson
    ? await supabase.rpc("list_test_results", { p_lesson_id: lesson.id })
    : { data: null };
  const rows = results ?? [];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Test-Ergebnisse</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Lektion: <strong>LEDs ansteuern</strong>. Die Zuordnung zum echten Namen
        läuft über die Zugangskärtchen.
      </p>

      {rows.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Noch keine Ergebnisse — sobald Schüler den Test gemacht haben,
          erscheinen sie hier.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Konto</th>
                <th className="py-2 pr-4 font-medium">Punkte</th>
                <th className="py-2 pr-4 font-medium">Prozent</th>
                <th className="py-2 font-medium">Wann</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 pr-4">{r.display_name}</td>
                  <td className="py-2 pr-4 tabular-nums">
                    {r.score} / {r.max_score}
                  </td>
                  <td className="py-2 pr-4 tabular-nums">{r.percent} %</td>
                  <td className="py-2 text-muted-foreground">
                    {new Date(r.created_at).toLocaleString("de-DE", {
                      dateStyle: "short",
                      timeStyle: "short",
                      timeZone: "Europe/Berlin",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-8">
        <Link href="/" className="text-sm text-primary hover:underline">
          ← Zur Übersicht
        </Link>
      </p>
    </main>
  );
}
