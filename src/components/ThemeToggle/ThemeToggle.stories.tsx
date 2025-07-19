import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "../../theme/ThemeProvider";

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    docs: {
      description: {
        component:
          "A button component for toggling between light and dark themes.",
      },
    },
  },
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
