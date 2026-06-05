// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { config } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: "https://ludovic.coullet.net",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        if (!config.publishCV && page.includes("/cv")) {
          return false;
        }
        return true;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});