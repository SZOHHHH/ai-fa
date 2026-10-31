---
type: paper
title: Nested Sparsity for Scalable Pretraining and Continual Learning
aliases: [Nestor, 嵌套稀疏]
year: 2026
authors: [Tianzhe Chu, et al.]
venue: arXiv 2026
arxiv: "2610.31818v1"
pdf: https://arxiv.org/pdf/2610.31818v1
line: 架构演进
matrix_coords: [条件计算, 注意力稀疏, 预训练/持续学习]
tags: [paper]
---
# Nested Sparsity for Scalable Pretraining and Continual Learning（Nestor）

> 261026 升级（abs 完整摘要；无 HTML 全文）。

## 1. 一句话贡献
提出 Nestor：把 MoE 式条件计算从 MLP 推广到**注意力算子**——注意力的稀疏与 MoE 的稀疏天然**嵌套（层级复合）**，同等算力同等稀疏度下预训练胜过常规 MoE Transformer，且持续预训练（长上下文适配/新域适应）更高效、遗忘更少。

## 2. 核心贡献
- 对偶泛化：MoE 稀疏源于 MLP 算子的广义化，Nestor 把同样机制广义化到注意力算子，两类稀疏层级复合。
- 等算力等稀疏度语言建模预训练优于常规 MoE；长上下文持续预训练适配更好；新域适应更快且旧域遗忘更少。
- 收益随模型规模、数据规模、上下文长度增长保持。

## 3. 方法概要
注意力算子引入与 MoE 路由同构的条件计算机制（每前向只激活稀疏子集），与 MoE 稀疏自然嵌套组合；训练即标准预训练/持续预训练流程，代码与 checkpoint 开源。

## 4. 核心公式
（摘要级速览：核心为注意力侧的条件计算/路由机制，与 MoE 路由同构嵌套；公式细节待精读补。）

## 5. 与前作/矩阵关系
- ← 泛化自：[[20-Algorithms/混合专家（MoE）]]（把 MoE 的条件计算从 MLP 推广到注意力）· [[20-Algorithms/Transformer]]（两大算子载体）
- ↔ 注意力效率线：[[30-Formulas/注意力核心公式]]（被广义化的原始算子）

## 6. 影响后续
- 条件计算范式从"MLP 专属"扩展到"全算子"的信号；持续学习友好（嵌套稀疏天然支持子网生长）是亮点。
- 代码与 checkpoint 开源，可复现性佳。

## 7. 读前须知
- [[20-Algorithms/混合专家（MoE）]] · [[30-Formulas/注意力核心公式]]；需要：条件计算、路由/负载均衡的基本概念。
