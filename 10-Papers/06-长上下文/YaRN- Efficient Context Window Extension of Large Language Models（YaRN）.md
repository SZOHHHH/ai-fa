---
type: paper
title: YaRN - Efficient Context Window Extension of Large Language Models
aliases: [YaRN]
year: 2023
authors: [Bowen Peng, Jeffrey Quesnelle, Honglu Fan, et al.]
venue: arXiv 2023
arxiv: "2309.00071"
line: 长上下文
matrix_coords: [位置外推, 位置表示层, 旋转角度缩放]
tags: [paper]
---

# YaRN

## 1. 一句话贡献

NTK-aware 插值 + 注意力温度修正 + 渐进外推——RoPE 扩展方法的集大成者，微调量比 PI 再降（400 步、8× 扩展）。

## 2. 核心贡献

- **频率谱视角**：高频通道管局部、低频通道管全局——**只外推低频、保留高频**（NTK 思想的理论化）
- **温度因子**：$t = 0.1\ln s + 1$，softmax logits 除以 t——补偿长上下文的注意力熵漂移
- **$\beta$-渐进调度**：训练中缩放因子从 1 渐增到 s

## 3. 方法概要

1. 波长分组：按 RoPE 频率分量分"插值区/外推区"
2. 分区应用不同缩放（hypothesis：短波长插值损局部、长波长可安全外推）
3. softmax 温度 t 修正
4. 渐进调度微调 400 步达 128k

## 4. 核心公式

- [[30-Formulas/RoPE上下文扩展（PI-NTK-YaRN）]] —— YaRN 行（温度与调度）

## 5. 与前作的关系

- 统一并改进了 [[10-Papers/06-长上下文/Extending Context Window of Large Language Models via Positional Interpolation（PI）]]（均匀压缩伤高频）与社区 NTK-RoPE（无温度）
- 温度修正呼应 [[40-Concepts/温度参数]] 三用途辨析

## 6. 影响与后续

- 事实标准之一（vLLM 等推理框架内置）；Qwen/DeepSeek 长上下文引用
- "频率谱手术"成为 RoPE 扩展的通用语言

## 7. 读前须知

[[30-Formulas/RoPE旋转位置编码]]、[[30-Formulas/RoPE上下文扩展（PI-NTK-YaRN）]]、[[10-Papers/06-长上下文/Extending Context Window of Large Language Models via Positional Interpolation（PI）]]
