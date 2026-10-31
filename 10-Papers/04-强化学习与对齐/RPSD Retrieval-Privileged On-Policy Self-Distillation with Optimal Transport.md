---
type: paper
title: "RPSD: Retrieval-Privileged On-Policy Self-Distillation with Optimal Transport"
aliases: []
year: 2026
authors: [Dongyue, Li]
venue: 待核（占位层，来自 arXiv 2026-10-27）
arxiv: "2610.37281v1"
pdf: https://arxiv.org/pdf/2610.37281v1
line: 强化学习与对齐
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# RPSD: Retrieval-Privileged On-Policy Self-Distillation with Optimal Transport

> **占位层卡**（daily 自动采集 2026-10-28 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Sequential recommendation predicts a user's next interaction from historical behavior. Recent LLM-based methods recast this task as generative recommendation and increasingly adopt reinforcement learning such as GRPO for post-training. However, these methods suffer from two limitations, namely credit-blind optimization, where a sequence-level reward is shared across all generated tokens, and collaborative-blind supervision, where each training signal is derived from a single user and ignores behavioral patterns shared across similar users. To address both issues, we propose Retrieval-Privilege

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/GRPO与RLVR]]（GRPO 后训练两大缺陷的动机起点）· [[40-Concepts/知识蒸馏]]（师生置信度差=蒸馏信号）· [[40-Concepts/重要性采样]]
- ← 范式前身：[[10-Papers/04-强化学习与对齐/Self-Distilled Reasoner- On-Policy Self-Distillation for Large Language Models（OPSD）|OPSD]]（LLM 在线自蒸馏开创——本文=其「序列推荐+检索特权教师+OT 跨用户证据」域移植）；[[10-Papers/04-强化学习与对齐/On-Policy Distillation（Thinking Machines 博客）|On-Policy Distillation]]
- ↔ 同域 RL 后训练：[[10-Papers/04-强化学习与对齐/VARG Value-Aware and Ranking-Aligned Generative Retrieval for Dynamic E-commerce Search|VARG]]（生成式检索×价值对齐——推荐/检索域 GRPO 族）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.37281v1；在线全文（新论文）：https://arxiv.org/html/2610.37281v1
