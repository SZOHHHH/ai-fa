---
type: paper
title: Prompt-to-Prompt Image Editing with Cross Attention Control
aliases: [P2P]
year: 2022
authors: [Hertz et al.]
venue: ICLR 2023
arxiv: "2208.01626"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散/score, 潜空间, 引导编辑]
tags: [paper]
---

# P2P

## 1. 一句话贡献

交叉注意力即语义画布：改提示词但保留原注意力图——扩散模型的免训练文本编辑范式。

## 2. 核心贡献

1. 注入/交换交叉注意力图（空间结构载体），文本 token 语义改写

## 3. 方法概要

注入/交换交叉注意力图（空间结构载体），文本 token 语义改写。
## 4. 核心公式


$$
M^{\text{new}} = \alpha M^{\text{orig}} + (1-\alpha)M^{\text{edit}}\ \text{(注意力图注入)}
$$


**直觉**：← CFG/Imagen；→ Attention 保存系编辑（MasaCtrl 等）；扩散可控性的里程碑

## 5. 与前作/矩阵关系

注意力作为空间语义控制界面的发现——后续无数编辑方法的地基

## 6. 影响后续

需要：交叉注意力图与空间布局的对应关系

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）

> 近邻同族：[[Analyzing and Improving the Training Dynamics of Diffusion Models（EDM2）]] · [[Classifier-Free Diffusion Guidance（CFG）]]

> 数学根基：[[概率分布]]

> 数学根基：[[DSM目标]] · [[条件流匹配损失]]
