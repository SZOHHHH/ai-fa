---
type: paper
title: Grad-CAM- Visual Explanations from Deep Networks via Gradient-based Localization
aliases: [Grad-CAM]
year: 2016
authors: [Selvaraju et al.]
venue: ICCV 2017
arxiv: "1610.02391"
pdf: 已下载（PDF/）
line: 多模态
matrix_coords: [—, —, —]
tags: [paper]
---

# Grad-CAM

## 1. 一句话贡献

梯度加权类激活图：最后一个卷积层梯度×特征=热力图——可解释性的标配工具（本库概念"注意力可视化"的出处之一）。

## 2. 核心贡献

1. 类别分数对卷积特征图求梯度，全局平均得权重，加权求和+ReLU

## 3. 方法概要

类别分数对卷积特征图求梯度，全局平均得权重，加权求和+ReLU。
## 4. 核心公式


$$
L^{\text{Grad-CAM}} = \mathrm{ReLU}\Big(\sum_k \alpha_k A^k\Big),\ \alpha_k = \frac{1}{Z}\sum_{ij}\frac{\partial y_c}{\partial A^k_{ij}}
$$


**直觉**：→ 可解释性线（VLM 的 grounding 归因）；多模态矩阵的工具支线

## 5. 与前作/矩阵关系

可解释性三件套（CAM/Grad-CAM/Attention rollout）之一

## 6. 影响后续

需要：反传梯度即可；无新数学

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）]]（图谱连通入口）

> 近邻同族：[[BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]] · [[Chameleon- Mixed-Modal Early-Fusion Foundation Models（Chameleon）]]

> 数学根基：[[视觉语言模型（VLM）]]

> 数学根基：[[注意力核心公式]] · [[CLIP对比损失]]
