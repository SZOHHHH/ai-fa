---
type: paper
title: System 2 Attention (is something you might need too)
aliases: [S2A]
year: 2023
authors: [Weston & Sukhbaatar (Meta)]
venue: arXiv 2023
arxiv: "2311.11829"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [提示触发, —, —]
tags: [paper]
---

# S2A

## 1. 一句话贡献

两阶段注意力：先用 LLM 重写上下文（剔除无关/偏置），再基于净化版回答——注意力软问题的硬绕行。

## 2. 核心贡献

1. 第一遍生成"该关注什么"的上下文重写，第二遍正常 QA

## 3. 方法概要

第一遍生成"该关注什么"的上下文重写，第二遍正常 QA；两次前向。
## 4. 核心公式


$$
y = p_\theta\big(\cdot\ \vert\ \mathrm{rewrite}_\theta(x)\big)
$$


**直觉**：← [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]（重写也是一种思考）；→ 上下文工程线的起点

## 5. 与前作/矩阵关系

提示工程从"怎么说"到"看什么"的转变标志

## 6. 影响后续

需要：无；两次调用的成本权衡

## 7. 读前须知

undefined

> 近邻同族：[[A Survey on In-context Learning（ICL Survey）]]

> 数学根基：[[思维链（CoT）]]
