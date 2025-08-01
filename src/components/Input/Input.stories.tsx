import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Input } from "./Input";
import { Mail, Search, User, Lock, Upload } from "lucide-react";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile input component with support for different types, variants, states, and icons. Built with Tailwind CSS and class-variance-authority for consistent styling and behavior.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "filled", "underline"],
      description: "The visual style variant of the input",
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
      description: "The size of the input",
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "file"],
      description: "The type of input",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
    showPasswordToggle: {
      control: { type: "boolean" },
      description: "Show password visibility toggle (only for password type)",
    },
    success: {
      control: { type: "boolean" },
      description: "Show success state with green styling",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
    leftIcon: <Mail className="h-4 w-4" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: "Search...",
    rightIcon: <Search className="h-4 w-4" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    leftIcon: <User className="h-4 w-4" />,
    rightIcon: <Search className="h-4 w-4" />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This input is disabled",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Default Variant</h3>
        <Input label="Default" placeholder="Default input" />
        <Input
          label="With Error"
          placeholder="Error input"
          error="This field is required"
        />
        <Input label="With Success" placeholder="Success input" success />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Filled Variant</h3>
        <Input variant="filled" label="Filled" placeholder="Filled input" />
        <Input
          variant="filled"
          label="With Error"
          placeholder="Error input"
          error="This field is required"
        />
        <Input
          variant="filled"
          label="With Success"
          placeholder="Success input"
          success
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Underline Variant</h3>
        <Input
          variant="underline"
          label="Underline"
          placeholder="Underline input"
        />
        <Input
          variant="underline"
          label="With Error"
          placeholder="Error input"
          error="This field is required"
        />
        <Input
          variant="underline"
          label="With Success"
          placeholder="Success input"
          success
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all input variants with different states.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Small Size</h3>
        <Input size="sm" label="Small" placeholder="Small input" />
        <Input
          size="sm"
          label="With Icon"
          placeholder="Small with icon"
          leftIcon={<Mail className="h-3 w-3" />}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Default Size</h3>
        <Input label="Default" placeholder="Default input" />
        <Input
          label="With Icon"
          placeholder="Default with icon"
          leftIcon={<Mail className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Large Size</h3>
        <Input size="lg" label="Large" placeholder="Large input" />
        <Input
          size="lg"
          label="With Icon"
          placeholder="Large with icon"
          leftIcon={<Mail className="h-5 w-5" />}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all input sizes.",
      },
    },
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Text Inputs</h3>
        <Input label="Text" placeholder="Enter text" />
        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          leftIcon={<Mail className="h-4 w-4" />}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          showPasswordToggle
          leftIcon={<Lock className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">File Input</h3>
        <Input
          label="Upload File"
          type="file"
          leftIcon={<Upload className="h-4 w-4" />}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all input types with appropriate icons.",
      },
    },
  },
};

export const LoginForm: Story = {
  render: () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);

      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!email) {
        setEmailError("Email is required");
        return;
      }

      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address");
        return;
      }

      if (!password) {
        return;
      }

      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Login form submitted successfully!");
      }, 1000);
    };

    return (
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            leftIcon={<Lock className="h-4 w-4" />}
            showPasswordToggle
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "A complete login form example with email validation showcasing how Input components can be used in a real authentication form with proper styling, validation, and error handling.",
      },
    },
  },
};
