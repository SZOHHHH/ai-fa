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
pdf: 已下载（PDF/）
---

# MoBA（块注意力混合）

## 1. 一句话贡献

把 MoE 思想搬进注意力——路由器为每个 query 选 top-k 个 KV 块，长上下文稀疏注意力"原生可训练"。

## 2. 核心贡献

- **块级路由**：KV 序列分块 → 门控网络选块（块=专家）——与 [MoE门控公式](/explore/30-Formulas/MoE门控公式) 同构
- **无训练-推理差距**：训练与推理用同一稀疏模式（对比 KV 驱逐类的"训练全量推理稀疏"）
- Top-k 门控 + 因果掩码兼容

## 3. 方法概要

1. KV 按块划分（如 512 token/块）
2. 路由器（轻量 MLP）对每 query 输出块分数，取 top-k
3. 注意力只算选中块（块内 Flash 式计算）
4. 与稠密预训练可混训切换

## 4. 核心公式

- [稀疏与线性注意力](/explore/40-Concepts/稀疏与线性注意力) 块选择家族行；门控同 [MoE门控公式](/explore/30-Formulas/MoE门控公式)

## 5. 与前作的关系

- 组合了 [Switch Transformers - Scaling to Trillion Parameter Models with Simple and Efficient Sparsity](/explore/10-Papers/05-MoE/Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）) 的路由思想与长上下文注意力
- 与同期 [Native Sparse Attention - Hardware-Aligned and Natively Trainable Sparse Attention](/explore/10-Papers/06-长上下文/Native Sparse Attention- Hardware-Aligned and Natively Trainable Sparse Attention（NSA）) 构成 2025 稀疏注意力双雄

## 6. 影响与后续

- Kimi 长上下文生产技术；"attention 的 MoE 化"设计空间打开
- 后续（MoBA++、混合稀疏模式）持续迭代
- 体系结构侧延伸（2026-09）：[AMEND: Audited Margins Enable Nonblocking Drops in GPU-PIM LLM Decoding](/explore/10-Papers/06-长上下文/AMEND Audited Margins Enable Nonblocking Drops in GPU-PIM LLM Decoding)——同为块级选择，MoBA 在模型侧门控路由，AMEND 在 GPU-PIM 硬件侧用已审计 margin 预测判决

- → 后继补记（260914）：[SAS](/explore/10-Papers/06-长上下文/SAS - Simple Attention Sparsification via End-to-End Optimization of Context Ranking（端到端稀疏注意力）)（块路由选择器的端到端训练路线）、[RouteRelay](/explore/10-Papers/06-长上下文/RouteRelay - Event-Triggered Cross-Layer Route Reuse for Efficient Dynamic Sparse Attention（跨层路由复用）)（块路由的跨层复用省打分）

## 7. 读前须知

[稀疏与线性注意力](/explore/40-Concepts/稀疏与线性注意力)、[MoE门控公式](/explore/30-Formulas/MoE门控公式)、[注意力计算复杂度](/explore/30-Formulas/注意力计算复杂度)
