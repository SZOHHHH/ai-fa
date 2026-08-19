---
type: paper
title: A Simple and Effective Pruning Approach for Large Language Models
aliases: [SparseGPT]
year: 2023
authors: [Elias Frantar, Dan Alistarh]
venue: ICLR 2023
arxiv: "2306.11695"
line: 后处理与压缩
matrix_coords: [权重, 剪枝, 训练后]
tags: [paper]
---

# SparseGPT（LLM 剪枝）

## 1. 一句话贡献

把 GPTQ 的二阶补偿思路搬到剪枝——训练后一次性剪到 50%+ 稀疏度而不重训，175B 模型 4 小时剪完，LLM 稀疏化实用化。

## 2. 核心贡献

- **大规模 Oblivious 剪枝**：逐列决策剪/留 + 其余列补偿（同 GPTQ 框架）
- **一次性**：无需重训练/微调（对比彩票假说的重训路线）
- 50% 稀疏度零样本轮次掉点可接受（GPT-系/XLM-R 全谱验证）

## 3. 方法概要

1. 校准集算 Hessian 近似
2. 逐列：决定剪（置零）或量化（可选）
3. 误差用未处理列补偿（最小二乘闭式解）
4. 分块+lazy update 控复杂度

## 4. 核心公式

- 补偿式与 [[30-Formulas/量化误差与异常值]] §2 GPTQ 行同构——剪枝=量化到 {0} 的特例：**剪枝与量化统一框架**

## 5. 与前作的关系

- 直接扩展 [[10-Papers/03-后处理/GPTQ- Accurate Post-Training Quantization for Generative Pre-trained Transformers（GPTQ）]]（同作者）
- 对照 [[10-Papers/03-后处理/The Lottery Ticket Hypothesis- Finding Sparse, Trainable Neural Networks（Lottery Ticket）]]：重训找子网 vs 一步剪大网——两条剪枝哲学

## 6. 影响与后续

- LLM 稀疏化基线；与 2:4 半结构化稀疏硬件加速联动
- Wanda（幅值×激活）等轻量后继

## 7. 读前须知

[[10-Papers/03-后处理/GPTQ- Accurate Post-Training Quantization for Generative Pre-trained Transformers（GPTQ）]]（先读）、[[40-Concepts/量化]]
