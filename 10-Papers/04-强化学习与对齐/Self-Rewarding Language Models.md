---
type: paper
title: Self-Rewarding Language Models
aliases: [Self-Rewarding]
year: 2024
authors: [Weizhe Yuan, Richard Yuanzhe Pang, Kyunghyun Cho, Xian Li, Sainbayar Sukhbaatar, Jing Xu, Ahmad Emtetis, Jason Weston]
venue: arXiv 2024
arxiv: "2401.10020"
line: 强化学习与对齐
matrix_coords: [自我奖励, BT排序损失, 有]
tags: [paper]
---

# Self-Rewarding Language Models

## 1. 一句话贡献

让 LLM 自己给自己的回答当裁判并据此 [[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）|DPO]] 训练自己——奖励模型岗位取消，对齐进入自我迭代循环。

## 2. 核心贡献

- **自评奖励**：LLM-as-Judge 提示下模型对候选打分（无需外部 RM）
- **迭代自提升**：训练 → 更强 → 自评更准 → 再训练——良性循环（super-alignment 方向雏形）
- 实验中三代迭代后指令跟随与奖励建模双双提升

## 3. 方法概要

1. 给模型 judge 提示（偏好比较模板）
2. 对每个 prompt 生成多个候选，模型自评选优/劣
3. 用自评偏好做 DPO（见 [[30-Formulas/DPO损失]]）
4. 新模型再自评再 DPO，迭代数代

## 4. 核心公式

- 复用 [[30-Formulas/DPO损失]]（数据来自自评）

## 5. 与前作的关系

- 组合了 [[10-Papers/04-强化学习与对齐/Constitutional AI- Harmlessness from AI Feedback（CAI）]]（AI 反馈思想）与 [[10-Papers/04-强化学习与对齐/Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）]]（优化器）
- 更彻底的自动化：CAI 还要宪法提示，Self-Rewarding 连外部结构都内化

## 6. 影响与后续

- Llama-2/3 时代偏好合成数据的放大器
- "模型监督模型"路线的代表作（对齐扩展性研究议程）
- 与 R1 的规则奖励形成对照：软自评 vs 硬验证

## 7. 读前须知

[[30-Formulas/DPO损失]]、[[20-Algorithms/RLAIF与ConstitutionalAI]]
