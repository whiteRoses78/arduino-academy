// Ordnet ein Konto seiner Klasse zu. Die Zuordnung läuft bewusst über die
// Kontonummer (arduino01–20 = Klasse 1, arduino21–30 = Klasse 2) — es gibt
// keine Klassen-Tabelle in der DB (Datensparsamkeit, KISS). Bei künftigen
// Klassen diese Funktion erweitern.
export type AccountGroup = "klasse1" | "klasse2" | "weitere";

export function accountGroup(email: string): AccountGroup {
  const m = /^arduino(\d{2})@klasse\.de$/.exec(email.toLowerCase());
  if (!m) return "weitere";
  const n = Number(m[1]);
  if (n >= 1 && n <= 20) return "klasse1";
  if (n >= 21 && n <= 30) return "klasse2";
  return "weitere";
}

export const GROUP_LABELS: Record<AccountGroup, string> = {
  klasse1: "Klasse 1 (arduino01–20)",
  klasse2: "Klasse 2 (arduino21–30)",
  weitere: "Weitere Konten",
};

export const GROUP_ORDER: AccountGroup[] = ["klasse1", "klasse2", "weitere"];
