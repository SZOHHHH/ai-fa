---
type: paper
title: Multistep Consistency Models
aliases: [MCM, Multistep CM]
year: 2024
authors: [Jonathan Heek, Emiel Hoogeboom, Tim Salimans]
venue: arXiv 2024
arxiv: "2403.06807"
line: 生成建模与扩散
matrix_coords: [扩散, 一致性, 蒸馏预训练]
tags: [paper]
---

# Multistep CM（多步一致性）

## 1. 一句话贡献

一致性模型的推广：从“任意点到起点”扩展到“任意点到任意锚点”——单步与多步统一框架，质量和步数连续可调。

## 2. 核心贡献

- **广义一致性**：锚点从 $\{0\}$ 扩展为时间网格——每段内自洽
- 单一模型覆盖 1/2/4/8 步（质量-速度谱）
- 已被 [[10-Papers/02-生成建模与扩散/Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] 引为"离散版前身"

## 3. 方法概要

1. 时间轴离散为 N 段
2. 每段学一致性映射（段内任意点→段起点）
3. 推理：逐段跳（段数=步数）
4. 与蒸馏/无蒸馏两种模式兼容

## 4. 核心公式

- 段内一致性：$F(x_t, t) = F(x_{t'}, t')\ \forall t,t' \in \text{同段}$——[[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]] 的分段版

## 5. 与前作的关系

- 泛化了 [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]（单段→多段网格）
- 与 LCM（[[10-Papers/02-生成建模与扩散/Latent Consistency Models- Synthesizing High-Resolution Images with Few-Step Inference（LCM）]]）同期：潜空间 vs 多步网格两方向

## 6. 影响与后续

- "步数可调"成为一步生成标配需求；AYF 的连续时间版直接承继
- Stable Diffusion 3 加速线采用

## 7. 读前须知

[[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]、[[30-Formulas/概率流ODE]]、[[10-Papers/02-生成建模与扩散/Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]]
