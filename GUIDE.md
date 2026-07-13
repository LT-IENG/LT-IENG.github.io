# LT-IENG 个人网站 — 使用指南

## 项目架构

```
LTwebsite/
├── src/
│   ├── pages/                  # 路由页面（一个文件 = 一个 URL）
│   │   ├── index.astro         # 首页（Hero + 简历 + 四板块堆叠）
│   │   ├── about.astro         # 关于页
│   │   ├── archives.astro      # 时间轴（按年归档）
│   │   ├── blog/
│   │   │   ├── index.astro     # 博客列表（搜索 + 筛选）
│   │   │   └── [slug].astro    # 文章详情页
│   │   └── section/
│   │       └── [name].astro    # 板块文章列表页
│   │
│   ├── components/             # UI 组件（可复用的积木）
│   │   ├── Hero.astro          # 首页 Hero + Canvas 粒子背景
│   │   ├── ParticleBackground.ts  # Canvas 粒子动画引擎
│   │   ├── FeaturedSlider.astro   # 精选博客横向滑动
│   │   ├── FeaturedCard.astro     # 滑动区单张卡片
│   │   ├── ResumeSection.astro    # 简历/个人介绍区
│   │   ├── ArticleGridCard.astro  # 板块内 2×2 文章卡片
│   │   ├── SectionBlock.astro     # 单个板块区块（已不再使用）
│   │   ├── Nav.astro / Footer.astro  # 导航栏 / 页脚
│   │   ├── SearchModal.astro      # 全站搜索弹窗
│   │   ├── BlogCard.astro         # 博客列表卡片
│   │   ├── BlogList.astro         # 博客列表容器
│   │   ├── SearchFilter.astro     # 博客页搜索筛选
│   │   └── TableOfContents.astro  # 文章目录
│   │
│   ├── content/blog/           # 博客文章（Markdown）
│   ├── data/sections.ts        # 四个板块的定义
│   ├── layouts/BaseLayout.astro   # 全局布局壳
│   ├── styles/global.css       # 全局样式 + 配色变量
│   └── utils/blog.ts           # 文章数据获取工具
│
├── public/                     # 静态资源（直接复制到构建产物）
│   ├── CNAME                   # 域名 lt-ieng.cn
│   └── favicon.svg
│
├── astro.config.mjs            # Astro 配置（站点 URL、插件、Markdown）
├── package.json                # 依赖声明
├── tsconfig.json               # TypeScript 配置
├── .github/workflows/deploy.yml  # GitHub Actions 自动部署
└── dist/                       # 构建产物（npm run build 生成）
```

### 核心架构原则

| 层级 | 职责 | 例子 |
|------|------|------|
| `pages/` | 路由，组合组件，不写复杂逻辑 | `index.astro` 组合 Hero + Resume + 板块 |
| `components/` | 可复用的 UI 块，自包含样式 | `FeaturedSlider.astro` |
| `content/` | 纯数据，Markdown + frontmatter | 你的博客文章 |
| `data/` | 结构化配置数据 | 四个板块的名称和颜色 |
| `styles/` | 全局 CSS 变量和基础样式 | 配色、字体、卡片基类 |
| `utils/` | 纯函数工具 | 获取文章列表、按板块筛选 |

---

## 如何写一篇新博客

### 快捷新建

```bash
npm run new          # 交互式创建，自动填入 frontmatter
```

或者手动在对应板块文件夹下新建 `.md` 文件：

```
src/content/blog/
├── 项目作品/    ← 项目相关文章
├── 技术探索/    ← 技术、AI、教程
├── 阅读笔记/    ← 读书、经济学
└── 闲隅拾笺/    ← 随笔杂谈
```

文件名建议英文 slug，最终 URL 如 `/blog/技术探索/007-my-new-post`。

### Frontmatter 模板

