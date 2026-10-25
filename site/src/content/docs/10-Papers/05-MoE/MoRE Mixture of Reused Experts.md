---
type: paper
title: "MoRE: Mixture of Reused Experts"
aliases: []
year: 2026
authors: [Eric, S., Qiu]
venue: 待核（占位层，来自 arXiv 2026-09-16）
arxiv: "2609.18176v2"
pdf: 已下载（PDF/）
line: MoE
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# MoRE: Mixture of Reused Experts

> **占位层卡**（daily 自动采集 2026-09-18 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Mixture-of-Experts (MoE) architectures decouple model capacity from computational cost, yet incur high memory footprints as parameters grow linearly with the number of experts. Recurrent Transformers achieve parameter efficiency by reusing layer weights, but typically lack the capacity for competitive language modeling. We propose Mixture of Reused Experts (MoRE), a hybrid that shares expert pools across groups of adjacent layers. Each layer retains its own router but selects from a larger shared pool, expanding the diversity of routing combinations without additional parameters. To enable sha

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[混合专家（MoE）](/ai-fa/explore/20-Algorithms/混合专家（MoE）) · [MoE门控公式](/ai-fa/explore/30-Formulas/MoE门控公式)（层间共享池上的路由仍是此式）
- 同族：↔ [SMELT](/ai-fa/explore/10-Papers/05-MoE/SMELT - Scaling Laws for Compute-Matched MoE Looped Transformers（循环MoE缩放律）)（循环/层复用省参数同思想家族——SMELT 复用整层、MoRE 复用专家池，260918 处理段挂链，占位层待精读）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
