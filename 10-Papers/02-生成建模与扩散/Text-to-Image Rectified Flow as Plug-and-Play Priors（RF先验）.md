---
type: paper
layer: 占位
title: Text-to-Image Rectified Flow as Plug-and-Play Priors
aliases: [RF先验]
year: 2024
authors: [Zhao et al.]
venue: arXiv 2024
arxiv: "2406.03293"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, 潜空间, —]
tags: [paper, 占位层]
---

# Text-to-Image Rectified Flow as Plug-and-Play Priors（RF先验·七节版）

## 1. 一句话贡献

矩形流当即插即用先验：在 RF 先验上加噪-去噪完成条件任务（3D/编辑）——RF 版 SDEdit。

## 2. 核心贡献

1. 矩形流当即插即用先验：在 RF 先验上加噪-去噪完成条件任务（3D/编辑）
2. RF 版 SDEdit。

## 3. 方法概要

冻结 RF 先验，条件信号通过加噪注入，去噪即条件生成。

## 4. 核心公式

$$
x = \mathrm{denoise}_{RF}\big(\mathrm{noise}(x_0, t^*), c\big)
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

≡ [[SDEdit- Guided Image Synthesis and Editing with Stochastic Differential Equations（SDEdit）]]（扩散版同款思路）；🚩 占 RF×即插即用格


## 6. 影响与占位意义

RS 库 06-04 已有情报卡；矩形流应用面扩张的证据。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[概率流ODE]] · [[常微分方程（ODE）]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
