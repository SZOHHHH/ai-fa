---
type: paper
title: Group Sequence Policy Optimization
aliases: [GSPO]
year: 2025
authors: [Qwen Team (Alibaba)]
venue: arXiv 2025
arxiv: "2507.18071"
line: 强化学习与对齐
matrix_coords: [PPO系, 序列级重要性, 在线RL]
tags: [paper]
---

# GSPO（组序列策略优化）

## 1. 一句话贡献

把重要性采样比率的粒度从 **token 级**升到**序列级**——整条回答一个比率，LLM RL 长序列训练的方差与稳定性痛点修复（Qwen3 的 RL 底座）。

## 2. 核心贡献

- **序列级比率**：$\rho_{\text{seq}} = \exp\frac{1}{|y|}\sum_t \log\frac{\pi_\theta}{\pi_{\text{old}}}$（几何平均 token 概率比）
- 方差分析：token 级比率的长序列乘积爆炸问题被几何平均消解
- Qwen3 生产验证

## 3. 方法概要

1. [[GRPO与RLVR|GRPO]] 的组相对优势保留
2. PPO 裁剪作用于序列级比率（单值）而非逐 token
3. 理论：序列级比率的偏差-方差权衡优于 token 级

## 4. 核心公式

- $\rho_{\text{seq}}$ 如上——[[30-Formulas/PPO裁剪目标]] 的 $\rho_t$ 换成序列聚合版
- 几何平均 ≈ [[30-Formulas/SimPO损失]] 的长度归一化思想（对数域平均）——跨线呼应

## 5. 与前作的关系

- 改进了 [[30-Formulas/GRPO目标]]（token 级裁剪在长推理链上的失稳）
- 被 [[Soft Adaptive Policy Optimization（SAPO）|SAPO]] 继承发展（序列级 + 软门控）

## 6. 影响与后续

- Qwen3 全系 RL 基座；"比率粒度"成为 RL 稳定化矩阵的轴（token/序列/组）
- 学术界跟进序列级重要性分析

## 7. 读前须知

[[30-Formulas/PPO裁剪目标]]、[[30-Formulas/GRPO目标]]、[[10-Papers/04-强化学习与对齐/Soft Adaptive Policy Optimization（SAPO）]]
