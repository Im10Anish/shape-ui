import { createTheme } from "../createTheme";
import {
  defaultTheme,
  defaultLightColors,
  defaultDarkColors,
} from "../defaultTheme";

describe("createTheme", () => {
  it("returns default theme when no config provided", () => {
    const theme = createTheme();

    expect(theme.colors).toEqual(defaultLightColors);
    expect(theme.mode).toBe("light");
    expect(theme.colorMode?.light).toEqual(defaultLightColors);
    expect(theme.colorMode?.dark).toEqual(defaultDarkColors);
  });

  it("merges custom colors with defaults", () => {
    const theme = createTheme({
      colors: {
        primary: {
          DEFAULT: "265 95% 70%",
          foreground: "0 0% 100%",
        },
      },
    });

    expect(theme.colors?.primary?.DEFAULT).toBe("265 95% 70%");
    expect(theme.colors?.secondary).toEqual(defaultLightColors.secondary);
  });

  it("creates dark mode theme", () => {
    const theme = createTheme({ mode: "dark" });

    expect(theme.mode).toBe("dark");
    expect(theme.colors).toEqual(defaultDarkColors);
  });

  it("handles colorMode configuration", () => {
    const theme = createTheme({
      colorMode: {
        light: {
          primary: {
            DEFAULT: "210 100% 50%",
            foreground: "0 0% 100%",
          },
        },
        dark: {
          primary: {
            DEFAULT: "265 95% 70%",
            foreground: "0 0% 100%",
          },
        },
      },
    });

    expect(theme.colorMode?.light.primary?.DEFAULT).toBe("210 100% 50%");
    expect(theme.colorMode?.dark.primary?.DEFAULT).toBe("265 95% 70%");
  });

  it("merges custom properties deeply", () => {
    const theme = createTheme({
      borderRadius: {
        lg: "16px",
        custom: "20px",
      },
      spacing: {
        brand: "1.25rem",
      },
    });

    expect(theme.borderRadius?.lg).toBe("16px");
    expect(theme.borderRadius?.custom).toBe("20px");
    expect(theme.borderRadius?.md).toBe(defaultTheme.borderRadius?.md);
    expect(theme.spacing?.brand).toBe("1.25rem");
  });

  it("handles CSS variables", () => {
    const theme = createTheme({
      cssVars: {
        "--custom-radius": "10px",
        "--brand-color": "265 95% 70%",
      },
    });

    expect(theme.cssVars?.["--custom-radius"]).toBe("10px");
    expect(theme.cssVars?.["--brand-color"]).toBe("265 95% 70%");
  });
});
