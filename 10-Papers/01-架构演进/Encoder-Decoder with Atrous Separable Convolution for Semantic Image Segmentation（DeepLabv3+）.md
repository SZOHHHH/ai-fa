---
type: paper
title: Encoder-Decoder with Atrous Separable Convolution for Semantic Image Segmentation
aliases: [DeepLabv3+]
year: 2018
authors: [Chen et al. (Google)]
venue: ECCV 2018
arxiv: "1802.02611"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [CNN, —, —]
tags: [paper]
---

# DeepLabv3+

## 1. 一句话贡献

语义分割的卷积时代收官：空洞卷积多尺度+编码器-解码器+可分离卷积——CNN 结构工程的晚期巅峰（线1 的 CNN 支线终点）。

## 2. 核心贡献

1. ASPP（多空洞率并行）+低层特征跳连
2. 深度可分离卷积降本

## 3. 方法概要

ASPP（多空洞率并行）+低层特征跳连；深度可分离卷积降本。
## 4. 核心公式


$$
y = \mathrm{ASPP}\big(\{\mathrm{rate}=6,12,18\}\big)\ \oplus\ \text{low-level feats}
$$


**直觉**：空洞卷积=不降分辨率的感受野扩张——多尺度不用金字塔

## 5. 与前作/矩阵关系

← FCN/U-Net/DeepLab v1-3；CNN 结构谱系的终点站（[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）|ViT]] 之前的分割 SOTA）

## 6. 影响后续

与 U-Net 并列分割双祖；RS 库医学影像背景的对照点

## 7. 读前须知

需要：空洞卷积；可分离卷积的 FLOPs 账

> 近邻同族：[[Deep Residual Learning for Image Recognition（ResNet）]] · [[ImageNet Classification with Deep Convolutional Neural Networks（AlexNet）]]

> 数学根基：[[注意力核心公式]] · [[残差连接]] · [[梯度]]
