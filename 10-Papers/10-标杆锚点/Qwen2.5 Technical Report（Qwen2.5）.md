---
type: paper
title: Qwen2.5 Technical Report
aliases: [Qwen2.5]
year: 2024
authors: [Qwen Team]
venue: arXiv 2024
arxiv: "2412.15115"
pdf: 已下载（PDF/）
line: 标杆锚点
matrix_coords: [—, —, —]
tags: [paper]
---

# Qwen2.5

## 1. 一句话贡献

Qwen2.5 全家族（0.5B-72B）技术报告：18T token、数学/代码专用配方、后训练规模化——开源多尺寸旗舰的标准参考。

## 2. 核心贡献

1. 多尺寸协同训练+垂直专家分支（Qwen2.5-Math/Coder 已单独立卡）
2. 后训练数据管线细化

## 3. 方法概要

多尺寸协同训练+垂直专家分支（Qwen2.5-Math/Coder 已单独立卡）；后训练数据管线细化。
## 4. 核心公式


$$
\text{18T tokens}\ \text{+}\ \text{specialized branches}
$$


**直觉**：→ [[Qwen2.5-Math Technical Report- Toward Mathematical Expert Model via Self-Improvement（Qwen2.5-Math）]]（本批单卡）/Qwen3（OPD 实验基座）——Qwen 谱系的枢纽

## 5. 与前作/矩阵关系

OPD/RLVR 实验的标准基座家族（[[Entropy-Aware On-Policy Distillation of Language Models（EOPD）|EOPD]] 用 Qwen3，[[Process Reinforcement through Implicit Rewards（PRIME）|PRIME]] 用 Qwen2.5-Math）

## 6. 影响后续

配方参考卡

## 7. 读前须知

undefined

> 近邻同族：[[Gemini 1.5- Unlocking Multimodal Understanding Across Millions of Tokens of Context（Gemini 1.5）]] · [[Large Language Models- A Survey（LLM Survey 2024）]]

> 数学根基：[[注意力机制]]

> 数学根基：[[注意力核心公式]]
