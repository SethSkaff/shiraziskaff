import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "strip-router-default-error-emojis",
      generateBundle(_, bundle) {
        for (const asset of Object.values(bundle)) {
          if (asset.type === "chunk") {
            asset.code = asset.code.replaceAll("💿", "").replaceAll("👋", "");
          }
        }
      },
    },
  ],
});
