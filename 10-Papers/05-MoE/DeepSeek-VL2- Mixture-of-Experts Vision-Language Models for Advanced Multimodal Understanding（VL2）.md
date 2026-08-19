---
type: paper
title: DeepSeek-VL2- Mixture-of-Experts Vision-Language Models for Advanced Multimodal Understanding
aliases: [VL2]
year: 2024
authors: [Wang et al. (DeepSeek)]
venue: arXiv 2024
arxiv: "2412.10302"
pdf: 已下载（PDF/）
line: MoE
matrix_coords: [投影接口, 生成(条件LM), 接口级]
tags: [paper]
---

# VL2

## 1. 一句话贡献

MoE 进多模态：动态 tiling（按图分块路由分辨率）+ DeepSeek-MoE 骨干——视觉 token 路由化的代表。

## 2. 核心贡献

1. 图像按内容动态切 tile（小图少块大图多块）
2. MoE 层做语言侧稀疏化

## 3. 方法概要

图像按内容动态切 tile（小图少块大图多块）；MoE 层做语言侧稀疏化。
## 4. 核心公式


$$
\text{tiles} = \mathrm{dynSplit}(I),\ V = \mathrm{Enc}(\text{tiles})\ \text{+ MoE LLM}
$$


**直觉**：≡ [[混合专家（MoE）]]（视觉输入的粒度路由）

## 5. 与前作/矩阵关系

MoE×多模态交叉的第一批代表（DeepSeek 系）

## 6. 影响后续

需要：DeepSeekMoE 细粒度专家（库内有卡）；动态 tiling=粒度轴思想在视觉输入侧的应用

## 7. 读前须知

undefined

> 近邻同族：[[Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts（无辅助损失MoE）]] · [[DeepSeek-V3 Technical Report（DeepSeek-V3）]]

> 数学根基：[[三层感知机投影]] · [[CLIP对比损失]] · [[注意力核心公式]]
