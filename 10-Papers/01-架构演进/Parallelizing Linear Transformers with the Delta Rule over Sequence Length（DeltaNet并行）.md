---
type: paper
layer: 占位
title: Parallelizing Linear Transformers with the Delta Rule over Sequence Length
aliases: [DeltaNet并行]
year: 2024
authors: [Songlin Yang et al.]
venue: arXiv 2024
arxiv: "2406.06484"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [线性注意力, IO感知, 有状态]
tags: [paper, 占位层]
---

# Parallelizing Linear Transformers with the Delta Rule over Sequence Length（DeltaNet并行·七节版）

## 1. 一句话贡献

DeltaNet 的序列长度方向分块并行化（chunk-wise parallel scan）——线性注意力训练提速的关键工程占位（架构矩阵"线性注意力×IO感知"格）。

## 2. 核心贡献

1. DeltaNet 的序列长度方向分块并行化（chunk-wise parallel scan）
2. 线性注意力训练提速的关键工程占位（架构矩阵"线性注意力×IO感知"格）。

## 3. 方法概要

把 Delta 规则的递归更新分块化，块内并行块间扫描；吞吐接近 GLA。

## 4. 核心公式

$$
S_i = \big(I - \beta_i k_i k_i^\top\big) S_{i-1} + \beta_i v_i k_i^\top\ \text{的 chunk 并行化}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占 [[60-Matrices/序列架构演进矩阵]] "线性注意力×IO感知"格——**B9 机会格"线性注意力×缩放律"的邻格**


## 6. 影响与占位意义

Gated DeltaNet 生产化（Qwen3-Next/Kimi Linear）的技术底座。

---

> 谱系枢纽：[[Attention Is All You Need（Transformer）]]（图谱连通入口）
> 近邻同族：[[Gated DeltaNet-2- Decoupling Erase and Write in Linear Attention（GDN2）]] · [[Retentive Network- A Successor to Transformer for Large Language Models（RetNet）]]
> 数学根基（占位层）：[[状态空间模型方程]] · [[选择机制]] · [[稀疏与线性注意力]]

## 7. 读前须知

需要：状态空间模型方程；delta 规则；chunk 并行扫描
