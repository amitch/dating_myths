import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // This tells Vite to use the new JSX runtime
      jsxRuntime: 'automatic',
      // This ensures all .js files are treated as JSX
      include: '**/*.{js,jsx,ts,tsx}'
    })
  ],
  css: {
    postcss: './postcss.config.js'
  },
  // Ensure .jsx is resolved for .js files
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  // Configure esbuild to handle JSX in .js files
  esbuild: {
    loader: 'jsx',
    include: /.*\.jsx?$/,
    exclude: []
  }
});