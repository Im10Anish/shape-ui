import * as React from "react";
import type { ThemeConfig } from "../types/themes";
import { createTheme } from "./createTheme";

interface ThemeContextProps {
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  toggleColorMode: () => void;
  colorMode: "light" | "dark";
  setColorMode: (mode: "light" | "dark") => void;
}

const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined,
);

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Partial<ThemeConfig>;
  defaultColorMode?: "light" | "dark" | "system";
  enableColorModeToggle?: boolean;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  theme: themeProp,
  defaultColorMode = "light",
  enableColorModeToggle = true,
  storageKey = "shape-ui-theme",
}: ThemeProviderProps) {
  // Initialize color mode
  const [colorMode, setColorModeState] = React.useState<"light" | "dark">(
    () => {
      if (typeof window === "undefined")
        return defaultColorMode === "dark" ? "dark" : "light";

      if (defaultColorMode === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }

      const stored = localStorage.getItem(storageKey);
      if (stored && (stored === "light" || stored === "dark")) {
        return stored;
      }

      return defaultColorMode === "dark" ? "dark" : "light";
    },
  );

  // Create theme
  const [theme, setThemeState] = React.useState<ThemeConfig>(() => {
    return createTheme({ ...themeProp, mode: colorMode });
  });

  // Update theme when color mode or theme prop changes
  React.useEffect(() => {
    const newTheme = createTheme({ ...themeProp, mode: colorMode });
    setThemeState(newTheme);
  }, [colorMode, themeProp]);

  // Apply CSS variables to document
  React.useEffect(() => {
    const root = document.documentElement;

    // Clear existing CSS variables
    const existingVars = Array.from(document.documentElement.style).filter(
      (prop) => prop.startsWith("--"),
    );
    existingVars.forEach((prop) => {
      root.style.removeProperty(prop);
    });

    // Apply theme colors as CSS variables
    const colors = theme.colorMode?.[colorMode] || theme.colors || {};

    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === "string") {
        root.style.setProperty(`--${key}`, value);
      } else if (value && typeof value === "object") {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === "string") {
            const varName = subKey === "DEFAULT" ? key : `${key}-${subKey}`;
            root.style.setProperty(`--${varName}`, subValue);
          }
        });
      }
    });

    // Apply other CSS variables
    if (theme.cssVars) {
      Object.entries(theme.cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }

    // Apply color mode class
    root.classList.remove("light", "dark");
    root.classList.add(colorMode);
  }, [theme, colorMode]);

  // Handle system theme changes
  React.useEffect(() => {
    if (defaultColorMode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setColorModeState(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [defaultColorMode]);

  const setColorMode = React.useCallback(
    (mode: "light" | "dark") => {
      setColorModeState(mode);
      if (enableColorModeToggle && typeof window !== "undefined") {
        localStorage.setItem(storageKey, mode);
      }
    },
    [enableColorModeToggle, storageKey],
  );

  const toggleColorMode = React.useCallback(() => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  }, [colorMode, setColorMode]);

  const setTheme = React.useCallback(
    (newTheme: Partial<ThemeConfig>) => {
      const updatedTheme = createTheme({
        ...theme,
        ...newTheme,
        mode: colorMode,
      });
      setThemeState(updatedTheme);
    },
    [theme, colorMode],
  );

  const contextValue: ThemeContextProps = {
    theme,
    setTheme,
    toggleColorMode,
    colorMode,
    setColorMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextProps {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
