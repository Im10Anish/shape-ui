export default function ThemingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Theming</h1>
        <p className="text-muted-foreground mt-2">
          Learn how to customize the appearance of Shape UI components using CSS
          variables and Tailwind CSS.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          Shape UI uses CSS variables for theming, making it easy to customize
          colors, spacing, and other design tokens. The design system is built
          on top of Tailwind CSS and follows a consistent naming convention.
        </p>
      </section>

      {/* CSS Variables */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">CSS Variables</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Color Variables</h3>
            <p className="text-muted-foreground mb-4">
              The color system uses HSL values for better color manipulation and
              consistency.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`:root {
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
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Dark Mode Variables</h3>
            <p className="text-muted-foreground mb-4">
              Dark mode colors are defined separately and automatically applied
              when the dark class is present.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`.dark {
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
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Customization */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Customization</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Changing Colors</h3>
            <p className="text-muted-foreground mb-4">
              To customize colors, simply override the CSS variables in your
              global CSS file.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`:root {
  /* Custom primary color */
  --primary: 220 14% 96%;
  --primary-foreground: 220.9 39.3% 11%;
  
  /* Custom accent color */
  --accent: 220 14% 96%;
  --accent-foreground: 220.9 39.3% 11%;
  
  /* Custom border radius */
  --radius: 0.75rem;
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Using Tailwind Classes</h3>
            <p className="text-muted-foreground mb-4">
              You can also use Tailwind CSS classes to customize components on a
              per-instance basis.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`// Custom button styling
<Button className="bg-blue-500 hover:bg-blue-600 text-white">
  Custom Button
</Button>

// Custom avatar styling
<Avatar className="w-16 h-16 border-4 border-blue-200" />

// Custom typography
<Typography className="text-2xl font-bold text-purple-600">
  Custom Text
</Typography>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Best Practices
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              1. Use CSS Variables for Global Changes
            </h3>
            <p className="text-muted-foreground">
              For consistent theming across your entire application, modify the
              CSS variables rather than overriding styles with Tailwind classes.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">2. Maintain Color Contrast</h3>
            <p className="text-muted-foreground">
              When customizing colors, ensure they meet accessibility standards
              for color contrast ratios.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              3. Test in Both Light and Dark Modes
            </h3>
            <p className="text-muted-foreground">
              Always test your customizations in both light and dark modes to
              ensure good visibility and contrast.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">4. Use Semantic Color Names</h3>
            <p className="text-muted-foreground">
              Stick to the semantic color naming convention (primary, secondary,
              destructive, etc.) for consistency.
            </p>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Custom Theme Example</h3>
            <p className="text-muted-foreground mb-4">
              Here's an example of a custom theme with a different color
              palette.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`:root {
  /* Purple theme */
  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 40% 98%;
  
  /* Custom secondary */
  --secondary: 210 40% 96%;
  --secondary-foreground: 262.1 83.3% 57.8%;
  
  /* Custom accent */
  --accent: 262.1 83.3% 57.8%;
  --accent-foreground: 210 40% 98%;
  
  /* Custom destructive */
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  
  /* Custom border radius */
  --radius: 1rem;
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
