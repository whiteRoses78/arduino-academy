import type { LessonPart } from "@/lib/parts";

// "Das brauchst du"-Block ganz oben in praktischen Lektionen. Server-Komponente
// (kein State). Rendert nichts, wenn keine Bauteile da sind (Theorie-Lektionen).
// Styling via Theme-Tokens (bg-muted/border-border) -> dark-mode-fest und optisch
// konsistent mit der info-card aus dem Content. Steht ausserhalb des
// .lesson-content-Scopes, darum Tailwind-Utilities statt der gescopten Klasse.
export function PartsList({ parts }: { parts: LessonPart[] }) {
  if (parts.length === 0) return null;

  return (
    <section
      aria-label="Benötigte Bauteile"
      className="mt-6 rounded-lg border border-border bg-muted px-5 py-4"
    >
      <h2 className="m-0 text-base font-semibold">🧰 Das brauchst du</h2>
      <ul className="mt-2 mb-0 space-y-1">
        {parts.map((part, i) => (
          <li key={i} className="flex gap-2">
            {part.qty !== undefined && (
              <span className="shrink-0 font-semibold tabular-nums text-primary">
                {part.qty}×
              </span>
            )}
            <span>{part.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
