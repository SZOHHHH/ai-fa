---
type: paper
title: MiniLLM - Knowledge Distillation of Large Language Models
aliases: [MiniLLM]
year: 2023
authors: [Yuxian Gu, Li Dong, Furu Wei, Minlie Huang]
venue: ICLR 2024
arxiv: "2306.08543"
pdf: 已下载
line: 强化学习与对齐
matrix_coords: [学生轨迹, 反向KL, token级]
tags: [paper]
---

# MiniLLM（反向 KL 蒸馏 + 策略梯度）

## 1. 一句话贡献

第一个把大模型蒸馏写成**策略梯度优化问题**的工作——用 reverse KL 替代 forward KL 解决"学生背错答案"（曝光偏差/模式坍缩），用长度归一化的策略梯度让反向 KL 可训。

## 2. 核心贡献

1. 理论诊断：前向 KL 会让学生把概率质量撒到教师的**所有**模式上（包括教师自己都不确定的地方）→ 学生生成"类教师但错"的样本；反向 KL 只锁定教师的高置信模式
2. 技术：反向 KL 的期望在学生分布下，直接优化需遍历——**用 policy gradient 定理转成 REINFORCE 式估计** + teacher 采样初始化 + 单步分解（length-normalized）
3. 实验：2.7B→1.4B 等设置下指令跟随蒸馏超过标准 KD

## 3. 方法概要

把 LM 生成视为策略（每 token 一步），蒸馏目标 = 最小化序列级反向 KL。REINFORCE 逐 token 展开，加长度归一化系数防止长序列奖励被稀释。训练时 teacher 提供初始样本（保留探索），student rollout 上计算梯度。

## 4. 核心公式

$$\mathcal{L} = -\frac{1}{|y|}\sum_{t}\Big[\log\frac{\pi_S(y_t|y_{<t})}{\pi_T(y_t|y_{<t})} - \lambda\,\mathrm{KL}\big(\pi_S\Vert\pi_{S,\text{init}}\big)_{t}\Big]$$

**直觉**：第一项 = "在学生自己的路上，每一步都和教师的判断比一比"；第二项 = 别走太远（对初始模型的 KL 锚）。这个结构和 RLHF 目标完全同构——**MiniLLM 已经是"把 teacher 当 reward model 的 RLHF"**，只差一步没说破（Thinking Machines 博客后来把这一步说破了）。

## 5. 与前作关系

- ← [[On-Policy Distillation of Language Models- Learning from Self-Generated Mistakes（GKD）|GKD]]：同一动机（反向 KL + 学生分布），GKD 给框架，MiniLLM 给**可训的策略梯度实现**
- → Qwen3-OPD / Thinking Machines：把 MiniLLM 的"策略梯度解法"简化为"反向 KL 直接当 per-token reward"（省去梯度方差处理）
- #loss/distillation

## 6. 影响后续

verl/Tinker 的 OPD 实现皆承此脉；其"长度归一化"思想后来在 SimPO 长度偏置讨论中重现（[[60-Matrices/RL稳定化矩阵]] 洞察 3）。

## 7. 读前须知

- 需要：REINFORCE 基线思想（[[30-Formulas/REINFORCE目标]]）、反向 KL 的模式搜索性质
- 易混点：MiniLLM 是**序列级反向 KL 的策略梯度展开**（采样梯度通过 student 分布），Thinking Machines OPD 是**逐 token 反向 KL 直接当奖励**（teacher 只算 logprob，无梯度穿过）——前者理论上更"在线"，后者实现上更简单，X 上有专文对比

> 近邻同族：[[Any-OPD- Heterogeneous On-Policy Distillation for Flow-Matching Models via Representation-Space Bridging（Any-OPD）]] · [[CausalOPD- First-Wrong-Step Supervision for Distilling Causal Chain Reasoning（CausalOPD）]]
