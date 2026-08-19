---
type: paper
title: Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion
aliases: [Diffusion Forcing]
year: 2024
authors: [Boyuan Chen et al. (MIT)]
venue: NeurIPS 2024
arxiv: "2407.01392"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [像素重建(生成式), 显式像素, 可操作(动作条件)]
tags: [paper]
---

# Diffusion Forcing

## 1. 一句话贡献

每 token 独立噪声级的序列扩散：AR 预测（逐 token）与全序列扩散（全局噪声）统一进"逐位噪声调度"——训练时随机每帧噪声，推理时可自回归可全扩散。

## 2. 核心贡献

1. 关键变量 k_t：每帧独立采噪声级
2. k=1 全噪声（标准扩散），k=0 无噪声（标准 AR）——训练目标在随机 k 谱上学，推理时任意混合

## 3. 方法概要

关键变量 k_t：每帧独立采噪声级。k=1 全噪声（标准扩散），k=0 无噪声（标准 AR）——训练目标在随机 k 谱上学，推理时任意混合。
## 4. 核心公式


$$
x_t = \mathrm{noise}(x, \sigma_{k_t}),\quad \mathcal{L} = \mathbb{E}_{\{k_t\}}\big\|\epsilon_\theta(x_t, \{k_t\}, c) - \epsilon\big\|^2
$$


**直觉**：把"扩散 vs AR"从二选一变成连续可调——软硬对偶思想在序列生成上的实例；每帧噪声级=自由度

## 5. 与前作/矩阵关系

RS 库竞品矩阵在列（世界模型×扩散序列）；→ 视频预测/规划的骨干选项之一

## 6. 影响后续

需要：DDPM 前向过程；易混点：与掩码扩散 LM 的区别——这里噪声是连续谱（高斯），不是离散掩码

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]（图谱连通入口）

> 近邻同族：[[Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）]] · [[Genie- Generative Interactive Environments（Genie）]]

> 数学根基：[[扩散条件去噪]] · [[逐token独立噪声]]
