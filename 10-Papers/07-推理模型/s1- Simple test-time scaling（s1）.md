---
type: paper
title: s1 - Simple test-time scaling
aliases: [s1]
year: 2025
authors: [Muennighoff, Yang, Shi, et al.]
venue: arXiv 2025
arxiv: "2501.19393"
line: 推理模型
matrix_coords: [测试时延长, 链, 无奖励(调度)]
tags: [paper]
---

# s1（简单测试时扩展）

## 1. 一句话贡献

1K 条精挑数据 SFT + "预算强制"（budget forcing）——26 美元复刻 o1 级推理，证明测试时扩展可以极简。

## 2. 核心贡献

- **s1K 数据集**：1000 条"难度+多样性+质量"三重筛选的推理题
- **预算强制**：a) 未完时追加 "Wait" 逼模型自我检查延长思考；b) 已足时强制 "Final Answer" 截断
- 实证：测试时算力↑ → 性能单调↑（扩展曲线）

## 3. 方法概要

1. 数据：从 59k 池中按难度分层+多样性去重选 1k
2. Google Gemini 生成推理轨迹 + 人工校验
3. Qwen-32B 基座 SFT（不 RL）
4. 推理时控制思考预算（token 数/自我检查轮数）

## 4. 核心公式

- 无核心数学公式；贡献是数据与"预算控制"协议
- 扩展曲线：性能 vs 测试算力（与 [[10-Papers/01-架构演进/Scaling Laws for Neural Language Models（Scaling Laws）]] 的训练时定律对照——**测试时缩放定律**）

## 5. 与前作的关系

- 对比 [[10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）]]：纯 SFT 蒸馏 vs 纯 RL——推理能力的两条低成本路线
- 承接 [[Let's Verify Step by Step（PRM）|PRM]] 后的"蒸馏+测试控制"路线

## 6. 影响与后续

- "小数据大推理"论战开启（与 LIMO 等互证）
- 预算强制成为可控测试时计算的通用技巧

## 7. 读前须知

[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]]、[[10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）]]

> 数学根基：[[思维链（CoT）]]
