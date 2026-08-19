---
type: paper
title: GQA - Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints
aliases: [GQA, Grouped-Query Attention]
year: 2023
authors: [Joshua Ainslie, James Lee-Thorp, Michiel de Jong, Yury Zemlyanskiy, Federico Lebrón, Sumit Sanghai]
venue: EMNLP 2023
arxiv: "2305.13245"
line: 架构演进
matrix_coords: [全注意力, KV压缩, 无状态]
tags: [paper]
---

# GQA（分组查询注意力）

## 1. 一句话贡献

MQA 与 MHA 的折中：KV 头分组共享（如 32 Q 头配 8 KV 组）——质量几乎不损、cache 砍到 1/4，LLaMA-2/3 采纳。

## 2. 核心贡献

- **GQA 谱系定位**：MHA（质量上限）↔ GQA（甜点）↔ MQA（最省）（[[40-Concepts/注意力机制]] 谱系表）
- **检查点转换法**：已有 MHA 模型 mean-pool KV 头转 GQA——免重训
- 质量与速度的系统权衡曲线

## 3. 方法概要

1. 把 $h$ 个 Q 头分成 $g$ 组，每组共享一套 K/V 投影
2. KV Cache 体积 $\propto g/h$（32 头 8 组 → 1/4）
3. 从 MHA 检查点转换：同组 KV 头参数平均池化
4. 上证转换后微调小步恢复质量

## 4. 核心公式

- [[40-Concepts/KV缓存]] 体积公式中 $h_{\text{kv}} = g$ 的插值

## 5. 与前作的关系

- 折中了 [[10-Papers/01-架构演进/Efficiently Scaling Transformer Inference（MQA）]]（省但降质）与 MHA（好但贵）
- 与 [[30-Formulas/MLA多头潜在注意力]] 并列两条路线：分组共享 vs 低秩压缩

## 6. 影响与后续

- LLaMA-2/3、Mistral、Qwen 等主流开源模型标配
- "现代 LLM 配方四件套"收官成员
- KV 压缩研究（KIVI 量化等）以 GQA 为基线继续推进

## 7. 读前须知

[[40-Concepts/注意力机制]]、[[40-Concepts/KV缓存]]、[[10-Papers/01-架构演进/Efficiently Scaling Transformer Inference（MQA）]]
