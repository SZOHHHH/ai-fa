---
type: paper
layer: 占位
title: DAPO- An Open-Source LLM Reinforcement Learning System at Scale
aliases: [DAPO]
year: 2025
authors: [ByteDance Seed (Q. Yu et al.)]
venue: arXiv 2025
arxiv: "2503.14476"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [GRPO, 硬裁剪, token级]
tags: [paper, 占位层]
---

# DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO·七节版）

## 1. 一句话贡献

[[GRPO与RLVR|GRPO]] 工业化四件套：Clip-Higher（解耦上下裁剪促探索）、动态采样（丢弃全对/全错组）、token 级损失（去长度归一偏置）、超长奖励整形——B8 遗留补卡。

## 2. 核心贡献

1. [[GRPO与RLVR|GRPO]] 工业化四件套：Clip-Higher（解耦上下裁剪促探索）、动态采样（丢弃全对/全错组）、token 级损失（去长度归一偏置）、超长奖励整形——B8 遗留补卡。

## 3. 方法概要

四技术各自对症 GRPO 的一个失稳源：裁剪不对称→探索受限；退化组→梯度浪费；长度归一→长短偏置；超长样本→噪声。

## 4. 核心公式

$$
\mathcal{L} = \mathbb{E}\Big[\min\big(\rho_t A_t,\ \mathrm{clip}(\rho_t, 1-\epsilon_{\text{low}}, 1+\epsilon_{\text{high}})A_t\big)\Big],\ \epsilon_{\text{high}} > \epsilon_{\text{low}}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占 GRPO×硬裁剪改造格；→ [[Understanding R1-Zero-Like Training- A Critical Perspective（Dr.GRPO）]]（另一条偏置修正路线）；verl 官方 recipe 已收录


## 6. 影响与占位意义

GRPO 系工业级占位（2000+ 引用）。

> 近邻同族：[[DCPO- Dynamic Clipping Policy Optimization（DCPO）]] · [[GRPO is Secretly a Process Reward Model（GRPO-PRM）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[REINFORCE目标]]

## 7. 读前须知

需要：组相对优势（组均值即基线）；importance ratio；裁剪的软硬对偶；隐式奖励的 MC 估计
