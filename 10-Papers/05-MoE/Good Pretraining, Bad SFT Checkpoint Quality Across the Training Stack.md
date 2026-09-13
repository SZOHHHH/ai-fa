---
type: paper
title: "Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack"
aliases: []
year: 2026
authors: [Sohir, Maskey]
venue: 待核（占位层，来自 arXiv 2026-09-08）
arxiv: "2609.08966v1"
pdf: 已下载（PDF/）
line: MoE
matrix_coords: 待评
tags: [paper, 占位层]
layer: 精化占位
---
# Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack

> **占位层卡**（daily 自动采集 2026-09-11 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Language-model checkpoints are commonly selected by pretraining loss or benchmark scores, assuming that the highest-scoring checkpoint will remain the best starting point for subsequent training. We show that this assumption can fail in a full 30B mixture-of-experts training pipeline. The checkpoints that perform better after the full downstream training stack also have higher solution density, i.e., retain downstream performance under local weight perturbations.

## 1. 一句话贡献
训练栈各层的最优检查点不传递：30B MoE 全栈流水线上，预训练最高分 ckpt 未必是下游最佳起点——更好起点的特征是"解密度"更高（局部权重扰动下保持下游性能）。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/混合专家（MoE）]] · [[30-Formulas/MoE门控公式]]（占位挂链，处理段精化）
- 研判：🟢 E1 同盟/可操作——蒸馏源选择（E550 峰 94.0 vs E600 终值 90.0）是未测自变量 → e2-line 消融提案（见当日晨报⑦）
- 直连：E1_实验数据台账 · 蒸馏谱系 [[10-Papers/03-后处理/Distilling the Knowledge in a Neural Network（KD）|KD]] · [[40-Concepts/知识蒸馏]]

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
