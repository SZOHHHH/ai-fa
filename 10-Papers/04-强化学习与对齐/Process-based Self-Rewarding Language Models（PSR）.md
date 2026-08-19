---
type: paper
layer: 占位
title: Process-based Self-Rewarding Language Models
aliases: [PSR]
year: 2025
authors: [（arXiv，ACL Findings 2025）]
venue: arXiv 2025
arxiv: "2503.03746"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [自我奖励, —, token级]
tags: [paper, 占位层]
---

# Process-based Self-Rewarding Language Models（PSR·七节版）

## 1. 一句话贡献

过程级自奖励：自奖励信号从答案级细化到推理步级，并天然支持测试时扩展——**占 [[60-Matrices/偏好优化矩阵]] "自我奖励×无参考"机会格的一半**。

## 2. 核心贡献

1. 过程级自奖励：自奖励信号从答案级细化到推理步级，并天然支持测试时扩展
2. 占 [[60-Matrices/偏好优化矩阵]] "自我奖励×无参考"机会格的一半。

## 3. 方法概要

把 LLM-as-a-Judge 的自评估粒度从整答案降到步；步级自奖励与测试时采样聚合结合。

## 4. 核心公式

$$
r^{\text{self}}_{\text{step}} = f_{\text{judge}}\big(\text{step}_t\ \vert\ \text{context}\big),\ \text{迭代 [[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）|DPO]] 训练}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占偏好优化矩阵机会格"自我奖励×无参考"的**过程粒度侧**（该格的 π_ref 消除侧仍开放，但最近邻已被踩）


## 6. 影响与占位意义

B9 机会格 5 号的敌情：已被 ACL Findings 2025 占半格。

> 近邻同族：[[Self-Rewarding Language Models]] · [[A General Language Assistant as a Laboratory for Alignment（Assistant Lab）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[REINFORCE目标]]

## 7. 读前须知

本卡为占位层升级版；需要的数学基础见"数学根基"行所链接的公式/概念实体。
