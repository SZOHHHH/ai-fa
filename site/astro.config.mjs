import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import mathComplexity from './src/plugins/math-complexity.mjs';

// 自研全站（B3，260923 上线部署切换）：浅色出版阅读风
// 部署=GitHub Pages 子路径 /ai-fa/（dev 本地根路径 / 自动适配——import.meta.env.BASE_URL 区分）
export default defineConfig({
  integrations: [react()],
  base: '/ai-fa/',
  site: 'https://szohhhh.github.io',
  markdown: {
    remarkPlugins: [remarkMath, mathComplexity],
    rehypePlugins: [[rehypeKatex, { strict: false, throwOnError: false }]],
  },
  server: { host: 'localhost' },
});
