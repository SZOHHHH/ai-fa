---
type: paper
title: Batch Normalization- Accelerating Deep Network Training by Reducing Internal Covariate Shift
aliases: [BN]
year: 2015
authors: [Ioffe & Szegedy]
venue: ICML 2015（7万+引用）
arxiv: "1502.03167"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [—, 归一化/激活, —]
tags: [paper]
---

# BN

## 1. 一句话贡献

批归一化：mini-batch 内每特征归一——训练加速 10× 的奠基技巧（归一化谱系的原点）。

## 2. 核心贡献

1. batch 统计归一+可学习缩放平移

## 3. 方法概要

batch 统计归一+可学习缩放平移；推理用运行均值。
## 4. 核心公式


$$
\hat x = \frac{x - \mu_B}{\sigma_B},\ y = \gamma\hat x + \beta
$$


**直觉**：把"每层输入分布漂移"冻结住——梯度流经归一化后的稳定空间

## 5. 与前作/矩阵关系

→ [[Layer Normalization（LayerNorm）]]（本批已入库，序列版）/RMSNorm（简化版）——**归一化四代谱系 BN→LN→RMSNorm→QK-Norm 补齐前两代**

## 6. 影响后续

归一化=稳定化的思想源头；Transformer 弃 BN 用 LN 的原因（batch 依赖）是架构课必讲

## 7. 读前须知

需要：内部协变量漂移概念；训练/推理统计差异的坑

> 近邻同族：[[Adam- A Method for Stochastic Optimization（Adam）]] · [[Bag of Tricks for Efficient Text Classification（FastText）]]

> 数学根基：[[批归一化]] · [[层归一化]] · [[均方根归一化]]
