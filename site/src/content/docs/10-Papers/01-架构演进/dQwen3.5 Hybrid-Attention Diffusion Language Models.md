---
type: paper
title: "dQwen3.5: Hybrid-Attention Diffusion Language Models"
aliases: []
year: 2026
authors: [Anton, Xue]
venue: 待核（占位层，来自 arXiv 2026-09-17）
arxiv: "2609.20751v1"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# dQwen3.5: Hybrid-Attention Diffusion Language Models

> **占位层卡**（daily 自动采集 2026-09-21 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Adapting a pretrained autoregressive (AR) model is a cost-efficient route to a diffusion language model (DLM). While nearly all such adaptations start from a full-attention transformer, AR modeling has shifted toward hybrid architectures that interleave attention and RNN layers. This creates an obstacle for adaptation: unlike attention, RNNs are structurally causal and nontrivial to bidirectionalize. Despite this mismatch, we investigate whether such backbones can become effective DLMs by adapting Qwen3.5 at 0.8B, 2B, 4B, and 9B scales, yielding the dQwen3.5 family. We find that hybrid backbon

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[Transformer](/ai-fa/explore/20-Algorithms/Transformer) · [注意力核心公式](/ai-fa/explore/30-Formulas/注意力核心公式)
- 同族：[混合线性分析](/ai-fa/explore/10-Papers/01-架构演进/A Systematic Analysis of Hybrid Linear Attention（混合线性分析）)（混合注意力-线性/RNN 骨干的系统分析谱系） · [Jamba](/ai-fa/explore/10-Papers/01-架构演进/Jamba- A Hybrid Transformer-Mamba Language Model（Jamba）)（注意力+SSM 混合先行者——本文换成注意力+RNN 且反向用于双向化）
- 概念链：[稀疏与线性注意力](/ai-fa/explore/40-Concepts/稀疏与线性注意力)（混合架构线性侧的语境） · [马尔可夫链](/ai-fa/explore/40-Concepts/马尔可夫链)（RNN 层=隐状态马尔夫递归，双向化难点所在）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
