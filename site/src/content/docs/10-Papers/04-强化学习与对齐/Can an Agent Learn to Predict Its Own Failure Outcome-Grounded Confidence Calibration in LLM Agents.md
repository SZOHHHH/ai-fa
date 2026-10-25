---
type: paper
title: "Can an Agent Learn to Predict Its Own Failure? Outcome-Grounded Confidence Calibration in LLM Agents"
aliases: [Outcome-Grounded Calibration, 失败自预测]
year: 2026
authors: [Ashutosh, Hathidara]
venue: arXiv 2610.18614（cs.AI/cs.LG，2026-10-13）
arxiv: "2610.18614v1"
pdf: https://arxiv.org/pdf/2610.18614v1
line: 强化学习与对齐（rl-alignment 轮换）
matrix_coords: [LLM智能体失败自预测, 逐步言语化自信校准, 结局接地(多步episode最终结果为标签), GRPO组rollout免费结局标签, 信任/弃权/移交三决策]
tags: [paper, 精化层（摘要级）]
layer: 精化层（摘要级精读）
---
# Can an Agent Learn to Predict Its Own Failure? Outcome-Grounded Confidence Calibration in LLM Agents

> 精化升级 2026-10-14（每日日常处理段，摘要级）：把智能体的"言语化自信"从对当前步对错的校准，改成对整条多步轨迹最终结局的校准——GRPO 的 rollout 组恰好免费供给结局标签。

## 1. 一句话贡献
把 LLM 智能体的逐步置信度校准目标从"本步决策对不对"换成"当前 rollout 最终会不会成"——用 GRPO 组内 rollouts 的真实结局当免费监督，训练智能体每步给出结局接地的言语化自信，支撑长视野任务中"信任下一步/弃权/移交人类"的三岔决策。

## 2. 核心贡献
- **校准目标重定义**：per-step 置信度应对齐多步 episode 的最终结果（outcome-grounded），而非当前步正确性——前者才是控制决策（信任/弃权/移交）真正需要的信号。
- **免费标签源**：GRPO 天然为每任务生成一组 rollouts，组内成败即结局标签，无需额外标注。
- **应用面向**：长视野任务的人机协作控制信号（何时该撤、何时该交人）。

## 3. 方法概要
（摘要级）①智能体逐步输出言语化置信度；②以同任务 GRPO rollout 组的最终成败为校准目标（组=免费标签机）；③RL 训练使置信度对齐结局；④在多步智能体任务上评测校准质量与下游三岔决策收益。

## 4. 核心公式
- 结局接地校准损失（统一记号，摘要级重构）：$$\mathcal{L}_{\text{calib}} = -\mathbb{E}\left[ c \log p_{\text{verb}} + (1 - c) \log(1 - p_{\text{verb}}) \right]$$，$$c = \mathbb{1}[\text{episode 成功}]$$（直觉：$$p_{\text{verb}}$$ 是模型嘴上说的"我能成"，$$c$$ 是世界给的真值——GRPO 组让这句真值零成本可得；正文或将校准并入 RL 目标的联合形式，待精读补）

## 5. 与前作/矩阵关系
- 线锚：[GRPO与RLVR](/ai-fa/explore/20-Algorithms/GRPO与RLVR)（标签来源机制）· [过程奖励与结果奖励（PRM-ORM）](/ai-fa/explore/40-Concepts/过程奖励与结果奖励（PRM-ORM）)（逐步信号 vs 结局信号之争在此翻转：逐步置信度以结局为锚）· [思维链（CoT）](/ai-fa/explore/40-Concepts/思维链（CoT）)（言语化自信的载体）· [温度参数](/ai-fa/explore/40-Concepts/温度参数)
- ≡ 自我知识同族：[A Sense of Proprioception in Language Models](/ai-fa/explore/10-Papers/04-强化学习与对齐/A Sense of Proprioception in Language Models)（同日同题近邻——那边报告内部状态（本体感受），这边预测外部结局（失败预感）；同用"可验证信号→训练自我知识"配方）
- ← 前身：verbalized confidence / 校准评测线（此前多对当前步或单轮答案校准）

## 6. 影响后续
- 长视野智能体部署安全（弃权/移交）的核心信号件；"GRPO 组=免费结局标签"的技巧会被广泛复用。

## 7. 读前须知
- 前置：[GRPO与RLVR](/ai-fa/explore/20-Algorithms/GRPO与RLVR)（组结构）、校准基础（可靠性图/ECE 直觉）、[过程奖励与结果奖励（PRM-ORM）](/ai-fa/explore/40-Concepts/过程奖励与结果奖励（PRM-ORM）)。
- 原文：https://arxiv.org/pdf/2610.18614v1 ｜ 在线全文：https://arxiv.org/html/2610.18614v1（本卡摘要级）
