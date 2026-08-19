---
type: algo
aliases: [PEFT, 参数高效微调, Parameter-Efficient Fine-Tuning, 适配器]
line: 后处理与压缩
tags: [algo]
---

# 参数高效微调 PEFT

## 1. 定义

**非数学语言**：大模型全参数微调要动几十亿参数（显存爆炸）。PEFT 的思路：**冻结大模型，只训练一小撮新参数**——0.1%–1% 的参数达到接近全参的效果。

**数学语言**：$h = W_0 x + \Delta\Phi(x)$，仅 $\Delta\Phi$ 可训——三种挂载位置：串行层、输入侧、权重旁路（见下）。

## 2. 本命论文群（按挂载位置三分）

| 论文 | 挂载位置 | 引入/发展了什么 | 年份 |
|---|---|---|---|
| [[10-Papers/03-后处理/Parameter-Efficient Transfer Learning for NLP（Adapter）]] | 串行瓶颈层 | Adapter 奠基 | 2019 |
| [[10-Papers/03-后处理/Prefix-Tuning- Optimizing Continuous Prompts for Generation（Prefix-Tuning）]] | 注意力输入侧 KV 前缀 | 连续提示 | 2021 |
| [[10-Papers/03-后处理/LoRA- Low-Rank Adaptation of Large Language Models（LoRA）]] | 权重旁路（低秩） | 推理零开销——事实标准 | 2021 |
| [[10-Papers/03-后处理/QLoRA- Efficient Finetuning of Quantized LLMs（QLoRA）]] | 量化基座+LoRA | 4bit 存 + 16bit 算 | 2023 |
| [[10-Papers/03-后处理/DoRA- Weight-Decomposed Low-Rank Adaptation（DoRA）]] | 幅度/方向分解 | 逼近全参质量 | 2024 |

**演进主轴**：挂载位置从"显眼"（串行 Adapter）到"隐蔽"（权重旁路）再到"极限"（量化基座）——**推理开销逐代归零、显存逐代压低**。

## 3. 核心公式

- [[30-Formulas/LoRA分解]] —— 家族灵魂 $W' = W_0 + \frac{\alpha}{r}BA$
- [[30-Formulas/量化误差与异常值]]（QLoRA 的 NF4 部分）

## 4. 数学概念分解

[[40-Concepts/低秩分解]]（LoRA/DoRA）、[[40-Concepts/量化]]（QLoRA）、[[40-Concepts/注意力机制]]（Prefix-Tuning 的作用处）、[[40-Concepts/重参数化]]（离散选择的直通亲戚）

## 5. 变体与演进

| 变体 | 相比 LoRA 改了什么 | 代表 |
|---|---|---|
| AdaLoRA | 秩 r 按层动态分配 | 2023 |
| DoRA | 权重分解幅度+方向 | [[10-Papers/03-后处理/DoRA- Weight-Decomposed Low-Rank Adaptation（DoRA）]] |
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
