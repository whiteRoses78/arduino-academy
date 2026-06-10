import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth/role";
import { canViewSolutions } from "@/lib/roles";
import { getModules } from "@/lib/lessons";
import {
  accountGroup,
  GROUP_LABELS,
  GROUP_ORDER,
  type AccountGroup,
} from "@/lib/klassen";

export const metadata: Metadata = { title: "Test-Ergebnisse" };

// Lehrer-/Admin-Übersicht ALLER Kompetenztest-Ergebnisse als Matrix:
// je Modul ein Abschnitt, je Klasse eine Tabelle (Zeilen = Konten,
// Spalten = Lektionen, Zelle = Prozent). Daten via SECURITY-DEFINER-RPC
// list_all_test_results (nur teacher/admin; liefert auch versuchslose
// Schüler-Konten für die Fußnote). Klarnamen bleiben offline (Kärtchen).
type ResultRow = {
  email: string;
  display_name: string;
  module: string | null;
  lesson_slug: string | null;
  lesson_title: string | null;
  lesson_position: number | null;
  score: number | null;
  max_score: number | null;
  percent: number | null;
  created_at: string | null;
};

type LessonCol = { slug: string; title: string; position: number };
type Cell = { percent: number; score: number; maxScore: number; when: string };

const dateFmt = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Europe/Berlin",
});

export default async function TeacherTestsPage() {
  if (!canViewSolutions(await getCurrentUserRole())) redirect("/");

  const supabase = await createClient();
  const [{ data: results }, modules, { data: lessonRows }] = await Promise.all([
    supabase.rpc("list_all_test_results"),
    getModules(),
    supabase
      .from("lessons")
      .select("module, slug, title, position")
      .order("position", { ascending: true }),
  ]);
  const rows = (results ?? []) as ResultRow[];

  // Spalten: ALLE Lektionen je Modul (auch ungetestete), sortiert nach position.
  const lessonsByModule = new Map<string, LessonCol[]>();
  for (const l of lessonRows ?? []) {
    const list = lessonsByModule.get(l.module) ?? [];
    list.push({ slug: l.slug, title: l.title, position: l.position });
    lessonsByModule.set(l.module, list);
  }

  // Konten + Zellen aus den RPC-Zeilen aufbauen.
  const accounts = new Map<string, { name: string; group: AccountGroup }>();
  const cells = new Map<string, Cell>(); // key: email|module/slug
  const activeEmails = new Set<string>();
  const modulesWithAttempts = new Set<string>();
  for (const r of rows) {
    if (!accounts.has(r.email)) {
      accounts.set(r.email, {
        name: r.display_name,
        group: accountGroup(r.email),
      });
    }
    if (r.module === null || r.lesson_slug === null) continue; // ohne Versuch
    activeEmails.add(r.email);
    modulesWithAttempts.add(r.module);
    cells.set(`${r.email}|${r.module}/${r.lesson_slug}`, {
      percent: r.percent ?? 0,
      score: r.score ?? 0,
      maxScore: r.max_score ?? 0,
      when: r.created_at ? dateFmt.format(new Date(r.created_at)) : "",
    });
  }

  // Aktive Konten je Gruppe (Matrix-Zeilen) + inaktive je Gruppe (Fußnote).
  const rowsByGroup = new Map<AccountGroup, string[]>();
  const idleByGroup = new Map<AccountGroup, string[]>();
  for (const [email, info] of [...accounts.entries()].sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    const target = activeEmails.has(email) ? rowsByGroup : idleByGroup;
    target.set(info.group, [...(target.get(info.group) ?? []), email]);
  }

  const shownModules = modules.filter((m) => modulesWithAttempts.has(m.slug));
  const emptyModules = modules.filter((m) => !modulesWithAttempts.has(m.slug));

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Test-Ergebnisse</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Zeilen = Konten, Spalten = Lektionen, Zelle = Prozent (&bdquo;—&ldquo;
        = Test fehlt noch). Die Zuordnung zum echten Namen läuft über die
        Zugangskärtchen.
      </p>

      {rows.length === 0 && (
        <p className="mt-8 text-sm text-muted-foreground">
          Noch keine Ergebnisse — sobald Schüler Tests gemacht haben,
          erscheinen sie hier.
        </p>
      )}

      {shownModules.map((mod) => {
        const lessons = lessonsByModule.get(mod.slug) ?? [];
        const moduleNo = modules.findIndex((m) => m.slug === mod.slug) + 1;
        return (
          <section key={mod.slug} className="mt-10">
            <h2 className="text-xl font-semibold">
              Modul {moduleNo} — {mod.title}
            </h2>

            {GROUP_ORDER.map((group) => {
              const groupRows = rowsByGroup.get(group) ?? [];
              if (groupRows.length === 0) return null;
              return (
                <div key={group} className="mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {GROUP_LABELS[group]}
                  </h3>
                  <div className="mt-2 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-muted-foreground">
                          <th className="py-2 pr-4 font-medium">Konto</th>
                          {lessons.map((l) => (
                            <th
                              key={l.slug}
                              title={l.title}
                              className="px-2 py-2 text-center font-medium"
                            >
                              L{l.position}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {groupRows.map((email) => (
                          <tr key={email} className="border-b border-border/50">
                            <td className="py-2 pr-4">
                              {accounts.get(email)?.name ?? email}
                            </td>
                            {lessons.map((l) => {
                              const cell = cells.get(
                                `${email}|${mod.slug}/${l.slug}`,
                              );
                              return (
                                <td
                                  key={l.slug}
                                  title={
                                    cell
                                      ? `${cell.score}/${cell.maxScore} Punkte · ${cell.when}`
                                      : "Test fehlt noch"
                                  }
                                  className="px-2 py-2 text-center tabular-nums"
                                >
                                  {cell ? `${cell.percent} %` : "—"}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                        <tr className="text-muted-foreground">
                          <td className="py-2 pr-4">Ø</td>
                          {lessons.map((l) => {
                            const vals = groupRows
                              .map(
                                (email) =>
                                  cells.get(`${email}|${mod.slug}/${l.slug}`)
                                    ?.percent,
                              )
                              .filter((v): v is number => v !== undefined);
                            const avg = vals.length
                              ? Math.round(
                                  vals.reduce((s, v) => s + v, 0) / vals.length,
                                )
                              : null;
                            return (
                              <td
                                key={l.slug}
                                className="px-2 py-2 text-center tabular-nums"
                              >
                                {avg === null ? "—" : `${avg} %`}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}

            <p className="mt-3 text-xs text-muted-foreground">
              {lessons.map((l) => `L${l.position} = ${l.title}`).join(" · ")}
            </p>
          </section>
        );
      })}

      {GROUP_ORDER.map((group) => {
        const idle = idleByGroup.get(group) ?? [];
        if (idle.length === 0 || group === "weitere") return null;
        return (
          <p key={group} className="mt-6 text-xs text-muted-foreground">
            {GROUP_LABELS[group]} — noch kein Versuch:{" "}
            {idle.map((e) => accounts.get(e)?.name ?? e).join(", ")}
          </p>
        );
      })}

      {emptyModules.length > 0 && rows.length > 0 && (
        <p className="mt-6 text-xs text-muted-foreground">
          Noch keine Versuche in: {emptyModules.map((m) => m.title).join(", ")}
        </p>
      )}

      <p className="mt-8">
        <Link href="/" className="text-sm text-primary hover:underline">
          ← Zur Übersicht
        </Link>
      </p>
    </main>
  );
}
