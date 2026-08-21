---
type: paper
title: Math-Shepherd- Verify and Reinforce LLMs Step-by-step without Human Annotations
aliases: [Math-Shepherd]
year: 2023
authors: [Peiyi Wang et al.]
venue: ACL 2024
arxiv: "2312.08935"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [训练注入, 链, 过程奖励(PRM)]
tags: [paper]
---

# Math-Shepherd

## 1. 一句话贡献

免人工标注的 PRM：用"此步骤后采样 N 次的全对率"自动估计步骤价值（MC 估计硬标签/软标签）——PRM800K 人工标注路线的自动化替代。

## 2. 核心贡献

1. 对每步 s_t：采样 N 个续完，计算最终正确比例=该步价值估计
2. 两种标签（硬二值/软期望）

## 3. 方法概要

对每步 s_t：采样 N 个续完，计算最终正确比例=该步价值估计；两种标签（硬二值/软期望）。
## 4. 核心公式


$$
\hat V(s_t) = \frac{1}{N}\sum_{i=1}^N \mathbb{1}\big[\text{complete}(s_t, \pi)^i\ \text{correct}\big]
$$


**直觉**：≡ [[10-Papers/07-推理模型/Let's Verify Step by Step（PRM）]]（人工标注路线）；→ [[GRPO与RLVR]]（B14：证明 GRPO 隐式 PRM——本卡是其显式版前身）

## 5. 与前作/矩阵关系

PRM 自动化标注的事实标准；RS 库已收

## 6. 影响后续

需要：MC 估计；步骤价值=后续成功率的定义是全家族（含 GRPO-PRM 隐式版）的公理

## 7. 读前须知

undefined

> 近邻同族：[[CoT-Valve- Length-Compressible Chain-of-Thought Tuning（CoT-Valve）]] · [[Kimi k1.5- Scaling Reinforcement Learning with LLMs（Kimi k1.5）]]

> 数学根基：[[思维链（CoT）]]
