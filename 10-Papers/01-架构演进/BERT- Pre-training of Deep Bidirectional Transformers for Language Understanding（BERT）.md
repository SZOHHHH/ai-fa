---
type: paper
title: BERT - Pre-training of Deep Bidirectional Transformers for Language Understanding
aliases: [BERT]
year: 2018
authors: [Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova]
venue: NAACL 2019
arxiv: "1810.04805"
line: 架构演进
matrix_coords: [全注意力, 缩放律, 无状态]
tags: [paper]
pdf: 已下载（PDF/）
---

# BERT

## 1. 一句话贡献

双向掩码语言建模（完形填空）预训练 Transformer 编码器——NLU 任务的通用底座，开启"预训练+微调"时代。

## 2. 核心贡献

- **MLM（掩码语言建模）**：随机遮 15% token 让模型猜——双向上下文全利用（GPT 只能看左边）
- **NSP（下一句预测）**：句对任务（后来证明可有可无）
- **预训练-微调范式**：一个底座通吃分类/问答/命名实体——NLP 任务工程从此模板化

## 3. 方法概要

1. 语料：BooksCorpus + Wikipedia（33 亿词）
2. 预训练：15% token 被选，其中 80% 换 [MASK]、10% 换随机词、10% 不动——缓解预训练/微调分布差
3. 微调：任务头 + 少量标注数据端到端
4. 输入：WordPiece 分词 + 段嵌入 + 可学习位置嵌入

## 4. 核心公式

- MLM 目标：$-\sum_{i \in \text{masked}} \log p(x_i \mid x_{\backslash i})$（双向条件）
- 架构即 [[30-Formulas/注意力核心公式]] 的双向（无因果掩码）版

## 5. 与前作的关系

- 组合了 [[10-Papers/01-架构演进/Attention Is All You Need（Transformer）]]（架构）与 [GPT 生成式预训练]（范式）——改单向为双向
- 对比 GPT-1：GPT 用生成目标损失换双向视野，BERT 反向取舍（NLU 上大胜，生成任务弱）

## 6. 影响与后续

- GLUE 全面刷榜统治两年；RoBERTa/ALBERT/ELECTRA 系列迭代
- "预训练-微调"成为默认范式直到 GPT-3 上下文学习改写剧本
- 蒸馏线首批目标（DistilBERT/TinyBERT——线 3 交叉）

## 7. 读前须知

[[20-Algorithms/Transformer]]、[[30-Formulas/注意力核心公式]]、[[40-Concepts/softmax函数]]

- → 后继补记（260921）：[[10-Papers/01-架构演进/Not All Irregularity Is Equal Causally Isolating a Rare Failure Mode in Japanese Morphological Infle|Not All Irregularity Is Equal]]（字符级形态谱系的稀有子类错误诊断：日语变形 97% 精度下 <1% 子类贡献 30-43% 残差）
