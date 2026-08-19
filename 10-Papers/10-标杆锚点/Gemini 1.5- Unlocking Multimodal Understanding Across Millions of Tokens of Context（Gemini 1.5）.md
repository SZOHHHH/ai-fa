---
type: paper
title: Gemini 1.5- Unlocking Multimodal Understanding Across Millions of Tokens of Context
aliases: [Gemini 1.5]
year: 2024
authors: [Gemini Team (Google)]
venue: arXiv 2024
arxiv: "2403.05530"
pdf: 已下载（PDF/）
line: 标杆锚点
matrix_coords: [—, —, —]
tags: [paper]
---

# Gemini 1.5

## 1. 一句话贡献

千万级上下文（10M token）的多模态闭源旗舰：MoE 架构+线性上下文扩展——超长上下文能力的产业上限参照。

## 2. 核心贡献

1. 上下文长度碾压式提升（1M→10M）
2. in-context 学习任务

## 3. 方法概要

混合模态原生训练；上下文长度碾压式提升（1M→10M）；in-context 学习任务。
## 4. 核心公式


$$
\text{MoE}\ \text{+}\ \text{long-context}\ \text{position encoding}
$$


**直觉**：线10 锚点：长上下文矩阵的天花板参照（学术方案 vs 产业实现）

## 5. 与前作/矩阵关系

长上下文方向的"可达性证明"（10M 真的能做）

## 6. 影响后续

技术报告口径；复现性有限

## 7. 读前须知

undefined

---

> 谱系枢纽：[[GPT-4 Technical Report（GPT-4）]]（图谱连通入口）

> 近邻同族：[[Large Language Models- A Survey（LLM Survey 2024）]] · [[MixEval- Deriving Wisdom of the Crowd from LLM Benchmark Mixtures（MixEval）]]

> 数学根基：[[注意力机制]]

> 数学根基：[[注意力计算复杂度]]
