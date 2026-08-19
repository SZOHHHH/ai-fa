---
type: paper
title: The Llama 3 Herd of Models
aliases: [Llama3]
year: 2024
authors: [Meta AI]
venue: arXiv 2024
arxiv: "2407.21783"
pdf: 已下载（PDF/）
line: 标杆锚点
matrix_coords: [—, —, —]
tags: [paper]
---

# Llama3

## 1. 一句话贡献

开源旗舰的完整披露：405B/70B/8B 三档，15T token，系统化的 scaling 后训练（SFT+[[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）|DPO]]+RLHF 三阶段）+ 多语言/长上下文/工具使用全能力。

## 2. 核心贡献

1. 训练配方全公开（数据配比/清洗/退火/后训练流水线）
2. "模型=数据+配方"的当代标准参考

## 3. 方法概要

训练配方全公开（数据配比/清洗/退火/后训练流水线）；"模型=数据+配方"的当代标准参考。
## 4. 核心公式


$$
\text{Pretrain}\ 15T\ \text{tokens} \to \text{SFT} \to \text{Rejection sampling} \to \text{DPO}
$$


**直觉**：← [[Training Compute-Optimal Large Language Models（Chinchilla）]]（算力最优比）的实践版；→ Qwen/DeepSeek 系技术报告同格式——线10 锚点家族

## 5. 与前作/矩阵关系

后训练配方（RSR+DPO）的公开标准；开源生态的基础设施

## 6. 影响后续

无新数学，价值在配方披露；与 GPT-4 报告互补（闭源 vs 开源口径）

## 7. 读前须知

undefined

> 近邻同族：[[Gemini 1.5- Unlocking Multimodal Understanding Across Millions of Tokens of Context（Gemini 1.5）]] · [[Large Language Models- A Survey（LLM Survey 2024）]]

> 数学根基：[[注意力机制]]

> 数学根基：[[注意力核心公式]]
