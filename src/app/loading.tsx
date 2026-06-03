// Globaler Lade-Zustand: Skeleton statt Spinner. Greift bei Routen-Fetches
// (Start- und Modul-Übersicht sind Karten-Listen — daher Karten-Skeletons).
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12 sm:py-16">
      <div className="mx-auto h-10 w-56 max-w-full animate-pulse rounded-lg bg-muted" />
      <div className="mx-auto mt-4 h-5 w-80 max-w-full animate-pulse rounded bg-muted" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl bg-muted ring-1 ring-foreground/10"
          />
        ))}
      </div>
    </main>
  );
}
