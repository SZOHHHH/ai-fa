---
type: paper
title: Reducing Representational Interference in Retrieval Embeddings with Trainable Prefix Tokens
aliases: []
year: 2026
authors: [Seongtae, Hong]
venue: 待核（占位层，来自 arXiv 2026-11-05）
arxiv: "2611.07298v1"
pdf: https://arxiv.org/pdf/2611.07298v1
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Reducing Representational Interference in Retrieval Embeddings with Trainable Prefix Tokens

> **占位层卡**（daily 自动采集 2026-11-07 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Embedding models compress variable-length text into fixed-size vector representations, but this compression can entangle semantic content with residual token-level information, such as artifacts arising from attention sink behavior. We propose a simple method that prepends trainable [DUMP] tokens to the input during embedding model training. The method keeps the model architecture, pooling strategy, and training loss unchanged, while optimizing the added tokens through the standard contrastive retrieval objective. By introducing trainable prefix positions that interact with regular tokens duri

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 概念链：[[40-Concepts/嵌入向量（Embedding）]]（嵌入模型的压缩瓶颈：变长文本→定长向量时非语义残信号纠缠进表征）· [[40-Concepts/注意力机制]]（attention sink：无信息位吸走巨量注意力）· [[40-Concepts/softmax函数]]（sink 现象的源头之一：softmax 强制注意力分配）。
- 公式链：[[30-Formulas/CLIP对比损失]]（[DUMP] 前缀不换目标——仍由标准对比检索目标端到端优化，只加可训练位）。
- 方法谱系：ViT register tokens（吸收高范数离群信息）的文本嵌入版；"给噪声一个专用去处"的通用手法。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.07298v1；在线全文（新论文）：https://arxiv.org/html/2611.07298v1
