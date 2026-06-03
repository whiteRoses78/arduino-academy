import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next 16: "proxy" ersetzt die alte "middleware"-Konvention.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Alle Pfade ausser:
     * - _next/static (Build-Assets)
     * - _next/image (Bild-Optimierung)
     * - favicon.ico
     * - statische Bilddateien
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
