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
};
