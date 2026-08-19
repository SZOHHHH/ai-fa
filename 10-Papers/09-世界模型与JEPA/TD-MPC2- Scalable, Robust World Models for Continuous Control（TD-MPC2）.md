---
type: paper
title: TD-MPC2- Scalable, Robust World Models for Continuous Control
aliases: [TD-MPC2]
year: 2023
authors: [Nicklas Hansen, Hao Su, Xiaolong Wang (UCSD)]
venue: ICLR 2024
arxiv: "2310.16828"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [奖励驱动(RL内部模型), 潜在状态, 游戏控制(RL)]
tags: [paper]
---

# TD-MPC2

## 1. 一句话贡献

TD-MPC 系的规模化：统一潜空间模型+规划（MPPI），单套超参跨 80 连续控制任务，达 SOTA——隐式模型路线的现代代表作。

## 2. 核心贡献

1. TD 学习的世界模型（预测价值一致性而非重建），规划用短 horizon MPPI
2. 多任务训练跨域共享

## 3. 方法概要

TD 学习的世界模型（预测价值一致性而非重建），规划用短 horizon MPPI；多任务训练跨域共享。
## 4. 核心公式


$$
\mathcal{L} = \mathcal{L}_{\text{latent TD}} + \lambda_1\mathcal{L}_{\text{reward}} + \lambda_2\mathcal{L}_{\text{consistency}}\ \text{(无重建)}
$$


**直觉**：≡ [[Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model（MuZero）]]（价值等价）的连续控制版；与 [[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）|Dreamer]]（重建+AC）、DIAMOND（像素扩散）三分天下

## 5. 与前作/矩阵关系

世界模型三大路线的教学对照组

## 6. 影响后续

需要：MPPI 采样规划；三大路线差异：重建式/价值等价式/像素扩散式

## 7. 读前须知

undefined

> 近邻同族：[[Analytic Planning under Uncertainty with Moment Closure（矩闭合规划）]] · [[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]

> 数学根基：[[扩散条件去噪]] · [[贝尔曼方程]]
