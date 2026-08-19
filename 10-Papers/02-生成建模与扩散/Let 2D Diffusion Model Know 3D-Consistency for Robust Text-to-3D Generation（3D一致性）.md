---
type: paper
layer: 占位
title: Let 2D Diffusion Model Know 3D-Consistency for Robust Text-to-3D Generation
aliases: [3D一致性]
year: 2023
authors: [arXiv]
venue: arXiv 2023
arxiv: "2303.07937"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散, —, 3D域]
tags: [paper, 占位层]
---

# Let 2D Diffusion Model Know 3D-Consistency for Robust Text-to-3D Generation（3D一致性·七节版）

## 1. 一句话贡献

2D 先验注入 3D 一致性约束的文生 3D——2D→3D 蒸馏的约束路线。

## 2. 核心贡献

1. 2D 先验注入 3D 一致性约束的文生 3D
2. 2D→3D 蒸馏的约束路线。

## 3. 方法概要

多视角一致性损失联合 2D 扩散先验。

## 4. 核心公式

$$
\mathcal{L} = \mathcal{L}_{2D} + \lambda\,\mathcal{L}_{3D\text{-}consist}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 3D 生成约束格；→ [[ProlificDreamer- High-Fidelity and Diverse Text-to-3D Generation with Variational Score Distillation（VSD）]]


## 6. 影响与占位意义

RS 库 03-14 情报。

> 近邻同族：[[Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]] · [[Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[注意力核心公式]]

## 7. 读前须知

需要：SDS（score distillation sampling）；NeRF 载体；多视角一致性
