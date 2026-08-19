---
type: paper
title: Efficient Estimation of Word Representations in Vector Space
aliases: [word2vec]
year: 2013
authors: [Mikolov et al. (Google)]
venue: NeurIPS 2013
arxiv: "1301.3781"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [—, —, 预训练原点]
tags: [paper]
---

# word2vec

## 1. 一句话贡献

词向量时代开山：skip-gram/CBOW 把词嵌进向量空间（国王-男人+女人≈王后）——**整个嵌入范式的起点**。

## 2. 核心贡献

1. skip-gram：中心词预测上下文

## 3. 方法概要

skip-gram：中心词预测上下文；负采样高效化。
## 4. 核心公式


$$
\max\ \sum_t\sum_{c\in C(t)}\log\sigma\big(v_c^{\top}v_t\big) + \sum_{k}\log\sigma(-v_{k}^{\top}v_t\big)\ \text{(负采样)}
$$


**直觉**：共现统计=语义：一个词的意义由它的邻居定义（分布式假说的可计算版）

## 5. 与前作/矩阵关系

→ GloVe/fastText/ELMo→Transformer 前传——预训练范式的史前史；本库"表示学习"线的起点

## 6. 影响后续

词向量是所有现代 embedding（含多模态对齐）的概念祖先

## 7. 读前须知

需要：负采样的动机（softmax 全词表太贵）

---

> 谱系枢纽：[[Attention Is All You Need（Transformer）]]（图谱连通入口）

> 近邻同族：[[Adam- A Method for Stochastic Optimization（Adam）]] · [[Bag of Tricks for Efficient Text Classification（FastText）]]

> 数学根基：[[word2vec负采样]]
