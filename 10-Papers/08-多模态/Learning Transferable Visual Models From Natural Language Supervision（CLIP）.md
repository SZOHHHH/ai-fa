---
type: paper
title: Learning Transferable Visual Models From Natural Language Supervision
aliases: [CLIP]
year: 2021
authors: [Alec Radford, Jong Wook Kim, Chris Hallacy, et al.]
venue: ICML 2021
arxiv: "2103.00020"
line: 多模态
matrix_coords: [对比接口, 对比(InfoNCE), 接口级]
tags: [paper]
---

# CLIP

## 1. 一句话贡献

4 亿网络图文对 + 双塔对比学习——图像和文本进同一语义空间，零样本分类成为现实，多模态时代的地基。

## 2. 核心贡献

- **对比对齐**：[[30-Formulas/CLIP对比损失]]（图-文双向 InfoNCE）
- **零样本迁移**：类别名当文本 prompt，免训练分类 30+ 数据集
- **自然语言监督**：替代标签——"监督信号藏在网络里"

## 3. 方法概要

1. 图像编码器（[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）|ViT]]/ResNet）与文本编码器（Transformer）分别编码
2. 批内构造 N×N 相似度矩阵，对角线为正样本
3. 对称交叉熵拉近配对、推远其余
4. 训练后：任意图像+任意文本 → 余弦相似度

## 4. 核心公式

- [[30-Formulas/CLIP对比损失]] —— 本文灵魂

## 5. 与前作的关系

- 改进了 [VirTex（图 caption 生成）]：生成 → 对比（对齐更高效）
- 与 [[10-Papers/08-多模态/Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision（ALIGN）]] 同年互证（数据规模路线）

## 6. 影响与后续

- SD/DALL·E 2 的文本编码器；OpenCLIP 生态
- 零样本评测范式；多模态检索标配
- CLIP 维度成为事实接口（无数下游吃 CLIP 嵌入）

## 7. 读前须知

[[40-Concepts/内积]]、[[40-Concepts/softmax函数]]、[[40-Concepts/温度参数]]、[[10-Papers/01-架构演进/An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]]

> 谱系成员（20）：[[BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]] · [[Chameleon- Mixed-Modal Early-Fusion Foundation Models（Chameleon）]] · [[Emu3- Next-Token Prediction is All You Need（Emu3）]] · [[Flamingo- a Visual Language Model for Few-Shot Learning（Flamingo）]] · [[Grad-CAM- Visual Explanations from Deep Networks via Gradient-based Localization（Grad-CAM）]] · [[Improved Baselines with Visual Instruction Tuning（LLaVA-1.5）]] · [[LiT- Zero-Shot Transfer with Locked-image text Tuning（LiT）]] · [[MiniGPT-4- Enhancing Vision-Language Understanding with Advanced Large Language Models（MiniGPT-4）]] · [[MM1- Methods, Analysis & Insights from Multimodal LLM Pre-training（MM1）]] · [[Qwen-VL- A Versatile Vision-Language Model for Understanding, Localization, Text Reading, and Beyond（Qwen-VL）]] · [[Robust Speech Recognition via Large-Scale Weak Supervision（Whisper）]] · [[Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision（ALIGN）]] · …等 20 篇
