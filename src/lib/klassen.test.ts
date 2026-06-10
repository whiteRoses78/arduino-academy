import { describe, expect, it } from "vitest";
import { accountGroup } from "./klassen";

describe("accountGroup", () => {
  it("ordnet arduino01 und arduino20 der Klasse 1 zu", () => {
    expect(accountGroup("arduino01@klasse.de")).toBe("klasse1");
    expect(accountGroup("arduino20@klasse.de")).toBe("klasse1");
  });

  it("ordnet arduino21 und arduino30 der Klasse 2 zu", () => {
    expect(accountGroup("arduino21@klasse.de")).toBe("klasse2");
    expect(accountGroup("arduino30@klasse.de")).toBe("klasse2");
  });

  it("steckt alles andere in 'weitere'", () => {
    expect(accountGroup("marcolemke78@gmail.com")).toBe("weitere");
    expect(accountGroup("arduino31@klasse.de")).toBe("weitere");
    expect(accountGroup("arduino00@klasse.de")).toBe("weitere");
    expect(accountGroup("arduino5@klasse.de")).toBe("weitere");
  });

  it("ignoriert Gross-/Kleinschreibung", () => {
    expect(accountGroup("Arduino05@Klasse.de")).toBe("klasse1");
  });
});
