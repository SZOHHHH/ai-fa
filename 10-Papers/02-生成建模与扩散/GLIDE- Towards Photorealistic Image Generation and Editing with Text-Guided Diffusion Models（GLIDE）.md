---
type: paper
title: GLIDE- Towards Photorealistic Image Generation and Editing with Text-Guided Diffusion Models
aliases: [GLIDE]
year: 2021
authors: [Nichol et al. (OpenAI)]
venue: ICML 2022
arxiv: "2112.10741"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, score匹配]
tags: [paper]
---

# GLIDE

## 1. 一句话贡献

文生图扩散的先行者：[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]] 引导 vs 无分类器引导（CFG）对决——**CFG 胜出**，从此成为扩散标配。

## 2. 核心贡献

1. 对比 CLIP 引导微调与 CFG 两条路线
2. CFG 以更简单训练（同模型双分支）获得更强文本对齐

## 3. 方法概要

对比 CLIP 引导微调与 CFG 两条路线；CFG 以更简单训练（同模型双分支）获得更强文本对齐。
## 4. 核心公式


$$
\tilde\epsilon = \epsilon_\theta(x_t,c) + w\big(\epsilon_\theta(x_t,c) - \epsilon_\theta(x_t,\varnothing)\big)\ \text{(CFG)}
$$


**直觉**：← DDPM/DDIM；→ Imagen/SD 系全家用 CFG——[[30-Formulas/无分类器引导（CFG）]] 的实证出处

## 5. 与前作/矩阵关系

CFG 的诞生地；文生图扩散时代的第一块基石

## 6. 影响后续

需要：引导权重 w 的直觉（越大越听话但多样性降）；CFG 后来成为蒸馏目标里的条件分支设计依据

## 7. 读前须知

undefined

> 近邻同族：[[Analyzing and Improving the Training Dynamics of Diffusion Models（EDM2）]] · [[Classifier-Free Diffusion Guidance（CFG）]]
