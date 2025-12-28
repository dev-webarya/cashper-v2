import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 4208,
    strictPort: false,  // Allow port fallback if 4208 is busy
    host: 'localhost',  // Only localhost, no network address
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'recharts', 'axios', 'framer-motion'],
    exclude: ['@react-oauth/google', 'lucide-react'],
  },
  ssr: {
    noExternal: ['recharts'],
  },
})