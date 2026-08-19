---
type: paper
title: Efficient Memory Management for Large Language Model Serving with PagedAttention
aliases: [vLLM]
year: 2023
authors: [Woosuk Kwon et al. (UC Berkeley)]
venue: SOSP 2023
arxiv: "2309.06180"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [全注意力, IO感知, 无状态]
tags: [paper]
---

# vLLM

## 1. 一句话贡献

KV cache 的操作系统化：虚拟内存分页管理（PagedAttention）——KV 碎片/浪费的系统性解法，推理系统的标准底座。

## 2. 核心贡献

1. KV cache 分成固定块（页表式映射），逻辑连续物理离散
2. copy-on-write 前缀共享

## 3. 方法概要

KV cache 分成固定块（页表式映射），逻辑连续物理离散；copy-on-write 前缀共享；吞吐 2-4×。
## 4. 核心公式


$$
\text{KV} \to \text{blocks}\ \{B_i\},\ \text{logical} \to \text{physical}\ \text{页表}
$$


**直觉**：架构矩阵 IO 感知列的推理侧补位（FlashAttention=训练侧，vLLM=推理侧）；→ KV 压缩线（KIVI/KVQuant）的宿主系统

## 5. 与前作/矩阵关系

SOSP（系统顶会）——LLM 系统研究线的锚点

## 6. 影响后续

需要：OS 虚拟内存直觉；PagedAttention 与 FlashAttention 的分工（存储 vs 计算）

## 7. 读前须知

undefined

---

> 谱系枢纽：[[Attention Is All You Need（Transformer）]]（图谱连通入口）

> 近邻同族：[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]]

> 数学根基：[[KV缓存]] · [[量化]]

> 数学根基：[[注意力计算复杂度]]
