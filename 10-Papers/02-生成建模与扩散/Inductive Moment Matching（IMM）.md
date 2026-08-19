---
type: paper
title: Inductive Moment Matching
aliases: [IMM]
year: 2025
authors: [Zhengyang Geng, Mingyang Deng, Willi Wollstadt, et al.]
venue: arXiv 2025
arxiv: "2503.07565"
line: 生成建模与扩散
matrix_coords: [FM, 矩匹配, 从头训练]
tags: [paper]
---

# IMM（归纳矩匹配）

## 1. 一句话贡献

一步生成新范式：不蒸馏不重构轨迹，直接匹配**期望与协方差（前二阶矩）**——单阶段从头训练，理论保证分布级收敛。

## 2. 核心贡献

- **矩匹配目标**：学生与教师分布的前二阶矩（mean + covariance）对齐
- **免预训练初始化**：Consistency 系需要预训练/蒸馏锚点，IMM 从零单阶段
- 收敛保证：矩匹配 ⇔ 高斯族分布对齐（矩完全刻画高斯）

## 3. 方法概要

1. 教师给出目标矩（可在线/离线）
2. 学生一步采样的样本集估计矩
3. 损失 = 均值差 + 协方差差（加权）
4. 从头训练到收敛

## 4. 核心公式

- $\mathcal{L}_{\text{IMM}} = \| \mu_s - \mu_t \|^2 + \| \Sigma_s - \Sigma_t \|_F^2$——矩空间回归（[[40-Concepts/范数]] 家族）
- 与 [[Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）|MFD]] 的 [[Mean Flows for One-step Generative Modeling（MeanFlow）|MeanFlow]] 定理呼应：MFD 证"平均速度充分"，IMM 证"前二阶矩充分"——**两种"充分性定理"打不同变量**

## 5. 与前作的关系

- 对照 [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]（轨迹自洽需锚点）与蒸馏系（需教师轨迹）
- 同作者 [[10-Papers/02-生成建模与扩散/Mean Flows for One-step Generative Modeling（MeanFlow）]] 的姊妹篇（Geng 系）——同格竞争/互补

## 6. 影响与后续

- "从头一步生成"格的两大方案（MeanFlow/IMM）确立
- 矩匹配视角连接统计学经典（method of moments）——理论审美在线

## 7. 读前须知

[[30-Formulas/条件流匹配损失]]、[[10-Papers/02-生成建模与扩散/Mean Flows for One-step Generative Modeling（MeanFlow）]]、[[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]
