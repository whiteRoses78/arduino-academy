// Prozent → Schulnote mit Tendenz. Stufen-Schlüssel:
// ab 92 % = 1, ab 81 % = 2, ab 67 % = 3, ab 50 % = 4, ab 30 % = 5, darunter 6.
// Jede Stufe wird in drei gleich breite Teile geteilt: oberes Drittel „+",
// mittleres ohne Zeichen, unteres Drittel „−" (6 bleibt ohne Tendenz).
const GRADE_BANDS = [
  { grade: 1, min: 92, max: 100 },
  { grade: 2, min: 81, max: 92 },
  { grade: 3, min: 67, max: 81 },
  { grade: 4, min: 50, max: 67 },
  { grade: 5, min: 30, max: 50 },
];

export function percentToGrade(percent: number): string {
  const band = GRADE_BANDS.find((b) => percent >= b.min);
  if (!band) return "6";
  const third = (band.max - band.min) / 3;
  if (percent >= band.max - third) return `${band.grade}+`;
  if (percent < band.min + third) return `${band.grade}−`;
  return `${band.grade}`;
}
