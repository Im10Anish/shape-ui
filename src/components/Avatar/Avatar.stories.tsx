import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Avatar } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile avatar component that displays user images with fallback to initials. Supports multiple sizes, custom fallbacks, and handles image loading states gracefully.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "The size of the avatar",
    },
    src: {
      control: { type: "text" },
      description: "The source URL for the avatar image",
    },
    alt: {
      control: { type: "text" },
      description:
        "Alt text for the image, also used to generate initials fallback",
    },
    fallback: {
      control: { type: "text" },
      description:
        "Custom fallback text to display when image is not available",
    },
    loading: {
      control: { type: "boolean" },
      description:
        "Whether to show skeleton loading state. When true, shows skeleton until image loads.",
    },
    onImageLoad: {
      action: "image loaded",
      description: "Callback fired when image loads successfully",
    },
    onImageError: {
      action: "image error",
      description: "Callback fired when image fails to load",
    },
  },
  args: {
    onImageLoad: fn(),
    onImageError: fn(),
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: "John Doe",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    alt: "John Doe",
  },
};

export const CustomFallback: Story = {
  args: {
    fallback: "JD",
  },
};

export const ChildrenFallback: Story = {
  args: {
    children: "👤",
  },
};

export const NumbersInName: Story = {
  args: {
    alt: "John123 Doe",
  },
};

export const InvalidImage: Story = {
  args: {
    src: "invalid-image-url.jpg",
    alt: "John Doe",
  },
};

export const LoadingState: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    alt: "John Doe",
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows a skeleton loading state while the image is loading. The skeleton disappears when the image loads successfully.",
      },
    },
  },
};

export const LoadingWithoutAlt: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows skeleton when loading and no alt text is provided (no fallback available).",
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <span className="text-sm font-medium w-20">Loading:</span>
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          loading={true}
        />
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Jane Smith"
          size="lg"
          loading={true}
        />
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Bob Johnson"
          size="xl"
          loading={true}
        />
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm font-medium w-20">Loaded:</span>
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
        />
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Jane Smith"
          size="lg"
        />
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Bob Johnson"
          size="xl"
        />
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm font-medium w-20">Fallback:</span>
        <Avatar alt="John Doe" />
        <Avatar alt="Jane Smith" size="lg" />
        <Avatar alt="Bob Johnson" size="xl" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the different loading states: skeleton while loading, image when loaded, and fallback when no image is available.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <Avatar size="xs" alt="John Doe" />
        <Avatar size="sm" alt="John Doe" />
        <Avatar size="md" alt="John Doe" />
        <Avatar size="lg" alt="John Doe" />
        <Avatar size="xl" alt="John Doe" />
        <Avatar size="2xl" alt="John Doe" />
      </div>
      <div className="flex gap-2 items-center">
        <Avatar
          size="xs"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
        />
        <Avatar
          size="sm"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
        />
        <Avatar
          size="md"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
        />
        <Avatar
          size="lg"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
        />
        <Avatar
          size="xl"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
        />
        <Avatar
          size="2xl"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of all avatar sizes with both fallback and image variants.",
      },
    },
  },
};

export const MixedContent: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="John Doe"
      />
      <Avatar alt="Jane Smith" />
      <Avatar fallback="👤" />
      <Avatar src="invalid-url.jpg" alt="Bob Johnson" />
      <Avatar>🚀</Avatar>
      <Avatar alt="Alice Brown" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Mixed examples showing images, initials, custom fallbacks, and error states.",
      },
    },
  },
};
