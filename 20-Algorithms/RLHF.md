---
type: algo
aliases: [RLHF, 人类反馈强化学习, Reinforcement Learning from Human Feedback]
line: 强化学习与对齐
tags: [algo]
---

# RLHF 人类反馈强化学习

## 1. 定义

**非数学语言**：让人类当老师给 AI 的回答打分/挑好的，把这些偏好训练成一个"打分模型"，再用强化学习让 AI 追着高分跑——但有一条皮带（KL）拴着不让它跑偏成"只会讨好打分器的怪物"。

**数学语言**：三阶段——①SFT 得 $\pi_{\text{ref}}$；②人类成对偏好 $(y^+ \succ y^-)$ 训奖励模型 $r_\phi$（[[40-Concepts/Bradley-Terry模型]] 损失）；③以 [[30-Formulas/RLHF目标]]（KL 正则奖励最大化）用 PPO 优化 $\pi_\theta$。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| [[10-Papers/04-强化学习与对齐/Deep reinforcement learning from human preferences（RLHF）]] | 偏好 → 奖励 → RL 的完整框架（机器人场景） | 2017 |
| [[10-Papers/04-强化学习与对齐/Training language models to follow instructions with human feedback（InstructGPT）]] | LLM 规模化：三阶段流程定型 | 2022 |
| [[10-Papers/04-强化学习与对齐/A General Language Assistant as a Laboratory for Alignment（Assistant Lab）]] | 对齐方法系统实验比较 | 2022 |
| [[10-Papers/04-强化学习与对齐/Constitutional AI- Harmlessness from AI Feedback（CAI）]] | 反馈源人类→AI（RLAIF） | 2022 |

## 3. 核心公式

- [[30-Formulas/RLHF目标]] —— 定义性公式（含闭式最优解）
- [[30-Formulas/PPO裁剪目标]] —— 优化引擎
- [[40-Concepts/Bradley-Terry模型]] —— 奖励模型训练损失

## 4. 数学概念分解

[[40-Concepts/马尔可夫决策过程]]（LLM=策略）、[[40-Concepts/策略梯度定理]]、[[40-Concepts/KL散度]]（防漂移锚）、[[40-Concepts/重要性采样]]（PPO 内部）、[[40-Concepts/广义优势估计GAE]]（优势估计）

## 5. 变体与演进

| 变体 | 相比本概念改了什么 | 代表论文 |
|---|---|---|
| RLAIF/CAI | 偏好标注人类 → AI 宪法自评 | [[10-Papers/04-强化学习与对齐/Constitutional AI- Harmlessness from AI Feedback（CAI）]] |
| DPO 系 | 闭式解去 RL——离线直接优化 | [[10-Papers/04-强化学习与对齐/Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）]] |
| GRPO/RLVR | 去 critic + 规则奖励 | [[10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）]] |
| Self-Rewarding | 模型自己给自己标偏好 | [[10-Papers/04-强化学习与对齐/Self-Rewarding Language Models]] |

## 6. 对比表

| | RLHF(PPO) | DPO 系 | GRPO/RLVR |
|---|---|---|---|
| 阶段数 | 3（SFT→RM→RL） | 2（SFT→偏好） | 2（SFT→RL，无 RM） |
| 在线采样 | 需要（贵） | 不需要 | 需要（组采样） |
| 奖励来源 | 学习的 RM | 隐式（策略内嵌） | 规则/可验证 |
| 稳定性 | 中（4 模型同训） | 高 | 高 |
| 适合场景 | 通用对齐 | 快速对齐、资源少 | 推理/可验证任务 |
