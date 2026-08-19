---
type: paper
layer: 占位
title: Self-Guided Process Reward Optimization with Redefined Step-wise Advantage for Process Reinforcement Learning
aliases: [SPRO]
year: 2025
authors: [（arXiv）]
venue: arXiv 2025
arxiv: "2507.01551"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [GRPO, 组基线, 步级]
tags: [paper, 占位层]
---

# Self-Guided Process Reward Optimization with Redefined Step-wise Advantage for Process Reinforcement Learning（SPRO·七节版）

## 1. 一句话贡献

自引导过程奖励：掩码估计重定义步级优势，免 [[Let's Verify Step by Step（PRM）|PRM]] 标注的过程强化——精度与训练效率双升。

## 2. 核心贡献

1. 自引导过程奖励：掩码估计重定义步级优势，免 [[Let's Verify Step by Step（PRM）|PRM]] 标注的过程强化——精度与训练效率双升。

## 3. 方法概要

对每步用掩码（遮蔽后续步骤）重估"此步之后的期望回报"，作为步级优势；无需外部 PRM。

## 4. 核心公式

$$
\hat A_{\text{step}} = V_{\text{masked}}(s_{\le t}) - V_{\text{masked}}(s_{<t}),\ \text{自引导无标注}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占过程强化×免标注格；≡ [[GRPO与RLVR]]（一个证理论一个给方法）


## 6. 影响与占位意义

过程奖励免标注路线的活跃证据。

> 近邻同族：[[DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）]] · [[DCPO- Dynamic Clipping Policy Optimization（DCPO）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[REINFORCE目标]]

## 7. 读前须知

需要：组相对优势（组均值即基线）；importance ratio；裁剪的软硬对偶；隐式奖励的 MC 估计
