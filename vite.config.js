import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      include: '**/*.{js,jsx,ts,tsx}'
    })
  ],
  css: {
    postcss: './postcss.config.cjs'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      // Add any necessary aliases here
    }
  },
  esbuild: {
    loader: 'jsx',
    include: /.*\.(jsx?|tsx?)$/,
    exclude: []
  },
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    // Ensure proper MIME types for all files
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.jsx') || assetInfo.name.endsWith('.js')) {
            return 'assets/js/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    // Ensure proper MIME types in development
    headers: {
      'Content-Type': 'application/javascript'
    }
  },
  preview: {
    port: 3000,
    open: true,
    headers: {
      'Content-Type': 'application/javascript'
    }
  }
});