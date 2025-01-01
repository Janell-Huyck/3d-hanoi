export default {
  transform: {
    '^.+\\.(js|jsx)$': '@swc/jest', // Use SWC to transform JavaScript and JSX
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'css'], // Recognize .js and .jsx files
  roots: ['<rootDir>/src'], // Look for tests in the 'src' directory
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'], // Match test files with .test.js/.test.jsx
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Run setup file after the environment is configured
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS files
    '^@utils(.*)$': '<rootDir>/src/utils$1', // Alias for utils
    '^@supports(.*)$': '<rootDir>/src/tests/supports$1', // Alias for testing support
    '^@contexts(.*)$': '<rootDir>/src/contexts$1', // Alias for context
    '^@components(.*)$': '<rootDir>/src/components$1', // Alias for components
    '^@hooks(.*)$': '<rootDir>/src/hooks$1', // Alias for hooks
    '^@logics(.*)$': '<rootDir>/src/logics$1', // Alias for logic
    '^@app$': '<rootDir>/src/App.jsx', // Alias for the main App component
    '^@constants(.*)$': '<rootDir>/src/constants$1', // Alias for constants
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
  coverageReporters: ['lcov', 'text-summary'], // Use lcov for detailed coverage reports and text-summary for CLI output
  coverageThreshold: {
    global: {
      branches: 100, // Current branch coverage threshold
      functions: 100, // Current function coverage threshold
      lines: 100, // Current line coverage threshold
      statements: 100, // Current statement coverage threshold
    },
  },
};
