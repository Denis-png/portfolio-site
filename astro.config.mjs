// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  // Used for the sitemap, canonical links and social-preview URLs.
  // Change it when the custom domain is attached.
  site: 'https://portfolio-site.denismaxheimer.workers.dev',
  integrations: [sitemap()],
  markdown: {
    // Astro 7's default Markdown processor does not run remark/rehype plugins,
    // so the site opts in to Unified to get math ($...$) support.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      theme: 'github-dark-dimmed',
    },
  },
});
