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

> 谱系枢纽：[Denoising Diffusion Probabilistic Models](/ai-fa/explore/10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）)（图谱连通入口）
> 近邻同族：[Dodo- Dynamic Contextual Compression for Decoder-only LMs](/ai-fa/explore/10-Papers/06-长上下文/Dodo- Dynamic Contextual Compression for Decoder-only LMs（Dodo）) · [Efficient Streaming Language Models with Attention Sinks](/ai-fa/explore/10-Papers/06-长上下文/Efficient Streaming Language Models with Attention Sinks（StreamingLLM）) · [Fine-Tuning a KV Cache Concatenation-Aware Model or Recomputing KV Caches? Why Not Both?](/ai-fa/explore/10-Papers/06-长上下文/Fine-Tuning a KV Cache Concatenation-Aware Model or Recomputing KV Caches Why Not Both)（KV 复用/重算轴，2026-09） · [SequenceO1: End-to-End Ultra-Long (100K) Sequence Modeling in Recommendation with Low-Rank Caching](/ai-fa/explore/10-Papers/06-长上下文/SequenceO1 End-to-End Ultra-Long (100K) Sequence Modeling in Recommendation with Low-Rank Caching)（定长草图压缩轴，2026-09）
> 近邻同族（续，260919）：[ASPIRE](/ai-fa/explore/10-Papers/06-长上下文/ASPIRE Asynchronous Batched Self-Speculative Decoding for Long-Context LLM Inference)（解码内存墙另一轴：不压 KV、用异步批式自投机解码摊薄全量 KV 读）
> 数学根基（占位层）：[KV缓存](/ai-fa/explore/40-Concepts/KV缓存)

## 7. 读前须知

需要：KV cache 机制；量化误差与异常值分布；RoPE 前后量化的差异
