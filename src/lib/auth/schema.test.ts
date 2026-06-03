import { describe, it, expect } from "vitest";
import { credentialsSchema } from "./schema";

describe("credentialsSchema", () => {
  it("lehnt eine leere Email ab", () => {
    const result = credentialsSchema.safeParse({
      email: "",
      password: "geheim123",
    });
    expect(result.success).toBe(false);
  });

  it("lehnt eine ungueltige Email ab", () => {
    const result = credentialsSchema.safeParse({
      email: "keine-email",
      password: "geheim123",
    });
    expect(result.success).toBe(false);
  });

  it("lehnt ein Passwort unter 8 Zeichen ab", () => {
    const result = credentialsSchema.safeParse({
      email: "marco@example.com",
      password: "kurz12",
    });
    expect(result.success).toBe(false);
  });

  it("akzeptiert gueltige Zugangsdaten", () => {
    const result = credentialsSchema.safeParse({
      email: "marco@example.com",
      password: "geheim123",
    });
    expect(result.success).toBe(true);
  });
});
