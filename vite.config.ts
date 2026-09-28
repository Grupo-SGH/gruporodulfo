import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        // El "/dist" al final es CRUCIAL para evitar fallos de resolución en Vite
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