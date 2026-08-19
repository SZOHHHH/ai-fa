---
type: paper
title: Least-to-Most Prompting Enables Complex Reasoning in Large Language Models
aliases: [Least-to-Most]
year: 2022
authors: [Denny Zhou, Nathanael Schärli, Le Hou, et al.]
venue: ICLR 2023
arxiv: "2205.10625"
line: 推理模型
matrix_coords: [提示触发, 递归分解, 无奖励(上下文)]
tags: [paper]
---

# Least-to-Most（由易到难）

## 1. 一句话贡献

先让模型把问题拆成子问题、按序逐个解决——"分而治之"提示法，泛化到比示例更难的问题。

## 2. 核心贡献

- **两阶段提示**：分解（列出子问题）→ 顺序求解（每个子问题带前问答案）
- **组合泛化**：SCAN 等任务上超过专门训练模型——非平凡泛化证据
- 与 [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]] 的差异：CoT 学"这道题的步骤"，L2M 学"怎么拆任何题"

## 3. 方法概要

1. 第一阶段 prompt：展示问题分解示例 → 模型输出子问题序列
2. 第二阶段：按序问答，已解子问题的答案进入上下文
3. 逐步组合出最终答案

## 4. 核心公式

- 递归分解结构（无核心数学公式；框架贡献）

## 5. 与前作的关系

- 深化了 [[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]：从"展开步骤"到"结构化分解"
- 与 [[10-Papers/07-推理模型/Tree of Thoughts- Deliberate Problem Solving with Large Language Models（ToT）]] 同属"推理结构化"路线（线性分解 vs 树搜索）

## 6. 影响与后续

- 问题分解成为 Agent 规划（plan-then-execute）的基础组件
- 教育心理学"由易到难"的 AI 映射——提示法的认知科学传统

## 7. 读前须知

[[40-Concepts/思维链（CoT）]]、[[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]

> 近邻同族：[[A Survey on In-context Learning（ICL Survey）]] · [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]
