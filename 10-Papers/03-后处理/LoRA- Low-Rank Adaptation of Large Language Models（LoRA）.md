---
type: paper
title: LoRA - Low-Rank Adaptation of Large Language Models
aliases: [LoRA]
year: 2021
authors: [Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen]
venue: ICLR 2022
arxiv: "2106.09685"
line: 后处理与压缩
matrix_coords: [适配参数, 低秩, 微调期]
tags: [paper]
---

# LoRA

## 1. 一句话贡献

假设"适配增量天然低秩"——权重旁路挂低秩因子 $W' = W_0 + \frac{\alpha}{r}BA$，PEFT 从此有了推理零开销的事实标准。

## 2. 核心贡献

- **低秩假设 + 实证**：$\Delta W$ 谱衰减快，r=1–8 已足
- **旁路结构**：可合并进权重——部署零延迟
- **GPT-3 175B 微调**：显存 1/3、可训参数万分之一

## 3. 方法概要

1. 冻结 $W_0$，每目标层加 $B \in \mathbb{R}^{d\times r}, A \in \mathbb{R}^{r\times d}$
2. 初始化 $A\sim\mathcal{N}, B=0$（起点=原模型）
3. 前向 $h = W_0 x + \frac{\alpha}{r}BAx$，只训 BA
4. 推理时合并 $W' = W_0 + BA$（或保持旁路热切换任务）

## 4. 核心公式

- [[30-Formulas/LoRA分解]] —— 本文灵魂

## 5. 与前作的关系

- 超越了 [[10-Papers/03-后处理/Parameter-Efficient Transfer Learning for NLP（Adapter）]]（串行延迟）与 [[10-Papers/03-后处理/Prefix-Tuning- Optimizing Continuous Prompts for Generation（Prefix-Tuning）]]（占上下文）
- 理论根基 [[40-Concepts/低秩分解]]；结构哲学同 [[30-Formulas/残差连接]]

## 6. 影响与后续

- 微调生态事实标准（HF peft 库核心）；QLoRA/DoRA 等家族繁荣
- "基座+LoRA 库"部署模式（一底座多任务）
- 跨领域扩散：LoRA for Diffusion（风格微调成为 AIGC 热词）

## 7. 读前须知

[[40-Concepts/低秩分解]]、[[30-Formulas/LoRA分解]]、[[20-Algorithms/参数高效微调（PEFT）]]

> 谱系成员（18）：[[A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning（DAGGER）]] · [[A Simple and Effective Pruning Approach for Large Language Models（SparseGPT）]] · [[AWQ- Activation-aware Weight Quantization for LLM Compression and Acceleration（AWQ）]] · [[BERT-of-Theseus- Compressing BERT by Progressive Module Replacing（Theseus）]] · [[DistilBERT, a distilled version of BERT- smaller, faster, cheaper and lighter（DistilBERT）]] · [[Distilling the Knowledge in a Neural Network（KD）]] · [[DoRA- Weight-Decomposed Low-Rank Adaptation（DoRA）]] · [[GPTQ- Accurate Post-Training Quantization for Generative Pre-trained Transformers（GPTQ）]] · [[KIVI- A Tuning-Free Asymmetric 2bit Quantization for KV Cache（KIVI）]] · [[LLM.int8()- 8-bit Matrix Multiplication for Transformers at Scale（LLM.int8）]] · [[Outrageously Large Neural Networks- The Sparsely-Gated Mixture-of-Experts Layer（稀疏MoE）]] · [[Parameter-Efficient Transfer Learning for NLP（Adapter）]] · …等 18 篇
