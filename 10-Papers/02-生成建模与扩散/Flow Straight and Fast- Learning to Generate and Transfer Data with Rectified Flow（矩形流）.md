---
type: paper
title: Flow Straight and Fast - Learning to Generate and Transfer Data with Rectified Flow
aliases: [Rectified Flow, RF, 矩形流]
year: 2022
authors: [Xingchao Liu, Chengyue Gong, Qiang Liu]
venue: ICLR 2023
arxiv: "2209.03003"
line: 生成建模与扩散
matrix_coords: [流, 像素空间, 回归(CFM)]
tags: [paper]
---

# Rectified Flow（矩形流）

## 1. 一句话贡献

用"数据-噪声直线配对"学速度场，再用 reflow 迭代把轨迹越拉越直——直到一步直飞生成。

## 2. 核心贡献

- **线性插值**：$x_t = (1-t)x_0 + t z$，速度恒定 $u_t = z - x_0$——最简单的 FM 特例
- **Reflow 迭代**：用当前模型采样生成新配对再训练，配对分布向最优传输逼近
- **一步生成**：2-rectified/3-rectified 可单步出图（无蒸馏的另一条路）
- **传输视角**：生成 = 分布间最优传输的近似求解

## 3. 方法概要

1. 随机配对 $(x_0, z)$，线性插值造 $x_t$，回归学速度场
2. 采样解 ODE（轨迹近似直）
3. Reflow：用模型把 $z$ 映到 $\hat x_0$，形成新配对 $(\hat x_0, z)$ 重训
4. 迭代数次后轨迹几乎不交叉 → 欧拉一步即可

## 4. 核心公式

- [[30-Formulas/条件流匹配损失]]（线性插值特例：$u_t = z - x_0$）
- [[30-Formulas/概率流ODE]]（直 = 好积分）
- [[40-Concepts/Wasserstein距离]]（最优传输动机）

## 5. 与前作的关系

- 与 [[10-Papers/02-生成建模与扩散/Flow Matching for Generative Modeling（流匹配）]] 同年独立、同构（直线路径强调不同）
- 对比 [[10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]]：放弃 SDE、专攻 ODE 直轨迹
- 一步生成目标与 [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]] 呼应（路线不同：拉直 vs 蒸馏）

## 6. 影响与后续

- InstaFlow：SD 加速实用化
- SD3 / Flux 的线性 FM 骨干（不做 reflow）——本论文思想的工业裁剪版
- "直轨迹"成为采样效率的通用语言

## 7. 读前须知

[[40-Concepts/常微分方程（ODE）|常微分方程]]、[[20-Algorithms/矩形流]]、[[20-Algorithms/流匹配]]、[[40-Concepts/Wasserstein距离]]

> 矩形流谱系环：[[One Diffusion Step to Real-World Super-Resolution via Flow Trajectory Distillation（OSEDiff）]] ← 本卡 → [[Towards Hierarchical Rectified Flow（HRFlow）]]
