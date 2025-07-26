import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Skeleton } from "../Skeleton/Skeleton";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const avatarImageVariants = cva("aspect-square h-full w-full object-cover", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
      "2xl": "text-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
        "2xl": "text-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  loading?: boolean;
  onImageLoad?: () => void;
  onImageError?: () => void;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      src,
      alt,
      fallback,
      loading = false,
      onImageLoad,
      onImageError,
      children,
      ...props
    },
    ref,
  ) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoading, setImageLoading] = React.useState(false);

    React.useEffect(() => {
      if (src) {
        setImageError(false);
        setImageLoading(true);
      } else {
        setImageLoading(false);
      }
    }, [src]);

    const handleImageLoad = () => {
      setImageLoading(false);
      onImageLoad?.();
    };

    const handleImageError = () => {
      setImageError(true);
      setImageLoading(false);
      onImageError?.();
    };

    const getInitials = (name: string) => {
      const trimmedName = name.trim();
      if (!trimmedName) return "?";
      return trimmedName
        .split(/\s+/)
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const fallbackText = fallback || (alt ? getInitials(alt) : "?");

    if (loading) {
      return (
        <div
          className={cn(avatarVariants({ size, className }))}
          ref={ref}
          {...props}
        >
          <Skeleton
            className="h-full w-full rounded-full absolute inset-0"
            style={{ width: "100%", height: "100%" }}
            data-testid="skeleton"
          />
          {src && (
            <img
              src={src}
              alt={alt || "Avatar"}
              className="hidden"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>
      );
    }

    // Show fallback if no src or image errored
    const shouldShowFallback =
      !src || imageError || (src && alt && imageLoading);

    return (
      <div
        className={cn(avatarVariants({ size, className }))}
        ref={ref}
        {...props}
      >
        {shouldShowFallback && (
          <div className={cn(avatarFallbackVariants({ size }))}>
            {children || fallbackText}
          </div>
        )}
        {src && !imageError && (
          <img
            src={src}
            alt={alt || "Avatar"}
            className={cn(
              avatarImageVariants({ size }),
              imageLoading && "opacity-0 absolute inset-0",
              "transition-opacity duration-200",
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants, avatarImageVariants, avatarFallbackVariants };
