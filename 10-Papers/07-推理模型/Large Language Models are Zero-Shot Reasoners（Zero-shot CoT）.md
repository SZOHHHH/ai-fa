---
type: paper
title: Large Language Models are Zero-Shot Reasoners
aliases: [Zero-shot CoT]
year: 2022
authors: [Takeshi Kojima et al. (UTokyo)]
venue: NeurIPS 2022
arxiv: "2205.11916"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [提示触发, 链, 无奖励(上下文)]
tags: [paper]
---

# Zero-shot CoT

## 1. 一句话贡献

一句 step-by-step 咒语零样本解锁推理——CoT 的 zero-shot 版：一行提示即激发潜藏能力。

## 2. 核心贡献

1. 零样本思维链提示（ZS-CoT）
2. "推理能力是预训练就有的，提示只是钥匙"的证据

## 3. 方法概要

零样本思维链提示（ZS-CoT）；"推理能力是预训练就有的，提示只是钥匙"的证据。
## 4. 核心公式


$$
y \sim p_\theta(\cdot \mid x \oplus \text{step-by-step 咒语})
$$


**直觉**：← [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]（库内 few-shot 版）；→ [[LIMA- Less Is More for Alignment（LIMA）]]（浅层激发假说的互证链）

## 5. 与前作/矩阵关系

提示工程的代表作；"激发 vs 注入"之争的起点

## 6. 影响后续

无数学；文化意义大（提示词即接口）

## 7. 读前须知

undefined

> 近邻同族：[[A Survey on In-context Learning（ICL Survey）]]

> 数学根基：[[思维链（CoT）]]
