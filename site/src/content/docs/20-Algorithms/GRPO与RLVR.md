---
type: algo
aliases: [GRPO, Group Relative Policy Optimization, 组相对策略优化, RLVR]
line: 强化学习与对齐
tags: [algo]
---

# GRPO 与 RLVR

## 1. 定义

**非数学语言**：PPO 要多养一个"打分预言家"（critic 网络）才敢判断动作好坏，又贵又难训。GRPO 的替代方案很朴素：**同一道题让模型做 G 遍，比组内平均好就是好、差就是差**——用同伴当基线，critic 直接退休。RLVR 再进一步：奖励不用学，规则直接判（数学答案对错、代码跑没跑通）。

**数学语言**：[GRPO目标](/ai-fa/explore/30-Formulas/GRPO目标) = PPO 裁剪目标 + KL 锚 + 组内标准化优势 $$\hat A_i = (r_i - \text{mean})/\text{std}$$。RLVR = GRPO 框架下 $$r$$ 换成可验证规则奖励。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| [DeepSeekMath - Pushing the Limits of Mathematical Reasoning in Open Language Models](/ai-fa/explore/10-Papers/04-强化学习与对齐/DeepSeekMath- Pushing the Limits of Mathematical Reasoning in Open Language Models（DeepSeekMath）) | 提出 GRPO（数学推理场景验证） | 2024 |
| [DeepSeek-R1 - Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](/ai-fa/explore/10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）) | 纯 RL 训出推理能力（RLVR 范式宣言） | 2025 |
| Dr. GRPO（2025） | 修长度/难度偏置（去 std 归一化） | 2025 |
| [ThinkPrior: Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR](/ai-fa/explore/10-Papers/04-强化学习与对齐/ThinkPrior Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR) | 零 rollout 难度先验：冷启动挑 prompt，避开零优势静默组（省 39% rollout 浪费） | 2026 |
| [Eliciting Self-Verification in Multimodal Reasoning Agents with Reinforcement Learning](/ai-fa/explore/10-Papers/04-强化学习与对齐/Eliciting Self-Verification in Multimodal Reasoning Agents with Reinforcement Learning) | GRPO 训多模态智能体自发自我验证（SVRL） | 2026 |
| [Salesforce Koa: An Enterprise Language Model for Agentic Tool Use](/ai-fa/explore/10-Papers/04-强化学习与对齐/Salesforce Koa An Enterprise Language Model for Agentic Tool Use) | GRPO 工业化：Agent Script 规格展开成仿真任务+接地任务解决奖励（企业智能体工具使用） | 2026 |
| （概念源）Karpathy 2025 趋势论：RLVR = LLM 训练新阶段 | — |

## 3. 核心公式

- [GRPO目标](/ai-fa/explore/30-Formulas/GRPO目标) —— 定义性公式
- 继承：[PPO裁剪目标](/ai-fa/explore/30-Formulas/PPO裁剪目标)（裁剪）、[RLHF目标](/ai-fa/explore/30-Formulas/RLHF目标)（KL 锚）

## 教程：R1 的一天（规则奖励的 RL 循环）

**第 1 步：出题与采样。** prompt"证明 x"→ 模型**自己生成 G=8 个推理链**（温度采样）——同一道题八份答卷。

**第 2 步：规则打分（RLVR）。** 不用奖励模型：答案对 = 1、错 = 0，格式分另计——$$r = (1,1,0,0,1,0,0,1)$$。

**第 3 步：组内标准化。** mean = 0.5、std = 0.5 → $$\hat A = (\pm1)$$——**完整的 (1,1,0,0) 四样本手算见 [GRPO目标](/ai-fa/explore/30-Formulas/GRPO目标) 教程**；全对/全错组优势全零（梯度消失的退化病与 CGE 修法同卡）。

**第 4 步：更新。** 组内每 token 走 PPO 裁剪（四象限见 [PPO裁剪目标](/ai-fa/explore/30-Formulas/PPO裁剪目标)）+ KL 锚住 SFT 参考防语言崩坏——**没有 critic 网络**（PPO 的 V 网络被 8 次采样替代：MC 基线，[贝尔曼方程](/ai-fa/explore/40-Concepts/贝尔曼方程) 误区区）。

**第 5 步：涌现叙事。** R1-Zero 证明：跳过 SFT 的纯 RL + 规则奖励，模型自发长出反思/验证/长链行为——**可验证信号（数学/代码对错）足以驱动推理能力涌现**；蒸馏版再把大模型的长链能力转给小模型（[知识蒸馏](/ai-fa/explore/40-Concepts/知识蒸馏) §R1 行）。

## 4. 数学概念分解

[重要性采样](/ai-fa/explore/40-Concepts/重要性采样)（比率）、[贝尔曼方程](/ai-fa/explore/40-Concepts/贝尔曼方程)（优势=组均值的替身）、[期望](/ai-fa/explore/40-Concepts/期望)、[KL散度](/ai-fa/explore/40-Concepts/KL散度)

## 5. 变体与演进

| 变体 | 相比本概念改了什么 | 代表 |
|---|---|---|
| Dr. GRPO | 去 std 归一化、修 $$1/\|y\|$$ 权重偏置 | 2025 |
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

- → 后继补记（260916）：[Sequential Beats Joint](/ai-fa/explore/10-Papers/07-推理模型/Sequential Beats Joint On the Interplay between On-Policy Distillation and RLVR)（OPD-then-RLVR 串行胜过加权联合（0911 ⑦推荐））

- → 后继补记（260916）：[Spurious Advantage](/ai-fa/explore/10-Papers/07-推理模型/Spurious Advantage Hidden in GRPO)（GRPO 的隐性优势缺陷诊断）

- → 后继补记（260923）：[Run-then-Walk](/ai-fa/explore/10-Papers/04-强化学习与对齐/Sometimes You Gotta Run Before You Can Walk Run-then-Walk Scheduling Strategy for VLM Autonomous Dri)（GRPO 的**目标函数课程**：同数据同算法只按阶段切换奖励——Run 进度探索→Walk 安全修复，VLM 驾驶 RL epoch 省 40-50%）

- → 后继补记（260923）：[Video-HopChain](/ai-fa/explore/10-Papers/04-强化学习与对齐/Video-HopChain Multi-Hop Questions and Confidence-Gated Exploration for Video Reasoning Models)（RLVR 数据合成+零方差组第三条修法：CGE 屏蔽最自信 token 重采制造组内对照，与 ThinkPrior 的冷启动挑题互补）

## 自测

1. R1 的奖励从哪来？（规则（答案对错+格式）——RLVR 不用奖励模型）
2. 组内标准化怎么算优势？（$$(r-\mathrm{mean})/\mathrm{std}$$：(1,1,0,0)→(±1)——MC 基线替 critic）
3. 退化病与修法？（全对/全错组优势全零（梯度消失）——CGE 重采/Dr.GRPO 修偏置）
4. R1-Zero 证明了什么？（纯 RL+可验证信号足以让推理行为涌现——反思/验证/长链自发长出）
