---
type: paper
title: Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences
aliases: [Diff-Instruct++]
year: 2024
authors: [Luo et al.]
venue: arXiv 2024
arxiv: "2410.18881"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散, 蒸馏(score/KL/对抗), 蒸馏预训练]
tags: [paper]
---

# Diff-Instruct++

## 1. 一句话贡献

一步生成器对齐人类偏好：Diff-Instruct 的目标替换为人类反馈积分散度（HFIDD）——**一步蒸馏×RLHF 化**的早期合流。

## 2. 核心贡献

1. 把偏好信号（RM）揉进一步蒸馏的散度目标
2. Owen 损失使反向 KL 对 RM 可无偏估计

## 3. 方法概要

把偏好信号（RM）揉进一步蒸馏的散度目标；Owen 损失使反向 KL 对 RM 可无偏估计。
## 4. 核心公式


$$
\mathcal{L}_{\text{HFIDD}} = \mathbb{E}\big[\nabla \log p_\theta\, r(x)\big]\ \text{的散度化改造}
$$


**直觉**：← [[Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct）]]（B18 入库）；→ 生成对齐线（一步+偏好）；≡ OPD×RLVR 组合的生成域镜像（LLM 域已被占，生成域此卡占先手）

## 5. 与前作/矩阵关系

蒸馏×对齐交叉口的生成域占位（复核补注：此格在生成域也已有人动）

## 6. 影响后续

需要：RLHF 目标与反向 KL 的等价改写

## 7. 读前须知

undefined

> 近邻同族：[[Diffusion Fine-tuning with Rewarded Moment Matching Distillation（RMMD）]]

> 数学根基：[[概率分布]]

> 数学根基：[[蒸馏损失]] · [[DSM目标]]
