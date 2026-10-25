---
type: algo
aliases: [PEFT, 参数高效微调, Parameter-Efficient Fine-Tuning, 适配器]
line: 后处理与压缩
tags: [algo]
---

# 参数高效微调 PEFT

## 1. 定义

**非数学语言**：大模型全参数微调要动几十亿参数（显存爆炸）。PEFT 的思路：**冻结大模型，只训练一小撮新参数**——0.1%–1% 的参数达到接近全参的效果。

**数学语言**：$$h = W_0 x + \Delta\Phi(x)$$，仅 $$\Delta\Phi$$ 可训——三种挂载位置：串行层、输入侧、权重旁路（见下）。

## 2. 本命论文群（按挂载位置三分）

| 论文 | 挂载位置 | 引入/发展了什么 | 年份 |
|---|---|---|---|
| [Parameter-Efficient Transfer Learning for NLP](/ai-fa/explore/10-Papers/03-后处理/Parameter-Efficient Transfer Learning for NLP（Adapter）) | 串行瓶颈层 | Adapter 奠基 | 2019 |
| [Prefix-Tuning - Optimizing Continuous Prompts for Generation](/ai-fa/explore/10-Papers/03-后处理/Prefix-Tuning- Optimizing Continuous Prompts for Generation（Prefix-Tuning）) | 注意力输入侧 KV 前缀 | 连续提示 | 2021 |
| [LoRA - Low-Rank Adaptation of Large Language Models](/ai-fa/explore/10-Papers/03-后处理/LoRA- Low-Rank Adaptation of Large Language Models（LoRA）) | 权重旁路（低秩） | 推理零开销——事实标准 | 2021 |
| [QLoRA - Efficient Finetuning of Quantized LLMs](/ai-fa/explore/10-Papers/03-后处理/QLoRA- Efficient Finetuning of Quantized LLMs（QLoRA）) | 量化基座+LoRA | 4bit 存 + 16bit 算 | 2023 |
| [DoRA - Weight-Decomposed Low-Rank Adaptation](/ai-fa/explore/10-Papers/03-后处理/DoRA- Weight-Decomposed Low-Rank Adaptation（DoRA）) | 幅度/方向分解 | 逼近全参质量 | 2024 |

**演进主轴**：挂载位置从"显眼"（串行 Adapter）到"隐蔽"（权重旁路）再到"极限"（量化基座）——**推理开销逐代归零、显存逐代压低**。

## 3. 核心公式

- [LoRA分解](/ai-fa/explore/30-Formulas/LoRA分解) —— 家族灵魂 $$W' = W_0 + \frac{\alpha}{r}BA$$
- [量化误差与异常值](/ai-fa/explore/30-Formulas/量化误差与异常值)（QLoRA 的 NF4 部分）

## 教程：LoRA 的一轮手算（0.1% 参数的账单）

**第 1 步：冻结与旁路。** 原权重 $$W \in \mathbb{R}^{512\times512}$$（26 万参数）冻结；旁路 $$\Delta W = BA$$，$$B \in \mathbb{R}^{512\times r},\ A \in \mathbb{R}^{r\times 512}$$，秩 $$r = 2$$：**可训练参数 = 2×512×2 = 2048（0.8%）**——前向变 $$y = Wx + BAx$$。

**第 2 步：一次前向（标量玩具）。** 输入 $$x = (1, 0)$$；$$A = \begin{pmatrix}1 & 0\\ 0 & 1\end{pmatrix}$$（r=2 取两行原维度）、$$B = (0.5,\ -0.3)^\top$$：$$Ax = (1, 0)^\top$$；$$BAx = (0.5, -0.3)^\top$$——**旁路输出只占 2 维子空间**（秩 2 的几何含义：增量被约束在低维平面上）。

**第 3 步：训练账单。** 7B 模型全参微调：可训练 7B、优化器状态（Adam 的 m/v）再 ×3 = 显存 28GB 级；LoRA r=16：可训练 ~0.1%、无优化器大头——**单卡微调大模型从不可能变日常**；多个 LoRA 可热插拔共享同一底座（A/B 测试、多任务一副权重）。

**第 4 步：为什么低秩够。** 微调的权重变化 $$\Delta W$$ 本身低秩（任务只要求在少数方向上调整——[低秩分解](/ai-fa/explore/40-Concepts/低秩分解) 的实证面）；与 MLA 的低秩压缩（[MLA多头潜在注意力](/ai-fa/explore/30-Formulas/MLA多头潜在注意力)）同一数学两用：**LoRA 用低秩"增"、MLA 用低秩"减"**。

**第 5 步：家族速览。** Adapter（串行小层，推理多一次前向）/ Prefix tuning（软提示）/ LoRA（并行旁路，可合并 $$W' = W+BA$$ 后零开销）——LoRA 胜在**可合并**：部署时把旁路并回权重，结构不变。

## 4. 数学概念分解

[低秩分解](/ai-fa/explore/40-Concepts/低秩分解)（LoRA/DoRA）、[量化](/ai-fa/explore/40-Concepts/量化)（QLoRA）、[注意力机制](/ai-fa/explore/40-Concepts/注意力机制)（Prefix-Tuning 的作用处）、[重参数化](/ai-fa/explore/40-Concepts/重参数化)（离散选择的直通亲戚）

## 5. 变体与演进

| 变体 | 相比 LoRA 改了什么 | 代表 |
|---|---|---|
| AdaLoRA | 秩 r 按层动态分配 | 2023 |
| DoRA | 权重分解幅度+方向 | [DoRA - Weight-Decomposed Low-Rank Adaptation](/ai-fa/explore/10-Papers/03-后处理/DoRA- Weight-Decomposed Low-Rank Adaptation（DoRA）) |
| LoRA+ | A/B 学习率解耦 | 2024 |
| rsLoRA | α/r 改 α/√r | 2024 |
| MoE-LoRA | 多 LoRA 专家混合 | 2024–25 |

## 6. 对比表

| 方法 | 可训参数 | 推理开销 | 质量 | 换任务 |
|---|---|---|---|---|
| 全参微调 | 100% | — | 上限 | 重新训 |
| Adapter | ~1–5% | 串行额外层 | 中 | 换插件 |
| Prefix-Tuning | <1% | 占用上下文长度 | 中下 | 换前缀 |
| **LoRA** | ~0.1–1% | **零**（可合并） | 接近全参 | 换 BA |
| QLoRA | 同 LoRA | 零（基座量化） | 同 LoRA | 换 BA |

**工业地位**：定制化时代的基础设施——一个基座 + 万个 LoRA（任务即插即用、存储 KB 级）。

## 自测

1. LoRA r=2 时 512×512 权重的旁路参数？（2×512×2 = 2048（0.8%））
2. 秩 r 的几何含义？（增量约束在 r 维子空间——$$\Delta W$$ 低秩假设）
3. LoRA 为什么胜过 Adapter/Prefix？（可合并（$$W'=W+BA$$）——部署零开销热插拔）
4. LoRA 与 MLA 的低秩两用？（LoRA 用低秩增（$$\Delta W$$）、MLA 用低秩减（压缩 KV））
