---
type: paper
title: Decoupled Weight Decay Regularization
aliases: [AdamW]
year: 2017
authors: [Loshchilov & Hutter]
venue: ICLR 2019
arxiv: "1711.05101"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [—, 优化器, —]
tags: [paper]
---

# AdamW

## 1. 一句话贡献

解耦权重衰减：Adam 里 L2 正则≠权重衰减——分开实现后泛化修复——**现代 LLM 训练的默认优化器**。

## 2. 核心贡献

1. 证明 Adam 的自适应梯度扭曲了 L2 项
2. 解耦后权重衰减直接作用于参数更新

## 3. 方法概要

证明 Adam 的自适应梯度扭曲了 L2 项；解耦后权重衰减直接作用于参数更新。
## 4. 核心公式


$$
\theta \leftarrow \theta - \eta\big(\hat m_t/(\sqrt{\hat v_t}+\epsilon) + \lambda\theta\big)\ \text{(解耦版)}
$$


**直觉**：L2 加进梯度会被二阶矩缩放（每个参数衰减量不可控）；解耦=对所有参数统一"抽税"

## 5. 与前作/矩阵关系

← [[Adam- A Method for Stochastic Optimization（Adam）]]（本批已入库）；→ AdamW 成 Transformer 训练标配（全库实验假设）

## 6. 影响后续

与 Adam/GELU/RMSNorm 同级的配方基础件

## 7. 读前须知

需要：先读 Adam；"L2 与 weight decay 等价"只在 SGD 成立的证明是本卡核心

> 近邻同族：[[Bag of Tricks for Efficient Text Classification（FastText）]]

> 数学根基：[[Adam更新规则]] · [[梯度]]
