---
type: paper
title: Deep Residual Learning for Image Recognition
aliases: [ResNet]
year: 2015
authors: [Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun]
venue: CVPR 2016
arxiv: "1512.03385"
line: 架构演进
matrix_coords: [CNN, —, 无状态]
tags: [paper]
---

# ResNet（残差网络）

## 1. 一句话贡献

恒等捷径让网络深到百层千层不退化——深度学习的"摩天大楼结构力学"，Transformer/U-Net/一切现代网络的承重墙。

## 2. 核心贡献

- **残差块**：$y = \mathcal{F}(x) + x$（[[30-Formulas/残差连接]]）
- **退化问题诊断**：普通网络加深训练误差反升（不是过拟合！是优化困难）——残差一举解决
- 152 层 ImageNet 冠军；之后所有架构的默认结构

## 3. 方法概要

1. 每两/三层卷积包一个捷径：输出 = 卷积结果 + 输入
2. 维度不匹配时捷径加 1×1 投影
3. BN + 合适初始化稳定训练
4. 深度消融：18→152 层单调改善（此前不可想象）

## 4. 核心公式

- [[30-Formulas/残差连接]] —— 本文灵魂

## 5. 与前作的关系

- 改进了 [VGG 的纯堆叠]：深而不崩
- 呼应 [Highway Networks]（门控捷径）——简化为无门控恒等

## 6. 影响与后续

- [[10-Papers/01-架构演进/Attention Is All You Need（Transformer）]] 的每层结构 = 残差块 + 注意力/FFN
- 神经 ODE 理论视角（层数 → 连续流）——连 [[40-Concepts/常微分方程（ODE）]]
- U-Net 的 skip 连接（[[10-Papers/02-生成建模与扩散/U-Net- Convolutional Networks for Biomedical Image Segmentation（U-Net）]]）是它在生成侧的亲戚
- LoRA 的接入方式（线 3）继承"增量加在捷径上"的思想

## 7. 读前须知

[[40-Concepts/梯度]]（为什么 +1 救梯度）、[[30-Formulas/残差连接]] §3 直觉
