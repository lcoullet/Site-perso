import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { astroImageTools } from "astro-imagetools";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: 'https://ludovic.coullet.net',
  integrations: [tailwind(), astroImageTools, compress()]
});