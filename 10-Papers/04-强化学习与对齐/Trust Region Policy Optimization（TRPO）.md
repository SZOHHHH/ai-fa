---
type: paper
title: Trust Region Policy Optimization
aliases: [TRPO]
year: 2015
authors: [John Schulman, Sergey Levine, Pieter Abbeel, Michael Jordan, Philipp Moritz]
venue: ICML 2015
arxiv: "1502.05477"
line: 强化学习与对齐
matrix_coords: [—(RL基础设施), RL目标(在线), 有]
tags: [paper]
---

# Trust Region Policy Optimization（TRPO）

## 1. 一句话贡献

用 KL 信赖域约束策略更新步长，首次给"策略梯度不会越走越坏"以理论保证——PPO 的直系祖先。

## 2. 核心贡献

- **信赖域目标**：最大化代理目标（重要性比率 × 优势），约束 KL ≤ δ
- **单调改进保证**：基于 Kakade & Langford 的策略改进下界
- **自然梯度实现**：共轭梯度解 Fisher 矩阵方程，免显式求逆

## 3. 方法概要

1. 用当前策略采样一批轨迹，算 GAE 优势
2. 线性化代理目标、二次化 KL 约束
3. 共轭梯度求方向 $F^{-1}\nabla J$，线搜索回溯找满足约束的步长
4. 更新后重新采样（on-policy，数据用一次）

## 4. 核心公式

- [[30-Formulas/TRPO目标]] —— 本文灵魂
- [[40-Concepts/信赖域]]、[[40-Concepts/广义优势估计GAE]]（配套）

## 5. 与前作的关系

- 改进了 [[40-Concepts/策略梯度定理]] 原始版（REINFORCE）：无约束大步 → 信赖域小步
- 扩展了 Kakade & Langford 2002（策略改进理论）到实用深度 RL

## 6. 影响与后续

- 被 [[10-Papers/04-强化学习与对齐/Proximal Policy Optimization Algorithms（PPO）]] 简化为一阶裁剪——工业界全面倒戈 PPO
- 信赖域思想渗透到对齐：RLHF 的 KL 惩罚是它的软版本
- 自然梯度在 K-FAC 等优化器中延续

## 7. 读前须知

[[40-Concepts/策略梯度定理]]、[[40-Concepts/重要性采样]]、[[40-Concepts/KL散度]]（建议先读这三个概念页）
