import eslint from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Lints your files in a separate thread so your dev server stays fast
    eslint(),
  ],
  // Optional: If you want to use absolute imports (like '@/components')
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
