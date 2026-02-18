"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const components = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/getting-started" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Avatar", href: "/components/avatar" },
      { title: "Button", href: "/components/button" },
      { title: "Skeleton", href: "/components/skeleton" },
      { title: "Theme Toggle", href: "/components/theme-toggle" },
      { title: "Typography", href: "/components/typography" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 pr-6">
        <nav className="space-y-6">
          {components.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm text-muted-foreground mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block text-sm transition-colors hover:text-foreground",
                        pathname === item.href
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
