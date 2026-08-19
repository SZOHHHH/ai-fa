---
type: paper
title: Rethinking Attention with Performers
aliases: [Performer, FAVOR+]
year: 2020
authors: [Krzysztof Choromanski, Valerii Likhoshterov, David Dohan, et al.]
venue: ICLR 2021
arxiv: "2009.14794"
line: 长上下文
matrix_coords: [稀疏注意力, 注意力结构层, 核近似]
tags: [paper]
---

# Performer（线性注意力）

## 1. 一句话贡献

用随机特征近似 softmax 核、改变乘法结合律——注意力复杂度从 $O(n^2)$ 降到 $O(n)$，无需稀疏化。

## 2. 核心贡献

- **FAVOR+**：$\mathrm{softmax}(q^\top k/\sqrt d) \approx \mathbb{E}_\omega[\phi(q)^\top \phi(k)]$（$\phi$ = 正随机特征）
- **结合律换序**：$(QK^\top)V \approx Q' (K'^\top V)$——$n\times n$ 矩阵从不出现
- 无偏估计 + 快速正交化降方差

## 3. 方法概要

1. softmax 核可表示为期望：$e^{q^\top k} = \mathbb{E}[e^{\omega^\top q}e^{\omega^\top k}]$（$\omega\sim$ 特定分布）
2. 采 m 个随机向量构造 $\phi(\cdot) \in \mathbb{R}^m$
3. 算 $K'^\top V$（$m \times d$ 小矩阵）再左乘 $Q'$
4. 可即插即用替换标准注意力

## 4. 核心公式

- [[40-Concepts/稀疏与线性注意力]] 核近似家族行

## 5. 与前作的关系

- 对照 [[10-Papers/06-长上下文/Big Bird- Transformers for Longer Sequences（BigBird）]]：稀疏（跳过计算）vs 核近似（改写数学）
- 精神前辈：随机傅里叶特征（RFF，核方法加速 2007）

## 6. 影响与后续

- 线性注意力家族起点 → 后与 SSM 统一（[[30-Formulas/状态空间模型方程]] SSD 对偶）
- 工程上被 FlashAttention（精确）部分取代，但理论血脉延续到 Mamba-2

## 7. 读前须知

[[30-Formulas/注意力核心公式]]、[[40-Concepts/期望]]（随机特征是无偏估计）、[[40-Concepts/稀疏与线性注意力]]

> 近邻同族：[[Big Bird- Transformers for Longer Sequences（BigBird）]] · [[Longformer- The Long-Document Transformer（Longformer）]]
