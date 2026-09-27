---
type: paper
title: "HySparse2: Hybrid Sparse Attention with Two-Level KV Sharing"
aliases: []
year: 2026
authors: [Jianyu, Wei]
venue: 待核（占位层，来自 arXiv 2026-09-22）
arxiv: "2609.26368v1"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# HySparse2: Hybrid Sparse Attention with Two-Level KV Sharing

> **占位层卡**（daily 自动采集 2026-09-26 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Long-horizon and multi-turn agents typically generate short actions and process long observations from tools and environments. This growing context demands efficient prefill, compact KV-cache storage, and accurate long-context retrieval. To meet these demands, we introduce HySparse2, a hybrid sparse attention architecture with two-level KV sharing. At the outer level, KV Bridging adopts a YOCO-style self-decoder and cross-decoder structure, but bridges only full-attention layers. The self-decoder uses hybrid sliding-window attention (SWA), while the cross-decoder uses hybrid sparse attention. 

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 概念链：[[40-Concepts/KV缓存]]（跨层共享把 KV 存储与 prefill 计算同步压缩——层维压缩新支）、[[40-Concepts/稀疏与线性注意力]]（混合注意力+token 级稀疏选择）。
- 同族：[[10-Papers/06-长上下文/RouteRelay - Event-Triggered Cross-Layer Route Reuse for Efficient Dynamic Sparse Attention（跨层路由复用）|RouteRelay]]（同跨层复用支线；RouteRelay 训练后叠加 vs HySparse2 预训练期架构化）。
- 与 E1/E2 对照：无域重叠（agent 推理工程），纯效率工程格。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
