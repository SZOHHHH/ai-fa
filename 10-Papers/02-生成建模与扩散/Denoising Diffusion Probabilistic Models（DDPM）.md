---
type: paper
title: Denoising Diffusion Probabilistic Models
aliases: [DDPM, Ho et al. 2020]
year: 2020
authors: [Jonathan Ho, Ajay Jain, Pieter Abbeel]
venue: NeurIPS 2020
arxiv: "2006.11239"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, score匹配]
tags: [paper]
---

# Denoising Diffusion Probabilistic Models（DDPM）

## 1. 一句话贡献

把扩散模型的目标简化为"预测噪声的 MSE"，训练稳定且质量匹敌 [[Generative Adversarial Networks（GAN）|GAN]]——现代扩散时代的开山之作。

## 2. 核心贡献

- **L_simple**：复杂变分界化简为 $\|\epsilon - \epsilon_\theta\|^2$——回归即生成
- **T=1000 步调度**：线性 β 加噪，闭式一步采样 $x_t$
- **U-Net 骨干**：噪声预测网络的标准配置（此后续用数年）

## 3. 方法概要

**训练**：
1. 抽数据 $x_0$、时刻 $t\sim U[1,T]$、噪声 $\epsilon$
2. 闭式造 $x_t = \sqrt{\bar\alpha_t}x_0 + \sqrt{1-\bar\alpha_t}\epsilon$
3. U-Net 从 $(x_t, t)$ 预测 $\epsilon$，MSE 反传

**采样**：从 $x_T\sim\mathcal{N}(0,I)$ 出发，逐步 $x_{t-1} = \mu_\theta(x_t,t) + \sigma_t z$ 走 1000 步

## 4. 核心公式

- [[30-Formulas/DDPM前向过程]]（加噪链与闭式）
- [[30-Formulas/DDPM后验分布]]（反向目标）
- [[30-Formulas/DDPM训练目标]]（L_simple——本文灵魂）

## 5. 与前作的关系

- 简化了 [Sohl-Dickstein 2015（扩散思想源头）] 与 [SMLD 2019]：统一进变分框架且目标极简
- 与 [[10-Papers/02-生成建模与扩散/Generative Modeling by Estimating Gradients of the Data Distribution（SMLD）]] 并行同源（score ↔ 噪声预测，见 [[30-Formulas/DSM目标]] §2 换算表）
- 奠基了 [[10-Papers/02-生成建模与扩散/Improved Denoising Diffusion Probabilistic Models（iDDPM）]]、[[10-Papers/02-生成建模与扩散/Denoising Diffusion Implicit Models（DDIM）]] 及整条扩散线

## 6. 影响与后续

- 被 [[10-Papers/02-生成建模与扩散/Diffusion Models Beat GANs on Image Synthesis（ADM）|Diffusion Models Beat GANs]] 扩展为反超 GAN 的里程碑
- 被 [[High-Resolution Image Synthesis with Latent Diffusion Models（LDM）|LDM]] 搬进潜空间 → Stable Diffusion
- L_simple 至今仍是所有扩散模型的默认训练目标

## 7. 读前须知

[[40-Concepts/马尔可夫链]]、[[40-Concepts/高斯分布]]、[[40-Concepts/ELBO]]、[[40-Concepts/贝叶斯公式]]、[[40-Concepts/期望]]、[[40-Concepts/范数]]

> 谱系成员（82）：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Analyzing and Improving the Image Quality of StyleGAN（StyleGAN2）]] · [[Analyzing and Improving the Training Dynamics of Diffusion Models（EDM2）]] · [[AnyFlow- Any-Step Video Diffusion Model with On-Policy Flow Map Distillation（AnyFlow）]] · [[Auto-Encoding Variational Bayes（VAE）]] · [[Building Normalizing Flows with Stochastic Interpolants（随机插值）]] · [[Classifier-Free Diffusion Guidance（CFG）]] · [[Common Diffusion Noise Schedules and Sample Steps are Flawed（Zero Terminal SNR）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]] · [[Consistency Models（一致性模型）]] · [[Denoising Diffusion Implicit Models（DDIM）]] · [[Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]] · …等 82 篇
