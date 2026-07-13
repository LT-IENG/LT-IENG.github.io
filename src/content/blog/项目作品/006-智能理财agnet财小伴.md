---
title: 智能理财agnet-招商AI产品比赛TOP20作品
date: 2026-05-18
updated: 2026-05-18
section: 项目作品
tags: [个人项目, AI agent, AI]
cover: https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/项目002-封面图片.png
hero: https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/项目002-封面图片.png
featured: true
pinned: true
description: 财小伴 — 大学生的 AI 理财搭子，校园轻理财，省心有小伴。
---
---


# 财小伴 — 大学生的理财搭子

> 校园轻理财，省心有小伴

**财小伴**是一款面向在校大学生的轻量化理财陪伴AI智能体。通过智能对话机器人，帮助大学生解决记账繁琐、理财知识匮乏、缺乏陪伴感三大痛点。纯前端实现，无需注册登录，数据本地存储，隐私安全。

---

## ✨ 核心功能

| 功能 | 说明 |
|------|------|
| 🤖 **AI智能记账** | 自然语言描述收支，AI自动识别金额/分类并录入；区分真实记账与假设提问 |
| 📚 **理财知识陪伴** | 四大模块：理财科普、风险认知测试、低风险理财讲解、校园防骗反诈指南 |
| 🎭 **个性化AI搭子** | 双人设（顾云生·高冷男神 / 林可可·可爱甜妹）+ 支持自定义头像/姓名/人设 |
| 📊 **收支统计分析** | 趋势折线图、分类饼图、月度/年度消费小结、攒钱进度可视化 |
| 🎯 **攒钱目标管理** | 多目标优先级自动填充，月度结余按顺序分配 |
| 📅 **日历视图** | 每日结余可视化，正负金额对应不同背景色 |
| 💾 **数据自主管理** | 本地localStorage存储，支持JSON导入/导出，一键清空 |

---

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | HTML5 + CSS3 + Vanilla JavaScript（模块化架构） |
| 图表 | Chart.js 4.4 |
| AI引擎 | DeepSeek Chat API（支持上下文窗口、人设注入、Mock回退） |
| 存储 | localStorage（无需后端数据库） |
| 部署 | GitHub Pages + GitHub Actions（API Key通过Secrets注入） |
| 设计基准 | iPhone 375×812px，移动端仿APP沉浸式体验 |

---

## 🚀 在线体验
**token有限，还请各位节省使用orz**

**[🔗 https://lt-ieng.github.io/cmbrace.github.io](https://lt-ieng.github.io/cmbrace.github.io)**

手机扫码即可体验（推荐移动端浏览器打开）：
<center>

![image.png](https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/项目002-qrcode_lt-ieng.cn.png)

</center>

> 📱 打开后经历：启动动画 → 6步教程 → 选择AI搭子 → 进入主页  
> 💡 点击「我的」→「加载测试数据」可快速体验完整功能

---

## 📂 项目结构

```
├── index.html              # 主页面（纯结构，无行内样式）
├── css/
│   └── style.css           # 全局样式（CSS变量主题系统）
├── js/
│   ├── config.js           # API配置（gitignored，部署时Actions注入）
│   ├── config.example.js   # 配置模板
│   ├── ai.js               # AI引擎模块（人设系统、API调用、上下文窗口）
│   └── app.js              # 业务逻辑（78个独立函数）
├── images/
│   ├── avatar-guyunsheng.png   # 顾云生头像
│   └── avatar-linkeke.png     # 林可可头像
├── test-data.json          # 测试数据集（1018条，2025.01-2026.05）
├── test_ai.html            # AI智能体评测页面
├── 产品文档.md              # 竞赛产品方案报告
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions部署流水线
└── .gitignore
```

---

## 🎭 AI人设系统

| 人设 | 姓名 | 性格 | 风格 |
|------|------|------|------|
| 🧊 | 顾云生 | 高冷男神 | 外冷内热，简洁有力，细节处流露关心 |
| 🍬 | 林可可 | 可爱甜妹 | 温柔元气，表情语气词，像朋友陪伴 |
| ✨ | 自定义 | 自定义 | 上传头像、设定姓名/人设/说话风格 |

人设切换后全局同步：AI对话、记账助手、底部气泡文案、设置页显示全部更新。

---

## 🧪 评测结果

打开 `test_ai.html` 可运行自动化评测，覆盖三个维度：

| 维度 | 指标 | 结果 |
|------|------|------|
| 🎯 意图识别 | 区分记账/非记账 | **15/15（100%）** |
| 💰 金额提取 | 金额识别正确率 | **10/10（100%）** |
| 🏷 分类识别 | 收支分类正确率 | **10/10（100%）** |
| 🎭 人设一致性 | 风格差异显著 | **通过** |
| 📋 功能完整性 | 核心功能可用 | **10/10项通过** |

---

## 🏃 本地运行

```bash
# 克隆仓库
git clone https://github.com/LT-IENG/cmbrace.github.io.git
cd cmbrace.github.io

# 配置API Key（本地开发）
cp js/config.example.js js/config.js
# 编辑 js/config.js，填入你的 DeepSeek API Key

# 启动本地服务器（任选一种）
npx serve .           # Node.js
python -m http.server # Python
# 或直接用浏览器打开 index.html
```

---

## 🔒 安全说明

- **API Key保护**：Key不存储在源码中，通过GitHub Actions Secrets注入
- **数据隐私**：所有账单数据仅存储在浏览器localStorage，不上传任何服务器
- **设备隔离**：不同设备数据天然隔离，无需账号登录

---

## 📝 竞赛信息

本项目参加**招商银行数字金融训练营 · AI产品经理赛道**，详见产品文档如下：
<center>

![image.png](https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/项目002-文档图片.png)


</center>

---

## 📄 License

MIT License
