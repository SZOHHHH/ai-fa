---
type: paper
title: SDEdit- Guided Image Synthesis and Editing with Stochastic Differential Equations
aliases: [SDEdit]
year: 2021
authors: [Meng et al.]
venue: ICLR 2022
arxiv: "2108.01073"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, 逆过程引导]
tags: [paper]
---

# SDEdit

## 1. 一句话贡献

先加噪再去噪的编辑范式：把引导信号注入中间噪声级——扩散作为通用编辑器的开端（免训练）。

## 2. 核心贡献

1. 向输入加噪到 t*（保结构毁细节），再从 t* 去噪（细节被模型重写）

## 3. 方法概要

向输入加噪到 t*（保结构毁细节），再从 t* 去噪（细节被模型重写）。
## 4. 核心公式


$$
x^{\text{edit}} = \mathrm{denoise}\big(\mathrm{noise}(x^{\text{guide}}, t^*)\big)
$$


**直觉**：→ img2img/ControlNet（可控生成谱系）；SDE 视角的直观应用

## 5. 与前作/矩阵关系

"噪声强度=编辑自由度"的最早形式化；社区 img2img 的原理出处

## 6. 影响后续

需要：加噪毁细节保结构的直觉

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Denoising Diffusion Probabilistic Models（DDPM）]]（图谱连通入口）

> 近邻同族：[[Analyzing and Improving the Training Dynamics of Diffusion Models（EDM2）]] · [[Classifier-Free Diffusion Guidance（CFG）]]

> 数学根基：[[概率分布]]

> 数学根基：[[DSM目标]] · [[条件流匹配损失]]
