---
type: paper
title: Do Recommenders Need to Think in Words? Latent Reasoning for Efficient LLM-Based Recommendation
aliases: []
year: 2026
authors: [Hongyang, Su]
venue: 待核（占位层，来自 arXiv 2026-11-05）
arxiv: "2611.07866v1"
pdf: https://arxiv.org/pdf/2611.07866v1
line: 推理模型
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Do Recommenders Need to Think in Words? Latent Reasoning for Efficient LLM-Based Recommendation

> **占位层卡**（daily 自动采集 2026-11-08 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：LLM-based recommender systems increasingly generate chain-of-thought (CoT) text before each item prediction to activate the LLM's reasoning capacity, costing tens to hundreds of extra tokens per recommendation at inference. We ask whether inference-time reasoning artifacts (textual or latent) can be replaced by training-time supervision alone, without loss of accuracy. We propose LatentRec, a framework for LLM-based generative recommendation that replaces inference-time reasoning artifacts with training-time per-step head supervision. LatentRec has three components. A 2.5M-parameter Continuous

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← 问题谱系：[[40-Concepts/思维链（CoT）]] 推理时生成太贵 → 问"推理痕迹能否全部蒸进训练"
- ≡ 潜在推理过程监督同族：[[10-Papers/07-推理模型/Structural Process Supervision for Latent Chain-of-Thought Reasoning（PMPS）|PMPS]]（潜空间 CoT 的逐步监督——Per-step Reasoning Loss 同概念位）、[[10-Papers/07-推理模型/From Chain-of-Thought to Loops Non-Autoregressive Latent Reasoning via Looped Transformers|CoT-to-Loops]] / [[10-Papers/07-推理模型/Think Wider - Mitigating Latent Rank Collapse in Implicit Chain-of-Thought Reasoning（WIDER）|WIDER]]（implicit CoT 几何线）
- ≡ 同日对照：[[10-Papers/07-推理模型/Towards Foundation Decision Models Drex|Drex]]（同为"去推理时自回归生成"——Drex 改输出头，LatentRec 把推理蒸馏进训练监督、部署时整个丢模块）
- ⊃ 机制工具：[[40-Concepts/知识蒸馏]]（训练时逐步监督替代推理时生成=一次性付费）· 2.5M 连续思维模块+软 token 选择桥接隐状态/嵌入 14× 范数差

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.07866v1；在线全文（新论文）：https://arxiv.org/html/2611.07866v1