```markdown
---
title: 你的文章标题
date: 2026-07-15
section: 技术探索               # 四选一：项目作品 | 技术探索 | 阅读笔记 | 闲隅拾笺
tags: [标签1, 标签2, 标签3]
cover: https://example.com/cover.jpg   # 可选，文章封面图
hero: https://example.com/hero.jpg     # 可选，文章顶部大图
description: 一句话摘要，显示在卡片和搜索结果中
featured: true                # 是否在首页精选滑动区展示
pinned: true                  # 是否置顶在板块四宫格
---

正文内容（Markdown 格式）...
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，格式 `YYYY-MM-DD` |
| `section` | 是 | 所属板块，必须是 `项目作品` / `技术探索` / `阅读笔记` / `闲隅拾笺` |
| `tags` | 否 | 文章标签，用于搜索和展示 |
| `cover` | 否 | 封面图，显示在卡片上。支持外链 URL |
| `hero` | 否 | 文章页顶部大图 |
| `description` | 否 | 文章摘要。不填则卡片只显示标题 |
| `featured` | 否 | `true` 则出现在首页 Hero 精选滑动区 |
| `pinned` | 否 | `true` 则优先出现在板块四宫格 |

### Markdown 能力

- 标准 Markdown 语法（标题、列表、链接、图片、代码块等）
- LaTeX 数学公式：`$E = mc^2$`（行内）或 `$$...$$`（块级）
- 代码块自动语法高亮（Shiki 引擎）

---

## 如何调整界面样式

### 改配色

编辑 `src/styles/global.css`，修改 `@theme` 块内的 CSS 变量：

```css
@theme {
  --color-cream: #faf8f5;       /* 页面主背景 */
  --color-ink: #1a1a2e;         /* 主文字颜色 */
  --color-ink-light: #6b7280;   /* 次要文字 */
  --color-gold: #c4a882;        /* 点缀色（链接、hover、粒子连线） */
  --color-code-bg: #f0ece6;     /* 代码块背景 */

  /* 四个板块的主题色 */
  --color-section-project: #c4a882;   /* 项目作品 */
  --color-section-tech: #5b7a8c;      /* 技术探索 */
  --color-section-reading: #b8937a;    /* 阅读笔记 */
  --color-section-notes: #8b9d83;     /* 闲隅拾笺 */
}
```

改完后 `npm run dev` 热更新即时生效。

### 改字体

在 `src/layouts/BaseLayout.astro` 中修改 Google Fonts 引用，然后在 `src/styles/global.css` 的 `@theme` 中改 `--font-serif` / `--font-sans` / `--font-mono`。

### 改板块

编辑 `src/data/sections.ts`：

```ts
export const sections: Section[] = [
  {
    id: '你的板块名',       // 唯一标识，不要重复
    name: '你的板块名',     // 显示名称
    description: '描述文字',
    color: '#c4a882',      // 主题色（十六进制）
    colorClass: 'section-xxx',
    emoji: '',
  },
  // ... 可以增减板块
];
```

新增或删除板块后，已有的文章 `section` 字段需要对应更新。

---

## 如何运行和部署

### 本地开发

```bash
npm install          # 首次运行：安装依赖
npm run dev          # 启动开发服务器 → http://localhost:4321
```

文件修改后浏览器自动刷新。

### 构建生产版本

```bash
npm run build        # 输出到 dist/
npm run preview      # 本地预览生产版本
```

### 部署到 GitHub Pages

推送到 GitHub `main` 分支即可。`.github/workflows/deploy.yml` 自动：
1. `npm ci` 安装依赖
2. `npm run build` 构建
3. 将 `dist/` 部署到 GitHub Pages

域名 `lt-ieng.cn` 通过 `public/CNAME` 文件绑定。

---

## 首页结构

从上到下滚动：

```
┌─ Hero 全屏 ──────────────────────────┐
│  Canvas 粒子背景                      │
│  LT-IENG / 此刻，未来                 │
│  精选博客横向自动滑动（hover 减速）     │
├─ 简历区 ─────────────────────────────┤
│  个人介绍 / 技能标签 / 社交链接        │
│  "探索我的文章 ↓"                     │
├─ 四板块卡片堆叠 ─────────────────────┤
│  01 项目作品（2×2 文章网格）           │
│     ↓ 下滑切换                        │
│  02 技术探索（2×2 文章网格）           │
│     ↓ 下滑切换                        │
│  03 阅读笔记（2×2 文章网格）           │
│     ↓ 下滑切换                        │
│  04 闲隅拾笺（2×2 文章网格）           │
├─ Footer ────────────────────────────┤
```

### 板块堆叠原理

整个板块区是一个 500vh 高的场景容器，内部一个 `position: sticky` 视口固定住屏幕。四张卡片 `position: absolute` 叠在一起，JS 根据滚动百分比控制每张卡片的 `translateY` 和 `opacity`。滚动到对应阈值时，下一张卡片从下方滑入覆盖当前卡片。

---

## 常见操作速查

| 操作 | 怎么做 |
|------|--------|
| 写新文章 | `src/content/blog/` 下建 `.md`，填好 frontmatter |
| 改首页精选文章 | 在文章的 frontmatter 中设 `featured: true` |
| 改配色 | 编辑 `src/styles/global.css` 的 CSS 变量 |
| 改个人介绍 | 编辑 `src/components/ResumeSection.astro` |
| 改板块名/颜色 | 编辑 `src/data/sections.ts` |
| 改导航菜单 | 编辑 `src/components/Nav.astro` |
| 改页脚 | 编辑 `src/components/Footer.astro` |
| 调粒子效果 | 编辑 `src/components/ParticleBackground.ts` |
| 本地预览 | `npm run dev` |
| 构建上线 | `git push`（自动部署） |
