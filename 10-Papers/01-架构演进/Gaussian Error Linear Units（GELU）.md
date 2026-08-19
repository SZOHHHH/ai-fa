---
type: paper
title: Gaussian Error Linear Units
aliases: [GELU]
year: 2016
authors: [Hendrycks & Gimpel]
venue: arXiv 2016
arxiv: "1606.08415"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [全注意力, 归一化/激活, 无状态]
tags: [paper]
---

# GELU

## 1. 一句话贡献

高斯误差线性单元：x·Φ(x)——ReLU 的概率软化版，Transformer 默认激活。

## 2. 核心贡献

1. 按输入幅值概率门控（大值直通、小值软抑制）
2. 用 tanh 近似

## 3. 方法概要

按输入幅值概率门控（大值直通、小值软抑制）；用 tanh 近似。
## 4. 核心公式


$$
\mathrm{GELU}(x) = x\,\Phi(x) \approx 0.5x\big(1 + \tanh\big(\sqrt{2/\pi}(x + 0.044715x^3)\big)\big)
$$


**直觉**：ReLU 是硬开关（0 或 1），GELU 是概率开关——小信号"半通"保留梯度

## 5. 与前作/矩阵关系

← ReLU/ELU；≡ [[GLU Variants Improve Transformer（SwiGLU）]]（库内，门控+线性组合的另一代）；激活函数谱系的当代默认

## 6. 影响后续

与 RMSNorm/SwiGLU 并列 Transformer 三件套

## 7. 读前须知

需要：正态 CDF；为何软化边界帮助优化平滑性

> 近邻同族：[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] · [[Attention Is All You Need（Transformer）]]

> 数学根基：[[GELU激活]] · [[SwiGLU门控]]
