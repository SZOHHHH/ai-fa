---
type: paper
title: LIMA- Less Is More for Alignment
aliases: [LIMA]
year: 2023
authors: [Zhou et al. (Meta)]
venue: NeurIPS 2023
arxiv: "2305.11206"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [隐式偏好, RL目标(在线), 有]
tags: [paper]
---

# LIMA

## 1. 一句话贡献

1000 条精选 SFT 达到强对齐：对齐主要是"表面格式/风格"的浅层现象——挑战 RLHF 必要性的著名反例。

## 2. 核心贡献

1. 极度数据筛选（质量>数量）的 SFT，无 RL 阶段
2. 对齐能力的浅层假说

## 3. 方法概要

极度数据筛选（质量>数量）的 SFT，无 RL 阶段；对齐能力的浅层假说。
## 4. 核心公式


$$
\text{SFT on}\ \{1000\ \text{curated pairs}\}\ \to\ \text{强对齐}
$$


**直觉**：↔ [[Training language models to follow instructions with human feedback（InstructGPT）|InstructGPT]]（RL 路线）；偏好优化矩阵"隐式偏好×RL目标"格的 SFT 极端对照

## 5. 与前作/矩阵关系

"对齐=浅层激发"假说——与自我奖励线（内在能力）互证

## 6. 影响后续

需要：无新数学；本卡是思想实验型论文

## 7. 读前须知

undefined

> 近邻同族：[[Aya Dataset- An Open-Access Collection for Multilingual Instruction Tuning（Aya）]] · [[RAFT- Reward rAnked FineTuning for Generative Foundation Model Alignment（RAFT）]]

> 数学根基：[[策略梯度定理]]

> 数学根基：[[REINFORCE目标]]
