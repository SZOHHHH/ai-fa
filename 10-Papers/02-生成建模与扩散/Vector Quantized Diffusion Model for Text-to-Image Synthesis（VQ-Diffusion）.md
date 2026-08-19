---
type: paper
title: Vector Quantized Diffusion Model for Text-to-Image Synthesis
aliases: [VQ-Diffusion]
year: 2022
authors: [Gu et al.]
venue: CVPR 2022
arxiv: "2111.14822"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [变分, 离散码本, 扩散离散化]
tags: [paper]
---

# VQ-Diffusion

## 1. 一句话贡献

离散 token 上的扩散：VQ 码本+离散转移矩阵去噪——离散扩散谱系的早期代表。

## 2. 核心贡献

1. 每步翻转离散 token 概率（转移矩阵=离散版"加噪"）
2. 掩码与离散扩散的分野案例

## 3. 方法概要

每步翻转离散 token 概率（转移矩阵=离散版"加噪"）；掩码与离散扩散的分野案例。
## 4. 核心公式


$$
q(x_t \mid x_0)\ \text{为离散转移矩阵},\ p_\theta(x_{t-1} \mid x_t)\ \text{分类分布}
$$


**直觉**：↔ MaskGIT/VQGAN；→ D3PM（离散扩散理论化）；流×离散机会格的谱系背景

## 5. 与前作/矩阵关系

离散生成三路线的扩散离散化极

## 6. 影响后续

需要：离散扩散的"噪声"概念（类别转移而非高斯）

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）

> 近邻同族：[[Auto-Encoding Variational Bayes（VAE）]] · [[MaskGIT- A Masked Generative Image Transformer（MaskGIT）]]

> 数学根基：[[概率分布]]

> 数学根基：[[VQ-VAE目标]] · [[条件流匹配损失]]
