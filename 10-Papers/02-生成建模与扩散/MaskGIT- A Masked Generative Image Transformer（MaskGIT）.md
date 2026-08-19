---
type: paper
title: MaskGIT- A Masked Generative Image Transformer
aliases: [MaskGIT]
year: 2022
authors: [Chang et al. (Google)]
venue: CVPR 2022
arxiv: "2202.04200"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [变分, 离散码本, AR先验]
tags: [paper]
---

# MaskGIT

## 1. 一句话贡献

掩码双向生成：VQ 码本+BERT 式并行解码（迭代揭码）——离散生成谱系里 AR（VQGAN）之外的另一极。

## 2. 核心贡献

1. 双向注意力+随机掩码训练
2. 推理时余弦调度逐步揭码（并行多 token），比 AR 快且多样性好

## 3. 方法概要

双向注意力+随机掩码训练；推理时余弦调度逐步揭码（并行多 token），比 AR 快且多样性好。
## 4. 核心公式


$$
\mathcal{L} = \mathbb{E}_{m}\big[\text{CE}\big(\text{masked tokens}\ \vert\ \text{visible}\big)\big],\ \text{揭码率} \propto \cos\big(\tfrac{t}{T}\pi\big)
$$


**直觉**：↔ VQGAN（AR 路线）；→ MaskGIT 系（视频 MAGVIT）；流×离散码本机会格的离散生成对照组

## 5. 与前作/矩阵关系

离散生成三路线（AR/掩码/扩散离散化）的掩码极代表

## 6. 影响后续

需要：BERT 式双向 vs GPT 式单向的生成差异（并行性 vs 因果性）

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）

> 近邻同族：[[Auto-Encoding Variational Bayes（VAE）]] · [[Neural Discrete Representation Learning（VQ-VAE）]]

> 数学根基：[[概率分布]]

> 数学根基：[[VQ-VAE目标]] · [[条件流匹配损失]]
