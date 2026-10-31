---
type: paper
title: "Mix Forcing: Causal Pre-Training via Mixture Attention for Interactive World Models"
aliases: []
year: 2026
authors: [Zelin, Gao]
venue: 待核（占位层，来自 arXiv 2026-10-24）
arxiv: "2610.33589v1"
pdf: https://arxiv.org/pdf/2610.33589v1
line: 生成建模与扩散
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Mix Forcing: Causal Pre-Training via Mixture Attention for Interactive World Models

> **占位层卡**（daily 自动采集 2026-10-27 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：While interactive video world models require autoregressive generation, directly adapting pretrained bidirectional video diffusion models into autoregressive ones with teacher forcing can disrupt their visual priors and degrade autoregressive generation quality. In this paper, we introduce Mix Forcing, a causal pre-training paradigm for interactive video world models, implemented with the Mixture-of-Bidirectional-and-Autoregressive (MoBA) attention. Mix Forcing jointly trains a video diffusion model with both teacher forcing and bidirectional training, yielding a strong causal initialization f

## 1. 一句话贡献

交互视频世界模型的**因果预训练范式**：直接把预训练双向视频扩散改教师强制自回归会毁视觉先验，Mix Forcing 用「双向+自回归混合注意力（MoBA）」联合训练——教师强制学逐块因果预测、双向注意力保住预训练先验，分块交叉注意力支持在线文本交互；14B 图生视频底座上经一致性+DMD 蒸馏得 4 步自回归生成器，一小时长程 rollout 无质量衰减。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← 思想源 [[10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）|Diffusion Forcing]]（逐块独立噪声框架）
- → 直接对标 [[10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）|Causal Forcing]]：同问「双向预训练→AR 怎么不毁先验」——CF 走蒸馏期 AR teacher ODE 初始化，本文走预训练期混合注意力（双向+自回归并存：教师强制学因果逐块预测、双向保先验）
- 数学链 [[30-Formulas/逐token独立噪声]] · [[40-Concepts/KV缓存]]（AR rollout 载体）· [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）|一致性模型]]+[[10-Papers/02-生成建模与扩散/Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）|DMD2]]（后训练两件套：一致性+DMD→4 步）
- ⚠ 缩写撞名警示：本文 MoBA=Mixture-of-Bidirectional-and-Autoregressive attention，≠ [[10-Papers/06-长上下文/MoBA- Mixture of Block Attention for Long-Context LLMs（MoBA）|06 线 MoBA]]（块注意力，同名不同义）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.33589v1；在线全文（新论文）：https://arxiv.org/html/2610.33589v1
