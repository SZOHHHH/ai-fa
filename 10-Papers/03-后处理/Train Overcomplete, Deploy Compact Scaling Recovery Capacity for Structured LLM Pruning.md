---
type: paper
title: "Train Overcomplete, Deploy Compact: Scaling Recovery Capacity for Structured LLM Pruning"
aliases: []
year: 2026
authors: [Seungmin, Oh]
venue: 待核（占位层，来自 arXiv 2026-09-07）
arxiv: "2609.06974v1"
pdf: 已下载（PDF/）
line: 后处理
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Train Overcomplete, Deploy Compact: Scaling Recovery Capacity for Structured LLM Pruning

> **占位层卡**（daily 自动采集 2026-09-10 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Large language models achieve strong performance across diverse tasks, but deployment remains costly because of memory, latency, and energy demands. Structured pruning reduces these costs by removing architectural components, yet its recovery stage is often limited by a mismatch between the recovery module's representational capacity and the complexity of the removed knowledge. We call this bottleneck the capacity-knowledge asymmetry and propose OverRep, an Overcomplete Reparameterization framework for structured LLM pruning. Following the principle of "train overcomplete, deploy compact", Ove

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/知识蒸馏]] · [[40-Concepts/低秩分解]]
- ← 前身：结构化剪枝两段式（识别冗余→恢复微调）——恢复段基线即 [[10-Papers/03-后处理/LoRA- Low-Rank Adaptation of Large Language Models（LoRA）|LoRA]] 族低容量模块；剪枝侧 [[10-Papers/03-后处理/A Simple and Effective Pruning Approach for Large Language Models（SparseGPT）|SparseGPT]]、容量可分离性假说 [[10-Papers/03-后处理/The Lottery Ticket Hypothesis- Finding Sparse, Trainable Neural Networks（Lottery Ticket）|Lottery Ticket]]
- 核心概念：**容量-知识不对称**（capacity-knowledge asymmetry）——剪掉的知识复杂度远超恢复模块的表达容量；解法="**训练过完备、部署紧凑**"：恢复模块训练期扩容吸收从原模型蒸馏来的知识，部署前把过完备重参数化**代数合并**成数学等价的紧凑模块（退火激活：训练早期非线性、平滑收敛到线性域保证精确合并）。25%/50% 剪枝下保持推理性能比强恢复基线高至多 5.5/8.4 点，内存与 TFLOPs 持平。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
