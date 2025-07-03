import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      strictMode: false,
    },
  },
  docs: {},
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  viteFinal: async (config, { configType }) => {
    // Enhanced CI-specific configuration
    config.define = {
      ...config.define,
      global: "globalThis",
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production",
      ),
    };

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        crypto: "crypto",
      },
    };

    // CI-specific build optimizations
    if (configType === "PRODUCTION" && process.env.CI) {
      config.build = {
        ...config.build,
        target: "es2020",
        rollupOptions: {
          ...config.build?.rollupOptions,
          external: ["crypto"],
          output: {
            ...config.build?.rollupOptions?.output,
            inlineDynamicImports: false,
            manualChunks: {
              vendor: ["react", "react-dom"],
            },
          },
        },
      };
    }

    return config;
  },
};

export default config;
