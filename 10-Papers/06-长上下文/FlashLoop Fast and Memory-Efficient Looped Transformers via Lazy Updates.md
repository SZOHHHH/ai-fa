---
type: paper
title: "FlashLoop: Fast and Memory-Efficient Looped Transformers via Lazy Updates"
aliases: []
year: 2026
authors: [Wanqi, Yang]
venue: 待核（占位层，来自 arXiv 2026-09-24）
arxiv: "2609.29812v1"
pdf: https://arxiv.org/pdf/2609.29812v1
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# FlashLoop: Fast and Memory-Efficient Looped Transformers via Lazy Updates

> **占位层卡**（daily 自动采集 2026-09-26 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Looped Transformers have attracted substantial attention as a parameter-efficient approach to increasing computational depth through repeated application of shared Transformer blocks. However, their practical advantages over conventional Transformers remain under debate: each additional loop incurs another Transformer pass and requires caching another set of KV states, causing inference FLOPs and KV-cache memory to grow continuously with loop depth. This overhead becomes particularly severe at large loop counts and long context, preventing the parameter efficiency of Looped Transformers from t

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 概念链：[[40-Concepts/KV缓存]]（环形 Transformer 的 KV 膨胀新形态——每多一环就多一整套 KV，跨环冗余压缩是缓存优化的新轴）、[[40-Concepts/注意力机制]]（惰性更新=注意力增量的稀疏化）。
- 同族：[[10-Papers/06-长上下文/SAS - Simple Attention Sparsification via End-to-End Optimization of Context Ranking（端到端稀疏注意力）|SAS]]（同属推理时稀疏化/效率工程支线；SAS 训练门控 vs FlashLoop 免训练）。
- 同族补记（261024）：[[10-Papers/06-长上下文/BeNice! Closing Looping's Inference-Memory Gap via KV-Sharing|BeNice!]]（同攻 looped 架构 KV 膨胀，走训练路线而非免训练：预训练随机深度诱导收缩残差+后训练广播末环 KV 进首环——KV-shareability 从运气变设计，命中率+31.4%/p90 TTFT −83.6%）。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
