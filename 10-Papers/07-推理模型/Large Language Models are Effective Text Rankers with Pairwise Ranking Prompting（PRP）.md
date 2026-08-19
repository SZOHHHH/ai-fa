---
type: paper
layer: 占位
title: Large Language Models are Effective Text Rankers with Pairwise Ranking Prompting
aliases: [PRP]
year: 2023
authors: [arXiv]
venue: arXiv 2023
arxiv: "2306.17563"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [提示触发, 采样聚合, —]
tags: [paper, 占位层]
---

# Large Language Models are Effective Text Rankers with Pairwise Ranking Prompting（PRP·七节版）

## 1. 一句话贡献

成对排序提示：LLM 零样本当排序器（两两比较+聚合排序）——排序即推理的应用证据。

## 2. 核心贡献

1. 成对排序提示：LLM 零样本当排序器（两两比较+聚合排序）
2. 排序即推理的应用证据。

## 3. 方法概要

滑窗成对比较 + 冒泡/聚合得全序。

## 4. 核心公式

$$
\text{rank} = \mathrm{aggregate}\big(\{\mathrm{LLM}(i \succ j)\}\)
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

→ [[Self-Consistency Improves Chain of Thought Reasoning in Language Models（Self-Consistency）]]（聚合思想在排序域）；推理矩阵提示触发×聚合交叉


## 6. 影响与占位意义

LLM-as-ranker 路线起点。

> 近邻同族：[[A Survey on In-context Learning（ICL Survey）]] · [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]
> 数学根基（占位层）：[[思维链（CoT）]]

## 7. 读前须知

本卡为占位层升级版；需要的数学基础见"数学根基"行所链接的公式/概念实体。
