---
type: paper
title: "Density-Aware Reward Scaling: A Reinforcement Learning Framework for Reward-Proportional Sampling"
aliases: [DARS, Density-Aware Reward Scaling]
year: 2026
authors: [Ria Shekhawat, et al.]
venue: 待核（arXiv 2026-11-03）
arxiv: "2611.04792v1"
pdf: https://arxiv.org/pdf/2611.04792v1
line: 强化学习与对齐
matrix_coords: [奖励整形(组内密度反比), GRPO系, 多样性保持]
tags: [paper]
---
# DARS：密度反比奖励缩放——按奖励比例采样的多样性保持 RL

> 中文速览：针对 RL 期望回报最大化把概率质量集中到少数高回报结果、牺牲解多样性的问题，提出 DARS：在每个在线策略 rollout 组内估计各结果的局部密度，按密度反比缩放奖励（罕见的高回报解获得更大有效奖励），保持标准策略梯度训练流程不变——不需要密度模型、辅助目标或 critic。效果：多模态导航中 DARS-GRPO 避免 GRPO 的单模坍缩并恢复目标模式配比；文生图 prompt 适配跨数据集与骨干模型一致提升图像与 prompt 多样性且保持语义对齐。

## 1. 一句话贡献

在每个 on-policy rollout 组内按结果局部密度的反比缩放奖励——让 RL 的期望回报最大化不再把概率质量坍缩到少数高回报模式，而按各解的「好程度」比例采样；不引入密度模型/辅助目标/critic，标准策略梯度流程原样保留。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/RLHF]] · [[20-Algorithms/GRPO与RLVR]]（密度估计直接做在 GRPO 的组内 rollout 上——组相对框架的奖励整形插件）；
- ≡ 同族近邻（261104）：[[10-Papers/04-强化学习与对齐/What Drives the Zero-to-One Jump Diagnosing and Steering Hard-Prompt Learning in RLVR|NAPO]]（同日同题：都挖 GRPO 组内被浪费的信号——DARS 挖正样本密度、NAPO 挖负样本分级）；[[10-Papers/04-强化学习与对齐/BrainwashedLLM Jailbreaking via Automated Adversarial Chain of Thoughts Discovery|BrainwashedLLM]]（同日 GRPO 奖励定制家族）；
- 概念/公式链：[[30-Formulas/GRPO目标]]（组内标准化优势的奖励端改造）· [[40-Concepts/熵正则RL]]（多样性目标的对照路线：一个改奖励分布、一个加策略熵正则）· [[40-Concepts/策略梯度定理]]。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.04792v1；在线全文（新论文）：https://arxiv.org/html/2611.04792v1

---

> 谱系枢纽：[[20-Algorithms/GRPO与RLVR]]（图谱连通入口）

> 数学根基：[[30-Formulas/GRPO目标]] · [[40-Concepts/熵正则RL]] · [[40-Concepts/策略梯度定理]]
