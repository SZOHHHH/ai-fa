---
type: paper
title: "RAPID: Increasing Efficiency of Internal Distillation via Randomized Methods"
aliases: []
year: 2026
authors: [Ryan, Swift]
venue: 待核（占位层，来自 arXiv 2026-11-02）
arxiv: "2611.04081v1"
pdf: https://arxiv.org/pdf/2611.04081v1
line: 后处理
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# RAPID: Increasing Efficiency of Internal Distillation via Randomized Methods

> **占位层卡**（daily 自动采集 2026-11-05 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Knowledge distillation is a technique used to transfer the expertise of large teacher models into small, efficient student models. Recent advances have integrated the distillation of internal activations, more directly training students to learn similar representations as the teacher. One of the core challenges of internal distillation is the dimensional incompatibility between the student and teacher internal representations. Existing methods add learnable matrices to project the larger teacher activations into the smaller representation space of the student. This is a notable point of ineffi

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← [[10-Papers/03-后处理/TinyBERT- Distilling BERT for Natural Language Understanding（TinyBERT）|TinyBERT]]（特征蒸馏前身——可学习投影对齐师生维度）；本文把投影换成 Johnson-Lindenstrauss 随机投影：免训练、带结构保持理论保证、训完即用
- 概念/算法链：[[40-Concepts/知识蒸馏]]（内部激活蒸馏）· [[40-Concepts/低秩分解]]（降维投影家族：随机投影 vs 低秩学习）· [[40-Concepts/量化]]（效率邻轴：投影省训练参数、量化省推理位宽，正交组合）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.04081v1；在线全文（新论文）：https://arxiv.org/html/2611.04081v1
