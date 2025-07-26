import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { Avatar } from "../Avatar";

describe("Avatar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders avatar with default props", () => {
    render(<Avatar />);
    const avatar = screen.getByText("?").parentElement?.parentElement;
    expect(avatar).toBeInTheDocument();
  });

  it("applies default size classes", () => {
    render(<Avatar />);
    const avatar = document.querySelector('[class*="h-10"]');
    expect(avatar).toHaveClass("h-10", "w-10");
  });

  it("applies xs size classes", () => {
    render(<Avatar size="xs" />);
    const avatar = document.querySelector('[class*="h-6"]');
    expect(avatar).toHaveClass("h-6", "w-6");
  });

  it("applies sm size classes", () => {
    render(<Avatar size="sm" />);
    const avatar = document.querySelector('[class*="h-8"]');
    expect(avatar).toHaveClass("h-8", "w-8");
  });

  it("applies lg size classes", () => {
    render(<Avatar size="lg" />);
    const avatar = document.querySelector('[class*="h-12"]');
    expect(avatar).toHaveClass("h-12", "w-12");
  });

  it("applies xl size classes", () => {
    render(<Avatar size="xl" />);
    const avatar = document.querySelector('[class*="h-16"]');
    expect(avatar).toHaveClass("h-16", "w-16");
  });

  it("applies 2xl size classes", () => {
    render(<Avatar size="2xl" />);
    const avatar = document.querySelector('[class*="h-20"]');
    expect(avatar).toHaveClass("h-20", "w-20");
  });

  it("renders image when src is provided", () => {
    render(<Avatar src="test-image.jpg" alt="Test Avatar" />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test Avatar");
  });

  it("shows fallback when no src is provided", () => {
    render(<Avatar alt="John Doe" />);
    const fallback = screen.getByText("JD");
    expect(fallback).toBeInTheDocument();
  });

  it("shows custom fallback text", () => {
    render(<Avatar fallback="Custom" />);
    const fallback = screen.getByText("Custom");
    expect(fallback).toBeInTheDocument();
  });

  it("shows question mark when no alt or fallback provided", () => {
    render(<Avatar />);
    const fallback = screen.getByText("?");
    expect(fallback).toBeInTheDocument();
  });

  it("generates initials from alt text", () => {
    render(<Avatar alt="John Michael Doe" />);
    const fallback = screen.getByText("JM");
    expect(fallback).toBeInTheDocument();
  });

  it("generates initials from single word", () => {
    render(<Avatar alt="John" />);
    const fallback = screen.getByText("J");
    expect(fallback).toBeInTheDocument();
  });

  it("limits initials to 2 characters", () => {
    render(<Avatar alt="John Michael Doe Smith" />);
    const fallback = screen.getByText("JM");
    expect(fallback).toBeInTheDocument();
  });

  it("handles empty alt text", () => {
    render(<Avatar alt="" />);
    const fallback = screen.getByText("?");
    expect(fallback).toBeInTheDocument();
  });

  it("handles whitespace-only alt text", () => {
    render(<Avatar alt="   " />);
    const fallback = screen.getByText("?");
    expect(fallback).toBeInTheDocument();
  });

  it("renders children as fallback", () => {
    render(<Avatar>Custom Content</Avatar>);
    const fallback = screen.getByText("Custom Content");
    expect(fallback).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Avatar className="custom-class" />);
    const avatar = document.querySelector('[class*="custom-class"]');
    expect(avatar).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Avatar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("spreads additional props", () => {
    render(<Avatar data-testid="test-avatar" aria-label="Test" />);
    const avatar = screen.getByTestId("test-avatar");
    expect(avatar).toHaveAttribute("aria-label", "Test");
  });

  it("calls onImageLoad when image loads successfully", async () => {
    const onImageLoad = jest.fn();
    render(<Avatar src="test-image.jpg" onImageLoad={onImageLoad} />);

    const image = screen.getByRole("img");
    act(() => {
      image.dispatchEvent(new Event("load"));
    });

    expect(onImageLoad).toHaveBeenCalledTimes(1);
  });

  it("calls onImageError when image fails to load", async () => {
    const onImageError = jest.fn();
    render(<Avatar src="invalid-image.jpg" onImageError={onImageError} />);

    const image = screen.getByRole("img");
    act(() => {
      image.dispatchEvent(new Event("error"));
    });

    expect(onImageError).toHaveBeenCalledTimes(1);
  });

  it("shows fallback after image error", async () => {
    render(<Avatar src="invalid-image.jpg" alt="John Doe" />);

    const image = screen.getByRole("img");
    act(() => {
      image.dispatchEvent(new Event("error"));
    });

    await waitFor(() => {
      expect(screen.getByText("JD")).toBeInTheDocument();
    });
  });

  it("shows skeleton when loading prop is true", async () => {
    render(<Avatar src="slow-image.jpg" loading={true} />);

    // Should show skeleton when loading is true
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
  });

  it("shows skeleton when loading is true, regardless of alt text", async () => {
    render(<Avatar src="slow-image.jpg" alt="" loading={true} />);

    // Should show skeleton when loading is true, regardless of alt text
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
  });

  it("shows fallback when image is loading and alt text is provided (loading=false)", async () => {
    render(<Avatar src="slow-image.jpg" alt="John Doe" loading={false} />);

    // Should show fallback when image is loading but alt text is provided and loading is false
    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("keeps skeleton visible when loading is true, even after image loads", async () => {
    render(<Avatar src="fast-image.jpg" loading={true} />);

    // Initially should show skeleton
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();

    // When image loads, skeleton should remain visible and image should stay hidden
    const image = screen.getByRole("img", { hidden: true });
    act(() => {
      image.dispatchEvent(new Event("load"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("skeleton")).toBeInTheDocument();
      expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
      // Should not have any visible images when loading is true
      const visibleImages = screen
        .queryAllByRole("img")
        .filter((img) => !img.classList.contains("hidden"));
      expect(visibleImages).toHaveLength(0);
    });
  });

  it("resets state when src changes", async () => {
    const { rerender } = render(<Avatar src="image1.jpg" alt="John Doe" />);

    // Change src
    rerender(<Avatar src="image2.jpg" alt="John Doe" />);

    // Should show new image
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "image2.jpg");
  });

  it("applies correct fallback size classes for xs", () => {
    render(<Avatar size="xs" alt="John Doe" />);
    const fallback = screen.getByText("JD");
    expect(fallback).toHaveClass("text-xs");
  });

  it("applies correct fallback size classes for sm", () => {
    render(<Avatar size="sm" alt="John Doe" />);
    const fallback = screen.getByText("JD");
    expect(fallback).toHaveClass("text-sm");
  });

  it("applies correct fallback size classes for lg", () => {
    render(<Avatar size="lg" alt="John Doe" />);
    const fallback = screen.getByText("JD");
    expect(fallback).toHaveClass("text-base");
  });

  it("applies correct fallback size classes for xl", () => {
    render(<Avatar size="xl" alt="John Doe" />);
    const fallback = screen.getByText("JD");
    expect(fallback).toHaveClass("text-lg");
  });

  it("applies correct fallback size classes for 2xl", () => {
    render(<Avatar size="2xl" alt="John Doe" />);
    const fallback = screen.getByText("JD");
    expect(fallback).toHaveClass("text-xl");
  });

  it("applies correct image size classes for xs", () => {
    render(<Avatar size="xs" src="test.jpg" />);
    const image = screen.getByRole("img");
    expect(image).toHaveClass("text-xs");
  });

  it("applies correct image size classes for sm", () => {
    render(<Avatar size="sm" src="test.jpg" />);
    const image = screen.getByRole("img");
    expect(image).toHaveClass("text-sm");
  });

  it("applies correct image size classes for lg", () => {
    render(<Avatar size="lg" src="test.jpg" />);
    const image = screen.getByRole("img");
    expect(image).toHaveClass("text-base");
  });

  it("applies correct image size classes for xl", () => {
    render(<Avatar size="xl" src="test.jpg" />);
    const image = screen.getByRole("img");
    expect(image).toHaveClass("text-lg");
  });

  it("applies correct image size classes for 2xl", () => {
    render(<Avatar size="2xl" src="test.jpg" />);
    const image = screen.getByRole("img");
    expect(image).toHaveClass("text-xl");
  });

  it("handles case insensitive initials", () => {
    render(<Avatar alt="john doe" />);
    const fallback = screen.getByText("JD");
    expect(fallback).toBeInTheDocument();
  });

  it("handles special characters in alt text", () => {
    render(<Avatar alt="José María" />);
    const fallback = screen.getByText("JM");
    expect(fallback).toBeInTheDocument();
  });

  it("handles numbers in alt text", () => {
    render(<Avatar alt="John123 Doe" />);
    const fallback = screen.getByText("JD");
    expect(fallback).toBeInTheDocument();
  });

  it("handles multiple spaces in alt text", () => {
    render(<Avatar alt="  John   Doe  " />);
    const fallback = screen.getByText("JD");
    expect(fallback).toBeInTheDocument();
  });

  it("handles loading prop change", async () => {
    const { rerender } = render(
      <Avatar src="slow-image.jpg" alt="John Doe" loading={false} />,
    );

    // Should show fallback when not loading and alt is provided
    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();

    // Change to loading state
    rerender(<Avatar src="slow-image.jpg" alt="John Doe" loading={true} />);

    // Should show skeleton when loading is true
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.queryByText("JD")).not.toBeInTheDocument();
  });
});
