---
type: paper
title: Importance-Aware Low-Rank Distillation of Diffusion Transformers
aliases: []
year: 2026
authors: [Denis Zavadski]
venue: 待核（占位层，来自 arXiv 2026-09-04）
arxiv: "2609.04646v1"
pdf: none（待下载）
line: 架构演进
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Importance-Aware Low-Rank Distillation of Diffusion Transformers

> **占位层卡**（daily 自动采集 2026-09-07 建卡，元数据出自 arXiv API=已核实）。**待 Tier B 精读升级**：七节补全+中文名+挂全链。
> 摘要（原文）：Diffusion Transformers (DiTs) have emerged as a dominant architecture for high-quality text-to-image generation, yet their scale poses challenges for efficient deployment. While truncated singular value decomposition (SVD) is a principled tool for parameter reduction, evidence from large language models (LLMs) suggests that naive low-rank approximation can cause catastrophic failure. In contrast, we find that truncated SVD in DiTs produces smooth degradation even under substantial global compression, with redundancy distributed across projection matrices throughout the whole network rather tha
> ★ 中文速览（9/7 Tier B）：DiT 压缩：重要性感知的低秩蒸馏——不只做 SVD 截断，先按层重要性分配秩预算再低秩化+蒸馏，保住对生成质量关键的层。

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/Transformer]] · [[30-Formulas/注意力核心公式]]（占位挂链，Tier B 精化）
- 同族：[[40-Concepts/知识蒸馏]]·[[30-Formulas/蒸馏损失]]·[[40-Concepts/低秩分解]]（LoRA 同族数学）；压缩线：[[10-Papers/03-后处理/Distilling the Knowledge in a Neural Network（KD）|KD]]

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：none（待下载）（全通道下载失败，Tier B 补档）
