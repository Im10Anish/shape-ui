import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile badge component that supports text, numbers, icons, and range functionality. Perfect for notifications, status indicators, and count displays.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "success",
        "warning",
        "info",
      ],
      description: "The visual style variant of the badge",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "The size of the badge",
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl", "2xl", "inner"],
      description: "The shadow variant of the badge",
    },
    number: {
      control: { type: "number" },
      description: "The number to display in the badge",
    },
    range: {
      control: { type: "number" },
      description: "The range limit. Numbers above this will show as 'range+'",
    },
    showZero: {
      control: { type: "boolean" },
      description: "Whether to show the badge when number is zero",
    },
    icon: {
      control: { type: "text" },
      description: "Icon to display in the badge (emoji or text)",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const WithIcon: Story = {
  args: {
    icon: "🔥",
    children: "Hot",
  },
};

export const IconOnly: Story = {
  args: {
    icon: "🎯",
  },
};

export const WithNumber: Story = {
  args: {
    number: 5,
  },
};

export const WithNumberAndIcon: Story = {
  args: {
    number: 12,
    icon: "📧",
  },
};

export const WithRange: Story = {
  args: {
    number: 25,
    range: 20,
  },
};

export const WithRangeAndIcon: Story = {
  args: {
    number: 30,
    range: 20,
    icon: "🔔",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
        <Badge size="xl">Extra Large</Badge>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge number={5} />
        <Badge number={12} icon="📧" />
        <Badge number={25} range={20} />
        <Badge number={0} showZero />
        <Badge icon="🎯" />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="success" number={3} icon="✅" />
        <Badge variant="warning" number={7} icon="⚠️" />
        <Badge variant="info" number={15} range={10} icon="ℹ️" />
        <Badge variant="destructive" number={99} range={50} icon="🚨" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all badge variants, sizes, and features.",
      },
    },
  },
};

export const NumberExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <Badge number={1} />
        <Badge number={5} />
        <Badge number={12} />
        <Badge number={99} />
        <Badge number={999} />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge number={15} range={10} />
        <Badge number={25} range={20} />
        <Badge number={50} range={30} />
        <Badge number={100} range={50} />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge number={0} showZero />
        <Badge number={0} showZero variant="secondary" />
        <Badge number={0} showZero variant="outline" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Examples of different number displays and range functionality.",
      },
    },
  },
};

export const IconExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <Badge icon="🔥" />
        <Badge icon="🎯" />
        <Badge icon="📧" />
        <Badge icon="🔔" />
        <Badge icon="✅" />
        <Badge icon="⚠️" />
        <Badge icon="ℹ️" />
        <Badge icon="🚨" />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge icon="🔥">Hot</Badge>
        <Badge icon="📧">Messages</Badge>
        <Badge icon="🔔">Notifications</Badge>
        <Badge icon="✅">Complete</Badge>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge number={5} icon="📧" />
        <Badge number={12} icon="🔔" />
        <Badge number={25} range={20} icon="🚨" />
        <Badge number={99} range={50} icon="🔥" />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="success" icon="✅" />
        <Badge variant="warning" icon="⚠️" />
        <Badge variant="info" icon="ℹ️" />
        <Badge variant="destructive" icon="🚨" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples of icon usage in badges with different variants and combinations.",
      },
    },
  },
};

export const ShadowExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <Badge shadow="none">No Shadow</Badge>
        <Badge shadow="sm">Small Shadow</Badge>
        <Badge shadow="md">Medium Shadow</Badge>
        <Badge shadow="lg">Large Shadow</Badge>
        <Badge shadow="xl">Extra Large Shadow</Badge>
        <Badge shadow="2xl">2XL Shadow</Badge>
        <Badge shadow="inner">Inner Shadow</Badge>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="success" shadow="lg" number={3} icon="✅" />
        <Badge variant="warning" shadow="xl" number={7} icon="⚠️" />
        <Badge variant="info" shadow="2xl" number={15} range={10} icon="ℹ️" />
        <Badge
          variant="destructive"
          shadow="inner"
          number={99}
          range={50}
          icon="🚨"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Examples of different shadow variants applied to badges.",
      },
    },
  },
};
