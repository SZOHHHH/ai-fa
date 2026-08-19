---
type: paper
layer: 占位
title: Kimi Linear- An Expressive, Efficient Attention Architecture
aliases: [Kimi Linear]
year: 2025
authors: [Moonshot AI]
venue: arXiv 2025
arxiv: "2510.26692"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [混合, IO感知, 混合状态]
tags: [paper, 占位层]
---

# Kimi Linear- An Expressive, Efficient Attention Architecture（Kimi Linear·七节版）

## 1. 一句话贡献

混合线性注意力生产级落地：~20 层 Kimi Delta Attention（KDA）+ 7 层 MLA 交错（3:1），声称**首个全面超越纯全注意力的混合架构**。

## 2. 核心贡献

1. 混合线性注意力生产级落地：~20 层 Kimi Delta Attention（KDA）+ 7 层 MLA 交错（3:1），声称首个全面超越纯全注意力的混合架构。

## 3. 方法概要

KDA（delta 规则线性注意力变体）为骨干，MLA 层保精确召回，稀疏注意力撑长上下文。

## 4. 核心公式

$$
\text{KDA}:\ S_i = \big(I - \beta_i k_i k_i^\top\big)S_{i-1} + \beta_i v_i k_i^\top,\ \text{与 MLA 按 3:1 交错}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占混合架构格（与 Qwen3-Next 同代）；→ [[Gated DeltaNet-2- Decoupling Erase and Write in Linear Attention（GDN2）|GDN2]]/[[Parallelizing Linear Transformers with the Delta Rule over Sequence Length（DeltaNet并行）|DeltaNet并行]]（技术底座）


## 6. 影响与占位意义

混合配方"3:1 线性:全注意力"成为 2025-26 生产共识的旗舰证据。

> 近邻同族：[[A Systematic Analysis of Hybrid Linear Attention（混合线性分析）]] · [[Griffin- Mixing Gated Linear Recurrences with Local Attention for Efficient Language Models（Griffin）]]
> 数学根基（占位层）：[[状态空间模型方程]] · [[选择机制]] · [[稀疏与线性注意力]]

## 7. 读前须知

需要：状态空间模型方程；delta 规则；chunk 并行扫描
