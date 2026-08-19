---
type: paper
title: ImageNet Classification with Deep Convolutional Neural Networks
aliases: [AlexNet]
year: 2012
authors: [Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton]
venue: NeurIPS 2012
arxiv: "无（NeurIPS 会议论文，未上 arXiv）"
pdf: 已下载（NeurIPS 官方 proceedings）
line: 架构演进
matrix_coords: [CNN, —, 无状态]
tags: [paper]
---

# AlexNet

## 1. 一句话贡献

GPU + 深层 CNN + 大数据 = ImageNet 错误率骤降 10 个点——深度学习时代的引爆点，整条架构线的祖先。

## 2. 核心贡献

- **深度 CNN 实战化**：8 层（5 卷积+3 全连接），两块 GPU 并行训练
- **ReLU + Dropout + 数据增强**组合拳：训练加速 + 过拟合抑制
- 2012 ImageNet top-5 错误率 15.3%（第二名 26.2%）——压倒性胜利改变整个领域方向

## 3. 方法概要

1. 224×224 输入，Local Response Normalization
2. ReLU 激活（替代 tanh/sigmoid，训练快数倍）
3. Dropout 0.5 于全连接层
4. 随机裁剪/翻转/色彩扰动增强
5. SGD momentum 0.9、weight decay 5e-4

## 4. 核心公式

- ReLU：$\max(0, x)$；Dropout：训练时以概率 p 置零、推理时缩放
- 卷积本身（结构公式；本库架构线的时间起点）

## 5. 与前作的关系

- 放大了 [LeNet（LeCun 1998）] 的思路：小数字 → 百万图像 + GPU
- 数据与算力红利：[ImageNet 数据集（2009）] 与 [GTX 580] 的时代巧合

## 6. 影响与后续

- 直接开启 CV 深度学习时代 → VGG → [[10-Papers/01-架构演进/Deep Residual Learning for Image Recognition（ResNet）]]
- "GPU 训练"范式确立——算力从此成为第一生产力
- 作者 Sutskever 后为 OpenAI 联创——血脉延续到 GPT 系

## 7. 读前须知

无前置数学；作为架构线"第 0 章"阅读

> 近邻同族：[[Deep Residual Learning for Image Recognition（ResNet）]] · [[Encoder-Decoder with Atrous Separable Convolution for Semantic Image Segmentation（DeepLabv3+）]]

> 数学根基：[[注意力核心公式]] · [[残差连接]] · [[梯度]]
