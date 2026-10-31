---
type: paper
title: "AQL-Lite: Enabling Efficient Knowledge Acquisition for Arabic LLMs via Data-Centric Continual Pretraining"
aliases: [AQL-Lite]
year: 2026
authors: [Houssam Eddine Boukhalfa, et al.]
venue: arXiv 2026
arxiv: "2610.30344v1"
pdf: https://arxiv.org/pdf/2610.30344v1
line: 架构演进
matrix_coords: [数据工程, 持续预训练, 多语言LLM]
tags: [paper]
---
# AQL-Lite: 面向阿拉伯语 LLM 的数据中心持续预训练

> 261026 升级（在线全文目录+摘要）。

## 1. 一句话贡献
把多语言 LLM 高效适配到现代标准阿拉伯语（MSA）：**质量优先的数据管线**（结构清洗/启发式+模型过滤/MSA 选择/去重）**+ 部分参数持续预训练**（RS-LoRA 适配器全网 + 解冻最后 8 个 transformer block 与 embedding），省时省资源。

## 2. 核心贡献
- 五阶段数据管线应对阿拉伯语噪声网页数据与方言变异（含 MSA vs 方言分类器、模型打分质检、精确+近似去重）。
- 部分参数 CPT 配方：RS-LoRA + 尾部 block 解冻 + embedding 训练 + 分层学习率，在算力与适配质量间取中点。
- 结论：**数据精选（curation）比语料规模更决定知识获取效率**。

## 3. 方法概要
1. 语料清洗过滤（结构→启发式→模型分→MSA 选择→去重）；2. 部分参数 CPT（RS-LoRA 稳定低秩更新 + 尾部全秩解冻 + embedding）；3. 对齐与安全层（推理时安全分类器）。

## 4. 核心公式
（工程配方文；数学核心为 RS-LoRA：$W' = W + \alpha/\sqrt{r}\,\cdot B A$ 的稳定缩放变体——细节见 [[40-Concepts/低秩分解]]。）

## 5. 与前作/矩阵关系
- ← 方法地基：[[20-Algorithms/参数高效微调（PEFT）]]（LoRA/RS-LoRA 家族）· [[40-Concepts/低秩分解]]（低秩更新的数学基础）
- ← 载体：[[20-Algorithms/Transformer]]（解冻尾部 block 的对象）

## 6. 影响后续
- "数据质量 > 数据规模"的又一实证（小语种适配场景）；部分参数 CPT 是全量续训与纯 LoRA 之间的实用中点。
- 与库内主线无直接交集，多语言/数据工程背景卡。

## 7. 读前须知
- [[20-Algorithms/参数高效微调（PEFT）]]（LoRA→RS-LoRA 谱系）；概念：持续预训练（CPT）、灾难性遗忘、MSA 与方言差异。
