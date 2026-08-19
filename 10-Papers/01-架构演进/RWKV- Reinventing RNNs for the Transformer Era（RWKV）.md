---
type: paper
title: RWKV - Reinventing RNNs for the Transformer Era
aliases: [RWKV]
year: 2023
authors: [Bo Peng, Eric Alcaide, Xiaohan Qu, et al.]
venue: EMNLP 2023
arxiv: "2305.13048"
line: 架构演进
matrix_coords: [循环/状态, 位置编码, 有状态]
tags: [paper]
---

# RWKV

## 1. 一句话贡献

把注意力改写成线性时间递归形式（WKV 机制）——Transformer 可并行训练 + RNN 恒定推理显存，与 Mamba 同期的线性化路线。

## 2. 核心贡献

- **WKV 机制**：可学习的 token 移动/衰减（time-decay），无二次注意力矩阵
- **双形式**：训练并行式（类注意力）+ 推理递归式（类 RNN）——一套参数两副面孔
- 开源社区驱动（非大厂）的百万级模型

## 3. 方法概要

1. 时间衰减向量 $w$ 控制历史遗忘速度
2. 并行形式训练（类似注意力的核计算）
3. 推理时展开为 $O(1)$ 状态递归
4. token 移位（token shift）融合局部上下文

## 4. 核心公式

- WKV 递归：$wkv_t = \frac{\sum_i e^{-(t-1-i)w + k_i} v_i + e^{u+k_t}v_t}{\sum_i e^{-(t-1-i)w + k_i} + e^{u+k_t}}$——指数加权移动平均的向量化
- 与 [[30-Formulas/状态空间模型方程]] 同属"线性时间序列算子"家族（形式不同）

## 5. 与前作的关系

- 与 [[10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）]] 同期平行：SSM 视角 vs 注意力改写视角
- 两者都被 [[10-Papers/01-架构演进/Transformers are SSMs- Generalized Models and Efficient Algorithms Through Structured St（Mamba-2）]] 的对偶理论收编进统一家族

## 6. 影响与后续

- RWKV-4/5/6 持续社区迭代（OpenBMB/BlinkDL）
- "训练并行/推理递归"双形式成为线性架构标配设计

## 7. 读前须知

[[40-Concepts/注意力机制]]、[[30-Formulas/状态空间模型方程]]、[[10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）]]
