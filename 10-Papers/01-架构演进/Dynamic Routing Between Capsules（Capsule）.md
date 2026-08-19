---
type: paper
title: Dynamic Routing Between Capsules
aliases: [Capsule]
year: 2017
authors: [Sabour, Frosst, Hinton]
venue: NeurIPS 2017
arxiv: "1710.09829"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [—, —, —]
tags: [paper]
---

# Capsule

## 1. 一句话贡献

胶囊网络：神经元组（胶囊）+ 动态路由替代标量神经元+池化——Hinton 对 CNN 平移不变性的反对方案（架构谱系的"反叛支线"）。

## 2. 核心贡献

1. 胶囊输出向量（长度=存在性，方向=姿态）
2. 下层胶囊按一致性动态路由到上层

## 3. 方法概要

胶囊输出向量（长度=存在性，方向=姿态）；下层胶囊按一致性动态路由到上层。
## 4. 核心公式


$$
s_j = \sum_i c_{ij}\hat u_{j|i},\ c_{ij} = \mathrm{softmax}(b_{ij}),\ b_{ij} \leftarrow b_{ij} + \hat u_{j|i}\cdot v_j
$$


**直觉**：标量神经元说"有没有"，胶囊向量还说"是什么姿态"——路由=按预测一致性投票

## 5. 与前作/矩阵关系

↔ CNN（池化丢弃空间层级——Hinton 的批判对象）；→ Capsule 后续（未能取代 CNN 但思想活在 equivariance 研究里）

## 6. 影响后续

架构史的分岔记录：不是每条支线都通向主流，但等变性思想回流到 3D/物理 ML

## 7. 读前须知

需要：等变 vs 不变的区分；squash 函数

---

> 谱系枢纽：[[Attention Is All You Need（Transformer）]]（图谱连通入口）

> 近邻同族：[[Adam- A Method for Stochastic Optimization（Adam）]] · [[Bag of Tricks for Efficient Text Classification（FastText）]]

> 数学根基：[[梯度]]

> 数学根基：[[注意力核心公式]]
