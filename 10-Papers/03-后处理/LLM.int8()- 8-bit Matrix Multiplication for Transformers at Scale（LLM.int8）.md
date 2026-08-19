---
type: paper
title: LLM.int8() - 8-bit Matrix Multiplication for Transformers at Scale
aliases: [LLM.int8, Outlier分解]
year: 2022
authors: [Tim Dettmers, Mike Lewis, Younes Belkada, Luke Zettlemoyer]
venue: NeurIPS 2022
arxiv: "2208.07339"
line: 后处理与压缩
matrix_coords: [权重, 量化, 训练后]
tags: [paper]
---

# LLM.int8()

## 1. 一句话贡献

发现大规模 Transformer 的"系统性异常值"现象——0.1% 的离群维度绑架量化精度；混合精度分治（离群列 FP16 + 常规 INT8）恢复量化可行性。

## 2. 核心贡献

- **异常值实证**：6.7B+ 模型在特定维度出现大幅离群值（ emergent，与模型规模相关）
- **分治乘法**：$Y = X_{\mathcal{O}}W_{\mathcal{O}} + \mathrm{INT8}(X_{\overline{\mathcal{O}}}W_{\overline{\mathcal{O}}})$（[[30-Formulas/量化误差与异常值]] §1 分治式）
- INT8 推理显存减半且精度无损（175B）

## 3. 方法概要

1. 检测激活离群维度（>阈值 α 的列集合 $\mathcal{O}$）
2. 该集合子矩阵走 FP16 乘法
3. 其余子矩阵分解为 INT8 向量内积累积
4. 两部分相加；分解超参 α≈6.0

## 4. 核心公式

- [[30-Formulas/量化误差与异常值]] §1

## 5. 与前作的关系

- 对比 [传统 INT8 PTQ]：找出其在大模型失效的根因（异常值）
- 后续 [[10-Papers/03-后处理/SmoothQuant- Accurate and Efficient Post-Training Quantization for Large Language Models（SmoothQuant）]] 与自家 QLoRA 都建立在本文异常值理论上

## 6. 影响与后续

- 异常值成为 LLM 量化领域的核心研究对象
- bitsandbytes 库广泛采用；QLoRA 的 NF4 双重量化承接思想

## 7. 读前须知

[[40-Concepts/量化]]、[[30-Formulas/量化误差与异常值]]
