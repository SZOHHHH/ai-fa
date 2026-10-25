---
type: paper
title: "RIFT: KV Cache Compression for Draft Models with Complementary Compressibility Training"
aliases: []
year: 2026
authors: [Dor, Tsur]
venue: 待核（占位层，来自 arXiv 2026-10-22）
arxiv: "2610.31098v1"
pdf: https://arxiv.org/pdf/2610.31098v1
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# RIFT: KV Cache Compression for Draft Models with Complementary Compressibility Training

> **占位层卡**（daily 自动采集 2026-10-24 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Speculative decoding is a popular decode acceleration method. As such, it is particularly relevant to long-output generation, which requires an increasingly large KV cache. KV cache compression offers a way to constrain costs in long-context drafting. However, compression methods that focus on prefill information can lose relevance as the output length grows. We term this phenomenon decode staleness and show that it degrades draft model accuracy under selection-based KV cache compression. We introduce RIFT, a family of selection-based KV cache compression strategies that balance prefill inform

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/KV缓存]]（draft 模型侧的 KV 预算管理）· [[30-Formulas/RoPE旋转位置编码]]
- 同族：[[10-Papers/06-长上下文/CompKV Compensation-Aware KV Selection for Long-Context LLM Inference]]（同族"选择式 KV 压缩"：CompKV 补偿感知选块，RIFT 加 decode staleness 诊断+解码中自适应刷新+可压缩性训练三件套）· [[10-Papers/06-长上下文/ASPIRE Asynchronous Batched Self-Speculative Decoding for Long-Context LLM Inference]]（投机解码加速同域，RIFT 专攻 draft 模型侧长输出 KV 压缩）
- 概念链：Qwen3.5-4B draft 122B，32K 输入/4K 输出/8K KV 预算下保留 >98% 全缓存接受长度

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.31098v1；在线全文（新论文）：https://arxiv.org/html/2610.31098v1
