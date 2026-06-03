import Link from "next/link";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { signInAction } from "@/lib/auth/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Anmelden",
};

export default function AnmeldenPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Willkommen zurück</CardTitle>
        <CardDescription>
          Melde dich an, um deinen Lernfortschritt zu speichern.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <AuthForm action={signInAction} mode="signin" />
        <p className="text-center text-sm text-muted-foreground">
          Noch kein Konto?{" "}
          <Link
            href="/registrieren"
            className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:text-primary focus-visible:underline focus-visible:outline-none"
          >
            Jetzt registrieren
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
