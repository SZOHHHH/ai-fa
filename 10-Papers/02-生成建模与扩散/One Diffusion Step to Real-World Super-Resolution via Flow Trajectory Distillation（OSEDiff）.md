---
type: paper
layer: 占位
title: One Diffusion Step to Real-World Super-Resolution via Flow Trajectory Distillation
aliases: [OSEDiff]
year: 2025
authors: [Wu et al.]
venue: arXiv 2025
arxiv: "2502.01993"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, 蒸馏(轨迹), 蒸馏预训练]
tags: [paper, 占位层]
---

# One Diffusion Step to Real-World Super-Resolution via Flow Trajectory Distillation（OSEDiff·七节版）

## 1. 一句话贡献

一步真实超分：流轨迹蒸馏 + LoRA 文本控制——FM 蒸馏在修复类任务的应用占位。

## 2. 核心贡献

1. 一步真实超分：流轨迹蒸馏 + LoRA 文本控制
2. FM 蒸馏在修复类任务的应用占位。

## 3. 方法概要

把 SR 任务蒸馏进一步 RF（轨迹蒸馏损失）+文本提示控制风格。

## 4. 核心公式

$$
\mathcal{L} = \|F_\theta(z, t\to1) - x_{HR}\|\ \text{+ LoRA 控制}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占 FM×蒸馏×超分格；[[Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）|MFD]] 管线的任务面证据


## 6. 影响与占位意义

RS 库 02-04 已有情报卡；少步生成的应用侧。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 矩形流谱系环：[[ProReflow- Progressive Reflow with Decomposed Velocity（ProReflow）]] ← 本卡 → [[Flow Straight and Fast- Learning to Generate and Transfer Data with Rectified Flow（矩形流）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
