---
type: paper
title: VideoPoet - A Large Language Model for Zero-Shot Video Generation
aliases: [VideoPoet]
year: 2023
authors: [Dan Kondratyuk, etc. (Google)]
venue: ICML 2024
arxiv: "2312.14125"
line: 多模态
matrix_coords: [生成接口, 生成(条件LM), 完全早期融合]
tags: [paper]
---

# VideoPoet

## 1. 一句话贡献

多模态 LLM 做视频生成：视频 tokenizer（VQ）+ 自回归 LLM + 超分辨率——"视频生成=语言建模"路线的代表（与扩散视频路线对照）。

## 2. 核心贡献

- **自回归视频生成**：时空 VQ 离散化 → LLM next-token 预测视频 token
- **多任务统一**：文生视频/图生视频/续写/风格化/配音（音视频联合 token）
- Zero-shot 组合能力强（zero-shot 图生视频超同期专用模型）

## 3. 方法概要

1. MAGVIT-v2 tokenizer：视频 → 离散 token（时空因果 3D 卷积）
2. LLM（类似 PaLM 配方）在 token 序列上自回归训练
3. 生成后逐级超分（空间×2）
4. 音频 token 同序列建模

## 4. 核心公式

- 视频自回归：$p(v) = \prod_i p(v_i \mid \text{context})$——[[30-Formulas/VQ-VAE目标]]（tokenizer）+ [[30-Formulas/注意力核心公式]]（LLM 骨干）的组合

## 5. 与前作的关系

- tokenizer 血统：[[10-Papers/02-生成建模与扩散/Neural Discrete Representation Learning（VQ-VAE）]]→[[10-Papers/02-生成建模与扩散/Taming Transformers for High-Resolution Image Synthesis（VQGAN）]]→MAGVIT-v2→本文
- 对照扩散视频路线（Sora 系）："离散自回归 vs 连续扩散"的生成世界观之争

## 6. 影响与后续

- 证明 LLM 范式可扩展到视频；与 Sora 报告同年形成路线竞争
- 视频 tokenizer（MAGVIT-v2）被后续（含 Veo 系推测）沿用

## 7. 读前须知

[[30-Formulas/VQ-VAE目标]]、[[10-Papers/02-生成建模与扩散/Taming Transformers for High-Resolution Image Synthesis（VQGAN）]]、[[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]]
