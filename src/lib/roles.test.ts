import { describe, it, expect } from "vitest";
import { canViewSolutions, canAdminister } from "./roles";

describe("canViewSolutions", () => {
  it("teacher und admin dürfen", () => {
    expect(canViewSolutions("teacher")).toBe(true);
    expect(canViewSolutions("admin")).toBe(true);
  });
  it("student und null dürfen nicht", () => {
    expect(canViewSolutions("student")).toBe(false);
    expect(canViewSolutions(null)).toBe(false);
  });
});

describe("canAdminister", () => {
  it("nur admin", () => {
    expect(canAdminister("admin")).toBe(true);
    expect(canAdminister("teacher")).toBe(false);
    expect(canAdminister("student")).toBe(false);
    expect(canAdminister(null)).toBe(false);
  });
});
