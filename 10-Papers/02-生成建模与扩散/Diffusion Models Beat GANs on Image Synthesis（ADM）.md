---
type: paper
title: Diffusion Models Beat GANs on Image Synthesis
aliases: [ADM, Beat GANs, Classifier Guidance]
year: 2021
authors: [Prafulla Dhariwal, Alexander Quinn Nichol]
venue: NeurIPS 2021
arxiv: "2105.05233"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, score匹配]
tags: [paper]
---

# Diffusion Models Beat GANs（分类器引导 ADM）

## 1. 一句话贡献

系统改进扩散架构（多分辨率注意力等）并引入分类器引导，首次全面反超 [[Generative Adversarial Networks（GAN）|GAN]]——扩散加冕之战。

## 2. 核心贡献

- **架构消融**：多头注意力位置、BigGAN 残差块上采样——U-Net 细节定调
- **分类器引导**：$\hat\epsilon = \epsilon_\theta - \sqrt{1-\bar\alpha_t}\,\nabla_{x_t}\log p_\phi(y\mid x_t)$——条件信息以梯度注入采样
- **精度-召回权衡**：引导强度可控（代价：多样性）
- FID 全面击败 StyleGAN2/BigGAN

## 3. 方法概要

1. 训练更大更深的 U-Net（ADM 架构）
2. 另训一个噪声版分类器 $p_\phi(y \mid x_t)$
3. 采样时每步把分类器梯度加进噪声预测（引导往类 $y$ 走）
4. 引导尺度扫出精度-召回曲线，按需选点

## 4. 核心公式

- [[30-Formulas/无分类器引导（CFG）]] §2 的"分类器引导"行（本文前身）
- 架构侧复用 [[30-Formulas/DDPM训练目标]]

## 5. 与前作的关系

- 扩展了 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]] 与 [[10-Papers/02-生成建模与扩散/Improved Denoising Diffusion Probabilistic Models（iDDPM）]]（同团队延续）
- 对比 [[10-Papers/02-生成建模与扩散/Generative Adversarial Networks（GAN）]]：宣告范式交替

## 6. 影响与后续

- 引导思想被 [[10-Papers/02-生成建模与扩散/Classifier-Free Diffusion Guidance（CFG）]] 去分类器化，成为标配
- ADM 架构是后续 U-Net 扩散的标准参考实现

## 7. 读前须知

[[30-Formulas/DDPM训练目标]]、[[40-Concepts/梯度]]、[[40-Concepts/概率分布]]（精度-召回即分布形状权衡）
