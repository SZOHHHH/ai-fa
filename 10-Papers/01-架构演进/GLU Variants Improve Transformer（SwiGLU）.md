---
type: paper
title: GLU Variants Improve Transformer
aliases: [SwiGLU, GLU Variants]
year: 2020
authors: [Noam Shazeer]
venue: arXiv 2020
arxiv: "2002.05202"
line: 架构演进
matrix_coords: [全注意力, 归一化/激活, 无状态]
tags: [paper]
---

# SwiGLU（GLU 变体）

## 1. 一句话贡献

FFN 的门控线性单元变体（SwiGLU）以微小改动换稳定增益——LLaMA 系全部采纳的 FFN 标准件。

## 2. 核心贡献

- **SwiGLU**：$\mathrm{FFN}(x) = (\mathrm{Swish}(xW_1) \odot xW_3) W_2$
- 系统对比 GLU/BGE/SwiGLU 等变体：SwiGLU+Swi-64d 最优
- "参数数对齐下"的公平比较方法

## 3. 方法概要

1. 标准 FFN：$\mathrm{ReLU}(xW_1)W_2$（两矩阵）
2. GLU 化：加第三矩阵做门控——门控分支决定信息通过比例（逐元素乘）
3. Swish 激活：$\mathrm{Swish}(x) = x \cdot \sigma(\beta x)$（平滑、下有小负区）
4. 参数对齐（隐藏维 2/3 倍补回第三矩阵开销）

## 4. 核心公式

- $\mathrm{SwiGLU}(x) = (\mathrm{Swish}(xW_1) \odot xV) W_2$——[[40-Concepts/softmax函数]] 的 σ 是 Swish 的组件
- 结构上属于 [[30-Formulas/残差连接]] 内的 FFN 支路

## 5. 与前作的关系

- 扩展了 [GLU（Dauphin et al. 2017）] 到 Transformer FFN
- 对比 ReLU/GELU 前代：门控结构 > 单纯换激活函数

## 6. 影响与后续

- LLaMA/Qwen/DeepSeek/Mistral 等 FFN 默认（"现代 LLM 配方四件套"之一：RoPE+RMSNorm+SwiGLU+GQA/MLA）
- 门控思想与 MoE 路由（[[20-Algorithms/混合专家（MoE）]]）同构——稀疏选择 vs 稠密门控

## 7. 读前须知

[[40-Concepts/softmax函数]]（σ/Swish）、[[20-Algorithms/Transformer]]（FFN 位置）
