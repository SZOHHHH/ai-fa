---
type: paper
layer: 占位
title: Path-Guided Flow Matching for Dataset Distillation
aliases: [PGFM]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2602.05616"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, —, 数据集蒸馏]
tags: [paper, 占位层]
---

# Path-Guided Flow Matching for Dataset Distillation（PGFM·七节版）

## 1. 一句话贡献

FM 进数据集蒸馏：路径引导的流匹配压缩数据集——FM 应用面再扩张。

## 2. 核心贡献

1. FM 进数据集蒸馏：路径引导的流匹配压缩数据集——FM 应用面再扩张。

## 3. 方法概要

用 FM 的路径灵活性引导数据集蒸馏的梯度匹配。

## 4. 核心公式

$$
\mathcal{L} = \text{path-guided}\ \big\|\nabla_x \ell(\text{syn}) - \nabla_x \ell(\text{real})\big\|
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 FM×数据集蒸馏格（蒸馏概念的另一种含义——数据而非模型）


## 6. 影响与占位意义

RS 库 02-05 已有；FM×蒸馏词的歧义案例（模型蒸馏 vs 数据蒸馏）。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
