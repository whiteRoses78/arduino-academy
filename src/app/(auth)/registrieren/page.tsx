import Link from "next/link";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { signUpAction } from "@/lib/auth/actions";
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

export default function RegistrierenPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Konto erstellen</CardTitle>
        <CardDescription>
          Lege ein Konto an, um Fortschritt und fällige Wiederholungen zu
          speichern.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <AuthForm action={signUpAction} mode="signup" />
        <p className="text-center text-sm text-muted-foreground">
          Schon ein Konto?{" "}
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
