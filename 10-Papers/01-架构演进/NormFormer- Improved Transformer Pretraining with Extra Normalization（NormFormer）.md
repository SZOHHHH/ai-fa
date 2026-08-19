---
type: paper
title: NormFormer- Improved Transformer Pretraining with Extra Normalization
aliases: [NormFormer]
year: 2021
authors: [Shleifer et al. (Meta)]
venue: arXiv 2021
arxiv: "2110.09456"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: [全注意力, 归一化/激活, 无状态]
tags: [paper]
---

# NormFormer

## 1. 一句话贡献

注意力输出层补 LN2：修复预训练早期的注意力熵塌缩——归一化谱系的补丁式发现。

## 2. 核心贡献

1. attention 后的第二个 LN（pL2 与 pL1 双损失调温）

## 3. 方法概要

attention 后的第二个 LN（pL2 与 pL1 双损失调温）；提升小模型收敛。
## 4. 核心公式


$$
\mathrm{attn_{out}} = \mathrm{LN}_2\big(\mathrm{attn_{out}}\big)\ \text{(额外归一化)}
$$


**直觉**：← [[Layer Normalization（LayerNorm）]]（本批入库）；→ [[Root Mean Square Layer Normalization（RMSNorm）]]；架构矩阵归一化列的中间节点

## 5. 与前作/矩阵关系

预训练稳定性微调的代表作；"位置归一化也是设计变量"的证据

## 6. 影响后续

需要：注意力熵塌缩现象

## 7. 读前须知

undefined

> 近邻同族：[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] · [[Attention Is All You Need（Transformer）]]

> 数学根基：[[批归一化]] · [[层归一化]] · [[均方根归一化]]
