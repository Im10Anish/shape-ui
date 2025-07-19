import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../ThemeProvider";
import { useThemeTokens } from "../useThemeTokens";
import { createTheme } from "../createTheme";

function TestComponent() {
  const { getColor, getBorderRadius, getSpacing, getShadow } = useThemeTokens();

  return (
    <div>
      <span data-testid="primary-color">{getColor("primary")}</span>
      <span data-testid="primary-50">{getColor("primary.50")}</span>
      <span data-testid="border-radius">{getBorderRadius("lg")}</span>
      <span data-testid="spacing">{getSpacing("md")}</span>
      <span data-testid="shadow">{getShadow("md")}</span>
    </div>
  );
}

describe("useThemeTokens", () => {
  it("provides theme token accessors", () => {
    const customTheme = createTheme({
      colors: {
        primary: {
          DEFAULT: "265 95% 70%",
          50: "265 95% 95%",
          foreground: "0 0% 100%",
        },
      },
      borderRadius: {
        lg: "16px",
      },
      spacing: {
        md: "2rem",
      },
      shadows: {
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    });

    render(
      <ThemeProvider theme={customTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("primary-color")).toHaveTextContent(
      "265 95% 70%",
    );
    expect(screen.getByTestId("primary-50")).toHaveTextContent("265 95% 95%");
    expect(screen.getByTestId("border-radius")).toHaveTextContent("16px");
    expect(screen.getByTestId("spacing")).toHaveTextContent("2rem");
    expect(screen.getByTestId("shadow")).toHaveTextContent(
      "0 4px 6px rgba(0, 0, 0, 0.1)",
    );
  });

  it("handles nested color paths", () => {
    const customTheme = createTheme({
      colors: {
        primary: {
          DEFAULT: "265 95% 70%",
          500: "265 95% 60%",
          foreground: "0 0% 100%",
        },
      },
    });

    function NestedTestComponent() {
      const { getColor } = useThemeTokens();
      return (
        <div>
          <span data-testid="primary-default">{getColor("primary")}</span>
          <span data-testid="primary-500">{getColor("primary.500")}</span>
          <span data-testid="nonexistent">{getColor("nonexistent.color")}</span>
        </div>
      );
    }

    render(
      <ThemeProvider theme={customTheme}>
        <NestedTestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("primary-default")).toHaveTextContent(
      "265 95% 70%",
    );
    expect(screen.getByTestId("primary-500")).toHaveTextContent("265 95% 60%");
    expect(screen.getByTestId("nonexistent")).toHaveTextContent("");
  });
});
