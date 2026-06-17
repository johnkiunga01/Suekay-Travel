import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://suekaytours.com',
  output: 'static',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
    domains: ['images.pexels.com', 'images.unsplash.com'],
  },
});
