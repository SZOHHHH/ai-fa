---
type: paper
title: Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena
aliases: [LLM-as-Judge]
year: 2023
authors: [Zheng et al. (UC Berkeley)]
venue: NeurIPS 2023
arxiv: "2306.05685"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [评分/排序, —, —]
tags: [paper]
---

# LLM-as-Judge

## 1. 一句话贡献

LLM 当裁判的系统评测：MT-Bench 两轮对话+Arena Elo——AI 反馈路线（CAI/Self-Rewarding）的评估地基。

## 2. 核心贡献

1. 强模型成对比较→Elo/BT 排名
2. 偏差分析（位置/长度/自偏好）

## 3. 方法概要

强模型成对比较→Elo/BT 排名；偏差分析（位置/长度/自偏好）。
## 4. 核心公式


$$
P(i \succ j) = \sigma\big(r_i - r_j\big)\ \text{(BT→Elo)}
$$


**直觉**：→ CAI/Self-Rewarding（裁判可靠性是它们的命门）；→ [[When Teachers Mislead- Spurious-Signal-Aware On-Policy Distillation（SA-OPD）]]（B12：teacher 会错——judge 也会错）

## 5. 与前作/矩阵关系

评估方法论的锚点；偏好信号"AI 反馈"列的支撑

## 6. 影响后续

需要：Bradley-Terry 模型；裁判偏差三件套是后续研究富矿

## 7. 读前须知

undefined

> 近邻同族：[[KTO- Model Alignment as Prospect Theoretic Optimization（KTO）]] · [[RewardBench- Evaluating Reward Models for Language Modeling（RewardBench）]]

> 数学根基：[[策略梯度定理]]

> 数学根基：[[REINFORCE目标]]
