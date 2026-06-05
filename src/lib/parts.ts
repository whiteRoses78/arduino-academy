// Reines Parser-Modul für die Bauteilliste (Spec 03). Kein "server-only",
// keine DB — nimmt das rohe parts-JSONB-Feld und gibt eine saubere, defensiv
// gefilterte Liste zurück. So crasht ein kaputter Datensatz nie die Lektionsseite.

export type LessonPart = { name: string; qty?: number };

export function getLessonParts(raw: unknown): LessonPart[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const { name, qty } = item as { name?: unknown; qty?: unknown };
    if (typeof name !== "string" || name.trim() === "") return [];
    return [typeof qty === "number" ? { name, qty } : { name }];
  });
}
