import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth/role";
import { canViewSolutions } from "@/lib/roles";
import { formatBytes } from "@/lib/format";

export const metadata: Metadata = { title: "Material" };

// Lehrer-/Admin-Ablage: listet den privaten Storage-Bucket "lehrer-material"
// und erzeugt pro Datei eine signierte Download-URL (1 h gueltig, mit
// download-Disposition). Der Guard hier ist nur UI-Schutz — die echte
// Sicherheitsgrenze ist die Storage-RLS-Policy ("teachers read material").
const dateFmt = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "short",
  timeZone: "Europe/Berlin",
});

export default async function TeacherMaterialPage() {
  if (!canViewSolutions(await getCurrentUserRole())) redirect("/");

  const supabase = await createClient();
  const { data: listed, error: listError } = await supabase.storage
    .from("lehrer-material")
    .list("", { sortBy: { column: "name", order: "asc" } });

  // Ordner-Platzhalter haben id = null -> nur echte Dateien anzeigen.
  const files = (listed ?? []).filter((f) => f.id !== null);

  // Signierte URLs in einem Rutsch; download:true erzwingt "Speichern unter".
  const urls = new Map<string, string>();
  let signError: string | null = null;
  if (files.length > 0) {
    const { data: signed, error } = await supabase.storage
      .from("lehrer-material")
      .createSignedUrls(
        files.map((f) => f.name),
        3600,
        { download: true },
      );
    if (error) signError = error.message;
    for (const s of signed ?? []) {
      if (s.signedUrl && s.path) urls.set(s.path, s.signedUrl);
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Material</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Interne Ablage für Lehrkräfte — Modularbeiten, Lösungen und weiteres
        Material. Download-Links sind 1 Stunde gültig.
      </p>

      {(listError || signError) && (
        <p className="mt-6 text-sm text-destructive">
          Fehler beim Laden der Ablage: {listError?.message ?? signError}
        </p>
      )}

      {!listError && files.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          Noch kein Material vorhanden.
        </p>
      )}

      {files.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Datei</th>
                <th className="py-2 pr-4 font-medium">Größe</th>
                <th className="py-2 pr-4 font-medium">Stand</th>
                <th className="py-2 font-medium">
                  <span className="sr-only">Aktion</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((f) => {
                const href = urls.get(f.name);
                return (
                  <tr key={f.name} className="border-b border-border/50">
                    <td className="py-2 pr-4 font-medium">{f.name}</td>
                    <td className="py-2 pr-4 tabular-nums">
                      {typeof f.metadata?.size === "number"
                        ? formatBytes(f.metadata.size)
                        : "—"}
                    </td>
                    <td className="py-2 pr-4 tabular-nums">
                      {f.updated_at
                        ? dateFmt.format(new Date(f.updated_at))
                        : "—"}
                    </td>
                    <td className="py-2 text-right">
                      {href ? (
                        <a
                          href={href}
                          className="inline-block py-2 font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:underline focus-visible:outline-none"
                        >
                          Herunterladen
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
