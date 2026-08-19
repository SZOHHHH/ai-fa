---
type: paper
title: QLoRA - Efficient Finetuning of Quantized LLMs
aliases: [QLoRA]
year: 2023
authors: [Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer]
venue: NeurIPS 2023
arxiv: "2305.14314"
line: 后处理与压缩
matrix_coords: [适配参数, 量化, 微调期]
tags: [paper]
---

# QLoRA

## 1. 一句话贡献

4 位量化基座 + LoRA 旁路微调——65B 模型单卡 48GB 微调成为可能，"人人微调大模型"时代开启。

## 2. 核心贡献

- **NF4**：正态权重的分位数最优 4 位格式（[[30-Formulas/量化误差与异常值]] NF4 行）
- **双重量化**：量化常数本身再量化（省 ~0.37 bit/参数）
- **分页优化器**：显存峰值平滑（NVIDIA 统一内存）
- 证明"量化底座微调 ≈ 全精度微调"

## 3. 方法概要

1. 基座权重 NF4 存储（冻结）
2. 计算 时动态反量化到 BF16
3. LoRA 参数保持 BF16 训练
4. Guanaco 模型族：33B 单卡 24h 达 ChatGPT 99.3%（作者宣称口径）

## 4. 核心公式

- [[30-Formulas/LoRA分解]] + [[30-Formulas/量化误差与异常值]]（NF4）组合

## 5. 与前作的关系

- 组合了 [[10-Papers/03-后处理/LoRA- Low-Rank Adaptation of Large Language Models（LoRA）]] 与其作者自家 [[10-Papers/03-后处理/LLM.int8()- 8-bit Matrix Multiplication for Transformers at Scale（LLM.int8）]] 的异常值理论（NF4 双重量化处理）

## 6. 影响与后续

- 消费级微调生态爆发（colab 微调 13B）
- NF4 成为 4bit 事实格式之一；GGUF 等部署格式吸收思想
- "bitsandbytes" 库成为量化基础设施

## 7. 读前须知

[[30-Formulas/LoRA分解]]、[[40-Concepts/量化]]、[[10-Papers/03-后处理/LLM.int8()- 8-bit Matrix Multiplication for Transformers at Scale（LLM.int8）]]

> 近邻同族：[[LoRA- Low-Rank Adaptation of Large Language Models（LoRA）]] · [[Parameter-Efficient Transfer Learning for NLP（Adapter）]]
