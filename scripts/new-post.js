#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, '..', 'src', 'content', 'blog');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

async function main() {
  console.log('╔══════════════════════════════╗');
  console.log('║     新建博客文章            ║');
  console.log('╚══════════════════════════════╝\n');

  const title = await ask('文章标题: ');
  if (!title) { console.log('标题不能为空'); rl.close(); return; }

  console.log('\n板块:');
  console.log('  1. 项目作品');
  console.log('  2. 技术探索');
  console.log('  3. 阅读笔记');
  console.log('  4. 闲隅拾笺');
  const sectionChoice = await ask('选择板块 (1-4): ');
  const sectionMap = { '1': '项目作品', '2': '技术探索', '3': '阅读笔记', '4': '闲隅拾笺' };
  const section = sectionMap[sectionChoice] || '技术探索';

  const tagsInput = await ask('标签 (逗号分隔, 如: AI, 教程): ');
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];

  const desc = await ask('一句话摘要 (可选): ');

  const featured = await ask('首页精选轮播? (y/N): ');
  const pinned = await ask('板块四宫格置顶? (y/N): ');

  // Generate slug from title
  const slug = title
    .replace(/[^\w一-鿿]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase() || 'new-post';

  const today = new Date().toISOString().slice(0, 10);

  const tagsStr = tags.length > 0 ? `[${tags.join(', ')}]` : '[]';

  const frontmatter = [
    '---',
    `title: ${title}`,
    `date: ${today}`,
    `section: ${section}`,
    `tags: ${tagsStr}`,
    desc ? `description: ${desc}` : null,
    featured.toLowerCase() === 'y' ? 'featured: true' : null,
    pinned.toLowerCase() === 'y' ? 'pinned: true' : null,
    '---',
    '',
    '',
  ].filter(Boolean).join('\n');

  const sectionDir = join(contentDir, section);
  const filename = `${today}-${slug}.md`;
  const filepath = join(sectionDir, filename);

  writeFileSync(filepath, frontmatter, 'utf-8');
  console.log(`\n✅ 已创建: src/content/blog/${section}/${filename}`);
  rl.close();
}

main();
