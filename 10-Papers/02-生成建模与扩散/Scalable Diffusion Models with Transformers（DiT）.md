---
type: paper
title: Scalable Diffusion Models with Transformers
aliases: [DiT, Scalable Diffusion Transformers]
year: 2022
authors: [William Peebles, Saining Xie]
venue: ICCV 2023
arxiv: "2212.09748"
line: 生成建模与扩散
matrix_coords: [扩散/score, 潜空间, score匹配]
tags: [paper]
---

# DiT（扩散 Transformer）

## 1. 一句话贡献

证明扩散模型的主干网络可以完全换成 Transformer（U-Net 退役），且严格遵循缩放定律——Sora 与 SD3 的架构基石。

## 2. 核心贡献

- **DiT 块**：adaLN-Zero（自适应 LayerNorm）注入时间步与条件
- **缩放定律**：Gflops ↔ FID 平滑单调——"更大更好"在扩散上成立
- **骨干解耦**：证明扩散性能瓶颈不在 U-Net 特有归纳偏置

## 3. 方法概要

1. 潜空间划分 patch（如 2×2）→ token 序列
2. 纯 Transformer 编码：每块 adaLN-Zero 注入 $(t, c)$
3. 输出头预测 ε / v（与 U-Net 版 DDPM 损失一致）
4. 采样：CFG + DDIM，潜空间 → [[Auto-Encoding Variational Bayes（VAE）]]

## 4. 核心公式

- 损失复用 [[30-Formulas/DDPM训练目标]]（v-预测为主，见 §2 对照）
- [[30-Formulas/无分类器引导（CFG）]] 采样期外推
- 架构侧：[缩放定律]（线 6 标杆交叉）

## 5. 与前作的关系

- 组合了 [[High-Resolution Image Synthesis with Latent Diffusion Models（LDM）|LDM]]（潜扩散）与 [ViT]（线 1 交叉：patch 化思想）
- 替代了 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]] 以来的 U-Net 骨干

## 6. 影响与后续

- SD3、Flux、Sora、Movie Gen 全部采用 DiT 配方
- adaLN-Zero / patch 化成为视频扩散标配（时空 token）
- 与流匹配结合（SD3 = DiT + FM）成为 2024 后默认架构

## 7. 读前须知

[[20-Algorithms/潜在扩散模型（LDM）]]、[[30-Formulas/DDPM训练目标]]、[[30-Formulas/无分类器引导（CFG）]]
