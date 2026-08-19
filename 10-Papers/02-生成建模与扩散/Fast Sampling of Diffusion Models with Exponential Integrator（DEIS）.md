---
type: paper
title: Fast Sampling of Diffusion Models with Exponential Integrator
aliases: [DEIS]
year: 2022
authors: [Cheng Zhang, Qinqing Zheng, Tingyang Zhang]
venue: ICLR 2023
arxiv: "2204.13902"
line: 生成建模与扩散
matrix_coords: [扩散, 积分器/调度, 无训练]
tags: [paper]
---

# DEIS（指数积分器快采样）

## 1. 一句话贡献

不做蒸馏、不改模型——把扩散采样看成半线性 ODE 用**指数积分器**精确离散化，10-15 步近无损，训练-free 加速的代表作。

## 2. 核心贡献

- **半线性结构利用**：扩散 ODE 的线性部分（噪声项）解析积分，非线性部分（score）数值处理
- **DPM-Solver 同期双璧****：指数积分器视角 vs 逐步推导视角
- 与蒸馏正交：**数学重写 vs 学习压缩**

## 3. 方法概要

1. 概率流 ODE 写成 $dx/dt = f(t)x + g(t, x)$ 半线性形式
2. 线性部分精确解 + 非线性部分 Taylor 展开
3. 高阶外推（DEIS-1/2/3）
4. 现有模型直接换采样器

## 4. 核心公式

- $x_t = e^{\int \bar a} x_s + \int e^{\ldots}\, g\, ds$（线性解析 + 非线性数值）——[[30-Formulas/概率流ODE]] 的高阶离散化
- 对照 [[30-Formulas/DDIM更新规则]]（一阶特例）

## 5. 与前作的关系

- 精确化了 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Implicit Models（DDIM）]]（DDIM = 一阶 DEIS）
- 与蒸馏系（[[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]/CM）正交——**加速矩阵的"积分器"机制列占位**

## 6. 影响与后续

- DPM-Solver++ 家族成为 SOTA 采样器默认；与蒸馏可叠加
- "训练-free 加速"路线的代表（低风险工程优化）

## 7. 读前须知

[[30-Formulas/概率流ODE]]、[[10-Papers/02-生成建模与扩散/Denoising Diffusion Implicit Models（DDIM）]]、[[40-Concepts/采样器]]

> 近邻同族：[[Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]] · [[Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct）]]
