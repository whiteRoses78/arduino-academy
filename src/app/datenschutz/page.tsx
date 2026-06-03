import type { Metadata } from "next";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Datenschutzerklärung
      </h1>

      <p className="mt-4 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        Hinweis: Diese Erklärung ist ein Entwurf mit Platzhaltern. Vor dem
        öffentlichen Launch wird sie geprüft und mit den echten Verantwortlichen-
        Daten vervollständigt.
      </p>

      <div className="mt-8 space-y-6 leading-relaxed text-foreground/90">
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Verantwortlicher
          </h2>
          <p className="mt-2">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist
            [Vorname Nachname], [Anschrift], [E-Mail-Adresse]. Siehe auch das{" "}
            <a href="/impressum" className="text-primary hover:underline">
              Impressum
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Welche Daten wir verarbeiten
          </h2>
          <p className="mt-2">
            Die Lerninhalte lassen sich ohne Anmeldung lesen und bearbeiten.
            Erst wenn du ein Konto anlegst, verarbeiten wir:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Kontodaten:</strong> E-Mail-Adresse und Passwort (das
              Passwort wird ausschließlich verschlüsselt gespeichert).
            </li>
            <li>
              <strong>Lernfortschritt:</strong> welche Lektionen du abgeschlossen
              hast, dein Wiederholungs-Status (Leitner-Fach, Fälligkeitsdatum)
              und deine Selbsteinschätzung.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Auftragsverarbeiter und Hosting
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Supabase</strong> (Datenbank und Authentifizierung):
              speichert Konto- und Fortschrittsdaten. Datenstandort je nach
              Projektregion (EU/US).
            </li>
            <li>
              <strong>Vercel</strong> (Hosting): liefert die Website aus und
              verarbeitet dabei technisch notwendige Server-Logs (u. a.
              IP-Adresse, Zeitpunkt des Zugriffs).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Deine Rechte</h2>
          <p className="mt-2">
            Du hast das Recht auf Auskunft, Berichtigung, Löschung und
            Einschränkung der Verarbeitung deiner Daten sowie auf
            Datenübertragbarkeit und Widerspruch. Wende dich dafür an die oben
            genannte verantwortliche Person.
          </p>
        </section>
      </div>
    </main>
  );
}
