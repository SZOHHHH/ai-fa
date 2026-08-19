---
type: paper
layer: 占位
title: Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models
aliases: [Diff-Instruct]
year: 2023
authors: [Guanlong Jiao et al.]
venue: arXiv 2023
arxiv: "2305.18455"
pdf: 已下载（PDF/）
line: false
matrix_coords: [扩散, 蒸馏(score/KL/对抗), 蒸馏预训练]
tags: [paper, 占位层]
---

# Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct·七节版）

## 1. 一句话贡献

反向 KL 的积分项用 teacher 的 score 重写成可估计形式，student 单步采样端优化。

## 2. 核心贡献

1. 反向 KL 的积分项用 teacher 的 score 重写成可估计形式，student 单步采样端优化。

## 3. 方法概要


$$
\mathcal{L} = \mathrm{KL}\big(p_\theta\ \Vert\ p_T\big) = \mathbb{E}\big[\log p_\theta - \log p_T\big]\ \text{score 展开后可估}
$$


## 4. 核心公式

→ [[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]/Diff-Instruct++/SiD/f-distill → Uni-Instruct（统一）；🚩 扩散×蒸馏格的 KL 支线主占位

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

B18 奠基补齐：一步蒸馏 KL 路线的源头（多张库内卡引用它）。


## 6. 影响与占位意义

undefined

> 近邻同族：[[Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]] · [[Diffusion Fine-tuning with Rewarded Moment Matching Distillation（RMMD）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
