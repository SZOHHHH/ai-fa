---
type: algo
aliases: [GRPO, Group Relative Policy Optimization, 组相对策略优化, RLVR]
line: 强化学习与对齐
tags: [algo]
---

# GRPO 与 RLVR

## 1. 定义

**非数学语言**：PPO 要多养一个"打分预言家"（critic 网络）才敢判断动作好坏，又贵又难训。GRPO 的替代方案很朴素：**同一道题让模型做 G 遍，比组内平均好就是好、差就是差**——用同伴当基线，critic 直接退休。RLVR 再进一步：奖励不用学，规则直接判（数学答案对错、代码跑没跑通）。

**数学语言**：[[30-Formulas/GRPO目标]] = PPO 裁剪目标 + KL 锚 + 组内标准化优势 $\hat A_i = (r_i - \text{mean})/\text{std}$。RLVR = GRPO 框架下 $r$ 换成可验证规则奖励。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| [[10-Papers/04-强化学习与对齐/DeepSeekMath- Pushing the Limits of Mathematical Reasoning in Open Language Models（DeepSeekMath）]] | 提出 GRPO（数学推理场景验证） | 2024 |
| [[10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）]] | 纯 RL 训出推理能力（RLVR 范式宣言） | 2025 |
| Dr. GRPO（2025） | 修长度/难度偏置（去 std 归一化） | 2025 |
| （概念源）Karpathy 2025 趋势论：RLVR = LLM 训练新阶段 | — |

## 3. 核心公式

- [[30-Formulas/GRPO目标]] —— 定义性公式
- 继承：[[30-Formulas/PPO裁剪目标]]（裁剪）、[[30-Formulas/RLHF目标]]（KL 锚）

## 4. 数学概念分解

[[40-Concepts/重要性采样]]（比率）、[[40-Concepts/贝尔曼方程]]（优势=组均值的替身）、[[40-Concepts/期望]]、[[40-Concepts/KL散度]]

## 5. 变体与演进

| 变体 | 相比本概念改了什么 | 代表 |
|---|---|---|
| Dr. GRPO | 去 std 归一化、修 $1/\|y\|$ 权重偏置 | 2025 |
| DAPO 等 | 动态采样、解耦裁剪等工程修正 | 2024–25 |
| On-policy 迭代 | 每轮全量重采样（严格同策略） | R1 流程 |
| RLOO / ReMax | 另一种组基线（leave-one-out / max） | 2024 |

## 6. 对比表

| | PPO | GRPO | DPO |
|---|---|---|---|
| critic/value 网络 | 要 | **不要**（组基线） | 不要 |
| 在线采样 | 要 | 要（组 ×G） | 不要 |
| 奖励 | RM | RM 或规则 | 隐式 |
| KL 锚 | 显式（对 ref） | 显式（对 ref） | 隐式（β） |
| 显存（7B 级） | 4 模型 | 3 模型 | 2 模型 |
| 典型用途 | 通用对齐 | 推理/可验证任务 | 快速对齐 |

**RLVR 的一句话定位**：把"对齐"从"听人类的"扩展到"听事实的"——奖励来自可验证世界（编译器、单元测试、答案核对），这是 2025 后推理模型训练的主干。
