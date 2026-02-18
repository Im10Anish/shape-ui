export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Installation</h1>
        <p className="text-muted-foreground mt-2">
          Follow these steps to install and configure Shape UI in your project.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Prerequisites</h2>
        <div className="space-y-2">
          <p className="text-muted-foreground">
            Before installing Shape UI, make sure you have:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Node.js 16.0 or later</li>
            <li>npm, yarn, or pnpm package manager</li>
            <li>A React project (Next.js, Create React App, Vite, etc.)</li>
            <li>Tailwind CSS installed and configured</li>
          </ul>
        </div>
      </section>

      {/* Package Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Package Installation
        </h2>

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

      {/* Tailwind CSS Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Tailwind CSS Setup
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">
              1. Install Tailwind CSS
            </h3>
            <p className="text-muted-foreground mb-4">
              If you haven't already installed Tailwind CSS, install it first:
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
              2. Configure Content Paths
            </h3>
            <p className="text-muted-foreground mb-4">
              Update your <code>tailwind.config.js</code> to include Shape UI
              components:
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
  // ... rest of your config
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">3. Add CSS Variables</h3>
            <p className="text-muted-foreground mb-4">
              Add the design system CSS variables to your global CSS file:
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

      {/* Usage Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Usage Example</h2>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Now you can import and use Shape UI components in your React
            application:
          </p>

          <div className="bg-muted/50 rounded-lg p-4">
            <pre className="text-sm">
              <code>{`import { Button, Avatar, Typography } from "@im10anish/shape-ui"

function App() {
  return (
    <div className="p-4 space-y-4">
      <Typography variant="h1">Welcome to Shape UI</Typography>
      
      <div className="flex items-center gap-4">
        <Avatar src="https://github.com/shadcn.png" alt="User" />
        <Button>Get Started</Button>
      </div>
    </div>
  )
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Framework-Specific Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Framework-Specific Setup
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Next.js</h3>
            <p className="text-muted-foreground mb-4">
              For Next.js projects, add the CSS variables to your{" "}
              <code>app/globals.css</code> or <code>styles/globals.css</code>{" "}
              file.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Create React App</h3>
            <p className="text-muted-foreground mb-4">
              For Create React App projects, add the CSS variables to your{" "}
              <code>src/index.css</code> or <code>src/App.css</code> file.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Vite</h3>
            <p className="text-muted-foreground mb-4">
              For Vite projects, add the CSS variables to your{" "}
              <code>src/index.css</code> or <code>src/style.css</code> file.
            </p>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Troubleshooting
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              Components not styling correctly?
            </h3>
            <p className="text-muted-foreground">
              Make sure you've added the Shape UI content path to your Tailwind
              config and imported the CSS variables.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Dark mode not working?</h3>
            <p className="text-muted-foreground">
              Ensure you have the <code>dark</code> class on your HTML element
              or use a theme provider.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">TypeScript errors?</h3>
            <p className="text-muted-foreground">
              Make sure you're using TypeScript 4.5+ and have the latest React
              types installed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
