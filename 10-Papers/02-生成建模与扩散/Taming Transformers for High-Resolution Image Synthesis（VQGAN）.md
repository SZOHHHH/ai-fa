---
type: paper
title: Taming Transformers for High-Resolution Image Synthesis
aliases: [VQGAN, Taming Transformers]
year: 2021
authors: [Patrick Esser, Robin Rombach, Björn Ommer]
venue: CVPR 2021
arxiv: "2012.09841"
line: 生成建模与扩散
matrix_coords: [变分, 离散码本, 对抗(矩匹配)]
tags: [paper]
---

# Taming Transformers（VQGAN）

## 1. 一句话贡献

VQ-[[Auto-Encoding Variational Bayes（VAE）|VAE]] 压缩 + Transformer 在码序列上自回归 = 高分辨率图像生成——"CNN 管压缩、Transformer 管生成"的两阶段范式定型。

## 2. 核心贡献

- **感知损失**：L1/L2 换成 LPIPS——重建目标从"像素像"变"看起来像"
- **Transformer 先验**：码序列的自回归建模，可加条件（分割图、文本）
- **高频细节借力**：码空间只管语义布局，细节由解码器超分

## 3. 方法概要

1. 训练 VQGAN：VQ-VAE + 感知损失 + 对抗损失（判别器逼解码器出真纹理）
2. 训练 Transformer：在码序列上做 next-token 预测（可条件）
3. 生成：Transformer 逐 token 采样 → 码序列 → 解码器解码
4. 滑窗推理突破训练分辨率限制

## 4. 核心公式

- [[30-Formulas/VQ-VAE目标]]（量化损失骨架）+ 感知/对抗项
- [[Generative Adversarial Networks（GAN）]]（判别器部分）

## 5. 与前作的关系

- 扩展了 [[10-Papers/02-生成建模与扩散/Neural Discrete Representation Learning（VQ-VAE）]]：+感知损失 +Transformer 先验
- 组合了 [ViT/Transformer 架构线] 与 [VQ 压缩线]（线 1 交叉）

## 6. 影响与后续

- 作者同一团队的 [[High-Resolution Image Synthesis with Latent Diffusion Models（LDM）|LDM]] 直接继承其压缩器
- 奠基了 DALL·E、Parti 系列与视频 tokenizer 路线（多模态线交叉）
- "压缩器 + 生成先验"的两阶段思想成为整个 AIGC 时代的结构模板

## 7. 读前须知

[[30-Formulas/VQ-VAE目标]]、[[40-Concepts/期望]]（自回归似然）、[[20-Algorithms/生成对抗网络]]（对抗损失部分）
