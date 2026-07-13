# 内容迁移映射

## 现有内容 → 新结构

```
source/_posts/                          →  src/content/blog/
├── AI/
│   ├── 003-AI绘图技巧.md              →  src/content/blog/003-ai-drawing.md
│   ├── 004-大模型-从零编写.md           →  src/content/blog/004-llm-from-scratch.md
│   ├── 005-AI广告助手.md              →  src/content/blog/005-ai-ad-helper.md
│   └── 006-AI理财软件财小伴.md         →  src/content/blog/006-ai-finance.md
├── 博客技巧/
│   └── 001-小技巧-公式.md             →  src/content/blog/001-blog-formula-tips.md
└── 经济学/
    └── 002-经济学-meiltz2003.md        →  src/content/blog/002-economics-melitz2003.md
```

## Frontmatter 映射

| 旧 (Hexo) | 新 (Astro Content Collections) | 说明 |
|-----------|-------------------------------|------|
| `title` | `title` | 保持不变 |
| `date` | `date` | ISO 格式，自动解析 |
| `updated` | `updated` | 可选，最后修改时间 |
| `tags` | `tags: []` | YAML 数组 |
| `categories` | `category` | 单一分类字符串 |
| `cover` | `cover` | 文章封面图 |
| `top_img` | `hero` | 文章顶部大图 |
| `abbrlink` | ❌ 移除 | Astro 用 slug 文件名 |
| `mathjax` | ❌ 移除 | 全局启用 KaTeX |
| `toc_number` | ❌ 移除 | CSS 计数器控制 |

## 图片资源

- 外链图片（`picx.zhimg.com`、`lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com`）保持不变
- 本地图片迁移到 `public/images/` 或保留原 CDN 链接
