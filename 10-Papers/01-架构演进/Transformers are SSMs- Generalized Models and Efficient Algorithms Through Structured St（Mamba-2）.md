---
type: paper
title: Transformers are SSMs - Generalized Models and Efficient Algorithms Through Structured State Space Duality
aliases: [Mamba-2, SSD]
year: 2024
authors: [Tri Dao, Albert Gu]
venue: ICML 2024
arxiv: "2405.21060"
line: 架构演进
matrix_coords: [循环/状态, IO感知, 有状态]
tags: [paper]
---

# Mamba-2（SSD 状态空间对偶）

## 1. 一句话贡献

证明注意力与 SSM 同属"半可分矩阵"族的两个端点——架构之争统一在一个矩阵族下，Mamba-2 训练速度再升 2–8×。

## 2. 核心贡献

- **SSD 对偶理论**：SSM 序列算子 = 半可分矩阵；注意力是其二次子块形式——两大架构的统一数学（[[30-Formulas/状态空间模型方程]] 对偶行）
- **Mamba-2 简化**：标量×恒等结构替代对角 A（与注意力张量形状对齐）
- 块分解算法：块内（对角，递归）+ 块间（低秩，注意力式矩阵乘）混合计算

## 3. 方法概要

1. 理论：把 SSM 写成"半可分核矩阵 × 输入"，显示其与注意力的对偶
2. 架构：A 简化为标量乘单位阵（丢部分表达换吞吐）
3. 算法：序列分块——块内用 SSM 递归、块间用二次注意力形式——两头占优
4. 硬件：对齐张量核心（8×A100 上比 Mamba-1 快 50%、比 Mamba-1 训练快 2–8×）

## 4. 核心公式

- [[30-Formulas/状态空间模型方程]]（SSD 对偶行）
- [[30-Formulas/注意力核心公式]]（对偶的另一半）

## 5. 与前作的关系

- 统一了 [[10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）]]（作者自家）与注意力谱系
- 依托 [线性注意力（Katharopoulos 2020）] 的矩阵形式视角

## 6. 影响与后续

- "架构统一"叙事的标志：此后论文常以"半可分/线性注意力家族"自述
- Mamba-3（2026）等继续沿此理论线扩展
- [[Jamba- A Hybrid Transformer-Mamba Language Model（Jamba）|Jamba]] 类混合架构获得理论支撑（两种块本来就同族）

## 7. 读前须知

- [[30-Formulas/状态空间模型方程]]、[[30-Formulas/注意力核心公式]]、[[10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）]]
