---
type: paper
title: "HISPO: Hierarchical Importance-Sampling Policy Optimization with Entropy-Derived Segments"
aliases: []
year: 2026
authors: [Quoc-Vinh, Lai-Dang]
venue: 待核（占位层，来自 arXiv 2026-09-14）
arxiv: "2609.15471v1"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# HISPO: Hierarchical Importance-Sampling Policy Optimization with Entropy-Derived Segments

> **占位层卡**（daily 自动采集 2026-09-16 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Reinforcement learning with verifiable rewards (RLVR) has become a central approach for improving mathematical reasoning in language models, but long-form completions introduce a difficult credit-assignment problem: different parts of a solution trace may contribute unevenly to final correctness. Existing policyoptimization objectives for RLVR commonly apply importance-sampling correction at either the token level (GRPO, DAPO) or the sequence level (GSPO), imposing different granularities for assigning credit across a response. We introduce Hierarchical Importance-Sampling Policy Optimization 

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/GRPO与RLVR]]
- 数学根基：[[30-Formulas/GRPO目标]] · [[40-Concepts/重要性采样]]（IS 修正的粒度=本文核心设计轴：token/段/序列三级）
- 近邻同族：[[Group Sequence Policy Optimization（GSPO）]]（序列级对照极）· [[DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）]]（token 级对照极——HISPO 用熵导出连续段在两极之间插中粒度，AIME25 上 +3.75/+2.50 Acc@8 分别胜 GRPO/GSPO）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
