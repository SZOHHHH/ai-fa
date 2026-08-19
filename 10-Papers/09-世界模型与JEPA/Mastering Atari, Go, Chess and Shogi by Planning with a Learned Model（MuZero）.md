---
type: paper
title: Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model
aliases: [MuZero]
year: 2019
authors: [Julian Schrittwieser et al. (DeepMind)]
venue: Nature 2020
arxiv: "1911.08265"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [奖励驱动(RL内部模型), 潜在状态, 游戏控制(RL)]
tags: [paper]
---

# MuZero

## 1. 一句话贡献

**不重建环境也能规划**：学一个隐式模型（只要求预测奖励/价值/策略三个头正确），在三个棋类+Atari 超人类——"模型为决策服务"的哲学源头。

## 2. 核心贡献

1. 隐式状态转移 g/h/f 三函数：预测下一步价值/奖励/策略（不预测观测），MCTS 在隐空间规划
2. 价值等价思想（value equivalence）

## 3. 方法概要

隐式状态转移 g/h/f 三函数：预测下一步价值/奖励/策略（不预测观测），MCTS 在隐空间规划；价值等价思想（value equivalence）。
## 4. 核心公式


$$
\text{模型}:\ s^{k+1} = g(s^k, a^k),\ p^k, v^k, r^k = f(s^{k+1})\ \text{(无观测重建项)}
$$


**直觉**：→ [[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]（生成式世界模型路线）与 MuZero（价值等价路线）的分叉点；**RS 主线"decision fidelity"的思想祖师爷**（模型只需对决策量忠实）

## 5. 与前作/矩阵关系

Nature 封面级；隐式模型的"为什么够用"引出后续 value-equivalence 理论线

## 6. 影响后续

需要：MCTS 基础、TD 学习；易混点：MuZero 不学观测转移——这与生成式世界模型（要重建帧）是两种哲学

## 7. 读前须知

undefined

> 近邻同族：[[Analytic Planning under Uncertainty with Moment Closure（矩闭合规划）]]

> 数学根基：[[MCTS置信上界]] · [[贝尔曼最优方程]] · [[贝尔曼方程]]
