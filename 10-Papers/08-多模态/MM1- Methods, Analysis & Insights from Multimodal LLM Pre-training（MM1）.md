---
type: paper
title: MM1- Methods, Analysis & Insights from Multimodal LLM Pre-training
aliases: [MM1]
year: 2024
authors: [Apple]
venue: arXiv 2024
arxiv: "2403.09611"
pdf: 已下载（PDF/）
line: 多模态
matrix_coords: [投影接口, 生成(条件LM), 接口级]
tags: [paper]
---

# MM1

## 1. 一句话贡献

多模态预训练的消融百科（30B 规模扫全因子）：冻结 vs 联训编码器、混合粒度 token、数据配比——"怎么搭 VLM"的配方地图。

## 2. 核心贡献

1. 系统消融（编码器学习率/分辨率/数据阶段/LOSS 配比）
2. 结论：混合分辨率+图文交替数据最关键

## 3. 方法概要

系统消融（编码器学习率/分辨率/数据阶段/LOSS 配比）；结论：混合分辨率+图文交替数据最关键。
## 4. 核心公式


$$
\text{多阶段}: \text{lock-image}\ \text{pretrain}\ \to\ \text{joint}\ \text{finetune}
$$


**直觉**：→ 多模态矩阵投影行的配方参考；↔ [[Visual Instruction Tuning（LLaVA）|LLaVA]]（库内，轻配方）与 MM1（重消融）互补

## 5. 与前作/矩阵关系

VLM 训练配方的公开参考标准（Apple 的开放代表作之一）

## 6. 影响后续

无新数学；消融方法论参考

## 7. 读前须知

undefined

> 近邻同族：[[BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]] · [[Flamingo- a Visual Language Model for Few-Shot Learning（Flamingo）]]

> 数学根基：[[三层感知机投影]] · [[CLIP对比损失]] · [[注意力核心公式]]
