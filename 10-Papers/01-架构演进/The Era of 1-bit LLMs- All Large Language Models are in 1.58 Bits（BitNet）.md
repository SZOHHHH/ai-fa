---
type: paper
title: The Era of 1-bit LLMs- All Large Language Models are in 1.58 Bits
aliases: [BitNet]
year: 2024
authors: [Ma et al. (Microsoft)]
venue: arXiv 2024
arxiv: "2402.17764"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [全注意力, 量化, 无状态]
tags: [paper]
---

# BitNet

## 1. 一句话贡献

1.58bit（三值{-1,0,1}）训练原生量化：BitLinear 替换 nn.Linear，从头训练而非 PTQ——"极限量化"的训练期路线。

## 2. 核心贡献

1. 权重三值激活 8bit
2. 矩阵乘退化为加减法
3. 从训练期就量化（QAT 极端版），70B 级可全程 CPU 推理的叙事

## 3. 方法概要

权重三值激活 8bit；矩阵乘退化为加减法；从训练期就量化（QAT 极端版），70B 级可全程 CPU 推理的叙事。
## 4. 核心公式


$$
W \in \{-1, 0, +1\}^{d\times d},\ \text{matmul} \to \text{加减累积}
$$


**直觉**：← 模型压缩矩阵量化列的极限端；vs GPTQ/AWQ（PTQ 路线）——两条路线的哲学差（重训 vs 后处理）

## 5. 与前作/矩阵关系

压缩矩阵"量化×预训练介入度"格补齐

## 6. 影响后续

需要：QAT vs PTQ 之分；1.58=log2(3)

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Attention Is All You Need（Transformer）]]（图谱连通入口）

> 近邻同族：[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]]

> 数学根基：[[量化]] · [[注意力核心公式]]
