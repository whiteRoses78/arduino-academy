"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { credentialsSchema, type Credentials } from "@/lib/auth/schema";

// Die Client-Form bekommt nur im Fehlerfall etwas zurueck. Im Erfolgsfall
// endet die Action im redirect() -> der Code danach laeuft nicht mehr.
export type AuthResult = { error: string };

export async function signInAction(
  values: Credentials,
): Promise<AuthResult | void> {
  // Server-seitige Re-Validierung: dem Browser nie blind vertrauen.
  const parsed = credentialsSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Bitte E-Mail und Passwort prüfen." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    if (error) {
      return { error: "E-Mail oder Passwort ist falsch." };
    }
  } catch {
    return {
      error: "Anmeldung gerade nicht möglich. Bitte später erneut versuchen.",
    };
  }

  // redirect() bewusst AUSSERHALB des try/catch: es wirft intern eine
  // NEXT_REDIRECT-Ausnahme, die das catch sonst verschlucken wuerde.
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUpAction(
  values: Credentials,
): Promise<AuthResult | void> {
  const parsed = credentialsSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Bitte E-Mail und Passwort prüfen." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp(parsed.data);
    if (error) {
      return {
        error:
          "Registrierung nicht möglich. Vielleicht gibt es dieses Konto schon — versuch dich anzumelden.",
      };
    }
  } catch {
    return {
      error:
        "Registrierung gerade nicht möglich. Bitte später erneut versuchen.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
