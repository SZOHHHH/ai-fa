---
type: paper
title: Extending Context Window of Large Language Models via Positional Interpolation
aliases: [PI, Positional Interpolation]
year: 2023
authors: [Shouyuan Chen, Sherman Wong, Liangjian Chen, Yuandong Tian]
venue: arXiv 2023
arxiv: "2306.15595"
line: 长上下文
matrix_coords: [位置外推, 位置表示层, 旋转角度缩放]
tags: [paper]
---

# 位置插值 PI

## 1. 一句话贡献

把位置坐标线性压缩回训练范围（$m \to m/s$）——1000 步微调扩展 LLaMA 2k→32k，长上下文"插值时代"开端。

## 2. 核心贡献

- **PI 公式**：$\tilde m = m \cdot L_{\text{train}}/L_{\text{target}}$（[[30-Formulas/RoPE上下文扩展（PI-NTK-YaRN）]] §1）
- **核心论证**：插值比外推容易——"在训练分布**内部**重新分配位置" vs "外推到没见过的角度"
- 极少微调（1000 步）即可适配

## 3. 方法概要

1. 定缩放因子 $s = L_{\text{target}}/L_{\text{train}}$
2. RoPE 的位置输入全部除以 s
3. 长文本上微调 1000 步
4. 4k→32k/128k 外推验证

## 4. 核心公式

- [[30-Formulas/RoPE上下文扩展（PI-NTK-YaRN）]] —— 本文是其中 PI 行

## 5. 与前作的关系

- 手术对象是 [[10-Papers/01-架构演进/RoFormer- Enhanced Transformer with Rotary Position Embedding（RoPE）]]
- 被 [[10-Papers/06-长上下文/YaRN- Efficient Context Window Extension of Large Language Models（YaRN）]] 继承改进（保高频）

## 6. 影响与后续

- 所有上下文扩展方法的祖师爷；NTK/YaRN/Dynamic NTK 全部引用
- LLaMA-Long、Qwen 等长版本的技术底座之一

## 7. 读前须知

[[30-Formulas/RoPE旋转位置编码]]（先懂频率结构）、[[30-Formulas/RoPE上下文扩展（PI-NTK-YaRN）]]
