import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  //
  base: "./",
  plugins: [
    react({
      babel: {
        plugins: ["@locator/babel-jsx/dist"],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  build: { sourcemap: true },
  css: { devSourcemap: true },
});