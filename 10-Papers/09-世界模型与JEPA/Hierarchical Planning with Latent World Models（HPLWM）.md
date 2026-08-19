---
type: paper
title: Hierarchical Planning with Latent World Models
aliases: [HPLWM]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2604.03208"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [隐式(视频自监督), 潜在状态, 分层规划]
tags: [paper]
---

# HPLWM

## 1. 一句话贡献

潜世界模型的多时间尺度分层规划——latent action 家族的分层侧占位（B10 侦察时已下载 PDF，本批补卡）。

## 2. 核心贡献

1. 多尺度潜世界模型（粗时间尺度+细时间尺度），规划在粗尺度做、执行在细尺度

## 3. 方法概要

多尺度潜世界模型（粗时间尺度+细时间尺度），规划在粗尺度做、执行在细尺度。
## 4. 核心公式


$$
\pi = \mathrm{plan}_{\text{coarse}}\big(f^{\text{coarse}}\big) \to \mathrm{exec}_{\text{fine}}\big(f^{\text{fine}}\big)
$$


**直觉**：→ 3R2D/LAPA（B10 入库）的分层续作；🚩 世界模型矩阵"潜动作×分层规划"格

## 5. 与前作/矩阵关系

分层=时间粒度轴思想在规划侧的实例（共振思想 #4）

## 6. 影响后续

需要：时间抽象（options/技能）概念

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]（图谱连通入口）

> 近邻同族：[[Co-Evolving Latent Action World Models（CoLA）]] · [[Factored Latent Action World Models（FLAM）]]

> 数学根基：[[扩散条件去噪]] · [[贝尔曼方程]]
