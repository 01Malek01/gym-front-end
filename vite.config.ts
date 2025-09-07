import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    include: ["@radix-ui/react-dialog", "@radix-ui/react-slot"],
  },
});
