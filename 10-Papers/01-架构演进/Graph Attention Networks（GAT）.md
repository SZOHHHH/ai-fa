---
type: paper
title: Graph Attention Networks
aliases: [GAT]
year: 2017
authors: [Veličković et al.]
venue: ICLR 2018
arxiv: "1710.10903"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [—, —, —]
tags: [paper]
---

# GAT

## 1. 一句话贡献

图注意力：注意力机制搬到图结构（邻居加权聚合）——注意力范式外溢到非序列结构的代表。

## 2. 核心贡献

1. 节点对邻居做注意力打分（拼接+LeakyReLU），加权聚合更新

## 3. 方法概要

节点对邻居做注意力打分（拼接+LeakyReLU），加权聚合更新。
## 4. 核心公式


$$
\alpha_{ij} = \mathrm{softmax}_j\big(\mathrm{LeakyReLU}(\vec a^\top[Wh_i \Vert Wh_j])\big),\ h_i^{\prime} = \sigma\big(\sum_j \alpha_{ij}Wh_j\big)
$$


**直觉**：← [[Transformer]]（注意力量化）；注意力=加权聚合的通用性证明（线1 边界扩展）

## 5. 与前作/矩阵关系

GNN×注意力交叉的奠基；科学计算 ML 线（分子图）的地基

## 6. 影响后续

需要：消息传递框架；本卡是注意力外溢谱系的节点

## 7. 读前须知

undefined

> 近邻同族：[[Adam- A Method for Stochastic Optimization（Adam）]] · [[Bag of Tricks for Efficient Text Classification（FastText）]]

> 数学根基：[[注意力机制]]

> 数学根基：[[注意力核心公式]]
