import React from "react";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "../Skeleton";

describe("Skeleton", () => {
  it("renders skeleton element", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-muted");
  });

  it("applies primary variant classes", () => {
    render(<Skeleton variant="primary" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("bg-primary/20");
  });

  it("applies secondary variant classes", () => {
    render(<Skeleton variant="secondary" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("bg-secondary/20");
  });

  it("applies accent variant classes", () => {
    render(<Skeleton variant="accent" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("bg-accent/20");
  });

  it("applies small size classes", () => {
    render(<Skeleton size="sm" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-4");
  });

  it("applies default size classes", () => {
    render(<Skeleton size="default" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-6");
  });

  it("applies large size classes", () => {
    render(<Skeleton size="lg" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-8");
  });

  it("applies xl size classes", () => {
    render(<Skeleton size="xl" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-12");
  });

  it("applies custom className", () => {
    render(<Skeleton className="custom-class" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("custom-class");
  });

  it("applies custom width as string", () => {
    render(<Skeleton width="200px" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveStyle({ width: "200px" });
  });

  it("applies custom width as number", () => {
    render(<Skeleton width={300} data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveStyle({ width: 300 });
  });

  it("applies custom height as string", () => {
    render(<Skeleton height="50px" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveStyle({ height: "50px" });
  });

  it("applies custom height as number", () => {
    render(<Skeleton height={100} data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveStyle({ height: 100 });
  });

  it("combines custom width and height", () => {
    render(<Skeleton width="150px" height="75px" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveStyle({ width: "150px", height: "75px" });
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} data-testid="skeleton" />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByTestId("skeleton"));
  });

  it("spreads additional props", () => {
    render(
      <Skeleton
        data-testid="skeleton"
        aria-label="Loading content"
        role="status"
      />,
    );
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveAttribute("aria-label", "Loading content");
    expect(skeleton).toHaveAttribute("role", "status");
  });

  it("combines variant and size classes correctly", () => {
    render(<Skeleton variant="primary" size="lg" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveClass("bg-primary/20", "h-8");
  });

  it("merges custom style with width and height", () => {
    render(
      <Skeleton
        width="200px"
        height="100px"
        style={{ backgroundColor: "red" }}
        data-testid="skeleton"
      />,
    );
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveStyle({
      width: "200px",
      height: "100px",
      backgroundColor: "red",
    });
  });

  it("has correct base classes", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-muted");
  });

  it("maintains accessibility attributes", () => {
    render(
      <Skeleton data-testid="skeleton" aria-busy="true" aria-live="polite" />,
    );
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveAttribute("aria-busy", "true");
    expect(skeleton).toHaveAttribute("aria-live", "polite");
  });

  it("renders with children content", () => {
    render(
      <Skeleton data-testid="skeleton">
        <span>Loading...</span>
      </Skeleton>,
    );
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveTextContent("Loading...");
  });

  it("applies all variants correctly", () => {
    const { rerender } = render(
      <Skeleton variant="default" data-testid="skeleton" />,
    );
    expect(screen.getByTestId("skeleton")).toHaveClass("bg-muted");

    rerender(<Skeleton variant="primary" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("bg-primary/20");

    rerender(<Skeleton variant="secondary" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("bg-secondary/20");

    rerender(<Skeleton variant="accent" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("bg-accent/20");
  });

  it("applies all sizes correctly", () => {
    const { rerender } = render(<Skeleton size="sm" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("h-4");

    rerender(<Skeleton size="default" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("h-6");

    rerender(<Skeleton size="lg" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("h-8");

    rerender(<Skeleton size="xl" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("h-12");
  });
});
