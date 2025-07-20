import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "../../theme/ThemeProvider";

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A theme toggle component that allows users to switch between light and dark modes.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ThemeToggle size="sm" />
      <ThemeToggle size="default" />
      <ThemeToggle size="lg" />
      <ThemeToggle size="icon" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ThemeToggle variant="default" />
      <ThemeToggle variant="outline" />
      <ThemeToggle variant="secondary" />
      <ThemeToggle variant="ghost" />
    </div>
  ),
};
