---
type: paper
layer: 占位
title: Self-Corrected Flow Distillation
aliases: [SelfCorrect]
year: 2024
authors: [（arXiv）]
venue: arXiv 2024
arxiv: "2412.16906"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM(潜), 蒸馏, 蒸馏预训练]
tags: [paper, 占位层]
---

# Self-Corrected Flow Distillation（SelfCorrect·七节版）

## 1. 一句话贡献

潜流匹配 teacher 蒸馏为一致的一/少步生成器，带自校正机制。

## 2. 核心贡献

1. 潜流匹配 teacher 蒸馏为一致的一/少步生成器，带自校正机制。

## 3. 方法概要

student 少步采样后经 teacher 噪声化再校正，形成闭环自纠偏。

## 4. 核心公式

$$
x^{\text{corr}} = \text{denoise}_T\big(\text{noise}(x_1^S, t)\big),\ \mathcal{L}=\|x_1^S - x^{\text{corr}}\|^2
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占潜 FM×蒸馏×自校格式


## 6. 影响与占位意义

闭式自校正路线占位。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Analyzing and Improving the Image Quality of StyleGAN（StyleGAN2）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
