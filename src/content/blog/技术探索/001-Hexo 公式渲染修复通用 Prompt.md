---
title: Hexo 公式渲染修复通用 Prompt
date: 2023-01-01
updated: 2023-01-01
section: 技术探索
tags: [小技巧, 教程, HEXO]
pinned: true
cover: https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/%E6%8A%80%E6%9C%AF%E6%8E%A2%E7%B4%A2/hexo.jpg
hero: https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/%E6%8A%80%E6%9C%AF%E6%8E%A2%E7%B4%A2/hexo.jpg
description: 一套完整的 Hexo + Butterfly 主题下 LaTeX 公式安全化处理方案。
order: 4
---

以下是一套完整的 **Hexo + Butterfly 主题下 LaTeX 公式安全化处理 Prompt**，我们可以直接复制给其他 AI，要求它们按照此规则帮你修正 Markdown 文章中的公式问题。

这篇文章主要解决的问题是：
利用pandoc将word公式转化为markdown时，hexo出现的不识别问题。


---

## 🧠 **Hexo 公式渲染修复通用 Prompt**

### 📌 任务目标
将一篇包含大量 LaTeX 数学公式的 Markdown 文章，修改为能在 **Hexo（Butterfly 主题）** 中安全渲染的格式，避免因 Nunjucks 模板引擎与花括号冲突导致的构建失败（如 `Nunjucks Error: expected variable end`）。

### 🧩 问题背景
- Hexo 使用 **Nunjucks** 作为模板引擎，它会解析 `{{ }}` 和 `{% %}` 等标签。
- LaTeX 中经常出现 `{ }` 用于分组，连续的 `{{` {% endraw %}可能被 Nunjucks 误判为模板变量开始，导致构建中断。
- 即使公式被 `$$` 包裹，Nunjucks 的预处理阶段仍可能扫描到并报错。
- LaTeX 中经常出现 `{ }` 用于分组，连续的 `{{` 可能被 Nunjucks 误判为模板变量开始，导致构建中断。

### ✅ 处理规则（请严格按顺序执行）

#### 1️⃣ 修复双花括号
- **全局搜索** `{{` 和 `}}`。
- 将数学环境内的 **连续双花括号** 改为 **单层花括号** 或使用更安全的替代写法。
  - 例如：`{{q(\omega)}^{\rho}` → `{q(\omega)}^{\rho}` 或 `\bigl(q(\omega)\bigr)^{\rho}`。
  - 若外层花括号是必须的，可改为 `\left\{ ... \right\}`，但注意这也会引入花括号，因此优先使用 `\bigl` 或直接去掉多余分组。

#### 2️⃣ 简化幂指数与括号
- 将 `{(\frac{a}{b})}^{c}` 改为 `\left(\frac{a}{b}\right)^{c}` 或 `\bigl(\frac{a}{b}\bigr)^{c}`。
- 将 `{\lbrack ... \rbrack}^{c}` 改为 `\left[ ... \right]^{c}` 或 `[ ... ]^{c}`（如果不需要自动调整大小）。
- 避免在指数中使用额外花括号，如 `{x}^{y}` 直接写 `x^{y}` 即可。

#### 3️⃣ 修正错误的下标
- 检查是否有 `\varphi_{}^{*}` 这样的写法，应改为 `\varphi^{*}`。
- 确保下标和上标语法正确，如 `\varphi_{1}`、`\varphi^{*}`。

#### 4️⃣ 多行公式使用 `aligned` 环境
- 对于多行公式，使用 `\begin{aligned}` 包裹，放在 `$$` 内。
  ```latex
  $$
  \begin{aligned}
  A &= B \\
  C &= D
  \end{aligned}
  $$
  ```
- 这可以避免因换行符或 `\\` 导致的解析问题。

#### 5️⃣ 公式块之间留空行
- 确保每个独立的 `$$` 公式块之间 **至少有一个空行**，防止被合并为一个块。

#### 6️⃣ 检查其他 Nunjucks 敏感符号
- 全局搜索 `{%`、`%}`、`{{`、`}}`（即使在代码块或注释中也要注意）。
- 如果确实需要在文章中显示这些符号，使用 HTML 实体或{% endraw %}包裹。

#### 7️⃣ 备选方案：使用 {% endraw %}
- 如果文章极长且无法逐个修改，可以在 **Front-matter 之后、全文内容之前** 插入 ，在全文末尾插入 `{% endraw %}`。
- **注意**：这会禁用文章内的所有 Hexo 标签（如 `{% post_link %}`），仅适合纯文本 + 公式的文章。

### 🔍 验证步骤
1. 将修改后的 Markdown 文件放到 `source/_posts/` 下。
2. 运行 `hexo clean && hexo generate`，观察是否还有 Nunjucks 错误。
3. 若生成成功，运行 `hexo server` 预览，检查所有公式是否能正常渲染（建议开启 MathJax 或 KaTeX）。

### 📝 示例对照

| 错误写法 ❌ | 正确写法 ✅ |
|------------|------------|
| `U = {\lbrack\int_{\omega \in \Omega}^{}{{q(\omega)}^{\rho}d\omega}\rbrack}^{1/\rho}` | `U = \left[ \int_{\omega \in \Omega} q(\omega)^{\rho} \, d\omega \right]^{1/\rho}` |
| `\frac{r(\varphi_{1})}{r(\varphi_{2})} = {(\frac{\varphi_{1}}{\varphi_{2}})}^{\sigma - 1}` | `\frac{r(\varphi_{1})}{r(\varphi_{2})} = \left(\frac{\varphi_{1}}{\varphi_{2}}\right)^{\sigma-1}` |
| `\varphi_{}^{*}` | `\varphi^{*}` |
| 两个 `$$` 公式块之间无空行 | 中间加一个空行 |

### 💡 额外提示
- 如果使用 KaTeX，注意某些 LaTeX 命令可能需要额外加载扩展（如 `\begin{aligned}` 通常支持）。
- 建议在 Butterfly 主题配置中开启 `math: true` 并选择 `mathjax` 以获得最佳兼容性。

---

将此 Prompt 提供给其他 AI，它们就能按照这套标准化流程帮你批量修复文章中的公式问题了。

# 附一个小技巧

## hexo d
hexo d是hexo deploy的缩写，命令效果一致。
动态博客中通过发布文章页面设置的各种属性，在hexo里要这样设置。
使用hexo d命令可以自动生成网站静态文件，并部署到设定的仓库。

## hexo clean
hexo clean命令是用于清除缓存文件db.json和已生成的静态文件public。
网站显示异常时可以执行这条命令试试。

## hexo g
hexo g是hexo generate的缩写，命令效果一致。
生成网站静态文件到默认设置的public文件夹。便于查看网站生成的静态文件或者手动部署网站；如果使用自动部署，不需要先执行该命令；

## hexo n page
hexo n page aboutme
新建一个标题为aboutme的页面，默认链接地址为主页地址/aboutme/标题可以为中文，但一般习惯用英文；页面标题和文章一样可以随意修改；页面不会出现在

## hexo s
hexo s是hexo server的缩写，命令效果一致；启动本地服务器，用于预览主题。默认地址： http://localhost:4000/
预览的同时可以修改文章内容或主题代码，保存后刷新页面即可；
对 Hexo 根目录_config.yml的修改，需要重启本地服务器后才能预览效果。

hexo clean && hexo g && hexo s

hexo clean && hexo g && hexo d