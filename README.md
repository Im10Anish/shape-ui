# Shape UI

A modern React component library built with TypeScript, Tailwind CSS, and Radix UI primitives. Shape UI provides accessible, customizable components with a powerful theming system that supports both light and dark modes.

## ✨ Features

- **🎨 Modern Design**: Clean, accessible components built with Tailwind CSS
- **🌙 Dark Mode Support**: Built-in light/dark theme switching with system preference detection
- **🎯 TypeScript First**: Full TypeScript support with excellent type safety
- **♿ Accessibility**: Built on Radix UI primitives for excellent accessibility
- **🎭 Variant System**: Flexible component variants using Class Variance Authority (CVA)
- **🎪 Customizable Theming**: Easy theme customization with CSS variables
- **📱 Responsive**: Mobile-first responsive design
- **🔧 Zero Runtime**: No runtime overhead, pure CSS-in-JS solution

## 📦 Installation

```bash
npm install @im10anish/shape-ui
```

## 🚀 Quick Start

### 1. Set up your theme provider

```tsx
import { ThemeProvider } from "@im10anish/shape-ui";

function App() {
  return (
    <ThemeProvider defaultColorMode="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Import and use components

```tsx
import { Button, Typography } from "@im10anish/shape-ui";

function MyComponent() {
  return (
    <div>
      <Typography variant="h1">Welcome to Shape UI</Typography>
      <Button variant="default" size="lg">
        Get Started
      </Button>
    </div>
  );
}
```

## 🎨 Component Pattern

Shape UI follows a consistent pattern for all components:

### Variant System with CVA

All components use Class Variance Authority (CVA) for flexible styling:

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("base-styles", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border border-input bg-background",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
```

### Component Structure

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Define variants
const componentVariants = cva("base-classes", {
  variants: {
    // Your variants here
  },
  defaultVariants: {
    // Default variants
  },
});

// Component interface
export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  asChild?: boolean;
}

// Component implementation
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(componentVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Component.displayName = "Component";

export { Component, componentVariants };
```

## 🎨 Theming System

Shape UI provides a powerful theming system that supports:

- **Light/Dark Mode**: Automatic theme switching
- **Custom Colors**: Easy color palette customization
- **CSS Variables**: Runtime theme updates
- **System Preferences**: Automatic dark mode detection

### Creating a Custom Theme

```tsx
import { createTheme, ThemeProvider } from "@im10anish/shape-ui";

const customTheme = createTheme({
  colors: {
    primary: {
      DEFAULT: "#3b82f6",
      50: "#eff6ff",
      500: "#3b82f6",
      900: "#1e3a8a",
    },
    // ... more colors
  },
  borderRadius: {
    lg: "12px",
    xl: "16px",
  },
  // ... other theme properties
});

function App() {
  return (
    <ThemeProvider theme={customTheme} defaultColorMode="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Using Theme Hooks

```tsx
import { useTheme } from "@im10anish/shape-ui";

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useTheme();

  return <button onClick={toggleColorMode}>Current mode: {colorMode}</button>;
}
```

## 📚 Components

Shape UI provides a growing collection of accessible, customizable components. Each component follows our consistent design patterns and supports the theming system.

For the complete list of available components and their detailed API documentation, visit our [Storybook documentation](https://shape-ui.netlify.app/).

### Component Features

- **Consistent API**: All components follow the same variant and prop patterns
- **TypeScript Support**: Full type safety with excellent IntelliSense
- **Accessibility**: Built on Radix UI primitives for excellent a11y
- **Themeable**: All components respect your custom theme configuration
- **Responsive**: Mobile-first design that works on all screen sizes

## 🛠️ Dependencies

Shape UI is built with these core technologies:

### Core Dependencies

- **React** (>=16.8.0) - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI primitives

### Key Libraries

- **class-variance-authority** - Component variant system
- **clsx** - Conditional className utility
- **tailwind-merge** - Tailwind class merging
- **lucide-react** - Icon library

### Development Tools

- **Storybook** - Component documentation
- **Jest** - Testing framework
- **Rollup** - Build tool
- **ESLint** - Code linting

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📖 Documentation

For detailed component documentation and interactive examples, visit our [Storybook](https://shape-ui.netlify.app/).

## 🤝 Contributing

We welcome contributions! Please see our [contributing guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/Im10Anish/shape-ui)
- [NPM Package](https://www.npmjs.com/package/@im10anish/shape-ui)
- [Storybook Documentation](https://shape-ui.netlify.app/)
- [Issues](https://github.com/Im10Anish/shape-ui/issues)
