---
type: paper
title: "UlaCache: Unified Logical Addressing for Sparse LLM Serving"
aliases: []
year: 2026
authors: [Isaac, Zhu]
venue: 待核（占位层，来自 arXiv 2026-10-21）
arxiv: "2610.29820v1"
pdf: https://arxiv.org/pdf/2610.29820v1
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# UlaCache: Unified Logical Addressing for Sparse LLM Serving

> **占位层卡**（daily 自动采集 2026-10-24 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Long contexts increase the memory cost of the key-value (KV) cache in large language model (LLM) inference. Sparse attention reduces attention computation and memory traffic by selecting historical tokens, but the retained KV cache must remain available for later decoding steps. We present UlaCache, a KV cache management system built around a unified logical address space spanning GPU KV pools and optional CPU memory. Stable logical references let the inference engine allocate and select KV independently of physical placement. Common allocation and sparse-access interfaces support data-paralle

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/KV缓存]]（统一逻辑地址空间管理）· [[40-Concepts/稀疏与线性注意力]]（稀疏注意力的服务系统落地）
- 同族：[[10-Papers/06-长上下文/MoBA- Mixture of Block Attention for Long-Context LLMs（MoBA）]]（模型侧块选择门控，UlaCache 在服务系统侧统一逻辑寻址让分配/选择独立于物理位置）· [[10-Papers/06-长上下文/Native Sparse Attention- Hardware-Aligned and Natively Trainable Sparse Attention（NSA）]]（硬件对齐稀疏注意力——UlaCache 把硬件异构性抽象进地址空间；H200 1.16×/1.70×、B300 1.73×/2.51× 峰值吞吐）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.29820v1；在线全文（新论文）：https://arxiv.org/html/2610.29820v1
