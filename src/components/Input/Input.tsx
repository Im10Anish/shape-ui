import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-input bg-muted/50",
        underline:
          "border-0 border-b-2 border-input rounded-none bg-transparent px-0 py-1 focus-visible:border-b-primary focus-visible:ring-0 focus-visible:ring-offset-0",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
      state: {
        default: "",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  success?: boolean;
  showPasswordToggle?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      success,
      showPasswordToggle = false,
      leftIcon,
      rightIcon,
      containerClassName,
      labelClassName,
      errorClassName,
      type = "text",
      disabled,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [inputType, setInputType] = React.useState(type);

    const isPasswordWithToggle = type === "password" && showPasswordToggle;
    const hasRightContent =
      rightIcon || error || success || isPasswordWithToggle;

    React.useEffect(() => {
      if (isPasswordWithToggle) {
        setInputType(showPassword ? "text" : "password");
      } else {
        setInputType(type);
      }
    }, [type, showPassword, isPasswordWithToggle]);

    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
    };

    const getState = () => {
      if (error) return "error";
      if (success) return "success";
      return "default";
    };

    const renderPasswordToggle = () => {
      return (
        <button
          type="button"
          onClick={handlePasswordToggle}
          className="text-muted-foreground hover:text-foreground transition-colors"
          disabled={disabled}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      );
    };

    const renderStatusIcon = () => {
      if (error) {
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      }
      if (success) {
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      }
      return null;
    };

    const renderRightIcon = () => {
      const statusIcon = renderStatusIcon();
      if (statusIcon) {
        return statusIcon;
      }
      if (isPasswordWithToggle) {
        return renderPasswordToggle();
      }
      return rightIcon;
    };

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(
              inputVariants({ variant, size, state: getState() }),
              leftIcon && "pl-10",
              hasRightContent && "pr-10",
              className,
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {hasRightContent && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              {renderRightIcon()}
            </div>
          )}
        </div>
        {error && (
          <p className={cn("text-sm text-destructive", errorClassName)}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
