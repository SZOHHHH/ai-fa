---
type: paper
title: VICReg- Variance-Invariance-Covariance Regularization for Self-Supervised Learning
aliases: [VICReg]
year: 2021
authors: [Adrien Bardes, Jean Ponce, Yann LeCun]
venue: ICLR 2022
arxiv: "2105.04906"
pdf: 已下载（PDF/）
line: 多模态
matrix_coords: [对比接口, 对比(InfoNCE), 接口级]
tags: [paper]
---

# VICReg

## 1. 一句话贡献

免负样本的对比学习：不用 InfoNCE 的负对，用方差-不变性-协方差三个正则直接防坍缩——对比家族的"无负样本"分支。

## 2. 核心贡献

1. 双分支同构网络，损失=hinge(方差)+不变性(余弦)+协方差去相关——不需要大 batch 负样本或动量编码器

## 3. 方法概要

双分支同构网络，损失=hinge(方差)+不变性(余弦)+协方差去相关——不需要大 batch 负样本或动量编码器。
## 4. 核心公式


$$
\mathcal{L} = \lambda\big[\mu\,H(v) + \nu\,\mathrm{Cov}(v)\big] + \mathbb{E}\|f(x)-f(x^{\prime})\|^2
$$


**直觉**：≡ SimCLR（负样本路线）vs BYOL（非对称路线）vs VICReg（正则路线）——防坍缩三派；→ [[Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture（I-JEPA）]]（LeCun 系谱）

## 5. 与前作/矩阵关系

自监督防坍缩的第三条路；多模态矩阵对比格的补全

## 6. 影响后续

需要：表示坍缩现象（全零输出损失为零但无用）

## 7. 读前须知

undefined

> 近邻同族：[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）]] · [[LiT- Zero-Shot Transfer with Locked-image text Tuning（LiT）]]

> 数学根基：[[VICReg三正则]] · [[KL散度]]
