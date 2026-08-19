---
type: paper
title: Outrageously Large Neural Networks - The Sparsely-Gated Mixture-of-Experts Layer
aliases: [稀疏MoE, Sparsely-Gated MoE, Shazeer MoE]
year: 2017
authors: [Noam Shazeer, Azalia Mirhoseini, Krzysztof Maziarz, Andy Davis, et al.]
venue: ICLR 2017
arxiv: "1701.06538"
line: 后处理与压缩
matrix_coords: [token级, Top-K稀疏路由, 辅助均衡损失]  # 主坐标：MoE路由矩阵；压缩视角见 [[60-Matrices/模型压缩矩阵]]
tags: [paper]
---

# 稀疏门控 MoE 层

## 1. 一句话贡献

上千专家 + top-k 噪声门控 + 负载均衡——MoE 范式奠基，条件计算的实用化起点。

## 2. 核心贡献

- **稀疏门控公式**：$G(x)=\mathrm{softmax}(\mathrm{topk}(W_gx+\epsilon))$（[[30-Formulas/MoE门控公式]]）
- **负载均衡损失**：$f_i P_i$ 设计——防路由坍缩的标准件
- **容量/效率实证**：137B 参数 LSTM，6× 计算效率提升

## 3. 方法概要

1. 两个 MoE 层（各 4–128 专家）替换 LSTM FFN
2. 门控算 top-k（k=2–4），带噪声与 softmax
3. 辅助负载损失加权进总目标
4. 分布式专家分片训练

## 4. 核心公式

- [[30-Formulas/MoE门控公式]] —— 本文全部

## 5. 与前作的关系

- 复兴了 [Jacobs 1991 的混合专家思想]（25 年前！）——现代算力 + 噪声门控 + 均衡损失使其实用
- 为 [[10-Papers/05-MoE/GShard- Scaling Giant Models with Conditional Computation and Automatic Sharding（GShard）]] 入 Transformer 铺路

## 6. 影响与后续

- Switch/GLaM/DeepSeekMoE 全系引用此范式
- 负载均衡损失思想扩散到各类稀疏训练

## 7. 读前须知

[[20-Algorithms/混合专家（MoE）]]、[[30-Formulas/MoE门控公式]]、[[40-Concepts/softmax函数]]
