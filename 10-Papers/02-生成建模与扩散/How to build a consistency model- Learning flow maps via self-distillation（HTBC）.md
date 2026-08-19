---
type: paper
layer: 占位
title: How to build a consistency model- Learning flow maps via self-distillation
aliases: [HTBC]
year: 2025
authors: [（arXiv）]
venue: arXiv 2025
arxiv: "2505.18825"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, 一致性, 从头训练]
tags: [paper, 占位层]
---

# How to build a consistency model- Learning flow maps via self-distillation（HTBC·七节版）

## 1. 一句话贡献

自蒸馏免教师的一致性/流图训练系统研究——"怎么搭一致性模型"的工程化定型（何恺明系工作脉络）。

## 2. 核心贡献

1. 自蒸馏免教师的一致性/流图训练系统研究
2. "怎么搭一致性模型"的工程化定型（何恺明系工作脉络）。

## 3. 方法概要

分析一致性训练的各设计选择（离散化、EMA、损失形式），给出自蒸馏流图的标准配方。

## 4. 核心公式

$$
\mathcal{L} = \big\|F_\theta(x_{t_2}, t_2) - \mathrm{sg}\big[F_{\text{EMA}}(x_{t_1}, t_1)\big]\big\|^2,\ x_{t_2} \text{ 由 } F_\theta \text{ 一步}\to x_{t_1}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占 FM×一致性×自蒸馏格；→ [[One Step Diffusion via Shortcut Models（Shortcut）]]（同用 EMA 思想）；← [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]


## 6. 影响与占位意义

一致性家族 2025 年的工程化收束点。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[注意力核心公式]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
