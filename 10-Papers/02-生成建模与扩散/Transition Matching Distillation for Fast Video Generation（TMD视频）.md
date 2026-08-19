---
type: paper
layer: 占位
title: Transition Matching Distillation for Fast Video Generation
aliases: [TMD视频]
year: 2026
authors: [（arXiv，CVPR 2026）]
venue: arXiv 2026
arxiv: "2601.09881"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散(视频), 蒸馏(score/KL/对抗), 蒸馏预训练]
tags: [paper, 占位层]
---

# Transition Matching Distillation for Fast Video Generation（TMD视频·七节版）

## 1. 一句话贡献

视频生成的 transition matching 蒸馏：训练时展开 flow head，对齐 student 概率转移与 teacher 多步扩散分布——CVPR 2026 已中（RS 情报点名的 any-step 第三占位）。

## 2. 核心贡献

1. 视频生成的 transition matching 蒸馏：训练时展开 flow head，对齐 student 概率转移与 teacher 多步扩散分布
2. CVPR 2026 已中（RS 情报点名的 any-step 第三占位）。

## 3. 方法概要

unroll flow head 在训练中展开多步，使 student 单步转移匹配 teacher 多步联合分布。

## 4. 核心公式

$$
\mathcal{L} = \mathrm{KL}\big(p^{\text{unroll}}_{\theta}(z_{t\to r})\ \Vert\ p_T(z_r|z_t)\big)
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占视频×蒸馏格（CVPR 级占位）；≡ [[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]]


## 6. 影响与占位意义

视频加速战场的 2026 年初占位。

> 近邻同族：[[Analyzing and Improving the Image Quality of StyleGAN（StyleGAN2）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
