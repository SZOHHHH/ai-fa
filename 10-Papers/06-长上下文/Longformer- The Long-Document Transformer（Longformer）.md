---
type: paper
title: Longformer - The Long-Document Transformer
aliases: [Longformer]
year: 2020
authors: [Iz Beltagy, Matthew E. Peters, Arman Cohan]
venue: arXiv 2020
arxiv: "2004.05150"
line: 长上下文
matrix_coords: [稀疏注意力, 注意力结构层, 分块]
tags: [paper]
---

# Longformer

## 1. 一句话贡献

滑窗注意力 + 可选全局 token 的组合模式——长文档 NLP 的第一代稀疏注意力标准。

## 2. 核心贡献

- **模式语言**：local（滑窗）/ global（指定 token 看全）→ global+sliding 混合
- **膨胀窗口**（dilated）：窗口隔层扩大感受野（空洞卷积思想移植）
- 4096+ token 长文档 QA/分类任务验证

## 3. 方法概要

1. 每层按预设模式给注意力加掩码
2. 任务关键位置（如 [CLS]、问题 token）标为 global
3. 复杂度 $O(nw)$（w=窗口）
4. 从 RoBERTa 继续预训练适配模式

## 4. 核心公式

- [[40-Concepts/稀疏与线性注意力]] 窗口家族行

## 5. 与前作的关系

- 改进了 BERT 的 512 上限（位置嵌入训练范围）
- 与 [[10-Papers/06-长上下文/Big Bird- Transformers for Longer Sequences（BigBird）]]（同年）构成稀疏双雄——BigBird 胜在理论、Longformer 胜在任务配置简洁

## 6. 影响与后续

- 稀疏注意力工程模板；长文档基准（如 SCROLLS）标配
- 被 Flash/长 RoPE 时代部分取代，但"global token"思想延续（attention sink 的近亲）

## 7. 读前须知

[[30-Formulas/注意力核心公式]]、[[30-Formulas/注意力计算复杂度]]

> 谱系成员（12）：[[Big Bird- Transformers for Longer Sequences（BigBird）]] · [[Dodo- Dynamic Contextual Compression for Decoder-only LMs（Dodo）]] · [[Efficient Streaming Language Models with Attention Sinks（StreamingLLM）]] · [[Extending Context Window of Large Language Models via Positional Interpolation（PI）]] · [[Information-Aware KV Cache Compression for Long Reasoning（InfoKV）]] · [[KVQuant- Towards 10 Million Context Length LLM Inference with KV Cache Quantization（KVQuant）]] · [[Leave No Context Behind- Efficient Infinite Context Transformers with Infini-attention（Infini-attention）]] · [[MoBA- Mixture of Block Attention for Long-Context LLMs（MoBA）]] · [[Native Sparse Attention- Hardware-Aligned and Natively Trainable Sparse Attention（NSA）]] · [[Rethinking Attention with Performers（Performer）]] · [[Ring Attention with Blockwise Transformers for Near-Infinite Context（Ring Attention）]] · [[YaRN- Efficient Context Window Extension of Large Language Models（YaRN）]]
