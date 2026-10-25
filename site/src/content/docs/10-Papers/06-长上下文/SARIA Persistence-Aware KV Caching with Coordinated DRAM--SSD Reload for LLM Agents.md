---
type: paper
title: "SARIA: Persistence-Aware KV Caching with Coordinated DRAM--SSD Reload for LLM Agents"
aliases: []
year: 2026
authors: [Hui, Li]
venue: 待核（占位层，来自 arXiv 2026-10-22）
arxiv: "2610.31169v1"
pdf: https://arxiv.org/pdf/2610.31169v1
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# SARIA: Persistence-Aware KV Caching with Coordinated DRAM--SSD Reload for LLM Agents

> **占位层卡**（daily 自动采集 2026-10-24 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Multi-turn LLM agents usually reuse long context prefixes, making key value (KV) caching crucial for reducing prefill latency. SSDs provide a low-cost extension to limited DRAM capacity but introduce two key challenges. Eagerly persisting all KV cache blocks incurs substantial write traffic and rapidly consumes finite SSD endurance. Meanwhile, the small number of SSDs provisioned in typical GPU servers limits aggregate reload bandwidth, making SSD-resident KV cache much slower to retrieve than that in DRAM and inflating prefill latency. We present \textsc{Saria} (Selective Admission and Reload

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[KV缓存](/ai-fa/explore/40-Concepts/KV缓存) · [RoPE旋转位置编码](/ai-fa/explore/30-Formulas/RoPE旋转位置编码)
- 同族：↔ [Physically Partitioned KVCache Format for CPU--GPU Load Balancing in MoE Inference](/ai-fa/explore/10-Papers/06-长上下文/Physically Partitioned KVCache Format for CPU--GPU Load Balancing in MoE Inference)（同攻 KV 跨存储层级布局：物理分区做 CPU-GPU 负载均衡，SARIA 再下探 SSD 层做选择性准入+协调重载）· [KVQuant- Towards 10 Million Context Length LLM Inference with KV Cache Quantization](/ai-fa/explore/10-Papers/06-长上下文/KVQuant- Towards 10 Million Context Length LLM Inference with KV Cache Quantization（KVQuant）)（KV 落 CPU/极限压缩同族）
- 概念链：会话级时间局部性（多轮 agent 前缀复用）是准入/提升两路径的统一信号；SSD 写 −57.1~58.9%、TTFT −42.3~79.7%（vs 纯 DRAM）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.31169v1；在线全文（新论文）：https://arxiv.org/html/2610.31169v1
