import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(new URL('.', import.meta.url).pathname, "src"),
    },
  },
    build: {
    outDir: 'dist',  // Output directory for the build
    sourcemap: true,  // Enable source maps for production debugging
    minify: 'terser',  // Use terser for minification
    brotliSize: false, // Disable Brotli size report,
    rollupOptions: {
      output: {
        entryFileNames: '[name].[hash].js',  // Naming convention for entry chunks
        chunkFileNames: '[name].[hash].js',  // Naming convention for chunk files
        assetFileNames: '[name].[hash][extname]', // Naming convention for asset files
      }
    }
  },
  server: {
    port: 3000,      // Local development server port
    open: true,      // Open the browser on server start
    cors: true,      // Enable CORS
  },
});