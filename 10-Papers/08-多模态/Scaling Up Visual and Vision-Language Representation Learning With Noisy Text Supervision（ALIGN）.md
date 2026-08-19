---
type: paper
title: Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision
aliases: [ALIGN]
year: 2021
authors: [Chao Jia, Yinfei Yang, Ye Xia, et al.]
venue: ICML 2021
arxiv: "2102.05918"
line: 多模态
matrix_coords: [对比接口, 对比(InfoNCE), 接口级]
tags: [paper]
---

# ALIGN

## 1. 一句话贡献

18 亿"噪声"图文对（未清洗 alt 文本）+ 双塔对比——证明**规模胜过精洗**，与 [[Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]] 同期互证的姊妹篇。

## 2. 核心贡献

- **噪声数据规模化**：不用人工清洗，靠规模淹没噪声
- **dual encoder 对比**（与 CLIP 同构，独立发现）
- 零样本检索/分类同样成立

## 3. 方法概要

1. 抓取 1.8B 图文对（alt-text 原样保留）
2. 简单频率过滤 + 去重
3. 双塔对比训练（噪声即正则）
4. 零样本评测与微调下游

## 4. 核心公式

- [[30-Formulas/CLIP对比损失]]（ALIGN 行）

## 5. 与前作的关系

- 与 [[10-Papers/08-多模态/Learning Transferable Visual Models From Natural Language Supervision（CLIP）]] 平行独立，共同确立对比对齐范式
- 数据哲学呼应 [[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]]：规模>清洗

## 6. 影响与后续

- "Dirty data works" 论据；后续大规模多模态预训练默认噪声路线
- 图文检索工业部署

## 7. 读前须知

[[30-Formulas/CLIP对比损失]]、[[10-Papers/08-多模态/Learning Transferable Visual Models From Natural Language Supervision（CLIP）]]
