---
type: paper
layer: 占位
title: Tandem Reinforcement Learning with Verifiable Rewards
aliases: [TRL]
year: 2026
authors: [Univ of Toronto / EPFL]
venue: arXiv 2026
arxiv: "2606.28166"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [学生轨迹+结果信号, —, 序列级]
tags: [paper, 占位层]
---

# Tandem Reinforcement Learning with Verifiable Rewards（TRL·七节版）

## 1. 一句话贡献

senior 模型跑 [[GRPO与RLVR|GRPO]] 式 RLVR、junior 冻结模型同步蒸馏的串联范式——蒸馏 student 成为 senior 的隐式正则（团队奖励结构替代 KL 惩罚）。

## 2. 核心贡献

1. senior 模型跑 [[GRPO与RLVR|GRPO]] 式 RLVR、junior 冻结模型同步蒸馏的串联范式
2. 蒸馏 student 成为 senior 的隐式正则（团队奖励结构替代 KL 惩罚）。

## 3. 方法概要

senior 与 frozen junior 并行训练：senior 收 RLVR 更新，其行为同时用于更新 junior；junior 的团队表现反过来约束 senior 漂移。

## 4. 核心公式

$$
J_{\text{team}}(\theta_{\text{senior}}) = J_{\text{RLVR}} + \eta\, J_{\text{distill}}(\pi_{\text{junior}} \Vert \pi_{\text{senior}})
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

边缘占位（组合视角=并行训练而非奖励混合）；与 G-OPD 的 KL 约束视角对偶


## 6. 影响与占位意义

串联/团队训练路线的代表作。

> 近邻同族：[[Hybrid Reinforcement- When Reward Is Sparse, It is Better to Be Dense（HERO）]] · [[Learning beyond Teacher- Generalized On-Policy Distillation with Reward Extrapolation（G-OPD）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[REINFORCE目标]]

## 7. 读前须知

本卡为占位层升级版；需要的数学基础见"数学根基"行所链接的公式/概念实体。
