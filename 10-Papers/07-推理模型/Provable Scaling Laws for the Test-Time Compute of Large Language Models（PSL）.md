---
type: paper
layer: 占位
title: Provable Scaling Laws for the Test-Time Compute of Large Language Models
aliases: [PSL]
year: 2024
authors: [（arXiv，NeurIPS 2025）]
venue: arXiv 2024
arxiv: "2411.19477"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [测试时延长, 采样聚合, 理论]
tags: [paper, 占位层]
---

# Provable Scaling Laws for the Test-Time Compute of Large Language Models（PSL·七节版）

## 1. 一句话贡献

可证明的测试时算力标度律：两个简单算法（self-consistency 变体）的精度随测试时算力**可证明地**指数提升——榜 6"测试时标度律"的理论占位者，NeurIPS 2025 已中。

## 2. 核心贡献

1. 可证明的测试时算力标度律：两个简单算法（self-consistency 变体）的精度随测试时算力可证明地指数提升
2. 榜 6"测试时标度律"的理论占位者，NeurIPS 2025 已中。

## 3. 方法概要

在特定假设（自验证/例题生成）下证明错误率随采样数指数下降，给出显式指数与常数。

## 4. 核心公式

$$
\epsilon(n) \le C\,e^{-\alpha n},\ n=\text{测试时采样数},\ \alpha\ \text{与任务可验证性相关}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩🚩 **占 [[60-Matrices/推理增强矩阵]] "测试时延长×理论"机会格的主位**（榜 6 关闭）


## 6. 影响与占位意义

测试时标度律的理论格已被 NeurIPS 2025 收编——B9 榜 6 降级。

---

> 谱系枢纽：[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]]（图谱连通入口）
> 近邻同族：[[Controlled Decoding from Language Models（CD）]] · [[Large Language Monkeys- Scaling Inference Compute with Repeated Sampling（LL Monkeys）]]
> 数学根基（占位层）：[[注意力核心公式]]

## 7. 读前须知

需要：覆盖曲线 coverage@k；预算强制；采样聚合（多数投票）
