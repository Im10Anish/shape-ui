import Link from "next/link";
import { ArrowRight } from "lucide-react";

const components = [
  {
    name: "Avatar",
    description: "Display user profile pictures, initials, or fallback icons.",
    href: "/components/avatar",
    component: (
      <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <img
          className="aspect-square h-full w-full"
          src="https://github.com/shadcn.png"
          alt="Avatar"
        />
      </div>
    ),
  },
  {
    name: "Button",
    description: "A button component with different variants and sizes.",
    href: "/components/button",
    component: (
      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        Button
      </button>
    ),
  },
  {
    name: "Skeleton",
    description: "A loading placeholder component for content.",
    href: "/components/skeleton",
    component: <div className="w-20 h-10 animate-pulse rounded-md bg-muted" />,
  },
  {
    name: "Theme Toggle",
    description:
      "A toggle component for switching between light and dark themes.",
    href: "/components/theme-toggle",
    component: (
      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
    ),
  },
  {
    name: "Typography",
    description: "Text components with consistent styling and semantic HTML.",
    href: "/components/typography",
    component: (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Text
      </h1>
    ),
  },
];

export default function ComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        <p className="text-muted-foreground mt-2">
          Explore our collection of reusable components built with TypeScript
          and Tailwind CSS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="group block p-6 border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {component.name}
              </h3>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {component.description}
            </p>
            <div className="flex items-center justify-center p-4 bg-muted/50 rounded border">
              {component.component}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
