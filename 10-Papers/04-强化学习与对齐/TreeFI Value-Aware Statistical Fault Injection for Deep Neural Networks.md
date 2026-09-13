---
type: paper
title: "TreeFI: Value-Aware Statistical Fault Injection for Deep Neural Networks"
aliases: []
year: 2026
authors: [Noam Bires]
venue: 待核（占位层，来自 arXiv 2026-09-04）
arxiv: "2609.04912v1"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# TreeFI: Value-Aware Statistical Fault Injection for Deep Neural Networks

> **占位层卡**（daily 自动采集 2026-09-07 建卡，元数据出自 arXiv API=已核实）。**待 Tier B 精读升级**：七节补全+中文名+挂全链。
> 摘要（原文）：Reliability evaluation of deep neural networks under hardware faults commonly relies on fault injection, but exhaustive campaigns are intractable for modern models and datasets. Statistical fault injection reduces this cost, yet existing approaches still require large injection budgets because they do not explicitly exploit a key property of floating-point faults: the effect of a bit flip depends strongly on the value being corrupted. We propose TreeFI, a value-aware statistical fault-injection methodology for FP32 single-bit faults in DNN activations and weights. TreeFI partitions each layer'
> ★ 中文速览（9/7 Tier B）：用"价值感知"统计抽样决定往 DNN 哪些位翻转注入硬件故障——重要参数多测、不重要少测，把不可行的穷举故障注入变成统计可行的可靠性评估。
> ★ 敌情研判：🟢 词族命中但不同物：其 value=重要性权重，我们=决策价值函数；无 WM 无蒸馏无 RL。哨兵台账记录，不划界不引用。

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/世界模型]] · [[40-Concepts/策略梯度定理]]（占位挂链，Tier B 精化）
- 方法近邻：[[40-Concepts/价值函数（V与Q）]]（"value-aware"=按重要性分配采样预算）·[[40-Concepts/期望]]（统计抽样框架）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
