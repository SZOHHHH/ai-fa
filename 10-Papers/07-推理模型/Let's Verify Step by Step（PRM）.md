---
type: paper
title: Let's Verify Step by Step
aliases: [PRM, Let's Verify]
year: 2023
authors: [Hunter Lightman, Vineet Kosaraju, Yura Burda, et al.]
venue: ICLR 2024
arxiv: "2305.20050"
line: 推理模型
matrix_coords: [训练注入, 链, 过程奖励(PRM)]
tags: [paper]
---

# Let's Verify Step by Step（PRM）

## 1. 一句话贡献

系统对比过程奖励（PRM）与结果奖励（ORM）：PRM 引导的 best-of-N 一致大幅胜出——"每步批改"的价值实证。

## 2. 核心贡献

- **PRM800K**：80 万步级人工标注数据集（数学推理）
- **蒙特卡洛标注法**：每步后采样完成，用最终正确率估计该步价值 $V(z_t)$——绕开逐步人工"对错"判断的歧义
- PRM vs ORM 大规模对照：PRM 全面优（MATH best-of-N +11.6%）

## 3. 方法概要

1. 对每步采样 N 条后继完成，统计最终正确率 → 该步得分
2. 训练 PRM（逐步打分头）
3. 评测：best-of-N 按步分数加权选答案
4. 与 ORM（答案级）和自制 ORM（GPT-4 标注）对照

## 4. 核心公式

- $V(z_t) \approx \hat P(\text{最终正确} \mid z_{\le t})$（[[40-Concepts/过程奖励与结果奖励（PRM-ORM）]] §2）
- 结构上是 [[40-Concepts/贝尔曼方程]] 的蒙特卡洛价值估计——PRM = 推理的 critic

## 5. 与前作的关系

- 正面检验了 [GSM8K verifier（Cobbe 2021）] 的 ORM 路线——过程粒度完胜
- 与 [[GRPO与RLVR]] 的规则 ORM 形成路线对照（OpenAI PRM 派 vs DeepSeek 规则派）

## 6. 影响与后续

- o1 的"推测配方"最接近的公开线索（OpenAI 时代推理 RL 的信号设计）
- Math-Shepherd 等开源 PRM 复现路线

## 7. 读前须知

[[40-Concepts/过程奖励与结果奖励（PRM-ORM）]]、[[40-Concepts/贝尔曼方程]]、[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]]

> 数学根基：[[思维链（CoT）]]
