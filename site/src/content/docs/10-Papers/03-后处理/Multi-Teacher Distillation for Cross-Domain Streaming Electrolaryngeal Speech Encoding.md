---
type: paper
title: Multi-Teacher Distillation for Cross-Domain Streaming Electrolaryngeal Speech Encoding
aliases: []
year: 2026
authors: [Benedikt, Mayrhofer]
venue: 待核（占位层，来自 arXiv 2026-09-16）
arxiv: "2609.18686v1"
pdf: 已下载（PDF/）
line: 后处理
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Multi-Teacher Distillation for Cross-Domain Streaming Electrolaryngeal Speech Encoding

> **占位层卡**（daily 自动采集 2026-09-17 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Self-supervised learning (SSL) has improved speech representations, yet performance degrades in pathological domains such as electrolaryngeal (EL) speech, and the computational footprint of SSL models limits their applicability in real-time, on-device deployment. We propose a multi-teacher knowledge distillation framework to train a lightweight, streaming content encoder that generalizes across healthy (HE) and EL speech. Two teachers are distilled progressively: a frozen SSL model providing discrete phonetic cluster targets from HE speech, and an EL-fine-tuned speech recognition model supplyi

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[知识蒸馏](/ai-fa/explore/40-Concepts/知识蒸馏)（双教师渐进蒸馏：冻结 SSL 给离散音素聚类目标+EL 微调 ASR 给连续瓶颈特征目标——两种监督形态串联）
- 架构对照：[Transformer](/ai-fa/explore/20-Algorithms/Transformer)（Conformer 学生=卷积+自注意力）· [SSM序列架构（Mamba系）](/ai-fa/explore/20-Algorithms/SSM序列架构（Mamba系）)（学生架构对比组含 Mamba，最终 Mel-Conformer 胜出）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
