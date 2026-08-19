---
type: paper
title: Score-Based Generative Modeling through Stochastic Differential Equations
aliases: [Score-SDE, VE-SDE, VP-SDE, Song et al. 2021]
year: 2021
authors: [Yang Song, Jascha Sohl-Dickstein, Diederik P. Kingma, Abhishek Kumar, Stefano Ermon, Ben Poole]
venue: ICLR 2021
arxiv: "2011.13456"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, score匹配]
tags: [paper]
---

# Score-SDE（连续时间统一框架）

## 1. 一句话贡献

把 SMLD 与 DDPM 统一成同一个 SDE 框架（VE/VP 两个特例），并给出反向 SDE 与概率流 ODE 两条采样通道——扩散理论的"记号大统一"。

## 2. 核心贡献

- **统一框架**：前向 $dx = f\,dt + g\,dw$；VE（SMLD 极限）与 VP（DDPM 极限）只是系数选择
- **反向 SDE**：唯一未知量是 score → 学习 [[40-Concepts/Score函数]] 即生成
- **概率流 ODE**：与 SDE 同边缘分布的确定性版本 → 精确似然、可逆、少步潜力
- **Predictor-Corrector 采样器**：SDE 步 + 朗之万步交替，质量最优

## 3. 方法概要

1. 选择噪声调度 $(f, g)$（VP 或 VE 或自定）
2. 训练：denoising score matching（离散化或多尺度，与 DDPM 训练等价）
3. 采样三选一：反向 SDE（随机）/ 概率流 ODE（确定）/ PC 混合
4. 可计算精确对数似然（ODE + 瞬时变量变换）

## 4. 核心公式

- [[30-Formulas/Score-SDE前向过程]] —— 统一前向与 VE/VP 对照
- [[30-Formulas/反向SDE]] —— 生成方程
- [[30-Formulas/概率流ODE]] —— 确定性伴生

## 5. 与前作的关系

- 统一了 [[10-Papers/02-生成建模与扩散/Generative Modeling by Estimating Gradients of the Data Distribution（SMLD）]]（→VE）与 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]]（→VP）
- 扩展了 [Anderson 1982 反向 SDE] 到深度生成
- 与 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Implicit Models（DDIM）]] 互证 ODE 视角

## 6. 影响与后续

- 整个领域的公共语言：此后论文默认 SDE/ODE 记号
- 奠基了 [[10-Papers/02-生成建模与扩散/Elucidating the Design Space of Diffusion-Based Generative Models（EDM）]] 的统一消融与 [[10-Papers/02-生成建模与扩散/Building Normalizing Flows with Stochastic Interpolants（随机插值）]] 的理论推广
- 概率流 ODE 是流匹配复兴的直接铺垫

## 7. 读前须知

[[40-Concepts/随机微分方程（SDE）|随机微分方程]]、[[40-Concepts/维纳过程]]、[[40-Concepts/Score函数]]、[[40-Concepts/常微分方程（ODE）|常微分方程]]、[[40-Concepts/采样器]]
