"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth/role";
import { canAdminister } from "@/lib/roles";

export type AdminResult = { ok: true } | { ok: false; error: string };

async function setRole(email: string, makeTeacher: boolean): Promise<AdminResult> {
  if (!canAdminister(await getCurrentUserRole())) {
    return { ok: false, error: "Nicht erlaubt." };
  }
  const parsed = z.email().safeParse(email.trim());
  if (!parsed.success) return { ok: false, error: "Ungültige E-Mail-Adresse." };

  const supabase = await createClient();
  const { error } = await supabase.rpc("set_teacher_role", {
    target_email: parsed.data,
    make_teacher: makeTeacher,
  });
  if (error) {
    return { ok: false, error: "Fehlgeschlagen (E-Mail unbekannt?)." };
  }
  revalidatePath("/admin");
  return { ok: true };
}

// Aus der Client-Form programmatisch aufgerufen -> gibt AdminResult zurück.
export async function makeTeacher(email: string): Promise<AdminResult> {
  return setRole(email, true);
}

// Als <form action> aufgerufen -> nimmt FormData, gibt void zurück
// (Next-Server-Action-Form-Vertrag).
export async function revokeTeacherForm(formData: FormData): Promise<void> {
  await setRole(String(formData.get("email") ?? ""), false);
}
