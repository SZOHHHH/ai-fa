---
type: paper
title: BLIP-2 - Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models
aliases: [BLIP-2, Q-Former]
year: 2023
authors: [Junnan Li, Dongxu Li, Silvio Savarese, Steven Hoi]
venue: ICML 2023
arxiv: "2301.12597"
line: 多模态
matrix_coords: [投影接口, 生成(条件LM), 接口级]
tags: [paper]
---

# BLIP-2（Q-Former）

## 1. 一句话贡献

Q-Former 桥接器：32 个可学查询向量从冻结视觉编码器"抽取"特征、对齐冻结 LLM——训练成本降一个数量级的模块化 VLM。

## 2. 核心贡献

- **Q-Former**：查询塔（[[40-Concepts/注意力机制]] 的 cross-attn）压缩任意视觉特征到固定 32 token
- **两阶段训练**：表征学习（对比+匹配+生成三目标）→ 生成学习（对齐 LLM）
- **冻结双塔**：视觉与语言模型都不动——只训桥

## 3. 方法概要

1. 32 个查询向量 cross-attend 到 [[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）|ViT]] 特征
2. 阶段一：图文对比/匹配/文本生成三任务联合
3. 阶段二：Q-Former 输出接 LLM（生成式对齐）
4. VQA/caption 零样本优异

## 4. 核心公式

- 查询塔的 cross-attention（结构公式）；信息瓶颈到 32 token

## 5. 与前作的关系

- 改进了 BLIP-1（自身前作）与 [[10-Papers/08-多模态/Flamingo- a Visual Language Model for Few-Shot Learning（Flamingo）]]（Flamingo 插层多、BLIP-2 抽取少）
- 对比 [[Visual Instruction Tuning（LLaVA）|LLaVA]]：复杂桥 vs 简单投影——后来简洁胜出

## 6. 影响与后续

- "冻结大模型+轻桥"的训练经济学模板
- Q-Former 被视频/3D 多模态广泛复用

## 7. 读前须知

[[40-Concepts/视觉语言模型（VLM）]]、[[40-Concepts/注意力机制]]

> 相关：[[Toolformer- Language Models Can Teach Themselves to Use Tools（Toolformer）]]

> 相关：[[VICReg- Variance-Invariance-Covariance Regularization for Self-Supervised Learning（VICReg）]]

> 相关：[[Video Language Planning（VLP）]]

> 相关：[[VL-JEPA- Joint Embedding Predictive Architecture for Vision-language（VL-JEPA）]]

> 相关：[[WaveNet- A Generative Model for Raw Audio（WaveNet）]]

> 数学根基：[[三层感知机投影]] · [[CLIP对比损失]] · [[注意力核心公式]]
