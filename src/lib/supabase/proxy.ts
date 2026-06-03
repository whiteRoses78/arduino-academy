import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

// Refresht die Supabase-Session bei jedem Request und haelt die Cookies
// zwischen Browser und Server synchron. Wird von der Next-Proxy (src/proxy.ts)
// aufgerufen. Ohne diesen Schritt koennen User nach Token-Ablauf scheinbar
// zufaellig ausgeloggt werden.
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // WICHTIG: kein Code zwischen createServerClient und getUser().
  // getUser() validiert das Token serverseitig und refresht die Session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // arduino-academy ist public-first: Lerninhalte sind ohne Login lesbar
  // (ADR-002). Nur geschuetzte Routen bekommen einen Guard — Dashboard
  // braucht eine Session, sonst zurueck zur Anmeldung.
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/anmelden";
    return NextResponse.redirect(url);
  }

  // supabaseResponse MUSS unveraendert zurueckgegeben werden, sonst geraten
  // Browser- und Server-Cookies aus dem Takt.
  return supabaseResponse;
}
