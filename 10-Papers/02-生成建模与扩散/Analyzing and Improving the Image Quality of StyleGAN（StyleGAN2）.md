---
type: paper
layer: 占位
title: Analyzing and Improving the Image Quality of StyleGAN
aliases: [StyleGAN2]
year: 2019
authors: [Tero Karras, Samuli Laine, Miika Aittala, Janne Hellsten, Jaakko Lehtinen, Timo Aila]
venue: arXiv 2019
arxiv: "1912.04958"
pdf: 已下载（PDF/）
line: false
matrix_coords: [对抗, 潜空间, —]
tags: [paper, 占位层]
---

# Analyzing and Improving the Image Quality of StyleGAN（StyleGAN2·七节版）

## 1. 一句话贡献

诊断 StyleGAN 的伪影来源（blob/水滴=谱泄漏），逐项修复；perceptual 质量登顶当时。

## 2. 核心贡献

1. 诊断 StyleGAN 的伪影来源（blob/水滴=谱泄漏），逐项修复
2. perceptual 质量登顶当时。

## 3. 方法概要


$$
w\ \text{modulated:}\ w_i^{\prime} = w_i\big/\sqrt{\sum w_i^2 + \epsilon}\ \text{(demod 替代 IN)}
$$


## 4. 核心公式

← [[Generative Adversarial Networks（GAN）|GAN]]/[[Wasserstein GAN（WGAN）|WGAN]] 谱系；生成建模范式矩阵"对抗×潜空间"格从此有主

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

B18 奠基补齐：对抗潜空间支线（该格此前空置）。


## 6. 影响与占位意义

undefined

> 近邻同族：[[Generative Adversarial Networks（GAN）]] · [[Improved Training of Wasserstein GANs（WGAN-GP）]]
> 数学根基（占位层）：[[GAN目标]] · [[谱归一化]]

## 7. 读前须知

本卡为占位层升级版；需要的数学基础见"数学根基"行所链接的公式/概念实体。
