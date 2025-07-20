import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "./Typography";

const meta = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible Typography component supporting multiple variants, sizes, and weights for consistent text styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "blockquote",
        "code",
        "lead",
        "large",
        "small",
        "muted",
      ],
      description: "The visual style variant of the text",
    },
    size: {
      control: { type: "select" },
      options: [
        undefined,
        "xs",
        "sm",
        "base",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
      ],
      description: "The size of the text",
    },
    weight: {
      control: { type: "select" },
      options: [
        undefined,
        "thin",
        "extralight",
        "light",
        "normal",
        "medium",
        "semibold",
        "bold",
        "extrabold",
        "black",
      ],
      description: "The font weight of the text",
    },
    asChild: {
      control: { type: "boolean" },
      description: "Render as a child component using Radix Slot",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: "h1",
    children: "Heading 1",
  },
};

export const Heading2: Story = {
  args: {
    variant: "h2",
    children: "Heading 2",
  },
};

export const Heading3: Story = {
  args: {
    variant: "h3",
    children: "Heading 3",
  },
};

export const Heading4: Story = {
  args: {
    variant: "h4",
    children: "Heading 4",
  },
};

export const Heading5: Story = {
  args: {
    variant: "h5",
    children: "Heading 5",
  },
};

export const Heading6: Story = {
  args: {
    variant: "h6",
    children: "Heading 6",
  },
};

export const Paragraph: Story = {
  args: {
    variant: "p",
    children: "This is a paragraph of text.",
  },
};

export const Blockquote: Story = {
  args: {
    variant: "blockquote",
    children: "This is a blockquote.",
  },
};

export const Code: Story = {
  args: {
    variant: "code",
    children: "const x = 42;",
  },
};

export const Lead: Story = {
  args: {
    variant: "lead",
    children: "This is lead text.",
  },
};

export const Large: Story = {
  args: {
    variant: "large",
    children: "This is large text.",
  },
};

export const Small: Story = {
  args: {
    variant: "small",
    children: "This is small text.",
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
    children: "This is muted text.",
  },
};

export const CustomSizeWeight: Story = {
  args: {
    variant: "p",
    size: "3xl",
    weight: "bold",
    children: "Custom size and weight text.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="p">This is a paragraph of text.</Typography>
      <Typography variant="blockquote">This is a blockquote.</Typography>
      <Typography variant="code">const x = 42;</Typography>
      <Typography variant="lead">This is lead text.</Typography>
      <Typography variant="large">This is large text.</Typography>
      <Typography variant="small">This is small text.</Typography>
      <Typography variant="muted">This is muted text.</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all typography variants.",
      },
    },
  },
};
