---
type: paper
title: Scaling Instruction-Finetuned Language Models
aliases: [Flan-T5]
year: 2022
authors: [Longpre et al. (Google)]
venue: JMLR 2023
arxiv: "2210.11416"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [隐式偏好, —, —]
tags: [paper]
---

# Flan-T5

## 1. 一句话贡献

指令微调的系统消融：任务数 scaling > 单任务样本量 scaling、思维链数据混合（Flan-PaLM）——指令跟随能力的工程化定型。

## 2. 核心贡献

1. 1800 任务+[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]] 混合消融
2. held-out 泛化随任务数增长

## 3. 方法概要

1800 任务+[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]] 混合消融；held-out 泛化随任务数增长。
## 4. 核心公式


$$
\text{IFT}(N_{\text{task}}\up\up,\ k\ \text{per task})\ \succ\ \text{IFT}(N,\ k\up\up)
$$


**直觉**：← [[Training language models to follow instructions with human feedback（InstructGPT）]]（RLHF 路线）vs Flan（纯 SFT 路线）——对齐双证的 SFT 极；→ [[LIMA- Less Is More for Alignment（LIMA）]]（质量极）

## 5. 与前作/矩阵关系

指令微调配方的事实标准

## 6. 影响后续

需要：held-out 泛化概念

## 7. 读前须知

undefined

> 近邻同族：[[A Survey on In-context Learning（ICL Survey）]] · [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]

> 数学根基：[[思维链（CoT）]]
