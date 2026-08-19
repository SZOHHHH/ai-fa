---
type: paper
title: Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models
aliases: [MFD, Mean Flow Distillation]
year: 2026
authors: [An Zhao, Shengyuan Zhang, Zhongjian Sun, Yixiang Zhou, Zejian Li, Ling Yang, Tianrun Chen, Lingyun Sun]
venue: ICML 2026（PMLR 306）
arxiv: "（投稿版，GitHub: happyw1nd/MFD）"
pdf: 已入库（用户为本文三作，参与实验部分）
line: 生成建模与扩散
matrix_coords: [FM, 蒸馏, 蒸馏预训练]
tags: [paper]
---

# MFD（Mean Flow Distillation）

## 1. 一句话贡献

用**时间积分速度（Mean Flow）**替代瞬时速度作为蒸馏对齐量——证明其等效于时间低通滤波，抑制变分蒸馏的高频噪声，FM 一步生成达到 SOTA。

## 2. 核心贡献

- **Mean Flow 对齐**：对齐量从瞬时 $v_t$ 换为 $\bar u(x_t, t, r) = \frac{1}{r}\int_t^{t+r} u\, ds$（平均速度）——全局轨迹一致性约束
- **Mean Flow Matching 定理**：匹配期望平均速度 ⇔ 分布对齐（充分性证明——本文的理论核心）
- **低通滤波解释**：时间积分 = 频域低通 → 高频优化噪声被抑制（训练稳定性的来源）
- 实验域：4D 占据预测 + 文生图（ImageNet 1-step SOTA）

## 3. 方法概要

1. 预训练 FM 教师冻结
2. **辅助流模型**（Auxiliary Flow Model）近似学生诱导的平均速度场
3. 学生匹配辅助模型的 Mean Flow（交替优化：辅助模型追学生、学生对齐辅助模型）
4. 一步生成：学生直接从噪声映射到数据

## 4. 核心公式

- Mean Flow 定义：$\bar u(x_t, t, r) = \frac{1}{r}\left[ \Psi(x_t, t+r) - \Psi(x_t, t) \right]$（速度的时间平均 = 位移/时长）
- 对齐目标：$\mathcal{L} = \mathbb{E}\| v_\theta - \bar u_\phi \|_2^2$（结构同 [[30-Formulas/条件流匹配损失]]，对齐量替换）
- 与 [[30-Formulas/DSM目标]] 系的对照：score 蒸馏需噪声尺度换算，MFD 在速度场原生空间直接对齐

## 5. 与前作的关系

- 改进了 [变分 score 蒸馏（VSD/[[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]] 系）]：从扩散硬搬 score 到 FM 的不稳定/高方差问题——用 FM 原生几何结构（速度场）替代间接转换
- 借鉴 [[Mean Flows for One-step Generative Modeling（MeanFlow）|MeanFlow]] 的平均速度思想：MeanFlow 是**从头训练**（免蒸馏），MFD 是**蒸馏预训练模型**——一格之差（范式轴）
- 对照 [[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）]]：分布级对齐（KL）vs 平均速度对齐（轨迹级）

## 6. 影响与后续

- FM 加速矩阵的"蒸馏×平均速度"格占位（见 [[60-Matrices/生成模型加速矩阵]]）
- 4D 占据预测这一非常规实验域——FM 加速向科学计算场景的示范

## 7. 读前须知

[[30-Formulas/条件流匹配损失]]、[[10-Papers/02-生成建模与扩散/Mean Flows for One-step Generative Modeling（MeanFlow）]]、[[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）]]、[[40-Concepts/范数]]
