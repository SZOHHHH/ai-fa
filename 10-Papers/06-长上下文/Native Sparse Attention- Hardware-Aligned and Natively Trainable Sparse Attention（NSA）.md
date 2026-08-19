---
type: paper
title: Native Sparse Attention - Hardware-Aligned and Natively Trainable Sparse Attention
aliases: [NSA]
year: 2025
authors: [DeepSeek (Jingyang Yuan et al.)]
venue: arXiv 2025 / ACL 2025（482+ 引用）
arxiv: "2502.11089"
pdf: 已下载
line: 长上下文
matrix_coords: [稀疏注意力, 注意力结构层, 原生训练]
tags: [paper]
---

# NSA（原生稀疏注意力）

## 1. 一句话贡献

DeepSeek 的三分支稀疏注意力（压缩+选择+滑窗），**原生端到端训练**而非事后近似——64k+ 长上下文显著加速且不掉点，稀疏注意力从"推理期 trick"升级为"训练期一等公民"。

## 2. 核心贡献

1. 三分支设计：token 压缩（粗粒度历史）、token 选择（重要块细读）、滑动窗口（局部精确）
2. **原生可训练**：稀疏模式参与梯度流，模型学会"该看哪里"，而非人为设定的固定模式
3. 硬件对齐：Triton 内核级优化，实际墙钟加速而非理论 FLOPs 加速
4. 27B 规模预训练验证（生产级证据）

## 3. 方法概要

传统稀疏注意力（Longformer/BigBird 的固定窗口）是训练后再改，模型没学过"如何在稀疏视野下工作"。NSA 让稀疏化进入训练循环：每层的注意力在压缩分支（把远距离历史池化成块摘要）、选择分支（用轻量打分器选 top 块细读）、滑窗分支（近邻全精度）之间联合训练。门控融合三分支输出。

## 4. 核心公式

$$o_t = \sum_{b \in \{\text{comp, sel, slide}\}} g_{t,b}\cdot \mathrm{Attn}_b\big(q_t, K^{(b)}, V^{(b)}\big)$$

**直觉**：像读书——近处逐字读（滑窗），远处翻目录（压缩），重点章节精读（选择）。NSA 的贡献是让"翻目录的功夫"成为训练目标的一部分，而不是考试时临时学。

## 5. 与前作关系

- ⊃ Longformer/BigBird（[[10-Papers/06-长上下文/Longformer- The Long-Document Transformer（Longformer）]]）：固定模式→可学习模式，推理期→训练期
- ≡ MoBA（[[10-Papers/06-长上下文/MoBA- Mixture of Block Attention for Long-Context LLMs（MoBA）]]）：同期平行工作（Moonshot 路线，MoE 式块路由 vs 三分支）
- → [[Gated DeltaNet-2- Decoupling Erase and Write in Linear Attention（GDN2）]] 等线性注意力路线：稀疏注意力与线性注意力在注意力=矩阵低秩/稀疏分解处汇合

## 6. 影响后续

ACL 2025 正式收录；与 MoBA 并列 2025 稀疏注意力双塔；[[60-Matrices/长上下文机制矩阵]] §3 "稀疏×原生训练"格的主占位（生产验证）。

## 7. 读前须知

- 需要：softmax 注意力的块化计算（[[30-Formulas/注意力核心公式]]）
- 易混点：NSA 的"压缩分支"≠ 有损 KV 压缩（Infini-attention 系）——压缩的是注意力输入而非 KV 存储；两条路线在"率失真"视角下才汇合
