---
type: paper
title: "BeNice! Closing Looping's Inference-Memory Gap via KV-Sharing"
aliases: []
year: 2026
authors: [Hayden, Prairie]
venue: 待核（占位层，来自 arXiv 2026-10-22）
arxiv: "2610.31633v1"
pdf: https://arxiv.org/pdf/2610.31633v1
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# BeNice! Closing Looping's Inference-Memory Gap via KV-Sharing

> **占位层卡**（daily 自动采集 2026-10-24 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Looped architectures scale quality while keeping parameter count fixed by repeatedly passing activations through the same block of layers. During inference, each recurrence generates independent KV-caches, causing memory to grow linearly. To address this challenge, prior work has proposed KV-sharing (i.e., sharing KV-caches across depth), finding that, in some cases, the KV-cache of the final recurrence can be shared with the earlier recurrences without quality loss, a property we denote as KV-shareability. However, the mechanisms underlying KV-shareability remain poorly understood, with even 

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[KV缓存](/ai-fa/explore/40-Concepts/KV缓存)（looped 架构 KV 线性膨胀新形态与跨深度共享解法——KV-shareability）· [RoPE旋转位置编码](/ai-fa/explore/30-Formulas/RoPE旋转位置编码)
- 同族：[FlashLoop: Fast and Memory-Efficient Looped Transformers via Lazy Updates](/ai-fa/explore/10-Papers/06-长上下文/FlashLoop Fast and Memory-Efficient Looped Transformers via Lazy Updates)（同攻 looped transformer 推理效率：FlashLoop 免训练惰性更新，BeNice! 两阶段训练主动诱导 KV-shareability——预训练随机深度造收缩残差+后训练把末环 KV 广播进首环）
- 概念链：[MLA多头潜在注意力](/ai-fa/explore/30-Formulas/MLA多头潜在注意力)（KV 共享与 MLA/Kimi delta attention 正交可叠加）· [量化](/ai-fa/explore/40-Concepts/量化)（与 fp8/mxfp8/nvfp4 KV 量化正交可叠加；命中率+31.4%/吞吐+23.6%/p90 TTFT −83.6%）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.31633v1；在线全文（新论文）：https://arxiv.org/html/2610.31633v1
