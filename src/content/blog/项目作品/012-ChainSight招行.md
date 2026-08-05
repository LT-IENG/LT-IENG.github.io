---
title: ChainSight-招行总行AI总决赛银奖TOP2作品
date: 2026-07-19
updated: 2026-07-19
section: 项目作品
tags: [AI, 业务落地]
cover: https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/%E9%A1%B9%E7%9B%AE%E4%BD%9C%E5%93%81/012-CMB%E5%86%B3%E8%B5%9B-%E5%B0%81%E9%9D%A2%E6%A6%82%E8%A7%88.png
hero: https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/%E9%A1%B9%E7%9B%AE%E4%BD%9C%E5%93%81/012-CMB%E5%86%B3%E8%B5%9B-%E5%B0%81%E9%9D%A2%E6%A6%82%E8%A7%88.png
featured: true
pinned: true
description: 一张图看产业、一套分数选企业、一份方案做经营，一款面向商业银行对公业务的产品级综合经营工作台。
---

# ChainSight 项目介绍文档

> **产品名称**：ChainSight（链视）  
> **产品定位**：一站式产业链经营工作台  
> **Slogan**：一链尽览，一站智营  
> **版本**：v1.0  
> **体验链接（建议使用VPN）**：https://chainsight-task3.vercel.app/
---

## 一、项目概述

ChainSight 是一款面向商业银行对公业务的产品级综合经营工作台。它以"**一张图看产业、一套分数选企业、一份方案做经营**"为核心理念，整合产业链分析、客户画像、授信评估、营销策略四大能力，嵌入支行客户经理日常作业流程，实现"**区域 + 行业**"双维度的精准对公经营。

项目构建了完整的产品闭环：**发现区域机会 → 识别利好政策 → 判断重点产业 → 筛选目标企业 → 诊断客户价值 → 生成营销策略**，并通过 AI 助手"小招"贯穿全系统，为每个视图提供一句话经营结论。

---

### 产品文档概览

<center>

