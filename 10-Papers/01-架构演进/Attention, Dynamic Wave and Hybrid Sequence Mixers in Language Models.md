---
type: paper
title: Attention, Dynamic Wave and Hybrid Sequence Mixers in Language Models
aliases: [Dynamic Wave]
year: 2026
authors: [Dmytro, Babarytskyi]
venue: 待核（arXiv 2026-10-29）
arxiv: "2610.39854v1"
pdf: https://arxiv.org/pdf/2610.39854v1
line: 架构演进
matrix_coords: [序列混合器对比, 循环层(亚二次), 实现依赖效率]
tags: [paper]
---
# Attention, Dynamic Wave and Hybrid Sequence Mixers in Language Models（Dynamic Wave）

> 中文速览：形式化 Dynamic Wave 循环层（输入依赖的指数衰减+余弦相位调制），并与注意力做小规模系统对比：三个 10.94M 参数配置（纯 Transformer/纯 Wave/Wave-Attention 混合）在 TinyStories 上测困惑度/延迟/吞吐/峰值显存（至 4096 token）。效果：混合配置困惑度最优（5.95 vs Transformer 6.93、纯 Wave 7.26）；但效率图景由实现决定——纯 Wave 对未融合注意力省 78.7% 峰值显存（1404 vs 6602 MB），对 FlashAttention 类融合核毫无优势、训练还贵 8.3%；混合栈继承的是贵者的成本不是省者的优势。结论：循环替代层的效率声明必须相对"指名的注意力后端+指名的实现"陈述，混合只应按质量论证。

## 1. 一句话贡献

Wave 循环层 vs 注意力的小规模解剖：质量上混合最优（ppl 5.95），效率上结论取决于对手后端（对未融合注意力省 78.7% 显存、对融合核零优势）——"效率声明须指名后端"的方法论警示。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 亚二次循环替代族：[[10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）|Mamba]]（选择性 SSM 路线）· [[10-Papers/01-架构演进/A Systematic Analysis of Hybrid Linear Attention（混合线性分析）|混合线性注意力分析]]（同做 hybrid 系统对比）· [[10-Papers/01-架构演进/Jamba- A Hybrid Transformer-Mamba Language Model（Jamba）|Jamba]]（混合架构代表）；
- 概念链：[[20-Algorithms/SSM序列架构（Mamba系）]] · [[30-Formulas/注意力计算复杂度]]（"原罪"动机）· [[30-Formulas/状态空间模型递归]]。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.39854v1；在线全文（新论文）：https://arxiv.org/html/2610.39854v1

---

> 谱系枢纽：[[10-Papers/01-架构演进/A Systematic Analysis of Hybrid Linear Attention（混合线性分析）|混合线性分析]]（图谱连通入口）

> 数学根基：[[30-Formulas/注意力计算复杂度]] · [[30-Formulas/状态空间模型递归]]
