---
type: paper
title: Stability-Plasticity Balance via Singular-Vector Selection in LLM Continual Learning
aliases: []
year: 2026
authors: [Lingxiang, Wang]
venue: 待核（占位层，来自 arXiv 2026-10-08）
arxiv: "2610.11076v1"
pdf: https://arxiv.org/pdf/2610.11076v1
line: 架构演进
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Stability-Plasticity Balance via Singular-Vector Selection in LLM Continual Learning

> **占位层卡**（daily 自动采集 2026-10-12 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Domain-specific continual adaptation of LLMs risks catastrophic forgetting, creating a fundamental tension between acquiring new capabilities and preserving those learned during pretraining. PEFT mitigates this problem by restricting the number of trainable parameters, but existing methods lack a principled unit for deciding where plasticity should be allocated and stability should be preserved. We identify the singular-vector channel as a natural unit for managing this trade-off. Each channel represents an input-output transformation, which can be updated to acquire new knowledge or fixed to 

## 1. 一句话贡献
给持续学习 PEFT 找到"可塑性往哪儿放"的原则性单元——奇异向量通道（权重 SVD 后的每个输入-输出变换单元）：训练前用领域数据估计每通道的适应收益、用固定公开通用语料作历史激活代理估计遗忘代价，经 knee 成本筛选+Pareto 前沿过滤+Otsu 阈值选出可训练通道，SVC 在 4 个 LLM 家族 8 任务上保持预训练能力优于现有 PEFT 基线。

## 2. 核心贡献
- （占位层，待精读补充）

## 3. 方法概要
（占位层，待精读补充）

## 4. 核心公式
（占位层，待精读补充）

## 5. 与前作/矩阵关系
- 公式锚：[LoRA分解](/ai-fa/explore/30-Formulas/LoRA分解)（同在低秩/SVD 子空间分配可塑性）· [注意力核心公式](/ai-fa/explore/30-Formulas/注意力核心公式)
- 概念锚：[低秩分解](/ai-fa/explore/40-Concepts/低秩分解) · [特征值与特征向量](/ai-fa/explore/40-Concepts/特征值与特征向量)（奇异向量通道的数学母体）· [Transformer](/ai-fa/explore/20-Algorithms/Transformer)
- 同日同主题互链：[Where to Adapt Matters](/ai-fa/explore/10-Papers/01-架构演进/Where to Adapt Matters Layer-Selective Fine-Tuning for Capability Retention)（层粒度 vs 奇异向量通道粒度的稳定-可塑性分配）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.11076v1；在线全文（新论文）：https://arxiv.org/html/2610.11076v1
