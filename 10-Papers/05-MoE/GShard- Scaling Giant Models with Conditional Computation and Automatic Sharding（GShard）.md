---
type: paper
title: GShard - Scaling Giant Models with Conditional Computation and Automatic Sharding
aliases: [GShard]
year: 2020
authors: [Dmitry Lepikhin, HyoukJoong Lee, Yuanzhong Xu, et al.]
venue: arXiv 2020 / ICLR 2021
arxiv: "2006.16668"
line: MoE
matrix_coords: [token级, Top-K稀疏路由, 辅助均衡损失]
tags: [paper]
---

# GShard

## 1. 一句话贡献

MoE 装进 Transformer（每两层替换 FFN 为 MoE）+ 自动分片编译器——600B 参数 MoE-Transformer 的第一块基石。

## 2. 核心贡献

- **MoE Transformer 化**：Top-2 门控 + 专家容量约束
- **SPMD 分片**：GShard 编译器自动跨设备切分
- **路由启发式集合**：容量、随机路由、本地路由——工程可训练性的经验总结

## 3. 方法概要

1. 编码器/解码器隔层换 MoE（每层数百到数千专家）
2. Top-2 路由，超容量 token 丢弃或残差直通
3. 辅助损失（负载均衡 + 专家重要性）
4. XLA-SPMD 自动分片

## 4. 核心公式

- [[30-Formulas/MoE门控公式]] §2 GShard 行

## 5. 与前作的关系

- 扩展了 [[10-Papers/03-后处理/Outrageously Large Neural Networks- The Sparsely-Gated Mixture-of-Experts Layer（稀疏MoE）]] 到 Transformer 与机器翻译
- 前置于 [[10-Papers/05-MoE/Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]]（简化其启发式）

## 6. 影响与后续

- MoE 训练工程范式（容量/丢弃/辅助损失三件套）定型
- 自动并行编译思想影响 GSPMD/Megatron 等

## 7. 读前须知

[[20-Algorithms/混合专家（MoE）]]、[[30-Formulas/MoE门控公式]]、[[10-Papers/03-后处理/Outrageously Large Neural Networks- The Sparsely-Gated Mixture-of-Experts Layer（稀疏MoE）]]
