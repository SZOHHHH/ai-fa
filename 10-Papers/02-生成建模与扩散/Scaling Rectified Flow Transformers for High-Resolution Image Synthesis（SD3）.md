---
type: paper
layer: 占位
title: Scaling Rectified Flow Transformers for High-Resolution Image Synthesis
aliases: [SD3]
year: 2024
authors: [Esser et al. (Stability AI)]
venue: arXiv 2024
arxiv: "2403.03206"
pdf: 已下载（PDF/）
line: false
matrix_coords: [FM, 潜空间, —]
tags: [paper, 占位层]
---

# Scaling Rectified Flow Transformers for High-Resolution Image Synthesis（SD3·七节版）

## 1. 一句话贡献

矩形流做生成目标（多分辨率噪声调度），MM-[[Scalable Diffusion Models with Transformers（DiT）|DiT]] 双流架构处理文本-图像联合去噪。

## 2. 核心贡献

1. 矩形流做生成目标（多分辨率噪声调度），MM-[[Scalable Diffusion Models with Transformers（DiT）|DiT]] 双流架构处理文本-图像联合去噪。

## 3. 方法概要


$$
x_t = (1-t)x_0 + t\,x_1,\ \mathcal{L} = \|v_\theta(x_t, t, c) - (x_1 - x_0)\|^2\ \text{(MM-DiT 双流)}
$$


## 4. 核心公式

← 矩形流/流匹配；→ [[Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）]]（潜 FM 文生图的当代基准骨干）；加速矩阵潜 FM 行补齐

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

B18 奠基补齐：潜 FM 骨干（知识库生成线缺的当代锚点）。


## 6. 影响与占位意义

undefined

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[概率流ODE]] · [[常微分方程（ODE）]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
