---
type: paper
title: Pretraining and Distillation Matter More Than Architecture Family for Label-Free Single-Cell Classification
aliases: []
year: 2026
authors: [Philip, Graemer]
venue: 待核（占位层，来自 arXiv 2026-09-09）
arxiv: "2609.09863v1"
pdf: 已下载（PDF/）
line: 后处理
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Pretraining and Distillation Matter More Than Architecture Family for Label-Free Single-Cell Classification

> **占位层卡**（daily 自动采集 2026-09-10 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Choosing a deep learning architecture for label-free single-cell classification remains an open question, with microscopy benchmarks reporting conflicting conclusions about CNNs versus transformers. We present a controlled benchmark on LIVECell phase-contrast microscopy data using source-image-disjoint train/validation/test splits to prevent parent-image leakage and matched optimisation, augmentation, and evaluation protocols across EfficientNet, Vision Transformer (ViT), and EVA-02 models. This allows the effects of architecture, pretraining, fine-tuning, tokenisation, and distillation to be 

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/知识蒸馏]] · [[20-Algorithms/Transformer]]（CNN vs ViT 架构族对比的受控基准）
- 蒸馏形态：**council 蒸馏**（多教师平均）——EN-B0 学生从 EN-B5×3 议会蒸馏后**超过一切单训骨干**（含教师本身与 EVA-02）；与 [[10-Papers/03-后处理/TinyBERT- Distilling BERT for Natural Language Understanding（TinyBERT）|TinyBERT]] 同属"小模型吃教师红利"证据链，且把红利推到"学生反超教师"。
- 方法论：源图不相交切分防泄漏 + 匹配优化/增广协议——把"架构家族效应"从"预训练效应"里剥离（此前报告的 CNN 优势大部分是预训练优势；ViT-S/8 细 token 化对小细胞裁剪占优、层间学习率衰减不迁移）。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
