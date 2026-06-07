import Link from "next/link";
import { TestRunner } from "./test-runner";

// Abgesetzter "Kompetenztest"-Block auf der Lektionsseite (Server Component).
// Zeigt den Test-Runner nur für eingeloggte User; sonst Anmelde-Hinweis.
export function StartTest({
  lessonId,
  isLoggedIn,
}: {
  lessonId: string;
  isLoggedIn: boolean;
}) {
  return (
    <section
      aria-label="Kompetenztest"
      className="mt-10 rounded-lg border border-border bg-muted px-5 py-5"
    >
      <h2 className="m-0 text-xl font-semibold">📝 Kompetenztest</h2>
      <p className="mt-2 mb-4 text-sm text-muted-foreground">
        Ein Versuch — das Ergebnis zählt. Am besten im Unterricht bearbeiten.
      </p>
      {isLoggedIn ? (
        <TestRunner lessonId={lessonId} />
      ) : (
        <p className="text-sm text-muted-foreground">
          Zum Testen bitte zuerst{" "}
          <Link href="/anmelden" className="text-primary hover:underline">
            anmelden
          </Link>
          .
        </p>
      )}
    </section>
  );
}
