import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../Card";

describe("Card", () => {
  it("renders card with children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Card>Default Card</Card>);
    const card = screen.getByText("Default Card").closest("div");
    expect(card).toHaveClass("border-border", "bg-card");
  });

  it("applies elevated variant classes", () => {
    render(<Card variant="elevated">Elevated Card</Card>);
    const card = screen.getByText("Elevated Card").closest("div");
    expect(card).toHaveClass("border-border", "bg-card", "shadow-sm");
  });

  it("applies outlined variant classes", () => {
    render(<Card variant="outlined">Outlined Card</Card>);
    const card = screen.getByText("Outlined Card").closest("div");
    expect(card).toHaveClass("border-2", "border-border", "bg-transparent");
  });

  it("applies ghost variant classes", () => {
    render(<Card variant="ghost">Ghost Card</Card>);
    const card = screen.getByText("Ghost Card").closest("div");
    expect(card).toHaveClass("border-transparent", "bg-transparent");
  });

  it("applies interactive variant classes", () => {
    render(<Card variant="interactive">Interactive Card</Card>);
    const card = screen.getByText("Interactive Card").closest("div");
    expect(card).toHaveClass("border-border", "bg-card");
    expect(card).not.toHaveClass(
      "hover:shadow-md",
      "hover:border-primary/20",
      "cursor-pointer",
    );
  });

  it("applies flat variant classes", () => {
    render(<Card variant="flat">Flat Card</Card>);
    const card = screen.getByText("Flat Card").closest("div");
    expect(card).toHaveClass("border-0", "bg-muted/50");
  });

  it("applies glass variant classes", () => {
    render(<Card variant="glass">Glass Card</Card>);
    const card = screen.getByText("Glass Card").closest("div");
    expect(card).toHaveClass(
      "border-border/50",
      "bg-background/80",
      "backdrop-blur-sm",
    );
  });

  it("applies small size classes", () => {
    render(<Card size="sm">Small Card</Card>);
    const card = screen.getByText("Small Card").closest("div");
    expect(card).toHaveClass("p-3");
  });

  it("applies medium size classes", () => {
    render(<Card size="md">Medium Card</Card>);
    const card = screen.getByText("Medium Card").closest("div");
    expect(card).toHaveClass("p-4");
  });

  it("applies large size classes", () => {
    render(<Card size="lg">Large Card</Card>);
    const card = screen.getByText("Large Card").closest("div");
    expect(card).toHaveClass("p-6");
  });

  it("applies extra large size classes", () => {
    render(<Card size="xl">Extra Large Card</Card>);
    const card = screen.getByText("Extra Large Card").closest("div");
    expect(card).toHaveClass("p-8");
  });

  it("applies shadow classes correctly", () => {
    render(<Card shadow="lg">Shadow Card</Card>);
    const card = screen.getByText("Shadow Card").closest("div");
    expect(card).toHaveClass("shadow-lg");
  });

  it("applies different shadow variants", () => {
    const { rerender } = render(<Card shadow="sm">Small Shadow</Card>);
    expect(screen.getByText("Small Shadow").closest("div")).toHaveClass(
      "shadow-sm",
    );

    rerender(<Card shadow="xl">Large Shadow</Card>);
    expect(screen.getByText("Large Shadow").closest("div")).toHaveClass(
      "shadow-xl",
    );

    rerender(<Card shadow="2xl">Extra Large Shadow</Card>);
    expect(screen.getByText("Extra Large Shadow").closest("div")).toHaveClass(
      "shadow-2xl",
    );

    rerender(<Card shadow="inner">Inner Shadow</Card>);
    expect(screen.getByText("Inner Shadow").closest("div")).toHaveClass(
      "shadow-inner",
    );
  });

  it("applies radius classes correctly", () => {
    render(<Card radius="xl">Rounded Card</Card>);
    const card = screen.getByText("Rounded Card").closest("div");
    expect(card).toHaveClass("rounded-xl");
  });

  it("applies different radius variants", () => {
    const { rerender } = render(<Card radius="sm">Small Radius</Card>);
    expect(screen.getByText("Small Radius").closest("div")).toHaveClass(
      "rounded-sm",
    );

    rerender(<Card radius="2xl">Large Radius</Card>);
    expect(screen.getByText("Large Radius").closest("div")).toHaveClass(
      "rounded-2xl",
    );

    rerender(<Card radius="full">Full Radius</Card>);
    expect(screen.getByText("Full Radius").closest("div")).toHaveClass(
      "rounded-full",
    );
  });

  it("applies custom className", () => {
    render(<Card className="custom-class">Custom Card</Card>);
    const card = screen.getByText("Custom Card").closest("div");
    expect(card).toHaveClass("custom-class");
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);

    const card = screen.getByText("Clickable Card").closest("div");
    await userEvent.click(card!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles keyboard events", () => {
    const handleKeyDown = jest.fn();
    render(<Card onKeyDown={handleKeyDown}>Keyboard Card</Card>);

    const card = screen.getByText("Keyboard Card").closest("div");
    fireEvent.keyDown(card!, { key: "Enter", code: "Enter" });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Card disabled>Disabled Card</Card>);
    const card = screen.getByText("Disabled Card").closest("div");
    expect(card).toHaveClass("opacity-50", "cursor-not-allowed");
  });

  it("does not trigger click when disabled", async () => {
    const handleClick = jest.fn();
    render(
      <Card disabled onClick={handleClick}>
        Disabled Card
      </Card>,
    );

    const card = screen.getByText("Disabled Card").closest("div");
    await userEvent.click(card!);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref Card</Card>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByText("Ref Card").closest("div"));
  });

  it("spreads additional props", () => {
    render(
      <Card data-testid="test-card" aria-label="Test">
        Props Card
      </Card>,
    );
    const card = screen.getByText("Props Card").closest("div");

    expect(card).toHaveAttribute("data-testid", "test-card");
    expect(card).toHaveAttribute("aria-label", "Test");
  });

  it("renders as child component when asChild is true", () => {
    render(
      <Card asChild>
        <article>Article Card</article>
      </Card>,
    );

    const article = screen.getByText("Article Card");
    expect(article.tagName).toBe("ARTICLE");
    expect(article).toHaveClass("border-border", "bg-card");
  });

  it("combines variant and size classes correctly", () => {
    render(
      <Card variant="outlined" size="lg">
        Combined Card
      </Card>,
    );
    const card = screen.getByText("Combined Card").closest("div");

    expect(card).toHaveClass("border-2", "border-border", "bg-transparent");
    expect(card).toHaveClass("p-6");
  });

  it("has correct transition classes", () => {
    render(<Card>Transition Card</Card>);
    const card = screen.getByText("Transition Card").closest("div");

    expect(card).toHaveClass("transition-all", "duration-200");
  });

  it("has correct focus styles", () => {
    render(<Card>Focus Card</Card>);
    const card = screen.getByText("Focus Card").closest("div");

    expect(card).toHaveClass(
      "rounded-lg",
      "border",
      "bg-card",
      "text-card-foreground",
    );
  });

  it("combines shadow with other variants correctly", () => {
    render(
      <Card variant="outlined" size="lg" shadow="md">
        Combined Shadow Card
      </Card>,
    );
    const card = screen.getByText("Combined Shadow Card").closest("div");

    expect(card).toHaveClass("border-2", "border-border", "bg-transparent");
    expect(card).toHaveClass("p-6");
    expect(card).toHaveClass("shadow-md");
  });

  it("applies cursor pointer and hover effects when onClick is provided and not disabled", () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    const card = screen.getByText("Clickable Card").closest("div");
    expect(card).toHaveClass(
      "cursor-pointer",
      "hover:shadow-md",
      "hover:border-primary/20",
    );
  });

  it("does not apply cursor pointer when no onClick is provided", () => {
    render(<Card>Non-clickable Card</Card>);
    const card = screen.getByText("Non-clickable Card").closest("div");
    expect(card).not.toHaveClass("cursor-pointer");
  });

  it("does not apply cursor pointer when interactive variant has no onClick", () => {
    render(<Card variant="interactive">Interactive Card No Click</Card>);
    const card = screen.getByText("Interactive Card No Click").closest("div");
    expect(card).not.toHaveClass("cursor-pointer");
  });

  it("prevents click events when no onClick is provided", async () => {
    render(<Card>Non-clickable Card</Card>);
    const card = screen.getByText("Non-clickable Card").closest("div");

    // The card should not have any click-related attributes
    expect(card).not.toHaveAttribute("onClick");
    expect(card).not.toHaveClass("cursor-pointer");

    // Try to click the card - it should not trigger any events
    await userEvent.click(card!);
    // If we reach here without errors, the click was prevented
  });

  it("allows click events when onClick is provided", async () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    const card = screen.getByText("Clickable Card").closest("div");

    // Click the card
    await userEvent.click(card!);

    // The click should work
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not apply cursor pointer when disabled with onClick", () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick} disabled>
        Disabled Clickable Card
      </Card>,
    );
    const card = screen.getByText("Disabled Clickable Card").closest("div");
    expect(card).not.toHaveClass("cursor-pointer");
    expect(card).toHaveClass("cursor-not-allowed");
  });
});

