---
type: paper
title: "Uni-Light: An Ultra-Lightweight Framework via Uncertainty-Aware Knowledge Distillation for Brain Tumour Segmentation"
aliases: []
year: 2026
authors: [Libing, Kuang]
venue: 待核（占位层，来自 arXiv 2026-09-06）
arxiv: "2609.06729v1"
pdf: 已下载（PDF/）
line: 后处理
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Uni-Light: An Ultra-Lightweight Framework via Uncertainty-Aware Knowledge Distillation for Brain Tumour Segmentation

> **占位层卡**（daily 自动采集 2026-09-10 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Accurate 3D brain tumour segmentation from multi-modal Magnetic Resonance Imaging (MRI) is essential for clinical diagnosis and treatment planning. Existing brain tumour segmentation methods often suffer from heavy computational demands, while current lightweight architectures frequently lack the capacity to maintain segmentation fidelity in complex tumour regions. To address these issues, we propose a novel ultra-lightweight framework (Uni-Light) that achieves high-fidelity segmentation with substantially reduced computational overhead. It combines multi-scale convolutions with an uncertainty

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/知识蒸馏]] · [[30-Formulas/蒸馏损失]]
- 蒸馏形态：**不确定性加权蒸馏**（DWKD 动态加权 KD）——按教师不确定性生成权重图、逐体素加权监督，把学习焦点引向难分区域（肿瘤边界/增强子区），配 SDF 边界损失做几何约束；参数减 97.56%、FLOPs 减 73.03%、推理内存减 81.58% 的同时 Dice 平均反超 SOTA +1.47%（BraTS2023-GLI/MSD-BTS）。
- 反面范式：标准均匀蒸馏（[[10-Papers/03-后处理/TinyBERT- Distilling BERT for Natural Language Understanding（TinyBERT）|TinyBERT]] 等）假设样本难度齐一——本文证明空间异质性显式建模是轻量模型守住复杂区域的关键。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
