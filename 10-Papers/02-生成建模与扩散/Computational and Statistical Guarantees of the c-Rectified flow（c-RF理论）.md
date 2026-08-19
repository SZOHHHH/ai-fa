---
type: paper
layer: 占位
title: Computational and Statistical Guarantees of the c-Rectified flow
aliases: [c-RF理论]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2608.02487"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, —, 计算统计理论]
tags: [paper, 占位层]
---

# Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论·七节版）

## 1. 一句话贡献

c-rectified flow 的计算/统计保证：收敛-计算权衡的正式定理——RF 理论线 2026 最新占位。

## 2. 核心贡献

1. c-rectified flow 的计算/统计保证：收敛-计算权衡的正式定理
2. RF 理论线 2026 最新占位。

## 3. 方法概要

条件版 RF 的样本复杂度与计算预算联合界。

## 4. 核心公式

$$
\mathbb{E}[W_2] \le C\,\big(\text{computational budget}^{-\alpha} + \text{statistical error}\big)
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 RF×理论格最新占位；← [[Flow Straight and Fast- Learning to Generate and Transfer Data with Rectified Flow（矩形流）]]（本批）


## 6. 影响与占位意义

RS 库 08-03 已有；理论侧持续活跃的信号。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Drift Flow Matching（DFM）]]
> 矩形流谱系环：[[Text-to-Image Rectified Flow as Plug-and-Play Priors（RF先验）]] ← 本卡 → [[ProReflow- Progressive Reflow with Decomposed Velocity（ProReflow）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[概率流ODE]] · [[常微分方程（ODE）]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
