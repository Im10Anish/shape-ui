import { cva } from "class-variance-authority";

export const shadowVariants = cva("", {
  variants: {
    shadow: {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
      inner: "shadow-inner",
    },
  },
  defaultVariants: {
    shadow: "none",
  },
});

export type ShadowVariant =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "inner";
