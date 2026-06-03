import { describe, it, expect } from "vitest";
import { nextBox, addDays, isDue, recordCompletion, INTERVALS } from "./leitner";

describe("INTERVALS", () => {
  it("sind die Leitner-Intervalle 1/3/7/16/35 Tage", () => {
    expect(INTERVALS).toEqual([1, 3, 7, 16, 35]);
  });
});

describe("nextBox — Erstabschluss (noch kein Fach)", () => {
  it("low -> Fach 1", () => {
    expect(nextBox(null, "low")).toBe(1);
  });
  it("medium -> Fach 1", () => {
    expect(nextBox(null, "medium")).toBe(1);
  });
  it("high -> Fach 2 (ueberspringt Fach 1)", () => {
    expect(nextBox(null, "high")).toBe(2);
  });
});

describe("nextBox — Wiederholung (bereits in einem Fach)", () => {
  it("low wirft zurueck auf Fach 1", () => {
    expect(nextBox(3, "low")).toBe(1);
  });
  it("medium bleibt im aktuellen Fach", () => {
    expect(nextBox(3, "medium")).toBe(3);
  });
  it("high schiebt ein Fach weiter", () => {
    expect(nextBox(3, "high")).toBe(4);
  });
  it("high im hoechsten Fach bleibt bei 5 (kein Ueberlauf)", () => {
    expect(nextBox(5, "high")).toBe(5);
  });
});

describe("addDays", () => {
  it("addiert Tage innerhalb des Monats", () => {
    expect(addDays("2026-06-03", 7)).toBe("2026-06-10");
  });
  it("ueberschreitet Monatsgrenzen", () => {
    expect(addDays("2026-06-30", 1)).toBe("2026-07-01");
  });
  it("ueberschreitet Jahresgrenzen", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
  });
});

describe("isDue", () => {
  it("heute faellig", () => {
    expect(isDue("2026-06-03", "2026-06-03")).toBe(true);
  });
  it("ueberfaellig", () => {
    expect(isDue("2026-06-01", "2026-06-03")).toBe(true);
  });
  it("noch nicht faellig", () => {
    expect(isDue("2026-06-05", "2026-06-03")).toBe(false);
  });
});

describe("recordCompletion", () => {
  it("Erstabschluss mit high -> Fach 2, faellig in 3 Tagen", () => {
    const result = recordCompletion({ box: null }, "high", "2026-06-03");
    expect(result.box).toBe(2);
    expect(result.due_date).toBe("2026-06-06"); // heute + INTERVALS[1] = 3 Tage
    expect(result.last_reviewed).toBe("2026-06-03");
    expect(result.confidence).toBe("high");
    expect(result.status).toBe("completed");
  });

  it("low wirft zurueck auf Fach 1, faellig morgen", () => {
    const result = recordCompletion({ box: 4 }, "low", "2026-06-03");
    expect(result.box).toBe(1);
    expect(result.due_date).toBe("2026-06-04"); // heute + INTERVALS[0] = 1 Tag
  });
});
