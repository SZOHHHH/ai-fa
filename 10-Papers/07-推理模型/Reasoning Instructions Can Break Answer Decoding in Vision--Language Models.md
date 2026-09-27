---
type: paper
title: Reasoning Instructions Can Break Answer Decoding in Vision--Language Models
aliases: []
year: 2026
authors: [Zeyan, Li]
venue: 待核（占位层，来自 arXiv 2026-09-24）
arxiv: "2609.29278v1"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Reasoning Instructions Can Break Answer Decoding in Vision--Language Models

> **占位层卡**（daily 自动采集 2026-09-27 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Chain-of-thought (CoT) instructions can distort multiple-choice VLM evaluation when a scorer appends a reasoning cue but reads answer-label logits before the model generates any rationale. We call this CoT-prefix scoring. On ScienceQA, Qwen2.5-VL-7B drops from 80.76% to 45.48%, and across five option-content permutations 93.54% of CoT-prefix predictions select the first slot. Condition-matched linear probes recover 78.94% from the same hidden states, while free generation restores 75.24%, showing that the answer often survives the prefix and the immediate readout fails. Vocabulary and layer di

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/视觉语言模型（VLM）]]（病灶载体：多选 VLM 评测的读出接口）· [[40-Concepts/思维链（CoT）]]（病理诱因：续写型 CoT 前缀）· [[40-Concepts/位置编码]]（93.5% 首槽默认——标签-位置耦合偏置）
- 同族：[[GPT-4 Doesn t Know It s Wrong- An Analysis of Iterative Prompting for Reasoning Problems（GPT4-Wrong）]]（评测方法学病理同族：评测接口失真使测分偏离真实能力）· [[Chain-of-Thought Entropy as a Reliability Signal A Preregistered Reproduction]]（CoT 可靠性信号线：读出/信号侧的病症证据）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
