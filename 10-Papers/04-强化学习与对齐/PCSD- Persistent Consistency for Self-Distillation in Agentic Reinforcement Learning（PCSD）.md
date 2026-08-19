---
type: paper
layer: 占位
title: PCSD- Persistent Consistency for Self-Distillation in Agentic Reinforcement Learning
aliases: [PCSD]
year: 2026
authors: [arXiv]
venue: arXiv 2026
arxiv: "2608.01837"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [—, 一致性, 自蒸馏]
tags: [paper, 占位层]
---

# PCSD- Persistent Consistency for Self-Distillation in Agentic Reinforcement Learning（PCSD·七节版）

## 1. 一句话贡献

agent RL 的持续一致性自蒸馏——一致性思想+自蒸馏进入 agent 训练。

## 2. 核心贡献

1. agent RL 的持续一致性自蒸馏
2. 一致性思想+自蒸馏进入 agent 训练。

## 3. 方法概要

跨 episode 持续的一致性目标稳定 agent 自蒸馏。

## 4. 核心公式

$$
\mathcal{L} = \mathrm{Consist}(\pi_\theta^{(k)}, \pi_\theta^{(k-1)})\ \text{持续自蒸馏}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 一致性×agent RL 交叉格；→ [[One Step Diffusion via Shortcut Models（Shortcut）]]（一致性家族）


## 6. 影响与占位意义

RS 库 08-03 情报；一致性家族应用面扩张。

> 近邻同族：[[A Survey on Hallucination in Large Language Models（Hallucination Survey）]] · [[Large Language Models as General Pattern Machines（Pattern Machines）]]
> 数学根基（占位层）：[[条件流匹配损失]] · [[注意力核心公式]]

## 7. 读前须知

需要：蒸馏损失族（前向 KL/反向 KL/矩匹配/分布匹配）；teacher-student 分布失配；fake score 的角色
