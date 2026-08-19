---
type: paper
title: Dodo- Dynamic Contextual Compression for Decoder-only LMs
aliases: [Dodo]
year: 2023
authors: [（arXiv）]
venue: arXiv 2023
arxiv: "2310.02409"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: [系统/流式, 注意力结构层, 压缩状态]
tags: [paper]
---

# Dodo

## 1. 一句话贡献

解码器 LM 的动态上下文压缩：token 级信息量评估决定丢弃——上下文压缩的早期系统占位。

## 2. 核心贡献

1. 动态评估 token 保留价值，压缩上下文窗口（vs 静态截断）

## 3. 方法概要

动态评估 token 保留价值，压缩上下文窗口（vs 静态截断）。
## 4. 核心公式


$$
\text{keep}(x) \iff \mathrm{info}(x) > \tau(t)\ \text{(动态阈值压缩)}
$$


**直觉**：长上下文矩阵"流式×压缩"格的邻位；→ 长上下文压缩线（rate-distortion 视角的实例）

## 5. 与前作/矩阵关系

动态压缩 vs Infini-attention 状态压缩——两条压缩路线的分岔点

## 6. 影响后续

需要：信息量评估的代理指标

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Longformer- The Long-Document Transformer（Longformer）]]（图谱连通入口）

> 近邻同族：[[Efficient Streaming Language Models with Attention Sinks（StreamingLLM）]] · [[Information-Aware KV Cache Compression for Long Reasoning（InfoKV）]]

> 数学根基：[[KV缓存]]

> 数学根基：[[注意力计算复杂度]]
