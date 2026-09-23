---
type: paper
title: Physically Partitioned KVCache Format for CPU--GPU Load Balancing in MoE Inference
aliases: []
year: 2026
authors: [Enda, Yu]
venue: 待核（占位层，来自 arXiv 2026-09-13）
arxiv: "2609.14507v1"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Physically Partitioned KVCache Format for CPU--GPU Load Balancing in MoE Inference

> **占位层卡**（daily 自动采集 2026-09-19 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Single-GPU long-context inference with Mixture-of-Experts (MoE) models requires spilling the key-value cache (KVCache) to CPU memory. The spilled KV serves two complementary purposes---transferring to the GPU for attention computation, or computing in-place on the CPU---which demand opposing physical states. The optimal split between them varies with workload, yet existing KVCache abstractions offer only storage semantics over a monolithic object of a single physical state, and cannot express dynamic load balancing. We propose InplaceKVCache, the first KVCache abstraction whose format fixes ea

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[KV缓存](/ai-fa/explore/40-Concepts/KV缓存)（本卡对象=KVCache 的物理布局抽象）· [混合专家（MoE）](/ai-fa/explore/20-Algorithms/混合专家（MoE）)
- 同族：↔ [DeepSeek-V4.1-Flash](/ai-fa/explore/10-Papers/05-MoE/DeepSeek-V4.1-Flash Pushing the Limits of KV Cache Compression)（同攻 MoE 长上下文 KV 部署：一个压 KV 体积、一个做单卡 CPU-GPU 物理布局与负载均衡——压缩轴与调度轴，260919 处理段挂链，占位层待精读）· [KVQuant](/ai-fa/explore/10-Papers/06-长上下文/KVQuant- Towards 10 Million Context Length LLM Inference with KV Cache Quantization（KVQuant）)（KV 落 CPU/极限压缩同族）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
