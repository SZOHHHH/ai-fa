---
type: paper
title: Big Bird - Transformers for Longer Sequences
aliases: [BigBird]
year: 2020
authors: [Manzil Zaheer, Guru Guruganesh, Kumar Avinava Dubey, et al.]
venue: NeurIPS 2020
arxiv: "2007.14062"
line: 长上下文
matrix_coords: [稀疏注意力, 注意力结构层, 分块]
tags: [paper]
---

# BigBird

## 1. 一句话贡献

窗口+随机+全局三种连接的理论配方——证明稀疏注意力既省算力又是**图灵完备的万能序列函数近似器**（理论高度最高）。

## 2. 核心贡献

- **三合一图结构**：局部窗口 + 随机边 + 全局 token——稀疏连接的最小完备组合
- **理论证明**：该图类下 Transformer 图灵完备、可近似任意序列函数（与全注意力等价表达力）
- 置信集理论：随机连接保证统计覆盖

## 3. 方法概要

1. 注意力图 = 窗口带 + r 条随机边 + g 个全局 token
2. 块稀疏实现（attention 计算分块跳零）
3. 8× token 长度处理、基因序列任务验证

## 4. 核心公式

- [[40-Concepts/稀疏与线性注意力]] 随机图家族行

## 5. 与前作的关系

- 理论化了 [[10-Papers/06-长上下文/Longformer- The Long-Document Transformer（Longformer）]] 的工程直觉（给出表达力证明）
- 与 Sparse Transformer（Child 2019）的固定模式对比：随机性有统计保证

## 6. 影响与后续

- "稀疏≠残缺"的理论定心丸——后续稀疏方法的引用基石
- 随机化思想通向 Performer（完全随机特征化）

## 7. 读前须知

[[30-Formulas/注意力核心公式]]、[[30-Formulas/注意力计算复杂度]]、[[10-Papers/06-长上下文/Longformer- The Long-Document Transformer（Longformer）]]
