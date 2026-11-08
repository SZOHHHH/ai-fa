---
type: paper
title: "BrainwashedLLM: Jailbreaking via Automated Adversarial Chain of Thoughts Discovery"
aliases: [BrainwashedLLM]
year: 2026
authors: [Masoud Poorghaffar Aghdam, et al.]
venue: 待核（arXiv 2026-11-03）
arxiv: "2611.04717v1"
pdf: https://arxiv.org/pdf/2611.04717v1
line: 强化学习与对齐
matrix_coords: [安全对抗(CoT攻击面), GRPO规则奖励源微调, 弱到强零样本迁移]
tags: [paper]
---
# BrainwashedLLM：自动化对抗思维链发现的越狱

> 中文速览：发现大推理模型的安全对齐对上下文中恶意推理链的鲁棒性远低于直接指令攻击——推理轨迹本身就是攻击面。提出弱到强对抗框架 BrainwashedLLM：先用 GRPO 配多目标规则奖励微调小型白盒「源模型」，自动生成对抗性思维链（奖励完全算在源模型自身轨迹上，不需查询目标模型/梯度/反馈）；再把对抗轨迹作为输入前缀零样本注入，诱导更大的黑盒 LRM 延续对抗推理并产出有害内容。效果：四个不同架构 SOTA 推理模型上 ASR@5 达 0.74-0.98。

## 1. 一句话贡献

证明 LRM 的推理轨迹本身是攻击面——用 GRPO+多目标规则奖励微调小白盒「源模型」全自动生成对抗 CoT，作为输入前缀零样本迁移即可「洗脑」更大的黑盒 LRM 延续对抗推理（ASR@5 0.74-0.98），全程不需查询目标模型、梯度或反馈。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/RLHF]] · [[20-Algorithms/GRPO与RLVR]]（GRPO 反用：规则奖励不奖励任务完成、奖励对抗轨迹质量——攻击构造的优化引擎）；
- ≡ 同族近邻（261104）：[[10-Papers/04-强化学习与对齐/What Drives the Zero-to-One Jump Diagnosing and Steering Hard-Prompt Learning in RLVR|NAPO]]（同为 GRPO 组内信号挖掘，一挖负样本分级、一挖对抗轨迹发现）；[[10-Papers/04-强化学习与对齐/Density-Aware Reward Scaling A Reinforcement Learning Framework for Reward-Proportional Sampling|DARS]]（同日 GRPO 奖励整形家族）；
- 概念/公式链：[[40-Concepts/思维链（CoT）]]（攻击面载体：中间推理的对抗注入）· [[30-Formulas/GRPO目标]]（源微调引擎）· [[40-Concepts/策略梯度定理]]。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.04717v1；在线全文（新论文）：https://arxiv.org/html/2611.04717v1

---

> 谱系枢纽：[[20-Algorithms/GRPO与RLVR]]（图谱连通入口）

> 数学根基：[[30-Formulas/GRPO目标]] · [[40-Concepts/思维链（CoT）]] · [[40-Concepts/策略梯度定理]]
