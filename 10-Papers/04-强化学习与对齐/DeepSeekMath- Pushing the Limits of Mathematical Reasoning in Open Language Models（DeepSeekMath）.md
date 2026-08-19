---
type: paper
title: DeepSeekMath - Pushing the Limits of Mathematical Reasoning in Open Language Models
aliases: [DeepSeekMath, [[GRPO与RLVR|GRPO]]提出论文]
year: 2024
authors: [Zhihong Shao, Peiyi Wang, Qihao Zhu, Runxin Xu, Junxiao Song, et al.]
venue: arXiv 2024
arxiv: "2402.03300"
line: 强化学习与对齐
matrix_coords: [RLVR(可验证), RL目标(在线), 有]
tags: [paper]
---

# DeepSeekMath（GRPO 出处）

## 1. 一句话贡献

提出 GRPO——用组内相对优势替代 critic 网络，数学推理 RL 的成本与稳定性难题一次解决。

## 2. 核心贡献

- **GRPO 目标**：PPO 裁剪 + KL 锚 + 组内标准化优势
- **去 critic**：省一半训练显存；避免 value 拟合不稳
- **数学推理验证场**：MATH/GSM8K 上 RL 增益显著（数据+RL 双轮）

## 3. 方法概要

1. SFT 数学模型（含自建语料 DeepSeekMath Corpus）
2. 每个 prompt 采 G 个回答，规则/模型打分 $r_i$
3. $\hat A_i = (r_i - \text{mean})/\text{std}$（组内归一）
4. PPO 式裁剪目标 + KL(π_θ‖π_ref) 更新
5. 迭代多轮

## 4. 核心公式

- [[30-Formulas/GRPO目标]] —— 本文灵魂

## 5. 与前作的关系

- 简化了 [[10-Papers/04-强化学习与对齐/Proximal Policy Optimization Algorithms（PPO）]]（去 critic）于 LLM 场景
- 继承 [[10-Papers/04-强化学习与对齐/Deep reinforcement learning from human preferences（RLHF）]] 的 KL 锚思想
- RLOO（leave-one-out 基线）同期平行工作

## 6. 影响与后续

- [[10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）]] 直接沿用——GRPO 因 R1 出圈
- [[Understanding R1-Zero-Like Training- A Critical Perspective（Dr.GRPO）|Dr.GRPO]]/[[DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）|DAPO]] 等修正系跟进
- 开源 RL 训练框架默认实现之一

## 7. 读前须知

[[30-Formulas/PPO裁剪目标]]、[[40-Concepts/贝尔曼方程]]（为什么组均值能替代 V）、[[40-Concepts/重要性采样]]
