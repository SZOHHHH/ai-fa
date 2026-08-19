---
type: paper
title: Parameter-Efficient Transfer Learning for NLP
aliases: [Adapter]
year: 2019
authors: [Neil Houlsby, Andrei Giurgiu, Stanislaw Jastrzebski, Bruna Morrone, et al.]
venue: ICML 2019
arxiv: "1902.00751"
line: 后处理与压缩
matrix_coords: [适配参数, 掩码/注入, 微调期]
tags: [paper]
---

# Adapter（PEFT 奠基）

## 1. 一句话贡献

冻结主干、每层插入小瓶颈模块——首次证明"只训 3.6% 参数"能匹配全参微调，开启 PEFT 时代。

## 2. 核心贡献

- **瓶颈结构**：$W_{\text{up}}\,\sigma(W_{\text{down}} x)$——先降维再升维（down-m 倍压缩）
- **串行插入**：每个 Transformer 块后挂两个（注意力后、FFN 后）
- 每任务一个 Adapter——**多任务即插即用**的原型

## 3. 方法概要

1. 冻结全部预训练权重
2. 每层插入瓶颈 Adapter（如 768→48→768）
3. 只训 Adapter 参数（~3.6%）
4. 切换任务 = 换 Adapter 插件

## 4. 核心公式

- 串行式见 [[30-Formulas/LoRA分解]] §2 Adapter 行（对照 LoRA 的旁路式）

## 5. 与前作的关系

- 前置于 [[10-Papers/03-后处理/Prefix-Tuning- Optimizing Continuous Prompts for Generation（Prefix-Tuning）]] 与 [[10-Papers/03-后处理/LoRA- Low-Rank Adaptation of Large Language Models（LoRA）]]——PEFT 谱系的起点
- 对比 prompt tuning 早期工作：位置更"深"（层内 vs 输入）

## 6. 影响与后续

- LoRA 论文的核心对照（推理零开销的动机）
- AdapterFusion/AdaFilter 等组合研究
- 多任务部署形态影响插件化架构思想

## 7. 读前须知

[[20-Algorithms/参数高效微调（PEFT）]]、[[30-Formulas/LoRA分解]]
