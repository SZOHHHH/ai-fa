---
type: paper
title: "ACE: Adaptive Calibration-Free Expert Skipping for MoE-based LLMs"
aliases: []
year: 2026
authors: [Zukang Xu]
venue: 待核（占位层，来自 arXiv 2026-09-04）
arxiv: "2609.05228v1"
pdf: 已下载（PDF/）
line: 架构演进
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# ACE: Adaptive Calibration-Free Expert Skipping for MoE-based LLMs

> **占位层卡**（daily 自动采集 2026-09-07 建卡，元数据出自 arXiv API=已核实）。**待 Tier B 精读升级**：七节补全+中文名+挂全链。
> 摘要（原文）：Mixture-of-Experts (MoE) architectures provide an efficient paradigm for scaling large language models (LLMs), yet fixed top-k routing activates the same number of expert slots for every token, causing substantial redundant computation. Existing expert-skipping methods often rely on router confidence, calibration data, or additional training, and therefore cannot reliably estimate the actual contribution of routed experts. To this end, we propose ACE, a training-free, calibration-free, and checkpoint-preserving framework for token-adaptive expert skipping in MoE-based LLMs. ACE contains two co
> ★ 中文速览（9/7 Tier B）：MoE 推理加速：打破固定 top-k 路由——按 token 难度自适应跳过专家（无需校准），简单 token 少激活、难 token 全激活，推理省算力。

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/Transformer]] · [[30-Formulas/注意力核心公式]]（占位挂链，Tier B 精化）
- 同族：[[20-Algorithms/混合专家（MoE）]]·[[30-Formulas/MoE门控公式]]（top-k 路由本体）；效率近邻：[[40-Concepts/NFE（函数求值次数）]]（"激活多少专家"与"调用几次网络"同族思想）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
