---
type: paper
layer: 占位
title: Statistical Properties of Rectified Flow
aliases: [RF统计理论]
year: 2025
authors: [（arXiv）]
venue: arXiv 2025
arxiv: "2511.03193"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, —, 统计理论]
tags: [paper, 占位层]
---

# Statistical Properties of Rectified Flow（RF统计理论·七节版）

## 1. 一句话贡献

矩形流的统计性质：收敛率/样本复杂度的正式刻画——RF 理论侧奠基。

## 2. 核心贡献

1. 矩形流的统计性质：收敛率/样本复杂度的正式刻画——RF 理论侧奠基。

## 3. 方法概要

reflow 迭代的收敛阶分析；分布距离的样本复杂度界。

## 4. 核心公式

$$
W_2\big(p^{(k+1)}, p^*\big) \le \rho\, W_2\big(p^{(k)}, p^*\big)\ \text{(reflow 收缩率)}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占 FM×统计理论格；← [[矩形流]]（库内）；→ c-RF 理论（本批）


## 6. 影响与占位意义

RS 库 11-05 已有；理论奠基层。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 矩形流谱系环：[[Variational Rectified Flow Matching（VRFM）]] ← 本卡 → [[Text-to-Image Rectified Flow as Plug-and-Play Priors（RF先验）]]
> 数学根基（占位层）：[[RoPE旋转位置编码]] · [[位置编码]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
