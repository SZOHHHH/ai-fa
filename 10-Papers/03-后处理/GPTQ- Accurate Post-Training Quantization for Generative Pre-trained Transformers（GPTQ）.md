---
type: paper
title: GPTQ - Accurate Post-Training Quantization for Generative Pre-trained Transformers
aliases: [GPTQ]
year: 2022
authors: [Elias Frantar, Saleh Ashkboos, Torsten Hoefler, Dan Alistarh]
venue: ICLR 2023
arxiv: "2210.17323"
line: 后处理与压缩
matrix_coords: [权重, 量化, 训练后]
tags: [paper]
---

# GPTQ

## 1. 一句话贡献

基于二阶信息的逐列量化+误差补偿——INT4/INT3 后训练量化首次近无损，4bit 模型普及的发动机。

## 2. 核心贡献

- **Hessian 补偿**：量化第 j 列后用其余列补偿其误差（最小化 $\|W\hat X - WX\|^2$）
- **OBQ → GPTQ**：从逐列贪心推广到批量+分块（复杂度可控）
- 校准只需少量数据（128×2048 token）

## 3. 方法概要

1. 收集校准集，算 Hessian 近似 $H = 2XX^\top$
2. 逐列量化，随后按 $-\frac{\mathrm{quant}(w_j)}{[H^{-1}]_{jj}} H^{-1}_{:,j}$ 修正未量化列
3. 分块处理（lazy update）控显存
4. 可叠加循环核（3bit 以下）

## 4. 核心公式

- 补偿式见 [[30-Formulas/量化误差与异常值]] §2 GPTQ 行

## 5. 与前作的关系

- 扩展了 [OBS/OBQ（1990s 剪枝理论）] 到 LLM 全网络量化
- 对比 RTN（朴素 round）：GPTQ 误差补偿显著降

## 6. 影响与后续

- 4bit 生态（GPTQ-for-LLaMA → AutoGPTQ）消费级部署标配
- AWQ（激活感知）同期竞品；ExLlama 等推理内核基于 GPTQ 格式

## 7. 读前须知

[[40-Concepts/量化]]、[[30-Formulas/量化误差与异常值]]、[[40-Concepts/期望]]（校准统计）
