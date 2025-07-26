// Components
export {
  Avatar,
  type AvatarProps,
  avatarVariants,
  avatarImageVariants,
  avatarFallbackVariants,
} from "./components/Avatar/Avatar";
export {
  Button,
  type ButtonProps,
  buttonVariants,
} from "./components/Button/Button";
export {
  Skeleton,
  type SkeletonProps,
  skeletonVariants,
} from "./components/Skeleton/Skeleton";
export {
  ThemeToggle,
  type ThemeToggleProps,
} from "./components/ThemeToggle/ThemeToggle";
export {
  Typography,
  type TypographyProps,
  typographyVariants,
} from "./components/Typography/Typography";

// Theme
export {
  ThemeProvider,
  useTheme,
  type ThemeProviderProps,
} from "./theme/ThemeProvider";
export { createTheme } from "./theme/createTheme";
export { useThemeTokens } from "./theme/useThemeTokens";
export { styled, type StyledProps } from "./theme/styled";
export {
  defaultTheme,
  defaultLightColors,
  defaultDarkColors,
} from "./theme/defaultTheme";

// Types
export type {
  Theme,
  ThemeConfig,
  ThemeColors,
  ColorPalette,
  ExtendedColorPalette,
  ThemeSpacing,
  ThemeBorderRadius,
  ThemeTypography,
  ThemeBreakpoints,
  ThemeShadows,
} from "./types/themes";

// Utilities
export { cn } from "./lib/utils";
export { shadowVariants, type ShadowVariant } from "./lib/shadows";

// Export styles for consumers
import "./styles/globals.css";
