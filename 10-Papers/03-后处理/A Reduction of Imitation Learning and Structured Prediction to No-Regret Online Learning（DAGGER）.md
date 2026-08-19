---
type: paper
tags: [paper]
title: A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning
aliases: [DAGGER]
year: 2011
authors: [Stéphane Ross, Geoffrey Gordon, J. Andrew Bagnell]
venue: AISTATS 2011（3000+ 引用）
arxiv: "1011.0686"
pdf: 已下载（PDF/）
line: 后处理与压缩
matrix_coords: [—, —, —]
---

# DAGGER

## 1. 一句话贡献

模仿学习的分布漂移定理：朴素模仿（行为克隆）误差随 horizon **平方累积**；DAGGER 用学生自己的状态分布迭代收集教师标签，误差线性收敛。

## 2. 核心贡献

1. 迭代式数据聚合：学生 rollout → 教师在学生到访的状态上给出正确动作 → 聚合数据集重训
2. regret 分析保证

## 3. 方法概要

迭代式数据聚合：学生 rollout → 教师在学生到访的状态上给出正确动作 → 聚合数据集重训。 regret 分析保证。
## 4. 核心公式


$$
\epsilon(T) \le \epsilon_{\text{BC}} + O\big(T\,\epsilon_{\text{expert}}\big)\ \text{vs}\ \epsilon_{\text{BC}}(T) = O\big(T^2\,\epsilon\big)
$$


## 5. 与前作/矩阵关系

→ [[On-Policy Distillation of Language Models- Learning from Self-Generated Mistakes（GKD）]]（LM 版 DAGGER）/ OPD 全家（RS 库与 Thinking Machines 博客均引其为思想源头）；#loss 关系：imitation 损失的分布失配定理

## 6. 影响与占位意义

B18 奠基补齐：OPD 家族的理论祖师爷，此前在多张卡里被引用却无卡可链（补齐后消除断链风险）。

> 近邻同族：[[Variational Autoencoders and Nonlinear ICA- A Unifying Framework（iVAE）]] · [[A Simple and Effective Pruning Approach for Large Language Models（SparseGPT）]]

> 相关：[[QLoRA- Efficient Finetuning of Quantized LLMs（QLoRA）]]

> 数学根基：[[蒸馏损失]] · [[量化]]


## 7. 读前须知

需要：马尔可夫性假设下的误差累积分析；regret 的定义（在线学习视角）；为什么平方误差累积是朴素模仿的死刑判决
