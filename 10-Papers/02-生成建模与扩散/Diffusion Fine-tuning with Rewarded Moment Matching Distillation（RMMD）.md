---
type: paper
layer: 占位
title: Diffusion Fine-tuning with Rewarded Moment Matching Distillation
aliases: [RMMD]
year: 2026
authors: [arXiv]
venue: arXiv 2026
arxiv: "2606.30414"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散, 蒸馏(矩匹配), 蒸馏预训练]
tags: [paper, 占位层]
---

# Diffusion Fine-tuning with Rewarded Moment Matching Distillation（RMMD·七节版）

## 1. 一句话贡献

奖励矩匹配蒸馏：蒸馏+奖励同时做——格③邻格新占位（矩匹配×奖励，扩散域）。

## 2. 核心贡献

1. 奖励矩匹配蒸馏：蒸馏+奖励同时做
2. 格③邻格新占位（矩匹配×奖励，扩散域）。

## 3. 方法概要

蒸馏目标同时匹配矩并最大化奖励。

## 4. 核心公式

$$
\mathcal{L} = \mathcal{L}_{MMD} - \eta\,\mathbb{E}[r(x)]
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

与 RTDM 构成蒸馏加奖励双占位；格③残格仍开但三面被围


## 6. 影响与占位意义

格③窗口进一步收窄。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]] · [[Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
