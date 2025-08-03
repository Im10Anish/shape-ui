import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";
import { Typography } from "../Typography/Typography";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile card component with multiple variants, sizes, and sub-components for building rich content layouts. Supports interactive states, shadows, and custom styling.",
      },
    },
    actions: {
      argTypesRegex: "^on(?!Click).*",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "elevated",
        "outlined",
        "ghost",
        "interactive",
        "flat",
        "glass",
      ],
      description: "The visual style variant of the card",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "The size of the card",
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl", "2xl", "inner"],
      description: "The shadow variant of the card",
    },
    radius: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl", "2xl", "full"],
      description: "The border radius of the card",
    },
    asChild: {
      control: { type: "boolean" },
      description: "Render as a child component using Radix Slot",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the card is disabled",
    },
  },
  args: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <Typography>This is the main content of the card.</Typography>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const WithShadow: Story = {
  args: {
    shadow: "lg",
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Shadow</CardTitle>
          <CardDescription>Enhanced depth with shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <Typography>Content with prominent shadow effect.</Typography>
        </CardContent>
      </>
    ),
  },
};

export const ClickableCard: Story = {
  args: {
    variant: "interactive",
    onClick: fn(),
    children: (
      <>
        <CardHeader>
          <CardTitle>Clickable Card</CardTitle>
          <CardDescription>
            This card is clickable (has onClick prop)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Typography>
            This card has cursor pointer, hover effects, and click handler.
          </Typography>
        </CardContent>
      </>
    ),
  },
};

export const NonClickableCard: Story = {
  args: {
    variant: "default",
    children: (
      <>
        <CardHeader>
          <CardTitle>Non-Clickable Card</CardTitle>
          <CardDescription>
            This card has no hover effects or click handler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Typography>
            This card has no hover effects or cursor pointer.
          </Typography>
        </CardContent>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <CardHeader>
          <CardTitle>Disabled Card</CardTitle>
          <CardDescription>This card is disabled</CardDescription>
        </CardHeader>
        <CardContent>
          <Typography>Content in disabled state.</Typography>
        </CardContent>
      </>
    ),
  },
};

export const ProductCard: Story = {
  args: {
    variant: "interactive",
    shadow: "md",
    onClick: fn(),
    children: (
      <>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Premium Wireless Headphones</CardTitle>
              <CardDescription>High-quality audio experience</CardDescription>
            </div>
            <Badge variant="success">In Stock</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Typography variant="muted">Features:</Typography>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Active noise cancellation</li>
              <li>• 30-hour battery life</li>
              <li>• Premium build quality</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <Typography variant="large" weight="bold">
              $299.99
            </Typography>
            <Button>Add to Cart</Button>
          </div>
        </CardFooter>
      </>
    ),
  },
};

export const ArticleCard: Story = {
  args: {
    variant: "elevated",
    children: (
      <>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">Technology</Badge>
            <Badge variant="outline">5 min read</Badge>
          </div>
          <CardTitle>The Future of Web Development</CardTitle>
          <CardDescription>
            Exploring modern frameworks and tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Typography>
            Web development continues to evolve with new frameworks, tools, and
            methodologies that make building applications faster and more
            efficient...
          </Typography>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted"></div>
              <Typography variant="small">John Doe</Typography>
            </div>
            <Typography variant="muted">March 15, 2024</Typography>
          </div>
        </CardFooter>
      </>
    ),
  },
};

export const DashboardCard: Story = {
  args: {
    variant: "default",
    shadow: "sm",
    children: (
      <>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Monthly Revenue</CardTitle>
            <Badge variant="success" icon="📈">
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Typography variant="h1" size="4xl" weight="bold">
              $45,231
            </Typography>
            <Typography variant="muted">vs. $40,123 last month</Typography>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </CardFooter>
      </>
    ),
  },
};

export const ProfileCard: Story = {
  args: {
    variant: "outlined",
    children: (
      <>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Typography variant="large">👤</Typography>
            </div>
            <div>
              <CardTitle>Sarah Johnson</CardTitle>
              <CardDescription>Senior Frontend Developer</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <Typography variant="small" weight="semibold">
                Skills
              </Typography>
              <div className="flex gap-1 mt-1">
                <Badge size="sm">React</Badge>
                <Badge size="sm">TypeScript</Badge>
                <Badge size="sm">Tailwind</Badge>
              </div>
            </div>
            <div>
              <Typography variant="small" weight="semibold">
                Location
              </Typography>
              <Typography variant="muted">San Francisco, CA</Typography>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Button variant="outline" size="sm">
              Message
            </Button>
            <Button size="sm">Connect</Button>
          </div>
        </CardFooter>
      </>
    ),
  },
};

export const NotificationCard: Story = {
  args: {
    variant: "flat",
    children: (
      <>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div>
              <CardTitle>New Message</CardTitle>
              <CardDescription>
                You have a new message from Alex
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Typography variant="small">
            &ldquo;Hey! I wanted to discuss the new project
            requirements...&rdquo;
          </Typography>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <Button size="sm">Reply</Button>
            <Button variant="ghost" size="sm">
              Mark as Read
            </Button>
          </div>
        </CardFooter>
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>Standard card styling</CardDescription>
        </CardHeader>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>With subtle shadow</CardDescription>
        </CardHeader>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Outlined</CardTitle>
          <CardDescription>Prominent border</CardDescription>
        </CardHeader>
      </Card>

      <Card variant="ghost">
        <CardHeader>
          <CardTitle>Ghost</CardTitle>
          <CardDescription>Minimal styling</CardDescription>
        </CardHeader>
      </Card>

      <Card variant="interactive">
        <CardHeader>
          <CardTitle>Interactive</CardTitle>
          <CardDescription>Hover effects</CardDescription>
        </CardHeader>
      </Card>

      <Card variant="flat">
        <CardHeader>
          <CardTitle>Flat</CardTitle>
          <CardDescription>No border, muted background</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all card variants with consistent content.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
      <Card size="sm">
        <CardHeader size="sm">
          <CardTitle size="sm">Small</CardTitle>
          <CardDescription size="sm">Compact design</CardDescription>
        </CardHeader>
      </Card>

      <Card size="md">
        <CardHeader size="md">
          <CardTitle size="md">Medium</CardTitle>
          <CardDescription size="md">Default size</CardDescription>
        </CardHeader>
      </Card>

      <Card size="lg">
        <CardHeader size="lg">
          <CardTitle size="lg">Large</CardTitle>
          <CardDescription size="lg">More spacious</CardDescription>
        </CardHeader>
      </Card>

      <Card size="xl">
        <CardHeader size="xl">
          <CardTitle size="xl">Extra Large</CardTitle>
          <CardDescription size="xl">Maximum spacing</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all card sizes with consistent content.",
      },
    },
  },
};
