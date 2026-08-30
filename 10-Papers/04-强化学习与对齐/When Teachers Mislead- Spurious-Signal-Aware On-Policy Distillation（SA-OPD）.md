---
type: paper
layer: 占位
title: When Teachers Mislead- Spurious-Signal-Aware On-Policy Distillation
aliases: [SA-OPD]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2608.03632"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [学生轨迹, 反向KL, token级]
tags: [paper, 占位层]
---

# When Teachers Mislead- Spurious-Signal-Aware On-Policy Distillation（SA-OPD·七节版）

## 1. 一句话贡献

诊断"高置信但低输入接地的 teacher 信号会误导优化"并过滤之——只用双判据（低接地 ∧ 高影响）屏蔽误导 token。

## 2. 核心贡献

1. 诊断"高置信但低输入接地的 teacher 信号会误导优化"并过滤之
2. 只用双判据（低接地 ∧ 高影响）屏蔽误导 token。

## 3. 方法概要

输入接地代理（token 信号是否真依赖输入）+ 优化影响度（对训练的影响强度）双判据过滤；熵判据不够（误导信号恰是低熵高影响的）。

## 4. 核心公式

$$
\mathcal{L} = \mathbb{E}\Big[\sum_t \big(1-\mathbb{1}[\uparrow\text{impact}_t \wedge \downarrow\text{ground}_t]\big)\cdot \mathrm{KL}_t\Big]
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占"teacher 信号不可靠"诊断位（与 [[Entropy-Aware On-Policy Distillation of Language Models（EOPD）|EOPD]] 熵诊断互补：EOPD 管 teacher 不确定，SA-OPD 管 teacher 错得自信）


## 6. 影响与占位意义

方向占坑速度的活证据（同类工作密集出现）。

> 近邻同族：[[Any-OPD- Heterogeneous On-Policy Distillation for Flow-Matching Models via Representation-Space Bridging（Any-OPD）]] · [[CausalOPD- First-Wrong-Step Supervision for Distilling Causal Chain Reasoning（CausalOPD）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：KL 散度两方向（前向=质量覆盖，反向=模式搜索）；策略梯度；反向 KL 的单样本可估性——整个 OPD 家族计算可行的钥匙
