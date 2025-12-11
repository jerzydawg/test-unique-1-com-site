// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
// Site URL is set dynamically via SITE_URL env variable or defaults to placeholder
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind()],
  site: process.env.SITE_URL || 'https://example.com',
  server: { port: 4321, host: true },
  build: { inlineStylesheets: 'auto' }
});
