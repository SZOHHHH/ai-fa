---
type: paper
layer: 占位
title: DCPO- Dynamic Clipping Policy Optimization
aliases: [DCPO]
year: 2025
authors: [（arXiv）]
venue: arXiv 2025
arxiv: "2509.02333"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [GRPO, 硬裁剪, token级]
tags: [paper, 占位层]
---

# DCPO- Dynamic Clipping Policy Optimization（DCPO·七节版）

## 1. 一句话贡献

动态裁剪策略优化：裁剪范围随训练动态调整（而非固定超参）。

## 2. 核心贡献

1. 动态裁剪策略优化：裁剪范围随训练动态调整（而非固定超参）。

## 3. 方法概要

基于比率分布的实时统计自适应调整 ε，替代全局固定值。

## 4. 核心公式

$$
\epsilon_t = h\big(\{\rho_{t\prime}\}_{\text{batch}}\big),\ \mathrm{clip}(\rho_t, 1-\epsilon_t, 1+\epsilon_t)
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占动态裁剪格；≡ [[Soft Adaptive Policy Optimization（SAPO）]]（"聚合替代锚定"：裁剪半径也改为统计量函数）


## 6. 影响与占位意义

裁剪半径自适应化的 2025 占位。

> 近邻同族：[[DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）]] · [[GRPO is Secretly a Process Reward Model（GRPO-PRM）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[REINFORCE目标]]

## 7. 读前须知

需要：组相对优势（组均值即基线）；importance ratio；裁剪的软硬对偶；隐式奖励的 MC 估计
