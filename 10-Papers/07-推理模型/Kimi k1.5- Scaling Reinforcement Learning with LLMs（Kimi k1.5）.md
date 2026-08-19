---
type: paper
title: Kimi k1.5- Scaling Reinforcement Learning with LLMs
aliases: [Kimi k1.5]
year: 2025
authors: [Kimi Team (Moonshot)]
venue: arXiv 2025
arxiv: "2501.12599"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: [训练注入, 链, RLVR(可验证)]
tags: [paper]
---

# Kimi k1.5

## 1. 一句话贡献

RL 长上下文扩展的工程化：RL 训练稳定配方（mirrored sampling 损失抵消、长度惩罚调度）+ 多模态推理——R1 同期的产业对照。

## 2. 核心贡献

1. mirrored 采样（同 prompt 成对采样稳定优势）、out-of-policy 纠正、长度奖励调度
2. OCR-free 多模态

## 3. 方法概要

mirrored 采样（同 prompt 成对采样稳定优势）、out-of-policy 纠正、长度奖励调度；OCR-free 多模态。
## 4. 核心公式


$$
\mathcal{L} = \mathcal{L}_{\text{[[GRPO与RLVR|GRPO]]式}} + \text{len-penalty schedule}(t)\ \text{+ mirrored sampling}
$$


**直觉**：≡ R1（同期双雄）；→ [[s1- Simple test-time scaling（s1）|s1]]/[[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）|CoT]]-Valve（长度控制线）；与 [[Group Sequence Policy Optimization（GSPO）|GSPO]] 同厂（Qwen/Kimi 的 RL 稳定化分头探索）

## 5. 与前作/矩阵关系

产业级 RLVR 的完整披露（OpenRLHF 可复现口径）

## 6. 影响后续

需要：GRPO；本卡价值在工程配方而非新数学

## 7. 读前须知

undefined

> 近邻同族：[[CoT-Valve- Length-Compressible Chain-of-Thought Tuning（CoT-Valve）]] · [[Let's Verify Step by Step（PRM）]]

> 数学根基：[[思维链（CoT）]]
