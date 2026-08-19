---
type: paper
title: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
aliases: [CoT, Chain-of-Thought]
year: 2022
authors: [Jason Wei, Xuezhi Wang, Dale Schuurmans, et al.]
venue: NeurIPS 2022
arxiv: "2201.11903"
line: 推理模型
matrix_coords: [提示触发, 链, 无奖励(上下文)]
tags: [paper]
---

# 思维链 CoT

## 1. 一句话贡献

在 prompt 里给几个带中间步骤的示例，模型照着"写过程"——数学/常识/符号推理的正确率大涨，推理模型的起点。

## 2. 核心贡献

- **few-shot CoT 范式**：示例含中间推理步 → 输出模仿
- **规模涌现**：~100B 以下增益消失甚至为负；100B+ 阶跃提升
- 三大任务族验证（GSM8K 提升显著）

## 3. 方法概要

1. 构造 8 个带步骤的手写示例
2. 拼进 prompt（few-shot）
3. 模型对新问题生成中间步骤后给答案
4. 消融：去掉步骤（只答案）→ 增益消失

## 4. 核心公式

- [[40-Concepts/思维链（CoT）]] §1：$p(y\mid x) \le p(y, z\mid x)$ 的分解视角

## 5. 与前作的关系

- 集成了 [GPT-3 few-shot] 与 [scratchpad 思想]（Nye 2021）
- 为 [[10-Papers/07-推理模型/Self-Consistency Improves Chain of Thought Reasoning in Language Models（Self-Consistency）]]、ToT、RL 推理（R1）全线奠基

## 6. 影响与后续

- 引用数爆炸的"现象级"论文；直接催生 o1/R1 推理模型时代
- "中间 token = 计算外化"的理论解读影响深远（见概念页 §2）

## 7. 读前须知

[[40-Concepts/思维链（CoT）]]、[[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]]（few-shot 基础）

> 谱系成员（26）：[[A Survey on In-context Learning（ICL Survey）]] · [[Controlled Decoding from Language Models（CD）]] · [[CoT-Valve- Length-Compressible Chain-of-Thought Tuning（CoT-Valve）]] · [[Generalizable Chain-of-Thought Prompting in Mixed-task Scenarios with Large Language Models（KoT）]] · [[GPT-4 Doesn t Know It s Wrong- An Analysis of Iterative Prompting for Reasoning Problems（GPT4-Wrong）]] · [[Kimi k1.5- Scaling Reinforcement Learning with LLMs（Kimi k1.5）]] · [[Large Language Models are Effective Text Rankers with Pairwise Ranking Prompting（PRP）]] · [[Large Language Models are Zero-Shot Reasoners（Zero-shot CoT）]] · [[Large Language Monkeys- Scaling Inference Compute with Repeated Sampling（LL Monkeys）]] · [[Least-to-Most Prompting Enables Complex Reasoning in Large Language Models（Least-to-Most）]] · [[Let's Verify Step by Step（PRM）]] · [[LLMs Can Not Plan, But Can Help Planning in LLM-Modulo Frameworks（LLM-Modulo）]] · …等 26 篇
