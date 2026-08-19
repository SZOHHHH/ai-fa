---
type: paper
title: Switch Transformers - Scaling to Trillion Parameter Models with Simple and Efficient Sparsity
aliases: [Switch Transformer]
year: 2021
authors: [William Fedus, Barret Zoph, Noam Shazeer]
venue: JMLR 2022
arxiv: "2101.03961"
line: MoE
matrix_coords: [token级, Top-K稀疏路由, 容量因子]
tags: [paper]
---

# Switch Transformer

## 1. 一句话贡献

Top-1 路由的极简化 + 稳定训练技巧（选择性精度）——MoE 从工程怪兽变成万亿参数标准配方。

## 2. 核心贡献

- **Top-1 路由**：每 token 单专家——更简单、反而更好
- **训练稳定化**：选择性 FP32（路由计算）+ 较小学习率
- **1.6T 参数**：与 T5 对照 4–7× 加速（同算力）

## 3. 方法概要

1. 每层 FFN → N 专家（4–128/2048 档）
2. 路由 = argmax（softmax 后取 top-1）
3. 容量因子 1.25，溢出 token 残差直通
4. 辅助负载损失（GShard 式）
5. 蒸馏回稠密模型（部署友好）

## 4. 核心公式

- [[30-Formulas/MoE门控公式]] §2 Switch 行

## 5. 与前作的关系

- 简化了 [[10-Papers/05-MoE/GShard- Scaling Giant Models with Conditional Computation and Automatic Sharding（GShard）]] 的 top-2 与启发式
- 作者一脉相承 [[10-Papers/03-后处理/Outrageously Large Neural Networks- The Sparsely-Gated Mixture-of-Experts Layer（稀疏MoE）]]（Shazeer）

## 6. 影响与后续

- MoE 训练配方标准化；GLaM/ST-MoE 直接继承
- "稀疏激活蒸馏回稠密"成为部署常规操作

## 7. 读前须知

[[20-Algorithms/混合专家（MoE）]]、[[30-Formulas/MoE门控公式]]、[[10-Papers/05-MoE/GShard- Scaling Giant Models with Conditional Computation and Automatic Sharding（GShard）]]
