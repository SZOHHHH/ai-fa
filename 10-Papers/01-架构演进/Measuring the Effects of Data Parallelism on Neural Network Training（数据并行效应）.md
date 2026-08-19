---
type: paper
title: Measuring the Effects of Data Parallelism on Neural Network Training
aliases: [数据并行效应]
year: 2018
authors: [Shallue et al. (Google)]
venue: arXiv 2018
arxiv: "1811.03600"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [全注意力, —, —]
tags: [paper]
---

# 数据并行效应

## 1. 一句话贡献

数据并行的科学测量：批大小×学习率×动量的系统扫描——"并行不是免费加速"的实证地基（本库 scaling 支线）。

## 2. 核心贡献

1. 跨工作负载扫描批大小-学习率关系
2. 找出并行度收益消失点

## 3. 方法概要

跨工作负载扫描批大小-学习率关系；找出并行度收益消失点。
## 4. 核心公式


$$
\text{time-to-result}(B, \eta)\ \text{系统测量}\ \text{(批大小 vs 吞吐 vs 质量)}
$$


**直觉**：← [[Scaling Laws for Neural Language Models（Scaling Laws）]]（库内）的工程侧；→ 大规模训练配方（zero redundancy 系）

## 5. 与前作/矩阵关系

分布式训练的实证方法学起点

## 6. 影响后续

需要：批大小-学习率缩放规则（线性/平方根）

## 7. 读前须知

undefined

> 近邻同族：[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] · [[Attention Is All You Need（Transformer）]]

> 数学根基：[[注意力核心公式]]
