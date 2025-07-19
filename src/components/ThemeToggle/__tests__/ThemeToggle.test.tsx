import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "../ThemeToggle";
import { ThemeProvider } from "../../../theme/ThemeProvider";

function renderWithTheme(component: React.ReactElement, themeProps = {}) {
  return render(<ThemeProvider {...themeProps}>{component}</ThemeProvider>);
}
describe("ThemeToggle", () => {
  it("renders toggle button", () => {
    renderWithTheme(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("shows correct icon for light mode", () => {
    renderWithTheme(<ThemeToggle />);

    // In light mode, shows moon icon (for switching to dark)
    expect(screen.getByTestId("lucide-moon")).toBeInTheDocument();
  });

  it("shows correct icon for dark mode", () => {
    renderWithTheme(<ThemeToggle />, { defaultColorMode: "dark" });

    // In dark mode, shows sun icon (for switching to light)
    expect(screen.getByTestId("lucide-sun")).toBeInTheDocument();
  });

  it("toggles theme on click", () => {
    renderWithTheme(<ThemeToggle />);

    const button = screen.getByRole("button");

    // Initially shows moon (light mode)
    expect(screen.getByTestId("lucide-moon")).toBeInTheDocument();

    fireEvent.click(button);

    // After click, shows sun (dark mode)
    expect(screen.getByTestId("lucide-sun")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    renderWithTheme(<ThemeToggle className="custom-class" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("supports different sizes", () => {
    const { rerender } = renderWithTheme(<ThemeToggle size="sm" />);

    let button = screen.getByRole("button");
    expect(button).toHaveClass("h-9");

    rerender(
      <ThemeProvider>
        <ThemeToggle size="lg" />
      </ThemeProvider>,
    );

    button = screen.getByRole("button");
    expect(button).toHaveClass("h-11");
  });

  it("supports different variants", () => {
    const { rerender } = renderWithTheme(<ThemeToggle variant="outline" />);

    let button = screen.getByRole("button");
    expect(button).toHaveClass("border");

    rerender(
      <ThemeProvider>
        <ThemeToggle variant="ghost" />
      </ThemeProvider>,
    );

    button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-accent");
  });
});
