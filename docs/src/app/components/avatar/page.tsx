export default function AvatarPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Avatar</h1>
        <p className="text-muted-foreground mt-2">
          Display user profile pictures, initials, or fallback icons.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          The Avatar component is used to display user profile pictures,
          initials, or fallback icons. It supports different sizes and can
          handle loading states and errors gracefully.
        </p>
      </section>

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>

        {/* Basic Usage */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Usage</h3>
          <div className="flex flex-wrap gap-4">
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img
                className="aspect-square h-full w-full"
                src="https://github.com/shadcn.png"
                alt="Avatar"
              />
            </div>
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                <span className="text-sm font-medium">U</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <img
                className="aspect-square h-full w-full"
                src="https://github.com/shadcn.png"
                alt="Small"
              />
            </div>
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img
                className="aspect-square h-full w-full"
                src="https://github.com/shadcn.png"
                alt="Default"
              />
            </div>
            <div className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <img
                className="aspect-square h-full w-full"
                src="https://github.com/shadcn.png"
                alt="Large"
              />
            </div>
          </div>
        </div>

        {/* Fallback */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Fallback</h3>
          <div className="flex flex-wrap gap-4">
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                <span className="text-sm font-medium">U</span>
              </div>
            </div>
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                <span className="text-sm font-medium">JD</span>
              </div>
            </div>
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                <span className="text-sm font-medium">JS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="bg-muted/50 rounded-lg p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { Avatar } from "@im10anish/shape-ui"

// With image
<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />

// With fallback
<Avatar alt="User Name" />

// Custom size
<Avatar src="https://example.com/avatar.jpg" alt="User" className="w-16 h-16" />`}</code>
          </pre>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">API Reference</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Avatar Props</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium">Prop</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Default</th>
                    <th className="text-left p-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-3 font-mono text-xs">src</td>
                    <td className="p-3 text-muted-foreground">string</td>
                    <td className="p-3 text-muted-foreground">-</td>
                    <td className="p-3 text-muted-foreground">
                      The source URL of the avatar image
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">alt</td>
                    <td className="p-3 text-muted-foreground">string</td>
                    <td className="p-3 text-muted-foreground">-</td>
                    <td className="p-3 text-muted-foreground">
                      Alternative text for the avatar
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">className</td>
                    <td className="p-3 text-muted-foreground">string</td>
                    <td className="p-3 text-muted-foreground">-</td>
                    <td className="p-3 text-muted-foreground">
                      Additional CSS classes
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
