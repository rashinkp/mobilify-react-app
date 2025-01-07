import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 1500, // Increased from 1000
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "@reduxjs/toolkit",
            "react-redux",
          ],
          // Split chart libraries
          charts: ["chart.js", "react-chartjs-2", "recharts"],
          // Split UI libraries
          ui: ["@headlessui/react", "@shadcn/ui", "lucide-react"],
          // Split form libraries
          forms: ["react-hook-form", "@hookform/resolvers", "yup"],
        },
      },
    },
  },
  plugins: [react()],
});
