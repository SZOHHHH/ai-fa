---
type: paper
layer: 占位
title: Exploring Diffusion and Flow Matching Under Generator Matching
aliases: [Generator Matching]
year: 2024
authors: [Li et al. (Meta)]
venue: arXiv 2024
arxiv: "2412.11024"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, 统一框架, —]
tags: [paper, 占位层]
---

# Exploring Diffusion and Flow Matching Under Generator Matching（Generator Matching·七节版）

## 1. 一句话贡献

生成器匹配统一框架：一个模型在扩散（随机）与 FM（确定）间连续切换——**统一者家族的新成员**（RS 库 C3 候选的理论支点）。

## 2. 核心贡献

1. 生成器匹配统一框架：一个模型在扩散（随机）与 FM（确定）间连续切换
2. 统一者家族的新成员（RS 库 C3 候选的理论支点）。

## 3. 方法概要

单生成器以 λ∈[0,1] 调度确定/随机范式；扩散与 FM 是两个端点。

## 4. 核心公式

$$
dx = \big[(1-\lambda)v_t + \lambda s_t\big]dt + \lambda\,dw\ \text{(λ 调度)}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

≡ [[Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]]（统一 VE/VP）/随机插值（统一扩散/流）——统一者母题第三例；**RS 库 C3 候选的"被点名 open"出处**


## 6. 影响与占位意义

RS 库 06-20 已有；RS C3 候选（混合确定-随机蒸馏）的直接理论地基。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[条件流匹配损失]] · [[概率流ODE]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
