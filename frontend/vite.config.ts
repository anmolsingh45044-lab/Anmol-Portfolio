import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative base so the built site works whether it's served from the repo
  // root (custom domain / user.github.io) or a project subpath
  // (user.github.io/repo-name/) — no need to hardcode the repo name.
  base: "./",
  server:  { port:3000, proxy: { "/api":"http://localhost:5000" } },
  build:   {
    outDir:"dist",
    sourcemap:false,
    rollupOptions: { output: { manualChunks: { vendor:["react","react-dom"], framer:["framer-motion"] } } },
  },
});
