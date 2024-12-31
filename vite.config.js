import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'), // Alias for app utilities
      '@supports': path.resolve(__dirname, 'tests/supports'), // Alias for test helpers
      '@contexts': path.resolve(__dirname, 'src/contexts'), // Alias for context providers
      '@hooks': path.resolve(__dirname, 'src/hooks'), // Alias for custom hooks
      '@components': path.resolve(__dirname, 'src/components'), // Alias for components
      '@logics': path.resolve(__dirname, 'src/logics'), // Alias for logic
      '@app': path.resolve(__dirname, 'src/App.jsx'), // Alias for the main App component
    },
  },
});
