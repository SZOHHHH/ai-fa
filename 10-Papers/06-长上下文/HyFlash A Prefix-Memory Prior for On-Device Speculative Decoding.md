---
type: paper
title: "HyFlash: A Prefix-Memory Prior for On-Device Speculative Decoding"
aliases: []
year: 2026
authors: [Jongwoo, Ko]
venue: 待核（占位层，来自 arXiv 2026-11-05）
arxiv: "2611.07263v1"
pdf: https://arxiv.org/pdf/2611.07263v1
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# HyFlash: A Prefix-Memory Prior for On-Device Speculative Decoding

> **占位层卡**（daily 自动采集 2026-11-07 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Parallel block drafting accelerates speculative decoding by predicting multiple future positions in a single backbone pass, but on-device deployment constrains both drafter capacity and context storage. Under tight memory budgets, drafters must model long-range dependencies and fine-grained draft-position interactions without the growing KV-cache overhead of full-context attention. We propose HyFlash, a compact parallel drafter that introduces a prefix-memory prior to separate long-range context modeling from fine-grained draft-position interactions with limited capacity. Local attention captu

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 概念链：[[40-Concepts/KV缓存]]（核心约束：端侧预算下 draft 侧全量 KV 不可承受——有界记忆=定长状态替代增长缓存）· [[40-Concepts/稀疏与线性注意力]]（局部注意力+循环记忆=稀疏化的记忆侧变体）· [[20-Algorithms/SSM序列架构（Mamba系）]]/[[30-Formulas/状态空间模型递归]]（循环状态压缩历史与 SSM 同构归纳偏置，但状态由已提交的目标特征驱动、只读共享）。
- 同族：LongSpec/MASW/H-Spec/ReaDy（draft 侧记忆受限投机解码家族，本文=前缀记忆先验路线）。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.07263v1；在线全文（新论文）：https://arxiv.org/html/2611.07263v1
