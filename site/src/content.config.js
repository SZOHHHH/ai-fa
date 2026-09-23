import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// id = 原始相对路径（保大小写/中文/括号，与库路径及站内链接一致）
// ——默认 slugify 会把 10-Papers→10-papers、剥括号，导致 /explore/<原始路径> 全 404
const docs = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/docs',
    generateId: ({ entry }) => entry.replace(/\\/g, '/').replace(/\.md$/, ''),
  }),
});

export const collections = { docs };
