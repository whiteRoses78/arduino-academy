// Reine Rollen-Logik (Spec 04). Kein "server-only" -> vitest-testbar.
// Die echte Sicherheitsgrenze ist die RLS in der DB; diese Helfer steuern
// nur die Anzeige (defense in depth).
export type UserRole = "student" | "teacher" | "admin";

export function canViewSolutions(role: UserRole | null): boolean {
  return role === "teacher" || role === "admin";
}

export function canAdminister(role: UserRole | null): boolean {
  return role === "admin";
}
