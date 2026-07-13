# 技术规格 v2

## 技术栈明细

| 层级 | 选型 | 说明 |
|------|------|------|
| 框架 | Astro 5.x | SSG 优先，默认 0 JS |
| 样式 | Tailwind CSS 4.x | 实用优先，自定义设计令牌 |
| 内容 | MDX (Content Collections) | Markdown + 类型安全 |
| 动效 | Canvas API + GSAP | 原生粒子 + 滚动动画 |
| 代码高亮 | Shiki (Astro 内置) | 比 highlight.js 更现代 |
| 数学公式 | remark-math + rehype-katex | 保留 Hexo 时代的 KaTeX |
| 评论 | Giscus | GitHub Discussions 驱动 |
| 部署 | GitHub Actions → gh-pages | 自动构建部署 |

## 包依赖

```json
{
  "dependencies": {
    "@astrojs/mdx": "latest",
    "@astrojs/sitemap": "latest",
    "@astrojs/rss": "latest",
    "astro": "latest",
    "gsap": "latest",
    "katex": "latest",
    "rehype-katex": "latest",
    "remark-math": "latest"
  },
  "devDependencies": {
    "tailwindcss": "latest",
    "@tailwindcss/typography": "latest",
    "@tailwindcss/vite": "latest"
  }
}
```

## Canvas 粒子背景规格

```
粒子数量:    80-150（屏幕 > 768px）/ 40-60（移动端）
粒子大小:    1.5-3px
连线距离:    < 130px 时连线
连线透明度:  0.08-0.25（距离越近越不透明）
粒子颜色:    #c4a882 暖金（80%）+ #ffffff 白（20%）
鼠标范围:    180px 半径内粒子被吸引
帧率:        requestAnimationFrame, 目标 60fps
Canvas:      全屏（Hero 区），ResizeObserver 自适应
```

## 精选滑动区规格

```
卡片宽度:    340px (桌面) / 280px (平板) / 85vw (手机)
可见卡片:    2.5 张 (桌面) / 1.5 张 (平板) / 1.1 张 (手机)
自动间隔:    4 秒
过渡:        scroll-behavior: smooth + scroll-snap
导航:        底部圆点指示器
遮罩:        左右 CSS gradient 渐隐
```

## 板块概览网格

```
桌面 (>1024px):  2×2 grid, gap: 24px
平板 (768-1024):  2×2 grid, gap: 16px
手机 (<768px):   1×4 stack, gap: 16px
卡片最小高度:    220px
卡片背景:        白色 + 微阴影
板块色标识:      左侧 4px 彩色竖条
```

## 响应式断点

| 断点 | 宽度 | Hero | 板块网格 | 精选卡片 | 文章排版 |
|------|------|------|----------|----------|----------|
| 手机 | <640px | 80vh | 1 列 | 1.1 张 | 全宽 |
| 平板 | 640-1024px | 90vh | 2 列 | 1.5 张 | 全宽 |
| 桌面 | >1024px | 100vh | 2 列 | 2.5 张 | 720px 居中 |

## 性能预算

| 指标 | 目标 |
|------|------|
| Lighthouse Performance | > 95 |
| 首屏 JS | < 30 KB（仅粒子 + GSAP） |
| 首屏加载 | < 2s (3G) |
| 字体加载 | display=swap（无闪烁） |
| Core Web Vitals | All green |
