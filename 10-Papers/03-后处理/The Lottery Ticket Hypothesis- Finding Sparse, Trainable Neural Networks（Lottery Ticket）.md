---
type: paper
title: The Lottery Ticket Hypothesis - Finding Sparse, Trainable Neural Networks
aliases: [Lottery Ticket, 彩票假说]
year: 2018
authors: [Jonathan Frankle, Michael Carbin]
venue: ICLR 2019
arxiv: "1803.03635"
line: 后处理与压缩
matrix_coords: [权重, 剪枝, 预训练]
tags: [paper]
---

# 彩票假说（Lottery Ticket）

## 1. 一句话贡献

"稠密网络里藏着一个小而完整的可训练子网"——迭代幅值剪枝找到的子网**从头训练**就能达到原网络精度，稀疏训练理论的奠基。

## 2. 核心贡献

- **假说陈述**：初始化得当的稀疏子网（中奖彩票）+ 原初始化 = 有效训练
- **迭代幅值剪枝（IMP）**：训 → 剪最小权重 → 回滚到初始权重 → 重训 → 循环
- 10–20% 参数保留全精度（MNIST/CIFAR 全连接/CNN）

## 3. 方法概要

1. 训练网络至收敛
2. 剪掉幅值最小的 p% 权重
3. **剩余权重回滚到初始值**（关键！不回滚则失效）
4. 用原学习率日程重训子网
5. 迭代直至精度开始下降

## 4. 核心公式

- 剪枝掩码 $m$：$W_{\text{sub}} = m \odot W_0$（$W_0$ = 初始值）——"中奖"= $(m, W_0)$ 组合
- 核心洞察在**初始化与掩码的耦合**（公式简单、现象深刻）

## 5. 与前作的关系

- 颠覆了 [剪枝后训练] 常识：剪完的网络直接训效果差、回滚初始才有效——初始化本身编码了可训练性
- 理论延伸：[Renda/Frankle 2020 rewind]（回早中期而非第 0 步更稳）

## 6. 影响与后续

- 神经网络科学（NN science）议程起点；子网发现（NAS/剪枝统一视角）
- LLM 时代的 [[10-Papers/03-后处理/A Simple and Effective Pruning Approach for Large Language Models（SparseGPT）]] 走另一路（训练后剪枝、不重训）

## 7. 读前须知

[[40-Concepts/梯度]]（初始化敏感性）、[[40-Concepts/范数]]（幅值剪枝）
