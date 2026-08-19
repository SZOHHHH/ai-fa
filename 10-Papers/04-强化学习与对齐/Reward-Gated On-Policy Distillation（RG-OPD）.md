---
type: paper
layer: 占位
title: Reward-Gated On-Policy Distillation
aliases: [RG-OPD]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2607.04037"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [学生轨迹+结果信号, 反向KL, token级]
tags: [paper, 占位层]
---

# Reward-Gated On-Policy Distillation（RG-OPD·七节版）

## 1. 一句话贡献

用 verifier 奖励符号与 teacher-student likelihood gap 的一致性做 rollout 级门控——只在 teacher 信号"方向可靠"时才施加蒸馏监督。

## 2. 核心贡献

1. 用 verifier 奖励符号与 teacher-student likelihood gap 的一致性做 rollout 级门控
2. 只在 teacher 信号"方向可靠"时才施加蒸馏监督。

## 3. 方法概要

每个 rollout 计算 verifier 奖励符号与教师评估符号；两者一致→信任 teacher 的密集 token 监督，不一致→屏蔽（只用 RLVR）。桥接稀疏 verifier 与稠密 teacher logits。

## 4. 核心公式

$$
\mathcal{L} = \mathbb{1}\big[\mathrm{sign}(R) = \mathrm{sign}(\Delta_T)\big]\cdot \mathrm{KL}_{\text{rev}} + \big(1-\mathbb{1}\big)\cdot \mathcal{L}_{\text{RLVR}}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占蒸馏域矩阵"组合奖励"格（门控路线）；← [[On-Policy Distillation（Thinking Machines 博客）]]


## 6. 影响与占位意义

与 SG-OPD（符号一致性 token 级）构成门控路线双占位。

> 近邻同族：[[Hybrid Reinforcement- When Reward Is Sparse, It is Better to Be Dense（HERO）]] · [[Learning beyond Teacher- Generalized On-Policy Distillation with Reward Extrapolation（G-OPD）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：KL 散度两方向（前向=质量覆盖，反向=模式搜索）；策略梯度；反向 KL 的单样本可估性——整个 OPD 家族计算可行的钥匙
