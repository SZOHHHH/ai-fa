---
type: paper
layer: 占位
title: SG-OPD- Sign-Gated On-Policy Distillation via Sign-Consistency Gating and Phased Teacher Sampling
aliases: [SG-OPD]
year: 2026
authors: [Haoran Xu, Hongyu Wang et al.]
venue: arXiv 2026
arxiv: "2606.09304"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [学生轨迹+结果信号, 反向KL, token级]
tags: [paper, 占位层]
---

# SG-OPD- Sign-Gated On-Policy Distillation via Sign-Consistency Gating and Phased Teacher Sampling（SG-OPD·七节版）

## 1. 一句话贡献

二元 verifier 当 trust 信号：token 级符号一致性门控 + 分阶段 teacher 采样（冷启动期混入 verifier 批准的 teacher rollout）。

## 2. 核心贡献

1. 二元 verifier 当 trust 信号：token 级符号一致性门控 + 分阶段 teacher 采样（冷启动期混入 verifier 批准的 teacher rollout）。

## 3. 方法概要

双粒度门控：token 级（teacher 信号与学生更新方向符号一致才保留）+ 阶段级（训练早期注入 teacher 轨迹保探索）。胜标准 OPD +1.98/+7.50（样本级/问题级），保持策略熵。

## 4. 核心公式

$$
\hat A_t = g_t \cdot \big(-\mathrm{KL}_t(\pi_\theta \Vert \pi_T)\big),\quad g_t = \mathbb{1}\big[\mathrm{sign}(\nabla \log\pi_\theta) = \mathrm{sign}(\Delta^T_t)\big]
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占蒸馏域矩阵组合奖励格（双粒度门控）；≡ [[When Teachers Mislead- Spurious-Signal-Aware On-Policy Distillation（SA-OPD）]]（都处理"teacher 会错"）


## 6. 影响与占位意义

证明"verifier×teacher"组合方向已有系统性占位。

> 近邻同族：[[Hybrid Reinforcement- When Reward Is Sparse, It is Better to Be Dense（HERO）]] · [[Learning beyond Teacher- Generalized On-Policy Distillation with Reward Extrapolation（G-OPD）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[注意力核心公式]]

## 7. 读前须知

需要：KL 散度两方向（前向=质量覆盖，反向=模式搜索）；策略梯度；反向 KL 的单样本可估性——整个 OPD 家族计算可行的钥匙
