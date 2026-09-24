---
type: algo
aliases: [RLHF, 人类反馈强化学习, Reinforcement Learning from Human Feedback]
line: 强化学习与对齐
tags: [algo]
---

# RLHF 人类反馈强化学习

## 1. 定义

**非数学语言**：让人类当老师给 AI 的回答打分/挑好的，把这些偏好训练成一个"打分模型"，再用强化学习让 AI 追着高分跑——但有一条皮带（KL）拴着不让它跑偏成"只会讨好打分器的怪物"。

**数学语言**：三阶段——①SFT 得 $$\pi_{\text{ref}}$$；②人类成对偏好 $$(y^+ \succ y^-)$$ 训奖励模型 $$r_\phi$$（[Bradley-Terry模型](/ai-fa/explore/40-Concepts/Bradley-Terry模型) 损失）；③以 [RLHF目标](/ai-fa/explore/30-Formulas/RLHF目标)（KL 正则奖励最大化）用 PPO 优化 $$\pi_\theta$$。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| [Deep reinforcement learning from human preferences](/ai-fa/explore/10-Papers/04-强化学习与对齐/Deep reinforcement learning from human preferences（RLHF）) | 偏好 → 奖励 → RL 的完整框架（机器人场景） | 2017 |
| [Training language models to follow instructions with human feedback](/ai-fa/explore/10-Papers/04-强化学习与对齐/Training language models to follow instructions with human feedback（InstructGPT）) | LLM 规模化：三阶段流程定型 | 2022 |
| [A General Language Assistant as a Laboratory for Alignment](/ai-fa/explore/10-Papers/04-强化学习与对齐/A General Language Assistant as a Laboratory for Alignment（Assistant Lab）) | 对齐方法系统实验比较 | 2022 |
| [Constitutional AI - Harmlessness from AI Feedback](/ai-fa/explore/10-Papers/04-强化学习与对齐/Constitutional AI- Harmlessness from AI Feedback（CAI）) | 反馈源人类→AI（RLAIF） | 2022 |

## 3. 核心公式

- [RLHF目标](/ai-fa/explore/30-Formulas/RLHF目标) —— 定义性公式（含闭式最优解）
- [PPO裁剪目标](/ai-fa/explore/30-Formulas/PPO裁剪目标) —— 优化引擎
- [Bradley-Terry模型](/ai-fa/explore/40-Concepts/Bradley-Terry模型) —— 奖励模型训练损失

## 教程：三阶段流水线（一条偏好数据的旅程）

**第 1 阶段：SFT。** 人工写示范 → 监督微调出 $$\pi_{\mathrm{ref}}$$——"先会说话，再谈听话"（没有这步，后续 KL 锚没有可依的参照）。

**第 2 阶段：奖励模型。** 人类标 $$(y^+, y^-)$$ → BT 模型学 $$r_\phi$$（[Bradley-Terry模型](/ai-fa/explore/40-Concepts/Bradley-Terry模型) 教程：sigmoid(r⁺−r⁻) 拟合偏好频率、Z 消元）；闭式视角见 [RLHF目标](/ai-fa/explore/30-Formulas/RLHF目标) 教程（Boltzmann 重加权 (0.881, 0.119)——β 是奖励换概率的汇率）。

**第 3 阶段：RL 微调。** PPO 优化 $$r_\phi - \beta\mathrm{KL}$$：组内 GAE 估计优势（[广义优势估计GAE](/ai-fa/explore/40-Concepts/广义优势估计GAE)）→ 裁剪更新（[PPO裁剪目标](/ai-fa/explore/30-Formulas/PPO裁剪目标) 教程四象限）→ KL 锚防 reward hacking（[RLHF目标](/ai-fa/explore/30-Formulas/RLHF目标) 教程第 4 步：保险丝现场）。

**第 4 步：全链读法。** 一条数据的两次身份：标注时是 $$(y^+, y^-)$$（教 RM），采样时是 rollout（教策略）；**RM 的偏见会被策略放大**（过拟合的漏洞被钻）——KL 锚 + 早期停止是工程保险。

**第 5 步：简化史。** InstructGPT 定式（PPO+GAE+KL）→ DPO 跳过 RM 与采样（[DPO损失](/ai-fa/explore/30-Formulas/DPO损失) 教程：闭式解反推）→ GRPO 去 critic（[GRPO目标](/ai-fa/explore/30-Formulas/GRPO目标) 教程：组内标准化）→ RLAIF 把人类也换成 AI（[RLAIF与ConstitutionalAI](/ai-fa/explore/20-Algorithms/RLAIF与ConstitutionalAI)）——**每一代都在砍流水线的一段**。

## 4. 数学概念分解

[马尔可夫决策过程](/ai-fa/explore/40-Concepts/马尔可夫决策过程)（LLM=策略）、[策略梯度定理](/ai-fa/explore/40-Concepts/策略梯度定理)、[KL散度](/ai-fa/explore/40-Concepts/KL散度)（防漂移锚）、[重要性采样](/ai-fa/explore/40-Concepts/重要性采样)（PPO 内部）、[广义优势估计GAE](/ai-fa/explore/40-Concepts/广义优势估计GAE)（优势估计）

## 5. 变体与演进

| 变体 | 相比本概念改了什么 | 代表论文 |
|---|---|---|
| RLAIF/CAI | 偏好标注人类 → AI 宪法自评 | [Constitutional AI - Harmlessness from AI Feedback](/ai-fa/explore/10-Papers/04-强化学习与对齐/Constitutional AI- Harmlessness from AI Feedback（CAI）) |
| DPO 系 | 闭式解去 RL——离线直接优化 | [Direct Preference Optimization - Your Language Model is Secretly a Reward Model](/ai-fa/explore/10-Papers/04-强化学习与对齐/Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）) |
| GRPO/RLVR | 去 critic + 规则奖励 | [DeepSeek-R1 - Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](/ai-fa/explore/10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）) |
| Self-Rewarding | 模型自己给自己标偏好 | [Self-Rewarding Language Models](/ai-fa/explore/10-Papers/04-强化学习与对齐/Self-Rewarding Language Models) |

## 6. 对比表

| | RLHF(PPO) | DPO 系 | GRPO/RLVR |
|---|---|---|---|
| 阶段数 | 3（SFT→RM→RL） | 2（SFT→偏好） | 2（SFT→RL，无 RM） |
| 在线采样 | 需要（贵） | 不需要 | 需要（组采样） |
| 奖励来源 | 学习的 RM | 隐式（策略内嵌） | 规则/可验证 |
| 稳定性 | 中（4 模型同训） | 高 | 高 |
| 适合场景 | 通用对齐 | 快速对齐、资源少 | 推理/可验证任务 |

## 自测

1. 三阶段各训练什么？（SFT 出参照 / BT 训 RM / PPO 微调策略）
2. RM 的偏见如何被放大？（策略钻 reward model 漏洞——KL 锚+早停是保险）
3. 一条数据的两次身份？（标注时 $$(y^+,y^-)$$ 教 RM / 采样时 rollout 教策略）
4. 简化史主线？（每代砍一段流水线：DPO 砍 RM+采样、GRPO 砍 critic、RLAIF 砍人类标注）
