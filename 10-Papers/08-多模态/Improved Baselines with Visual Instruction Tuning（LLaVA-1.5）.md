---
type: paper
title: Improved Baselines with Visual Instruction Tuning
aliases: [LLaVA-1.5]
year: 2023
authors: [Liu et al.]
venue: CVPR 2024
arxiv: "2310.03744"
pdf: 已下载（PDF/）
line: 多模态
matrix_coords: [投影接口, 生成(条件LM), 接口级]
tags: [paper]
---

# LLaVA-1.5

## 1. 一句话贡献

LLaVA 的成熟版：MLP 投影+高质量数据+学术算力（一张 A100）刷进 SOTA——开源 VLM 配方的定型。

## 2. 核心贡献

1. MLP 替换线性投影

## 3. 方法概要

MLP 替换线性投影；响应格式化数据；更高分辨率输入。
## 4. 核心公式


$$
V = \mathrm{MLP}\big(\mathrm{[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]]}(I)\big)\ \text{(双线性视觉词表)}
$$


**直觉**：← [[Visual Instruction Tuning（LLaVA）]]（库内）；→ LLaVA-NeXT 系；投影接口路线的社区标准

## 5. 与前作/矩阵关系

开源 VLM 生态的事实起点（无数后续工作的骨架）

## 6. 影响后续

需要：无新数学；数据配方是主贡献

## 7. 读前须知

undefined

> 近邻同族：[[BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]] · [[Flamingo- a Visual Language Model for Few-Shot Learning（Flamingo）]]

> 数学根基：[[三层感知机投影]] · [[CLIP对比损失]] · [[注意力核心公式]]
