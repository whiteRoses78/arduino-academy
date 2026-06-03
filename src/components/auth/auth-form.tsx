"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialsSchema, type Credentials } from "@/lib/auth/schema";
import type { AuthResult } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthFormProps = {
  // Die passende Server Action (Anmelden oder Registrieren).
  action: (values: Credentials) => Promise<AuthResult | void>;
  mode: "signin" | "signup";
};

export function AuthForm({ action, mode }: AuthFormProps) {
  // Fehler, der vom Server zurueckkommt (z.B. "Passwort falsch").
  const [formError, setFormError] = useState<string | null>(null);
  // Pending-State waehrend die Server Action laeuft.
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const isSignup = mode === "signup";
  const submitLabel = isSignup ? "Konto erstellen" : "Anmelden";
  const pendingLabel = isSignup ? "Konto wird erstellt …" : "Anmeldung läuft …";

  function onSubmit(values: Credentials) {
    setFormError(null);
    startTransition(async () => {
      const result = await action(values);
      // Bei Erfolg navigiert die Server Action selbst (redirect) — dieser
      // Code wird dann nicht mehr erreicht. Nur der Fehlerfall landet hier.
      if (result?.error) {
        setFormError(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <div className="grid gap-2">
        <Label htmlFor="email">E-Mail</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="du@beispiel.de"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">
            Bitte gib eine gültige E-Mail-Adresse ein.
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Passwort</Label>
        <Input
          id="password"
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          placeholder={isSignup ? "mindestens 8 Zeichen" : undefined}
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-destructive">
            Das Passwort braucht mindestens 8 Zeichen.
          </p>
        )}
      </div>

      {formError && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {formError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isPending} className="w-full">
        {isPending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}
