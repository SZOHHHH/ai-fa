---
type: paper
layer: 占位
title: ProReflow- Progressive Reflow with Decomposed Velocity
aliases: [ProReflow]
year: 2025
authors: [（arXiv）]
venue: arXiv 2025
arxiv: "2503.04824"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, flow map, 从头训练]
tags: [paper, 占位层]
---

# ProReflow- Progressive Reflow with Decomposed Velocity（ProReflow·七节版）

## 1. 一句话贡献

渐进式 reflow + 速度分解：逐步拉直轨迹，少步采样的免教师路线（RS 情报点名拥挤者）。

## 2. 核心贡献

1. 渐进式 reflow + 速度分解：逐步拉直轨迹，少步采样的免教师路线（RS 情报点名拥挤者）。

## 3. 方法概要

把矩形流的 reflow 分解为多阶段渐进过程，每阶段速度场分解为直分量+残差分量，逐步消除曲率。

## 4. 核心公式

$$
v_\theta = v^{\text{straight}}_\theta + v^{\text{res}}_\theta,\quad \mathcal{L}^{(k)} = \|v_\theta(x_t,t) - (x_1 - x_0)\|^2 + \lambda\|v^{\text{res}}\|^2_{\text{schedule}(k)}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占 FM×积分器/reflow 格（矩形流后继）；🌱 从头训练范式


## 6. 影响与占位意义

证明 reflow 家族仍在活跃占位。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 矩形流谱系环：[[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]] ← 本卡 → [[One Diffusion Step to Real-World Super-Resolution via Flow Trajectory Distillation（OSEDiff）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[条件流匹配损失]] · [[概率流ODE]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
