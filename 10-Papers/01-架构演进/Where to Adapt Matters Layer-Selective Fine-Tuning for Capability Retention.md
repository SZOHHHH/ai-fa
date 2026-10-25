---
type: paper
title: "Where to Adapt Matters: Layer-Selective Fine-Tuning for Capability Retention"
aliases: []
year: 2026
authors: [Zhiqiang, Pang]
venue: 待核（占位层，来自 arXiv 2026-10-08）
arxiv: "2610.11620v1"
pdf: https://arxiv.org/pdf/2610.11620v1
line: 架构演进
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Where to Adapt Matters: Layer-Selective Fine-Tuning for Capability Retention

> **占位层卡**（daily 自动采集 2026-10-12 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Parameter-efficient fine-tuning (PEFT) enables large language models (LLMs) to adapt to specialized tasks, but often at the cost of degrading general capabilities acquired during pretraining. Existing approaches primarily mitigate this trade-off through data replay or regularization, relying on additional data or explicit optimization constraints. We instead focus on a different question: where should adaptation be applied? We find that fine-tuning different Transformer layers produces different target-task gains and degrees of capability degradation, suggesting that not all layers are equally

## 1. 一句话贡献
回答"适配应该放在哪一层"：不同 Transformer 层的微调收益与通用能力损伤差异巨大，用层间经验 Fisher 信息度量任务敏感度太贵（需反向传播），改用只用前向的输入-输出余弦相似度作轻量代理（低相似层=Fisher 高），据此提出 LS-LoRA——只在低相似层放 LoRA 适配器——目标性能不降的同时通用能力保留显著优于全层 LoRA。

## 2. 核心贡献
- （占位层，待精读补充）

## 3. 方法概要
（占位层，待精读补充）

## 4. 核心公式
（占位层，待精读补充）

## 5. 与前作/矩阵关系
- 公式锚：[[30-Formulas/LoRA分解]]（LS-LoRA 即"选层放置"的 LoRA）· [[30-Formulas/注意力核心公式]]
- 概念锚：[[40-Concepts/低秩分解]] · [[20-Algorithms/Transformer]]
- 同族（层选择话题）：[[10-Papers/01-架构演进/LayerCheck Adaptive Layer-wise Checkpointing for Large Language Model Post-training|LayerCheck]]（层粒度资源分配近邻）；同日同主题互链：[[10-Papers/01-架构演进/Stability-Plasticity Balance via Singular-Vector Selection in LLM Continual Learning|SVC]]（一个选"哪些层"、一个选"哪些奇异向量通道"）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.11620v1；在线全文（新论文）：https://arxiv.org/html/2610.11620v1
