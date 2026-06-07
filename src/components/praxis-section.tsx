import type { LessonPraxis } from "@/lib/lessons";

// Die Schaltplan-/Aufbau-Grafiken liegen in der Vanilla-Quelle als <img src="assets/…">
// (relativer Pfad). In den verschachtelten academy-Routen würde das ins Leere zeigen;
// die Dateien liegen hier unter public/assets/. Darum den Pfad auf absolut umbiegen.
function fixAssetPaths(html: string): string {
  return html.replaceAll('src="assets/', 'src="/assets/');
}

// Viele Praxis-Felder enthalten Inline-Formatierung aus der Vanilla-Quelle
// (<strong>, <code>, Entities wie &Omega; / &minus;). Diese sicher als HTML
// rendern — eigener Content aus DB/Migration, kein User-Input (wie LessonContentView).
function Rich({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

// "Praxis – selber bauen": Hands-on-Block am Ende einer praktischen Lektion
// (nach den Übungen, vor der Lehrer-Lösung). Server-Komponente, rein darstellend.
// Aussenrahmen über Theme-Tokens (dark-mode-fest, wie PartsList/TeacherSolution);
// die Inhalte stehen in einem .lesson-content-Wrapper, damit die vorhandenen
// Content-Stile greifen (h3, Listen, .tip-box, .code-card, responsive SVG).
export function PraxisSection({ praxis }: { praxis: LessonPraxis }) {
  const { aufgabe, bauteile, anschluss, code_hinweise } = praxis;

  const hasContent =
    aufgabe?.titel ||
    aufgabe?.auftrag ||
    aufgabe?.lernziel ||
    (bauteile?.length ?? 0) > 0 ||
    anschluss?.svg ||
    (anschluss?.schritte?.length ?? 0) > 0 ||
    code_hinweise?.geruest ||
    (code_hinweise?.tipps?.length ?? 0) > 0;
  if (!hasContent) return null;

  return (
    <section
      aria-label="Praxis"
      className="mt-10 rounded-lg border border-border bg-muted px-5 py-5"
    >
      <h2 className="m-0 text-xl font-semibold">🔧 Praxis – selber bauen</h2>

      <div className="lesson-content mt-4">
        {/* Aufgabe */}
        {aufgabe?.titel && <h3>{aufgabe.titel}</h3>}
        {aufgabe?.auftrag && (
          <div dangerouslySetInnerHTML={{ __html: aufgabe.auftrag }} />
        )}
        {aufgabe?.lernziel && (
          <div className="tip-box">
            <strong>Lernziel:</strong> <Rich html={aufgabe.lernziel} />
          </div>
        )}

        {/* Bauteile – mit didaktischen Hinweisen (Polung, Farbcode …) */}
        {(bauteile?.length ?? 0) > 0 && (
          <>
            <h3>Material für den Aufbau</h3>
            <ul>
              {bauteile!.map((b, i) => (
                <li key={i}>
                  {b.anzahl !== undefined && <strong>{b.anzahl}× </strong>}
                  <Rich html={b.name} />
                  {b.hinweis && (
                    <span className="text-muted-foreground">
                      {" — "}
                      <Rich html={b.hinweis} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Anschluss: Schaltplan + Aufbau-Grafik + nummerierte Aufbau-Schritte */}
        {anschluss?.svg && (
          <div dangerouslySetInnerHTML={{ __html: fixAssetPaths(anschluss.svg) }} />
        )}
        {(anschluss?.schritte?.length ?? 0) > 0 && (
          <>
            <h3>So baust du es auf</h3>
            <ol>
              {anschluss!.schritte!.map((s, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: s }} />
              ))}
            </ol>
          </>
        )}

        {/* Code-Gerüst (dunkle Terminal-Box) + Tipps */}
        {code_hinweise?.geruest && (
          <div className="code-card">
            <h4>Code-Gerüst</h4>
            <pre>
              <code>{code_hinweise.geruest}</code>
            </pre>
          </div>
        )}
        {(code_hinweise?.tipps?.length ?? 0) > 0 && (
          <div className="tip-box">
            <strong>Tipps:</strong>
            <ul>
              {code_hinweise!.tipps!.map((t, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: t }} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
