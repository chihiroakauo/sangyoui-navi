// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Content pages are prerendered to static HTML (ready for a future custom-domain
// static/CDN deploy). The consultation API route opts out of prerendering and is
// served on demand by the Node adapter.
export default defineConfig({
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  server: {
    host: true,
    port: 4321,
  },
});