describe("CardHeader", () => {
  it("renders card header with children", () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("applies default size classes", () => {
    render(<CardHeader>Header</CardHeader>);
    const header = screen.getByText("Header").closest("div");
    expect(header).toHaveClass("pb-3");
  });

  it("applies different size classes", () => {
    const { rerender } = render(
      <CardHeader size="sm">Small Header</CardHeader>,
    );
    expect(screen.getByText("Small Header").closest("div")).toHaveClass("pb-2");

    rerender(<CardHeader size="lg">Large Header</CardHeader>);
    expect(screen.getByText("Large Header").closest("div")).toHaveClass("pb-4");
  });

  it("applies custom className", () => {
    render(<CardHeader className="custom-header">Custom Header</CardHeader>);
    const header = screen.getByText("Custom Header").closest("div");
    expect(header).toHaveClass("custom-header");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardHeader ref={ref}>Ref Header</CardHeader>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByText("Ref Header").closest("div"));
  });
});

describe("CardTitle", () => {
  it("renders card title with children", () => {
    render(<CardTitle>Title content</CardTitle>);
    expect(screen.getByText("Title content")).toBeInTheDocument();
  });

  it("renders as h3 by default", () => {
    render(<CardTitle>Default Title</CardTitle>);
    const title = screen.getByText("Default Title");
    expect(title.tagName).toBe("H3");
  });

  it("applies default size classes", () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByText("Title");
    expect(title).toHaveClass("text-xl");
  });

  it("applies different size classes", () => {
    const { rerender } = render(<CardTitle size="sm">Small Title</CardTitle>);
    expect(screen.getByText("Small Title")).toHaveClass("text-lg");

    rerender(<CardTitle size="lg">Large Title</CardTitle>);
    expect(screen.getByText("Large Title")).toHaveClass("text-2xl");
  });

  it("renders as child component when asChild is true", () => {
    render(
      <CardTitle asChild>
        <h1>H1 Title</h1>
      </CardTitle>,
    );

    const title = screen.getByText("H1 Title");
    expect(title.tagName).toBe("H1");
    expect(title).toHaveClass("text-xl", "font-semibold");
  });

  it("applies custom className", () => {
    render(<CardTitle className="custom-title">Custom Title</CardTitle>);
    const title = screen.getByText("Custom Title");
    expect(title).toHaveClass("custom-title");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(<CardTitle ref={ref}>Ref Title</CardTitle>);

    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    expect(ref.current).toBe(screen.getByText("Ref Title"));
  });
});

