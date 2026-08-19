---
type: paper
title: Adam- A Method for Stochastic Optimization
aliases: [Adam]
year: 2014
authors: [Kingma & Ba]
venue: ICLR 2015（15万+引用）
arxiv: "1412.6980"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [—, 优化器, —]
tags: [paper]
---

# Adam

## 1. 一句话贡献

自适应矩估计优化器：一阶矩（动量）+二阶矩（自适应学习率）的指数移动平均——深度学习默认优化器。

## 2. 核心贡献

1. 梯度一阶/二阶矩 EMA + 偏差修正

## 3. 方法概要

梯度一阶/二阶矩 EMA + 偏差修正；每参数自适应步长。
## 4. 核心公式


$$
m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t,\ v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2,\ \theta \leftarrow \theta - \eta\,\hat m_t/(\sqrt{\hat v_t} + \epsilon)
$$


**直觉**：动量（方向记忆）除以二阶矩（尺度记忆）=自动调步长——每个参数有自己的"节奏"

## 5. 与前作/矩阵关系

← SGD-Momentum/RMSProp；→ [[Decoupled Weight Decay Regularization（AdamW）]]（解耦权重衰减）；与 iVAE 同一作者（Kingma）

## 6. 影响后续

几乎所有后续论文的默认设置；本库全库公式推导的训练引擎假设

## 7. 读前须知

需要：EMA；为何要偏差修正（初始零偏差）

> 近邻同族：[[Bag of Tricks for Efficient Text Classification（FastText）]] · [[Batch Normalization- Accelerating Deep Network Training by Reducing Internal Covariate Shift（BN）]]

> 数学根基：[[Adam更新规则]] · [[梯度]]
