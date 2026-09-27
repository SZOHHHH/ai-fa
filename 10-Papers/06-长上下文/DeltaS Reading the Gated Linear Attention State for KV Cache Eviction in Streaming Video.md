---
type: paper
title: "DeltaS: Reading the Gated Linear Attention State for KV Cache Eviction in Streaming Video"
aliases: []
year: 2026
authors: [Taeyoun, Kwon]
venue: 待核（占位层，来自 arXiv 2026-09-23）
arxiv: "2609.27470v1"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# DeltaS: Reading the Gated Linear Attention State for KV Cache Eviction in Streaming Video

> **占位层卡**（daily 自动采集 2026-09-26 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Recent video-language models increasingly adopt hybrid architectures that interleave linear and full attention layers for efficient long-context processing. While the recurrent state of linear attention remains fixed in size, the KV cache of full attention continues to grow with the video stream, making eviction necessary under a bounded memory budget. The key challenge in streaming is that eviction must occur before the question arrives, so what to retain has to be decided without the question. Existing eviction methods derive token scores from the KV cache itself, using position, attention, 

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 概念链：[[40-Concepts/稀疏与线性注意力]]（核心机制在 gated-delta 线性注意力的循环状态更新——只写入"新输入减去状态可检索部分"的残差）、[[40-Concepts/KV缓存]]（混合骨干中全注意力层的流式驱逐）。
- 同族：[[10-Papers/06-长上下文/Video-HolmesV2 Can MLLMs Reason with Spatio-Temporal Audio-Visual Evidence in Long Videos|Video-HolmesV2]]（长视频多模态推理，06 线邻居）。
- 与 E1/E2 对照：无域重叠（流式视频理解工程），"两种记忆协同"思想可作库内参照。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
