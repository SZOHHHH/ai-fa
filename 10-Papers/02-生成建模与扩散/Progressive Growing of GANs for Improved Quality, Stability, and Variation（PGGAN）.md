---
type: paper
title: Progressive Growing of GANs for Improved Quality, Stability, and Variation
aliases: [PGGAN]
year: 2017
authors: [Karras et al. (NVIDIA)]
venue: ICLR 2018
arxiv: "1710.10196"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [对抗, 像素空间, 渐进训练]
tags: [paper]
---

# PGGAN

## 1. 一句话贡献

渐进式生长 [[Generative Adversarial Networks（GAN）|GAN]]：从 4×4 一路长到 1024×1024——训练稳定化的"课程学习"（StyleGAN 的直接前身）。

## 2. 核心贡献

1. 生成器/判别器同步加层（分辨率翻倍）
2. 先学粗结构再学细节

## 3. 方法概要

生成器/判别器同步加层（分辨率翻倍）；先学粗结构再学细节。
## 4. 核心公式


$$
G: 4\times4 \to 8\times8 \to \cdots \to 1024\times1024\ \text{(逐层解锁)}
$$


**直觉**：粗后细=由易到难——低分辨率的任务简单稳定，先站稳再长高

## 5. 与前作/矩阵关系

→ StyleGAN（库内）/StyleGAN2（B18 入库）；渐进训练思想回流到 PixArt 分解训练等

## 6. 影响后续

高分辨率 GAN 时代的开启者；渐进思想跨范式（对抗→扩散）迁移的实例

## 7. 读前须知

需要：GAN 基础； fading-in 新层的平滑技巧

> 近邻同族：[[Analyzing and Improving the Image Quality of StyleGAN（StyleGAN2）]] · [[Generative Adversarial Networks（GAN）]]

> 数学根基：[[GAN目标]] · [[谱归一化]]
