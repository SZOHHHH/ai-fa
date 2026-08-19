---
type: paper
layer: 占位
title: Self-Improving World Modelling with Latent Actions
aliases: [SWIRL]
year: 2026
authors: [arXiv]
venue: arXiv 2026
arxiv: "2602.06130"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [隐式, 潜在状态, 自提升]
tags: [paper, 占位层]
---

# Self-Improving World Modelling with Latent Actions（SWIRL·七节版）

## 1. 一句话贡献

自提升潜动作世界建模：动作当潜变量交替优化，从纯状态序列学习。

## 2. 核心贡献

1. 自提升潜动作世界建模：动作当潜变量交替优化，从纯状态序列学习。

## 3. 方法概要

EM 式交替优化动作后验与世界模型。

## 4. 核心公式

$$
\mathcal{L} = \mathbb{E}_{q(a)}[\log p(s_{t+1}|s_t,a)] - KL(q(a|s)||p(a))
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

潜动作家族第 7 篇；潜变量推断视角已有人做


## 6. 影响与占位意义

潜动作谱系理论化证据。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Analytic Planning under Uncertainty with Moment Closure（矩闭合规划）]] · [[Co-Evolving Latent Action World Models（CoLA）]]
> 数学根基（占位层）：[[扩散条件去噪]] · [[贝尔曼方程]]

## 7. 读前须知

需要：贝尔曼方程；RSSM（确定性+随机潜状态）；想象训练（imagination rollout）；价值等价 vs 重建两种哲学
