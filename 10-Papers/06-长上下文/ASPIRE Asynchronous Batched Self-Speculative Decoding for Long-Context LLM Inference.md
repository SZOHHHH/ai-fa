---
type: paper
title: "ASPIRE: Asynchronous Batched Self-Speculative Decoding for Long-Context LLM Inference"
aliases: []
year: 2026
authors: [Amir, Ziashahabi]
venue: 待核（占位层，来自 arXiv 2026-09-16）
arxiv: "2609.17943v1"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# ASPIRE: Asynchronous Batched Self-Speculative Decoding for Long-Context LLM Inference

> **占位层卡**（daily 自动采集 2026-09-19 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Long-context LLM inference is bottlenecked by attention, whose repeated KV-cache reads make decoding memory-bound. Self-speculative decoding alleviates this by drafting tokens with sparse attention and verifying them with full attention, but existing batched methods remain synchronized: all requests in a batch share a single draft-verify schedule, even though the optimal draft length varies widely across requests and changes dynamically within each request. We propose ASPIRE, a non-synchronized batched self-speculative decoding framework built on three components. First, a unified mixed forwar

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/KV缓存]]（长上下文解码 memory-bound 的根因=反复全量读 KV）· [[40-Concepts/稀疏与线性注意力]]（草稿阶段用稀疏注意力）
- 同族：↔ [[10-Papers/06-长上下文/Information-Aware KV Cache Compression for Long Reasoning（InfoKV）|InfoKV]]（同攻解码内存墙：压 KV 体积 vs 摊薄 KV 读次数——压缩轴与投机轴，260919 处理段挂链，占位层待精读）· [[10-Papers/06-长上下文/AMEND Audited Margins Enable Nonblocking Drops in GPU-PIM LLM Decoding|AMEND]]（解码系统侧近邻）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
