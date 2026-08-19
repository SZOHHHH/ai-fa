---
type: paper
title: Chameleon - Mixed-Modal Early-Fusion Foundation Models
aliases: [Chameleon]
year: 2024
authors: [Chameleon Team (Meta AI)]
venue: arXiv 2024
arxiv: "2405.09818"
line: 多模态
matrix_coords: [生成接口, 生成(条件LM), 完全早期融合]
tags: [paper]
---

# Chameleon（早融合统一模态）

## 1. 一句话贡献

图像与文本同 token 化、同一 Transformer 从头交错训练——"早融合"路线的 34B 级实现（对照"晚融合"的 [[Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]]/[[Visual Instruction Tuning（LLaVA）|LLaVA]] 系）。

## 2. 核心贡献

- **统一 token 空间**：离散图像 token（VQ）+ 文本 token 同词表、同注意力——生成与理解在同一模型内交织
- **训练稳定技术**：QK-Norm、z-loss 等解决早融合的 instability
- 交错生成：既看图又画图又对话

## 3. 方法概要

1. VQ tokenizer 图像 → 离散 token
2. 交错图文序列（10T token 级混合数据）自回归训练
3. 稳定化：norm 位置调整、初始化、数据配比
4. 评测：文生图/图生文/交错对话

## 4. 核心公式

- 统一自回归：$p(x) = \prod p(x_i \mid x_{<i})$，$x_i$ ∈ {文本, 图像} token——[[Auto-Encoding Variational Bayes（VAE）]]（tokenizer）+ [[30-Formulas/注意力核心公式]] 的深度整合
- 与 [[10-Papers/08-多模态/VideoPoet- A Large Language Model for Zero-Shot Video Generation（VideoPoet）]] 同谱系（离散统一生成）

## 5. 与前作的关系

- 对照 CLIP/LLaVA 的"晚融合"（双塔/投影）：早融合牺牲预训练复用、换来模态无缝交错
- tokenizer 血统同 [[10-Papers/02-生成建模与扩散/Taming Transformers for High-Resolution Image Synthesis（VQGAN）]]

## 6. 影响与后续

- 统一模态路线的工业级证据；GPT-4o 式原生多模态（推测）的技术先声
- 训练不稳定性的解法被后续统一模型继承

## 7. 读前须知

[[30-Formulas/VQ-VAE目标]]、[[10-Papers/02-生成建模与扩散/Taming Transformers for High-Resolution Image Synthesis（VQGAN）]]、[[40-Concepts/视觉语言模型（VLM）]]

> 近邻同族：[[Emu3- Next-Token Prediction is All You Need（Emu3）]] · [[Sora 技术报告- Video Generation Models as World Simulators（Sora）]]
