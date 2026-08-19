---
type: paper
title: PixArt-alpha- Fast Training of Diffusion Transformer for Photorealistic Text-to-Image Synthesis
aliases: [PixArt-α]
year: 2023
authors: [Chen et al.]
venue: ICLR 2024
arxiv: "2310.00426"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散/score, 潜空间, score匹配]
tags: [paper]
---

# PixArt-α

## 1. 一句话贡献

610 GPU 时训完 DiT 文生图（Stable Diffusion 1/250 算力）：**分解训练策略**（先像素无关→再文对齐→再高分辨率）+ 共享 CrossAttn 映射——省算力范式。

## 2. 核心贡献

1. 三阶段分解+复用 SD 的 [[Auto-Encoding Variational Bayes（VAE）|VAE]] 与 token 映射（不重学）
2. [[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]] 蒸馏直接到 4 步的后续（PixArt-δ）

## 3. 方法概要

三阶段分解+复用 SD 的 [[Auto-Encoding Variational Bayes（VAE）|VAE]] 与 token 映射（不重学）；[[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]] 蒸馏直接到 4 步的后续（PixArt-δ）。
## 4. 核心公式


$$
\text{Phase}\ 1{:}\ f_\theta\ \text{pretrain(类条件)},\ 2{:}\ \text{+text},\ 3{:}\ \text{+高分辨率}
$$


**直觉**：→ [[Scalable Diffusion Models with Transformers（DiT）]]（骨干）→ PixArt-δ（+DMD 蒸馏）；生成加速矩阵"潜扩散×蒸馏"的算法侧减法

## 5. 与前作/矩阵关系

开源社区 DiT 文生图起点（含PixArt-Σ）；低算力复现文生图的标准路径

## 6. 影响后续

需要：为何分解能省（文本对齐与像素建模的耦合度低）

## 7. 读前须知

undefined

> 近邻同族：[[Analyzing and Improving the Training Dynamics of Diffusion Models（EDM2）]] · [[Classifier-Free Diffusion Guidance（CFG）]]

> 数学根基：[[概率分布]]

> 数学根基：[[DSM目标]] · [[条件流匹配损失]]
