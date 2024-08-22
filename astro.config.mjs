import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import customToc from "astro-custom-toc";
import pagefind from "astro-pagefind";
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
const defaultTemplate = html => {
  return `
<hr class="rounded">
<aside class="toc">
  <h2>Table Of Contents</h2>
  <nav>
      ${html}
  </nav>
</aside>
<hr class="rounded">`.trim();
};


// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'catppuccin-mocha',
    },
    remarkPlugins: [],
    rehypePlugins: [rehypeHeadingIds, rehypeAccessibleEmojis, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]],
  },
  output: "static",
  build: {
    format: "file",
  },
  integrations: [customToc({
    template: defaultTemplate,
    maxDepth: 5,
    ordered: false
  }), mdx({
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'catppuccin-mocha',
    },
    remarkPlugins: [],
    rehypePlugins: [rehypeHeadingIds, rehypeAccessibleEmojis, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]],
  }), pagefind()],
});