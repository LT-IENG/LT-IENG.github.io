# LT-IENG 个人网站

基于 [Astro](https://astro.build) 构建的静态博客，部署于 GitHub Pages，域名 [lt-ieng.cn](https://lt-ieng.cn)。

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 本地预览 http://localhost:4321
npm run build      # 构建生产版本到 dist/
```

## 写新文章

在 `src/content/blog/` 下新建 `.md` 文件：

```markdown
---
title: 文章标题
date: 2026-06-30
section: 技术探索            # 项目作品 | 技术探索 | 阅读笔记 | 闲隅拾笺
tags: [标签1, 标签2]
cover: https://example.com/cover.jpg   # 可选
hero: https://example.com/hero.jpg     # 可选
description: 一句话摘要
featured: false              # 是否在首页精选区展示
---

正文内容...
```

## 修改配色

编辑 `src/styles/global.css` 中的 CSS 变量：

```css
@theme {
  --color-cream: #faf8f5;       /* 主背景 */
  --color-ink: #1a1a2e;         /* 主文字 */
  --color-gold: #c4a882;        /* 点缀色 */
  --color-section-project: #c4a882;  /* 项目作品色 */
  --color-section-tech: #5b7a8c;     /* 技术探索色 */
  --color-section-reading: #b8937a;  /* 阅读笔记色 */
  --color-section-notes: #8b9d83;    /* 闲隅拾笺色 */
}
```

## 项目结构

```
src/
├── components/     # UI 组件
│   ├── Hero.astro           # 首页 Hero + Canvas 粒子背景
│   ├── FeaturedSlider.astro # 精选博客横向滑动
│   ├── ResumeSection.astro  # 简历简介区
│   ├── SectionOverview.astro # 4 板块网格
│   └── ...
├── content/blog/   # 博客文章（Markdown）
├── data/           # 板块定义
├── layouts/        # 页面布局
├── pages/          # 路由页面
├── styles/         # 全局样式
└── utils/          # 工具函数
```

## 部署

推送到 GitHub `main` 分支，GitHub Actions 自动构建部署到 `lt-ieng.cn`。

工作流文件：`.github/workflows/deploy.yml`
