---
type: paper
title: How Fragile Is Safety Alignment at Frontier Scale? A Single-Direction Attack on a 320B MoE
aliases: []
year: 2026
authors: [Yi, Shi]
venue: 待核（占位层，来自 arXiv 2026-09-09）
arxiv: "2609.09793v1"
pdf: 已下载（PDF/）
line: MoE
matrix_coords: 待评
tags: [paper, 占位层]
layer: 精化占位
---
# How Fragile Is Safety Alignment at Frontier Scale? A Single-Direction Attack on a 320B MoE

> **占位层卡**（daily 自动采集 2026-09-11 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Directional ablation removes an aligned language model's ability to refuse by projecting a single "refusal direction" out of the weights that write the residual stream. It needs no gradient-based training and no optimization, only a few hundred contrastive prompts, which makes it the canonical white-box attack on open-weight alignment. However, it has been established only on dense models up to roughly 70B parameters. We study whether it survives the shift to frontier mixture-of-experts (MoE) models whose residual streams are no longer a single tensor and whose weights ship quantized. We apply

## 1. 一句话贡献
320B MoE 上验证单方向攻击：把残差流的拒绝方向投影移除（directional ablation，无需梯度训练）即瓦解拒绝能力——前沿 MoE 对齐脆弱性实测。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/混合专家（MoE）]] · [[30-Formulas/MoE门控公式]]（占位挂链，处理段精化）
- 研判：⚪ MoE 线安全轴参考（架构本体与主线正交）
- MoE 实例谱系：[[10-Papers/05-MoE/Mixtral of Experts（Mixtral）|Mixtral]]

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
