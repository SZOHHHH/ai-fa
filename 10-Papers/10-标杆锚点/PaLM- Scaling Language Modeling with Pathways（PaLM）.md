---
type: paper
title: PaLM - Scaling Language Modeling with Pathways
aliases: [PaLM]
year: 2022
authors: [Aakanksha Chowdhery, Sharan Narang, Jacob Devlin, et al.]
venue: JMLR 2023
arxiv: "2204.02311"
line: 标杆锚点
tags: [paper]
---

# PaLM

## 1. 一句话贡献

540B 稠密模型 + Pathways 异构并行系统——GPT-3 之后规模上限的再次刷新，并贡献大量"涌现"观察与 few-shot [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]] 数据。

## 2. 核心贡献

- **540B 训练系统**：6144 TPU、两阶段数据并行+模型并行
- **涌现实例库**：多步推理、翻译、代码的规模跳变数据（喂给 Emergent Abilities 论文）
- **CoT 规模验证**：8B→540B 的 CoT 增益曲线（为 [[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]] 提供规模证据）

## 3. 方法概要

1. 标准 decoder-only（SwiGLU、RoPE 缺席用旋转外方案、parallel attention+FFN 改动）
2. 780B token 训练
3. 数百任务评测 + 偏差/毒性分析（负责任扩展先声）

## 4. 核心公式

- 标准 LLM 目标；贡献在系统与实证而非新公式

## 5. 与前作的关系

- 扩展 [[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]] 的规模边界
- 数据与观察支撑 [[10-Papers/10-标杆锚点/Emergent Abilities of Large Language Models（涌现）]]

## 6. 影响与后续

- Pathways 系统遗产→后续 TPU 训练栈；分支工作 PaLM-2（未公开论文）
- 大规模评测协议（BIG-bench 联动）

## 7. 读前须知

[[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]]、[[10-Papers/10-标杆锚点/Emergent Abilities of Large Language Models（涌现）]]

> 近邻同族：[[Emergent Abilities of Large Language Models（涌现）]] · [[Gemini 1.5- Unlocking Multimodal Understanding Across Millions of Tokens of Context（Gemini 1.5）]]

> 数学根基：[[注意力机制]]

> 数学根基：[[注意力核心公式]]
