"use client";

import { useRef, useState, type ReactNode } from "react";

export type LessonTab = { id: string; label: string; content: ReactNode };

// Reiter-Leiste für die Lektionsseite (Einführung · Übung · Praxis · Test).
// Alle Panels bleiben gemountet und werden nur per `hidden` ausgeblendet —
// so gehen Übungs-Antworten beim Hin- und Herwechseln nicht verloren.
export function LessonTabs({ tabs }: { tabs: LessonTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const barRef = useRef<HTMLDivElement>(null);

  function select(id: string, scroll = false) {
    setActive(id);
    if (scroll) barRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="mt-6">
      <div
        ref={barRef}
        role="tablist"
        aria-label="Abschnitte der Lektion"
        className="flex scroll-mt-4 overflow-x-auto sm:gap-1 border-b border-border"
      >
        {tabs.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${t.id}`}
              onClick={() => select(t.id)}
              className={`-mb-px min-h-11 shrink-0 rounded-t-xl border-b-2 px-3 text-sm sm:px-4 font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tabs.map((t, i) => {
        const next = tabs[i + 1];
        return (
          <div
            key={t.id}
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            hidden={t.id !== active}
            className="[&>:first-child]:mt-6"
          >
            {t.content}
            {next && (
              <div className="mt-10 flex justify-end">
                <button
                  type="button"
                  onClick={() => select(next.id, true)}
                  className="min-h-11 rounded-2xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition duration-150 ease-out hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none active:scale-[0.97]"
                >
                  Weiter: {next.label} →
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
