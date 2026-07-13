import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkStripRaw } from './src/utils/remark-strip-raw.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://lt-ieng.cn',
  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [remarkStripRaw, remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'catppuccin-latte',
      wrap: true,
    },
  },

  // For GitHub Pages with custom domain
  trailingSlash: 'never',
});
