---
type: paper
title: FlashAttention - Fast and Memory-Efficient Exact Attention with IO-Awareness
aliases: [FlashAttention]
year: 2022
authors: [Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré]
venue: NeurIPS 2022
arxiv: "2205.14135"
line: 架构演进
matrix_coords: [全注意力, IO感知, 无状态]
tags: [paper]
---

# FlashAttention

## 1. 一句话贡献

不改注意力的数学，只改计算的 IO 顺序——分块 + 在线 softmax，让 $n^2$ 矩阵从不落地，长上下文从此可行。

## 2. 核心贡献

- **IO 感知算法设计**：首次把"GPU 存储层级"当作一等公民优化目标
- **在线 softmax + tiling**：数学严格等价的分块计算（[[30-Formulas/FlashAttention分块计算]]）
- 反向传播重算代替存储——显存 $O(n)$、速度数倍

## 3. 方法概要

1. 把 Q/K/V 分块载入 SRAM（快显存）
2. 逐块计算局部 softmax，用运行最大值/和增量修正（在线更新）
3. 输出直接写回，$n \times n$ 矩阵永不物化
4. 反向：保存归一化统计量，重算块级注意力

## 4. 核心公式

- [[30-Formulas/FlashAttention分块计算]] —— 灵魂（在线 softmax 更新式）

## 5. 与前作的关系

- 对比稀疏/线性注意力（Performer 等）：它们改数学（近似），FA 不改数学改**计算图**——精确
- 依托 [GPU roofline 模型] 的 IO 复杂度理论

## 6. 影响与后续

- 全部训练/推理框架默认；长上下文竞赛的工程基座
- FA2/FA3 迭代（Hopper 架构深挖）
- 与 Flash-SSM（Mamba 的扫描）共享"IO 感知"方法论——两个领域的同一哲学

## 7. 读前须知

[[30-Formulas/注意力核心公式]]、[[30-Formulas/注意力计算复杂度]]、[[40-Concepts/softmax函数]]（在线化的对象）

> 近邻同族：[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] · [[Attention Is All You Need（Transformer）]]
