---
type: paper
title: "CompKV: Compensation-Aware KV Selection for Long-Context LLM Inference"
aliases: []
year: 2026
authors: [Zhen, Huang]
venue: 待核（占位层，来自 arXiv 2026-09-22）
arxiv: "2609.26300v1"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# CompKV: Compensation-Aware KV Selection for Long-Context LLM Inference

> **占位层卡**（daily 自动采集 2026-09-26 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Despite their strong performance, large language models (LLMs) are bottlenecked by KV cache memory traffic during long-context inference. Sparse attention is widely used to accelerate LLM inference by computing exact attention over a selected subset of tokens. To recover the contribution of tokens excluded from exact attention, recent methods apply coarse-grained compensation to the omitted attention tail. However, existing methods typically select tokens based on attention mass and only then compensate for the unselected tokens. This decoupled design overlooks their interaction: selection sho

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 概念链：[[40-Concepts/KV缓存]]（固定读预算下"读哪些块"的决策问题）、[[40-Concepts/KL散度]]（选择损失=补偿分布对全注意力的 KL，推出"质量×方差"双因子残差准则）。
- 同族：[[10-Papers/06-长上下文/SAS - Simple Attention Sparsification via End-to-End Optimization of Context Ranking（端到端稀疏注意力）|SAS]]（同一"目标对齐"批判家族——SAS 批蒸馏中间量、CompKV 批选择与补偿解耦）。
- 与 E1/E2 对照：无域重叠（LLM 推理工程）；其"选择应服务下游补偿误差"的论证方式是跨域方法论参考。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
