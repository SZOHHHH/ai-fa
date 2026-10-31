---
type: paper
title: "S$^2$-RL: Sample-Set Dual Reinforcement Learning for Generative Semantic Segmentation Dataset Distillation"
aliases: []
year: 2026
authors: [Haoyu, Wang]
venue: 待核（占位层，来自 arXiv 2026-10-26）
arxiv: "2610.35491v1"
pdf: https://arxiv.org/pdf/2610.35491v1
line: 生成建模与扩散
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# S$^2$-RL: Sample-Set Dual Reinforcement Learning for Generative Semantic Segmentation Dataset Distillation

> **占位层卡**（daily 自动采集 2026-10-27 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：While dataset distillation has witnessed significant advances in image classification, its extension to dense prediction tasks such as semantic segmentation is plagued by two core bottlenecks: bi-level optimization-based approaches suffer from prohibitive computational costs stemming from pixel-wise gradient unrolling, whereas proxy-based generative methods merely infuse visual textures into fixed semantic masks derived from real data, thus failing to condense rich semantic knowledge into a compact set of informative, novel scene generations. To address both bottlenecks simultaneously, we prop

## 1. 一句话贡献

语义分割数据集蒸馏（SSDD）的 RL 化：把「生成带信息量、新语义分布的合成样本」交给扩散文生图+GRPO 微调——单样本级奖励对齐文本语义+类内特征多样性，样本集级把「集间语义分布多样性」建成上下文多臂老虎机问题求解，免像素级梯度展开，ADE20K/COCO 大幅超 SOTA。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ↔ 工具链 [[20-Algorithms/GRPO与RLVR]] · [[30-Formulas/GRPO目标]]（GRPO 策略优化引擎）· [[20-Algorithms/扩散模型]]（文生图底座）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.35491v1；在线全文（新论文）：https://arxiv.org/html/2610.35491v1
