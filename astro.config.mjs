// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://binah.co',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react()],
  // Legal texts are hashed as written: no typographic quote substitution.
  markdown: { smartypants: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
