export default {
  transform: {
    '^.+\\.(js|jsx)$': '@swc/jest', // Use SWC to transform JavaScript and JSX
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'css'], // Recognize .js and .jsx files
  roots: ['<rootDir>/src'], // Look for tests in the 'src' directory
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'], // Match test files with .test.js/.test.jsx
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-dnd|dnd-core|@react-dnd|react-dnd-html5-backend))',
  ], // Ensure these dependencies are transpiled

  // Add coverage configuration
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    'src/**/*.{js,jsx}', // Include all JavaScript and JSX files in src
    '!src/index.js', // Exclude index.js
    '!src/serviceWorker.js', // Exclude service workers
    '!src/**/*.test.{js,jsx}', // Exclude test files
  ],
  coverageThreshold: {
    global: {
      branches: 50, // 100% branch coverage desired, at 50% to begin
      functions: 50, // 100% branch coverage desired, at 50% to begin
      lines: 50, // 100% branch coverage desired, at 50% to begin
      statements: 50, // 100% branch coverage desired, at 50% to begin
    },
  },
};
