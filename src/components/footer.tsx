import Link from "next/link";

// Geteilter Footer, global im Root-Layout. mt-auto + body(flex-col) + main(flex-1)
// halten ihn am unteren Seitenrand. Links zu den deutschen Pflichtseiten.
export function SiteFooter() {
  const jahr = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>© {jahr} Arduino Academy</p>
        <nav className="flex gap-4">
          <Link
            href="/impressum"
            className="transition-colors hover:text-foreground"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="transition-colors hover:text-foreground"
          >
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
