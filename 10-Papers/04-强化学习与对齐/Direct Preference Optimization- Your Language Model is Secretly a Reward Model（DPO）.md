---
type: paper
title: Direct Preference Optimization - Your Language Model is Secretly a Reward Model
aliases: [DPO]
year: 2023
authors: [Rafael Rafailov, Archit Sharma, Eric Mitchell, Christopher D. Manning, Stefano Ermon, Chelsea Finn]
venue: NeurIPS 2023
arxiv: "2305.18290"
line: 强化学习与对齐
matrix_coords: [成对比较, BT排序损失, 有]
tags: [paper]
---

# Direct Preference Optimization（DPO）

## 1. 一句话贡献

证明 RLHF 目标有闭式最优解，把奖励"藏"进策略自身——偏好数据直接监督学习即可对齐，奖励模型与在线 RL 双双退役。

## 2. 核心贡献

- **闭式重参数化**：$r(x,y) = \beta\log\frac{\pi(y|x)}{\pi_{\text{ref}}(y|x)} + \beta\log Z(x)$
- **DPO 损失**：$Z(x)$ 在成对差分中抵消，得简洁 sigmoid 损失
- **梯度自适应**：$\sigma(\hat r^- - \hat r^+)$ 权重——模型与数据冲突时梯度最大
- 稳定性/成本全面优于 PPO-RLHF（学术复现友好的关键）

## 3. 方法概要

1. 准备偏好数据 $(x, y^+, y^-)$（由任意来源，含已有 RLHF 数据集）
2. 加载 SFT 参考模型 $\pi_{\text{ref}}$（冻结）
3. 直接最小化 DPO 损失更新 $\pi_\theta$
4. 无采样、无 RM、无 RL 循环——标准监督训练流水线

## 4. 核心公式

- [[30-Formulas/DPO损失]] —— 本文灵魂（含推导链与梯度分析）

## 5. 与前作的关系

- 特化自 [[Training language models to follow instructions with human feedback（InstructGPT）|InstructGPT]] 的 RLHF 目标（闭式化）
- 依托 [[40-Concepts/Bradley-Terry模型]] 的偏好似然

## 6. 影响与后续

- 催生整个 DPO 系：[[10-Papers/04-强化学习与对齐/A General Theoretical Paradigm to Understand Learning from Human Preferences（IPO）]]、KTO、ORPO、SimPO
- Zephyr/Llama-3 等开源模型的标准对齐配方
- "奖励模型内嵌"思想影响 reward model-free 路线全局

## 7. 读前须知

[[30-Formulas/RLHF目标]]（先懂闭式解从哪来）、[[40-Concepts/Bradley-Terry模型]]、[[40-Concepts/KL散度]]

> 谱系成员（50）：[[A General Language Assistant as a Laboratory for Alignment（Assistant Lab）]] · [[A General Theoretical Paradigm to Understand Learning from Human Preferences（IPO）]] · [[A Survey on Hallucination in Large Language Models（Hallucination Survey）]] · [[Any-OPD- Heterogeneous On-Policy Distillation for Flow-Matching Models via Representation-Space Bridging（Any-OPD）]] · [[Aya Dataset- An Open-Access Collection for Multilingual Instruction Tuning（Aya）]] · [[CausalOPD- First-Wrong-Step Supervision for Distilling Causal Chain Reasoning（CausalOPD）]] · [[Clip Your Sequences Fairly- Enforcing Length Fairness for Sequence-Level RL（LF-clip）]] · [[Constitutional AI- Harmlessness from AI Feedback（CAI）]] · [[DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）]] · [[DCPO- Dynamic Clipping Policy Optimization（DCPO）]] · [[Deep reinforcement learning from human preferences（RLHF）]] · [[Deep Reinforcement Learning that Matters（DRL Matters）]] · …等 50 篇
