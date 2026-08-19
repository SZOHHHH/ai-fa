---
type: paper
title: Large Language Monkeys- Scaling Inference Compute with Repeated Sampling
aliases: [LL Monkeys]
year: 2024
authors: [Charlie Snell et al. (Berkeley)]
venue: ICLR 2025
arxiv: "2407.21787"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [测试时延长, 采样聚合, 算力调度]
tags: [paper]
---

# LL Monkeys

## 1. 一句话贡献

重复采样的覆盖率标度律：解的出现概率随采样数幂律增长（Libra+AdaTest 数学证明）——"测试时扩展为什么有效"的实证+理论。

## 2. 核心贡献

1. 在 SWE-bench/GSM8H 等上测 coverage@k
2. 发现不同模型/任务的指数差异巨大
3. 连 bon（best-of-n with verification）推理

## 3. 方法概要

在 SWE-bench/GSM8H 等上测 coverage@k；发现不同模型/任务的指数差异巨大；连 bon（best-of-n with verification）推理。
## 4. 核心公式


$$
\text{coverage}(k) \propto 1 - k^{-\beta}\ \text{(幂律覆盖增长)}
$$


**直觉**：→ [[Provable Scaling Laws for the Test-Time Compute of Large Language Models（PSL）]]（B16 可证版）；与 Test-Time Compute（库内）互补（采样聚合 vs 搜索分配）

## 5. 与前作/矩阵关系

覆盖曲线是测试时标度律的实证地基

## 6. 影响后续

需要：幂律直觉；coverage@k 与 pass@k 的区别

## 7. 读前须知

undefined

> 近邻同族：[[Controlled Decoding from Language Models（CD）]]

> 数学根基：[[思维链（CoT）]]
