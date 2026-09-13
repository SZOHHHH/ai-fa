---
type: paper
title: "ThinkPrior: Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR"
aliases: []
year: 2026
authors: [Tommy, Sha]
venue: 待核（占位层，来自 arXiv 2026-09-08）
arxiv: "2609.09075v1"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# ThinkPrior: Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR

> **占位层卡**（daily 自动采集 2026-09-09 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：In reinforcement learning with verifiable rewards (RLVR) trained with group relative policy optimization (GRPO), the KL-free reward-advantage term studied here depends on within-group reward variation. If all rollouts in a group are correct or all are wrong, their group-relative advantages are identically zero; these zero-advantage silent groups provide no reward-advantage gradient, yet uniform sampling spends 39% of a run's rollouts on them. History-based prompt selection must first spend target-policy rollouts to estimate difficulty, creating a cold start with rollout waste; ThinkPrior inste

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/GRPO与RLVR]] · 数学根基 [[30-Formulas/GRPO目标]]（零优势静默组=组相对优势结构问题）
- 近邻同族：[[GRPO is Secretly a Process Reward Model（GRPO-PRM）]]（同查 GRPO 组内信号结构）· [[DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）]]（动态采样同样对付全对/全错组浪费；ThinkPrior 改在数据侧选 prompt，省掉 rollout）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）（处理段补档成功，EOF 校验过）
