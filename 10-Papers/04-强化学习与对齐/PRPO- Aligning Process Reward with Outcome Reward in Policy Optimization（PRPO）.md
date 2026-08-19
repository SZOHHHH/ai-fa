---
type: paper
layer: 占位
title: PRPO- Aligning Process Reward with Outcome Reward in Policy Optimization
aliases: [PRPO]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2601.07182"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [GRPO, 组基线, 步级]
tags: [paper, 占位层]
---

# PRPO- Aligning Process Reward with Outcome Reward in Policy Optimization（PRPO·七节版）

## 1. 一句话贡献

过程奖励与结果奖励的显式对齐：每步用过程奖励重算优势，桥接 [[Let's Verify Step by Step（PRM）|PRM]] 信号与 outcome 信号。

## 2. 核心贡献

1. 过程奖励与结果奖励的显式对齐：每步用过程奖励重算优势，桥接 [[Let's Verify Step by Step（PRM）|PRM]] 信号与 outcome 信号。

## 3. 方法概要

PRM 步级分数参与优势函数的逐步重估，使过程信号与结果信号在同一坐标系。

## 4. 核心公式

$$
\hat A_t = \alpha\, r^{\text{PRM}}_t + (1-\alpha)\, \hat A^{\text{outcome}},\ \alpha\ \text{按步对齐}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩🚩 占"过程×结果混合优势"格——**机会格①的机制侧占位**（与 [[GRPO与RLVR|GRPO]]-PRM 理论侧合围）


## 6. 影响与占位意义

2026-01 占位：混合优势的具体形式已被做。

> 近邻同族：[[DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）]] · [[DCPO- Dynamic Clipping Policy Optimization（DCPO）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[REINFORCE目标]]

## 7. 读前须知

需要：组相对优势（组均值即基线）；importance ratio；裁剪的软硬对偶；隐式奖励的 MC 估计
