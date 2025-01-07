import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0', // Allows access from external devices
  },
  build: {
    outDir: 'dist', // Specifies the output directory
    sourcemap: true, // Useful for debugging production builds
    chunkSizeWarningLimit: 1000, // Avoids warnings for large chunks
  },
  plugins: [react()],
})
