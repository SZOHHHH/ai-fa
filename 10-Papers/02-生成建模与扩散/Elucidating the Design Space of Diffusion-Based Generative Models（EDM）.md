---
type: paper
title: Elucidating the Design Space of Diffusion-Based Generative Models
aliases: [EDM, Karras Diffusion, Elucidating Design Space]
year: 2022
authors: [Tero Karras, Miika Aittala, Timo Aila, Samuli Laine]
venue: NeurIPS 2022
arxiv: "2206.00364"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, score匹配]
tags: [paper]
---

# EDM（设计空间解构）

## 1. 一句话贡献

把扩散模型的所有组件拆成独立旋钮（噪声调度、预处理、采样器、权重），跨 VP/VE 统一记号逐一消融——扩散界的"实验设计教科书"。

## 2. 核心贡献

- **σ-空间统一**：把 VP/VE 两套超参重参数化到一个噪声尺度轴上，直接可比
- **网络预处理 $D_\theta$**：让网络输出"去噪后的图"而非噪声——数值稳定大增
- **Heun 采样器 + Karras 调度**：σ 空间指数间隔，35 步达先前 100+ 步质量
- 系统结论：训练权重 $\lambda(\sigma) \propto \sigma^2$ + 采样噪声注入 $\propto \sigma$ 最优

## 3. 方法概要

1. 定义统一前向 $x_\sigma = x_0 + \sigma z$（σ 即噪声强度，兼容 VE/VP 换算）
2. 网络改为预测 $D_\theta(x_\sigma; \sigma)$（干净图），内部用 $\sigma$ 缩放输入
3. 训练：σ 分布调优 + 权重 $\lambda(\sigma)$
4. 采样：二阶 Heun，σ 轨迹按 Karras 调度从大到小
5. 随机性以 $\sigma$ 相关强度注入（PC 思想的精化）

## 4. 核心公式

- 前向重参数化（[[30-Formulas/Score-SDE前向过程]] §2 的 EDM 行）
- [[30-Formulas/DDPM训练目标]] §2 的加权一般式（$\lambda_t$ 选择的理论化）
- [[40-Concepts/采样器]]（Heun 二阶）

## 5. 与前作的关系

- 改进了 [[10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]]：连续框架落地为可调工程系统
- 统一并对比 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]] 与 [[10-Papers/02-生成建模与扩散/Generative Modeling by Estimating Gradients of the Data Distribution（SMLD）]] 的超参
- 扩展了 [[10-Papers/02-生成建模与扩散/Improved Denoising Diffusion Probabilistic Models（iDDPM）]] 的"调旋钮"路线到全空间

## 6. 影响与后续

- EDM2（2023–24）：同框架下继续优化训练动态，达 SoTA
- Karras 调度/Heun/预处理 $D_\theta$ 被后续几乎所有实现采用（SD3 等）
- 消融方法论成为"如何做实验"的模板

## 7. 读前须知

[[30-Formulas/Score-SDE前向过程]]（先懂 VP/VE 为何分裂）、[[40-Concepts/采样器]]、[[40-Concepts/期望]]、[[40-Concepts/高斯分布]]
