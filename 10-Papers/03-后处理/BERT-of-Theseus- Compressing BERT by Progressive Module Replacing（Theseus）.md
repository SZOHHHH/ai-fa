---
type: paper
title: BERT-of-Theseus - Compressing BERT by Progressive Module Replacing
aliases: [BERT-of-Theseus, Theseus]
year: 2020
authors: [Canwen Xu, Wangtao Sun, Chao Gao, et al.]
venue: ACL 2020
arxiv: "2002.02925"
line: 后处理与压缩
matrix_coords: [知识(行为), 蒸馏, 微调期]
tags: [paper]
---

# BERT-of-Theseus（模块替换压缩）

## 1. 一句话贡献

渐进式模块替换压缩：训练中学生模块逐个顶替教师模块——"边拆边学"的蒸馏框架，替代直接蒸馏的硬切换。

## 2. 核心贡献

- **Progressive Replacing**：每步随机用学生模块替换教师对应模块——学生始终在"真实上下文"中学习
- 对比直接 KD：梯度信号更稳定、收敛快
- 名字典故：忒修斯之船——逐块替换、整体功能不变

## 3. 方法概要

1. 教师分层；学生同层数但更小
2. 训练中按概率将教师模块替换为学生模块
3. 混合前向（部分教师+部分学生）
4. 替换率渐增至 100%

## 4. 核心公式

- 替换式蒸馏（结构策略）；配合 [[30-Formulas/蒸馏损失]] 使用

## 5. 与前作的关系

- 改进了 [[10-Papers/03-后处理/DistilBERT, a distilled version of BERT- smaller, faster, cheaper and lighter（DistilBERT）]] 式一次性蒸馏的分布漂移问题
- 同族 [[10-Papers/03-后处理/TinyBERT- Distilling BERT for Natural Language Understanding（TinyBERT）]]（层对齐）——三种蒸馏组织方式

## 6. 影响与后续

- 渐进式策略外溢（层丢弃、渐进量化）
- "模块化替换"思想在 LoRA 时代仍有回响（适配器替换）

## 7. 读前须知

[[30-Formulas/蒸馏损失]]、[[10-Papers/03-后处理/DistilBERT, a distilled version of BERT- smaller, faster, cheaper and lighter（DistilBERT）]]

> 近邻同族：[[DistilBERT, a distilled version of BERT- smaller, faster, cheaper and lighter（DistilBERT）]] · [[Distilling the Knowledge in a Neural Network（KD）]]
