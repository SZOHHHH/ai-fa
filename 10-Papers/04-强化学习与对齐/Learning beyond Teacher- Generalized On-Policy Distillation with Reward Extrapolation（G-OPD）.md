---
type: paper
layer: 占位
title: Learning beyond Teacher- Generalized On-Policy Distillation with Reward Extrapolation
aliases: [G-OPD]
year: 2026
authors: [Renmin Univ / Tencent]
venue: arXiv 2026
arxiv: "2602.12125"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [学生轨迹+结果信号, 混合散度, token+序列级]
tags: [paper, 占位层]
---

# Learning beyond Teacher- Generalized On-Policy Distillation with Reward Extrapolation（G-OPD·七节版）

## 1. 一句话贡献

证明 OPD = KL 约束 RL 的特例（奖励/KL 权重固定 1:1、参考模型任意），进而**解耦奖励权重与参考模型选择**并给理论分析——OPD 混合权重理论的框架位占位者（敌方核查 #1 威胁）。

## 2. 核心贡献

1. 证明 OPD = KL 约束 RL 的特例（奖励/KL 权重固定 1:1、参考模型任意），进而解耦奖励权重与参考模型选择并给理论分析
2. OPD 混合权重理论的框架位占位者（敌方核查 #1 威胁）。

## 3. 方法概要

OPD 的 per-token 反向 KL 奖励可重写为 KL 约束 RL 的实例；G-OPD 引入奖励外推：显式调节奖励缩放因子 γ 与参考模型 π_ref 的选择，分析两者对蒸馏性能的影响。

## 4. 核心公式

$$
\max_\pi \, \mathbb{E}_{y\sim\pi}\big[\gamma\, r^{\text{OPD}}_t\big] - \beta\,\mathrm{KL}\big(\pi\ \Vert\ \pi_{\text{ref}}\big),\quad r^{\text{OPD}}_t = \log\pi_T - \log\pi
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

← [[10-Papers/04-强化学习与对齐/On-Policy Distillation（Thinking Machines 博客）]]（证明其 1:1 特例地位）；🚩 占 [[60-Matrices/蒸馏域矩阵]] §3 核心机会格——**该格由此关闭**


## 6. 影响与占位意义

敌方核查主证据（70-Ideas/敌方核查-OPD混合奖励idea）：B10#1 idea 的 T1/T2 框架位被其占据。

> 近邻同族：[[Hybrid Reinforcement- When Reward Is Sparse, It is Better to Be Dense（HERO）]] · [[Process Reinforcement through Implicit Rewards（PRIME）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：KL 散度两方向（前向=质量覆盖，反向=模式搜索）；策略梯度；反向 KL 的单样本可估性——整个 OPD 家族计算可行的钥匙
