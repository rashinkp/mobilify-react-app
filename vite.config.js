import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist", // Changed from 'dist' to 'build'
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react()],
});
