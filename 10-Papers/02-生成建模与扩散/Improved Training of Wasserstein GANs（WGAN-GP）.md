---
type: paper
title: Improved Training of Wasserstein GANs
aliases: [WGAN-GP]
year: 2017
authors: [Gulrajani et al. (NYU)]
venue: NeurIPS 2017
arxiv: "1704.00028"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [对抗, 像素空间, 对抗(矩匹配)]
tags: [paper]
---

# [[Wasserstein GAN（WGAN）|WGAN]]-GP

## 1. 一句话贡献

梯度惩罚替代权重裁剪：WGAN 的训练稳定化补丁——Lipschitz 约束的软实现标准。

## 2. 核心贡献

1. 中间点采样插值样本，惩罚梯度范数偏离 1

## 3. 方法概要

中间点采样插值样本，惩罚梯度范数偏离 1。
## 4. 核心公式


$$
\mathcal{L} = \mathcal{L}_{WGAN} + \lambda\,\mathbb{E}_{\hat x}\big[(\|\nabla_{\hat x} D(\hat x)\|_2 - 1)^2\big]
$$


**直觉**：← [[Generative Adversarial Networks（GAN）]]（库内）；→ 谱归一化（另一条 Lipschitz 路线）；对抗谱系的稳定化收束

## 5. 与前作/矩阵关系

软约束思想的教科书案例（=软硬对偶共振的早期实例）

## 6. 影响后续

需要：Lipschitz 与 WGAN 距离的关系

## 7. 读前须知

undefined

> 近邻同族：[[Analyzing and Improving the Image Quality of StyleGAN（StyleGAN2）]]

> 数学根基：[[梯度惩罚]] · [[谱归一化]] · [[Wasserstein距离]] · [[Lipschitz连续]]

> 核心公式：[[梯度惩罚与谱归一对照]]
