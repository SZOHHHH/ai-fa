---
type: paper
title: Soft Adaptive Policy Optimization
aliases: [SAPO]
year: 2025
authors: [Qwen Team (Alibaba)]
venue: arXiv 2025 / Qwen 技术报告
arxiv: "2511.20347"
line: 强化学习与对齐
matrix_coords: [GRPO系, 软门控, 在线RL]
tags: [paper]
---

# SAPO（软自适应策略优化）

## 1. 一句话贡献

把 PPO/[[GRPO与RLVR|GRPO]] 的**硬裁剪**换成温度控制的**平滑软门控**——更新幅度随状态自适应调制，LLM RL 训练稳定性大幅提升（Qwen 3.5 的 RL 配方）。

## 2. 核心贡献

- **软门控**：$\mathrm{clip}(\rho, 1{-}\epsilon, 1{+}\epsilon) \to$ sigmoid 形平滑函数（温度 τ 控制）
- **自适应**：门控参数随优化状态调整（越界梯度不再一刀切归零）
- 消融显示长 RL 训练（大规模推理任务）崩溃率显著低于硬裁剪基线

## 3. 方法概要

1. 保持 GRPO 组相对优势结构
2. 比率修正项换软门控：越界样本仍有小梯度（可回拉），门内样本梯度平滑过渡
3. 温度 τ 调度：训练早期宽容、后期收紧
4. 与 [[Group Sequence Policy Optimization（GSPO）|GSPO]]（序列级重要性）正交可组合

## 4. 核心公式

- 软门控版目标：$\mathcal{L} = \mathbb{E}[\sigma_\tau(\rho\text{-修正项}) \cdot \hat A]$（[[30-Formulas/PPO裁剪目标]] 的 min+clip 换 sigmoid 族）
- 与 [[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）]] 的 $\sigma$ 权重同族——**sigmoid 作为"软边界"的又一次登场**

## 5. 与前作的关系

- 改进了 [[30-Formulas/PPO裁剪目标]]（硬裁剪的梯度不连续问题）与 [[30-Formulas/GRPO目标]]（组内裁剪继承同样问题）
- 承接 [[10-Papers/04-强化学习与对齐/Group Sequence Policy Optimization（GSPO）]]（Qwen 自家前置：token 级→序列级比率）

## 6. 影响与后续

- Qwen 3.5 生产配方；"软门控 vs 硬裁剪"成为 RL 稳定化矩阵的独立轴
- 与 [[40-Concepts/温度参数]] 家族再添一员（门控温度）

## 7. 读前须知

[[30-Formulas/PPO裁剪目标]]（先懂硬裁剪四象限）、[[30-Formulas/GRPO目标]]、[[10-Papers/04-强化学习与对齐/Group Sequence Policy Optimization（GSPO）]]
