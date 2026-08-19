---
type: paper
layer: 占位
title: [[GRPO与RLVR|GRPO]] is Secretly a Process Reward Model
aliases: [GRPO-PRM]
year: 2025
authors: [Michael Sullivan, Alexander Koller (Saarland)]
venue: arXiv 2025
arxiv: "2509.21154"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [GRPO, 组基线, 步级]
tags: [paper, 占位层]
---

# GRPO is Secretly a Process Reward Model（GRPO-PRM·七节版）

## 1. 一句话贡献

理论证明 GRPO 隐式就是一个过程奖励模型——组相对目标暗中给每个推理步的 token 分配了步级奖励与优势（组奖励均值/方差的函数）——**ICML 2026 已中，机会格①的终结者**。

## 2. 核心贡献

1. 理论证明 GRPO 隐式就是一个过程奖励模型
2. 组相对目标暗中给每个推理步的 token 分配了步级奖励与优势（组奖励均值/方差的函数）
3. ICML 2026 已中，机会格①的终结者。

## 3. 方法概要

Monte Carlo 分析 GRPO 目标：逐步骤分解隐式奖励 r̂(step) 与优势 Â(step)；发现隐式 PRM 带**频率偏置项**（过度加权高频步骤，伤探索与利用）；给出利用隐式步级信号直接改进信用分配的方法。

## 4. 核心公式

$$
\hat r(\text{step}) = f\big(\bar{R}_G, \sigma_G\big) + \underbrace{\beta_{\text{freq}}}_{\text{频率偏置}},\quad \hat A_t = \hat r(\text{step}(t)) - \bar{r}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩🚩🚩 **占死 [[60-Matrices/RL稳定化矩阵]] 机会格"优势估计×过程信号（PRM×GRPO）"的理论侧**——B9 榜首格的釜底抽薪占位；≡ [[Process Reinforcement through Implicit Rewards（PRIME）]]（隐式过程奖励的另一条推导路径）


## 6. 影响与占位意义

**敌情结论**：PRM×GRPO 格的理论与机制双线已被占；残留仅在"频率偏置修复"等次生问题。

> 近邻同族：[[DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）]] · [[DCPO- Dynamic Clipping Policy Optimization（DCPO）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[REINFORCE目标]]

## 7. 读前须知

需要：组相对优势（组均值即基线）；importance ratio；裁剪的软硬对偶；隐式奖励的 MC 估计
