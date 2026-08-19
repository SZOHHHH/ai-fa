---
type: paper
title: Auto-Encoding Variational Bayes
aliases: [VAE, Auto-Encoding Variational Bayes]
year: 2013
authors: [Diederik P. Kingma, Max Welling]
venue: ICLR 2014
arxiv: "1312.6114"
line: 生成建模与扩散
matrix_coords: [变分, 像素空间, 重参数]
tags: [paper]
---

# Auto-Encoding Variational Bayes（VAE）

## 1. 一句话贡献

用可导的证据下界（ELBO）+ 重参数化技巧，把带隐变量的概率模型训练变成普通的随机梯度下降——开创变分自编码器。

## 2. 核心贡献

- **ELBO 可训练化**：$\log p_\theta(x)$ 不可直接优化 → 最大化 [[40-Concepts/ELBO]]
- **重参数化技巧**：$z = \mu_\phi + \sigma_\phi \odot \epsilon$ 让梯度穿过采样操作（[[40-Concepts/重参数化]]）
- **自编码视角**：编码器=近似后验 $q_\phi(z\mid x)$，解码器=似然 $p_\theta(x\mid z)$——概率模型的工程化

## 3. 方法概要（Method）

1. 编码器网络读 $x$ 输出 $\mu_\phi(x), \sigma_\phi(x)$（高斯后验参数）
2. 重参数化采一个 $z = \mu + \sigma \epsilon$
3. 解码器从 $z$ 重建 $\hat x$
4. 损失 = 重建误差 + KL($q_\phi \| \mathcal{N}(0,I)$)，一步反传更新两组参数
5. 生成：从 $\mathcal{N}(0,I)$ 采 $z$ → 解码器直接出图（单步）

## 4. 核心公式

- [[30-Formulas/ELBO目标]] —— 本文的全部理论
- 重建 + KL 分解、[[40-Concepts/Jensen不等式]] 推导链

## 5. 与前作的关系

- 改进了 [变分推断]：蒙特卡洛 EM / Wake-Sleep 等旧法难扩展到大网络 → 本文让下界可微、可大规模 SGD
- 奠基了 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]]：扩散 = 把单步隐变量 $z$ 换成整条链 $x_{1:T}$ 的"多步 VAE"
- 奠基了 [[High-Resolution Image Synthesis with Latent Diffusion Models（LDM）|LDM]]：其自编码器即 LDM 的压缩器

## 6. 影响与后续

- 被 [[10-Papers/02-生成建模与扩散/Neural Discrete Representation Learning（VQ-VAE）]] 发展为离散版
- 被 [[10-Papers/02-生成建模与扩散/Taming Transformers for High-Resolution Image Synthesis（VQGAN）]] 组合为 VQGAN
- "模糊"缺陷（重建-KL 拉扯）成为 [[Generative Adversarial Networks（GAN）|GAN]] 兴起的说辞；ELBO 数学则统治了整条扩散线

## 7. 读前须知

[[40-Concepts/ELBO]]、[[40-Concepts/重参数化]]、[[40-Concepts/KL散度]]、[[40-Concepts/高斯分布]]、[[40-Concepts/Jensen不等式]]
