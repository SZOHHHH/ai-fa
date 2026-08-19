---
type: paper
title: Language Models are Unsupervised Multitask Learners
aliases: [GPT-2]
year: 2019
authors: [Alec Radford, Jeffrey Wu, Rewon Child, et al.]
venue: OpenAI 技术报告（未上 arXiv）
arxiv: "无（OpenAI 官网）"
pdf: 已下载（OpenAI CDN）
line: 架构演进
matrix_coords: [全注意力, 缩放律, 无状态]
tags: [paper]
---

# GPT-2

## 1. 一句话贡献

1.5B 参数纯网页语料训练——发现"语言建模即多任务学习"：零样本下无需微调就能翻译/问答/摘要，"任务特种兵"范式开始瓦解。

## 2. 核心贡献

- **WebText**：800 万网页（Common Crawl 过滤）——数据规模化
- **零样本任务迁移**：不改权重、纯 prompt 触发任务——GPT-3 上下文学习的先声
- LayerNorm 前置（Pre-LN）等训练稳定化改动

## 3. 方法概要

1. GPT-1 架构放大（48 层、1600 维）
2. 字节级 BPE（免 OOV）
3. 零样本评测 8 项任务（无任何微调）

## 4. 核心公式

- 自回归语言建模（与 GPT-1 同式，规模不同）

## 5. 与前作的关系

- 扩展了 [[10-Papers/01-架构演进/Improving Language Understanding by Generative Pre-Training（GPT-1）]]（预训练+微调 → 零样本）
- 为 [[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]] 的 few-shot 结论铺路

## 6. 影响与后续

- "语言模型=通用任务求解器"的世界观确立
- 分阶段开源策略引发"太危险的 AI"讨论（后来的对齐 discourse 先声）

## 7. 读前须知

[[10-Papers/01-架构演进/Improving Language Understanding by Generative Pre-Training（GPT-1）]]

> 近邻同族：[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] · [[Attention Is All You Need（Transformer）]]

> 数学根基：[[注意力机制]]

> 数学根基：[[注意力核心公式]]
