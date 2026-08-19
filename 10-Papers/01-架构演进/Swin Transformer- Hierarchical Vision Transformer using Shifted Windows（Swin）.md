---
type: paper
title: Swin Transformer- Hierarchical Vision Transformer using Shifted Windows
aliases: [Swin]
year: 2021
authors: [Liu et al. (Microsoft)]
venue: ICCV 2021 best paper
arxiv: "2103.14030"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [全注意力, 位置编码, —]
tags: [paper]
---

# Swin

## 1. 一句话贡献

移位窗口注意力：视觉的层级化高效 Transformer（窗口内注意力+移位跨窗通信）——ViT 之后的视觉骨干定型。

## 2. 核心贡献

1. 窗口划分+循环移位（跨窗连接）
2. 层级特征图（下采样）适配密集预测

## 3. 方法概要

窗口划分+循环移位（跨窗连接）；层级特征图（下采样）适配密集预测。
## 4. 核心公式


$$
\mathrm{W\text{-}MSA} \to \mathrm{SW\text{-}MSA}\ \text{(移位窗口交替)}
$$


**直觉**：← [[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]]（库内）；→ SwinV2/多数密集预测骨干；视觉注意力的稀疏化先声（→ 线6 稀疏注意力）

## 5. 与前作/矩阵关系

视觉 Transformer 工程化的分水岭（ICCV 最佳论文）

## 6. 影响后续

需要：窗口移位的 connectivity 论证

## 7. 读前须知

undefined

> 近邻同族：[[Attention Is All You Need（Transformer）]]

> 数学根基：[[注意力核心公式]] · [[残差连接]] · [[梯度]]
