---
type: paper
title: Griffin- Mixing Gated Linear Recurrences with Local Attention for Efficient Language Models
aliases: [Griffin]
year: 2024
authors: [De et al. (DeepMind)]
venue: ICML 2024
arxiv: "2402.19427"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [混合, —, 混合状态]
tags: [paper]
---

# Griffin

## 1. 一句话贡献

RGRU（门控线性递归）+局部注意力的混合堆叠：证明混合配方对"门控"形式不敏感（Mamba/DeltaNet 之外的第三种线性层也行）。

## 2. 核心贡献

1. 线性递归层（RGRU）承担序列混合主体，局部注意力保精确检索

## 3. 方法概要

线性递归层（RGRU）承担序列混合主体，局部注意力保精确检索；全局注意力都不用。
## 4. 核心公式


$$
h_t = \mathrm{gate}(x_t)\odot h_{t-1} + (1-\mathrm{gate})\,\phi(x_t)\ \text{+局部 attn 交错}
$$


**直觉**：≡ [[Jamba- A Hybrid Transformer-Mamba Language Model（Jamba）|Jamba]]/Qwen3-Next（同代混合但线性层不同）——架构矩阵混合行的第三个证据；混合配方"什么线性层都行，关键是局部精确性"的结论

## 5. 与前作/矩阵关系

混合架构结论的稳健性检验（DeepMind 系）

## 6. 影响后续

需要：门控线性递归与 Mamba 的差异（显式递归 vs 选择性扫描）

## 7. 读前须知

undefined

> 近邻同族：[[A Systematic Analysis of Hybrid Linear Attention（混合线性分析）]] · [[Jamba- A Hybrid Transformer-Mamba Language Model（Jamba）]]

> 数学根基：[[状态空间模型方程]] · [[选择机制]] · [[稀疏与线性注意力]]
