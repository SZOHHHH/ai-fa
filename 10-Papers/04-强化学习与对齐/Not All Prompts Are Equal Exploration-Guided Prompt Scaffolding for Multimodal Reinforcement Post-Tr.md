---
type: paper
title: "Not All Prompts Are Equal: Exploration-Guided Prompt Scaffolding for Multimodal Reinforcement Post-Training"
aliases: []
year: 2026
authors: [Yuanhao, Yue]
venue: 待核（占位层，来自 arXiv 2026-09-14）
arxiv: "2609.15051v1"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Not All Prompts Are Equal: Exploration-Guided Prompt Scaffolding for Multimodal Reinforcement Post-Training

> **占位层卡**（daily 自动采集 2026-09-16 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Training prompts in online reinforcement learning (RL) differ substantially in how informative they are for the current policy: some are already saturated while others are too difficult to yield reliable learning signals, yet both receive equal rollout budget under standard training. We propose an exploration-guided prompt scaffolding framework that adapts the training prompt distribution dynamically throughout RL post-training of multimodal large language models (MLLMs). Central to our approach is the $\textit{Exploration Potential Score} (EPS)$, a lightweight rollout-based proxy for prompt u

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/GRPO与RLVR]]
- 数学根基：[[40-Concepts/KL散度]]（EPS 由 KL 正则策略改进理论导出，on-policy rollout 统计零开销直算）
- 近邻同族：[[ThinkPrior Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR]]（同族互补：ThinkPrior 管训练前冷启动选 prompt（零 rollout 难度先验避零优势组），本文管训练全程动态改 prompt 分布——低效用 prompt 由教师模型脚手架改写而非丢弃，两卡互挂）· [[DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）]]（动态采样同区：DAPO 丢无效组、本文改造无效 prompt）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
