// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
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
      serialize(item) {
        if (item.url === "https://ludovic.coullet.net/") {
          item.priority = 1.0;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        } else if (item.url === "https://ludovic.coullet.net/blog/") {
          item.priority = 0.9;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        } else if (item.url.includes("/blog/category/")) {
          item.priority = 0.5;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else if (item.url.includes("/blog/")) {
          item.priority = 0.8;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else if (item.url.includes("/soundcloud/")) {
          item.priority = 0.8;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else if (item.url.includes("/cv/")) {
          item.priority = 0.7;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        }
        return item;
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