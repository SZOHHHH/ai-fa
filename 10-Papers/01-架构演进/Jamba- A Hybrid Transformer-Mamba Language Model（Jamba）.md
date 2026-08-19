---
type: paper
title: Jamba - A Hybrid Transformer-Mamba Language Model
aliases: [Jamba]
year: 2024
authors: [Albert Gu, Tri Dao, etc. (AI21 Labs)]
venue: arXiv 2024
arxiv: "2403.19887"
line: 架构演进
matrix_coords: [混合, KV压缩, 混合状态]
tags: [paper]
---

# Jamba（混合架构）

## 1. 一句话贡献

注意力层 + Mamba 层 + MoE 按 1:7:1 比例交替——首个生产级混合架构 LLM，256k 上下文 + 3× 吞吐（同长上下文 vs Transformer）。

## 2. 核心贡献

- **混合配比**：Transformer 层（精确检索）与 Mamba 层（高效压缩）按需混编——"各取所长"的工程答案
- **MoE 集成**：稀疏专家 + 混合注意力——2024 高效架构全家桶
- 52B 总参/12B 激活；长上下文吞吐 3×

## 3. 方法概要

1. 每块 = 若干 Mamba 层 + 1 个注意力层 + MoE FFN
2. 比例消融定 1:7:1（注意力少而精）
3. RoPE + GQA 保留（注意力层）
4. 256k 上下文训练（分阶段扩展）

## 4. 核心公式

- 组件复用：[[30-Formulas/状态空间模型方程]]（Mamba 层）+ [[30-Formulas/注意力核心公式]]（注意力层）+ [[30-Formulas/MoE门控公式]]（FFN）
- 贡献在**组合配比**而非新公式

## 5. 与前作的关系

- 组合了 [[10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）]]（作者自家）与标准 Transformer/MoE 组件
- 实用主义回应"架构之争"：不选边、混着用

## 6. 影响与后续

- 混合架构成为后 Transformer 时代的务实共识（Samba/Griffin/Zamba 等跟进）
- 证明 Mamba 可大规模生产部署

## 7. 读前须知

[[30-Formulas/状态空间模型方程]]、[[30-Formulas/MoE门控公式]]、[[10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）]]
