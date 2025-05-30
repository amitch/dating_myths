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
    postcss: './postcss.config.cjs'
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
  },
  
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  
  // Preview configuration
  preview: {
    port: 3000,
    open: true
  }
});