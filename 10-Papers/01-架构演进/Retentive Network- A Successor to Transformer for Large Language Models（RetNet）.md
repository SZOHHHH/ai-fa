---
type: paper
title: Retentive Network - A Successor to Transformer for Large Language Models
aliases: [RetNet]
year: 2023
authors: [Yutao Sun, Li Dong, Shaohan Huang, et al.]
venue: arXiv 2023 /TMLR 2024
arxiv: "2307.08621"
line: 架构演进
matrix_coords: [线性注意力, 位置编码, 有状态]
tags: [paper]
---

# RetNet（保留网络）

## 1. 一句话贡献

Retention 机制：同一架构同时支持并行训练/递归推理/分块推理三种形式——"Transformer 的训练效率 + RNN 的推理效率"一次全拿。

## 2. 核心贡献

- **Retention 三形式等价**：parallel（训练）/ recurrent（$O(1)$ 推理）/ chunkwise（长序列折中）
- **显式衰减**：位置项 $D_{nm} = \gamma^{n-m}$（随距离指数衰减）替代 softmax 注意力
- MSWA（多尺度衰减）分组不同时间尺度

## 3. 方法概要

1. QKV 投影后与复数位置编码（xPOS）相乘
2. 注意力权重改为固定衰减矩阵 $\gamma^{n-m}$（可学习 γ）
3. 训练用并行形式（矩阵乘）、推理切换递归形式
4. 三形式数学严格等价（同一参数）

## 4. 核心公式

- $\mathrm{Retention}(X) = \sum_{n} \gamma^{t-n}\,(Qx_n)(Kx_n)^\top Vx_n$（衰减显式）
- 与 [[30-Formulas/状态空间模型方程]]：衰减矩阵 ≈ SSM 的 $\bar A^t$——同一思想的两种记号（后被 SSD 统一）

## 5. 与前作的关系

- 与 [[10-Papers/01-架构演进/RWKV- Reinventing RNNs for the Transformer Era（RWKV）]]/[[10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）]] 并称 2023 线性三杰
- 微软系（与 GLM 同期竞赛）；理论收编于 Mamba-2 对偶

## 6. 影响与后续

- "三形式"设计模板被后续架构普遍采纳
- 未成为工业主流（Mamba/混合架构占先），但理论贡献长存

## 7. 读前须知

[[40-Concepts/注意力机制]]、[[30-Formulas/状态空间模型方程]]

> 近邻同族：[[Gated DeltaNet-2- Decoupling Erase and Write in Linear Attention（GDN2）]] · [[Parallelizing Linear Transformers with the Delta Rule over Sequence Length（DeltaNet并行）]]
