---
title: AI智能广告助手AdFlow-腾讯AI产品创意比赛
date: 2026-05-09
updated: 2026-05-09
section: 项目作品
tags: [个人项目, AIGC, 多模态, AI]
cover: https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/adflow封面图片.png
hero: https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/adflow封面图片.png
featured: false
pinned: false
description: 从零搭建 AI 原生广告引擎 AdFlow，多模态内容生成与智能投放。
---
---



# AdFlow - AI 原生广告引擎

**让广告自然融入，让观影不再被打断。**

AdFlow 是一款基于多模态 AI 的视频广告无缝植入引擎，致力于**重塑视频广告体验**。  
它能自动分析剧情节奏、识别最佳广告插入帧，并利用生成式 AI 创造出“剧情穿越”式的 3 秒转场视频，让广告与正片自然衔接，让用户觉得广告是内容的延续而非打扰。

> 本项目为 **腾讯PCG · 校园AI产品创意大赛** 参赛作品，旨在用 AI 改造腾讯视频广告，实现 **用户 · 平台 · 广告主三方共赢**。

项目地址：https://github.com/LT-IENG/AdFlow

演示视频（产品演示文档见文章末尾）：
<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 20px;">
  <iframe 
    src="//player.bilibili.com/player.html?isOutside=true&aid=116871764383482&bvid=BV1yfTQ6uEwk&cid=39697252453&p=1&as_wide=1"
    scrolling="no" 
    border="0" 
    frameborder="no" 
    framespacing="0" 
    allowfullscreen="true"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
  </iframe>
</div>


**一点题外话：** 这算是博主第一次参加AI产品的相关比赛，也给了我很多经验：产品不光看技术实现，更看业务理解、美观程度，以及产品体验的方便性。

---

## 为什么需要 AdFlow？

- **用户** 讨厌生硬打断剧情的广告，渴望流畅的观看体验。  
- **广告主** 希望广告被真正“看见”而非被跳过。  
- **平台** 需要平衡收入与用户留存。

AdFlow 通过 AI 找到剧情中的“低干扰窗口”，并生成一段与正片角色、场景风格一致的**原生转场视频**，让广告从“入侵者”变成“彩蛋”，让曝光更有价值。

---

## 核心功能

| 功能 | 描述 |
|------|------|
| 🧠 **AI 剧情分析** | 利用多模态大模型（Gemini 2.5 Pro）分析完整视频，自动推荐 **10 - 15个适合插入广告的帧**（转场、空镜、情绪低点等），精确到 0.1 秒，并附带中文画面理由。 |
| ✂️ **双模式分析** | 提供「完整视频分析」和「抽帧分析」两种模式，兼顾长视频的效率与准确性。 |
| 🎞️ **AI 转场生成** | 提取原视频插入点画面与广告首帧，调用 Vidu 首尾帧生视频模型，生成 **3 秒电影级转场动画**，平滑过渡到广告。 |
| 🖥️ **直观交互界面** | 2×2 四象限布局，播放原视频、查看推荐帧、手动微调插入时间、预览生成效果。 |
| 📊 **前后对比** | 自动合成“无转场”与“有 AI 转场”两段视频，左右同屏对比，效果一目了然。 |
| ⚙️ **灵活配置** | 支持视频压缩、长视频分割、自定义插入时间，适配不同网络环境和视频长度。 |
| 🔗 **端到端生成** | 一键完成分析、关键帧上传 COS、转场生成、下载与合成，无需手动搬运文件。 |

---

## 三方价值

- **用户**：广告融入剧情，减少打断感，甚至觉得“彩蛋”有趣，告别生硬跳过。  
- **广告主**：广告出现在观众注意力集中的“微停顿”时刻，且通过剧情化转场提升品牌好感与完播率。  
- **平台**：维持甚至提升广告收入的同时，提高用户满意度与留存，开辟新的广告位形态。

---

## 技术栈

- **UI**：PySide6 (Qt for Python)
- **视频处理**：OpenCV, MoviePy, FFmpeg
- **AI 接口**：通过向量引擎调用 Gemini 2.5 Pro (多模态分析) 和 Vidu (首尾帧生视频)
- **对象存储**：腾讯云 COS (存储关键帧与广告首帧)
- **多线程**：PySide6 QThread，避免界面冻结，支持任务取消

---

## 快速开始

### 1. 环境准备

