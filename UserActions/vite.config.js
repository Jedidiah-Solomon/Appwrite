import { defineConfig } from "vite";
import path from "path";
import { globSync } from "glob";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Helper function to get HTML files
function getHtmlFiles(srcPath) {
  return globSync(`${srcPath}/**/*.html`).reduce((entries, file) => {
    const entry = path.relative(srcPath, file);
    entries[entry] = file;
    return entries;
  }, {});
}

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  base: "/",
  build: {
    outDir: path.resolve(__dirname, "public"),
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlFiles(path.resolve(__dirname, "src")),
    },
  },
  server: {
    port: 3000,
  },

  define: {
    // Pass environment variables to the client-side code
    "process.env.VITE_APPWRITE_ENDPOINT": JSON.stringify(
      process.env.VITE_APPWRITE_ENDPOINT
    ),
    "process.env.VITE_APPWRITE_PROJECT_ID": JSON.stringify(
      process.env.VITE_APPWRITE_PROJECT_ID
    ),
  },
});
