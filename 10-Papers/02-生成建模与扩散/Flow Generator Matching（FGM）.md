---
type: paper
layer: 占位
title: Flow Generator Matching
aliases: [FGM]
year: 2024
authors: [Meta / NYU]
venue: arXiv 2024
arxiv: "2410.19310"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, 蒸馏(score/KL/对抗), 蒸馏预训练]
tags: [paper, 占位层]
---

# Flow Generator Matching（FGM·七节版）

## 1. 一句话贡献

把 on-policy 蒸馏思想引入 FM：student 一步生成 → 在任意噪声级 t 上对齐 teacher 的速度场——"on-policy × FM"的早期框架占位（RS 情报点名拥挤者之一）。

## 2. 核心贡献

1. 把 on-policy 蒸馏思想引入 FM：student 一步生成 → 在任意噪声级 t 上对齐 teacher 的速度场
2. "on-policy × FM"的早期框架占位（RS 情报点名拥挤者之一）。

## 3. 方法概要

student 在自身样本上以任意噪声级查询 teacher 速度场作为回归目标；逐步对齐全轨迹而非仅端点。

## 4. 核心公式

$$
\mathcal{L} = \mathbb{E}_{t,\epsilon}\big\| v_T(x_t^S, t) - \mathrm{sg}\big[v_\theta\text{-target}\big] \big\|^2,\quad x_t^S = (1-t)\epsilon + t\,G_\theta(\epsilon)
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占 [[60-Matrices/生成模型加速矩阵]] FM×蒸馏格的早期占位；→ [[Any-OPD- Heterogeneous On-Policy Distillation for Flow-Matching Models via Representation-Space Bridging（Any-OPD）]]（B12）把该思想推到异构黑盒场景


## 6. 影响与占位意义

RS 库 Planning/04 点名的"flow 蒸馏拥挤区"成员。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
