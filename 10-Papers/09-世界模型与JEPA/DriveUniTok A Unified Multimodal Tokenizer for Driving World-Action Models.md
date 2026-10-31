---
type: paper
title: "DriveUniTok: A Unified Multimodal Tokenizer for Driving World-Action Models"
aliases: []
year: 2026
authors: [Jingbo, Xu]
venue: 待核（占位层，来自 arXiv 2026-10-26）
arxiv: "2610.35044v1"
pdf: https://arxiv.org/pdf/2610.35044v1
line: 世界模型与JEPA
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# DriveUniTok: A Unified Multimodal Tokenizer for Driving World-Action Models

> **占位层卡**（daily 自动采集 2026-10-27 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：World models are emerging as a fundamental component of policy learning for real-world agents, enabling agents to predict future world states and plan actions within a learned representation of the dynamic environment. Existing approaches, however, often model appearance, metric geometry represented by projected LiDAR depth, and ego motion either partially or independently, overlooking the fact that these modalities are different projections of a shared underlying world state. This separation can lead to information loss and cross-modal inconsistency, ultimately limiting downstream performance

## 1. 一句话贡献

驾驶「世界-动作模型（WAM）」的统一多模态 tokenizer：把外观、投影 LiDAR 深度、自车轨迹（视为同一世界状态的三种投影）编码进**单一可解码的连续 latent**，冻结后让预训练扩散模型 DriveUniWAM 在 latent 空间预测未来再解码回三模态——NAVSIM 上未来预测与规划性能更好且下游算力更低，RL 后训练 PDMS 91.54 达 WAM 规划器 SOTA。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ⊃ 统一表征路线：外观+投影 LiDAR 深度+自车轨迹（同一世界状态的三种投影）压进单一可解码连续 latent——对立于分路建模的信息丢失与跨模态不一致；tokenizer 冻结、扩散模型在 latent 空间预测未来
- ≡ 同域家族 [[10-Papers/02-生成建模与扩散/HelloWorld Towards Practical Applications of Generative Driving World Models|HelloWorld]]（驾驶生成 WM 系统：20→4 步蒸馏、评测无决策闭环指标）· [[10-Papers/02-生成建模与扩散/AlayaVista Streaming World Modeling from Panoramic States to Perspective Video|AlayaVista]]（驾驶流式 WM）
- ↔ 数学根基 [[30-Formulas/VQ-VAE目标]]（tokenizer 目标的连续 latent 对偶物）· [[20-Algorithms/世界模型]]（WAM=世界模型×动作联合建模）· [[20-Algorithms/扩散模型]]

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.35044v1；在线全文（新论文）：https://arxiv.org/html/2610.35044v1
