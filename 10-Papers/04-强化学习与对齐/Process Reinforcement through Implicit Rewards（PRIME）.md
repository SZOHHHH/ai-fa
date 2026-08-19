---
type: paper
title: Process Reinforcement through Implicit Rewards
aliases: [PRIME]
year: 2025
authors: [Ganqu Cui, Lifan Yuan, Zefan Wang, ... Bowen Zhou, Ning Ding]
venue: arXiv 2025
arxiv: "2502.01456"
pdf: 已下载
line: 强化学习与对齐
matrix_coords: [学生轨迹+结果信号, 反向KL, token级]
tags: [paper]
---

# PRIME（隐式过程奖励）

## 1. 一句话贡献

不用训练单独的过程奖励模型（[[Let's Verify Step by Step（PRM）|PRM]]），直接从**结果标签（对/错）**推出**隐式的 token 级过程奖励**——让在线 RL 拥有密集信号，且免于 PRM 的 reward hacking。

## 2. 核心贡献

1. 理论桥：证明了 outcome reward 与 token 级隐式 reward 的关系（Tong et al. 2024 的隐式奖励定理：给定打分器可从其与参考策略的联合分布差导出 token 级 Q 函数）
2. 方法：隐式 PRM（免标注过程标签）+ 在线更新（policy rollout + outcome 标签即可）+ 任意优势函数兼容
3. 实验：Qwen2.5-Math-7B-Base +15.1% 平均；Eurus-2-7B-PRIME 用 10% 数据超 Qwen2.5-Math-7B-Instruct

## 3. 方法概要

把一个 outcome 标签的 RM（判最终答案对错）当作隐式过程奖励源：对一条学生 rollout 的每个 token，用"有此前缀条件下答案正确的概率提升"作为该 token 的 Q 值估计。这个量只需 RM 的两次前向（有/无该 token 前缀的差分），训练 RM 用普通 outcome 标签。优势函数（[[GRPO与RLVR|GRPO]] 式组基线）照常作用在这些密集奖励上。

## 4. 核心公式

$$\hat{Q}(s_t, a_t) = \log\frac{P(\text{correct}\mid s_{1..t})}{P(\text{correct}\mid s_{1..t-1})}\ \Big/\ P(\text{correct}\mid s_{1..t})$$

即 token 级优势 = 该 token 对"最终答对"的**边际对数概率提升**（信息论视角：这个 token 传递了多少"要对了"的证据，逐 token 的贝叶斯更新量）。

**直觉**：教师批改作文不打总分，而是逐句问"写了这句之后，你离及格更近还是更远了"——每句话的贡献被显式量化。

## 5. 与前作关系

- ← [[10-Papers/07-推理模型/Let's Verify Step by Step（PRM）]]：显式 PRM 需要步级标注、易被 hack；PRIME 用隐式推导绕开
- ← [[On-Policy Distillation of Language Models- Learning from Self-Generated Mistakes（GKD）|GKD]] / OPD 家族：同为"学生轨迹 + 密集 token 信号"，但**奖励源是 outcome RM 而非 teacher 分布**——两条路在 [[60-Matrices/蒸馏域矩阵]] §3 的机会格交汇
- → [[60-Matrices/RL稳定化矩阵]] PRM×GRPO 格：PRIME 已部分占格（"组内逐步骤基线"的 teacher-free 版本）

## 6. 影响后续

成为 RLVR + 密集信号方向的基准方法；开源（PRIME-RL/Eurus-2）。[[Entropy-Aware On-Policy Distillation of Language Models（EOPD）|EOPD]]/OPSD 等后续蒸馏工作均引用其"密集信号有效性"论证。

## 7. 读前须知

- 需要：贝叶斯更新的对数几率形式、Q 函数概念（40-Concepts/ 目录下 RL 概念卡）
- 易混点：PRIME 的 token 奖励来自 **outcome RM 的差分**（无 teacher），OPD 的 token 奖励来自 **teacher 与 student 的 logprob 差**（无 outcome）——两者数学形式几乎一样（都是 log 比值），但语义完全不同：前者是"证据增量"，后者是"模仿差量"

> 数学根基：[[策略梯度定理]]

> 数学根基：[[REINFORCE目标]]
