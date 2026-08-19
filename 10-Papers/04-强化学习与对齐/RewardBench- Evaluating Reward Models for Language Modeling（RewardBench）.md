---
type: paper
title: RewardBench- Evaluating Reward Models for Language Modeling
aliases: [RewardBench]
year: 2024
authors: [Lambert et al. (AI2)]
venue: NeurIPS 2024 D&B
arxiv: "2403.13787"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [评分/排序, —, —]
tags: [paper]
---

# RewardBench

## 1. 一句话贡献

奖励模型评测基准：RM 的正确性/一致性/鲁棒性标准化——"评测 RM 而非 LLM"的专门赛道。

## 2. 核心贡献

1. 偏好对+可识别正确答案对构造
2. 跨 RM 家族可比

## 3. 方法概要

偏好对+可识别正确答案对构造；跨 RM 家族可比。
## 4. 核心公式


$$
\text{RM accuracy} = \mathbb{E}\big[\mathrm{score}(y^+) > \mathrm{score}(y^-)\big]
$$


**直觉**：→ [[Hybrid Reinforcement- When Reward Is Sparse, It is Better to Be Dense（HERO）]]（B12：RM 集成+verifier）；→ reward hacking 线（评测是防线）

## 5. 与前作/矩阵关系

RM 生态的锚点基准

## 6. 影响后续

需要：RM 的角色（RLHF 中间件）；本卡是基础设施型

## 7. 读前须知

undefined

> 近邻同族：[[Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena（LLM-as-Judge）]] · [[KTO- Model Alignment as Prospect Theoretic Optimization（KTO）]]

> 数学根基：[[策略梯度定理]]

> 数学根基：[[REINFORCE目标]]
