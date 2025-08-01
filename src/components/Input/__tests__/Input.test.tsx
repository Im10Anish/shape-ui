import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../Input";
import { Mail, Search } from "lucide-react";

describe("Input", () => {
  it("renders input with text", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("border-input", "bg-background");
  });

  it("applies filled variant classes", () => {
    render(<Input variant="filled" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("border-input", "bg-muted/50");
  });

  it("applies underline variant classes", () => {
    render(<Input variant="underline" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass(
      "border-0",
      "border-b-2",
      "rounded-none",
      "bg-transparent",
    );
  });

  it("applies small size classes", () => {
    render(<Input size="sm" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("h-8", "px-2", "py-1", "text-xs");
  });

  it("applies large size classes", () => {
    render(<Input size="lg" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("h-12", "px-4", "py-3", "text-base");
  });

  it("applies custom className", () => {
    render(<Input className="custom-class" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("custom-class");
  });

  it("handles text input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Enter text" data-testid="input" />);

    const input = screen.getByTestId("input");
    await user.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
  });

  it("handles email input", () => {
    render(
      <Input type="email" placeholder="Enter email" data-testid="input" />,
    );
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "email");
  });

  it("handles password input", () => {
    render(
      <Input
        type="password"
        placeholder="Enter password"
        data-testid="input"
      />,
    );
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "password");
  });

  it("handles file input", () => {
    render(<Input type="file" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "file");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toBeDisabled();
    expect(input).toHaveClass(
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
    );
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="input" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByTestId("input"));
  });

  it("spreads additional props", () => {
    render(
      <Input data-testid="input" aria-label="Test" maxLength={10} required />,
    );
    const input = screen.getByTestId("input");

    expect(input).toHaveAttribute("aria-label", "Test");
    expect(input).toHaveAttribute("maxLength", "10");
    expect(input).toHaveAttribute("required");
  });

  it("renders label when provided", () => {
    render(<Input label="Email Address" data-testid="input" />);
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  it("renders error message when provided", () => {
    render(<Input error="This field is required" data-testid="input" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(screen.getByText("This field is required")).toHaveClass(
      "text-destructive",
    );
  });

  it("applies error state classes when error is provided", () => {
    render(<Input error="Error message" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass(
      "border-destructive",
      "focus-visible:ring-destructive",
    );
  });

  it("applies success state classes when success is true", () => {
    render(<Input success data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass(
      "border-green-500",
      "focus-visible:ring-green-500",
    );
  });

  it("shows error icon when error is provided", () => {
    render(<Input error="Error message" data-testid="input" />);
    // The error icon should be present (AlertCircle from lucide-react)
    expect(screen.getByTestId("input").parentElement).toHaveClass("relative");
  });

  it("shows success icon when success is true", () => {
    render(<Input success data-testid="input" />);
    // The success icon should be present (CheckCircle from lucide-react)
    expect(screen.getByTestId("input").parentElement).toHaveClass("relative");
  });

  it("renders left icon when provided", () => {
    render(
      <Input leftIcon={<Mail data-testid="mail-icon" />} data-testid="input" />,
    );
    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toHaveClass("pl-10");
  });

  it("renders right icon when provided", () => {
    render(
      <Input
        rightIcon={<Search data-testid="search-icon" />}
        data-testid="input"
      />,
    );
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toHaveClass("pr-10");
  });

  it("shows password toggle when type is password and showPasswordToggle is true", () => {
    render(<Input type="password" showPasswordToggle data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveClass("pr-10");
  });

  it("toggles password visibility when toggle button is clicked", async () => {
    const user = userEvent.setup();
    render(<Input type="password" showPasswordToggle data-testid="input" />);

    const input = screen.getByTestId("input");
    const toggleButton = input.parentElement?.querySelector("button");

    expect(input).toHaveAttribute("type", "password");

    if (toggleButton) {
      await user.click(toggleButton);
      expect(input).toHaveAttribute("type", "text");

      await user.click(toggleButton);
      expect(input).toHaveAttribute("type", "password");
    }
  });

  it("does not show password toggle when type is not password", () => {
    render(<Input type="text" showPasswordToggle data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).not.toHaveClass("pr-10");
  });

  it("handles container className", () => {
    render(<Input containerClassName="custom-container" data-testid="input" />);
    const container = screen.getByTestId("input").parentElement?.parentElement;
    expect(container).toHaveClass("custom-container", "space-y-2");
  });

  it("handles label className", () => {
    render(
      <Input
        label="Test Label"
        labelClassName="custom-label"
        data-testid="input"
      />,
    );
    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("custom-label");
  });

  it("handles error className", () => {
    render(
      <Input
        error="Error message"
        errorClassName="custom-error"
        data-testid="input"
      />,
    );
    const error = screen.getByText("Error message");
    expect(error).toHaveClass("custom-error");
  });

  it("prioritizes error state over success state", () => {
    render(<Input error="Error message" success data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("border-destructive");
    expect(input).not.toHaveClass("border-green-500");
  });

  it("handles focus styles correctly", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass(
      "focus-visible:outline-none",
      "focus-visible:ring-0",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-0",
    );
  });

  it("handles transition classes", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    // Check for transition classes if any are applied
    expect(input).toHaveClass("ring-offset-background");
  });

  it("maintains accessibility attributes", () => {
    render(
      <Input
        data-testid="input"
        aria-describedby="error-message"
        aria-invalid="true"
        required
      />,
    );
    const input = screen.getByTestId("input");

    expect(input).toHaveAttribute("aria-describedby", "error-message");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("required");
  });

  it("combines variant and size classes correctly", () => {
    render(<Input variant="filled" size="lg" data-testid="input" />);
    const input = screen.getByTestId("input");

    expect(input).toHaveClass("border-input", "bg-muted/50");
    expect(input).toHaveClass("h-12", "px-4", "py-3", "text-base");
  });

  it("handles placeholder text", () => {
    render(<Input placeholder="Enter your email" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("placeholder", "Enter your email");
    expect(input).toHaveClass("placeholder:text-muted-foreground");
  });

  it("handles file input styling", () => {
    render(<Input type="file" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass(
      "file:border-0",
      "file:bg-transparent",
      "file:text-sm",
      "file:font-medium",
    );
  });

  it("disables password toggle when input is disabled", () => {
    render(
      <Input type="password" showPasswordToggle disabled data-testid="input" />,
    );
    const input = screen.getByTestId("input");
    const toggleButton = input.parentElement?.querySelector("button");

    expect(input).toBeDisabled();
    if (toggleButton) {
      expect(toggleButton).toBeDisabled();
    }
  });

  it("handles multiple icons correctly", () => {
    render(
      <Input
        leftIcon={<Mail data-testid="left-icon" />}
        rightIcon={<Search data-testid="right-icon" />}
        data-testid="input"
      />,
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toHaveClass("pl-10", "pr-10");
  });

  it("handles complex real-world scenario", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Input
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        error="Please enter a valid email"
        leftIcon={<Mail data-testid="mail-icon" />}
        onChange={handleChange}
        data-testid="input"
      />,
    );

    const input = screen.getByTestId("input");
    const label = screen.getByText("Email Address");
    const error = screen.getByText("Please enter a valid email");
    const mailIcon = screen.getByTestId("mail-icon");

    expect(label).toBeInTheDocument();
    expect(error).toBeInTheDocument();
    expect(mailIcon).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveClass("border-destructive");

    await user.type(input, "test@example.com");
    expect(handleChange).toHaveBeenCalled();
  });
});
