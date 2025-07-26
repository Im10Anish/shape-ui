import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A skeleton loading component that displays a placeholder while content is loading. Built with Tailwind CSS and class-variance-authority for consistent styling and behavior.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "accent"],
      description: "The visual style variant of the skeleton",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg", "xl"],
      description: "The size of the skeleton",
    },
    width: {
      control: { type: "text" },
      description: "Custom width for the skeleton (string or number)",
    },
    height: {
      control: { type: "text" },
      description: "Custom height for the skeleton (string or number)",
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomWidth: Story = {
  args: {
    width: "200px",
  },
};

export const CustomHeight: Story = {
  args: {
    height: "100px",
  },
};

export const CustomDimensions: Story = {
  args: {
    width: "300px",
    height: "150px",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Skeleton variant="default" />
        <Skeleton variant="primary" />
        <Skeleton variant="secondary" />
        <Skeleton variant="accent" />
      </div>
      <div className="flex gap-4 items-center">
        <Skeleton size="sm" />
        <Skeleton size="default" />
        <Skeleton size="lg" />
        <Skeleton size="xl" />
        <Skeleton size="xl" shadow="sm" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all skeleton variants and sizes.",
      },
    },
  },
};

export const TextSkeleton: Story = {
  render: () => (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[300px]" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Common use case for loading text content with different widths.",
      },
    },
  },
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of a card skeleton with image and text placeholders.",
      },
    },
  },
};

export const AvatarSkeleton: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of an avatar skeleton with accompanying text.",
      },
    },
  },
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[100px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of a table skeleton with header and rows.",
      },
    },
  },
};

export const FormSkeleton: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-4 w-[80px]" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-[100px]" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of a form skeleton with labels, inputs, and button.",
      },
    },
  },
};

export const WithAccessibility: Story = {
  render: () => (
    <div className="space-y-3">
      <Skeleton
        className="h-4 w-[250px]"
        aria-label="Loading article title"
        role="status"
        aria-live="polite"
      />
      <Skeleton
        className="h-4 w-[200px]"
        aria-label="Loading article description"
        role="status"
        aria-live="polite"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example with proper accessibility attributes for screen readers.",
      },
    },
  },
};
