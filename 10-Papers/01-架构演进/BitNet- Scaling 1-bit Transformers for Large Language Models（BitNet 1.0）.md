---
type: paper
title: BitNet- Scaling 1-bit Transformers for Large Language Models
aliases: [BitNet 1.0]
year: 2023
authors: [Wang et al. (Microsoft)]
venue: arXiv 2023
arxiv: "2310.11453"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [全注意力, 量化, 无状态]
tags: [paper]
---

# BitNet 1.0

## 1. 一句话贡献

BitNet 初代（本批已有 1.58bit 续作）：首个从训练期就 1bit 权重的 Transformer——极限量化的起点验证。

## 2. 核心贡献

1. BitLinear 前置
2. 损失函数不变，权重二值化

## 3. 方法概要

BitLinear 前置；损失函数不变，权重二值化；展示可扩展性。
## 4. 核心公式


$$
W \in \{-1, +1\},\ \text{matmul} \to \text{符号加减}
$$


**直觉**：→ [[The Era of 1-bit LLMs- All Large Language Models are in 1.58 Bits（BitNet）]]（B19 入库）——压缩矩阵量化列的训练期路线完整链

## 5. 与前作/矩阵关系

1-bit LLM 方向的起点

## 6. 影响后续

需要：STE（直通估计器）绕过离散梯度

## 7. 读前须知

undefined

> 近邻同族：[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] · [[Attention Is All You Need（Transformer）]]

> 数学根基：[[量化]] · [[注意力核心公式]]
