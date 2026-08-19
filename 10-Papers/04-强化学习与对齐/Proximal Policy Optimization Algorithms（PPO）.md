---
type: paper
title: Proximal Policy Optimization Algorithms
aliases: [PPO]
year: 2017
authors: [John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov]
venue: arXiv 2017
arxiv: "1707.06347"
line: 强化学习与对齐
matrix_coords: [—(RL基础设施), RL目标(在线), 有]
tags: [paper]
---

# Proximal Policy Optimization（PPO）

## 1. 一句话贡献

把 TRPO 的二阶信赖域简化成一行裁剪（clip），效果相当、实现极简——成为 RLHF 时代之前最广泛使用的 RL 算法、ChatGPT 对齐的引擎。

## 2. 核心贡献

- **裁剪代理目标**：$\min(\rho\hat A, \text{clip}(\rho, 1{-}\epsilon, 1{+}\epsilon)\hat A)$——一阶化信赖域
- **两种变体**：clip 版与 KL 惩罚版（实验支持 clip）
- **小批复用**：同一批数据可做多个 epoch（重要性修正使其合法）

## 3. 方法概要

1. 旧策略采样，GAE 算优势
2. 若干 epoch 内小批更新：算比率 $\rho_t$，clip 到 $[1-\epsilon, 1+\epsilon]$
3. 好动作（$A>0$）概率拉高但不越过 $1+\epsilon$；坏动作压低但不越过 $1-\epsilon$
4. 重新采样，循环

## 4. 核心公式

- [[30-Formulas/PPO裁剪目标]] —— 本文灵魂（含四象限拆解表）

## 5. 与前作的关系

- 简化了 [[10-Papers/04-强化学习与对齐/Trust Region Policy Optimization（TRPO）]]：二阶解 → 一阶裁剪
- 继承 [[10-Papers/04-强化学习与对齐/High-Dimensional Continuous Control Using Generalized Advantage Estimation（GAE）]]（同作者）的优势估计

## 6. 影响与后续

- [[Training language models to follow instructions with human feedback（InstructGPT）|InstructGPT]]/ChatGPT 的对齐核心（[[10-Papers/04-强化学习与对齐/Training language models to follow instructions with human feedback（InstructGPT）]]）
- 被 [[10-Papers/04-强化学习与对齐/DeepSeekMath- Pushing the Limits of Mathematical Reasoning in Open Language Models（DeepSeekMath）]] 的 [[GRPO与RLVR|GRPO]] 继承改造
- 机器人（Isaac Gym 大规模训练）、游戏 AI 的事实标准

## 7. 读前须知

[[40-Concepts/策略梯度定理]]、[[40-Concepts/重要性采样]]、[[40-Concepts/广义优势估计GAE]]、[[30-Formulas/TRPO目标]]（对比着读）
