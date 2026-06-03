import type { LessonContent } from "@/lib/lessons";

// Wickelt Content-Tabellen in einen horizontal scrollbaren Wrapper, damit breite
// Tabellen auf schmalen Screens scrollen statt die Seite zu sprengen (CSS: .table-wrap).
// Alle Content-Tabellen sind <table class="icon-table"> (keine Verschachtelung).
function wrapTables(html: string): string {
  return html
    .replaceAll(
      '<table class="icon-table">',
      '<div class="table-wrap"><table class="icon-table">',
    )
    .replaceAll("</table>", "</table></div>");
}

// Rendert den vertrauenswürdigen eigenen Lektions-HTML. dangerouslySetInnerHTML
// ist hier sicher: Content stammt aus unserer DB/Migration, kein User-Input.
export function LessonContentView({ content }: { content: LessonContent }) {
  return (
    <article className="lesson-content mt-6">
      {content.explanation?.html && (
        <div
          dangerouslySetInnerHTML={{
            __html: wrapTables(content.explanation.html),
          }}
        />
      )}

      {content.example && (content.example.steps?.length ?? 0) > 0 && (
        <section className="mt-10">
          {content.example.title && <h2>{content.example.title}</h2>}
          {content.example.steps!.map((step, i) => (
            <details key={i} className="example-step" open={i === 0}>
              <summary>{step.label}</summary>
              <div
                className="step-content"
                dangerouslySetInnerHTML={{ __html: wrapTables(step.html) }}
              />
            </details>
          ))}
        </section>
      )}
    </article>
  );
}
