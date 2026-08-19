---
type: paper
title: Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters
aliases: [Test-Time Compute Scaling, Snell Scaling]
year: 2024
authors: [Charlie Snell, Jaehoon Lee, Kelvin Xu, Aviral Kumar]
venue: ICLR 2025
arxiv: "2408.03314"
line: 推理模型
matrix_coords: [测试时延长, 采样聚合, 算力调度]
tags: [paper]
---

# 测试时计算扩展（Snell）

## 1. 一句话贡献

系统绘制"测试时算力 vs 准确率"曲线并给出最优分配策略——小模型+更多推理算力可胜过大模型，test-time scaling 的定量科学。

## 2. 核心贡献

- **两种轴**：搜索式（并行多采样/树）vs 顺序式（长链自我修正）——各有适用难度区间
- **算力最优分配**：按问题难度自适应选策略（难题顺序搜索、中等题并行+验证器）
- **小胜大**：PaLM-2 unicorn 级别模型 + 适中测试算力 > 14× 大模型（特定基准）

## 3. 方法概要

1. 限定算力预算下的两种推理策略扫描
2. 验证器（[[Let's Verify Step by Step（PRM）|PRM]]）给并行采样 rerank
3. 顺序修订模型自我纠错
4. 拟合 compute-accuracy 曲线，与模型规模曲线对照

## 4. 核心公式

- 准确率函数 $A(C_{\text{test}}, N_{\text{model}})$ 的经验刻画——"两种缩放定律的等值线"（与 [[10-Papers/01-架构演进/Scaling Laws for Neural Language Models（Scaling Laws）]] 的训练时定律并列）
- 与 [[s1- Simple test-time scaling（s1）]]：本文是科学、s1 是工程配方

## 5. 与前作的关系

- 定量化了 [[10-Papers/07-推理模型/Self-Consistency Improves Chain of Thought Reasoning in Language Models（Self-Consistency）]]（并行）与 [[10-Papers/07-推理模型/Tree of Thoughts- Deliberate Problem Solving with Large Language Models（ToT）]]（搜索）的算力-收益关系
- o1 时代（2024.9）前的公开理论基础

## 6. 影响与后续

- "测试时缩放定律"成为新研究方向；推理模型经济学（何时用大模型/小模型+思考）
- 后续：Della 等自适应预算分配工作

## 7. 读前须知

[[10-Papers/10-标杆锚点/Training Compute-Optimal Large Language Models（Chinchilla）]]（训练时对照）、[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]]、[[40-Concepts/过程奖励与结果奖励（PRM-ORM）]]

> 近邻同族：[[Controlled Decoding from Language Models（CD）]] · [[Large Language Monkeys- Scaling Inference Compute with Repeated Sampling（LL Monkeys）]]

> 数学根基：[[思维链（CoT）]]
