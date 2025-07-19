import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../Button/Button";
import { useTheme } from "../../theme/ThemeProvider";

export interface ThemeToggleProps {
  readonly className?: string;
  readonly size?: "sm" | "default" | "lg" | "icon";
  readonly variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export function ThemeToggle({
  className,
  size = "icon",
  variant = "outline",
}: ThemeToggleProps) {
  const { colorMode, toggleColorMode } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleColorMode}
      className={className}
      aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
    >
      {colorMode === "light" ? (
        <Moon className="h-4 w-4" data-testid="lucide-moon" />
      ) : (
        <Sun className="h-4 w-4" data-testid="lucide-sun" />
      )}
    </Button>
  );
}
