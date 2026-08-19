---
type: paper
tags: [paper]
title: KVQuant- Towards 10 Million Context Length LLM Inference with KV Cache Quantization
aliases: [KVQuant]
year: 2024
authors: [SqueezeAILab (UC Berkeley)]
venue: NeurIPS 2024
arxiv: "2401.18079"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: [系统/流式, 注意力结构层, 压缩状态]
---

# KVQuant

## 1. 一句话贡献

千万级上下文的 KV 量化四件套：敏感度加权非均匀量化 + per-channel Key + Pre-RoPE 量化 + 稠密-稀疏分解——3-bit KV 支撑单卡 1M 上下文。

## 2. 核心贡献

1. 离线校准集分析敏感度，敏感值高精度、其余低精度非均匀数据类型
2. Key 在 RoPE 之前量化缓解旋转放大

## 3. 方法概要

离线校准集分析敏感度，敏感值高精度、其余低精度非均匀数据类型；Key 在 RoPE 之前量化缓解旋转放大。
## 4. 核心公式


$$
Q_{\text{NUC}}\big(K\big)\ \text{pre-RoPE} + \text{Dense\&Sparse outlier 分离}
$$


## 5. 与前作/矩阵关系

← [[KIVI- A Tuning-Free Asymmetric 2bit Quantization for KV Cache（KIVI）]]（同格前作）；🚩 KV 量化格的第二个顶会占位（与 KIVI 并立）

## 6. 影响与占位意义

B18 奠基补齐：KV 压缩支线的系统化代表作。

> 近邻同族：[[Dodo- Dynamic Contextual Compression for Decoder-only LMs（Dodo）]] · [[Efficient Streaming Language Models with Attention Sinks（StreamingLLM）]]

> 数学根基：[[KV缓存]] · [[量化]]

> 数学根基：[[注意力计算复杂度]]


## 7. 读前须知

需要：KV cache 的显存账本；离线校准的意义（敏感度分析）；Pre-RoPE vs Post-RoPE 量化的差异（旋转矩阵对误差的放大）
