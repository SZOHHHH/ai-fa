---
type: paper
title: Neural Discrete Representation Learning
aliases: [VQ-[[Auto-Encoding Variational Bayes（VAE）|VAE]], Neural Discrete Representation Learning]
year: 2017
authors: [Aaron van den Oord, Oriol Vinyals, Koray Kavukcuoglu]
venue: NeurIPS 2017
arxiv: "1711.00937"
line: 生成建模与扩散
matrix_coords: [变分, 离散码本, ELBO重加权]
tags: [paper]
---

# Neural Discrete Representation Learning（VQ-VAE）

## 1. 一句话贡献

把 VAE 的连续隐空间换成离散 codebook，让自编码器学会"图像的词表"——两阶段生成的压缩器原型。

## 2. 核心贡献

- **离散隐空间**：最近邻查表（codebook）代替连续 $z$
- **直通估计**：量化不可导 → 前向用量化值、梯度抄送给编码器
- **无像素先验泄漏**：像素级重建损失由 MSE 换主导，高频交还解码器

## 3. 方法概要

1. 编码器输出特征图 → 每个空间位置查 codebook 最近向量 $z_q$
2. 解码器从 $z_q$ 重建
3. 损失 = 重建 + codebook 项（拉近码向量）+ 承诺项（编码别乱跑）
4. 先验（自回归模型）在码序列上训练，用于生成
5. 生成：自回归模型采样码序列 → 解码

## 4. 核心公式

- [[30-Formulas/VQ-VAE目标]] —— 三项式与直通估计

## 5. 与前作的关系

- 改进了 [[10-Papers/02-生成建模与扩散/Auto-Encoding Variational Bayes（VAE）]]：连续 → 离散，后验坍缩问题随之缓解
- 组合了 [自回归语言模型思想] 与 [向量量化（信号处理旧技术）]

## 6. 影响与后续

- 被 [[10-Papers/02-生成建模与扩散/Taming Transformers for High-Resolution Image Synthesis（VQGAN）]] 发展为 VQGAN（+感知损失+Transformer 先验）
- 奠基了 DALL·E 系与视频 tokenizer（Sora 报告中的时空 patch 压缩一脉）
- 与 [[High-Resolution Image Synthesis with Latent Diffusion Models（LDM）|LDM]] 的连续 AE 形成压缩器两大流派

## 7. 读前须知

[[40-Concepts/重参数化]]（直通是其离散孪生）、[[40-Concepts/期望]]、[[40-Concepts/范数]]、[[30-Formulas/ELBO目标]]（理论位置）
