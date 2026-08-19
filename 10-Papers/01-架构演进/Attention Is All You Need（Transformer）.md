---
type: paper
title: Attention Is All You Need
aliases: [Transformer, Attention Is All You Need]
year: 2017
authors: [Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin]
venue: NeurIPS 2017
arxiv: "1706.03762"
line: 架构演进
matrix_coords: [全注意力, IO感知, 无状态]
tags: [paper]
---

# Attention Is All You Need（Transformer）

## 1. 一句话贡献

抛弃循环与卷积，纯注意力堆叠出可全并行训练的序列架构——整个大模型时代的地基。

## 2. 核心贡献

- **缩放点积注意力 + 多头**：可微寻址机制（[[30-Formulas/注意力核心公式]]）
- **编码器-解码器全注意力化**：训练并行度碾压 RNN（GPU 时代宠儿）
- **正弦位置编码**：注意力失忆问题的第一个解（[[40-Concepts/位置编码]]）

## 3. 方法概要

1. 输入：token 嵌入 + 位置编码相加
2. 编码器 6 层：每层 = 多头自注意力 + FFN（ReLU），各配 LayerNorm 与残差
3. 解码器 6 层：多一层带因果掩码的 cross-attention（Q 来自解码器、K/V 来自编码器）
4. 输出层 softmax 出词表分布
5. 训练：label smoothing + 学习率 warmup

## 4. 核心公式

- [[30-Formulas/注意力核心公式]] —— 本文灵魂
- [[30-Formulas/残差连接]]、[[40-Concepts/位置编码]]（正弦版）

## 5. 与前作的关系

- 改进了 [Seq2Seq + Bahdanau 注意力]：注意力从"配角外挂"变"唯一主角"——RNN 彻底退役
- 简化了 [GNMT 等深层 RNN 系统]：更少训练步、更高 BLEU

## 6. 影响与后续

- 奠基了 BERT/GPT 两大预训练流派（本线下游全部论文）
- [[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）|ViT]] 把它带进视觉
- [[30-Formulas/FlashAttention分块计算]] 只优化不改其数学；Mamba 系则挑战其平方复杂度

## 7. 读前须知

[[40-Concepts/注意力机制]]、[[40-Concepts/softmax函数]]、[[40-Concepts/内积]]、[[40-Concepts/位置编码]]

> 谱系成员（44）：[[A Systematic Analysis of Hybrid Linear Attention（混合线性分析）]] · [[Adam- A Method for Stochastic Optimization（Adam）]] · [[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] · [[Bag of Tricks for Efficient Text Classification（FastText）]] · [[Batch Normalization- Accelerating Deep Network Training by Reducing Internal Covariate Shift（BN）]] · [[BERT- Pre-training of Deep Bidirectional Transformers for Language Understanding（BERT）]] · [[BitNet- Scaling 1-bit Transformers for Large Language Models（BitNet 1.0）]] · [[Decoupled Weight Decay Regularization（AdamW）]] · [[Deep Residual Learning for Image Recognition（ResNet）]] · [[DeepSeek-V2- A Strong, Economical, and Efficient Mixture-of-Experts Language Model（MLA）]] · [[Dynamic Routing Between Capsules（Capsule）]] · [[Efficient Estimation of Word Representations in Vector Space（word2vec）]] · …等 44 篇
