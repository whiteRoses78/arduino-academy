// Leitner-Spaced-Repetition — 1:1 portiert aus der Vanilla-App (js/progress.js).
// Eine abgeschlossene Lektion wandert durch 5 Karteikasten-Faecher mit wachsenden
// Abstaenden; die Selbsteinschaetzung (confidence) steuert die Bewegung.

export type Confidence = "low" | "medium" | "high";

// Tage bis zur naechsten Wiederholung je Fach (1..5).
export const INTERVALS = [1, 3, 7, 16, 35] as const;

// YYYY-MM-DD aus einem Date (lokal, gepaddet).
function fmt(d: Date): string {
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

// Heute als YYYY-MM-DD (lokal, tagesgenau). Duenner Wrapper um new Date();
// die Kern-Logik bekommt "today" als Parameter und bleibt damit testbar.
export function todayStr(): string {
  return fmt(new Date());
}

// Datum-String (YYYY-MM-DD) um n Tage verschieben, wieder als YYYY-MM-DD.
export function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return fmt(d);
}

// Ist das Faelligkeitsdatum am Stichtag erreicht oder ueberschritten?
// YYYY-MM-DD ist gepaddet -> lexikografischer Vergleich genuegt.
export function isDue(dateStr: string, today: string): boolean {
  return !!dateStr && dateStr <= today;
}

// Neues Leitner-Fach aus aktuellem Fach + Selbsteinschaetzung:
//   low    -> zurueck auf Fach 1
//   high   -> Erstabschluss: Fach 2 (ueberspringt 1); sonst ein Fach weiter
//   medium -> Erstabschluss: Fach 1; sonst bleibt im aktuellen Fach
// Ergebnis in 1..5 geklemmt.
export function nextBox(
  currentBox: number | null,
  confidence: Confidence,
): number {
  const isFirstTime = !currentBox;
  const base = currentBox || 0;

  let box: number;
  if (confidence === "low") {
    box = 1;
  } else if (confidence === "high") {
    box = isFirstTime ? 2 : base + 1;
  } else {
    box = isFirstTime ? 1 : base;
  }
  return Math.max(1, Math.min(box, INTERVALS.length));
}

export type ProgressUpdate = {
  box: number;
  due_date: string;
  last_reviewed: string;
  confidence: Confidence;
  status: "completed";
};

// Eine Lektion wurde komplett geloest. Die Selbsteinschaetzung steuert das neue
// Fach; die Faelligkeit ergibt sich aus dessen Intervall. Reine Funktion
// (today injiziert) -> deterministisch testbar.
export function recordCompletion(
  current: { box: number | null },
  confidence: Confidence,
  today: string,
): ProgressUpdate {
  const box = nextBox(current.box, confidence);
  return {
    box,
    due_date: addDays(today, INTERVALS[box - 1]),
    last_reviewed: today,
    confidence,
    status: "completed",
  };
}
