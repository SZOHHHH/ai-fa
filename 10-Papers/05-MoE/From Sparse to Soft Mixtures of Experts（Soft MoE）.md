---
type: paper
title: From Sparse to Soft Mixtures of Experts
aliases: [Soft MoE]
year: 2023
authors: [Joan Puigcerver, Carlos Riquelme, Basil Mustafa, Neil Houlsby]
venue: ICLR 2023
arxiv: "2308.00951"
line: MoE
matrix_coords: [token级, 软混合, 无需(软路由)]
tags: [paper]
---

# Soft MoE

## 1. 一句话贡献

离散路由连续化——slot 机制让每个"专家输入"是全 token 的凸组合，可导、无丢弃、无抖动训练。

## 2. 核心贡献

- **Slot 定义**：$X_i = \sum_j \mathrm{softmax}_j(\frac{[XW_Q, E_i]}{\sqrt d})\, [X, D_i]$——每 slot 由全 token 加权混合而成
- **完全可微**：端到端梯度、无 top-k 离散化
- 训练吞吐与稳定双升（视觉 Transformer 验证）

## 3. 方法概要

1. 每 slot 有可学 query $E_i$ 和专家 key $D_i$
2. slot 输入 = 全 token 的 softmax 加权和
3. 每 slot 走一个专家，输出聚合
4. 总 slot 数控制计算量

## 4. 核心公式

- [[30-Formulas/MoE门控公式]] §2 Soft MoE 行（含 slot 式）

## 5. 与前作的关系

- 消除了 [[10-Papers/05-MoE/Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]] 系的离散路由痛点（不可导、丢弃、抖动）
- 形式上与 [[40-Concepts/注意力机制]] 更近（软加权），离"专家分工"更远

## 6. 影响与后续

- "MoE 与注意力同族"讨论的催化剂
- 自回归 LM 适配（slot 需因果化）为后续工作课题

## 7. 读前须知

[[30-Formulas/MoE门控公式]]、[[40-Concepts/注意力机制]]（slot 混合与注意力的亲缘）

> 近邻同族：[[Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts（无辅助损失MoE）]] · [[DeepSeek-V3 Technical Report（DeepSeek-V3）]]
