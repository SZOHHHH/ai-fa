---
type: paper
title: GPT-4 Doesn t Know It s Wrong- An Analysis of Iterative Prompting for Reasoning Problems
aliases: [GPT4-Wrong]
year: 2023
authors: [Stechly et al. (ASU)]
venue: arXiv 2023
arxiv: "2310.12397"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [提示触发, 链, 自我纠错]
tags: [paper]
---

# GPT4-Wrong

## 1. 一句话贡献

GPT-4 自评不可靠：迭代提示下自我纠错成功率低且过度自信——自我奖励路线的病症证据。

## 2. 核心贡献

1. 系统实验：模型判断自己答案对错的能力（校准分析）
2. 发现自我纠错的盲区

## 3. 方法概要

系统实验：模型判断自己答案对错的能力（校准分析）；发现自我纠错的盲区。
## 4. 核心公式


$$
P(\text{self-correct}\ \vert\ \text{wrong}) \ll 1
$$


**直觉**：→ [[Self-Rewarding Language Models]]（库内）的病症侧证据链；自我奖励矩阵格的对照

## 5. 与前作/矩阵关系

自我评估局限性的代表作（Kambhampati 系）

## 6. 影响后续

需要：校准概念；与 Self-Rewarding 的张力是研究素材

## 7. 读前须知

undefined

> 近邻同族：[[A Survey on In-context Learning（ICL Survey）]] · [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]

> 数学根基：[[思维链（CoT）]]
