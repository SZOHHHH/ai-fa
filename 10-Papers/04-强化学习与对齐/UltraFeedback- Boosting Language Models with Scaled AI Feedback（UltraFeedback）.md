---
type: paper
title: UltraFeedback- Boosting Language Models with Scaled AI Feedback
aliases: [UltraFeedback]
year: 2023
authors: [Cui et al.]
venue: ICML 2024
arxiv: "2310.01377"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [AI反馈, BT排序损失, 有]
tags: [paper]
---

# UltraFeedback

## 1. 一句话贡献

规模化 AI 反馈数据集：64K 提示 × GPT-4 打分+文字批注——从数据侧把 AI 反馈做成的标准管线。

## 2. 核心贡献

1. 细粒度指令遵循/真实性/诚实/有用四维打分
2. 直接 [[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）|DPO]] 训练（无需 RM 阶段）

## 3. 方法概要

细粒度指令遵循/真实性/诚实/有用四维打分；直接 [[Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）|DPO]] 训练（无需 RM 阶段）。
## 4. 核心公式


$$
\text{UltraFeedback} \to \text{DPO}\ \text{(评分→偏好对)}
$$


**直觉**：→ [[偏好优化矩阵]]；DPO 数据管线的事实标准之一

## 5. 与前作/矩阵关系

AI 反馈的质量/规模化争议的起点之一

## 6. 影响后续

需要：DPO；"打分→构造偏好对"的数据工程模式

## 7. 读前须知

undefined

> 近邻同族：[[Constitutional AI- Harmlessness from AI Feedback（CAI）]] · [[A General Language Assistant as a Laboratory for Alignment（Assistant Lab）]]

> 数学根基：[[策略梯度定理]]

> 数学根基：[[REINFORCE目标]]
