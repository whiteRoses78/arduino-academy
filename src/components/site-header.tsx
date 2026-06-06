import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/lib/auth/actions";
import { getCurrentUserRole } from "@/lib/auth/role";
import { canAdminister } from "@/lib/roles";
import { Button } from "@/components/ui/button";

// Globale Kopfzeile. Server Component: liest den Auth-Status serverseitig
// und zeigt entweder die eingeloggte E-Mail + Abmelden oder die Auth-Links.
// Der Admin-Link erscheint NUR fuer eingeloggte Admins (sonst unsichtbar).
export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // Rolle nur bei eingeloggtem User holen; steuert die Sichtbarkeit des Links.
  const isAdmin = user ? canAdminister(await getCurrentUserRole()) : false;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-6">
        <Link
          href="/"
          className="font-heading text-sm font-semibold tracking-tight transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
        >
          Arduino Academy
        </Link>

        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            {isAdmin && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin">Admin</Link>
              </Button>
            )}
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.email}
            </span>
            <form action={signOutAction}>
              <Button type="submit" variant="ghost" size="sm">
                Abmelden
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/anmelden">Anmelden</Link>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/registrieren">Registrieren</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
