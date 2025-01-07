import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration
export default defineConfig({
  server: {
    port: process.env.PORT || 3000, // Define the port
    host: "0.0.0.0", // Allow external connections
  },
  build: {
    outDir: "dist", // Ensure the build output is in the 'dist' directory
    sourcemap: true, // Enable sourcemaps for debugging
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit if necessary
    target: "esnext", // Ensure compatibility with modern browsers (optional)
    minify: true, // Minify the build output
  },
  plugins: [react()],
});
