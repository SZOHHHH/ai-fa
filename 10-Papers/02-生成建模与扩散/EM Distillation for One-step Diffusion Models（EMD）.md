---
type: paper
title: EM Distillation for One-step Diffusion Models
aliases: [EMD, EM Distillation]
year: 2024
authors: [Fuwen Tan, Jiang Chan, Sheng Lu, et al.]
venue: arXiv 2024
arxiv: "2405.16852"
line: 生成建模与扩散
matrix_coords: [扩散, EM矩匹配, 蒸馏预训练]
tags: [paper]
---

# EM Distillation（EM 蒸馏）

## 1. 一句话贡献

把一步生成蒸馏写成 **EM（期望最大化）**：E 步固定学生更新教师引导的期望、M 步最小化 Wasserstein——分布匹配的统计学正统解法。

## 2. 核心贡献

- **EM 视角**：蒸馏 = 变分推断（E 步）+ 分布对齐（M 步）交替
- **免 MCMC 的分布级损失**：以矩/最优传输近似的 Wasserstein 距离
- 一步生成质量强（class-conditioned ImageNet）

## 3. 方法概要

1. E 步：当前学生分布采样 + 教师分数引导修正
2. M 步：最小化学生与教师诱导分布的传输代价
3. 交替至收敛；推理一步

## 4. 核心公式

- EM 分解：$q^{(k+1)} = \arg\min_q \mathbb{E}_{p_{\text{teacher}}}[\ldots]$（Wasserstein 正则）
- 与 [[40-Concepts/ELBO]] 的 EM 家族同构——蒸馏目标写成变分形式（[[40-Concepts/期望]]）

## 5. 与前作的关系

- 与 [[10-Papers/02-生成建模与扩散/Inductive Moment Matching（IMM）]] 同属“矩/分布匹配”大格（EMD 蒸馏预训练、IMM 从头）
- 对照 [[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]（KL vs W 距离）

## 6. 影响与后续

- 统计视角（EM/矩）进入一步生成；为 IMM 等后续提供理论桥梁

## 7. 读前须知

[[40-Concepts/ELBO]]、[[40-Concepts/Wasserstein距离]]、[[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）]]

> 近邻同族：[[Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]] · [[Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct）]]

> 数学根基：[[概率分布]]

> 数学根基：[[蒸馏损失]] · [[DSM目标]]
