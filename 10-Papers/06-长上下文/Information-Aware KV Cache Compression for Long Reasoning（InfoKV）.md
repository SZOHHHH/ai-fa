---
type: paper
layer: 占位
title: Information-Aware KV Cache Compression for Long Reasoning
aliases: [InfoKV]
year: 2026
authors: [arXiv]
venue: arXiv 2026
arxiv: "2606.26875"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: [系统/流式, 注意力结构层, 压缩状态]
tags: [paper, 占位层]
---

# Information-Aware KV Cache Compression for Long Reasoning（InfoKV·七节版）

## 1. 一句话贡献

信息感知 KV 压缩：按信息量保留 KV token（长推理场景）。

## 2. 核心贡献

1. 信息感知 KV 压缩：按信息量保留 KV token（长推理场景）。

## 3. 方法概要

信息量评估指导保留决策。

## 4. 核心公式

$$
keep(k_i) iff I(k_i) > tau
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

KV 压缩格第 5 篇，竞争白热化


## 6. 影响与占位意义

长上下文推理成本战场持续升温。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Dodo- Dynamic Contextual Compression for Decoder-only LMs（Dodo）]] · [[Efficient Streaming Language Models with Attention Sinks（StreamingLLM）]]
> 数学根基（占位层）：[[KV缓存]]

## 7. 读前须知

需要：KV cache 机制；量化误差与异常值分布；RoPE 前后量化的差异
