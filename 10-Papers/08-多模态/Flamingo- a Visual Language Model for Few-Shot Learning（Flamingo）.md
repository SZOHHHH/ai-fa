---
type: paper
title: Flamingo - a Visual Language Model for Few-Shot Learning
aliases: [Flamingo]
year: 2022
authors: [Jean-Baptiste Alayrac, Jeff Donahue, Pauline Luc, et al.]
venue: NeurIPS 2022
arxiv: "2204.14198"
line: 多模态
matrix_coords: [投影接口, 生成(条件LM), 深对齐]
tags: [paper]
---

# Flamingo

## 1. 一句话贡献

冻结的 LLM + 冻结的视觉编码器 + 新颖的门控交叉注意力——首个在多视觉任务少样本 SOTA 的 VLM，交叉注意力范式的代表。

## 2. 核心贡献

- **门控 xattn-dense**：cross-attention 层初始置零（tan 门控），训练不破坏语言能力
- **Perceiver Resampler**：任意分辨率/帧数 → 固定数视觉 token
- **交错视觉-文本预训练**（M3W）：天然支持多图对话

## 3. 方法概要

1. NFNet 视觉编码器（冻结）+ Perceiver Resampler 压缩
2. 在冻结 Chinchilla LLM 的层间插入门控 cross-attn（可训练）
3. 三类数据训练：图文对、交错网页、视频对
4. 少样本提示评测（16 shots）

## 4. 核心公式

- 门控初始化 $g=0$：$\text{out} = \text{attn}\cdot \tanh(g)$——零初始化保护预训练（与 LoRA 的 B=0 同哲学！见 [[30-Formulas/LoRA分解]] §3）

## 5. 与前作的关系

- 组合了冻结 LLM + 视觉编码（[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]]）
- 对比后续 [[Visual Instruction Tuning（LLaVA）|LLaVA]]：插层（保语言）vs 简单投影（端到端）

## 6. 影响与后续

- GPT-4V 前最强的 VLM 范式；门控插入成为"外科手术式适配"标准技巧
- 交错数据格式（image-text interleaving）延续至今

## 7. 读前须知

[[40-Concepts/视觉语言模型（VLM）]]、[[40-Concepts/注意力机制]]、[[10-Papers/08-多模态/Learning Transferable Visual Models From Natural Language Supervision（CLIP）]]
