---
type: paper
title: Make Your LLM Fully Utilize the Context
aliases: [FILU]
year: 2024
authors: [Li et al.]
venue: arXiv 2024
arxiv: "2404.16811"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [提示触发, —, —]
tags: [paper]
---

# FILU

## 1. 一句话贡献

上下文利用率诊断：LLM 对长上下文中间部分利用不足（lost in the middle 的对策）——信息密集化训练。

## 2. 核心贡献

1. 诊断长上下文的注意力利用
2. 通过训练数据的信息密度调整提升利用

## 3. 方法概要

诊断长上下文的注意力利用；通过训练数据的信息密度调整提升利用。
## 4. 核心公式


$$
\text{utilization} \uparrow \iff \text{训练信息密度} \uparrow
$$


**直觉**：← 上下文利用诊断线；→ 长上下文矩阵训练数据层补位

## 5. 与前作/矩阵关系

长上下文"能装"≠"能用"的代表工作

## 6. 影响后续

需要：lost-in-the-middle 现象

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]（图谱连通入口）

> 近邻同族：[[A Survey on In-context Learning（ICL Survey）]]

> 数学根基：[[思维链（CoT）]]
