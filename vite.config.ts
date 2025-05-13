import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_PATH || "/pixelboom",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
