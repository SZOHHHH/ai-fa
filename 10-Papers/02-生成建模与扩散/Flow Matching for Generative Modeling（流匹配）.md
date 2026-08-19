---
type: paper
title: Flow Matching for Generative Modeling
aliases: [FM, Flow Matching, Lipman Flow Matching]
year: 2022
authors: [Yaron Lipman, Ricky T. Q. Chen, Heli Ben-Hamu, Maximilian Nickel, Matthew Le]
venue: ICLR 2023
arxiv: "2210.02747"
line: 生成建模与扩散
matrix_coords: [流, 像素空间, 回归(CFM)]
tags: [paper]
---

# Flow Matching（流匹配）

## 1. 一句话贡献

提出条件流匹配定理：用可算的条件速度场目标训练不可算的边缘速度场——生成建模从此有了"直接学 ODE 速度场"的稳定方法。

## 2. 核心贡献

- **CFM 定理**：$\nabla_\theta \mathcal{L}_{FM}$ 与 $\nabla_\theta \mathcal{L}_{CFM}$ 相等——绕开边缘场不可算的死结
- **OT 路径设计**：小批内最优配对降低传输代价、轨迹更直
- **统一视角**：扩散 = 特定调度的 FM 特例（ε/score ↔ v 换算表）

## 3. 方法概要

1. 抽 $x_0, z$，构造插值路径 $x_t = \alpha_t x_0 + \sigma_t z$
2. 条件速度 $u_t = \alpha_t' x_0 + \sigma_t' z$（解析可算）
3. 网络 $v_\theta(x_t, t)$ 回归 $u_t$（MSE）
4. 采样：$x_1 \sim$ 噪声 → 从 $t=1$ 积分 ODE 到 $t=0$
5. 变体：OT-CFM 用小批内最优传输配对 $x_0 \leftrightarrow z$

## 4. 核心公式

- [[30-Formulas/条件流匹配损失]] —— 本文灵魂
- [[30-Formulas/概率流ODE]] —— 采样载体

## 5. 与前作的关系

- 对比 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]]：同为回归，预测量从噪声换成速度（见 §2b 对偶表）
- 与 [[10-Papers/02-生成建模与扩散/Flow Straight and Fast- Learning to Generate and Transfer Data with Rectified Flow（矩形流）]]、[[10-Papers/02-生成建模与扩散/Building Normalizing Flows with Stochastic Interpolants（随机插值）]] 同年独立提出、本质同构
- 扩展了 [[10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]] 的 ODE 视角到"直接学速度场"

## 6. 影响与后续

- SD3、Flux、Movie Gen 采用线性插值 FM 为骨干
- 理论上连通 [[40-Concepts/Wasserstein距离]] / 最优传输
- 训练稳定性与少步采样优势使其成为 2024 后新默认

## 7. 读前须知

[[40-Concepts/常微分方程（ODE）|常微分方程]]、[[40-Concepts/期望]]、[[20-Algorithms/流匹配]]、[[30-Formulas/概率流ODE]]
