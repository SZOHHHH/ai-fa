---
type: paper
title: Bag of Tricks for Efficient Text Classification
aliases: [FastText]
year: 2016
authors: [Joulin et al. (Meta)]
venue: EACL 2017
arxiv: "1607.01759"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [—, —, —]
tags: [paper]
---

# FastText

## 1. 一句话贡献

FastText：浅层+ n-gram 特征的极致高效文本分类——预训练时代前的效率标杆（架构演进史的"简化极"对照）。

## 2. 核心贡献

1. 线性模型 over 平均词向量+n-gram
2. 分钟级训练十亿级语料

## 3. 方法概要

线性模型 over 平均词向量+n-gram；分钟级训练十亿级语料。
## 4. 核心公式


$$
y = \mathrm{softmax}\big(W\,\mathrm{avg}(v_{w},\ v_{n\text{-}gram})\big)
$$


**直觉**：↔ Transformer（复杂化极）；"简单基线的价值"对照组——本库收录它作为效率轴的原点

## 5. 与前作/矩阵关系

工业界长尾应用的常青树；提醒复杂度不总是答案

## 6. 影响后续

需要：n-gram 特征哈希

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Attention Is All You Need（Transformer）]]（图谱连通入口）

> 近邻同族：[[Adam- A Method for Stochastic Optimization（Adam）]] · [[Batch Normalization- Accelerating Deep Network Training by Reducing Internal Covariate Shift（BN）]]

> 数学根基：[[注意力核心公式]] · [[残差连接]] · [[梯度]]
