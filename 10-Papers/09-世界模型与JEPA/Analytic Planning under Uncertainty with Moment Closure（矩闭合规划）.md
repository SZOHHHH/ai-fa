---
type: paper
layer: 占位
title: Analytic Planning under Uncertainty with Moment Closure
aliases: [矩闭合规划]
year: 2026
authors: [arXiv]
venue: arXiv 2026
arxiv: "2608.02519"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [奖励驱动(RL内部模型), —, 规划]
tags: [paper, 占位层]
---

# Analytic Planning under Uncertainty with Moment Closure（矩闭合规划·七节版）

## 1. 一句话贡献

矩闭合的解析规划：不确定性下用矩截断做解析近似——世界模型×规划的理论侧新占位。

## 2. 核心贡献

1. 矩闭合的解析规划：不确定性下用矩截断做解析近似
2. 世界模型×规划的理论侧新占位。

## 3. 方法概要

把信念状态的矩做闭合近似（截断高阶矩），规划问题解析化。

## 4. 核心公式

$$
\mu_{t+1}, \Sigma_{t+1} = \mathrm{Closure}\big(f(\mu_t, \Sigma_t)\big)\ \text{(矩截断)}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 世界模型×规划理论格；≡ IMM/矩匹配（矩思想在控制侧的出现）


## 6. 影响与占位意义

RS 库 08-03 情报；**矩思想第三次跨线**（生成 IMM/RL [[Process Reinforcement through Implicit Rewards（PRIME）|PRIME]]-统计/规划矩闭合）。

> 近邻同族：[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]] · [[Learning Latent Dynamics for Planning from Pixels（PlaNet）]]
> 相关：[[Learning Interactive Real-World Simulators（UniSim）]]
> 相关：[[Self-Improving World Modelling with Latent Actions（SWIRL）]]
> 相关：[[TD-MPC2- Scalable, Robust World Models for Continuous Control（TD-MPC2）]]
> 相关：[[WorldDynCache- Risk-Controlled Latent Dynamics Approximation for Diffusion World Models（WorldDynCache）]]
> 数学根基（占位层）：[[JEPA联合嵌入预测架构]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：前二阶矩估计；分布匹配 vs 矩匹配的样本复杂度差异
