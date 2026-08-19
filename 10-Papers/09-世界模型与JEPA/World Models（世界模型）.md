---
type: paper
title: World Models
aliases: [World Models, Ha世界模型]
year: 2018
authors: [David Ha, Jürgen Schmidhuber]
venue: NeurIPS 2018
arxiv: "1803.10122"
line: 世界模型与JEPA
matrix_coords: [像素重建(生成式), 显式像素, 游戏控制(RL)]
tags: [paper]
---

# World Models（世界模型奠基）

## 1. 一句话贡献

"Agent 在自己脑内的梦境模型里训练"——[[Auto-Encoding Variational Bayes（VAE）|VAE]] 视觉 + MDN-RNN 动力学 + 简单控制器的三件套，世界模型范式的开山。

## 2. 核心贡献

- **三件套架构**：V（VAE 编码）→ M（RNN 预测下一隐状态）→ C（线性策略）
- **想象训练**：策略完全在模型 rollout 中进化（in-dream policy search），真实环境零/少交互
- CarRacing/VizDoom 实证：梦中训练 → 现实可用

## 3. 方法概要

1. 随机游走采集数据，训 VAE 压缩观察
2. 训 MDN-RNN 预测隐状态转移（混合密度输出）
3. 进化算法（CMA-ES）在想象 rollout 中优化线性控制器
4. 迁移回真实环境

## 4. 核心公式

- [[20-Algorithms/世界模型]] §3 的转移模型式（本文是最简实例）
- 三件套分别对应：[[20-Algorithms/变分自编码器]]、序列模型、[[40-Concepts/马尔可夫决策过程]] 策略

## 5. 与前作的关系

- 集成了 [Daydreaming 幻想学习]（旧思想）与现代深度生成模型
- 为 [[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）|Dreamer]] 铺路

## 6. 影响与后续

- "模型基 RL"复兴的标志；Dreamer 系直系祖先
- "梦境训练"叙事成为世界模型领域通用隐喻

## 7. 读前须知

[[20-Algorithms/世界模型]]、[[20-Algorithms/变分自编码器]]、[[40-Concepts/马尔可夫决策过程]]

> 数学根基：[[扩散条件去噪]] · [[贝尔曼方程]]
