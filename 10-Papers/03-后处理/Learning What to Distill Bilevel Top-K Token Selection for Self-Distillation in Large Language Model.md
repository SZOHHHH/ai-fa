---
type: paper
title: "Learning What to Distill: Bilevel Top-K Token Selection for Self-Distillation in Large Language Models"
aliases: []
year: 2026
authors: [Heng, Liang]
venue: 待核（占位层，来自 arXiv 2026-10-05）
arxiv: "2610.07247v1"
pdf: https://arxiv.org/pdf/2610.07247v1
line: 后处理
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Learning What to Distill: Bilevel Top-K Token Selection for Self-Distillation in Large Language Models

> **占位层卡**（daily 自动采集 2026-10-08 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Large language models have shown strong reasoning capabilities, but their high inference costs make knowledge distillation an important approach for transferring such capabilities to compact models in resource-constrained scenarios. On-policy self-distillation further reduces the reliance on external large teacher models while improving the reasoning ability of compact language models. However, existing methods typically either distill all token positions uniformly or select tokens using fixed heuristic criteria, assigning the same distillation strength to the selected positions rather than ad

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/知识蒸馏]] · [[30-Formulas/蒸馏损失]]（token 级 KD 损失的选择性施加）
- ≡ 同批同族：[[10-Papers/03-后处理/WASD Wasserstein-based Knowledge Distillation for Large Language Models|WASD]]（同日入库的 LLM token 级 KD——WASD 改"怎么对齐"、BiToK-SD 改"在哪对齐"）
- → on-policy 蒸馏线：[[10-Papers/04-强化学习与对齐/KwaiMind Technical Report|KwaiMind]]（on-policy 蒸馏做策略合并）
- 2601008 挂链：轮换线 postprocess；"蒸馏哪些 token"的自适应选择（双层优化），⚪

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.07247v1；在线全文（新论文）：https://arxiv.org/html/2610.07247v1
