---
type: paper
title: High-Dimensional Continuous Control Using Generalized Advantage Estimation
aliases: [GAE]
year: 2015
authors: [John Schulman, Philipp Moritz, Sergey Levine, Michael Jordan, Pieter Abbeel]
venue: arXiv 2015
arxiv: "1506.02438"
line: 强化学习与对齐
matrix_coords: [—(RL基础设施), RL目标(在线), 有]
tags: [paper]
---

# GAE（广义优势估计）

## 1. 一句话贡献

用一个参数 $\lambda$ 在"蒙特卡洛（准而吵）"与"自举（稳而偏）"之间滑动估计优势——策略梯度的方差-偏差权衡第一次有了平滑旋钮。

## 2. 核心贡献

- **GAE(γ, λ)**：TD 误差的指数加权和
- **λ 谱系**：λ=0 纯自举、λ=1 纯蒙特卡洛，中间连续可调
- 与 [[40-Concepts/策略梯度定理]] 结合后，策略梯度家族实战性能大幅提升

## 3. 方法概要

1. Actor-Critic 架构：actor 学策略、critic 学 $V$
2. 计算每步 TD 误差 $\delta_t = r_t + \gamma V(s_{t+1}) - V(s_t)$
3. $\hat A^{GAE} = \sum (\gamma\lambda)^l \delta_{t+l}$
4. 总损失 = 策略损失 + 值损失 +（熵正则）

## 4. 核心公式

- [[40-Concepts/广义优势估计GAE]] —— 概念页含完整推导
- [[40-Concepts/贝尔曼方程]]（TD 误差定义）

## 5. 与前作的关系

- 统一了 [TD(λ)]（Sutton 1988，值估计的 λ 混合）与优势估计——把老思想搬到策略梯度
- 与 [[10-Papers/04-强化学习与对齐/Trust Region Policy Optimization（TRPO）]] 同作者配套发表

## 6. 影响与后续

- PPO/TRPO/[[Training language models to follow instructions with human feedback（InstructGPT）|InstructGPT]] 的标准配件
- RLHF 里 per-token 奖励 + GAE 成为 LLM 训练默认
- "偏差-方差权衡"从此成为 RL 论文的标准讨论节

## 7. 读前须知

[[40-Concepts/贝尔曼方程]]、[[40-Concepts/策略梯度定理]]、[[40-Concepts/期望]]
