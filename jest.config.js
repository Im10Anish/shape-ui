module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/index.ts", // Exclude entry point from coverage
    "!src/**/*.d.ts",
    "!src/**/*.stories.{ts,tsx}",
    "!src/test/**",
  ],
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 93,
      functions: 100,
      lines: 100,
      statements: 99,
    },
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{ts,tsx}",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  coverageDirectory: "coverage",
};
