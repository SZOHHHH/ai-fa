---
type: paper
title: "Wasserstein GAN"
aliases: [WGAN, Wasserstein GAN]
year: 2017
authors: [Martin Arjovsky, Soumith Chintala, Léon Bottou]
venue: ICML 2017
arxiv: "1701.07875"
line: 生成建模与扩散
matrix_coords: [对抗, 像素空间, 对抗(矩匹配)]
tags: [paper]
---

# Wasserstein GAN（WGAN）

## 1. 一句话贡献

把 GAN 的 JS 散度换成 Wasserstein 距离，从数学上解释并修复了 GAN 训练不稳定的根源。

## 2. 核心贡献

- **诊断**：分布支撑不重叠时 $D_{\mathrm{JS}} = \log 2$ 恒定 → 梯度消失（GAN 不稳的元凶）
- **换距离**：W 距离处处连续可导，即使不重叠也有梯度
- **对偶实现**：critic 须 1-Lipschitz → 权重裁剪（后由 WGAN-GP 改进为梯度惩罚）

## 3. 方法概要

1. 判别器改名 critic：输出实数打分（无 sigmoid）
2. critic 最大化 $\mathbb{E}[D(x)] - \mathbb{E}[D(G(z))]$（= 估计 W 距离）
3. 训练后把权重裁剪到 $[-c, c]$ 强制 Lipschitz
4. 生成器最小化 critic 给出的距离
5. 附赠：critic 损失值 ≈ 生成质量的实时指标（GAN 训练首次有了可读的仪表盘）

## 4. 核心公式

- [[30-Formulas/WGAN目标]] —— 对偶目标
- [[40-Concepts/Wasserstein距离]]（Kantorovich–Rubinstein 对偶）、[[40-Concepts/Lipschitz连续]]

## 5. 与前作的关系

- 改进了 [[10-Papers/02-生成建模与扩散/Generative Adversarial Networks（GAN）]]：JS → W、判别器 → critic
- 对比 [[Auto-Encoding Variational Bayes（VAE）|VAE]]：同属"稳定性修复"叙事的另一极

## 6. 影响与后续

- WGAN-GP（梯度惩罚）成为实际标准
- IPM 视角统一了 MMD/GAN 家族
- W 距离理论后来与 [[10-Papers/02-生成建模与扩散/Flow Matching for Generative Modeling（流匹配）]] 的最优传输视角连通

## 7. 读前须知

[[40-Concepts/Wasserstein距离]]、[[40-Concepts/Lipschitz连续]]、[[40-Concepts/Jensen-Shannon散度]]（先懂它错在哪）、[[40-Concepts/期望]]
