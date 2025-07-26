import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { type ShadowVariant } from "../../lib/shadows";

const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      default: "bg-muted",
      primary: "bg-primary/20",
      secondary: "bg-secondary/20",
      accent: "bg-accent/20",
    },
    size: {
      sm: "h-4 w-24",
      default: "h-6 w-32",
      lg: "h-8 w-48",
      xl: "h-12 w-64",
    },
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
    variant: "default",
    size: "default",
    shadow: "none",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
  shadow?: ShadowVariant;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { className, variant, size, shadow, width, height, style, ...props },
    ref,
  ) => {
    const hasCustomDimensions = width !== undefined || height !== undefined;
    const customStyle = hasCustomDimensions
      ? {
          ...(width !== undefined && { width }),
          ...(height !== undefined && { height }),
          ...style,
        }
      : style;

    const elementProps = {
      className: cn(skeletonVariants({ variant, size, shadow, className })),
      ref,
      ...(customStyle && { style: customStyle }),
      ...props,
    };

    return <div {...elementProps} />;
  },
);
Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
