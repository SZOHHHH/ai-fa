---
type: paper
title: RAFT - Reward rAnked FineTuning for Generative Foundation Model Alignment
aliases: [RAFT]
year: 2023
authors: [Hanlin Zhang, Penghui Qi, Yuan Deng, et al.]
venue: TMLR 2024
arxiv: "2304.06767"
line: 强化学习与对齐
matrix_coords: [隐式偏好, RL目标(在线), 有]
tags: [paper]
---

# RAFT（奖励排序微调）

## 1. 一句话贡献

不用 RL 也能对齐：采样一批回答、只保留奖励模型打分最高的、拿去 SFT——" rejection sampling + SFT"的极简对齐，迭代多轮逼近 RLHF 效果。

## 2. 核心贡献

- **BoN 的训练化**：best-of-N 是推理时筛选（不改变模型），RAFT 把筛选结果**喂回训练**——能力沉淀进权重
- **免 RL 栈**：无 PPO/value/reward 前向——工程极简
- 迭代版（RAFT+）多轮逼近 RLHF

## 3. 方法概要

1. 当前模型对每个 prompt 采 N 个回答
2. 奖励模型打分，取 top-k 进新数据集
3. SFT 训练（标准交叉熵）
4. 新模型重复（迭代 3–4 轮）

## 4. 核心公式

- 筛选准则：$D_{t+1} = \{(x, y) : r_\phi(x, y) \ge \text{Quantile}_q\}$ + 标准 SFT 损失
- 本质：策略改进算子的**贝叶斯 SMA 近似**（可视为 REINFORCE 的数据级替身）

## 5. 与前作的关系

- 与 [[10-Papers/04-强化学习与对齐/Statistical Rejection Sampling Improves Preference Optimization（BoN）|BoN]] 上下游呼应：BoN 论证筛选分布的最优性，RAFT 把它变成训练循环
- 对照 [[GRPO与RLVR]]：同为"组内竞争"思想（GRPO 用梯度、RAFT 用数据筛选）

## 6. 影响与后续

- Llama-3 等生产模型的对齐流程公开组件（拒绝采样微调 RFT/RAFT 系）
- "采样-筛选-微调"成为轻量对齐标准配方

## 7. 读前须知

[[30-Formulas/RLHF目标]]、[[10-Papers/04-强化学习与对齐/Statistical Rejection Sampling Improves Preference Optimization（BoN）]]
