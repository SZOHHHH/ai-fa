---
type: paper
title: Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture
aliases: [I-JEPA]
year: 2023
authors: [Mahmoud Assran et al. (Meta)]
venue: CVPR 2024
arxiv: "2301.08243"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [特征预测(JEPA系), 潜在状态, 纯离线]
tags: [paper]
---

# I-JEPA

## 1. 一句话贡献

JEPA 系列的图像版开山：在表示空间预测被遮挡区域的嵌入（不重建像素）——V-JEPA 的直接前身。

## 2. 核心贡献

1. context encoder 看部分图像，predictor 预测目标块（随机远距离块）的表示
2. 损失在潜空间（L1），无像素重建、无对比负样本

## 3. 方法概要

context encoder 看部分图像，predictor 预测目标块（随机远距离块）的表示；损失在潜空间（L1），无像素重建、无对比负样本。
## 4. 核心公式


$$
\mathcal{L} = \sum_i \|\,\mathrm{pred}_\phi\big(z_{\text{ctx}},\, e_i\big) - \mathrm{sg}\big[\,f_\theta(x_i)\,\big]\,\|_1
$$


**直觉**：预测潜量而非像素=JEPA 的定义性选择（容量不浪费在不可预测细节上）；→ V-JEPA/V-JEPA 2/世界模型矩阵 JEPA 行

## 5. 与前作/矩阵关系

Meta 的世界模型理论基石；对比 DINO/MAE 的重建式自监督

## 6. 影响后续

需要：自监督的坍缩问题（JEPA 用 sg+非对称架构防坍缩，不同于对比学习的负样本）

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]（图谱连通入口）

> 近邻同族：[[Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding（Delta-JEPA）]] · [[DF3- World Modeling via Decoder-Free Feature Forecasting in Autonomous Navigation（DF3）]]

> 数学根基：[[JEPA联合嵌入预测架构]]

> 数学根基：[[注意力核心公式]] · [[CLIP对比损失]]

> 核心公式：[[自监督掩码重建]]
