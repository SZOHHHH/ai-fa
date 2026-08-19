---
type: paper
title: Score Distillation of Flow Matching Models
aliases: [SDS-FM, Score Distillation FM]
year: 2025
authors: [Ziqi Ye, et al.]
venue: arXiv 2025
arxiv: "2509.25127"
line: 生成建模与扩散
matrix_coords: [FM, score蒸馏, 蒸馏预训练]
tags: [paper]
---

# Score Distillation for FM

## 1. 一句话贡献

系统研究 score distillation（SDS 系思想）直接迁移到 FM 骨干会发生什么——为“扩散蒸馏法 × FM 骨干”这个交叉格提供了机理分析与修正。

## 2. 核心贡献

- **SDS→ [[Flow Matching for Generative Modeling（流匹配）]]
- **修正机制**：针对 FM 几何的稳定化项
- 与 [[Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）|MFD]] 的对照：本文代表“把扩散方法硬搬”路线，MFD 论文引其论证“间接转换的缺陷”——**同一格的失败路线与成功路线对照**

## 3. 方法概要

1. 从 SDS/VSD 家族的梯度形式出发
2. 推导 FM 参数化下的等价形式与误差项
3. 稳定化设计（方差缩减/权重修正）
4. 图像域实验验证

## 4. 核心公式

- 换算桥梁：$u_t = \sigma_t s_\theta + \frac{\sigma'_t}{\sigma_t}(x_t - \mu_t)$（速度↔score 的线性关系，[[30-Formulas/条件流匹配损失]] §2 换算表的延伸）
- SDS 梯度 $\nabla_x \log p \approx (s_{\text{teacher}} - s_{\text{student}})$ 的 FM 版修正

## 5. 与前作的关系

- 迁移 [SDS（Poole 2022）/VSD] 思想到 FM——MFD 论文批判的“间接 score 转换”即指此路线
- 与 [[10-Papers/02-生成建模与扩散/Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）]] 同格对照（间接 vs 原生）

## 6. 影响与后续

- 为 FM×score蒸馏格补上机理文献；后续原生 FM 蒸馏法（MFD 系）的“对照组”价值

## 7. 读前须知

[[30-Formulas/条件流匹配损失]]（换算表）、[[30-Formulas/DSM目标]]、[[10-Papers/02-生成建模与扩散/Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）]]

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
