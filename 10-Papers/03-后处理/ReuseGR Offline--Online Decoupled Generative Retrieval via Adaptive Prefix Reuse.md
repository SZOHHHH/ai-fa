---
type: paper
title: "ReuseGR: Offline--Online Decoupled Generative Retrieval via Adaptive Prefix Reuse"
aliases: []
year: 2026
authors: [Xujing, Wang]
venue: 待核（占位层，来自 arXiv 2026-11-03）
arxiv: "2611.04259v1"
pdf: https://arxiv.org/pdf/2611.04259v1
line: 后处理
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# ReuseGR: Offline--Online Decoupled Generative Retrieval via Adaptive Prefix Reuse

> **占位层卡**（daily 自动采集 2026-11-05 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Larger generative retrieval models can improve retrieval quality, but their decoding cost makes low-latency serving difficult. When different users submit the same query, generating complete Semantic IDs (SIDs) for every request repeats computation, while their interaction histories call for different results. The challenge is to reuse large-model computation across requests while keeping retrieval personalized. We propose \textbf{ReuseGR}, which separates query-level candidate planning from request-level personalized completion. A 7B offline planner generates SID prefix sets shared across req

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← [[10-Papers/03-后处理/Prefix-Tuning- Optimizing Continuous Prompts for Generation（Prefix-Tuning）|Prefix-Tuning]]（前缀作为可复用计算单元的前身）；↔ 同族 [[10-Papers/03-后处理/KIVI- A Tuning-Free Asymmetric 2bit Quantization for KV Cache（KIVI）|KIVI]]（都在"KV/前缀缓存省算力"——它压精度，本文按查询粒度共享前缀）
- 概念/算法链：[[40-Concepts/知识蒸馏]]（Path KD：路径级蒸馏 7B→0.5B+on-policy 蒸馏初始化）· [[40-Concepts/KV缓存]]（前缀复用的缓存视角）· [[20-Algorithms/GRPO与RLVR]]（BudgetCut 选择策略的 GRPO 精化）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.04259v1；在线全文（新论文）：https://arxiv.org/html/2611.04259v1
