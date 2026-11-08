---
type: paper
title: "ConvPE: Convolutional Position Embedding Improves Transformers"
aliases: []
year: 2026
authors: [Zehao, Wang]
venue: 待核（占位层，来自 arXiv 2026-11-05）
arxiv: "2611.07749v1"
pdf: https://arxiv.org/pdf/2611.07749v1
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# ConvPE: Convolutional Position Embedding Improves Transformers

> **占位层卡**（daily 自动采集 2026-11-07 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：ConvPE (Convolutional Position Embedding) improves both the performance and efficiency of Transformer models in language modeling, long-context extension, and vision. It injects a windowed, content-dependent bias into attention scores through a lightweight causal convolution over a low-dimensional projection of the hidden states. As a lightweight plug-in, ConvPE is compatible with RoPE, attention masks, and KV concatenation. It also supports high-dimensional position embeddings via high-dimensional convolutions. In a reproduction, ConvPE outperforms five 1D baselines and eight 2D baselines. Th

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 公式链：[[30-Formulas/RoPE旋转位置编码]]（直接基线与兼容对象——ConvPE 作为插件与 RoPE 叠加而非取代）· [[30-Formulas/RoPE上下文扩展（PI-NTK-YaRN）]]（长上下文外推的另两条路：改频率/插值 vs 本文加窗口化内容偏置）。
- 概念链：[[40-Concepts/位置编码]]（位置信息注入三路线——加性/旋转/打分偏置——本文属第三路线的局部生成式变体）· [[40-Concepts/KV缓存]]（兼容 KV 拼接=插件性约束之一）。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.07749v1；在线全文（新论文）：https://arxiv.org/html/2611.07749v1
