import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5000,   // force Vite to always use port 5000
    strictPort: true, // ❗ this makes Vite fail if 5000 is not free (instead of switching)
    hmr: {
      overlay: false,
    },
  },
})



















































