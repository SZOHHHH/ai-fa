---
type: paper
title: Statistical Rejection Sampling Improves Preference Optimization
aliases: [BoN, Best-of-N, Rejection Sampling]
year: 2023
authors: [Rui Ye, Wenhao Wu, Jintao Huang, et al.]
venue: arXiv 2023
arxiv: "2309.06657"
line: 强化学习与对齐
matrix_coords: [评分/排序, RL目标(在线), 有]
tags: [paper]
---

# BoN（拒绝采样偏好优化）

## 1. 一句话贡献

把 best-of-N 采样视为对齐目标的闭式重排：训练时用拒绝采样模拟 BoN 的选择分布——连接"推理时筛选"与"训练时对齐"的理论桥梁。

## 2. 核心贡献

- **BoN 分布刻画**：$p_{\text{BoN}}(y\mid x) \propto p_\theta(y\mid x)\,\sigma(r(x,y))^N$ 的渐近分析——BoN 是奖励的幂次重加权
- **RSO 训练**：重要性采样的拒绝采样生成偏好对 + [[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）|DPO]] 训练
- 揭示 BoN 与 RLHF 目标（Boltzmann 重加权，[[30-Formulas/RLHF目标]] §2）的家族关系

## 3. 方法概要

1. 基座模型 + 奖励模型
2. 拒绝采样按 $r$ 加权抽取"优选"回答，构造 $(y^+, y^-)$ 对
3. 用 DPO（或带重要性权重版本）训练
4. 对比纯 BoN（推理时）与训练后的分布

## 4. 核心公式

- $p_{\text{BoN}}(y) \to \frac{p(y)\,e^{N r(y)/\tau}}{Z}$（大 N 极限）——与 RLHF 闭式解同构（β ↔ 1/N）——**BoN、RLHF、DPO 是同一重加权家族的三个化身**（本页核心洞见）

## 5. 与前作的关系

- 理论化了推理时 BoN 常用技巧；连接 [[10-Papers/04-强化学习与对齐/Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）]] 与 [[30-Formulas/RLHF目标]]
- 下游 [[10-Papers/04-强化学习与对齐/RAFT- Reward rAnked FineTuning for Generative Foundation Model Alignment（RAFT）]] 的迭代化

## 6. 影响与后续

- "对齐=重加权"视角普及；BoN 作为对齐评估上限（reward-optimal policy 基准）成为论文标配

## 7. 读前须知

[[30-Formulas/RLHF目标]]（闭式解）、[[30-Formulas/DPO损失]]、[[40-Concepts/期望]]（拒绝采样统计）
