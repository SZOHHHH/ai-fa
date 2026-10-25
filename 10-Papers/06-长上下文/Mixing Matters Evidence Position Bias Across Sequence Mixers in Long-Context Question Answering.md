---
type: paper
title: "Mixing Matters: Evidence Position Bias Across Sequence Mixers in Long-Context Question Answering"
aliases: []
year: 2026
authors: [Aman, Behera]
venue: 待核（占位层，来自 arXiv 2026-10-22）
arxiv: "2610.31135v1"
pdf: https://arxiv.org/pdf/2610.31135v1
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Mixing Matters: Evidence Position Bias Across Sequence Mixers in Long-Context Question Answering

> **占位层卡**（daily 自动采集 2026-10-24 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Long-context models often use answer-bearing evidence less effectively when it appears away from a prompt boundary. We compare this position bias across Transformer, state-space, and hybrid Mamba architectures by moving one gold document through a fixed set of nine distractors. The evaluated Transformers show a beginning advantage that the evaluated state-space models lack, while both families favor evidence near the end. A matched pure-versus-hybrid Mamba comparison points in the same direction but remains statistically uncertain. The family difference appears among models that can answer the

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/SSM序列架构（Mamba系）]]（家族对比一方）· [[40-Concepts/位置编码]]
- 同族：[[10-Papers/06-长上下文/The Sirens' Song When Proximal Background Context Overshadows Distant Evidence]]（同攻证据位置偏差：Sirens 诊断近端遮蔽并提出手术，本文横跨 Transformer/SSM/hybrid Mamba 三家族做系统对比——Transformer 有开头优势而 SSM 无、两族都偏爱末尾证据）
- 概念链：[[40-Concepts/注意力机制]]（开头敏感性与初始 token 注意力集中协变）· [[40-Concepts/softmax函数]]

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.31135v1；在线全文（新论文）：https://arxiv.org/html/2610.31135v1
