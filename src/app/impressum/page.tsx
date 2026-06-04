import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Impressum</h1>

      <div className="mt-8 space-y-4 leading-relaxed text-foreground/90">
        <p>
          Diese Anwendung befindet sich in einer{" "}
          <strong>geschlossenen Testphase</strong> und ist kein öffentlich
          verfügbares Angebot. Sie wird derzeit ausschließlich zu Erprobungs-
          und Lernzwecken mit einem begrenzten Kreis von Testnutzerinnen und
          Testnutzern eingesetzt.
        </p>
        <p>
          Ein vollständiges Impressum gemäß § 5 DDG (Digitale-Dienste-Gesetz)
          wird vor einer öffentlichen Veröffentlichung ergänzt.
        </p>
      </div>
    </main>
  );
}
