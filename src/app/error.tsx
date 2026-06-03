"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

// Globaler Fehler-Zustand (Client Component, Pflicht für error.tsx).
// reset() rendert das Segment neu — Retry ohne Full-Reload.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Da ist etwas schiefgelaufen
      </h1>
      <p className="text-muted-foreground">
        Die Seite konnte gerade nicht geladen werden. Versuch es noch einmal.
      </p>
      <Button onClick={reset}>Erneut versuchen</Button>
    </main>
  );
}
