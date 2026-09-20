---
type: paper
title: "On-Demand Attention: Language Models Know When to Recall"
aliases: []
year: 2026
authors: [Haibo, Feng]
venue: 待核（占位层，来自 arXiv 2026-09-17）
arxiv: "2609.20734v1"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# On-Demand Attention: Language Models Know When to Recall

> **占位层卡**（daily 自动采集 2026-09-19 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Reasoning and agentic workloads increasingly demand efficient long-context inference. Yet full-attention decoding reads the growing history at every step, regardless of its benefit to the next prediction. We show that a pretrained model's decoding states already contain information predictive of this benefit, before the global read. Building on this finding, we introduce On-Demand Attention (ODA), a local-first decoding method that uses a lightweight recall head to selectively invoke global attention as its predicted benefit changes during generation. ODA trains only the recall head, leaving p

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/KV缓存]]（全局注意力=每步全量读 KV，本卡主战场）· [[40-Concepts/稀疏与线性注意力]]（local-first 解码=稀疏化家族的二值极端：每步在 local/full 间二选一）
- 同族：↔ [[10-Papers/06-长上下文/MoBA- Mixture of Block Attention for Long-Context LLMs（MoBA）|MoBA]]（学"读全局哪些块"，本卡学"要不要读全局"——收益预测的路线分岔，260919 处理段挂链，占位层待精读）· [[10-Papers/06-长上下文/Efficient Streaming Language Models with Attention Sinks（StreamingLLM）|StreamingLLM]]（local 窗+sink 即 ODA 的纯 local 极端基线）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
