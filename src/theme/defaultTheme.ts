import type { ThemeColors, Theme } from "../types/themes";

// Shared color scales to eliminate duplication
const primaryColorScale = {
  50: "214 95% 93%",
  100: "214 95% 87%",
  200: "213 97% 81%",
  300: "212 96% 73%",
  400: "213 94% 68%",
  600: "224 76% 48%",
  700: "226 71% 40%",
  800: "224 64% 33%",
  900: "224 39% 25%",
  950: "226 56% 17%",
} as const;

const destructiveColorScale = {
  50: "0 86% 97%",
  100: "0 93% 94%",
  200: "0 96% 89%",
  300: "0 94% 82%",
  400: "0 91% 71%",
  600: "0 72% 51%",
  700: "0 74% 42%",
  800: "0 70% 35%",
  900: "0 63% 31%",
  950: "0 75% 16%",
} as const;

// Function to create theme colors with minimal duplication
interface ThemeColorParams {
  background: string;
  foreground: string;
  primaryDefault: string;
  primaryForeground: string;
  secondaryDefault: string;
  mutedDefault: string;
  mutedForeground: string;
  accentDefault: string;
  destructiveDefault: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

const createThemeColors = (params: ThemeColorParams): ThemeColors => ({
  background: params.background,
  foreground: params.foreground,
  card: {
    DEFAULT: params.background,
    foreground: params.foreground,
  },
  popover: {
    DEFAULT: params.background,
    foreground: params.foreground,
  },
  primary: {
    DEFAULT: params.primaryDefault,
    foreground: params.primaryForeground,
    ...primaryColorScale,
    500: params.primaryDefault,
  },
  secondary: {
    DEFAULT: params.secondaryDefault,
    foreground: params.foreground,
  },
  muted: {
    DEFAULT: params.mutedDefault,
    foreground: params.mutedForeground,
  },
  accent: {
    DEFAULT: params.accentDefault,
    foreground: params.foreground,
  },
  destructive: {
    DEFAULT: params.destructiveDefault,
    foreground: params.destructiveForeground,
    ...destructiveColorScale,
    500: params.destructiveDefault,
  },
  border: params.border,
  input: params.input,
  ring: params.ring,
});

export const defaultLightColors: ThemeColors = createThemeColors({
  background: "0 0% 100%",
  foreground: "222.2 84% 4.9%",
  primaryDefault: "221.2 83.2% 53.3%",
  primaryForeground: "210 40% 98%",
  secondaryDefault: "210 40% 96%",
  mutedDefault: "210 40% 96%",
  mutedForeground: "215.4 16.3% 46.9%",
  accentDefault: "210 40% 96%",
  destructiveDefault: "0 84.2% 60.2%",
  destructiveForeground: "210 40% 98%",
  border: "214.3 31.8% 91.4%",
  input: "214.3 31.8% 91.4%",
  ring: "221.2 83.2% 53.3%",
});

export const defaultDarkColors: ThemeColors = createThemeColors({
  background: "222.2 84% 4.9%",
  foreground: "210 40% 98%",
  primaryDefault: "217.2 91.2% 59.8%",
  primaryForeground: "222.2 84% 4.9%",
  secondaryDefault: "217.2 32.6% 17.5%",
  mutedDefault: "217.2 32.6% 17.5%",
  mutedForeground: "215 20.2% 65.1%",
  accentDefault: "217.2 32.6% 17.5%",
  destructiveDefault: "0 62.8% 30.6%",
  destructiveForeground: "210 40% 98%",
  border: "217.2 32.6% 17.5%",
  input: "217.2 32.6% 17.5%",
  ring: "224.3 76.3% 94.1%",
});

// Shared theme configuration
const borderRadius = {
  none: "0px",
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  lg: "var(--radius)",
  xl: "12px",
  "2xl": "16px",
  "3xl": "24px",
  full: "9999px",
} as const;

const spacing = {
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
} as const;

const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
} as const;

const fontWeight = {
  thin: "100",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
} as const;

const lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

const fontFamily = {
  sans: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
  serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
  mono: ["Consolas", "Monaco", "Courier New", "monospace"],
};

const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "0 0 #0000",
} as const;

const cssVars = {
  "--radius": "0.5rem",
} as const;

export const defaultTheme: Theme = {
  colors: defaultLightColors,
  borderRadius,
  spacing,
  typography: {
    fontSize,
    fontWeight,
    lineHeight,
    fontFamily,
  },
  breakpoints,
  shadows,
  cssVars,
};
