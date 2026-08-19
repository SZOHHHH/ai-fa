---
type: paper
title: RoFormer - Enhanced Transformer with Rotary Position Embedding
aliases: [RoPE, RoFormer]
year: 2021
authors: [Jianlin Su, Yu Lu, Shengfeng Pan, Ahmed Murtadha, Bo Wen, Yunfeng Liu]
venue: arXiv 2021 / Neurocomputing 2024
arxiv: "2104.09864"
line: 架构演进
matrix_coords: [全注意力, 位置编码, 无状态]
tags: [paper]
---

# RoFormer（RoPE 旋转位置编码）

## 1. 一句话贡献

用二维旋转编码绝对位置、内积自动呈现相对性——现代 LLM 事实标准的位置方案。

## 2. 核心贡献

- **RoPE 公式**：$\tilde q_m = R_m q,\ \tilde k_n = R_n k$，$\langle \tilde q_m, \tilde k_n\rangle$ 只依赖 $n-m$（[[30-Formulas/RoPE旋转位置编码]]）
- **相对位置融入注意力打分**：不增参数、不破坏注意力形式
- 与正弦编码的谱系关系：同为"多频率基"，但以乘性旋转作用于 Q/K

## 3. 方法概要

1. 嵌入维度按相邻两两分组（$d/2$ 个平面）
2. 每组分配频率 $\theta_i = 10000^{-2i/d}$
3. 每层注意力的 Q/K 在打分前乘位置旋转 $R_m / R_n$
4. V 不旋转；训练照常

## 4. 核心公式

- [[30-Formulas/RoPE旋转位置编码]] —— 本文灵魂（含旋转矩阵与恒等式）

## 5. 与前作的关系

- 改进了 [正弦绝对编码]（[[10-Papers/01-架构演进/Attention Is All You Need（Transformer）]]）与 [T5 相对偏置]：更优雅的相对性实现
- 理论上连通 [复数域注意力]（RoPE = 复数乘 $e^{im\theta}$）

## 6. 影响与后续

- LLaMA/Qwen/DeepSeek/GPT-NeoX 全系默认
- 线 6 的手术对象：PI/NTK/YaRN 全在调 RoPE 的 base（B5 批回填）
- 生成侧：Flux/SD3 等 [[Scalable Diffusion Models with Transformers（DiT）|DiT]] 也用类似旋转思路处理时间步外的位置

## 7. 读前须知

[[40-Concepts/位置编码]]、[[40-Concepts/内积]]（旋转不变性）、[[30-Formulas/注意力核心公式]]
