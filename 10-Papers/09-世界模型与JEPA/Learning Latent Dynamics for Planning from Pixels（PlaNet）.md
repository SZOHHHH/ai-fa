---
type: paper
title: Learning Latent Dynamics for Planning from Pixels
aliases: [PlaNet]
year: 2018
authors: [Danijar Hafner et al. (Google)]
venue: ICML 2019
arxiv: "1811.04551"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [奖励驱动(RL内部模型), 潜在状态, 游戏控制(RL)]
tags: [paper]
---

# PlaNet

## 1. 一句话贡献

RSSM 的诞生地：确定性+随机混合潜状态的循环世界模型，从像素直接规划（无 actor）——Dreamer 系的起点。

## 2. 核心贡献

1. RSSM：确定性 h（GRU）+随机 z（[[Auto-Encoding Variational Bayes（VAE）|VAE]] 后验/先验）分离
2. MPC（CEM）在潜空间规划动作序列

## 3. 方法概要

RSSM：确定性 h（GRU）+随机 z（[[Auto-Encoding Variational Bayes（VAE）|VAE]] 后验/先验）分离；CVAE 训练；MPC（CEM）在潜空间规划动作序列。
## 4. 核心公式


$$
h_t = f(h_{t-1}, s_{t-1}, a_{t-1}),\ q_t = p(s_t \mid h_t, o_t)\ \text{(RSSM)}
$$


**直觉**：→ [[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]（+actor-critic 免规划）/[[Mastering Diverse Domains through World Models（DreamerV3）|DreamerV3]]——潜世界模型主线的根；与 DIAMOND 的对照（潜 vs 像素）

## 5. 与前作/矩阵关系

潜空间 RL 的奠基；RS 库 Lessons/RL02-03 的谱系源头

## 6. 影响后续

需要：VAE 重参数、CEM 规划器直觉

## 7. 读前须知

undefined

> 近邻同族：[[Analytic Planning under Uncertainty with Moment Closure（矩闭合规划）]]

> 数学根基：[[RSSM转移模型]] · [[贝尔曼方程]] · [[ELBO]]
