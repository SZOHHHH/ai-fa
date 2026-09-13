---
type: paper
title: "The Rater Ising-Potts Model with LLM-Derived Weights: An Application to Multi-Category Scoring Reliability"
aliases: []
year: 2026
authors: [Matthias, von, Davier]
venue: 待核（占位层，来自 arXiv 2026-09-08）
arxiv: "2609.08797v1"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# The Rater Ising-Potts Model with LLM-Derived Weights: An Application to Multi-Category Scoring Reliability

> **占位层卡**（daily 自动采集 2026-09-12 建卡；处理段同日完成中文速览+挂链，七节精读待批次升级）。
> **方法速览（中文）**：做了什么——把二值 Ising 评分者模型推广为多类别 Potts 模型（Rater Ising-Potts / PARM），用于教育测评的多级评分可靠性审计：判定一组评分者（含 LLM 评分器）打分是否构成可靠共识。怎么做的——不预设有序阈值或等距评分，直接对"两评分者落入同一类别"的一致指示符建模；耦合权重取各回答文本 LLM 嵌入的余弦相似度（可加 min-max 归一化+幂变换锐化语义区分），条件分布恰好等价于相似度特征上的多项 logistic 回归，用伪极大似然估计（全部参数仅 3C 个，极简）。效果：短答案（750 样本 3 级量表）与 AERA 作文（1338 样本 4 级量表）上与人工评分高度一致（±1 类内一致率 1.000/0.890），误分几乎全落在相邻分数级——序结构保住而无刚性假设。

## 1. 一句话贡献
把 Ising 评分者模型推广到多类别 Potts：对"两两同类一致"指示符直接建模（不预设有序阈值），耦合权重取 LLM 嵌入余弦相似度，条件分布等价于相似度上的多项 logistic 回归，以伪似然估计——教育测评多级评分可靠性审计的极简可解释框架。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 概念/公式锚：[[40-Concepts/能量模型]]（Potts 模型=Ising 的多类别能量模型推广，配分函数 $Z$ 同源同难）· [[30-Formulas/CLIP对比损失]]（嵌入余弦相似度作耦合权重的同源用法）· [[40-Concepts/softmax函数]]（条件分布=相似度特征上的多项 logistic/softmax）
- **线位备注**：本卡与"长上下文"线仅经 LLM 嵌入弱关联（stat.AP 测评统计），系轮换采集词面命中所致归类；实质属测评统计/心理测量，待批次整理时迁线，勿据此推进长上下文矩阵结论。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
