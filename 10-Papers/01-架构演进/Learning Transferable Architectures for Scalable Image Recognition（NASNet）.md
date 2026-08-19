---
type: paper
title: Learning Transferable Architectures for Scalable Image Recognition
aliases: [NASNet]
year: 2017
authors: [Zoph et al. (Google)]
venue: CVPR 2018
arxiv: "1707.07012"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [CNN, —, 搜索]
tags: [paper]
---

# NASNet

## 1. 一句话贡献

神经架构搜索（NAS）的迁移版：小模型搜出的 cell 直接放大到大模型——**自动化架构设计**时代的代表作。

## 2. 核心贡献

1. 搜索空间=cell 重复结构
2. RL 控制器搜 cell
3. 小尺寸搜索迁移到 ImageNet

## 3. 方法概要

搜索空间=cell 重复结构；RL 控制器搜 cell；小尺寸搜索迁移到 ImageNet。
## 4. 核心公式


$$
\text{cell}^{*} = \arg\max_{\text{cell}} \mathrm{val\ acc}(\text{small(cell)})\ \to\ \text{scale-up}
$$


**直觉**：在小图上搜结构（便宜），在大图上复用（贵但一次）——搜索成本的摊销

## 5. 与前作/矩阵关系

← NAS 原版（3000 GPU 天）；→ EfficientNet（复合缩放）；架构矩阵"搜索"维度的锚点

## 6. 影响后续

自动化设计时代的开端；后来 EfficientNet 系把它产品化

## 7. 读前须知

需要：cell-based 搜索空间；为何可迁移（结构不变性）

---

> 谱系枢纽：[[Attention Is All You Need（Transformer）]]（图谱连通入口）

> 近邻同族：[[Deep Residual Learning for Image Recognition（ResNet）]] · [[Encoder-Decoder with Atrous Separable Convolution for Semantic Image Segmentation（DeepLabv3+）]]

> 数学根基：[[注意力核心公式]] · [[残差连接]] · [[梯度]]
