---
type: paper
layer: 占位
title: Gated DeltaNet-2- Decoupling Erase and Write in Linear Attention
aliases: [GDN2]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2605.22791"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [线性注意力, —, 有状态]
tags: [paper, 占位层]
---

# Gated DeltaNet-2- Decoupling Erase and Write in Linear Attention（GDN2·七节版）

## 1. 一句话贡献

线性注意力的擦除/写入解耦——报告性能超 KDA 与 Mamba-3：线性注意力族 2026 年仍在快速占位（"supersedes Mamba"叙事的当代表）。

## 2. 核心贡献

1. 线性注意力的擦除/写入解耦
2. 报告性能超 KDA 与 Mamba-3：线性注意力族 2026 年仍在快速占位（"supersedes Mamba"叙事的当代表）。

## 3. 方法概要

把 Delta 规则的单步耦合更新拆为独立的擦除门与写入门，各自带衰减系数。

## 4. 核心公式

$$
S_i = \alpha_i S_{i-1} + \big(\gamma_i - \alpha_i\big) v_i k_i^\top,\ \alpha\text{=擦除门},\ \gamma\text{=写入门}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

→ [[Parallelizing Linear Transformers with the Delta Rule over Sequence Length（DeltaNet并行）|DeltaNet并行]]（前置）；🚩 占线性注意力×状态管理格


## 6. 影响与占位意义

"混合架构=少数全注意力+多数线性注意力"配方在 Qwen3-Next/Kimi Linear 落地的 2026 延续。

> 近邻同族：[[Parallelizing Linear Transformers with the Delta Rule over Sequence Length（DeltaNet并行）]] · [[Retentive Network- A Successor to Transformer for Large Language Models（RetNet）]]
> 数学根基（占位层）：[[状态空间模型方程]] · [[选择机制]] · [[稀疏与线性注意力]]
> 核心公式：[[矩阵指数时间衰减]]

## 7. 读前须知

需要：状态空间模型方程；delta 规则；chunk 并行扫描
