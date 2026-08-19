---
type: paper
title: AWQ - Activation-aware Weight Quantization for LLM Compression and Acceleration
aliases: [AWQ]
year: 2023
authors: [Ji Lin, Jianyu Tang, Haotian Tang, et al.]
venue: MLSys 2024
arxiv: "2306.00978"
line: 后处理与压缩
matrix_coords: [激活, 量化, 训练后]
tags: [paper]
---

# AWQ（激活感知量化）

## 1. 一句话贡献

发现"1% 的显著权重通道"决定量化精度——按激活分布逐通道保护这些权重（等效缩放），W4A16 近无损且免混合精度。

## 2. 核心贡献

- **显著通道识别**：激活幅度大的通道对应的权重通道对误差敏感
- **逐通道缩放**：$W' = W \cdot s$（$X' = X/s$ 等效）——显著通道获得更大有效量化范围
- 无需反向传播/重构（对比 GPTQ 的二阶优化）——极快校准

## 3. 方法概要

1. 校准集前向，统计每输入通道激活幅度
2. 取 top-1% 为显著通道，按 $\alpha$ 衰减搜索最优缩放 $s$
3. 等效缩放后 RTN 量化（grid 上均匀取整）
4. 反量化计算时还原

## 4. 核心公式

- 缩放等效式同 [[30-Formulas/量化误差与异常值]] §1 SmoothQuant——**同数学、异方向**：Smooth 搬激活难度到权重（W8A8），AWQ 只保护权重（W4A16）
- 误差分析：$\mathrm{Err}(s) = \|Q(W\cdot s)\cdot s^{-1} - W\|$ 的 s 搜索

## 5. 与前作的关系

- 建立在 [[10-Papers/03-后处理/LLM.int8()- 8-bit Matrix Multiplication for Transformers at Scale（LLM.int8）]] 异常值理论上（换保护策略）
- 与 [[10-Papers/03-后处理/GPTQ- Accurate Post-Training Quantization for Generative Pre-trained Transformers（GPTQ）]] 并列 PTQ 双雄（GPTQ 重补偿、AWQ 轻等效）

## 6. 影响与后续

- W4 推理生态双格式之一（GPTQ/AWQ）；vLLM/TGI 原生支持
- "激活统计指导权重处理"成为量化标配思路

## 7. 读前须知

[[40-Concepts/量化]]、[[30-Formulas/量化误差与异常值]]、[[10-Papers/03-后处理/GPTQ- Accurate Post-Training Quantization for Generative Pre-trained Transformers（GPTQ）]]

> 近邻同族：[[A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning（DAGGER）]] · [[A Simple and Effective Pruning Approach for Large Language Models（SparseGPT）]]
