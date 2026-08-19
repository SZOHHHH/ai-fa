---
type: paper
title: Ring Attention with Blockwise Transformers for Near-Infinite Context
aliases: [Ring Attention]
year: 2023
authors: [Hao Liu, Matei Zaharia, Pieter Abbeel]
venue: ICLR 2024
arxiv: "2310.01889"
line: 长上下文
matrix_coords: [系统/流式, 注意力结构层, 分块分布式]
tags: [paper]
---

# Ring Attention

## 1. 一句话贡献

把注意力分块沿 GPU 环形传递——序列维度跨设备分摊，上下文长度随设备数线性扩展（百万 token 级训练）。

## 2. 核心贡献

- **环形通信**：KV 块在设备环上轮转，与计算重叠（communication-computation overlap）
- **块内计算**：每设备算本地 Q × 轮转来的 KV 块（结合 FlashAttention 式分块）
- 500k–1M token 上下文训练实证

## 3. 方法概要

1. 序列切成 N 块，每设备持一块 Q/KV
2. KV 块按环逐跳传递；到达即与本地 Q 算部分注意力
3. 在线 softmax 累积（[[30-Formulas/FlashAttention分块计算]] 同款）
4. 通信隐藏在计算背后——近零开销

## 4. 核心公式

- [[30-Formulas/注意力计算复杂度]] Ring 行；算法内核复用 [[30-Formulas/FlashAttention分块计算]]

## 5. 与前作的关系

- 组合了 FlashAttention 分块思想与分布式系统设计
- 与 Megatron（张量并行，维度切分）互补：这是**序列维度**并行

## 6. 影响与后续

- 长上下文训练基础设施（Llama-3-128k、百万上下文研究）
- Ring-FlashAttention3 等工程演进

## 7. 读前须知

[[30-Formulas/FlashAttention分块计算]]、[[30-Formulas/注意力计算复杂度]]、[[40-Concepts/softmax函数]]

> 近邻同族：[[Dodo- Dynamic Contextual Compression for Decoder-only LMs（Dodo）]] · [[Efficient Streaming Language Models with Attention Sinks（StreamingLLM）]]
