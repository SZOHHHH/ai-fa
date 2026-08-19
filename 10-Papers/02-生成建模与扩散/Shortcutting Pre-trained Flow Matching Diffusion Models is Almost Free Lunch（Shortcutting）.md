---
type: paper
layer: 占位
title: Shortcutting Pre-trained Flow Matching Diffusion Models is Almost Free Lunch
aliases: [Shortcutting]
year: 2025
authors: [（NVIDIA）]
venue: arXiv 2025
arxiv: "2510.17858"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, flow map, 免训练]
tags: [paper, 占位层]
---

# Shortcutting Pre-trained Flow Matching Diffusion Models is Almost Free Lunch（Shortcutting·七节版）

## 1. 一句话贡献

预训练 FM 加 shortcut 头即得少步：几步微调（非完整蒸馏）获得 1-4 步能力——"免费午餐"级别的工程捷径。

## 2. 核心贡献

1. 预训练 FM 加 shortcut 头即得少步：几步微调（非完整蒸馏）获得 1-4 步能力
2. "免费午餐"级别的工程捷径。

## 3. 方法概要

在预训练 FM 上加步长条件头，少量微调适配两步自举目标。

## 4. 核心公式

$$
v(x_t, t, d)\ \text{微调}\ \leftarrow\ v\big(x_{t-d}, t-d, d/2\big) + v(x_t, t, d/2)
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

← [[One Step Diffusion via Shortcut Models（Shortcut）]]（B13 入库）；🚩 占 FM×免蒸馏少步格（与 [[Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）|MFD]] 蒸馏路线正交的捷径）


## 6. 影响与占位意义

RS 库 10-15 已有；**对 MFD 类蒸馏的竞争**：如果微调头够便宜，完整蒸馏的价值叙事受压——敌情价值高。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[注意力核心公式]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
