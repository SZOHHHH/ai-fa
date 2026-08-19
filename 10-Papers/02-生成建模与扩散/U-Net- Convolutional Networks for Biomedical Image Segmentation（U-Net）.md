---
type: paper
title: U-Net - Convolutional Networks for Biomedical Image Segmentation
aliases: [U-Net]
year: 2015
authors: [Olaf Ronneberger, Philipp Fischer, Thomas Brox]
venue: MICCAI 2015
arxiv: "1505.04597"
line: 生成建模与扩散
matrix_coords: [骨干组件, 像素空间, —]
tags: [paper]
---

# U-Net

## 1. 一句话贡献

编码-解码 + 跳跃连接的对称结构——本为医学分割而生，却成为扩散模型七年的标准骨干。

## 2. 核心贡献

- **对称结构**：下采样（语义压缩）↔ 上采样（空间恢复）
- **跳跃连接**：把编码器特征直送解码器——细节不丢
- **小数据可用**：数据增广下医学图像少样本训练

## 3. 方法概要

1. 编码器逐级卷积+下采样，通道数翻倍
2. 解码器逐级上采样+卷积，通道数减半
3. 每级特征经跳跃连接拼接进解码器
4. 输出与输入同分辨率的分割图

（扩散模型中：输入 $x_t$ 与 $t$ 嵌入一起进 U-Net，输出噪声预测 $\epsilon_\theta$；时间嵌入经 sinusoidal+MLP 注入。）

## 4. 核心公式

- 结构性贡献（无核心数学公式）；扩散用法见 [[30-Formulas/DDPM训练目标]]（$\epsilon_\theta$ 的载体）

## 5. 与前作的关系

- 改进了 [全卷积网络 FCN]：加对称解码器与稠密跳跃
- 被 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]] 采纳为噪声预测骨干（历史偶然成就经典复用）

## 6. 影响与后续

- 扩散时代前 7 年标准骨干（DDPM/[[High-Resolution Image Synthesis with Latent Diffusion Models（LDM）|LDM]]/SD1.x/SDXL）
- 被 [[Scalable Diffusion Models with Transformers（DiT）|DiT]] 取代（Transformer 化浪潮）
- 医学影像领域至今仍是基准

## 7. 读前须知

无前置数学要求；扩散语境下配合 [[20-Algorithms/扩散模型]] 阅读
