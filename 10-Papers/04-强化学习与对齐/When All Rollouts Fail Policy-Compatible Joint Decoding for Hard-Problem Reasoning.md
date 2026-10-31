---
type: paper
title: "When All Rollouts Fail: Policy-Compatible Joint Decoding for Hard-Problem Reasoning"
aliases: []
year: 2026
authors: [Zehao, Wang]
venue: 待核（占位层，来自 arXiv 2026-10-27）
arxiv: "2610.36849v1"
pdf: https://arxiv.org/pdf/2610.36849v1
line: 强化学习与对齐
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# When All Rollouts Fail: Policy-Compatible Joint Decoding for Hard-Problem Reasoning

> **占位层卡**（daily 自动采集 2026-10-28 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Reinforcement Learning with Verifiable Rewards (RLVR) derives its learning signal from binary rewards via on-policy exploration and becomes a powerful paradigm for improving the reasoning of large language models. Yet it faces a learning cliff on problems beyond model's current ability: when every rollout fails, the samples reveal nothing about a correct solution, and group-relative estimators (e.g., GRPO, RLOO) collapse the update to zero advantage. Expert trajectories offer a remedy, but they are incompatible with the current policy and often lie in the student's low-probability regions, so 

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/GRPO与RLVR]]（组相对估计零优势退化病的「全败组」极端情形——本文系统修法）· [[40-Concepts/重要性采样]]（混合行为目标的失配校正）
- ↔ 同病另方：[[10-Papers/04-强化学习与对齐/ThinkPrior Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR|ThinkPrior]]（零优势静默组的挑题修法——避开支路 vs 本文解码支路）；[[10-Papers/04-强化学习与对齐/Two Clocks Why Larger Rollout Batches Learn Slower but Fail on Schedule in Reinforcement Learning wi|Two Clocks]]（失败组动力学）
- ↔ 专家数据进 RLVR 通道：[[10-Papers/04-强化学习与对齐/Enabling Token-wise Importance Sampling in Off-Policy RLVR with Proximal KL Regularization|Token-wise IS]]（重要性采样支）· [[10-Papers/07-推理模型/MOER Mix-Policy Optimization under Expert Prefix Guidance with Selective Rollback|MOER]]（专家前缀引导支）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.36849v1；在线全文（新论文）：https://arxiv.org/html/2610.36849v1
