import {
  defaultTheme,
  defaultDarkColors,
  defaultLightColors,
} from "./defaultTheme";
import type { ThemeConfig } from "../types/themes";

export function createTheme(config: Partial<ThemeConfig> = {}): ThemeConfig {
  const { colorMode, mode = "light", ...themeOverrides } = config;

  function deepMerge<T extends Record<string, any>>(
    target: T,
    source: Partial<T>,
  ): T {
    const result = { ...target };

    for (const key in source) {
      if (source[key] !== undefined) {
        if (
          typeof source[key] === "object" &&
          source[key] !== null &&
          !Array.isArray(source[key]) &&
          typeof target[key] === "object" &&
          target[key] !== null &&
          !Array.isArray(target[key])
        ) {
          result[key] = deepMerge(target[key], source[key] as any);
        } else {
          result[key] = source[key] as any;
        }
      }
    }

    return result;
  }

  // Create base theme
  const baseTheme = deepMerge(defaultTheme, themeOverrides);

  // Handle color modes
  let lightColors = defaultLightColors;
  let darkColors = defaultDarkColors;

  if (colorMode?.light) {
    lightColors = deepMerge(defaultLightColors, colorMode.light);
  }
  if (colorMode?.dark) {
    darkColors = deepMerge(defaultDarkColors, colorMode.dark);
  }

  if (themeOverrides.colors) {
    lightColors = deepMerge(lightColors, themeOverrides.colors);
    darkColors = deepMerge(darkColors, themeOverrides.colors);
  }

  return {
    ...baseTheme,
    mode,
    colors: mode === "dark" ? darkColors : lightColors,
    colorMode: {
      light: lightColors,
      dark: darkColors,
    },
  };
}
