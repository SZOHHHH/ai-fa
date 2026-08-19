---
type: paper
layer: 占位
title: Variational Rectified Flow Matching
aliases: [VRFM]
year: 2025
authors: [（arXiv）]
venue: arXiv 2025
arxiv: "2502.09616"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, —, 变分理论]
tags: [paper, 占位层]
---

# Variational Rectified Flow Matching（VRFM·七节版）

## 1. 一句话贡献

矩形流的变分框架：给 RF 一个变分下界视角——FM 理论侧的又一块砖。

## 2. 核心贡献

1. 矩形流的变分框架：给 RF 一个变分下界视角
2. FM 理论侧的又一块砖。

## 3. 方法概要

推导 RF 的 ELBO 类下界；统一边际/条件视角。

## 4. 核心公式

$$
\log p(x) \ge \mathbb{E}_{q}\big[\log p(x\vert z)\big] - \mathrm{KL}(q\ \Vert\ p)\ \text{(RF 版 ELBO)}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占 FM×变分理论格；← 随机插值/Score-SDE 理论线


## 6. 影响与占位意义

RS 库 02-13 已有；FM 理论支线。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 矩形流谱系环：[[Towards Hierarchical Rectified Flow（HRFlow）]] ← 本卡 → [[Statistical Properties of Rectified Flow（RF统计理论）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[概率流ODE]] · [[常微分方程（ODE）]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
