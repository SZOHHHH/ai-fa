---
type: paper
title: SDXL- Improving Latent Diffusion Models for High-Resolution Image Synthesis
aliases: [SDXL]
year: 2023
authors: [Podell et al. (Stability)]
venue: ICLR 2024
arxiv: "2307.01952"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散/score, 潜空间, score匹配]
tags: [paper]
---

# SDXL

## 1. 一句话贡献

SD1.5→SDXL 的工程全披露：双文本编码器+多分辨率条件+微调条件（refiner）——潜扩散工程化的集大成。

## 2. 核心贡献

1. OpenCLIP [[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）|ViT]]-bigG+[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]] 双编码
2. 尺寸/裁剪条件注入
3. 后接 refiner 高频修复

## 3. 方法概要

OpenCLIP [[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）|ViT]]-bigG+[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]] 双编码；尺寸/裁剪条件注入；后接 refiner 高频修复。
## 4. 核心公式


$$
c = \big[\mathrm{enc}_1(c),\ \mathrm{enc}_2(c),\ \mathrm{size},\ \mathrm{crop}\big]\ \text{拼接条件}
$$


**直觉**：← [[High-Resolution Image Synthesis with Latent Diffusion Models（LDM）|LDM]]/SD1.5；→ [[Scaling Rectified Flow Transformers for High-Resolution Image Synthesis（SD3）]]（换矩形流）；潜扩散谱系的工程线

## 5. 与前作/矩阵关系

开源文生图生态的主力底座之一（无数 LoRA/微调基于它）

## 6. 影响后续

无新数学；工程配方参考卡

## 7. 读前须知

undefined

> 近邻同族：[[Analyzing and Improving the Training Dynamics of Diffusion Models（EDM2）]] · [[Classifier-Free Diffusion Guidance（CFG）]]

> 数学根基：[[概率分布]]

> 数学根基：[[DSM目标]] · [[条件流匹配损失]]
