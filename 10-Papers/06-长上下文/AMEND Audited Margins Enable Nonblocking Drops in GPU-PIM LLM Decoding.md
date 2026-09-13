---
type: paper
title: "AMEND: Audited Margins Enable Nonblocking Drops in GPU-PIM LLM Decoding"
aliases: []
year: 2026
authors: [Zuxiong, Tan]
venue: 待核（占位层，来自 arXiv 2026-09-09）
arxiv: "2609.09823v1"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# AMEND: Audited Margins Enable Nonblocking Drops in GPU-PIM LLM Decoding

> **占位层卡**（daily 自动采集 2026-09-12 建卡；处理段同日完成中文速览+挂链，七节精读待批次升级）。
> **方法速览（中文）**：做了什么——面向 GPU-PIM（近内存计算）异构硬件的长上下文解码加速方案 AMEND，同时解除两类依赖：BLASST 这类"算完 QK 才裁决"的块稀疏选择器仍要读全部 K 块，而"用当前 query 在 PIM 端先行过滤"又把串行 PIM 级卡上关键路径。怎么做的——用先前步已审计的 margin（块分数与阈值的带符号距离，实测 89.2% 判决相邻步不变）**预测**当前步 BLASST 判决：GPU 只取预测幸存块，HBM 近库 PIM 单元**并行**给被丢弃块补算 QK 复核，控制器合并两路观测并提前生成下一步掩码——每个预测丢弃都被再观测且不阻塞当前 token；工作点由带误丢率约束的贝叶斯优化离线选定。效果：8K-64K 上下文 batch 8 模拟下端到端解码 1.40-3.63× 加速、动态能耗降 28-66%，LongBench/RULER 任务质量近基线。

## 1. 一句话贡献
GPU-PIM 体系上的块稀疏解码设计：以"已审计 margin 预测当前判决 + PIM 并行复核丢弃补集 + 急切生成下一步掩码"三件套，把稀疏掩码的可用时刻提前到当前 QK 之前，8K-64K 上下文解码提速 1.40-3.63× 且质量近基线。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 概念/公式锚：[[40-Concepts/KV缓存]]（解码带宽瓶颈的主体，正是被复用+复核的对象）· [[40-Concepts/稀疏与线性注意力]]（块稀疏"保留家族"的硬件行）· [[30-Formulas/注意力计算复杂度]]
- 同族：[[MoBA- Mixture of Block Attention for Long-Context LLMs（MoBA）]]（同为块级选择，MoBA 在模型侧门控、AMEND 在体系结构侧预测）· [[Native Sparse Attention- Hardware-Aligned and Natively Trainable Sparse Attention（NSA）]]（"硬件对齐"路线从 tensor core 推进到 PIM 存内计算层）
- 现象锚：[[Efficient Streaming Language Models with Attention Sinks（StreamingLLM）]]——BLASST 选择器恒保 block 0，正是对 attention sink 位置的结构性保护（对比 [[Do New Attention Mechanisms Actually Fix Attention Sinks at Million-Token Context]] 的诊断视角）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
