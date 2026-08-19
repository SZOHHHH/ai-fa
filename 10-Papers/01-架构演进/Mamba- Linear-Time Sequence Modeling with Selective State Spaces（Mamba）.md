---
type: paper
title: Mamba - Linear-Time Sequence Modeling with Selective State Spaces
aliases: [Mamba]
year: 2023
authors: [Albert Gu, Tri Dao]
venue: arXiv 2023 / COLM 2024
arxiv: "2312.00752"
line: 架构演进
matrix_coords: [循环/状态, IO感知, 有状态]
tags: [paper]
---

# Mamba（选择性状态空间）

## 1. 一句话贡献

让 SSM 参数随输入变化（选择性），配硬件感知算法——线性复杂度做到 Transformer 级质量，"后 Transformer"浪潮的引爆论文。

## 2. 核心贡献

- **选择性机制**：$\Delta(x), B(x), C(x)$ 依赖输入——内容寻址的记忆（[[30-Formulas/状态空间模型方程]]）
- **硬件感知算法**：parallel scan + 核融合 + 重计算，选择性递归也能 GPU 并行
- 简化 S4 结构（对角化 A）+ Mamba 块整合（SSM + 门控）

## 3. 方法概要

1. 输入经线性投影 + ShortConv 得到 $x_t$
2. $\Delta_t = \mathrm{Softplus}(W_\Delta x_t + b)$：输入决定步长（"这个 token 值得记多深"）
3. 离散化：$\bar A_t = e^{\Delta_t A}$（每步独立）
4. 递归 $h_t = \bar A_t h_{t-1} + \bar B_t x_t$（训练用并行扫描）
5. 输出 $y_t = C_t h_t$，配 SiLU 门控与残差

## 4. 核心公式

- [[30-Formulas/状态空间模型方程]] —— 定义（选择性行）
- [[40-Concepts/常微分方程（ODE）]]：离散化来源

## 5. 与前作的关系

- 改进了 S4（LTI 固定参数）：打破时不变性换来选择性，代价是失去卷积形式（并行扫描补）
- 挑战了 [[30-Formulas/注意力核心公式]] 的 $O(n^2)$ 定价（见 [[30-Formulas/注意力计算复杂度]] 对照表）

## 6. 影响与后续

- [[10-Papers/01-架构演进/Transformers are SSMs- Generalized Models and Efficient Algorithms Through Structured St（Mamba-2）]] 统一理论（SSD）
- [[Jamba- A Hybrid Transformer-Mamba Language Model（Jamba）|Jamba]]/Zamba 等混合架构实用化；Mamba-2/3 与线性注意力合流
- 视觉/基因组/音频等领域快速移植

## 7. 读前须知

- [[30-Formulas/状态空间模型方程]]、[[40-Concepts/常微分方程（ODE）]]、[[30-Formulas/注意力计算复杂度]]（动机）

> 核心公式：[[状态空间模型递归]]
