---
type: paper
layer: 占位
title: Teacher-Feature Drifting- One-Step Diffusion Distillation with Pretrained Diffusion Representations
aliases: [TFD]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2605.07327"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散, 蒸馏, 蒸馏预训练]
tags: [paper, 占位层]
---

# Teacher-Feature Drifting- One-Step Diffusion Distillation with Pretrained Diffusion Representations（TFD·七节版）

## 1. 一句话贡献

重访 Drifting Model 目标：单一 drifting 损失（用预训练扩散表示）简化一步蒸馏。

## 2. 核心贡献

1. 重访 Drifting Model 目标：单一 drifting 损失（用预训练扩散表示）简化一步蒸馏。

## 3. 方法概要

teacher 特征在表示空间的漂移方向作为蒸馏信号，替代多损失组合。

## 4. 核心公式

$$
\mathcal{L} = \big\| \phi_T(x_1^S) - \phi_T(x_1^S + \delta_{\text{drift}})\big\|^2,\ \delta\text{ 为 teacher 表示空间的漂移方向}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占扩散×蒸馏×表示空间格（DRIFT 系）


## 6. 影响与占位意义

表示空间蒸馏路线 2026 活跃证据。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]] · [[Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
