---
type: paper
title: "The Intrusion Pathway: How Non-Evidential Context Degrades Language Model Performance"
aliases: []
year: 2026
authors: [Dikshant, Kukreja]
venue: 待核（占位层，来自 arXiv 2026-11-05）
arxiv: "2611.07778v1"
pdf: https://arxiv.org/pdf/2611.07778v1
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# The Intrusion Pathway: How Non-Evidential Context Degrades Language Model Performance

> **占位层卡**（daily 自动采集 2026-11-07 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Language models lose accuracy when a prompt contains non-evidential context: irrelevant statements from unrelated domains, or random off-distribution tokens, with no competing answer and no semantic overlap with the query. Such noise pervades retrieval-augmented, tool-using, and long-context deployments, yet the failure has lacked a mechanistic account. We trace the corruption to the Intrusion Pathway, which starts with MLPs enriching both query-subject and irrelevant-token representations, parroting heads carry prefix-token content to the prediction position, and relational readers largely av

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 概念链：[[40-Concepts/注意力机制]]（注意力头级定位：MLP 富化→鹦鹉头搬运→关系读出头规避的通路分解）· [[20-Algorithms/Transformer]]（MLP/注意力头分工的机制可解释性分析载体）。
- 同族链：[[10-Papers/06-长上下文/The Sirens' Song When Proximal Background Context Overshadows Distant Evidence|Sirens' Song]]（"上下文噪声病理"家族：Sirens=大量近端无关背景**累积竞争**压远端证据、修法在检索分布；本文=非证据上下文**侵入**答案计算通路、修法在头级 mask——两种病灶两种手术）。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.07778v1；在线全文（新论文）：https://arxiv.org/html/2611.07778v1
