---
type: paper
title: Efficient Streaming Language Models with Attention Sinks
aliases: [StreamingLLM, Attention Sink]
year: 2023
authors: [Guangxuan Xiao, Yuandong Tian, Beidi Chen, Song Han, Mike Lewis]
venue: ICLR 2024
arxiv: "2309.17453"
line: 长上下文
matrix_coords: [系统/流式, 注意力结构层, 注意力汇]
tags: [paper]
---

# StreamingLLM（Attention Sink）

## 1. 一句话贡献

发现 LLM 把海量注意力倾泻在开头几个 token（"注意力水槽"）——保留 sink + 滑动窗口即可无限流式生成，无需重训练。

## 2. 核心贡献

- **attention sink 现象**：初始 token 无信息却吸走巨量注意力——模型把它们当"注意力泄压阀"（softmax 必须归一，总要有地方倾倒）
- **流式方案**：cache = 前 4 个 sink token + 最近窗口——长度无限外推、吞吐恒定
- 反直觉结论：**滑窗直接滑动会崩**（删了 sink），补上 sink 就稳

## 3. 方法概要

1. 观察：perplexity 随滑窗位置突变（越过前几个 token 时爆炸）
2. 归因：softmax 归一性迫使"多余注意力"找个归宿——初始 token 被选为泄压阀
3. 方案：位置编码照常局部化（窗口内相对），cache 常驻 sink
4. 4M+ token 流式推理稳定

## 4. 核心公式

- [[40-Concepts/稀疏与线性注意力]] 保留/压缩家族行

## 5. 与前作的关系

- 与 [[10-Papers/06-长上下文/Longformer- The Long-Document Transformer（Longformer）]] 的 global token 呼应（但 Longformer 是设计、Sink 是发现）
- 修正了朴素滑窗（如 [Mistral 滑窗]）的隐含缺陷

## 6. 影响与后续

- 流式/边缘部署标配技巧；KV 驱逐策略（H2O 等）研究由此展开
- "softmax 必须有 sink"的理解进入架构设计（SoftMax-off-one 等变体）

## 7. 读前须知

[[30-Formulas/注意力核心公式]]、[[40-Concepts/softmax函数]]（归一性是根源）、[[40-Concepts/KV缓存]]
