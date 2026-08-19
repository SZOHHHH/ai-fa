---
type: paper
title: ReAct - Synergizing Reasoning and Acting in Language Models
aliases: [ReAct]
year: 2022
authors: [Shunyu Yao, Jeffrey Zhao, Dian Yu, et al.]
venue: ICLR 2023
arxiv: "2210.03629"
line: 推理模型
matrix_coords: [提示触发, 链, 无奖励(上下文)]
tags: [paper]
---

# ReAct（推理+行动）

## 1. 一句话贡献

让 LLM 交替"想一步（Thought）→ 做一步（Action）→ 看结果（Observation）"——推理与工具使用交织，Agent 范式的奠基。

## 2. 核心贡献

- **Thought-Action-Observation 循环**：内部推理指导外部行动、观察反馈修正推理
- **幻觉抑制实证**：HotpotQA 等任务中行动反馈大幅减少编造
- 与 [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]] 对照：纯推理（无外部事实）易幻觉；纯行动（无规划）易迷航

## 3. 方法概要

1. Thought：模型生成当前推理
2. Action：调用工具（搜索/查表/执行）
3. Observation：工具返回注入上下文
4. 循环直至给出答案（Final Answer）

## 4. 核心公式

- 无核心数学公式；框架性贡献（交错轨迹的 few-shot 模板）

## 5. 与前作的关系

- 组合了 [[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]（推理）与 [Act（行动）] 两条线
- 同作者团队与 [[10-Papers/07-推理模型/Tree of Thoughts- Deliberate Problem Solving with Large Language Models（ToT）]] 呼应（ToT 纯内部搜索、ReAct 外部交互）

## 6. 影响与后续

- Agent 框架（LangChain/AutoGPT 等的思想模板）
- 工具调用成为 LLM 标配能力；agentic RL（2025–26）在其轨迹上做 RL

## 7. 读前须知

[[40-Concepts/思维链（CoT）]]、[[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]
