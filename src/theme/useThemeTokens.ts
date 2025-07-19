import { useTheme } from "./ThemeProvider";

export function useThemeTokens() {
  const { theme } = useTheme();

  return {
    colors: theme.colors,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    typography: theme.typography,
    breakpoints: theme.breakpoints,
    shadows: theme.shadows,
    // Utility functions
    getColor: (path: string) => {
      const keys = path.split(".");
      let value: any = theme.colors;
      for (const key of keys) {
        value = value?.[key];
        if (value === undefined) break;
      }
      return typeof value === "object" && value?.DEFAULT
        ? value.DEFAULT
        : value;
    },
    getSpacing: (key: string) => theme.spacing?.[key],
    getBorderRadius: (key: string) => theme.borderRadius?.[key],
    getShadow: (key: string) => theme.shadows?.[key],
  };
}
