---
type: paper
layer: 占位
title: Perceptual Flow Matching for Few-Step Generative Modeling
aliases: [PFM]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2607.03524"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, 矩匹配(感知), 从头训练]
tags: [paper, 占位层]
---

# Perceptual Flow Matching for Few-Step Generative Modeling（PFM·七节版）

## 1. 一句话贡献

teacher-free 少步生成：把 FM 的 MSE 损失换成感知损失，一步到位——无需教师、无需辅助网络、无需蒸馏（RS 情报 C2 候选的直接竞品，被评"很近且很新"）。

## 2. 核心贡献

1. teacher-free 少步生成：把 FM 的 MSE 损失换成感知损失，一步到位
2. 无需教师、无需辅助网络、无需蒸馏（RS 情报 C2 候选的直接竞品，被评"很近且很新"）。

## 3. 方法概要

证明感知空间（非像素空间）监督把 FM 的行为从 mean-seeking 拉向 mode-seeking；换损失即得强少步生成器。

## 4. 核心公式

$$
\mathcal{L} = \mathbb{E}_t\big\| \phi\big(x_t + v_\theta\Delta t\big) - \phi\big(x_{t+\Delta t}^{\text{GT}}\big) \big\|_{\text{perc}}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占 FM×teacher-free×感知格；与 IMM（矩匹配）同在"换度量空间"轴上


## 6. 影响与占位意义

RS 情报 C2 的 novelty 竞品（暂搁原因）。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[条件流匹配损失]] · [[概率流ODE]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
