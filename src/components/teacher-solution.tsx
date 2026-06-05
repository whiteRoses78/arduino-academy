import type { LessonSolution } from "@/lib/lessons";

// Klappbarer Lehrer-Block (natives <details>, kein JS). Zeigt nur gefüllte
// Felder; rendert nichts, wenn alle leer. Steht außerhalb des .lesson-content-
// Scopes -> Tailwind-Tokens. Primär-getönt, klar als Lehrer-Bereich markiert.
const FIELDS: {
  key: "sketch" | "wiring" | "mistakes" | "didactics";
  label: string;
  icon: string;
  code?: boolean;
}[] = [
  { key: "sketch", label: "Musterlösung (Sketch)", icon: "📋", code: true },
  { key: "wiring", label: "Aufbau", icon: "🔌" },
  { key: "mistakes", label: "Häufige Fehler", icon: "⚠️" },
  { key: "didactics", label: "Didaktik", icon: "🎓" },
];

export function TeacherSolution({ solution }: { solution: LessonSolution }) {
  const filled = FIELDS.filter((f) => {
    const v = solution[f.key];
    return typeof v === "string" && v.trim() !== "";
  });
  if (filled.length === 0) return null;

  return (
    <details className="mt-10 rounded-lg border border-primary/30 bg-primary/5 px-5 py-4">
      <summary className="cursor-pointer font-semibold text-primary">
        🔒 Für Lehrer: Lösung &amp; Hinweise
      </summary>
      <div className="mt-4 space-y-5">
        {filled.map((f) => (
          <section key={f.key}>
            <h3 className="text-sm font-semibold">
              {f.icon} {f.label}
            </h3>
            {f.code ? (
              <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-sm">
                <code>{solution[f.key]}</code>
              </pre>
            ) : (
              <p className="mt-1 whitespace-pre-wrap text-sm">
                {solution[f.key]}
              </p>
            )}
          </section>
        ))}
      </div>
    </details>
  );
}
