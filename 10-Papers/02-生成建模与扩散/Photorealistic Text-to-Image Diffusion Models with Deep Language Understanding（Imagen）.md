---
type: paper
title: Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding
aliases: [Imagen]
year: 2022
authors: [Saharia et al. (Google)]
venue: NeurIPS 2022
arxiv: "2205.11487"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, score匹配]
tags: [paper]
---

# Imagen

## 1. 一句话贡献

像素扩散文生图的巅峰：T5-XXL 文本编码器（冻结）+ 动态阈值采样，证明**文本理解深度**（非交叉注意力容量）才是文生图瓶颈。

## 2. 核心贡献

1. 大冻结语言模型编码文本+有效扩散（v-pred）+动态阈值（防饱和）

## 3. 方法概要

大冻结语言模型编码文本+有效扩散（v-pred）+动态阈值（防饱和）；像素域大数据训练。
## 4. 核心公式


$$
\mathcal{L} = \mathbb{E}\big\|\epsilon - \epsilon_\theta(x_t, t, \mathrm{T5}(c))\big\|^2,\ \text{threshold 动态截断每步}
$$


**直觉**：↔ DALL-E 2（[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]] 引导路线）；→ Imagen 2/3（闭源演进）；文生图谱系的像素派终点

## 5. 与前作/矩阵关系

文生图质量竞赛（drawbench）时代的王座；"冻结大 LM 当文本脑"的标准设计

## 6. 影响后续

需要：动态阈值的动机（高引导权重的饱和伪影）

## 7. 读前须知

undefined

> 近邻同族：[[Analyzing and Improving the Training Dynamics of Diffusion Models（EDM2）]] · [[Classifier-Free Diffusion Guidance（CFG）]]

> 数学根基：[[概率分布]]

> 数学根基：[[DSM目标]] · [[条件流匹配损失]]