describe("CardDescription", () => {
  it("renders card description with children", () => {
    render(<CardDescription>Description content</CardDescription>);
    expect(screen.getByText("Description content")).toBeInTheDocument();
  });

  it("renders as p by default", () => {
    render(<CardDescription>Default Description</CardDescription>);
    const description = screen.getByText("Default Description");
    expect(description.tagName).toBe("P");
  });

  it("applies default size classes", () => {
    render(<CardDescription>Description</CardDescription>);
    const description = screen.getByText("Description");
    expect(description).toHaveClass("text-sm", "text-muted-foreground");
  });

  it("applies different size classes", () => {
    const { rerender } = render(
      <CardDescription size="sm">Small Description</CardDescription>,
    );
    expect(screen.getByText("Small Description")).toHaveClass("text-xs");

    rerender(<CardDescription size="lg">Large Description</CardDescription>);
    expect(screen.getByText("Large Description")).toHaveClass("text-base");
  });

  it("renders as child component when asChild is true", () => {
    render(
      <CardDescription asChild>
        <span>Span Description</span>
      </CardDescription>,
    );

    const description = screen.getByText("Span Description");
    expect(description.tagName).toBe("SPAN");
    expect(description).toHaveClass("text-sm", "text-muted-foreground");
  });

  it("applies custom className", () => {
    render(
      <CardDescription className="custom-description">
        Custom Description
      </CardDescription>,
    );
    const description = screen.getByText("Custom Description");
    expect(description).toHaveClass("custom-description");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<CardDescription ref={ref}>Ref Description</CardDescription>);

    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    expect(ref.current).toBe(screen.getByText("Ref Description"));
  });
});

