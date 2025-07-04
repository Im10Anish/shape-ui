export interface ColorPalette {
  DEFAULT: string;
  foreground: string;
}

export interface ExtendedColorPalette extends ColorPalette {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  950?: string;
}

export interface ThemeColors {
  background?: string;
  foreground?: string;
  card?: ColorPalette;
  popover?: ColorPalette;
  primary?: ExtendedColorPalette;
  secondary?: ExtendedColorPalette;
  muted?: ColorPalette;
  accent?: ColorPalette;
  destructive?: ExtendedColorPalette;
  border?: string;
  input?: string;
  ring?: string;
  // Allow custom colors
  [key: string]: string | ColorPalette | ExtendedColorPalette | undefined;
}

export interface ThemeSpacing {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  "2xl"?: string;
  [key: string]: string | undefined;
}

export interface ThemeBorderRadius {
  none?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  "2xl"?: string;
  "3xl"?: string;
  full?: string;
  [key: string]: string | undefined;
}

export interface ThemeTypography {
  fontSize?: {
    xs?: string;
    sm?: string;
    base?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
    "3xl"?: string;
    "4xl"?: string;
    [key: string]: string | undefined;
  };
  fontWeight?: {
    thin?: string;
    light?: string;
    normal?: string;
    medium?: string;
    semibold?: string;
    bold?: string;
    extrabold?: string;
    [key: string]: string | undefined;
  };
  lineHeight?: {
    none?: string;
    tight?: string;
    snug?: string;
    normal?: string;
    relaxed?: string;
    loose?: string;
    [key: string]: string | undefined;
  };
  fontFamily?: {
    sans?: string[];
    serif?: string[];
    mono?: string[];
    [key: string]: string[] | undefined;
  };
}

export interface ThemeBreakpoints {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  "2xl"?: string;
  [key: string]: string | undefined;
}

export interface ThemeShadows {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  "2xl"?: string;
  inner?: string;
  none?: string;
  [key: string]: string | undefined;
}

export interface Theme {
  colors?: ThemeColors;
  spacing?: ThemeSpacing;
  borderRadius?: ThemeBorderRadius;
  typography?: ThemeTypography;
  breakpoints?: ThemeBreakpoints;
  shadows?: ThemeShadows;
  // CSS custom properties for backward compatibility
  cssVars?: Record<string, string>;
  // Allow extending with custom properties
  [key: string]: any;
}

export interface ThemeConfig extends Theme {
  mode?: "light" | "dark" | "system";
  colorMode?: {
    light: Partial<ThemeColors>;
    dark: Partial<ThemeColors>;
  };
}
