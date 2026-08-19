---
type: paper
title: LLMs Can Not Plan, But Can Help Planning in LLM-Modulo Frameworks
aliases: [LLM-Modulo]
year: 2024
authors: [Kambhampati et al. (ASU)]
venue: ICML 2024
arxiv: "2402.01817"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [提示触发, 树/图, 无奖励(外部验证)]
tags: [paper]
---

# LLM-Modulo

## 1. 一句话贡献

LLM 不会规划（会翻译）：LLM 当建议生成器+外部验证器（经典规划器/SAT）当把关——LLM 智能体架构的批判性框架。

## 2. 核心贡献

1. 理论论证+框架：LLM 提候选，验证器否决/修正
2. 计划性来自外部而非模型

## 3. 方法概要

理论论证+框架：LLM 提候选，验证器否决/修正；计划性来自外部而非模型。
## 4. 核心公式


$$
\text{plan} = \mathrm{verify\text{-}loop}\big(\mathrm{LLM\ candidates},\ \mathcal{V}_{\text{planner}}\big)
$$


**直觉**：↔ Self-Consistency（内部聚合）vs LLM-Modulo（外部验证）；→ agent 架构线

## 5. 与前作/矩阵关系

LLM 规划之争（VALSE 系）的代表；架构上的"分工原则"

## 6. 影响后续

需要：规划的形式化定义（PDDL/SAT 视角）

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]（图谱连通入口）

> 近邻同族：[[A Survey on In-context Learning（ICL Survey）]]

> 数学根基：[[思维链（CoT）]]
