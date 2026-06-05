import { describe, it, expect } from "vitest";
import { getLessonParts } from "./parts";

describe("getLessonParts", () => {
  it("liest gültige Bauteile mit Menge", () => {
    expect(getLessonParts([{ name: "Arduino Uno", qty: 1 }])).toEqual([
      { name: "Arduino Uno", qty: 1 },
    ]);
  });

  it("erlaubt Einträge ohne Menge (z.B. 'nach Bedarf')", () => {
    expect(getLessonParts([{ name: "Jumper-Kabel nach Bedarf" }])).toEqual([
      { name: "Jumper-Kabel nach Bedarf" },
    ]);
  });

  it("gibt leeres Array bei null, undefined oder leerem Array", () => {
    expect(getLessonParts(null)).toEqual([]);
    expect(getLessonParts(undefined)).toEqual([]);
    expect(getLessonParts([])).toEqual([]);
  });

  it("filtert kaputte Einträge (kein/leerer Name) weg", () => {
    expect(
      getLessonParts([{ qty: 3 }, { name: "" }, { name: "LED rot", qty: 2 }]),
    ).toEqual([{ name: "LED rot", qty: 2 }]);
  });

  it("ignoriert nicht-numerische qty (zeigt dann nur den Namen)", () => {
    expect(getLessonParts([{ name: "Steckbrett", qty: "viele" }])).toEqual([
      { name: "Steckbrett" },
    ]);
  });
});
