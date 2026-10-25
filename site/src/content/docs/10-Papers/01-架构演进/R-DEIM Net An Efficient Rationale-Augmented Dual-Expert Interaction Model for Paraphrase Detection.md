---
type: paper
title: "R-DEIM Net: An Efficient Rationale-Augmented Dual-Expert Interaction Model for Paraphrase Detection"
aliases: [R-DEIM Net]
year: 2026
authors: [Pushp, et al.]
venue: arXiv 2026-09
arxiv: "2609.30100v1"
pdf: https://arxiv.org/pdf/2609.30100v1
line: 架构演进
matrix_coords: [效率, 双专家, 释义检测]
tags: [paper]
---

# R-DEIM Net：轻量双专家释义检测

## 1. 一句话贡献

76M 参数双专家架构回答"中等规模模型能否在释义检测上逼近 LLM 精度同时给出人类可读理由"——交互专家管 token 级相似度、推理专家管理由生成，Quora 数据集 10 折交叉验证 90.07% 准确率，逼近 MFAE BERT（90.54%）与 LLaMA-70B 量级的表现。

## 2. 核心贡献

- **双专家分工**：Interaction Expert（多尺度 2D 卷积+注意力头捕捉 token 级相似度模式，支持变长输入）+ Reasoning Expert（Flan-T5-small 解码器生成 rationale 作辅助监督）；
- **隐状态复用**：不重编码生成的文本，而是**抽取解码器隐状态池化后作分类的互补特征**——省一次前向；
- 中等规模（76M）在精度-算力权衡曲线上卡住甜点位：与强 Transformer 基线、LLM 方案可比，预算小一个量级以上。

## 3. 方法概要

1. 双句输入，交互专家用多尺度 2D 卷积+注意力头提取 token 相似度矩阵模式（变长兼容）；
2. 推理专家（Flan-T5-small）以生成 rationale 为辅助任务训练；
3. 分类头吃"交互特征+解码器隐状态池化特征"的拼接；
4. 输出：释义判定+人类可读理由（摘要级：融合比例/损失权重待精读）。

## 4. 核心公式

双专家特征融合（示意，摘要级）：

`$$P(\text{para}\mid x_1,x_2) = \sigma\big(W\,[\,z_{int}\ ;;\ \mathrm{Pool}(h_{dec})\,] + b\big)$$`

**直觉**：一路看"两句话哪里像/哪里不像"（卷积扫相似度图），一路把"解释为什么像"的解码过程内部状态直接拿来当证据——理由不是输出完再读回来，而是生成时的中间表征顺路为分类服务（省算力+正则化双重收益）。

## 5. 与前作/矩阵关系

- 对照 Siamese-BERT 系（高效但无 rationale 透明度）与 LLM（高精度高成本）——本卡=中间态；
- ≡ 蒸馏/小模型补强叙事的另一个角落（相对 [知识蒸馏](/ai-fa/explore/40-Concepts/知识蒸馏) 的"任务内双专家"路线）；
- 概念链：[Transformer](/ai-fa/explore/20-Algorithms/Transformer)、[CNN](/ai-fa/explore/20-Algorithms/CNN)（多尺度 2D 卷积）、[注意力机制](/ai-fa/explore/40-Concepts/注意力机制)、[注意力核心公式](/ai-fa/explore/30-Formulas/注意力核心公式)。

## 6. 影响后续

"生成 rationale 的中间表征直接反哺判别任务"是可复用组件；对消费级部署（预算受限+需要可解释性）是工程参考。学术影响有限（单数据集、任务窄）。

## 7. 读前须知

[CNN](/ai-fa/explore/20-Algorithms/CNN)（多尺度卷积扫 2D 相似度图）、[注意力机制](/ai-fa/explore/40-Concepts/注意力机制)；编码器-解码器结构看 [Transformer](/ai-fa/explore/20-Algorithms/Transformer)。
