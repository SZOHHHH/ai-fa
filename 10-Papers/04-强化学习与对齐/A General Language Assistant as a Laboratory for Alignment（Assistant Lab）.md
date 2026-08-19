---
type: paper
title: A General Language Assistant as a Laboratory for Alignment
aliases: [Assistant Lab, Alignment Lab]
year: 2021
authors: [Amanda Askell, Yuntao Bai, Anna Chen, Dawn Drain, Deep Ganguli, et al.]
venue: arXiv 2021
arxiv: "2112.00861"
line: 强化学习与对齐
matrix_coords: [成对比较, RL目标(在线), 有]
tags: [paper]
---

# A General Language Assistant as a Laboratory for Alignment

## 1. 一句话贡献

把"通用语言助手"当成对齐研究的实验台：系统隔离变量（数据、RM 规模、KL 强度）逐一实验——后来的宪法 AI、偏好泛化研究都建立在这套方法论上。

## 2. 核心贡献

- **可控变量实验框架**：SFT 数据量、RM 大小、RLHF 各阶段的因果效应拆解
- **偏好泛化发现**：偏好标注者在某些维度分歧大、某些维度高度一致——可泛化偏好存在
- **有用-无害权衡的实证刻画**：$\beta$（KL 强度）扫出的权衡曲线

## 3. 方法概要

1. 固定基座（GPT-3 系），分别变动：SFT 数据源/量、偏好数据分布、RM 参数量、RLHF β
2. 每组跑完整三阶段，多维度评估（有用性/无害性/忠实性）
3. 人类评估大规模对照（数千对比）

## 4. 核心公式

- 实验对象即 [[30-Formulas/RLHF目标]]（β 扫描 = KL-奖励权衡曲线）

## 5. 与前作的关系

- 扩展了 [[10-Papers/04-强化学习与对齐/Deep reinforcement learning from human preferences（RLHF）]] 到通用助手域
- 为 [[10-Papers/04-强化学习与对齐/Constitutional AI- Harmlessness from AI Feedback（CAI）]] 铺垫（同团队前身）

## 6. 影响与后续

- Anthropic 的"对齐实验室"方法论起源
- 偏好数据设计（helpful/harmless 两套语料）成为社区标配（HH-RLHF 数据集出处！）

## 7. 读前须知

[[30-Formulas/RLHF目标]]、[[40-Concepts/KL散度]]（β 的作用）

> 近邻同族：[[A General Theoretical Paradigm to Understand Learning from Human Preferences（IPO）]] · [[Deep reinforcement learning from human preferences（RLHF）]]

> 相关：[[OPTD- On-Policy Transition Distillation with Consistency-Guided Adaptive Compression for Few-Step Diffusion Language Models（OPTD）]]

> 相关：[[ORPO- Monolithic Preference Optimization without Reference Model（ORPO）]]

> 相关：[[Process-based Self-Rewarding Language Models（PSR）]]

> 相关：[[PRPO- Aligning Process Reward with Outcome Reward in Policy Optimization（PRPO）]]

> 相关：[[Reward-Gated On-Policy Distillation（RG-OPD）]]

> 相关：[[Self-Distilled Reasoner- On-Policy Self-Distillation for Large Language Models（OPSD）]]

> 相关：[[Self-Guided Process Reward Optimization with Redefined Step-wise Advantage for Process Reinforcement Learning（SPRO）]]

> 相关：[[SG-OPD- Sign-Gated On-Policy Distillation via Sign-Consistency Gating and Phased Teacher Sampling（SG-OPD）]]

> 相关：[[Tandem Reinforcement Learning with Verifiable Rewards（TRL）]]

> 相关：[[UltraFeedback- Boosting Language Models with Scaled AI Feedback（UltraFeedback）]]
