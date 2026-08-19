---
type: paper
title: Improved Denoising Diffusion Probabilistic Models
aliases: [iDDPM, Improved DDPM]
year: 2020
authors: [Alexander Quinn Nichol, Prafulla Dhariwal]
venue: ICML 2021
arxiv: "2102.09672"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, score匹配]
tags: [paper]
---

# Improved DDPM（iDDPM）

## 1. 一句话贡献

系统诊断 DDPM 的可调旋钮（调度、方差、损失加权），余弦调度 + 学习方差把采样步数砍到 1/4 且质量反升。

## 2. 核心贡献

- **余弦调度**：线性 β 后期噪声堆太快 → 余弦过渡更平缓
- **学习方差 $\Sigma_\theta$**：DDPM 固定 $\tilde\beta_t$ 欠优；混合学习（$\beta$ 与 $\tilde\beta$ 的几何插值）
- **加权证明**：L_simple 是加权 score matching 的特例，权重选择影响大
- 首次在 ImageNet 64×64 打败 BigGAN

## 3. 方法概要

1. 前向换余弦 $\bar\alpha_t$ 调度
2. 反向方差不再固定：网络多输出一组参数，混合插值 $\Sigma$
3. 损失加回 L_vlb 项对方差部分加权
4. 采样可少至 ~100 步（原 1000）

## 4. 核心公式

- 复用 [[30-Formulas/DDPM前向过程]]（调度重设计）
- [[30-Formulas/DDPM训练目标]] §2 的加权一般式（$\lambda_t$ 讨论）
- [[30-Formulas/DDPM后验分布]]（方差学习对象）

## 5. 与前作的关系

- 改进了 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]]：调度、方差、加权三处精修

## 6. 影响与后续

- 余弦调度成为默认选项之一
- "设计空间"意识直接启发 [[10-Papers/02-生成建模与扩散/Elucidating the Design Space of Diffusion-Based Generative Models（EDM）]] 的系统消融
- cosLD 等后续沿用

## 7. 读前须知

[[40-Concepts/高斯分布]]、[[40-Concepts/KL散度]]（方差学习=KL 权衡）、[[30-Formulas/DDPM训练目标]]（先懂 L_simple）
