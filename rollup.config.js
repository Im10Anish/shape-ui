const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const { default: dts } = require("rollup-plugin-dts");

const packageJson = require("./package.json");

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
        exclude: [
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/*.stories.ts",
          "**/*.stories.tsx",
        ],
      }),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extensions: [".css"],
        minimize: true,
        extract: "styles/globals.css", // Extract CSS to separate file
        sourceMap: true,
      }),
    ],
    external: [
      "react",
      "react-dom",
      "@radix-ui/react-slot",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [
      /\.css$/,
      "react",
      "react-dom",
      "@radix-ui/react-slot",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
];