![image.png](https://lt-ieng-1414173792.cos.ap-guangzhou.myqcloud.com/image/%E9%A1%B9%E7%9B%AE%E4%BD%9C%E5%93%81/012-CMB%E5%86%B3%E8%B5%9B-%E4%BA%A7%E5%93%81%E8%AF%B4%E6%98%8E.png)

</center>

---

---

## 二、项目背景与价值主张

### 2.1 行业痛点

综合支行（分行）客户经理团队面临三重经营压力：

| 痛点 | 表现 | 根因 |
|------|------|------|
| **判断难** | 依赖个人经验筛选目标客户，对区域产业布局缺乏全局认知 | 数据分散、缺乏系统性分析工具 |
| **信任难** | 分析结果无法解释、无法下钻，客户经理不敢用 | 模型黑箱、缺乏可解释性机制 |
| **推进难、复制难** | 专家经验沉淀在个人脑中，无法转化为系统化的经营动作 | 缺乏从洞察到行动的闭环 |

### 2.2 核心价值

- **可视化决策**：将产业冷热分布、企业分层、机会信号以地图热力图、散点图等形式直观呈现，降低认知负载；
- **可解释信任**：所有评分支持指标口径说明、原始指标下钻、正反证据对照、驱动因子贡献度分析，让客户经理敢用、敢信；
- **专家经验产品化**：将资深客户经理的拓客经验转化为结构化的"经营模式规则库"，通过触发/排除条件自动匹配商机并推荐行动方案。

---

## 三、产品功能概览

### 3.1 五大核心模块

```
ChainSight 一站式产业链经营工作台
├── AI 助手「小招」（贯穿全系统，每个视图提供一句话经营结论）
├── 视图 1：区域地图     —— 解决判断难
├── 视图 2：产业链洞察   —— 解决判断难 & 信任难
├── 视图 3：属地产业政策 —— 解决判断难 & 信任难
├── 视图 4：客户信息中心 —— 解决判断难 & 信任难
└── 视图 5：客户经理经营台 —— 解决推进难 & 复制难
```

### 3.2 各模块功能

**① 区域地图（核心界面）**
- 全国→省→市三级钻取地图，对应总行→省分行→市分行银行机构层级；
- 五大可视化图层（可叠加切换）：产业分布热力层、企业分层散点层、授信覆盖梯度层、客户机会信号层、政策覆盖高亮层；
- 开场三段式动画（轮廓生长→镜头推镜→散点点亮），总时长约 2.8 秒，可跳过；
- 94,368 家企业散点（来自真实企业数据），支持按行业着色、按规模分级；
- 本行客户高亮点位可点击直接跳转客户 360° 画像。

**② 产业链洞察**
- 产业链结构图谱（上中下游桑基图式流向图），标注关键节点与核心企业；
- 六维景气度分析（承接任务二），每个维度展示当前得分/等级/环比同比/12 月趋势/驱动因子/对上中下游差异化影响/对招行经营影响；
- 完整信任机制：指标口径说明、原始指标下钻、数据缺失提示、正反证据对照、模型与规则版本号、专家校正记录；
- 产业链机会诊断：高景气环节识别、供需缺口定位、审慎经营风险环节预警、机会卡片；
- 行内经营覆盖分析：链上企业总数、覆盖率、授信集中度、经营空白环节。

**③ 属地产业政策**
- 分产业、分层级（国家/省/市/区）、分日期的政策查询与筛选；
- 政企契合度排行榜（政策重点产业与行内存量客户自动匹配）；
- 重点政策专题卡片（"十五五"规划、地方产业规划、产业集群政策、产业扶持政策）；
- 政策详情含适用区域、有效期、受益企业名单、支持方式、银行可切入业务机会。

**④ 客户信息中心**
- 单客户 360° 全景画像，五段式结构：企业基本面、银企合作关系、经营与财务表现、产业链价值、授信辅助；
- 同行业/同规模企业对标；
- 产业链地位评分、上下游交易对手关系图谱、替代性与依赖关系分析；
- 授信辅助模块（承接任务一模型输出）：建议授信区间、模型置信度、支持/制约因素、同行业额度对标、风险提示；
- "仅供经营及贷前辅助参考"合规提示。

**⑤ 客户经理经营台**
- **拓客场景**：产业链推荐榜单 → 企业优先投入排序 → 单企业可行性判断，以触发条件与排除条件双栏结构呈现决策逻辑；
- **经营场景**：关键时间点自动匹配经营模式（中标→中标企业综合经营模式、贷款到期→续贷与资金沉淀模式、融资到账→结算账户拓展模式等）；
- **专家共创台**：低门槛规则配置工具，支持表单配置、自然语言描述 AI 生成规则草稿、历史数据回测、预览推荐结果、灰度发布、采纳率与转化率追踪。

### 3.3 AI 助手"小招"

一个 Agent 贯穿全系统，提供：
- 每个视图的一句话经营结论（预置模板 + LLM 在线增强）；
- 右侧常驻抽屉对话面板，支持追问与深度分析；
- 双模架构：离线环境下使用规则模板引擎（`RuleBasedAgent`），联网环境下接入 LLM（`deepseek-v4-flash`，通过 Vercel Serverless 代理保证 API Key 安全）。

---

## 四、技术架构

### 4.1 技术选型

| 层级 | 技术选型 | 版本 | 选型理由 |
|------|----------|------|----------|
| 构建工具 | Vite | ^5.x | 构建速度快，产物为纯静态文件 |
| 前端框架 | Vue 3（Composition API + `<script setup>`） | ^3.4 | 组件化开发、生态成熟 |
| 开发语言 | TypeScript | ^5.x | 数据契约即接口文档，类型安全 |
| 路由 | Vue Router（hash 模式） | ^4.x | 支持 `file://` 离线运行 |
| 状态管理 | Pinia | ^2.x | 跨视图共享地图层级/筛选上下文 |
| 图表/地图 | ECharts | ^5.5 | geo/scatter/lines/heatmap/effectScatter 全覆盖 |
| 动画引擎 | GSAP | ^3.12 | 开场动画时间轴、钻取补间过渡 |
| 样式方案 | Sass + CSS Variables | — | 主题 Token 化，换肤零改码 |
| 数据格式 | 静态 JSON（Python ETL 预生成） | — | 离线秒开、可替换为真实 API |

### 4.2 架构分层

```
┌────────────────────────── Views（5 界面）──────────────────────────┐
│  RegionMapView  IndustryView  PolicyView  CustomerView  Workspace  │
├────────────────────────── Modules ─────────────────────────────────┤
│  MapEngine/DrillController/Layers   Charts   AgentPanel            │
├────────────────────────── Stores (Pinia) ──────────────────────────┤
│  contextStore（银行层级/辖区/选中实体）  mapStore  agentStore        │
├────────────────────────── Services ────────────────────────────────┤
│  IDataService  ── impl: StaticDataService（JSON）/ HttpDataService  │
├────────────────────────── Data ────────────────────────────────────┤
│  public/data/*.json  ←  etl/*.py  ←  train/test CSV、4 个 XLSX     │
└─────────────────────────────────────────────────────────────────────┘
```

**核心设计原则**：
1. **视图不直接读数据**：一律经 `IDataService` 接口访问，换真实后端只需切换实现（DI 依赖注入模式）；
2. **跨视图联动经单一事实源**：`contextStore` 作为全局上下文，地图钻取 → `setRegion()` → 其余视图订阅刷新；
3. **配置/插件驱动**：图层、Agent、菜单全部可扩展，新增能力 = 新增文件 + 注册，不改主干逻辑。

### 4.3 目录结构

```
chainsight/
├── index.html                          # 入口 HTML
├── package.json / vite.config.ts       # 工程配置
├── 启动.bat                            # 一键本地启动脚本
├── public/
│   ├── assets/logo/                    # ChainSight 品牌图标
│   └── data/                           # ETL 预生成的静态数据
│       ├── geo/                        # 全国/省/市三级 GeoJSON（DataV GeoAtlas 源）
│       ├── map/                        # 地图业务数据（区域统计、企业散点）
│       ├── industry/                   # 产业链图谱、景气度、机会卡片
│       ├── policy/                     # 政策库
│       ├── customer/                   # 客户 360° 数据（分片存储，按需加载）
│       └── workspace/                  # 经营台规则与推荐
├── etl/                                # Python 数据管道（一次性跑，产物入 public/data）
│   ├── geo_fetch.py                    # DataV GeoAtlas 下载 + mapshaper 精简
│   ├── build_map_data.py              # train/test CSV → 区域统计 / 企业散点
│   ├── build_industry_data.py         # 产业链.xlsx + 结算链 → 图谱 JSON
│   ├── build_customer_data.py         # 企业财报.xlsx → 客户 360° JSON
│   ├── build_policy_workspace.py      # Mock 政策库 / 经营台规则生成
│   └── ...
└── src/                                # 前端源码
    ├── main.ts / App.vue               # 应用入口
    ├── types/                          # 领域模型 TypeScript 类型定义
    │   └── index.ts                    # 地图/行业/政策/客户/经营台全部数据契约
    ├── theme/
    │   ├── tokens.scss                 # 设计 Token（CSS Variables）
    │   └── map-dark.ts                 # ECharts 地图深色主题
    ├── router/index.ts                 # Hash 路由（5 视图）
    ├── stores/
    │   ├── contextStore.ts             # 全局上下文（银行层级/辖区/选中实体）
    │   ├── mapStore.ts                 # 地图钻取栈、图层开关
    │   └── agentStore.ts               # 小招面板状态
    ├── layout/
    │   ├── AppShell.vue                # 全局布局（左菜单 + 顶栏 + 内容区 + 小招抽屉）
    │   ├── SideMenu.vue                # 配置驱动菜单栏
    │   ├── TopBar.vue                  # 面包屑导航 + 数据时间
    │   ├── AgentPanel.vue              # 小招常驻抽屉对话面板
    │   ├── SplashScreen.vue            # 启动闪屏
    │   ├── RoleSelect.vue              # 角色选择（总行/分行/支行）
    │   └── OnboardingTour.vue          # 首次访问操作引导（聚光灯遮罩）
    ├── views/                          # 五大界面（路由级懒加载）
    │   ├── map/RegionMapView.vue       # 区域地图视图
    │   ├── industry/IndustryView.vue   # 产业链洞察视图
    │   ├── policy/PolicyView.vue       # 属地产业政策视图
    │   ├── customer/CustomerView.vue   # 客户信息中心视图
    │   └── workspace/WorkspaceView.vue # 客户经理经营台视图
    ├── modules/
    │   ├── geo/                        # 地图引擎（核心模块）
    │   │   ├── MapEngine.ts            # ECharts geo 封装
    │   │   ├── DrillController.ts      # 三级钻取状态机
    │   │   ├── GeoLoader.ts            # GeoJSON 注册/缓存/归一化
    │   │   ├── IntroAnimator.ts        # 开场动画（GSAP Timeline）
    │   │   └── layers.ts               # 五大业务图层实现
    │   ├── charts/                     # 通用图表组件
    │   │   ├── echarts.ts              # ECharts 按需引入封装
    │   │   ├── UiKit.vue               # 卡片/面板/KPI 数字等通用 UI 组件
    │   │   └── RelationGraph.vue       # 股权/交易对手关系图谱
    │   └── agent/
    │       ├── IAgentProvider.ts       # Agent 抽象接口
    │       ├── RuleBasedAgent.ts       # 规则模板引擎（离线降级方案）
    │       └── LlmAgent.ts             # LLM 在线接入（deepseek-v4-flash）
    ├── services/                       # 数据访问层
    │   ├── IDataService.ts             # 统一数据接口
    │   └── impl/
    │       ├── StaticDataService.ts    # 静态 JSON 实现（当前）
    │       └── HttpDataService.ts      # HTTP API 实现（预留，改配置即切换）
    └── utils/
        ├── adcode.ts                   # 行政区划编码映射 + 名称归一化
        ├── format.ts                   # 金额/百分比/大数格式化
        └── relation.ts                 # 交易对手关系数据处理
```

---

## 五、核心技术方案

### 5.1 地图引擎（三级钻取）

地图引擎是本项目最核心的技术模块，基于 ECharts 的 `geo`/`map` 组件实现全国→省→市三级钻取：

```
DrillController（状态机）
    │
    ├── GeoLoader（GeoJSON 注册/缓存/LRU）
    │       └── 数据源：DataV GeoAtlas → mapshaper 简化 → 按层级懒加载
    │
    ├── MapEngine（ECharts 实例管理、series 组装、resize/dispose）
    │       └── 接收 MapRenderInput（adcode + stats + points + layerVisibility）
    │
    ├── IntroAnimator（GSAP Timeline：轮廓生长→推镜→点亮，2800ms，可跳过）
    │
    └── Layers（五大业务图层，实现统一接口 IMapLayer）
            ├── IndustryHeatLayer    → 区域热力填色
            ├── EnterpriseLayer      → 五层分色涟漪散点
            ├── CreditCoverLayer     → 授信覆盖率梯度 + 本行客户高亮点位
            ├── OpportunityLayer     → 11 类机会信号闪烁标记
            └── PolicyLayer          → 区域政策角标计数
```

**钻取交互流程**：
1. 点击省份/城市区域 → 地图平滑缩放过渡（GSAP 补间动画）→ 加载下级 GeoJSON → 面包屑更新（总行→省分行→市分行）；
2. 点击面包屑或返回按钮 → 地图缩小回退，层级栈 pop；
3. 直辖市（北京/上海/天津/重庆）省级即市级，跳过中间层级。

### 5.2 数据管道（ETL）

Python ETL 管道负责将原始数据（CSV/XLSX）加工为前端可直接消费的静态 JSON：

| 脚本 | 输入 | 输出 | 核心处理 |
|------|------|------|----------|
| `geo_fetch.py` | DataV GeoAtlas | `public/data/geo/**` | 下载三级 GeoJSON → mapshaper 简化顶点（全国 8%、省 12%、市 20%）→ 面积/质心计算 |
| `build_map_data.py` | train/test CSV、企业财报.xlsx | `region-stats.json`、`city-points/{adcode}.json` | 省市名归一化；企业分层打分（实收资本+健康分+交易规模加权→五层）；市内确定性伪随机环形散布；信号位掩码推导 |
| `build_industry_data.py` | 产业链.xlsx、结算链 1/2 | `industry/*.json` | 节点聚合、上中下游布局坐标计算、结算链聚合为图谱边权重 |
| `build_customer_data.py` | 企业财报.xlsx、结算链 | `customer/*.json` | 分片输出（每 500 户一片，按需加载）、脱敏命名 |
| `build_policy_workspace.py` | 规则配置 | 政策库、景气度序列、机会事件流 | 种子固定的确定性 Mock 生成，补真实数据后直接替换同名 JSON |

**数据规模**：
- 企业散点：94,368 家（来自 train/test 数据集）
- 地理覆盖：33 个省级行政区、336 个城市
- 产业链节点：来自真实产业链 Excel 表（含 1-5 级节点、上中下游属性、分值）

### 5.3 全局联动机制

所有视图通过 Pinia 的 `contextStore` 实现跨视图联动：

```
用户在地图点击"深圳市"
  → contextStore.setRegion('city', '440300', '深圳市')
  → contextStore.bankName = '招商银行深圳分行'
  → contextStore.path = [全国, 广东省, 深圳市]
  → 所有订阅 contextStore 的视图自动刷新：
      ├── IndustryView：过滤为深圳辖区的产业链数据
      ├── PolicyView：过滤为深圳市相关政策
      ├── CustomerView：过滤为深圳辖区客户
      ├── WorkspaceView：推荐深圳辖区的经营机会
      └── TopBar：面包屑同步更新
```

### 5.4 AI Agent 双模架构

```
IAgentProvider（抽象接口）
    ├── summarize(view, ctx) → AgentSummary   // 一句话经营结论
    └── ask(question, ctx) → string           // 对话追问

    实现 1：RuleBasedAgent（离线）
        └── 预置规则模板，填充真实统计值 → 确定性输出

    实现 2：LlmAgent（在线）
        └── deepseek-v4-flash（OpenAI 兼容网关）
        └── 密钥安全：API Key 仅存于 Vercel 环境变量
        └── 前端请求走同源 /api/chat（Serverless 代理）
        └── 本地/降级时自动切回 RuleBasedAgent
```

### 5.5 可解释性信任机制

为避免景气度成为"无法解释的综合分"，系统在每个评分维度内置完整的可解释性链路：

- **指标口径说明**：hover 或点击查看每项指标的定义与计算方式；
- **原始指标下钻**：从综合分下钻到子指标、再到原始数据；
- **正反证据对照**：同时展示支持因素与制约因素，避免选择性呈现；
- **驱动因子贡献度**：条形图可视化各因子对得分的边际贡献；
- **模型版本追踪**：记录模型与规则版本号、专家校正记录；
- **历史回测**：展示历史预测准确性与回测结果。

---

## 六、数据流与接口设计

### 6.1 数据流向

```
原始数据（CSV + XLSX）
  → Python ETL（清洗/聚合/打分/生成）
    → 静态 JSON（public/data/）
      → StaticDataService（import 静态导入）
        → Pinia Store（状态管理）
          → Vue Component（响应式渲染）
            → ECharts / GSAP（可视化呈现）
```

### 6.2 接口预留（扩展点）

- **IDataService**：当前实现为 `StaticDataService`（读本地 JSON），已预留 `HttpDataService` 实现，后端就绪后改 DI 绑定即可切换，视图层零改动；
- **IAgentProvider**：当前实现为 `RuleBasedAgent`（规则模板），已接入 `LlmAgent`（deepseek-v4-flash），通过环境变量控制启用/降级；
- **IMapLayer**：地图图层插件化，新增图层只需实现该接口并注册，引擎不改动；
- **BizRule 专家规则**：经营台规则采用结构化数据模型（触发条件 + 排除条件 + 输出模板），支持通过表单配置、AI 辅助生成、历史数据回测。

---

## 七、视觉设计体系

### 7.1 设计风格

- **融合方案**：浅色工作台（米白底 `#F7F8FA` + 白卡片）叠加深色地图画布（深蓝黑 `#0E1A2B`），形成强烈的全屏视觉焦点；
- **品牌主色**：招商银行品牌红 `#E60012`，贯穿导航高亮、主按钮、热力梯度高端；
- **色彩语义体系**：

| 语义 | 色值 | 用途 |
|------|------|------|
| 品牌/热力/风险 | `#E60012` → `#7A0E1E` | 导航高亮、热力图高端、风险标记 |
| 机会/信号 | `#F5A623`（金） | 机会信号闪烁标记 |
| 覆盖/正向 | `#13B5B1`（青） | 授信覆盖、积极趋势 |
| 空白/边缘 | `#9AA3AF`（灰） | 未覆盖区域、边缘企业 |

### 7.2 设计 Token 系统

通过 CSS Variables 实现主题 Token 化，核心变量包括：品牌色、文字色、背景色、热力梯度色、金色/青色/灰色语义色、卡片圆角（12px）、阴影、数字专用等宽字体（DIN Alternate / Roboto Mono）。换肤仅需修改 `tokens.scss` 中的变量值。

---

## 八、交付与部署

### 8.1 交付形式

- **标准包**：`第X组_任务3_客户营销综合看板.zip`，解压后双击 `启动.bat` 一键起本地静态服务，浏览器访问 `http://localhost:8080/#/map`；
- **运行环境**：本地浏览器（`file://` 协议兜底为 `http://localhost`），全离线可运行；GeoJSON 与业务 JSON 默认打进构建产物；
- **联网增强**（可选）：高德/天地图底图、在线字体 CDN 通过 `config.mapProvider` 开关控制，默认关闭保稳定性。

### 8.2 构建配置

- `vite.config.ts`：`base: './'` 保证相对路径，hash 路由保证离线可用；
- 构建产物 `dist/` 为纯静态文件，可部署到任意静态服务器（Nginx / Vercel / GitHub Pages）；
- 已配置 Vercel Serverless 部署（`api/chat.ts` 代理 LLM 请求，保护 API Key）。

---

## 九、性能与质量策略

- **GeoJSON 体积控制**：总地图数据 ≤ 8MB，首屏仅加载全国 + 当前省，LRU 缓存 ≤ 10 区域；
- **大量散点优化**：单市企业 > 5000 家时启用 ECharts `large: true` 模式，关闭涟漪动画；
- **路由级懒加载**：所有视图组件使用 `defineAsyncComponent` + 动态 `import()`，首屏仅加载地图视图；
- **ECharts 按需引入**：仅引入 `echarts/core` + 必要的 chart/component，减少 bundle 体积；
- **动画性能**：GSAP 动画恒 60fps（仅使用 `transform` 和 `opacity`），支持 `prefers-reduced-motion` 降级。

---

## 十、数据来源与整合

| 数据文件 | 行/规模 | 核心字段 | 用途 |
|----------|---------|----------|------|
| `train_clean_raw.csv` | 76,958 行 × 55 列 | 客户号、行业分类、注册地、实收资本、健康分、交易/财务指标 | 地图企业散点、热力、分层统计 |
| `test_clean_raw.csv` | 19,240 行 × 54 列 | 同上（无 label） | 地图企业散点（补充） |
| `产业链.xlsx` | 产业链节点表 | 节点代码/名称、1-5 级层级、上中下游、客户UID、分值 | 产业链图谱、企业分层 |
| `企业财报.xlsx` | 企业财务 360° | 客户UID、注册地址、三大报表、经营状态、规模 | 客户视图基本面、财务数据 |
| `结算链1.xlsx` / `结算链2.xlsx` | 交易对手网络 | 客户UID↔对手UID、入出账、金额区间 | 图谱边权重、客户上下游关系 |

---

## 十一、总结

ChainSight 是一个面向银行对公业务场景的完整产品级解决方案，具备以下突出特点：

1. **产品思维驱动**：从真实业务痛点出发，设计了覆盖"发现→判断→执行→反馈"全流程的产品闭环；
2. **技术扎实**：Vue 3 + TypeScript + ECharts + GSAP 技术栈，分层清晰、接口规范、可扩展性强；
3. **数据工程完备**：Python ETL 管道将原始 CSV/XLSX 加工为结构化 JSON，数据血缘可追溯；
4. **注重体验**：开场动画、钻取过渡、全局联动、可解释性交互、降级方案等细节打磨到位；
5. **面向真实落地**：接口预留后端切换、Agent 双模架构、专家共创台等设计均考虑了真实业务落地的完整链路。
