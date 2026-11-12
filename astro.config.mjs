import { defineConfig } from 'astro/config';
import { getSiteConfig } from './src/config/site.mjs';

const { site } = getSiteConfig();

export default defineConfig({
  output: 'static',
  site,
  vite: { build: { assetsInlineLimit: 0 } },
});
