---
type: paper
layer: 占位
title: CausalOPD- First-Wrong-Step Supervision for Distilling Causal Chain Reasoning
aliases: [CausalOPD]
year: 2026
authors: [arXiv]
venue: arXiv 2026
arxiv: "2608.03673"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [学生轨迹, 反向KL, 步级]
tags: [paper, 占位层]
---

# CausalOPD- First-Wrong-Step Supervision for Distilling Causal Chain Reasoning（CausalOPD·七节版）

## 1. 一句话贡献

OPD 定位"第一个错步"做监督：因果链推理的蒸馏——OPD 家族继续细分占位（步级定位路线）。

## 2. 核心贡献

1. OPD 定位"第一个错步"做监督：因果链推理的蒸馏
2. OPD 家族继续细分占位（步级定位路线）。

## 3. 方法概要

用 teacher 定位学生推理链的首错步，仅在该步施加纠正监督。

## 4. 核心公式

$$
\mathcal{L} = \mathrm{KL}(\pi_\theta \Vert \pi_T)\ \text{仅}@\ t^* = \arg\min_t\ \text{首个偏离}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩🚩 蒸馏域矩阵"步级×OPD"新格——OPD 占坑仍在加速（第 10 篇）；≡ [[When Teachers Mislead- Spurious-Signal-Aware On-Policy Distillation（SA-OPD）]]（都是 teacher-信号定位）


## 6. 影响与占位意义

RS 库 08-04 情报；OPD 家族 2026-08 仍在月更。

> 近邻同族：[[Any-OPD- Heterogeneous On-Policy Distillation for Flow-Matching Models via Representation-Space Bridging（Any-OPD）]] · [[Entropy-Aware On-Policy Distillation of Language Models（EOPD）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：KL 散度两方向（前向=质量覆盖，反向=模式搜索）；策略梯度；反向 KL 的单样本可估性——整个 OPD 家族计算可行的钥匙
