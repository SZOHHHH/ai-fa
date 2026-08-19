---
type: paper
title: LLaMA - Open and Efficient Foundation Language Models
aliases: [LLaMA, LLaMA-1]
year: 2023
authors: [Hugo Touvron, Thibaut Lavril, Gautier Izacard, et al.]
venue: arXiv 2023
arxiv: "2302.13971"
line: 架构演进
matrix_coords: [全注意力, 缩放律, 无状态]
tags: [paper]
---

# LLaMA

## 1. 一句话贡献

把"现代 LLM 配方"（RoPE+RMSNorm+SwiGLU+AdamW 调优）用充足 token 训练并开源权重——开源生态的创世纪。

## 2. 核心贡献

- **配方定型**：Pre-Norm + RMSNorm + SwiGLU + RoPE——从此成为开源模型模板
- **Chinchilla 之后路线**：小参数 × 多 token（7B 用 1T token）——"训得久"胜"长得大"
- 7B–65B 开源，13B 媲美 GPT-3 175B

## 3. 方法概要

1. 数据：1.0–1.4T token（CommonCrawl/C代码/论文/百科清洗）
2. 架构：标准解码器 + 上述四件套
3. 优化：AdamW、cosine 衰减、梯度裁剪；2k 上下文
4. 全量训练后仅做 few-shot 评测（无 RLHF——给社区留作业）

## 4. 核心公式

- 配方组件各自成页：[[30-Formulas/RoPE旋转位置编码]]、RMSNorm（[[10-Papers/01-架构演进/Root Mean Square Layer Normalization（RMSNorm）]]）、SwiGLU（[[10-Papers/01-架构演进/GLU Variants Improve Transformer（SwiGLU）]]）
- 自回归目标 = [[30-Formulas/注意力核心公式]] 因果版

## 5. 与前作的关系

- 继承了 Chinchilla 数据配比结论（2112.11446）
- 依托 [[10-Papers/01-架构演进/Attention Is All You Need（Transformer）]] 谱系全部组件研究

## 6. 影响与后续

- LLaMA-2/3（+GQA/RLHF 版）；Alpaca/Vicuna 等微调生态爆发
- "开源权重"商业模式确立——几乎所有开放模型都是它的后代
- 其架构模板直接被 DeepSeek/Mistral/Qwen 沿用演化

## 7. 读前须知

[[20-Algorithms/Transformer]]、[[30-Formulas/RoPE旋转位置编码]]、[[10-Papers/01-架构演进/Scaling Laws for Neural Language Models（Scaling Laws）]]
