import Link from "next/link";
import { Button } from "@/components/ui/button";

// Eigene 404-Seite (greift u.a. wenn Lektions-/Modul-Seiten notFound() rufen).
export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <p className="text-5xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">
        Seite nicht gefunden
      </h1>
      <p className="text-muted-foreground">
        Diese Lektion oder dieses Modul gibt es nicht (mehr). Zurück zum Start?
      </p>
      <Button asChild>
        <Link href="/">Zur Startseite</Link>
      </Button>
    </main>
  );
}
