---
type: paper
title: Qwen2.5-Math Technical Report- Toward Mathematical Expert Model via Self-Improvement
aliases: [Qwen2.5-Math]
year: 2024
authors: [Qwen Team]
venue: arXiv 2024
arxiv: "2409.12122"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [训练注入, 链, 自举(自我改进)]
tags: [paper]
---

# Qwen2.5-Math

## 1. 一句话贡献

数学专家模型的自我改进三件套：[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]] 蒸馏 + 多格式训练 + **自我改进迭代**（用自身高分样本迭代 SFT）——PRIME/Eurus 的直接前置。

## 2. 核心贡献

1. 三轮：CoT 数据蒸馏（DeepSeekMath/其他教师）→ 文本-程序多格式 → self-improvement（模型自己采样择优再训）

## 3. 方法概要

三轮：CoT 数据蒸馏（DeepSeekMath/其他教师）→ 文本-程序多格式 → self-improvement（模型自己采样择优再训）。
## 4. 核心公式


$$
\text{SFT}\ \text{on}\ \{\text{top-}k\ \text{self-samples by maj@}k\}\ \text{迭代}
$$


**直觉**：→ [[Process Reinforcement through Implicit Rewards（PRIME）]]（Eurus-2 基座即 Qwen2.5-Math）；→ R1（RLVR 路线的 SFT 侧对照）

## 5. 与前作/矩阵关系

数学推理数据管线的标准参考；OPD/蒸馏实验的常用基座

## 6. 影响后续

需要：maj@k 投票；自我改进=Self-Rewarding 的 SFT 版前身

## 7. 读前须知

undefined

> 近邻同族：[[CoT-Valve- Length-Compressible Chain-of-Thought Tuning（CoT-Valve）]] · [[Kimi k1.5- Scaling Reinforcement Learning with LLMs（Kimi k1.5）]]

> 数学根基：[[思维链（CoT）]]

> 数学根基：[[注意力核心公式]]
