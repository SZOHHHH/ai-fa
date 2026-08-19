---
type: paper
layer: 占位
title: Factored Latent Action World Models
aliases: [FLAM]
year: 2026
authors: [arXiv]
venue: arXiv 2026
arxiv: "2602.16229"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [隐式(视频自监督), 潜在状态, 可操作(动作条件)]
tags: [paper, 占位层]
---

# Factored Latent Action World Models（FLAM·七节版）

## 1. 一句话贡献

因子化潜动作世界模型：场景分解独立因子各自潜动态。

## 2. 核心贡献

1. 因子化潜动作世界模型：场景分解独立因子各自潜动态。

## 3. 方法概要

因子分解+独立潜动态。

## 4. 核心公式

$$
z^{(k)}_{t+1} = f^{(k)}(z^{(k)}_t, a_t)
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

潜动作家族第 6 篇


## 6. 影响与占位意义

潜动作方向 2026-01 至今 6 连占。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Co-Evolving Latent Action World Models（CoLA）]] · [[Hierarchical Planning with Latent World Models（HPLWM）]]
> 数学根基（占位层）：[[扩散条件去噪]] · [[贝尔曼方程]]

## 7. 读前须知

需要：贝尔曼方程；RSSM（确定性+随机潜状态）；想象训练（imagination rollout）；价值等价 vs 重建两种哲学
