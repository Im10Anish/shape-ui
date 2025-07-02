import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary", "text-primary-foreground");
  });

  it("applies destructive variant classes", () => {
    render(<Button variant="destructive">Destructive Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-destructive", "text-destructive-foreground");
  });

  it("applies outline variant classes", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border", "border-input", "bg-background");
  });

  it("applies secondary variant classes", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-secondary", "text-secondary-foreground");
  });

  it("applies ghost variant classes", () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "hover:bg-accent",
      "hover:text-accent-foreground"
    );
  });

  it("applies link variant classes", () => {
    render(<Button variant="link">Link Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-primary", "underline-offset-4");
  });

  it("applies small size classes", () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-9", "px-3");
  });

  it("applies large size classes", () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-11", "px-8");
  });

  it("applies icon size classes", () => {
    render(<Button size="icon">Icon</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-10", "w-10");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles keyboard events", () => {
    const handleKeyDown = jest.fn();
    render(<Button onKeyDown={handleKeyDown}>Keyboard Button</Button>);

    const button = screen.getByRole("button");
    fireEvent.keyDown(button, { key: "Enter", code: "Enter" });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "disabled:pointer-events-none",
      "disabled:opacity-50"
    );
  });

  it("does not trigger click when disabled", async () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(screen.getByRole("button"));
  });

  it("spreads additional props", () => {
    render(
      <Button data-testid="test-button" aria-label="Test">
        Props Button
      </Button>
    );
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("data-testid", "test-button");
    expect(button).toHaveAttribute("aria-label", "Test");
  });

  it("renders as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveClass("bg-primary", "text-primary-foreground");
  });

  it("combines variant and size classes correctly", () => {
    render(
      <Button variant="outline" size="lg">
        Combined Button
      </Button>
    );
    const button = screen.getByRole("button");

    expect(button).toHaveClass("border", "border-input", "bg-background");
    expect(button).toHaveClass("h-11", "px-8");
  });

  it("has correct focus styles", () => {
    render(<Button>Focus Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass(
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2"
    );
  });

  it("has correct transition classes", () => {
    render(<Button>Transition Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("transition-colors");
  });

  it("maintains accessibility attributes", () => {
    render(
      <Button type="submit" form="test-form">
        Submit Button
      </Button>
    );
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("form", "test-form");
  });
});
