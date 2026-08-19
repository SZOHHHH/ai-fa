---
type: paper
title: High-Resolution Image Synthesis with Latent Diffusion Models
aliases: [LDM, Stable Diffusion, Latent Diffusion]
year: 2022
authors: [Robin Rombach, Andreas Blattmann, Dominik Lorenz, Patrick Esser, Björn Ommer]
venue: CVPR 2022
arxiv: "2112.10752"
line: 生成建模与扩散
matrix_coords: [扩散/score, 潜空间, score匹配]
tags: [paper]
---

# Latent Diffusion Models（LDM / Stable Diffusion）

## 1. 一句话贡献

把扩散搬进自编码器的潜空间（8× 下采样），训练/推理成本骤降一到两个数量级——AIGC 民主化的直接推手。

## 2. 核心贡献

- **两阶段范式**：感知压缩（AE）+ 生成建模（潜扩散）解耦
- **Cross-attention 条件注入**：文本/布局等任意模态统一进 U-Net
- **实用证明**：消费级 GPU 文生图可行 → Stable Diffusion 开源生态引爆

## 3. 方法概要

1. 训练自编码器（KL 正则或 VQ）：$\mathcal{E}, \mathcal{D}$，下采样 $f=8$
2. 冻结 AE，在 $z=\mathcal{E}(x)$ 上训练条件 DDPM（损失与 DDPM 相同）
3. 条件 $c$（[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]] 文本嵌入等）经 cross-attention 层注入 U-Net
4. 采样：潜空间跑 DDIM/祖先采样 → $\mathcal{D}$ 解码回像素
5. CFG 引导文本控制（推理时双倍前向）

## 4. 核心公式

- [[30-Formulas/DDPM训练目标]]（z 空间版）
- [[30-Formulas/无分类器引导（CFG）]]（条件外推）
- 压缩器理论根基：[[30-Formulas/ELBO目标]] / [[Auto-Encoding Variational Bayes（VAE）]]

## 5. 与前作的关系

- 组合了 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]]（扩散）与 [自编码器]（压缩）
- 继承了 [[10-Papers/02-生成建模与扩散/Taming Transformers for High-Resolution Image Synthesis（VQGAN）]] 的压缩器思想（同一作者团队）
- 采样端复用 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Implicit Models（DDIM）]] 少步技术

## 6. 影响与后续

- 直接催生 Stable Diffusion 全家桶与整个开源 AIGC 生态
- 被 [[Scalable Diffusion Models with Transformers（DiT）|DiT]] 换骨干进一步规模化（SD3/Sora 同构）
- 视频生成（Sora 系）沿用"潜空间 + DiT"配方

## 7. 读前须知

[[20-Algorithms/扩散模型]]、[[20-Algorithms/潜在扩散模型（LDM）]]、[[30-Formulas/无分类器引导（CFG）]]、[[40-Concepts/采样器]]
