---
type: paper
layer: 占位
title: OPTD- On-Policy Transition Distillation with Consistency-Guided Adaptive Compression for Few-Step Diffusion Language Models
aliases: [OPTD]
year: 2026
authors: [Xiaocheng Lu et al.]
venue: arXiv 2026
arxiv: "2608.02942"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [学生轨迹, 前缀选择, token级]
tags: [paper, 占位层]
---

# OPTD- On-Policy Transition Distillation with Consistency-Guided Adaptive Compression for Few-Step Diffusion Language Models（OPTD·七节版）

## 1. 一句话贡献

少步扩散 LM 的 on-policy transition 蒸馏：在 student 自己的部分轨迹上，用 question-only teacher 找"结果对齐的未来候选"，取**保持 teacher rollout 结果的最长前缀**做监督。

## 2. 核心贡献

1. 少步扩散 LM 的 on-policy transition 蒸馏：在 student 自己的部分轨迹上，用 question-only teacher 找"结果对齐的未来候选"，取保持 teacher rollout 结果的最长前缀做监督。

## 3. 方法概要

候选按当前置信度排序，选联合承诺不破坏 teacher 结果的最长前缀；set-bottleneck 目标推送已验证候选，冻结 teacher KL 锚正则其余位置。全程无 gold response。

## 4. 核心公式

$$
\mathcal{L}_{\text{sb}} = \sum_{i \in \text{prefix}^*}\big[\tau - \pi_\theta(y_i)\big]^+ + \beta \sum_{j \notin \text{prefix}^*} \mathrm{KL}_j(\pi_\theta \Vert \pi_T)
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占蒸馏域矩阵"离散/扩散 LM"分支；"选保持 outcome 的前缀"思想与 decision fidelity（RS 主线）同构


## 6. 影响与占位意义

RS 库 08-05 已收（relevance 5/5）；质量-效率 AUP 最强基线。

---

> 谱系枢纽：[[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）]]（图谱连通入口）
> 近邻同族：[[Any-OPD- Heterogeneous On-Policy Distillation for Flow-Matching Models via Representation-Space Bridging（Any-OPD）]] · [[CausalOPD- First-Wrong-Step Supervision for Distilling Causal Chain Reasoning（CausalOPD）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[注意力核心公式]]

## 7. 读前须知

需要：KL 散度两方向（前向=质量覆盖，反向=模式搜索）；策略梯度；反向 KL 的单样本可估性——整个 OPD 家族计算可行的钥匙
