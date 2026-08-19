---
type: paper
title: Generative Modeling by Estimating Gradients of the Data Distribution
aliases: [SMLD, NCSN, Score Matching Langevin Dynamics]
year: 2019
authors: [Yang Song, Stefano Ermon]
venue: NeurIPS 2019
arxiv: "1907.05600"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, score匹配]
tags: [paper]
---

# SMLD（噪声条件分数网络）

## 1. 一句话贡献

用"多尺度加噪 + 学每级 score + 退火朗之万采样"做生成——与 DDPM 同源异形的 score 学派开山作。

## 2. 核心贡献

- **噪声条件 score 网络** $s_\theta(x, \sigma)$：单网络覆盖多噪声级
- **为什么要多尺度**：干净数据的 score 在低密度区不准；加噪把流形撑开，score 处处可学
- **退火朗之万**：大 σ 先粗定位、小 σ 再精修的采样调度

## 3. 方法概要

1. 预定噪声级 $\sigma_1 > \dots > \sigma_L$
2. 训练：对每级做去噪 score matching（目标可解析：加性高斯的 score 闭式）
3. 采样：从最大 σ 起，每级跑若干步朗之万（score 步 + 噪声步），逐级退火
4. 输出：最细噪声级的样本

## 4. 核心公式

- [[30-Formulas/DSM目标]] —— 训练目标（含 score↔噪声换算表）
- [[40-Concepts/朗之万动力学]] —— 采样器

## 5. 与前作的关系

- 扩展了 [Vincent 2011 的 DSM 等价定理] 到深度生成建模
- 与 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]] 并行独立（score 视角 vs 变分视角），后被统一

## 6. 影响与后续

- 被 [[10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]] 连续化统一（VE-SDE）
- score 记号体系传播全领域；EDM 的 σ-空间直接继承

## 7. 读前须知

[[40-Concepts/Score函数]]、[[40-Concepts/能量模型]]（score 的出身）、[[40-Concepts/朗之万动力学]]、[[40-Concepts/高斯分布]]
