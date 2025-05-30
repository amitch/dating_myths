import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
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
  
  // Base public path when served in development or production
  base: env.VITE_BASE_URL || '/',
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion']
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Ensure proper MIME types
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index') {
            return 'assets/[name]-[hash].js';
          }
          return 'assets/[name]-[hash].js';
        },
        // Ensure proper hashing for cache busting
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let ext = info[info.length - 1];
          if (ext === 'css') {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Ensure proper MIME types for all files
    assetsInlineLimit: 0,
    // Minify the output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
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
}});