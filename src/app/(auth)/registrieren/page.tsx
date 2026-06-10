import Link from "next/link";
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Registrieren",
};

// Geschlossene Testphase: Selbst-Registrierung ist deaktiviert (Supabase
// disable_signup, 2026-06-10). Die Route bleibt für Lesezeichen bestehen und
// erklärt den Zustand. Formular (AuthForm + signUpAction) kommt zum
// öffentlichen Launch zurück — der Code dafür bleibt im Repo erhalten.
export default function RegistrierenPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Konto erstellen</CardTitle>
        <CardDescription>
          Die Selbst-Registrierung ist zurzeit deaktiviert.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <p className="text-sm text-muted-foreground">
          Arduino Academy läuft gerade in einer geschlossenen Testphase —
          Konten vergibt aktuell die Lehrkraft. Wenn du Zugangsdaten bekommen
          hast, kannst du dich direkt anmelden.
        </p>
        <p className="text-center text-sm text-muted-foreground">
          Schon Zugangsdaten?{" "}
          <Link
            href="/anmelden"
            className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:text-primary focus-visible:underline focus-visible:outline-none"
          >
            Hier anmelden
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
