---
type: paper
layer: 占位
title: Hybrid Reinforcement- When Reward Is Sparse, It is Better to Be Dense
aliases: [HERO]
year: 2025
authors: [L. Tao et al. (Meta FAIR)]
venue: arXiv 2025
arxiv: "2510.07242"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [学生轨迹+结果信号, 混合散度, 序列级]
tags: [paper, 占位层]
---

# Hybrid Reinforcement- When Reward Is Sparse, It is Better to Be Dense（HERO·七节版）

## 1. 一句话贡献

稀疏二值 verifier 信号 × 稠密 RM 分数的混合奖励框架（含"何时组合最优"理论分析），数学推理全胜两个端点。ICLR 2026 已中。

## 2. 核心贡献

1. 稀疏二值 verifier 信号 × 稠密 RM 分数的混合奖励框架（含"何时组合最优"理论分析），数学推理全胜两个端点。ICLR 2026 已中。

## 3. 方法概要

RM 集成的 agreement/disagreement 给出不确定性估计：verifier 无信息或集成自信时信 RM 稠密分，verifier 触发时 verifier 优先。

## 4. 核心公式

$$
r_{\text{hybrid}} = \lambda(\sigma_{\text{ens}})\, r_{\text{RM}} + \big(1-\lambda(\sigma_{\text{ens}})\big)\, r_{\text{verifier}}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占"何时该听谁的"理论位（对象 RM 而非 teacher——但审稿人视角与 B10#1 同格）


## 6. 影响与占位意义

"稀疏×稠密混合"路线的顶会级占位。

---

> 谱系枢纽：[[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）]]（图谱连通入口）
> 近邻同族：[[Learning beyond Teacher- Generalized On-Policy Distillation with Reward Extrapolation（G-OPD）]] · [[Process Reinforcement through Implicit Rewards（PRIME）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[REINFORCE目标]]

## 7. 读前须知

需要：状态空间模型方程；delta 规则；chunk 并行扫描
