---
type: paper
title: Leave No Context Behind - Efficient Infinite Context Transformers with Infini-attention
aliases: [Infini-attention]
year: 2024
authors: [Tsendsuren Munkhdalai, Manaal Faruqui, Siddharth Gopal]
venue: arXiv 2024
arxiv: "2404.07143"
line: 长上下文
matrix_coords: [系统/流式, 注意力结构层, 压缩状态]
tags: [paper]
---

# Infini-attention

## 1. 一句话贡献

压缩记忆 + 局部注意力的混合——KV 压进有界参数记忆，上下文长度理论上无限且显存恒定。

## 2. 核心贡献

- **压缩记忆**：旧 KV 以外积/绑定形式存进固定大小记忆矩阵（检索式回忆远文）
- **局部窗口**：近段照常注意力
- **门控混合**：$\sigma(\beta)\,\text{局部} + (1-\sigma(\beta))\,\text{记忆检索}$——学习局部/远程平衡

## 3. 方法概要

1. 序列流过滑动窗口（局部注意力）
2. 窗口外的 KV 被压缩进记忆矩阵（关联矩阵式更新）
3. query 检索记忆得到远程信号
4. 两路按可学 β 门控融合

## 4. 核心公式

- [[40-Concepts/稀疏与线性注意力]] 保留/压缩家族（压缩记忆路线）

## 5. 与前作的关系

- 呼应 [[10-Papers/06-长上下文/Efficient Streaming Language Models with Attention Sinks（StreamingLLM）]]（无限流式）但机制不同：sink 保原始 token、Infini 压缩成参数记忆
- 压缩记忆思想接 SSM 的隐状态（[[30-Formulas/状态空间模型方程]]）——"有界记忆"路线

## 6. 影响与后续

- 无限上下文方向代表之一（Google 系）；长程检索精度 vs 压缩率的权衡研究延续

## 7. 读前须知

[[30-Formulas/注意力核心公式]]、[[30-Formulas/状态空间模型方程]]（压缩记忆的对照）、[[40-Concepts/稀疏与线性注意力]]

> 近邻同族：[[Dodo- Dynamic Contextual Compression for Decoder-only LMs（Dodo）]] · [[Efficient Streaming Language Models with Attention Sinks（StreamingLLM）]]
