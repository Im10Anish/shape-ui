import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { type ShadowVariant } from "../../lib/shadows";

const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background text-foreground",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-white",
        info: "bg-blue-500 text-white",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base",
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
      size: "md",
      shadow: "none",
    },
  },
);

const badgeContentVariants = cva("flex items-center gap-1", {
  variants: {
    size: {
      sm: "gap-0.5",
      md: "gap-1",
      lg: "gap-1",
      xl: "gap-1.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const badgeIconVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      sm: "w-3 h-3 text-xs",
      md: "w-3.5 h-3.5 text-sm",
      lg: "w-4 h-4 text-base",
      xl: "w-5 h-5 text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  number?: number;
  range?: number;
  showZero?: boolean;
  shadow?: ShadowVariant;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      shadow,
      children,
      icon,
      number,
      range,
      showZero = false,
      ...props
    },
    ref,
  ) => {
    const renderContent = () => {
      // If children are provided, render them directly
      if (children) {
        return (
          <div className={cn(badgeContentVariants({ size }))}>
            {icon && (
              <span className={cn(badgeIconVariants({ size }))}>{icon}</span>
            )}
            {children}
          </div>
        );
      }

      // If number is provided, handle range logic
      if (number !== undefined) {
        const shouldShowNumber = showZero || number > 0;
        const displayValue = range && number > range ? `${range}+` : number;

        if (!shouldShowNumber) {
          return null;
        }

        return (
          <div className={cn(badgeContentVariants({ size }))}>
            {icon && (
              <span className={cn(badgeIconVariants({ size }))}>{icon}</span>
            )}
            {displayValue}
          </div>
        );
      }

      // If only icon is provided
      if (icon) {
        return (
          <div className="flex items-center justify-center">
            <span className={cn(badgeIconVariants({ size }))}>{icon}</span>
          </div>
        );
      }

      // Default fallback
      return null;
    };

    const content = renderContent();

    // Don't render badge if no content
    if (!content) {
      return null;
    }

    return (
      <div
        className={cn(badgeVariants({ variant, size, shadow, className }))}
        ref={ref}
        {...props}
      >
        {content}
      </div>
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badgeVariants, badgeContentVariants, badgeIconVariants };
