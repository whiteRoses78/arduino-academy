import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Impressum</h1>

      <p className="mt-4 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        Hinweis: Diese Angaben sind Platzhalter und werden vor dem öffentlichen
        Launch durch die echten Anbieterdaten ersetzt.
      </p>

      <div className="mt-8 space-y-6 leading-relaxed text-foreground/90">
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Angaben gemäß § 5 TMG
          </h2>
          <p className="mt-2">
            [Vorname Nachname]
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ Ort]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Kontakt</h2>
          <p className="mt-2">
            Telefon: [Telefonnummer]
            <br />
            E-Mail: [E-Mail-Adresse]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Verantwortlich für den Inhalt
          </h2>
          <p className="mt-2">[Vorname Nachname], Anschrift wie oben</p>
        </section>
      </div>
    </main>
  );
}
