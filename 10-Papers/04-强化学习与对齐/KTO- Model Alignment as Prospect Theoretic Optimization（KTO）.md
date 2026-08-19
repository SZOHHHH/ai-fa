---
type: paper
title: KTO - Model Alignment as Prospect Theoretic Optimization
aliases: [KTO]
year: 2024
authors: [Kawin Ethayarajh, Winston Chung, Yu Sun, et al.]
venue: ICML 2024
arxiv: "2402.01306"
line: 强化学习与对齐
matrix_coords: [评分/排序, 闭式/单侧, 有]
tags: [paper]
---

# KTO

## 1. 一句话贡献

把偏好优化从"成对比较"解放到"单标签点赞/点踩"——用前景理论（Kahneman–Tversky）对好坏反馈不对称加权。

## 2. 核心贡献

- **数据形态革命**：无需构造 $(y^+, y^-)$ 对，直接用独立的好/坏样本
- **前景理论加权**：损失规避——坏样本的修正权重高于好样本的强化
- **基准点机制**：好坏判定相对当前模型平均水平动态校准

## 3. 方法概要

1. 数据：每条样本仅带 good/bad 标签（与用户反馈数据天然对齐）
2. 计算 $z_0$（参考模型对数比 + KL 均值构成的基准点）
3. 好支：鼓励超过基准；坏支：惩罚低于基准（λ 非对称）
4. 两支期望加权求和，端到端训练

## 4. 核心公式

- [[30-Formulas/KTO损失]]

## 5. 与前作的关系

- 重构了 [[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）|DPO]] 的数据假设（BT 成对 → 前景理论单点）
- 理论地基于 Kahneman–Tversky 1979（经济学心理学，诺奖工作）——跨学科输入的范例

## 6. 影响与后续

- 生产环境反馈（点赞点踩）可直接入训——数据管道成本骤降
- 前景理论进入 ML 主流视野

## 7. 读前须知

[[30-Formulas/DPO损失]]、[[40-Concepts/KL散度]]

> 近邻同族：[[Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena（LLM-as-Judge）]] · [[RewardBench- Evaluating Reward Models for Language Modeling（RewardBench）]]
