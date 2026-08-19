---
type: paper
layer: 占位
title: One Step Diffusion via Shortcut Models
aliases: [Shortcut]
year: 2024
authors: [Kevin Frans, Danijar Hafner, Sergey Levine, Pieter Abbeel]
venue: arXiv 2024
arxiv: "2410.12557"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, flow map, 从头训练]
tags: [paper, 占位层]
---

# One Step Diffusion via Shortcut Models（Shortcut·七节版）

## 1. 一句话贡献

单网络单阶段自举式少步生成：网络以步长为条件，自己的两步预测当一步预测的目标——**B8 遗留补卡**（flow map 列关键节点）。

## 2. 核心贡献

1. 单网络单阶段自举式少步生成：网络以步长为条件，自己的两步预测当一步预测的目标
2. B8 遗留补卡（flow map 列关键节点）。

## 3. 方法概要

网络输出 v(x,t,d)：d=步长条件。两步小步长预测 = 一步大步长目标（自举）；无 teacher 无 replay buffer。

## 4. 核心公式

$$
v(x_t, t, 2d) \approx v(x_{t+d}, t-d, d) + v(x_t, t, d),\ \text{即 } 2\text{步之和}\to 1\text{步}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占 FM×flow map×自举格；→ AYF/AnyFlow 把它统一进连续时间流图；→ 改进版（2510.21250）修其 target-lag


## 6. 影响与占位意义

flow map 列的奠基占位（B8 待办清账第一项）。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[注意力核心公式]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
