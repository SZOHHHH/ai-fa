---
type: paper
title: SmoothQuant - Accurate and Efficient Post-Training Quantization for Large Language Models
aliases: [SmoothQuant]
year: 2022
authors: [Guangxuan Xiao, Ji Lin, Nickolaz Seznec, et al.]
venue: ICML 2023
arxiv: "2211.10438"
line: 后处理与压缩
matrix_coords: [权重, 量化, 训练后]
tags: [paper]
---

# SmoothQuant

## 1. 一句话贡献

把激活的量化难度等价转移到权重侧——W8A8 全量化（权重激活都 INT8）近无损，解决激活离群值痛点。

## 2. 核心贡献

- **等效缩放不变性**：$Y = (X s^{-1})(sW)$——数学恒等，数值上各取所长
- **迁移强度 α**：$s_j = \max|X_{:,j}|^\alpha / \max|W_{:,j}|^{1-\alpha}$（α=0.5 平衡）
- 相比 LLM.int8：**无需混精度分支**（硬件友好、kernel 简单）

## 3. 方法概要

1. 校准集统计每输入通道 $\max|X|$ 与权重每输出通道 $\max|W|$
2. 按公式算缩放向量 s，等效缩放两矩阵
3. 分别 INT8 量化（对称 per-channel / per-tensor）
4. 反量化相乘恢复

## 4. 核心公式

- [[30-Formulas/量化误差与异常值]] §1 SmoothQuant 式

## 5. 与前作的关系

- 改进了 [[10-Papers/03-后处理/LLM.int8()- 8-bit Matrix Multiplication for Transformers at Scale（LLM.int8）]]：分治（双路径）→ 转移（单路径）
- 同样基于其异常值发现（哲学不同：搬迁 vs 分离）

## 6. 影响与后续

- W8A8 成为服务端标配之一（TensorRT-LLM 集成）
- "数学恒等变形解决工程问题"的教学案例（[[40-Concepts/概率分布]] 家族之外的恒等式思想）

## 7. 读前须知

[[40-Concepts/量化]]、[[30-Formulas/量化误差与异常值]]、[[10-Papers/03-后处理/LLM.int8()- 8-bit Matrix Multiplication for Transformers at Scale（LLM.int8）]]
