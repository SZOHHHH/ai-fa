---
type: paper
title: Building Normalizing Flows with Stochastic Interpolants
aliases: [Stochastic Interpolants, SI, 随机插值]
year: 2022
authors: [Michael S. Albergo, Eric Vanden-Eijnden]
venue: ICLR 2023
arxiv: "2209.15571"
line: 生成建模与扩散
matrix_coords: [流, 像素空间, 回归(CFM)]
tags: [paper]
---

# Stochastic Interpolants（随机插值）

## 1. 一句话贡献

数学物理视角的统一理论：在任意两个分布间构造插值过程，证明确定性流与随机扩散是同一框架的两端——FM 与扩散的理论总纲。

## 2. 核心贡献

- **插值框架**：$x_t = \alpha_t x_0 + \sigma_t z + \gamma_t \epsilon$（含纯随机项 γ 的推广）
- **速度场 + score 双量**：一般随机插值同时需要速度与 score；γ=0 退化为 ODE（FM）
- **ELBO 连接**：证明 CFM 损失是连续时间 ELBO 的变分形式——三派合流的严格证明
- **任意两分布**：不必是"数据 ↔ 高斯"，可与任何目标分布桥接

## 3. 方法概要

1. 任选调度 $(\alpha_t, \sigma_t, \gamma_t)$ 构造插值过程
2. 学速度场 $v_\theta$（确定性部分）与 score $s_\theta$（随机部分）
3. 采样：ODE（γ=0）/ SDE（γ≠0）自由切换，边缘分布一致
4. 理论件：训练目标 ↔ ELBO ↔ W 距离泛函的等价链

## 4. 核心公式

- [[30-Formulas/条件流匹配损失]]（一般化母体）
- [[30-Formulas/ELBO目标]]（连续时间版等价）
- [[30-Formulas/Score-SDE前向过程]] / [[30-Formulas/概率流ODE]]（两端特例）

## 5. 与前作的关系

- 泛化了 [[10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]]（随机端）与 [[10-Papers/02-生成建模与扩散/Flow Matching for Generative Modeling（流匹配）]]（确定端）
- 与 [[10-Papers/02-生成建模与扩散/Flow Straight and Fast- Learning to Generate and Transfer Data with Rectified Flow（矩形流）]] 同期互证
- 数学前史：[Schrödinger bridge / optimal transport] 的计算统计版

## 6. 影响与后续

- 后续 SI 系论文（多任务、希尔伯特空间、气候等）不断扩展
- "统一理论"地位：教科书式呈现 FM/扩散的数学骨架
- Latent SI 等（2025–26）继续在隐空间发挥

## 7. 读前须知

[[40-Concepts/常微分方程（ODE）|常微分方程]]、[[40-Concepts/随机微分方程（SDE）|随机微分方程]]、[[40-Concepts/ELBO]]、[[30-Formulas/条件流匹配损失]]（建议先读 FM 论文卡）
