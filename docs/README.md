# Shape UI Documentation

A modern, professional documentation site for the Shape UI component library, built with Next.js and Tailwind CSS.

## Features

- 🎨 **Modern Design**: Clean, professional interface inspired by shadcn/ui
- 🌙 **Dark Mode**: Built-in theme switching with system preference detection
- 📱 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Fast**: Built with Next.js for optimal performance
- 🔍 **Search**: Component search and navigation
- 📚 **Comprehensive**: Detailed documentation with examples and API references

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
docs/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── components/         # Component documentation pages
│   │   ├── docs/              # Documentation pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── header.tsx     # Site header
│   │   │   └── sidebar.tsx    # Navigation sidebar
│   │   └── ui/                # UI components
│   │       └── theme-provider.tsx
│   └── lib/
│       └── utils.ts           # Utility functions
├── package.json
├── tailwind.config.js
└── next.config.js
```

## Customization

### Adding New Components

1. Create a new page in `src/app/components/[component-name]/page.tsx`
2. Add the component to the sidebar navigation in `src/components/layout/sidebar.tsx`
3. Update the components overview page in `src/app/components/page.tsx`

### Styling

The documentation site uses the same design system as the main library:

- Tailwind CSS for styling
- CSS variables for theming
- Consistent color palette and spacing

### Deployment

The documentation site can be deployed to any platform that supports Next.js:

- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Build command: `npm run build`, publish directory: `.next`
- **GitHub Pages**: Use the `next export` command for static export

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the documentation site locally
5. Submit a pull request

## License

MIT License - see the main repository for details.
