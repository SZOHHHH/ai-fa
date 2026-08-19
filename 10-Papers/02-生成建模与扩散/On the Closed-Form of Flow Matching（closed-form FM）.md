---
type: paper
layer: 占位
title: On the Closed-Form of Flow Matching
aliases: [closed-form FM]
year: 2025
authors: [（arXiv）]
venue: arXiv 2025
arxiv: "2506.03719"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, —, 理论]
tags: [paper, 占位层]
---

# On the Closed-Form of Flow Matching（closed-form FM·七节版）

## 1. 一句话贡献

FM 闭式解与泛化分析：证明泛化不来自目标随机性——FM 理论侧的奠基级论文（RS 库 relevance 5 收录）。

## 2. 核心贡献

1. FM 闭式解与泛化分析：证明泛化不来自目标随机性
2. FM 理论侧的奠基级论文（RS 库 relevance 5 收录）。

## 3. 方法概要

在可解设定下给出 FM 的闭式解，分析训练随机性与泛化的关系。

## 4. 核心公式

$$
v^*(x,t) = \mathbb{E}[x_1 - x_0 | x_t = x]\ \text{的闭式刻画与泛化界}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

← 流匹配/矩形流的理论后继；支撑 [[Mean Flows for One-step Generative Modeling（MeanFlow）|MeanFlow]] 系的"平均量"合法性


## 6. 影响与占位意义

理论奠基层（RS 库 06-04 已有情报卡）。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[概率流ODE]] · [[常微分方程（ODE）]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
