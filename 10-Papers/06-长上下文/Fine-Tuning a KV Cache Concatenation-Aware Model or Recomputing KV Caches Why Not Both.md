---
type: paper
title: Fine-Tuning a KV Cache Concatenation-Aware Model or Recomputing KV Caches? Why Not Both?
aliases: []
year: 2026
authors: [Fumihiko, Tachibana]
venue: 待核（占位层，来自 arXiv 2026-09-09）
arxiv: "2609.09768v1"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Fine-Tuning a KV Cache Concatenation-Aware Model or Recomputing KV Caches? Why Not Both?

> **占位层卡**（daily 自动采集 2026-09-12 建卡；处理段同日完成中文速览+挂链，七节精读待批次升级）。
> **方法速览（中文）**：做了什么——RAG 场景里复用预计算的 KV cache 拼接成长上下文以压首 token 延迟（TTFT），但预计算时块间无交叉注意力，输入越长质量掉得越狠（既有方法 124k 下精度持续滑坡）；本文证明**微调与选择性重算两条路线可以叠加**。怎么做的——一边按"块间无交叉注意力"假设微调模型（Block-attention 路线，把 key 偏差分布整体压左移），一边按偏差准则重算约 15% 的 KV cache（CacheBlend 路线，专砍块分隔符与 attention sink 造成的大偏差尾部），两者对 key 偏差的抑制机制不同故收益可加。效果：124k token 输入下 RULER 分数比"只重算"基线高 9.7 分，TTFT 比 full attention 降 80%（SSD 加载场景）。

## 1. 一句话贡献
RAG 长上下文 KV 复用方案："按无交叉注意力假设微调模型"与"选择性重算 15% KV cache"双管齐下，两种偏差抑制机制互补叠加，124k 输入 RULER +9.7 分且 TTFT 降 80%。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 概念/公式锚：[[40-Concepts/KV缓存]]（复用/重算的客体）· [[30-Formulas/RoPE旋转位置编码]]（位置对齐是必要非充分——调好位置仍缺交叉注意力）· [[30-Formulas/注意力核心公式]]（偏差来源=拼接 cache 缺前文 key 的交叉项）
- 同族：[[Information-Aware KV Cache Compression for Long Reasoning（InfoKV）]]（KV 管理家族另一轴：推理期压缩 vs 预计算复用）
- 现象锚：[[Efficient Streaming Language Models with Attention Sinks（StreamingLLM）]]——EPIC 等重算锚恰取块内 sink 位置，sink 现象的工程利用面；诊断面见 [[Do New Attention Mechanisms Actually Fix Attention Sinks at Million-Token Context]]

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
