---
type: paper
title: Large Language Models as General Pattern Machines
aliases: [Pattern Machines]
year: 2023
authors: [Mirchandani et al. (Stanford/DeepMind)]
venue: NeurIPS 2023
arxiv: "2307.04721"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [—, —, —]
tags: [paper]
---

# Pattern Machines

## 1. 一句话贡献

LLM=通用模式补全器：进/输出格式统一（文本化状态动作）即可零样本做决策（不 zero-shot 推理那种零，是零微调）——LLM 智能体能力的理论化定位。

## 2. 核心贡献

1. 把 MDP 状态/动作/观测文本化，LLM 直接做 pattern completion（如 Deep Q 值的文本化模仿）

## 3. 方法概要

把 MDP 状态/动作/观测文本化，LLM 直接做 pattern completion（如 Deep Q 值的文本化模仿）。
## 4. 核心公式


$$
\pi(s) = \mathrm{LLM}\big(\mathrm{text}(s)\big)\ \text{(模式补全即策略)}
$$


**直觉**：→ [[ReAct- Synergizing Reasoning and Acting in Language Models（ReAct）|ReAct]]/agent 线的理论背书；≡ 世界模型=推理链类比（世界模型矩阵洞察）

## 5. 与前作/矩阵关系

LLM 决策能力归因（不是推理是模式匹配）的代表作

## 6. 影响后续

需要：zero-shot 的语义辨析（in-context pattern 而非逻辑推导）

## 7. 读前须知

undefined

> 近邻同族：[[A Survey on Hallucination in Large Language Models（Hallucination Survey）]] · [[PCSD- Persistent Consistency for Self-Distillation in Agentic Reinforcement Learning（PCSD）]]

> 数学根基：[[策略梯度定理]]
