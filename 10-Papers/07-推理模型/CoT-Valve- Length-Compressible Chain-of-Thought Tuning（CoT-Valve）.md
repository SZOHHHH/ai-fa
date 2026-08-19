---
type: paper
title: [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]]-Valve- Length-Compressible Chain-of-Thought Tuning
aliases: [CoT-Valve]
year: 2025
authors: [（arXiv）]
venue: arXiv 2025
arxiv: "2502.09601"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [训练注入, 链, 长度控制]
tags: [paper]
---

# CoT-Valve

## 1. 一句话贡献

思考长度可调旋钮：在残差流里加"长度方向"参数向量，训练时长度-奖励联合，推理时拧旋钮调 CoT 长度——长度控制的参数化路线。

## 2. 核心贡献

1. 发现残差流中存在与 CoT 长度强相关的方向
2. 注入可学习 token 位置偏置，实现 10x 长度压缩而精度基本保持

## 3. 方法概要

发现残差流中存在与 CoT 长度强相关的方向；注入可学习 token 位置偏置，实现 10x 长度压缩而精度基本保持。
## 4. 核心公式


$$
h_l = h + \lambda\,v_{\text{len}},\ \lambda\ \text{从短到长调度训练}
$$


**直觉**：↔ [[s1- Simple test-time scaling（s1）|s1]]（预算强制，推理期硬控）vs CoT-Valve（参数化软控）；→ 测试时算力调度的一支

## 5. 与前作/矩阵关系

长度控制三线（s1/k1.5/CoT-Valve）的参数化代表

## 6. 影响后续

需要：residual stream 概念；"方向"来自线性探针发现

## 7. 读前须知

undefined

> 近邻同族：[[Kimi k1.5- Scaling Reinforcement Learning with LLMs（Kimi k1.5）]] · [[Let's Verify Step by Step（PRM）]]

> 数学根基：[[思维链（CoT）]]
