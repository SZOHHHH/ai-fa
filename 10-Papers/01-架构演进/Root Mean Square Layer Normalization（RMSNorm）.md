---
type: paper
title: Root Mean Square Layer Normalization
aliases: [RMSNorm]
year: 2019
authors: [Biao Zhang, Rico Sennrich]
venue: NeurIPS 2019
arxiv: "1910.07467"
line: 架构演进
matrix_coords: [全注意力, 归一化/激活, 无状态]
tags: [paper]
---

# RMSNorm

## 1. 一句话贡献

LayerNorm 砍掉均值中心化、只按均方根缩放——更快更省、效果不掉，现代 LLM 默认归一化。

## 2. 核心贡献

- **公式极简**：$\mathrm{RMSNorm}(x) = \frac{x}{\sqrt{\frac{1}{d}\sum_i x_i^2 + \epsilon}} \odot g$
- 重新审视 LayerNorm 哪部分真正有用——结论：缩放是主角，中心化可省
- 训练提速 + 精度无损

## 3. 方法概要

1. LayerNorm：先减均值再除标准差（两次统计量）
2. RMSNorm：只算均方根（一次统计量），免减均值
3. 保留逐维增益 $g$
4. 7/64/128/664M 全尺寸验证等价

## 4. 核心公式

- 如上——本质是 [[40-Concepts/范数]]（均方根缩放）+ [[40-Concepts/梯度]]（重新参数化的稳定化效应）

## 5. 与前作的关系

- 简化了 [LayerNorm（Ba et al. 2016）]：统计量减半
- 与 [BatchNorm] 谱系对比：不依赖 batch、序列模型友好（LN/RMN 一致优势）

## 6. 影响与后续

- LLaMA 系、DeepSeek、T5 系等默认归一化
- "现代 LLM 配方四件套"成员（RoPE/RMSNorm/SwiGLU/GQA-MLA）
- Pre-Norm + RMSNorm 成为深模型稳定标配组合

## 7. 读前须知

[[40-Concepts/范数]]、[[20-Algorithms/Transformer]]（归一化位置）

> 数学根基：[[批归一化]] · [[层归一化]] · [[均方根归一化]]
