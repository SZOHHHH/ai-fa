---
type: paper
title: An Image is Worth 16x16 Words - Transformers for Image Recognition at Scale
aliases: [ViT]
year: 2020
authors: [Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, et al.]
venue: ICLR 2021
arxiv: "2010.11929"
line: 架构演进
matrix_coords: [全注意力, 位置编码, 无状态]
tags: [paper]
---

# ViT（视觉 Transformer）

## 1. 一句话贡献

图像切成 16×16 patch 当"词"喂给标准 Transformer——证明注意力无需卷积归纳偏置，大数据下视觉通吃。

## 2. 核心贡献

- **Patch 化**：图像 → 序列的极简方案（线性投影即可）
- **规模定律搬进视觉**：JFT-300M 预训练后全面超 CNN
- **"数据 > 归纳偏置"实证**：小数据下输 CNN、大数据反超——架构信仰的转折点

## 3. 方法概要

1. 图像 $H \times W \times 3$ 切成 $N = HW/16^2$ 个 patch
2. 每 patch 展平 + 线性投影成 token + 可学习位置嵌入 + [CLS] token
3. 标准 Transformer 编码器（无任何卷积）
4. [CLS] 输出接分类头；预训练-微调

## 4. 核心公式

- 架构即 [[30-Formulas/注意力核心公式]]（无因果掩码版）
- patch 嵌入：$z_i = W_p \, \text{flatten}(p_i) + e_i$（一次卷积实现）

## 5. 与前作的关系

- 移植了 [[10-Papers/01-架构演进/Attention Is All You Need（Transformer）]] 到像素域
- 对比 [CNN 数十年的归纳偏置]：平移不变性/局部性被"大数据 + 预训练"替代

## 6. 影响与后续

- [[Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]] 的视觉编码器（线 8 前置）；[[Scalable Diffusion Models with Transformers（DiT）|DiT]]（[[10-Papers/02-生成建模与扩散/Scalable Diffusion Models with Transformers（DiT）]]）直接沿用 patch 化
- 多模态统一 token 化的起点（图文音视频全走 patch/token 路线）
- 视觉骨干全面 Transformer 化（Swin/DeiT 系列迭代）

## 7. 读前须知

[[20-Algorithms/Transformer]]、[[30-Formulas/注意力核心公式]]、[[40-Concepts/位置编码]]（可学习版）
