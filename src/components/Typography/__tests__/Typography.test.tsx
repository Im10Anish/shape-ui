import React from "react";
import { render, screen } from "@testing-library/react";
import { Typography } from "../Typography";

describe("Typography", () => {
  it("renders paragraph with text", () => {
    render(<Typography>Sample text</Typography>);
    expect(screen.getByText("Sample text")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Typography>Default text</Typography>);
    const element = screen.getByText("Default text");
    expect(element).toHaveClass("leading-7", "[&:not(:first-child)]:mt-6");
  });

  it("applies h1 variant classes", () => {
    render(<Typography variant="h1">Heading 1</Typography>);
    const element = screen.getByText("Heading 1");
    expect(element).toHaveClass(
      "scroll-m-20",
      "text-4xl",
      "font-extrabold",
      "tracking-tight",
      "lg:text-5xl",
    );
  });

  it("applies h2 variant classes", () => {
    render(<Typography variant="h2">Heading 2</Typography>);
    const element = screen.getByText("Heading 2");
    expect(element).toHaveClass(
      "scroll-m-20",
      "border-b",
      "pb-2",
      "text-3xl",
      "font-semibold",
      "tracking-tight",
      "first:mt-0",
    );
  });

  it("applies h3 variant classes", () => {
    render(<Typography variant="h3">Heading 3</Typography>);
    const element = screen.getByText("Heading 3");
    expect(element).toHaveClass(
      "scroll-m-20",
      "text-2xl",
      "font-semibold",
      "tracking-tight",
    );
  });

  it("applies h4 variant classes", () => {
    render(<Typography variant="h4">Heading 4</Typography>);
    const element = screen.getByText("Heading 4");
    expect(element).toHaveClass(
      "scroll-m-20",
      "text-xl",
      "font-semibold",
      "tracking-tight",
    );
  });

  it("applies h5 variant classes", () => {
    render(<Typography variant="h5">Heading 5</Typography>);
    const element = screen.getByText("Heading 5");
    expect(element).toHaveClass(
      "scroll-m-20",
      "text-lg",
      "font-semibold",
      "tracking-tight",
    );
  });

  it("applies h6 variant classes", () => {
    render(<Typography variant="h6">Heading 6</Typography>);
    const element = screen.getByText("Heading 6");
    expect(element).toHaveClass(
      "scroll-m-20",
      "text-base",
      "font-semibold",
      "tracking-tight",
    );
  });

  it("applies blockquote variant classes", () => {
    render(<Typography variant="blockquote">Blockquote text</Typography>);
    const element = screen.getByText("Blockquote text");
    expect(element).toHaveClass("mt-6", "border-l-2", "pl-6", "italic");
  });

  it("applies code variant classes", () => {
    render(<Typography variant="code">Code text</Typography>);
    const element = screen.getByText("Code text");
    expect(element).toHaveClass(
      "relative",
      "rounded",
      "bg-muted",
      "px-[0.3rem]",
      "py-[0.2rem]",
      "font-mono",
      "text-sm",
      "font-semibold",
    );
  });

  it("applies lead variant classes", () => {
    render(<Typography variant="lead">Lead text</Typography>);
    const element = screen.getByText("Lead text");
    expect(element).toHaveClass("text-xl", "text-muted-foreground");
  });

  it("applies large variant classes", () => {
    render(<Typography variant="large">Large text</Typography>);
    const element = screen.getByText("Large text");
    expect(element).toHaveClass("text-lg", "font-semibold");
  });

  it("applies small variant classes", () => {
    render(<Typography variant="small">Small text</Typography>);
    const element = screen.getByText("Small text");
    expect(element).toHaveClass("text-sm", "font-medium", "leading-none");
  });

  it("applies muted variant classes", () => {
    render(<Typography variant="muted">Muted text</Typography>);
    const element = screen.getByText("Muted text");
    expect(element).toHaveClass("text-sm", "text-muted-foreground");
  });

  it("applies xs size classes", () => {
    render(<Typography size="xs">Extra small text</Typography>);
    const element = screen.getByText("Extra small text");
    expect(element).toHaveClass("text-xs");
  });

  it("applies sm size classes", () => {
    render(<Typography size="sm">Small text</Typography>);
    const element = screen.getByText("Small text");
    expect(element).toHaveClass("text-sm");
  });

  it("applies lg size classes", () => {
    render(<Typography size="lg">Large text</Typography>);
    const element = screen.getByText("Large text");
    expect(element).toHaveClass("text-lg");
  });

  it("applies xl size classes", () => {
    render(<Typography size="xl">Extra large text</Typography>);
    const element = screen.getByText("Extra large text");
    expect(element).toHaveClass("text-xl");
  });

  it("applies 2xl size classes", () => {
    render(<Typography size="2xl">2XL text</Typography>);
    const element = screen.getByText("2XL text");
    expect(element).toHaveClass("text-2xl");
  });

  it("applies thin weight classes", () => {
    render(<Typography weight="thin">Thin text</Typography>);
    const element = screen.getByText("Thin text");
    expect(element).toHaveClass("font-thin");
  });

  it("applies bold weight classes", () => {
    render(<Typography weight="bold">Bold text</Typography>);
    const element = screen.getByText("Bold text");
    expect(element).toHaveClass("font-bold");
  });

  it("applies extrabold weight classes", () => {
    render(<Typography weight="extrabold">Extra bold text</Typography>);
    const element = screen.getByText("Extra bold text");
    expect(element).toHaveClass("font-extrabold");
  });

  it("applies custom className", () => {
    render(<Typography className="custom-class">Custom text</Typography>);
    const element = screen.getByText("Custom text");
    expect(element).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Typography ref={ref}>Ref text</Typography>);

    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    expect(ref.current).toBe(screen.getByText("Ref text"));
  });

  it("spreads additional props", () => {
    render(
      <Typography data-testid="test-typography" aria-label="Test">
        Props text
      </Typography>,
    );
    const element = screen.getByText("Props text");

    expect(element).toHaveAttribute("data-testid", "test-typography");
    expect(element).toHaveAttribute("aria-label", "Test");
  });

  it("renders as child component when asChild is true", () => {
    render(
      <Typography asChild>
        <a href="/test">Link text</a>
      </Typography>,
    );

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveClass("leading-7", "[&:not(:first-child)]:mt-6");
  });

  it("renders as specified element when as prop is provided", () => {
    render(<Typography as="span">Span text</Typography>);
    const element = screen.getByText("Span text");
    expect(element.tagName).toBe("SPAN");
  });

  it("renders as h1 when variant is h1", () => {
    render(<Typography variant="h1">Heading 1</Typography>);
    const element = screen.getByText("Heading 1");
    expect(element.tagName).toBe("H1");
  });

  it("renders as h2 when variant is h2", () => {
    render(<Typography variant="h2">Heading 2</Typography>);
    const element = screen.getByText("Heading 2");
    expect(element.tagName).toBe("H2");
  });

  it("renders as h3 when variant is h3", () => {
    render(<Typography variant="h3">Heading 3</Typography>);
    const element = screen.getByText("Heading 3");
    expect(element.tagName).toBe("H3");
  });

  it("renders as h4 when variant is h4", () => {
    render(<Typography variant="h4">Heading 4</Typography>);
    const element = screen.getByText("Heading 4");
    expect(element.tagName).toBe("H4");
  });

  it("renders as h5 when variant is h5", () => {
    render(<Typography variant="h5">Heading 5</Typography>);
    const element = screen.getByText("Heading 5");
    expect(element.tagName).toBe("H5");
  });

  it("renders as h6 when variant is h6", () => {
    render(<Typography variant="h6">Heading 6</Typography>);
    const element = screen.getByText("Heading 6");
    expect(element.tagName).toBe("H6");
  });

  it("renders as blockquote when variant is blockquote", () => {
    render(<Typography variant="blockquote">Blockquote text</Typography>);
    const element = screen.getByText("Blockquote text");
    expect(element.tagName).toBe("BLOCKQUOTE");
  });

  it("renders as code when variant is code", () => {
    render(<Typography variant="code">Code text</Typography>);
    const element = screen.getByText("Code text");
    expect(element.tagName).toBe("CODE");
  });

  it("combines variant, size, and weight classes correctly", () => {
    render(
      <Typography variant="h1" size="2xl" weight="bold">
        Combined text
      </Typography>,
    );
    const element = screen.getByText("Combined text");

    expect(element).toHaveClass("scroll-m-20", "tracking-tight", "lg:text-5xl");
    expect(element).toHaveClass("text-2xl");
    expect(element).toHaveClass("font-bold");
  });

  it("has correct base classes", () => {
    render(<Typography>Base text</Typography>);
    const element = screen.getByText("Base text");

    expect(element).toHaveClass("leading-7", "[&:not(:first-child)]:mt-6");
  });

  it("maintains accessibility attributes", () => {
    render(
      <Typography id="test-id" role="heading" aria-level={1}>
        Accessible text
      </Typography>,
    );
    const element = screen.getByText("Accessible text");

    expect(element).toHaveAttribute("id", "test-id");
    expect(element).toHaveAttribute("role", "heading");
    expect(element).toHaveAttribute("aria-level", "1");
  });
});
