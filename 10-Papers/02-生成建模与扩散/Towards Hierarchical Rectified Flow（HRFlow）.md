---
type: paper
layer: 占位
title: Towards Hierarchical Rectified Flow
aliases: [HRFlow]
year: 2025
authors: [（arXiv）]
venue: arXiv 2025
arxiv: "2502.17436"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, flow map, —]
tags: [paper, 占位层]
---

# Towards Hierarchical Rectified Flow（HRFlow·七节版）

## 1. 一句话贡献

层级矩形流：多层时间尺度分解的 RF——粗到细的时间层级。

## 2. 核心贡献

1. 层级矩形流：多层时间尺度分解的 RF——粗到细的时间层级。

## 3. 方法概要

把整条轨迹分解为层级子流（粗尺度先走），各层 reflow 拉直。

## 4. 核心公式

$$
T = T_L \circ T_{L-1} \circ \cdots \circ T_1\ \text{(层级复合传输)}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占 FM×层级格；≡ [[Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）]]（逐 token 噪声=另一种层级）


## 6. 影响与占位意义

RS 库 02-24 已有；时间粒度轴思想的 FM 实例。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 矩形流谱系环：[[Flow Straight and Fast- Learning to Generate and Transfer Data with Rectified Flow（矩形流）]] ← 本卡 → [[Variational Rectified Flow Matching（VRFM）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[概率流ODE]] · [[常微分方程（ODE）]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
