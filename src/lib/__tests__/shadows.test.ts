import { shadowVariants } from "../shadows";

describe("shadowVariants", () => {
  it("should generate correct classes for different shadows", () => {
    expect(shadowVariants({ shadow: "none" })).toBe("");
    expect(shadowVariants({ shadow: "sm" })).toBe("shadow-sm");
    expect(shadowVariants({ shadow: "md" })).toBe("shadow-md");
    expect(shadowVariants({ shadow: "lg" })).toBe("shadow-lg");
    expect(shadowVariants({ shadow: "xl" })).toBe("shadow-xl");
    expect(shadowVariants({ shadow: "2xl" })).toBe("shadow-2xl");
    expect(shadowVariants({ shadow: "inner" })).toBe("shadow-inner");
  });

  it("should use default shadow when none provided", () => {
    expect(shadowVariants({})).toBe("");
  });
});
