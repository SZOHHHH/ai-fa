---
type: paper
title: MoBA - Mixture of Block Attention for Long-Context LLMs
aliases: [MoBA]
year: 2025
authors: [Lifan Yuan, etc. (Moonshot AI / Kimi)]
venue: arXiv 2025
arxiv: "2502.13189"
line: 长上下文
matrix_coords: [稀疏注意力, 训练/数据层, 可学习路由]
tags: [paper]
---

# MoBA（块注意力混合）

## 1. 一句话贡献

把 MoE 思想搬进注意力——路由器为每个 query 选 top-k 个 KV 块，长上下文稀疏注意力"原生可训练"。

## 2. 核心贡献

- **块级路由**：KV 序列分块 → 门控网络选块（块=专家）——与 [[30-Formulas/MoE门控公式]] 同构
- **无训练-推理差距**：训练与推理用同一稀疏模式（对比 KV 驱逐类的"训练全量推理稀疏"）
- Top-k 门控 + 因果掩码兼容

## 3. 方法概要

1. KV 按块划分（如 512 token/块）
2. 路由器（轻量 MLP）对每 query 输出块分数，取 top-k
3. 注意力只算选中块（块内 Flash 式计算）
4. 与稠密预训练可混训切换

## 4. 核心公式

- [[40-Concepts/稀疏与线性注意力]] 块选择家族行；门控同 [[30-Formulas/MoE门控公式]]

## 5. 与前作的关系

- 组合了 [[10-Papers/05-MoE/Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]] 的路由思想与长上下文注意力
- 与同期 [[10-Papers/06-长上下文/Native Sparse Attention- Hardware-Aligned and Natively Trainable Sparse Attention（NSA）]] 构成 2025 稀疏注意力双雄

## 6. 影响与后续

- Kimi 长上下文生产技术；"attention 的 MoE 化"设计空间打开
- 后续（MoBA++、混合稀疏模式）持续迭代

## 7. 读前须知

[[40-Concepts/稀疏与线性注意力]]、[[30-Formulas/MoE门控公式]]、[[30-Formulas/注意力计算复杂度]]
