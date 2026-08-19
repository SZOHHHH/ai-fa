---
type: paper
title: Generative Adversarial Networks
aliases: [GAN, Goodfellow GAN]
year: 2014
authors: [Ian J. Goodfellow, Jean Pouget-Abadie, Mehdi Mirza, Bing Xu, David Warde-Farley, Sherjil Ozair, Aaron Courville, Yoshua Bengio]
venue: NeurIPS 2014
arxiv: "1406.2661"
line: 生成建模与扩散
matrix_coords: [对抗, 像素空间, 对抗(矩匹配)]
tags: [paper]
---

# Generative Adversarial Networks（GAN）

## 1. 一句话贡献

让生成器与判别器对抗博弈，无需显式密度/马尔可夫链即可训练生成模型——深度生成模型最著名的范式之一。

## 2. 核心贡献

- **对抗框架**：$\min_G \max_D$ 把"拟合分布"转成"两人零和博弈"
- **免配分函数**：绕开 [[40-Concepts/能量模型]] 的 $Z$ 灾难，也绕开 ELBO
- **单步生成**：一次前向出图——速度优势保持至今

## 3. 方法概要

1. 判别器 $D$：输入图 → 输出真/假概率，交叉熵训练
2. 生成器 $G$：噪声 $z$ → 假图，目标让 $D$ 判错
3. 交替更新：$D$ 训 $k$ 步、$G$ 训 1 步
4. 理论：$D$ 最优时 $G$ 的梯度指向最小化 JS 散度；全局最优 = 分布重合、$D=1/2$

## 4. 核心公式

- [[30-Formulas/GAN目标]] —— 极小极大目标与非饱和变体
- 均衡等价于 [[40-Concepts/Jensen-Shannon散度]] 最小化

## 5. 与前作的关系

- 对比 [[Auto-Encoding Variational Bayes（VAE）|VAE]]：VAE 走下界（稳但模糊）、GAN 走对抗（锐但不稳）——两大路线分野的起点
- 对比 [深度玻尔兹曼机]：EBM 免采样近似对难以训练 → GAN 完全绕开密度

## 6. 影响与后续

- 被 [[Wasserstein GAN（WGAN）|WGAN]] 改进稳定性
- 奠基了 StyleGAN/BigGAN 等视觉黄金时代；2021 后被 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]] 系反超
- 对抗思想在 [[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]] 中复活

## 7. 读前须知

[[40-Concepts/概率分布]]、[[40-Concepts/Jensen-Shannon散度]]、[[40-Concepts/期望]]、[[40-Concepts/梯度]]（博弈的交替优化）
