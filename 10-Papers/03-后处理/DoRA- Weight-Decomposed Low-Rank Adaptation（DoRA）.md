---
type: paper
title: DoRA - Weight-Decomposed Low-Rank Adaptation
aliases: [DoRA]
year: 2024
authors: [Shih-Yang Liu, Chien-Yi Wang, Hongxu Yin, Pavlo Molchanov, et al.]
venue: ICML 2024
arxiv: "2402.09353"
line: 后处理与压缩
matrix_coords: [权重, 低秩, 微调期]
tags: [paper]
---

# DoRA

## 1. 一句话贡献

把权重分解为"幅度 × 方向"分别适配——方向用 LoRA、幅度单独调，低秩微调质量逼近全参。

## 2. 核心贡献

- **幅度-方向分解**：$W = m \cdot \frac{V}{\|V\|_c}$（$m$ 幅度向量、$V$ 方向矩阵，$\|\cdot\|_c$ 列范数）
- **观察**：全参微调与 LoRA 的差异主要在幅度/方向的更新模式——分开学更接近全参
- 零额外推理成本（同 LoRA 可合并）

## 3. 方法概要

1. 冻结 $W_0$，分解为幅度 $m_0$ 与方向 $V_0$
2. 方向增量走 LoRA：$V = V_0 + BA$
3. 幅度 $m$ 单独可训（每输出通道一个标量）
4. 前向合成；消融显示分解带来的增益独立于秩

## 4. 核心公式

- [[30-Formulas/LoRA分解]] 的发展版（家族表 DoRA 行）

## 5. 与前作的关系

- 改进了 [[10-Papers/03-后处理/LoRA- Low-Rank Adaptation of Large Language Models（LoRA）]]：分解假设更贴全参动态
- 谱系：LoRA → {LoRA+, rsLoRA, DoRA} 的质量修复线

## 6. 影响与后续

- 各基准稳定小胜 LoRA；低秩质量差距显著缩小
- "分解什么"成为 PEFT 新设计空间

## 7. 读前须知

[[30-Formulas/LoRA分解]]、[[40-Concepts/低秩分解]]、[[40-Concepts/范数]]

> 近邻同族：[[A Simple and Effective Pruning Approach for Large Language Models（SparseGPT）]] · [[GPTQ- Accurate Post-Training Quantization for Generative Pre-trained Transformers（GPTQ）]]
