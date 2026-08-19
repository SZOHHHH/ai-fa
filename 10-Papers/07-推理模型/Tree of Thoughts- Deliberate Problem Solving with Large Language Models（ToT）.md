---
type: paper
title: Tree of Thoughts - Deliberate Problem Solving with Large Language Models
aliases: [ToT]
year: 2023
authors: [Shunyu Yao, Dian Yu, Jeffrey Zhao, et al.]
venue: NeurIPS 2023
arxiv: "2305.10601"
line: 推理模型
matrix_coords: [提示触发, 树/图, 无奖励(上下文)]
tags: [paper]
---

# Tree of Thoughts（ToT）

## 1. 一句话贡献

把"链"升级为"树"——LLM 在思维树上搜索（生成候选/评估/回溯），Deliberate 问题解决框架。

## 2. 核心贡献

- **树结构推理**：每步多条分支、可评估可回溯
- **搜索算法整合**：BFS/DFS + LLM 自评估当启发式
- 24 点游戏 4→74%（GPT-4）——"思考方式"决定能力上限

## 3. 方法概要

1. 思维分解：定义"一步思考"的粒度
2. 分支生成：LLM 产 k 个候选
3. 状态评估：LLM 打分（v-value 或 p 续搜概率）
4. 搜索：BFS/DFS 按评估扩展、剪枝、回溯

## 4. 核心公式

- 搜索框架（BFS/DFS 通用算法）；评估 = LLM-as-Judge 的序数/基数打分

## 5. 与前作的关系

- 泛化了 [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]]（链=单路径树）与 [[10-Papers/07-推理模型/Self-Consistency Improves Chain of Thought Reasoning in Language Models（Self-Consistency）]]（平行链=无分叉树）
- 思想源头：Newell & Simon 1972 的人类问题求解理论（搜索空间）

## 6. 影响与后续

- "LLM + 搜索"范式（Graph of Thoughts、MCTS 变体）爆发
- o1 的隐式搜索（学会在单序列内搜索）与之对照——外挂搜索 vs 内化搜索

## 7. 读前须知

[[40-Concepts/思维链（CoT）]]、[[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]
