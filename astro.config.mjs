import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://juan-david-idarraga.github.io',
  integrations: [mdx(), sitemap()],
  output: 'static',
});
