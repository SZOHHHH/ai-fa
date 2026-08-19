---
type: paper
title: Constitutional AI - Harmlessness from AI Feedback
aliases: [CAI, Constitutional AI]
year: 2022
authors: [Yuntao Bai, Saurav Kadavath, Sandipan Kundu, Amanda Askell, et al.]
venue: arXiv 2022
arxiv: "2212.08073"
line: 强化学习与对齐
matrix_coords: [AI反馈, BT排序损失, 有]
tags: [paper]
---

# Constitutional AI（RLAIF）

## 1. 一句话贡献

用一部"宪法"（行为准则清单）让 AI 自己批评、修订、对比打分自己的输出——偏好标注从人类换成 AI，RLHF 变 RLAIF。

## 2. 核心贡献

- **宪法流程**：监督阶段（自我批评+修订）+ RL 阶段（AI 按宪法产成对偏好）
- **无害性大幅提升**且有用性不降（此前两者像跷跷板）
- **可扩展监督**：AI 反馈成本随规模亚线性，人类反馈线性爆炸

## 3. 方法概要

1. 起草宪法：数十条原则（无害、诚实、有益）
2. 监督学习：对有害回答 → AI 依宪法自评 → 修订 → 用修订对 SFT
3. 偏好数据：同一 prompt 两个回答，AI 按宪法（+少量人类）标注偏好
4. 训 RM → RLAIF（PPO 同款流程，标注者换成 AI）

## 4. 核心公式

- 复用 [[30-Formulas/RLHF目标]]（数据来源替换）
- [[40-Concepts/Bradley-Terry模型]]（AI 评判仍产成对偏好）

## 5. 与前作的关系

- 扩展了 [[10-Papers/04-强化学习与对齐/Deep reinforcement learning from human preferences（RLHF）]]：人类标注 → 宪法 AI 标注
- 对比 [[Training language models to follow instructions with human feedback（InstructGPT）|InstructGPT]]：用更少人工换更强无害性

## 6. 影响与后续

- Claude 系列的实际生产路线（宪法持续演进为 Model Spec 思想）
- [[10-Papers/04-强化学习与对齐/Self-Rewarding Language Models]] 等自评路线的先声
- LLM-as-Judge 评估范式的近亲

## 7. 读前须知

[[20-Algorithms/RLAIF与ConstitutionalAI]]、[[30-Formulas/RLHF目标]]、[[40-Concepts/Bradley-Terry模型]]
