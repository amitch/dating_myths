import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

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
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion']
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
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