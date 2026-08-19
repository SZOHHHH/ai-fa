---
type: paper
layer: 占位
title: Self-Distilled Reasoner- On-Policy Self-Distillation for Large Language Models
aliases: [OPSD]
year: 2026
authors: [Siyan Zhao et al.]
venue: arXiv 2026
arxiv: "2601.18734"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [学生轨迹(自), 反向KL, token级]
tags: [paper, 占位层]
---

# Self-Distilled Reasoner- On-Policy Self-Distillation for Large Language Models（OPSD·七节版）

## 1. 一句话贡献

自蒸馏版 OPD：student 在自身 rollout 上最小化与 teacher 的 per-token 散度（支持 fwd/rev KL 或 JSD），ICML 2026 poster。

## 2. 核心贡献

1. 自蒸馏版 OPD：student 在自身 rollout 上最小化与 teacher 的 per-token 散度（支持 fwd/rev KL 或 JSD），ICML 2026 poster。

## 3. 方法概要

把 OPD 目标写成逐 token 散度 D(p_T ∥ p_S) 沿 student rollout 的期望；散度形式可选，含自蒸馏配置。

## 4. 核心公式

$$
\min_\theta \mathbb{E}_{y\sim\pi_\theta}\Big[\sum_t D\big(\pi_T(\cdot|y_{<t})\ \Vert\ \pi_\theta(\cdot|y_{<t})\big)\Big]
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占蒸馏域矩阵"学生×反向KL×token级"的 ICML 2026 学术占位（与 [[Entropy-Aware On-Policy Distillation of Language Models（EOPD）|EOPD]] 同期双占）


## 6. 影响与占位意义

OPD 方向 2026 上半年已被顶会批量占位的证据。

> 近邻同族：[[A General Language Assistant as a Laboratory for Alignment（Assistant Lab）]] · [[A General Theoretical Paradigm to Understand Learning from Human Preferences（IPO）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：KL 散度两方向（前向=质量覆盖，反向=模式搜索）；策略梯度；反向 KL 的单样本可估性——整个 OPD 家族计算可行的钥匙
