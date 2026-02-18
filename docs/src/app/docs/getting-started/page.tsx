export default function GettingStartedPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
        <p className="text-muted-foreground mt-2">
          Learn how to install and set up Shape UI in your project.
        </p>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Using npm</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="text-sm">
                <code>npm install @im10anish/shape-ui</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Using yarn</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="text-sm">
                <code>yarn add @im10anish/shape-ui</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Using pnpm</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="text-sm">
                <code>pnpm add @im10anish/shape-ui</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Setup</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">
              1. Install Tailwind CSS
            </h3>
            <p className="text-muted-foreground mb-4">
              Shape UI is built on top of Tailwind CSS. Make sure you have
              Tailwind CSS installed in your project.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="text-sm">
                <code>{`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">
              2. Configure Tailwind CSS
            </h3>
            <p className="text-muted-foreground mb-4">
              Update your <code>tailwind.config.js</code> to include the Shape
              UI components.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="text-sm">
                <code>{`/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@im10anish/shape-ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">3. Add CSS Variables</h3>
            <p className="text-muted-foreground mb-4">
              Add the CSS variables to your global CSS file.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="text-sm">
                <code>{`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Now you can import and use any component from Shape UI in your React
            application.
          </p>

          <div className="bg-muted/50 rounded-lg p-4">
            <pre className="text-sm">
              <code>{`import { Button } from "@im10anish/shape-ui"

function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Next Steps</h2>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Now that you have Shape UI installed, you can:
          </p>

          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              Browse the{" "}
              <a href="/components" className="text-primary hover:underline">
                components
              </a>{" "}
              to see what's available
            </li>
            <li>
              Learn about{" "}
              <a href="/docs/theming" className="text-primary hover:underline">
                theming
              </a>{" "}
              to customize the appearance
            </li>
            <li>
              Check out the{" "}
              <a
                href="/components/button"
                className="text-primary hover:underline"
              >
                Button component
              </a>{" "}
              for a detailed example
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
