---
type: paper
title: Spectral Normalization for Generative Adversarial Networks
aliases: [SNGAN]
year: 2018
authors: [Miyato et al.]
venue: ICLR 2018
arxiv: "1802.05957"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [对抗, 像素空间, 对抗(矩匹配)]
tags: [paper]
---

# SNGAN

## 1. 一句话贡献

谱归一化：用最大奇异值约束判别器 Lipschitz——权重矩阵的幂迭代软约束（[[Wasserstein GAN（WGAN）|WGAN]]-GP 的竞争对手）。

## 2. 核心贡献

1. 每层权重除以谱范数（幂迭代估计 σ_max）

## 3. 方法概要

每层权重除以谱范数（幂迭代估计 σ_max）；训练中动态归一。
## 4. 核心公式


$$
\bar W_{\text{SN}}(W) = W / \sigma(W),\ \sigma \approx \text{power iteration}
$$


**直觉**：← [[Improved Training of Wasserstein GANs（WGAN-GP）]]（本批）；Lipschitz 约束两条路（梯度惩罚 vs 谱归一）——软硬对偶共振的又一实例

## 5. 与前作/矩阵关系

归一化思想反向流入 [[Generative Adversarial Networks（GAN）|GAN]] 稳定化的代表；StyleGAN 系的基础件之一

## 6. 影响后续

需要：幂迭代直觉（最大奇异方向放大）

## 7. 读前须知

undefined

> 近邻同族：[[Analyzing and Improving the Image Quality of StyleGAN（StyleGAN2）]] · [[Generative Adversarial Networks（GAN）]]

> 数学根基：[[梯度惩罚]] · [[谱归一化]] · [[Wasserstein距离]] · [[Lipschitz连续]]
