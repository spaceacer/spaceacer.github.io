// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// When a custom domain is added, change `site` to it. Nothing else needs to move.
export default defineConfig({
  site: 'https://spaceacer.github.io',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
