---
type: paper
layer: 占位
title: Test-Time Scaling Makes Overtraining Compute-Optimal
aliases: [T2T标度律]
year: 2026
authors: [（arXiv）]
venue: arXiv 2026
arxiv: "2604.01411"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [测试时延长, 采样聚合, 算力调度]
tags: [paper, 占位层]
---

# Test-Time Scaling Makes Overtraining Compute-Optimal（T2T标度律·七节版）

## 1. 一句话贡献

训练-测试算力联合最优：测试时扩展改变了"过训练是否划算"的答案——模型大小×训练token×推理采样数的三元联合标度律。

## 2. 核心贡献

1. 训练-测试算力联合最优：测试时扩展改变了"过训练是否划算"的答案
2. 模型大小×训练token×推理采样数的三元联合标度律。

## 3. 方法概要

证明当测试时可以多采样时，小模型过训练+多采样的组合在 FLOPs 平衡下最优——训练缩放律与推理缩放律的正式耦合。

## 4. 核心公式

$$
\big(N^*, D^*, n^*\big) = \arg\min_{\text{FLOPs}} \mathcal{L}\big(N, D, n\big)\ \text{三元联合最优}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占"缩放律平移"格的另一侧（← [[10-Papers/10-标杆锚点/Training Compute-Optimal Large Language Models（Chinchilla）]] 的测试时推广）


## 6. 影响与占位意义

榜 6 的邻格占位：训练/测试算力权衡已成正式研究对象。

> 近邻同族：[[Controlled Decoding from Language Models（CD）]] · [[Large Language Monkeys- Scaling Inference Compute with Repeated Sampling（LL Monkeys）]]
> 数学根基（占位层）：[[思维链（CoT）]]

## 7. 读前须知

需要：覆盖曲线 coverage@k；预算强制；采样聚合（多数投票）
