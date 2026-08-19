---
type: paper
title: Improving Language Understanding by Generative Pre-Training
aliases: [GPT-1, Generative Pre-Training]
year: 2018
authors: [Alec Radford, Karthik Narasimhan, Tim Salimans, Ilya Sutskever]
venue: OpenAI 技术报告（未发会议/未上 arXiv）
arxiv: "无（仅 OpenAI 官网）"
pdf: 已下载（官方 CDN）
line: 架构演进
matrix_coords: [全注意力, 缩放律, 无状态]
tags: [paper]
---

# GPT-1（生成式预训练）

## 1. 一句话贡献

用"无监督预训练 + 有监督微调"两段式范式，证明生成式语言建模的通用表征能迁移到几乎所有 NLU 任务——GPT 序列的起点。

## 2. 核心贡献

- **GPT 范式定型**： decoder-only Transformer + 自回归预训练 + 下游微调
- **任务统一接口**：所有 NLU 任务改写成"文本序列 → 标签"，共享同一模型结构
- 12 层 decoder、768 维——当时规模不大，范式意义远超数字

## 3. 方法概要

1. 预训练：BooksCorpus 上做标准语言建模（预测下一 token）
2. 微调：末层接线性头，各任务端到端微调
3. 任务变换： entailment 改三句拼接、分类加定界符、QA 抽 span——全部塞进一个序列模板
4. 辅助目标：微调时保留 LM 损失（帮助收敛）

## 4. 核心公式

- 自回归似然 $\log p(x) = \sum_t \log p(x_t \mid x_{<t})$（[[30-Formulas/注意力核心公式]] 因果版为架构载体）

## 5. 与前作的关系

- 组合了 [[10-Papers/01-架构演进/Attention Is All You Need（Transformer）]]（架构）与 [ULMFiT 的预训练-微调思想]（范式），选生成式而非 ELMo 的特征式
- 与 [[10-Papers/01-架构演进/BERT- Pre-training of Deep Bidirectional Transformers for Language Understanding（BERT）]]（同年稍后）构成"NLU 双解"：GPT 单向深挖生成、BERT 双向深挖理解

## 6. 影响与后续

- GPT-2（规模+zero-shot）→ [[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]]（规模+ICL）→ ChatGPT 整条血脉
- "decoder-only + 自回归"最终成为 LLM 事实标准（BERT 路线后式微）
- 来源说明：本文从未上 arXiv，PDF 从 OpenAI 官方 CDN 下载（见 [[00-Meta/论文来源策略]] 案例1）

## 7. 读前须知

[[20-Algorithms/Transformer]]、[[30-Formulas/注意力核心公式]]
