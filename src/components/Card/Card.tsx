import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { type ShadowVariant } from "../../lib/shadows";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        elevated: "border-border bg-card shadow-sm",
        outlined: "border-2 border-border bg-transparent",
        ghost: "border-transparent bg-transparent",
        interactive: "border-border bg-card",
        flat: "border-0 bg-muted/50",
        glass: "border-border/50 bg-background/80 backdrop-blur-sm",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
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
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shadow: "none",
      radius: "lg",
    },
  },
);

const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    size: {
      sm: "pb-2",
      md: "pb-3",
      lg: "pb-4",
      xl: "pb-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const cardTitleVariants = cva(
  "text-2xl font-semibold leading-none tracking-tight",
  {
    variants: {
      size: {
        sm: "text-lg",
        md: "text-xl",
        lg: "text-2xl",
        xl: "text-3xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const cardDescriptionVariants = cva("text-sm text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const cardContentVariants = cva("", {
  variants: {
    size: {
      sm: "py-2",
      md: "py-3",
      lg: "py-4",
      xl: "py-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const cardFooterVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "pt-2",
      md: "pt-3",
      lg: "pt-4",
      xl: "pt-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  shadow?: ShadowVariant;
  onClick?: () => void;
  disabled?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      shadow,
      radius,
      asChild = false,
      onClick,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    const handleClick = () => {
      if (!disabled && onClick) {
        onClick();
      }
    };

    return (
      <Comp
        className={cn(
          cardVariants({ variant, size, shadow, radius, className }),
          disabled && "opacity-50 cursor-not-allowed",
          onClick &&
            !disabled &&
            "cursor-pointer hover:shadow-md hover:border-primary/20",
        )}
        ref={ref}
        {...(onClick && !disabled ? { onClick: handleClick } : undefined)}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

// Card Header Component
export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ size, className }))}
      {...props}
    />
  ),
);

CardHeader.displayName = "CardHeader";

// Card Title Component
export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof cardTitleVariants> {
  asChild?: boolean;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3";
    return (
      <Comp
        ref={ref}
        className={cn(cardTitleVariants({ size, className }))}
        {...props}
      />
    );
  },
);

CardTitle.displayName = "CardTitle";

// Card Description Component
export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof cardDescriptionVariants> {
  asChild?: boolean;
}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      ref={ref}
      className={cn(cardDescriptionVariants({ size, className }))}
      {...props}
    />
  );
});

CardDescription.displayName = "CardDescription";

// Card Content Component
export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ size, className }))}
      {...props}
    />
  ),
);

CardContent.displayName = "CardContent";

// Card Footer Component
export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ size, className }))}
      {...props}
    />
  ),
);

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardDescriptionVariants,
  cardContentVariants,
  cardFooterVariants,
};
