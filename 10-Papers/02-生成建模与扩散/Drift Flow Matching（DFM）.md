---
type: paper
layer: 占位
title: Drift Flow Matching
aliases: [DFM]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2605.17244"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, 平均速度, 从头训练]
tags: [paper, 占位层]
---

# Drift Flow Matching（DFM·七节版）

## 1. 一句话贡献

any-step + mean-velocity + two-time transport 三合一的 FM 训练框架——**RS 情报确认它已占死 any-step 格**（曾毙掉你的 C1 候选）。

## 2. 核心贡献

1. any-step + mean-velocity + two-time transport 三合一的 FM 训练框架
2. RS 情报确认它已占死 any-step 格（曾毙掉你的 C1 候选）。

## 3. 方法概要

以两时刻传输与平均速度为对象，单模型支持任意步数采样；自承 mean-velocity self-distillation 存在不稳定性与跨任务泛化问题。

## 4. 核心公式

$$
\mathcal{L} = \mathbb{E}\big\| u_\theta(x_s, s, e) - U(x_s, s, e) \big\|^2,\quad U = \text{两时刻平均速度场}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩🚩 占 [[60-Matrices/生成模型加速矩阵]] FM×平均速度×any-step 格；与 [[Mean Flows for One-step Generative Modeling（MeanFlow）|MeanFlow]]/[[Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）|MFD]] 同格竞争者（其"不稳"自承恰是 RS 主线切入点）


## 6. 影响与占位意义

any-step 战场的决定性占位者（NVIDIA 三连之一）。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[条件流匹配损失]] · [[概率流ODE]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
