---
type: paper
layer: 占位
title: AnyFlow- Any-Step Video Diffusion Model with On-Policy Flow Map Distillation
aliases: [AnyFlow]
year: 2026
authors: [NVIDIA / NUS / MIT]
venue: arXiv 2026
arxiv: "2605.13724"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [FM(视频), flow map, 蒸馏预训练]
tags: [paper, 占位层]
---

# AnyFlow- Any-Step Video Diffusion Model with On-Policy Flow Map Distillation（AnyFlow·七节版）

## 1. 一句话贡献

首个 any-step 视频扩散蒸馏框架（flow map 基）：学任意两时刻 z_t→z_r 的传输，1.3B-14B 验证，步数越多质量越好——**NVIDIA any-step 三连之三，视频域**。

## 2. 核心贡献

1. 首个 any-step 视频扩散蒸馏框架（flow map 基）：学任意两时刻 z_t→z_r 的传输，1.3B-14B 验证，步数越多质量越好
2. NVIDIA any-step 三连之三，视频域。

## 3. 方法概要

on-policy flow map 蒸馏：student rollout 上优化全 ODE 轨迹的传输一致性；支持因果与双向视频扩散。

## 4. 核心公式

$$
\mathcal{L} = \mathbb{E}\big\| F_\theta(z_r, r \to t) - \mathrm{sg}\big[z_t^{\text{teacher}}\big] \big\|^2,\ \forall r,t
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩🚩 占 [[60-Matrices/生成模型加速矩阵]]"视频×FM×flow map"格——**全景图机会格④"视频×FM加速"已被部分占**（任何后续该格 idea 必须引用本占位）


## 6. 影响与占位意义

any-step 三连（DFM/AYF/AnyFlow）把 flexible-NFE 战场封顶的关键一篇。

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）
> 近邻同族：[[DUO-VSR- Dual-Stream Distillation for One-Step Video Super-Resolution（DUO-VSR）]] · [[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[注意力核心公式]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
