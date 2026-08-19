---
type: paper
title: DistilBERT, a distilled version of BERT - smaller, faster, cheaper and lighter
aliases: [DistilBERT]
year: 2019
authors: [Victor Sanh, Lysandre Debut, Julien Chaumond, Thomas Wolf]
venue: arXiv 2019
arxiv: "1910.01108"
line: 后处理与压缩
matrix_coords: [知识(行为), 蒸馏, 微调期]
tags: [paper]
---

# DistilBERT

## 1. 一句话贡献

用序列级蒸馏把 BERT 压缩 40%（6 层）——速度 ×60%、保留 97% 质量，LLM 蒸馏时代的第一个爆款。

## 2. 核心贡献

- **三重损失**：软 KL（教师-学生 logits）+ MLM 硬损失 + 余弦相似损失（隐层对齐）
- **架构简化**：砍半层、去 token type embedding
- 证明"蒸馏>直接训小模型"在 Transformer 上的成立

## 3. 方法概要

1. 学生初始化：取教师（BERT）前 6 层
2. 数据：原 BERT 预训练语料（无标注依赖）
3. 三重损失联合训练
4. 评测：GLUE 保留 97%、推理 60% 提速（CPU 友好）

## 4. 核心公式

- [[30-Formulas/蒸馏损失]]（+ MLM + cos 三合一）

## 5. 与前作的关系

- 应用了 [[10-Papers/03-后处理/Distilling the Knowledge in a Neural Network（KD）]] 到 BERT
- 对比直接训 6 层：蒸馏版显著更好——教师信号的实证价值

## 6. 影响与后续

- Hugging Face 生态默认小模型；端侧部署标配
- TinyBERT（[[10-Papers/03-后处理/TinyBERT- Distilling BERT for Natural Language Understanding（TinyBERT）]]）两层蒸馏进一步逼近

## 7. 读前须知

[[30-Formulas/蒸馏损失]]、[[10-Papers/01-架构演进/BERT- Pre-training of Deep Bidirectional Transformers for Language Understanding（BERT）]]
