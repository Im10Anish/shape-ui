import { styled } from "../styled";

describe("styled", () => {
  it("generates base classes", () => {
    const styledFn = styled("base-class");
    const result = styledFn({});

    expect(result).toContain("base-class");
  });

  it("adds color utilities", () => {
    const styledFn = styled();
    const result = styledFn({
      color: "primary",
      bg: "secondary",
    });

    expect(result).toContain("text-primary");
    expect(result).toContain("bg-secondary");
  });

  it("adds spacing utilities", () => {
    const styledFn = styled();
    const result = styledFn({
      p: "4",
      m: "2",
      px: "6",
      py: "3",
      mx: "auto",
      my: "4",
    });

    expect(result).toContain("p-4");
    expect(result).toContain("m-2");
    expect(result).toContain("px-6");
    expect(result).toContain("py-3");
    expect(result).toContain("mx-auto");
    expect(result).toContain("my-4");
  });

  it("adds border radius and shadow", () => {
    const styledFn = styled();
    const result = styledFn({
      rounded: "lg",
      shadow: "md",
    });

    expect(result).toContain("rounded-lg");
    expect(result).toContain("shadow-md");
  });

  it("merges with custom className", () => {
    const styledFn = styled("base");
    const result = styledFn({
      className: "custom-class",
      color: "primary",
    });

    expect(result).toContain("base");
    expect(result).toContain("text-primary");
    expect(result).toContain("custom-class");
  });
});
