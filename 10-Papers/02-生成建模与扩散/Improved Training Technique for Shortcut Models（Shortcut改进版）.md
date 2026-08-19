---
type: paper
layer: 占位
title: Improved Training Technique for Shortcut Models
aliases: [Shortcut改进版]
year: 2025
authors: [（arXiv，NeurIPS 2025）]
venue: arXiv 2025
arxiv: "2510.21250"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, flow map, 从头训练]
tags: [paper, 占位层]
---

# Improved Training Technique for Shortcut Models（Shortcut改进版·七节版）

## 1. 一句话贡献

诊断 Shortcut 自举的 target-lag 问题，双 EMA 网络（快衰减产新鲜一致性目标 + 慢衰减）修复。

## 2. 核心贡献

1. 诊断 Shortcut 自举的 target-lag 问题，双 EMA 网络（快衰减产新鲜一致性目标 + 慢衰减）修复。

## 3. 方法概要

快慢两个 EMA 副本：快的生成新目标减少滞后，慢的稳定累积——把"聚合替代锚定"思想用在 EMA 尺度上。

## 4. 核心公式

$$
v_{\text{target}} = \mathrm{EMA}_{\text{fast}}\big[v(\cdot)\big]\oplus\mathrm{EMA}_{\text{slow}},\quad \mathcal{L} = \|v_\theta(x_t,t,2d) - v_{\text{target}}\|^2
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

→ [[One Step Diffusion via Shortcut Models（Shortcut）]]（前置）；🚩 占自举稳定性格


## 6. 影响与占位意义

"聚合替代锚定"共振思想在生成蒸馏侧的又一实例（快慢 EMA=多尺度聚合）。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[注意力核心公式]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
