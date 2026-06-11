import { describe, expect, it } from "vitest";
import { formatBytes } from "./format";

describe("formatBytes", () => {
  it("zeigt Bytes unter 1 KB direkt", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(512)).toBe("512 B");
  });

  it("rundet KB ohne Dezimalstelle", () => {
    expect(formatBytes(2048)).toBe("2 KB");
    expect(formatBytes(580578)).toBe("567 KB");
  });

  it("zeigt MB mit einer Dezimalstelle und deutschem Komma", () => {
    expect(formatBytes(1572864)).toBe("1,5 MB");
  });
});
