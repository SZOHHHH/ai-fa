---
type: paper
title: Prefix-Tuning - Optimizing Continuous Prompts for Generation
aliases: [Prefix-Tuning]
year: 2021
authors: [Xiang Lisa Li, Percy Liang]
venue: ACL 2021
arxiv: "2101.00190"
line: 后处理与压缩
matrix_coords: [适配参数, 掩码/注入, 微调期]
tags: [paper]
---

# Prefix-Tuning

## 1. 一句话贡献

不训练任何模型权重，只学每层注意力前缀的 KV 向量——"连续提示"适配任务的最早系统方案。

## 2. 核心贡献

- **每层前缀 KV 可学**：$P_K, P_V \in \mathbb{R}^{L_{\text{prefix}} \times d}$ 插进每层注意力的 K/V 序列
- **重参数化**：$P = \mathrm{MLP}(P')$——稳定优化（直接学 P 崩）
- 提示从"离散 token 搜索"变"连续向量优化"

## 3. 方法概要

1. 每层维护 $l$ 个前缀位置的 K/V 参数
2. 注意力计算时前缀参与 K/V（真实 token 的 Q 可attend到它们）
3. 重参数化 MLP 包裹 + 训练后可弃
4. 表格数据生成/摘要任务验证

## 4. 核心公式

- 输入侧 PEFT，见 [[20-Algorithms/参数高效微调（PEFT）]] §2 家族表

## 5. 与前作的关系

- 改进了 [GPT-3 手工 prompt]：离散搜索 → 连续梯度优化
- 与 [[10-Papers/03-后处理/Parameter-Efficient Transfer Learning for NLP（Adapter）]]（层内）对照：作用在注意力输入侧

## 6. 影响与后续

- P-Tuning v2（深度前缀）修正效果；P-Tuning（浅层版）
- 前缀占上下文长度 → 促成 LoRA 的权重侧方案胜出
- 与 KV cache 交互研究（前缀缓存复用）

## 7. 读前须知

[[40-Concepts/注意力机制]]（K/V 的插入处）、[[20-Algorithms/参数高效微调（PEFT）]]
