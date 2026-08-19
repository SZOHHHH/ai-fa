---
type: paper
title: Efficiently Scaling Transformer Inference
aliases: [MQA, Multi-Query Attention]
year: 2022
authors: [Noam Shazeer]
venue: arXiv 2022
arxiv: "2211.05102"
line: 架构演进
matrix_coords: [全注意力, KV压缩, 无状态]
tags: [paper]
---

# MQA（多查询注意力）

## 1. 一句话贡献

所有查询头共享同一组 K/V 投影——KV Cache 直接砍到 1/h，长序列推理与高并发的第一刀。

## 2. 核心贡献

- **MQA 结构**：$h$ 个 Q 头 × **1** 组 KV（[[40-Concepts/注意力机制]] 谱系表）
- 自回归解码显存带宽瓶颈的定量分析（MQA 让 decode 从 memory-bound 松绑）
- "质量小损换成本大降"的实用权衡

## 3. 方法概要

1. 标准 MHA：每头独立 $W_Q^i, W_K^i, W_V^i$
2. MQA：$W_K, W_V$ 全局共享一份（Q 仍每头独立）
3. KV Cache 体积 = $2 \times L \times n \times d_{\text{head}}$（与头数无关）
4. 训练照常；也可从 MHA 检查点转换

## 4. 核心公式

- [[40-Concepts/KV缓存]]：cache 体积公式的直接受益者（$h$ 因子消失）

## 5. 与前作的关系

- 前置于 [[10-Papers/01-架构演进/GQA- Training Generalized Multi-Query Transformer Models from Multi-Head Checkoffs（GQA）]]：GQA 是它的质量修复版
- 依托 [自回归推理的 roofline 分析]（同文 PaLM 推理实验）

## 6. 影响与后续

- [[10-Papers/01-架构演进/GQA- Training Generalized Multi-Query Transformer Models from Multi-Head Checkoffs（GQA）]] 提出"MHA→MQA 的中间档"
- [[30-Formulas/MLA多头潜在注意力]] 用低秩压缩走出另一条路（质量不损）
- 推理引擎批处理能力量级提升的起点

## 7. 读前须知

[[40-Concepts/注意力机制]]、[[40-Concepts/KV缓存]]、[[30-Formulas/注意力计算复杂度]]