describe("CardContent", () => {
  it("renders card content with children", () => {
    render(<CardContent>Content</CardContent>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies default size classes", () => {
    render(<CardContent>Content</CardContent>);
    const content = screen.getByText("Content").closest("div");
    expect(content).toHaveClass("py-3");
  });

  it("applies different size classes", () => {
    const { rerender } = render(
      <CardContent size="sm">Small Content</CardContent>,
    );
    expect(screen.getByText("Small Content").closest("div")).toHaveClass(
      "py-2",
    );

    rerender(<CardContent size="lg">Large Content</CardContent>);
    expect(screen.getByText("Large Content").closest("div")).toHaveClass(
      "py-4",
    );
  });

  it("applies custom className", () => {
    render(
      <CardContent className="custom-content">Custom Content</CardContent>,
    );
    const content = screen.getByText("Custom Content").closest("div");
    expect(content).toHaveClass("custom-content");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardContent ref={ref}>Ref Content</CardContent>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByText("Ref Content").closest("div"));
  });
});

describe("CardFooter", () => {
  it("renders card footer with children", () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies default size classes", () => {
    render(<CardFooter>Footer</CardFooter>);
    const footer = screen.getByText("Footer").closest("div");
    expect(footer).toHaveClass("pt-3");
  });

  it("applies different size classes", () => {
    const { rerender } = render(
      <CardFooter size="sm">Small Footer</CardFooter>,
    );
    expect(screen.getByText("Small Footer").closest("div")).toHaveClass("pt-2");

    rerender(<CardFooter size="lg">Large Footer</CardFooter>);
    expect(screen.getByText("Large Footer").closest("div")).toHaveClass("pt-4");
  });

  it("applies custom className", () => {
    render(<CardFooter className="custom-footer">Custom Footer</CardFooter>);
    const footer = screen.getByText("Custom Footer").closest("div");
    expect(footer).toHaveClass("custom-footer");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardFooter ref={ref}>Ref Footer</CardFooter>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByText("Ref Footer").closest("div"));
  });
});

describe("Card Composition", () => {
  it("renders complete card with all sub-components", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Card Content")).toBeInTheDocument();
    expect(screen.getByText("Card Footer")).toBeInTheDocument();
  });

  it("applies consistent sizing across all sub-components", () => {
    render(
      <Card size="lg">
        <CardHeader size="lg">
          <CardTitle size="lg">Large Title</CardTitle>
          <CardDescription size="lg">Large Description</CardDescription>
        </CardHeader>
        <CardContent size="lg">Large Content</CardContent>
        <CardFooter size="lg">Large Footer</CardFooter>
      </Card>,
    );

    const title = screen.getByText("Large Title");
    expect(title).toHaveClass("text-2xl");

    const description = screen.getByText("Large Description");
    expect(description).toHaveClass("text-base");

    const content = screen.getByText("Large Content").closest("div");
    expect(content).toHaveClass("py-4");

    const footer = screen.getByText("Large Footer").closest("div");
    expect(footer).toHaveClass("pt-4");
  });
});
