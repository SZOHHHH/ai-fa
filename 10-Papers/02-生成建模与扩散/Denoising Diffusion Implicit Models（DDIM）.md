---
type: paper
title: Denoising Diffusion Implicit Models
aliases: [DDIM, Denoising Diffusion Implicit Models]
year: 2020
authors: [Jiaming Song, Chenlin Meng, Stefano Ermon]
venue: ICLR 2021
arxiv: "2010.02502"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, 积分器(确定性采样)]
tags: [paper]
---

# Denoising Diffusion Implicit Models（DDIM）

## 1. 一句话贡献

证明 DDPM 的训练目标不唯一决定前向过程——存在一族非马尔可夫前向，共享同一训练损失但允许**确定性、少步**采样。

## 2. 核心贡献

- **非马尔可夫前向族**：打破"必须一步一步加噪"的思维定势
- **η 旋钮**：$\eta=0$ 确定性采样（= 概率流 ODE 欧拉离散），$\eta=1$ 还原 DDPM
- **10–50 步采样**：质量近无损——扩散从"千步慢模型"变"可用技术"
- **可逆性**：$\eta=0$ 时 $x_0 \leftrightarrow x_T$ 双射 → 图像编辑/插值/inversion 的基础设施

## 3. 方法概要

1. 训练与 DDPM 完全相同（同一个 $\epsilon_\theta$ 网络）
2. 采样时改用更新规则：先估 $\hat x_0$，再沿调度前进到 $t-1$，噪声项乘 $\eta$ 控制
3. 子序列跳步（如 1000 步中取 50 个时刻）大步快走

## 4. 核心公式

- [[30-Formulas/DDIM更新规则]] —— 本文灵魂
- 与 [[30-Formulas/概率流ODE]] 的等价关系

## 5. 与前作的关系

- 扩展了 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]]：训练不变、采样解耦
- 呼应 [[10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]] 的 ODE 采样（同年独立工作，互为印证）

## 6. 影响与后续

- 少步采样成为标配；CFG+DDIM 组合统治文生图早期
- 确定性映射是后续 inversion、编辑、蒸馏的基石
- [[10-Papers/02-生成建模与扩散/Progressive Distillation for Fast Sampling of Diffusion Models（渐进蒸馏）]] 与 [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]] 都在其轨迹上做加速

## 7. 读前须知

[[30-Formulas/DDPM前向过程]]、[[30-Formulas/概率流ODE]]、[[40-Concepts/采样器]]、[[40-Concepts/高斯分布]]
