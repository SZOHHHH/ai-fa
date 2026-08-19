---
type: paper
title: A General Theoretical Paradigm to Understand Learning from Human Preferences
aliases: [IPO, Ψ-PO]
year: 2023
authors: [Mohammad Gheshlaghi Azar, Mark Rowland, Bilal Piot, Daniel Guo, Michal Valko, et al.]
venue: ICML 2024
arxiv: "2310.12036"
line: 强化学习与对齐
matrix_coords: [成对比较, 闭式/单侧, 有]
tags: [paper]
---

# IPO（偏好学习的一般理论范式）

## 1. 一句话贡献

建立 Ψ-PO 统一理论框架重审偏好优化，诊断 [[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）|DPO]] 的过优化病态，提出有界损失的 IPO——DPO 系的"理论质检员"。

## 2. 核心贡献

- **Ψ-PO 框架**：DPO/IPO 是同一框架下不同 Ψ 函数的选择
- **诊断**：sigmoid 损失在偏好概率→1 后梯度不衰减 → 无界追分 → 过优化
- **IPO**：平方回归到 $\frac{1}{2\beta}$——达线即停

## 3. 方法概要

1. 从 RLHF-KL 目标的最优策略-奖励关系出发（一般化 BT 假设）
2. 构造 Ψ-PO 家族：不同凸函数 Ψ 对应不同算法
3. 分析每个成员的优化动力学与病态
4. IPO：$\mathbb{E}[(\hat r^+ - \hat r^- - \frac{1}{2\beta})^2]$

## 4. 核心公式

- [[30-Formulas/IPO损失]] —— 本文产物

## 5. 与前作的关系

- 修正了 [[10-Papers/04-强化学习与对齐/Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）]] 的理论缺陷
- 泛化了 [[40-Concepts/Bradley-Terry模型]] 假设（一般效用下偏好建模）

## 6. 影响与后续

- DPO 系论文的标配引用（"过优化"讨论源头）
- 影响后续损失设计的理论检查习惯

## 7. 读前须知

[[30-Formulas/DPO损失]]、[[30-Formulas/RLHF目标]]（闭式解）、[[40-Concepts/KL散度]]
