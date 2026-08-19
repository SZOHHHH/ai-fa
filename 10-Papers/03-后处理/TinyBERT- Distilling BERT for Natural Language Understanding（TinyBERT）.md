---
type: paper
title: TinyBERT - Distilling BERT for Natural Language Understanding
aliases: [TinyBERT]
year: 2019
authors: [Xiaoqi Jiao, Yichun Yin, Lifeng Shang, Xin Jiang, Xiao Chen, Linlin Li, Fang Wang, Qun Liu]
venue: ICLR 2020（Findings of EMNLP 2020）
arxiv: "1909.10351"
line: 后处理与压缩
matrix_coords: [知识(行为), 蒸馏, 微调期]
tags: [paper]
---

# TinyBERT

## 1. 一句话贡献

两层蒸馏（预训练+任务微调各蒸一遍）+ 四类中间层对齐——把 BERT 压到 1/7.5 大小保留 96% 能力。

## 2. 核心贡献

- **四层对齐**：嵌入层、注意力分数矩阵（logits）、隐状态、预测 logits——不只学输出，学"思考过程"
- **两阶段蒸馏**：通用预训练蒸馏 → 任务特定蒸馏（数据增强）
- 中间层监督的系统化设计

## 3. 方法概要

1. 教师 BERT 每层输出（嵌入/注意力图/隐层）作为学生对应层目标（线性投影对齐维度）
2. 先在通用语料蒸馏，再用增强数据做任务蒸馏
3. 损失：逐层 MSE + 注意力 KL + logits KL

## 4. 核心公式

- 特征蒸馏项见 [[30-Formulas/蒸馏损失]] §2 特征蒸馏行

## 5. 与前作的关系

- 扩展了 [[10-Papers/03-后处理/DistilBERT, a distilled version of BERT- smaller, faster, cheaper and lighter（DistilBERT）]]：输出对齐 → 全栈对齐
- 理论根 [[10-Papers/03-后处理/Distilling the Knowledge in a Neural Network（KD）]]

## 6. 影响与后续

- 中间层蒸馏成为标准技术（MobileBERT 等沿用）
- "教师怎么想"比"教师说什么"更有价值——可解释性副产品

## 7. 读前须知

[[30-Formulas/蒸馏损失]]、[[10-Papers/03-后处理/DistilBERT, a distilled version of BERT- smaller, faster, cheaper and lighter（DistilBERT）]]
