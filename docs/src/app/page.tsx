import Link from "next/link";
import { ArrowRight, Code, Palette, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-8">
            <Zap className="mr-1 h-3 w-3" />
            Modern React Components
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Beautiful and accessible
            <br />
            <span className="text-primary">React components</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A modern React component library for building beautiful user
            interfaces with TypeScript and Tailwind CSS. Built with
            accessibility and design consistency in mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/components"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Browse Components
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">TypeScript</h3>
            <p className="text-muted-foreground text-sm">
              Built with TypeScript for better developer experience and type
              safety.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Customizable</h3>
            <p className="text-muted-foreground text-sm">
              Easy theming and customization with CSS variables and Tailwind
              CSS.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Accessible</h3>
            <p className="text-muted-foreground text-sm">
              Built with accessibility in mind, following WAI-ARIA guidelines.
            </p>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <div className="bg-background rounded-md p-4 border">
            <pre className="text-sm">
              <code>npm install @im10anish/shape-ui</code>
            </pre>
          </div>
          <p className="text-muted-foreground mt-4">
            Check out the{" "}
            <Link
              href="/docs/getting-started"
              className="text-primary hover:underline"
            >
              getting started guide
            </Link>{" "}
            for more details.
          </p>
        </div>
      </div>
    </div>
  );
}
