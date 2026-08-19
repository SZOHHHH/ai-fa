---
type: paper
title: Layer Normalization
aliases: [LayerNorm]
year: 2016
authors: [Ba, Kiros, Hinton]
venue: arXiv 2016
arxiv: "1607.06450"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [全注意力, 归一化/激活, 无状态]
tags: [paper]
---

# LayerNorm

## 1. 一句话贡献

层归一化原典：batch 维独立、特征维归一——小 batch/序列模型的 BN 替代品（Transformer 的标配）。

## 2. 核心贡献

1. 每样本每层独立归一化（均值方差）
2. 与 BN 的轴差异

## 3. 方法概要

每样本每层独立归一化（均值方差）；与 BN 的轴差异。
## 4. 核心公式


$$
\mathrm{LN}(x) = \gamma \odot \frac{x - \mu(x)}{\sigma(x)} + \beta
$$


**直觉**：← BN；→ [[Root Mean Square Layer Normalization（RMSNorm）]]（库内，去均值简化版）——归一化谱系的完整链

## 5. 与前作/矩阵关系

Transformer 配方的基础件；架构矩阵归一化列的起点补全

## 6. 影响后续

需要：与 BN 的对比（batch 依赖 vs 样本独立）

## 7. 读前须知

undefined

> 近邻同族：[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] · [[Attention Is All You Need（Transformer）]]

> 数学根基：[[批归一化]] · [[层归一化]] · [[均方根归一化]]
