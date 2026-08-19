---
type: paper
layer: 占位
title: DUO-VSR- Dual-Stream Distillation for One-Step Video Super-Resolution
aliases: [DUO-VSR]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2603.22271"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM(视频), 蒸馏, 蒸馏预训练]
tags: [paper, 占位层]
---

# DUO-VSR- Dual-Stream Distillation for One-Step Video Super-Resolution（DUO-VSR·七节版）

## 1. 一句话贡献

一步视频超分的双流蒸馏：视频×少步蒸馏在 VSR 任务落地——视频加速矩阵的应用面证据。

## 2. 核心贡献

1. 一步视频超分的双流蒸馏：视频×少步蒸馏在 VSR 任务落地
2. 视频加速矩阵的应用面证据。

## 3. 方法概要

双流（细节流+语义流）蒸馏到一步生成器。

## 4. 核心公式

$$
\mathcal{L} = \mathcal{L}_{\text{detail}} + \mathcal{L}_{\text{semantic}}\ \text{双流一步化}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 视频×蒸馏×超分格；AnyFlow（库内）的任务面邻居


## 6. 影响与占位意义

RS 库 03-23 已有；视频少步应用扩张。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[AnyFlow- Any-Step Video Diffusion Model with On-Policy Flow Map Distillation（AnyFlow）]] · [[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
