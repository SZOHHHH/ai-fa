---
type: paper
layer: 占位
title: KIVI- A Tuning-Free Asymmetric 2bit Quantization for KV Cache
aliases: [KIVI]
year: 2024
authors: [Z. Liu et al.]
venue: arXiv 2024
arxiv: "2402.02750"
pdf: 已下载（PDF/）
line: 后处理与压缩
matrix_coords: [KV cache, 量化, 训练后]
tags: [paper, 占位层]
---

# KIVI- A Tuning-Free Asymmetric 2bit Quantization for KV Cache（KIVI·七节版）

## 1. 一句话贡献

KV cache 的免调优非对称 2bit 量化：key 按通道、value 按 token——利用激活分布离群点结构，8× 压缩长上下文几乎不掉点（ICML 2024，657+ 引用）。

## 2. 核心贡献

1. KV cache 的免调优非对称 2bit 量化：key 按通道、value 按 token
2. 利用激活分布离群点结构，8× 压缩长上下文几乎不掉点（ICML 2024，657+ 引用）。

## 3. 方法概要

观察到 key 的离群点集中在固定通道、value 的集中在固定 token；据此设计非对称量化粒度，免校准免微调即插即用。

## 4. 核心公式

$$
K \approx Q_k\big(\mathrm{per\text{-}channel}\big),\ V \approx Q_v\big(\mathrm{per\text{-}token}\big),\ \text{均 2bit}+\text{离群点保护}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩🚩 **占 [[60-Matrices/模型压缩矩阵]] "KV cache×量化"机会格的主位**（B9 识别格 7）——KIVI 是该格的奠基占位，后续 KVQuant/NVFP4 已跟进


## 6. 影响与占位意义

该格从"机会"变"竞争进行中"的直接证据。

---

> 谱系枢纽：[[LoRA- Low-Rank Adaptation of Large Language Models（LoRA）]]（图谱连通入口）
> 近邻同族：[[A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning（DAGGER）]] · [[A Simple and Effective Pruning Approach for Large Language Models（SparseGPT）]]
> 数学根基（占位层）：[[KV缓存]] · [[量化]]
> 数学根基：[[注意力计算复杂度]]

## 7. 读前须知

需要：KV cache 机制；量化误差与异常值分布；RoPE 前后量化的差异
