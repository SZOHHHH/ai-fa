---
type: paper
title: "StepBack: Step-Level Error-Localized Resampling for Efficient Test-Time Reasoning"
aliases: []
year: 2026
authors: [Yang, Ouyang]
venue: 待核（占位层，来自 arXiv 2026-11-05）
arxiv: "2611.08403v1"
pdf: https://arxiv.org/pdf/2611.08403v1
line: 推理模型
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# StepBack: Step-Level Error-Localized Resampling for Efficient Test-Time Reasoning

> **占位层卡**（daily 自动采集 2026-11-08 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Self-consistency (SC) is a widely used decoding strategy for improving chain-of-thought reasoning, but it requires sampling many complete reasoning trajectories with a preset budget. Its efficient variants reduce the cost mainly by stopping full-trajectory sampling early or distributing the number of samples across questions. In this paper, we propose StepBack, a step-level error-localized resampling method for efficient test-time reasoning. Given a small set of draft trajectories, StepBack localizes likely first error positions using lightweight signals and then resamples the detected error s

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← 直接前身：[[10-Papers/07-推理模型/Self-Consistency Improves Chain of Thought Reasoning in Language Models（Self-Consistency）|Self-Consistency]]（整条轨迹重采样 → 步级定位后只重采错误后缀）
- ≡ 步级信号同族：[[10-Papers/07-推理模型/Let's Verify Step by Step（PRM）|PRM]] / [[10-Papers/07-推理模型/Math-Shepherd- Verify and Reinforce LLMs Step-by-step without Human Annotations（Math-Shepherd）|Math-Shepherd]]（步级验证器用于训练奖励）——本文用轻量信号定位"首个错误步"用于测试时重采样，同一信号两用
- 概念链：[[40-Concepts/思维链（CoT）]] · [[40-Concepts/过程奖励与结果奖励（PRM-ORM）]]（步级监督信号的价值证据）；可与 Adaptive Consistency 叠加

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.08403v1；在线全文（新论文）：https://arxiv.org/html/2611.08403v1
