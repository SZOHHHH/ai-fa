---
type: paper
layer: 占位
title: [[Mean Flows for One-step Generative Modeling（MeanFlow）|MeanFlow]]-TSE- One-Step Generative Target Speaker Extraction with Mean Flow
aliases: [MeanFlow-TSE]
year: 2025
authors: [（arXiv）]
venue: arXiv 2025
arxiv: "2512.18572"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM, 平均速度, 从头训练]
tags: [paper, 占位层]
---

# MeanFlow-TSE- One-Step Generative Target Speaker Extraction with Mean Flow（MeanFlow-TSE·七节版）

## 1. 一句话贡献

MeanFlow 进语音抽取任务：一步生成目标说话人语音——**平均速度范式跨任务扩张的直接证据**。

## 2. 核心贡献

1. MeanFlow 进语音抽取任务：一步生成目标说话人语音
2. 平均速度范式跨任务扩张的直接证据。

## 3. 方法概要

MeanFlow 目标用于 TSE（条件一步生成）；免蒸馏从头训练。

## 4. 核心公式

$$
u_\theta(x_t, r, t)\ \text{MeanFlow 目标}\ \text{(语音域)}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 MeanFlow×语音格；RS 情报点名"mean-flow→TSE/音频"扩张


## 6. 影响与占位意义

RS 库 12-21 已有；[[Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）|MFD]] 血统计画——**平均速度范式已跨 5 个任务域**。

> 近邻同族：[[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Computational and Statistical Guarantees of the c-Rectified flow（c-RF理论）]]
> 数学根基（占位层）：[[概率分布]]
> 数学根基：[[条件流匹配损失]] · [[概率流ODE]]

## 7. 读前须知

需要：概率流 ODE；条件流匹配损失（v-prediction）；平均速度场与瞬时速度场之别
