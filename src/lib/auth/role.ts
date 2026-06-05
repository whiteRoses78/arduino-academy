import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/roles";

// Rolle des eingeloggten Users (null = nicht eingeloggt). Liest das eigene
// profiles-Row (RLS "own profile select" erlaubt genau das).
export async function getCurrentUserRole(): Promise<UserRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return (data?.role as UserRole | undefined) ?? null;
}
