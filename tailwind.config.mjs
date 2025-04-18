/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", './node_modules/flyonui/dist/js/*.js'],
  theme: {},
  extend: {},
  plugins: [require("@tailwindcss/typography"), require('flyonui'), require('flyonui/plugin')],
  flyonui: {
    themes: ["light", "dark", "gourmet"]}
};
