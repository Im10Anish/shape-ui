import React from "react";
import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("renders badge with text content", () => {
    render(<Badge>Badge Text</Badge>);
    expect(screen.getByText("Badge Text")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText("Default Badge").parentElement;
    expect(badge).toHaveClass("bg-primary", "text-primary-foreground");
  });

  it("applies secondary variant classes", () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText("Secondary Badge").parentElement;
    expect(badge).toHaveClass("bg-secondary", "text-secondary-foreground");
  });

  it("applies destructive variant classes", () => {
    render(<Badge variant="destructive">Destructive Badge</Badge>);
    const badge = screen.getByText("Destructive Badge").parentElement;
    expect(badge).toHaveClass("bg-destructive", "text-destructive-foreground");
  });

  it("applies outline variant classes", () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    const badge = screen.getByText("Outline Badge").parentElement;
    expect(badge).toHaveClass("border", "border-input", "bg-background");
  });

  it("applies success variant classes", () => {
    render(<Badge variant="success">Success Badge</Badge>);
    const badge = screen.getByText("Success Badge").parentElement;
    expect(badge).toHaveClass("bg-green-500", "text-white");
  });

  it("applies warning variant classes", () => {
    render(<Badge variant="warning">Warning Badge</Badge>);
    const badge = screen.getByText("Warning Badge").parentElement;
    expect(badge).toHaveClass("bg-yellow-500", "text-white");
  });

  it("applies info variant classes", () => {
    render(<Badge variant="info">Info Badge</Badge>);
    const badge = screen.getByText("Info Badge").parentElement;
    expect(badge).toHaveClass("bg-blue-500", "text-white");
  });

  it("applies small size classes", () => {
    render(<Badge size="sm">Small Badge</Badge>);
    const badge = screen.getByText("Small Badge").parentElement;
    expect(badge).toHaveClass("px-2", "py-0.5", "text-xs");
  });

  it("applies medium size classes", () => {
    render(<Badge size="md">Medium Badge</Badge>);
    const badge = screen.getByText("Medium Badge").parentElement;
    expect(badge).toHaveClass("px-2.5", "py-0.5", "text-sm");
  });

  it("applies large size classes", () => {
    render(<Badge size="lg">Large Badge</Badge>);
    const badge = screen.getByText("Large Badge").parentElement;
    expect(badge).toHaveClass("px-3", "py-1", "text-sm");
  });

  it("applies extra large size classes", () => {
    render(<Badge size="xl">Extra Large Badge</Badge>);
    const badge = screen.getByText("Extra Large Badge").parentElement;
    expect(badge).toHaveClass("px-4", "py-1.5", "text-base");
  });

  it("applies custom className", () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText("Custom Badge").parentElement;
    expect(badge).toHaveClass("custom-class");
  });

  it("renders badge with icon", () => {
    render(<Badge icon="🔥">Badge with Icon</Badge>);
    expect(screen.getByText("🔥")).toBeInTheDocument();
    expect(screen.getByText("Badge with Icon")).toBeInTheDocument();
  });

  it("renders badge with only icon", () => {
    render(<Badge icon="🔥" />);
    expect(screen.getByText("🔥")).toBeInTheDocument();
  });

  it("renders badge with number", () => {
    render(<Badge number={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders badge with number and icon", () => {
    render(<Badge number={5} icon="🔥" />);
    expect(screen.getByText("🔥")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders badge with number within range", () => {
    render(<Badge number={15} range={20} />);
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("renders badge with number exceeding range", () => {
    render(<Badge number={25} range={20} />);
    expect(screen.getByText("20+")).toBeInTheDocument();
  });

  it("renders badge with zero number when showZero is true", () => {
    render(<Badge number={0} showZero />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("does not render badge with zero number when showZero is false", () => {
    const { container } = render(<Badge number={0} showZero={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("does not render badge with negative number", () => {
    const { container } = render(<Badge number={-1} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders badge with number and range when number equals range", () => {
    render(<Badge number={20} range={20} />);
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("applies shadow classes correctly", () => {
    render(<Badge shadow="lg">Shadow Badge</Badge>);
    const badge = screen.getByText("Shadow Badge").parentElement;
    expect(badge).toHaveClass("shadow-lg");
  });

  it("applies different shadow variants", () => {
    const { rerender } = render(<Badge shadow="sm">Small Shadow</Badge>);
    expect(screen.getByText("Small Shadow").parentElement).toHaveClass(
      "shadow-sm",
    );

    rerender(<Badge shadow="xl">Large Shadow</Badge>);
    expect(screen.getByText("Large Shadow").parentElement).toHaveClass(
      "shadow-xl",
    );

    rerender(<Badge shadow="2xl">Extra Large Shadow</Badge>);
    expect(screen.getByText("Extra Large Shadow").parentElement).toHaveClass(
      "shadow-2xl",
    );

    rerender(<Badge shadow="inner">Inner Shadow</Badge>);
    expect(screen.getByText("Inner Shadow").parentElement).toHaveClass(
      "shadow-inner",
    );
  });

  it("has no shadow by default", () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText("Default Badge").parentElement;
    expect(badge).not.toHaveClass(
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "shadow-xl",
      "shadow-2xl",
      "shadow-inner",
    );
  });

  it("combines variant, size, and shadow correctly", () => {
    render(
      <Badge variant="outline" size="lg" shadow="md">
        Combined Badge
      </Badge>,
    );
    const badge = screen.getByText("Combined Badge").parentElement;

    expect(badge).toHaveClass("border", "border-input", "bg-background");
    expect(badge).toHaveClass("px-3", "py-1", "text-sm");
    expect(badge).toHaveClass("shadow-md");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Badge ref={ref}>Ref Badge</Badge>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByText("Ref Badge").parentElement);
  });

  it("spreads additional props", () => {
    render(
      <Badge data-testid="test-badge" aria-label="Test">
        Props Badge
      </Badge>,
    );
    const badge = screen.getByText("Props Badge").parentElement;

    expect(badge).toHaveAttribute("data-testid", "test-badge");
    expect(badge).toHaveAttribute("aria-label", "Test");
  });

  it("has correct focus styles", () => {
    render(<Badge>Focus Badge</Badge>);
    const badge = screen.getByText("Focus Badge").parentElement;

    expect(badge).toHaveClass(
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-ring",
      "focus:ring-offset-2",
    );
  });

  it("has correct transition classes", () => {
    render(<Badge>Transition Badge</Badge>);
    const badge = screen.getByText("Transition Badge").parentElement;

    expect(badge).toHaveClass("transition-colors");
  });

  it("renders with complex children", () => {
    render(
      <Badge>
        <span>Complex</span> <strong>Content</strong>
      </Badge>,
    );
    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders with React element as icon", () => {
    const IconComponent = () => <span data-testid="icon">🎯</span>;
    render(<Badge icon={<IconComponent />}>Badge with React Icon</Badge>);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Badge with React Icon")).toBeInTheDocument();
  });

  it("renders icon with proper styling classes", () => {
    render(<Badge icon="🔥">Badge with Icon</Badge>);
    const iconElement = screen.getByText("🔥").closest("span");
    expect(iconElement).toHaveClass("flex", "items-center", "justify-center");
  });

  it("renders icon-only badge with proper styling", () => {
    render(<Badge icon="🎯" />);
    const iconElement = screen.getByText("🎯").closest("span");
    expect(iconElement).toHaveClass("flex", "items-center", "justify-center");
  });

  it("handles edge case with very large numbers", () => {
    render(<Badge number={999999} range={100} />);
    expect(screen.getByText("100+")).toBeInTheDocument();
  });

  it("handles edge case with zero range", () => {
    render(<Badge number={5} range={0} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("handles negative range", () => {
    render(<Badge number={5} range={-10} />);
    expect(screen.getByText("-10+")).toBeInTheDocument();
  });

  it("does not render when no content is provided", () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).toBeNull();
  });

  it("does not render when only range is provided without number", () => {
    const { container } = render(<Badge range={10} />);
    expect(container.firstChild).toBeNull();
  });

  it("does not render when only showZero is provided without number", () => {
    const { container } = render(<Badge showZero />);
    expect(container.firstChild).toBeNull();
  });
});
