---
type: paper
layer: 占位
title: Length-Controlled AlpacaEval- A Simple Way to Debias Automatic Evaluators
aliases: [AlpacaEval2]
year: 2024
authors: [arXiv]
venue: arXiv 2024
arxiv: "2404.04475"
pdf: 已下载（PDF/）
line: 标杆锚点
matrix_coords: [评分/排序, —, —]
tags: [paper, 占位层]
---

# Length-Controlled AlpacaEval- A Simple Way to Debias Automatic Evaluators（AlpacaEval2·七节版）

## 1. 一句话贡献

长度去偏的自动评测：LLM 裁判偏好长回答的系统偏差修正——评测方法学的必修件。

## 2. 核心贡献

1. 长度去偏的自动评测：LLM 裁判偏好长回答的系统偏差修正——评测方法学的必修件。

## 3. 方法概要

回归控制长度变量后再打分；胜率换算成可解释分数。

## 4. 核心公式

$$
\text{win-rate}\ \text{controlled}\ \text{on}\ \log(\text{len})
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

← [[Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena（LLM-as-Judge）]]（库内）的偏差修复线；→ 偏好优化矩阵评测依赖


## 6. 影响与占位意义

自动评测可信度的标准件。

> 近邻同族：[[Emergent Abilities of Large Language Models（涌现）]] · [[Gemini 1.5- Unlocking Multimodal Understanding Across Millions of Tokens of Context（Gemini 1.5）]]
> 数学根基（占位层）：[[注意力机制]]
> 数学根基：[[REINFORCE目标]]

## 7. 读前须知

本卡为占位层升级版；需要的数学基础见"数学根基"行所链接的公式/概念实体。
