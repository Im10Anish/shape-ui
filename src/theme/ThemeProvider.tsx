import * as React from "react";
import type { ThemeConfig } from "../types/themes";
import { createTheme } from "./createTheme";

interface ThemeContextValue {
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  toggleColorMode: () => void;
  colorMode: "light" | "dark";
  setColorMode: (mode: "light" | "dark") => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

export interface ThemeProviderProps {
  readonly children: React.ReactNode;
  readonly theme?: Partial<ThemeConfig>;
  readonly defaultColorMode?: "light" | "dark" | "system";
  readonly enableColorModeToggle?: boolean;
  readonly storageKey?: string;
}

// Utility functions
const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

const getStoredColorMode = (storageKey: string): "light" | "dark" | null => {
  if (!isBrowser()) return null;
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
};

const setStoredColorMode = (
  storageKey: string,
  mode: "light" | "dark",
): void => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(storageKey, mode);
  } catch {
    // Ignore localStorage errors
  }
};

const getSystemColorMode = (): "light" | "dark" => {
  if (!isBrowser() || !window.matchMedia) return "light";
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
};

const initializeColorMode = (
  defaultColorMode: "light" | "dark" | "system",
  storageKey: string,
): "light" | "dark" => {
  if (typeof window === "undefined") {
    return defaultColorMode === "dark" ? "dark" : "light";
  }

  // Check stored preference first
  const stored = getStoredColorMode(storageKey);
  if (stored) return stored;

  // Handle system preference
  if (defaultColorMode === "system") {
    return getSystemColorMode();
  }

  return defaultColorMode;
};

const applyThemeToDOM = (
  theme: ThemeConfig,
  colorMode: "light" | "dark",
): void => {
  if (!isBrowser() || !document.documentElement) return;

  const root = document.documentElement;

  try {
    const existingVars = Array.from(document.documentElement.style).filter(
      (prop) => prop.startsWith("--"),
    );
    existingVars.forEach((prop) => {
      root.style.removeProperty(prop);
    });

    // Apply new theme colors as CSS variables
    const colors = theme.colorMode?.[colorMode] || theme.colors || {};

    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === "string") {
        try {
          root.style.setProperty(`--${key}`, value);
        } catch {
          // Ignore CSS errors
        }
      } else if (value && typeof value === "object") {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === "string") {
            const varName = subKey === "DEFAULT" ? key : `${key}-${subKey}`;
            try {
              root.style.setProperty(`--${varName}`, subValue);
            } catch {
              // Ignore CSS errors
            }
          }
        });
      }
    });

    // Apply other CSS variables
    if (theme.cssVars) {
      Object.entries(theme.cssVars).forEach(([key, value]) => {
        try {
          root.style.setProperty(key, value);
        } catch {
          // Ignore CSS errors
        }
      });
    }

    // Apply color mode class
    try {
      root.classList.remove("light", "dark");
      root.classList.add(colorMode);
    } catch {
      // Ignore class manipulation errors
    }
  } catch {
    // Ignore all DOM manipulation errors
  }
};

export {
  initializeColorMode,
  getStoredColorMode,
  setStoredColorMode,
  applyThemeToDOM,
  getSystemColorMode,
};

export function ThemeProvider({
  children,
  theme: themeProp,
  defaultColorMode = "light",
  enableColorModeToggle = true,
  storageKey = "shape-ui-color-mode",
}: ThemeProviderProps) {
  // Initialize color mode
  const [colorMode, setColorModeState] = React.useState<"light" | "dark">(() =>
    initializeColorMode(defaultColorMode, storageKey),
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

  // Apply theme to DOM
  React.useEffect(() => {
    applyThemeToDOM(theme, colorMode);
  }, [theme, colorMode]);

  React.useEffect(() => {
    if (defaultColorMode !== "system") return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia) return;

    try {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      if (!mediaQuery) return;

      const handleChange = (e: MediaQueryListEvent) => {
        setColorModeState(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    } catch {
      // Ignore matchMedia errors
    }
  }, [defaultColorMode]);

  const setColorMode = React.useCallback(
    (mode: "light" | "dark") => {
      setColorModeState(mode);
      if (enableColorModeToggle) {
        setStoredColorMode(storageKey, mode);
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

  const contextValue = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleColorMode,
      colorMode,
      setColorMode,
    }),
    [theme, setTheme, toggleColorMode, colorMode, setColorMode],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