- Python 3.10+
- FFmpeg (需添加到系统 PATH 或放置于 exe 同目录)
- 腾讯云 COS 存储桶 (用于临时图片上传)
- 有效的向量引擎 API Key (支持 Gemini 和 Vidu 模型)

### 2. 安装依赖

```bash
pip install -r requirements.txt
```

### 3. 配置文件

在项目根目录新建 `config.json`，参考以下模板并填入你的密钥：

```json
{
  "base_url": "https://api.vectorengine.ai",
  "api_key": "你的向量引擎API Key",
  "multimodal_model": "gemini-2.5-pro",
  "video_model": "viduq3-pro",
  "cos": {
    "secret_id": "你的COS SecretId",
    "secret_key": "你的COS SecretKey",
    "region": "ap-guangzhou",
    "bucket": "你的存储桶名"
  }
}
```

> ⚠️ 请勿将真实密钥上传至公开仓库。建议使用 `config.example.json` 作为模板提交。

### 4. 运行

```bash
python main.py
```

程序将打开图形界面，您可以开始体验完整流程。

---

## 使用教程

1. **加载视频**  
   点击「选择视频文件」上传一个 10 分钟以内的 MP4 原视频（支持更长，建议勾选压缩与分割）。

2. **AI 分析**  
   点击「完整视频分析」或「抽帧分析」，等待进度条完成。分析完成后右侧表格会显示 **10 个推荐插入帧**，包含时间点、适合度和画面理由。

3. **选择插入点**  
   点击表格中的任意行，左侧播放器会自动跳转至对应帧。您也可以在板块三手动输入时间（秒），点击「检查时间点」跳转，确认后点击「✅ 确认此插入点」。

4. **上传广告**  
   点击「选择广告视频」加载您的广告素材，AI 会自动提取广告首帧作为转场的终点画面。

5. **生成转场**  
   （可选）在「广告描述」框中输入广告特征（如“科技感轿车”），点击「🎥 生成 AI 转场」，程序将自动上传关键帧到 COS、调用 Vidu 生成 3 秒转场视频，并下载合成对比视频。

6. **查看效果**  
   生成完毕后，左右两个播放器分别显示“无转场”和“有 AI 转场”的完整片段，直观对比广告融入效果。您也可以点击「🌐 打开原始转场视频」在浏览器中单独查看转场动画。

---

## 项目结构

```
AdFlow/
├── main.py                 # 程序入口
├── ui_main_window.py       # 主窗口与 UI 逻辑
├── tencent_ai.py           # AI 服务封装 (Gemini/Vidu API)
├── worker_threads.py       # 后台分析线程
├── generation_worker.py    # 转场生成与任务轮询
├── video_player.py         # OpenCV 视频播放器控件
├── video_utils.py          # 视频压缩、分割工具
├── video_compositor.py     # 对比视频合成 (MoviePy)
├── cos_uploader.py         # 腾讯云 COS 上传
├── assets/                 # 图标等资源
├── config.example.json     # 配置文件模板
├── requirements.txt        # Python 依赖
└── README.md
```

---

## 常见问题

**Q: 完整分析返回的理由与画面不符？**  
A: 长视频直接分析可能产生时间偏差，建议使用「抽帧分析」模式，或勾选「压缩」降低视频复杂度以提高准确度。

**Q: 转场视频生成失败？**  
A: 请确认向量引擎账户余额充足，COS 图片为公开可读，config.json 中模型名正确（如 `viduq3-pro`）。

**Q: 能否不依赖 COS？**  
A: 当前首尾帧必须使用可公网访问的图片 URL。您可以替换为其他图床服务，修改 `cos_uploader.py` 即可。

**Q: 打包成 exe 后无法运行？**  
A: 确保 `ffmpeg.exe` 与程序在同一目录。可使用 `pyinstaller main.spec` 自行打包。

---

## 致谢

- 腾讯PCG · 校园AI产品创意大赛出题方
- 向量引擎 & Vidu 提供 AI 模型能力
- PySide6 社区

---

**AdFlow** —— 重新定义广告与内容的关系，让每一次广告都值得等待。

---

## 致谢

- 腾讯PCG · 校园AI产品创意大赛出题方
- 向量引擎 & Vidu 提供 AI 模型能力
- PySide6 社区

---

## 产品文档概览

<center>

![image.png](https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/adflow文档图片.png)

</center>

---

