---
type: paper
title: Self-Consistency Improves Chain of Thought Reasoning in Language Models
aliases: [Self-Consistency]
year: 2022
authors: [Xuezhi Wang, Jason Wei, Dale Schuurmans, et al.]
venue: ICLR 2023
arxiv: "2203.11171"
line: 推理模型
matrix_coords: [提示触发, 采样聚合, 无奖励(投票)]
tags: [paper]
---

# Self-Consistency（自洽性）

## 1. 一句话贡献

采样多条思维链、对最终答案投票——"多条路通向同一答案的更可信"，零训练的推理增强。

## 2. 核心贡献

- **多数投票法**：温度采样 N 条 [[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]] → 答案聚类 → 取众数
- **边缘化视角**：单条链 $p(y\mid x)$ 的贪心估计 → $\sum_z p(y, z \mid x)$ 的近似（对推理路径积分掉不确定性）
- GSM8K +17.9% 等全面提升

## 3. 方法概要

1. 温度采样（T≈0.7）N 条推理链（N=40 常用）
2. 提取每条链的最终答案
3. 答案等价类聚类投票
4. 众数答案输出

## 4. 核心公式

- $p(y \mid x) = \sum_z p(y, z \mid x)$ 的蒙特卡洛近似（[[40-Concepts/期望]]）——Self-Consistency 是"答案空间"的边缘化

## 5. 与前作的关系

- 增强了 [[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]：单链 → 多链集成
- 是 test-time compute scaling（o1 之前）的朴素形态

## 6. 影响与后续

- 测试时计算范式的先声：算力花在推理时
- R1 时代 [[GRPO与RLVR|GRPO]] 的组采样（G 条轨迹）与它形式同构——**组基线思想的推理版前身**

## 7. 读前须知

[[40-Concepts/思维链（CoT）]]、[[40-Concepts/期望]]、[[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]

> 数学根基：[[条件流匹配损失]] · [[注意力核心公式]]
