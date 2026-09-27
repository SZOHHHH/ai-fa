---
type: paper
title: When Can Agents Forget Their Reasoning? ICLR for Long-Horizon Agent Context Compression
aliases: []
year: 2026
authors: [Mingxuan, Wang]
venue: 待核（占位层，来自 arXiv 2026-09-24）
arxiv: "2609.29875v1"
pdf: 已下载（PDF/）
line: 推理模型
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# When Can Agents Forget Their Reasoning? ICLR for Long-Horizon Agent Context Compression

> **占位层卡**（daily 自动采集 2026-09-27 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Long horizon language model agents continually accumulate reasoning history, increasing context length and inference cost even after earlier decisions have been executed and observed. Unlike static Chain of Thought compression, removing historical reasoning can change future actions and the resulting interaction trajectory. We study when such reasoning can be safely forgotten. We propose Interaction Aware Compression for Long Horizon Reasoning (ICLR), a training free online method that ranks reasoning blocks using frozen proxy entropy while preserving actions, tool calls, and observations. On 

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/思维链（CoT）]]（压缩对象：智能体长程推理历史——"何时可安全遗忘"的判据问题）· [[40-Concepts/KV缓存]]（历史越长上下文与推理成本越高——压缩的动机侧）
- 同族：[[CoT-Valve- Length-Compressible Chain-of-Thought Tuning（CoT-Valve）]]（CoT-Valve 压"未来要生成的推理长度"；本文在线丢"已执行过的历史推理"，且强调遗忘会改变后续动作与交互轨迹——交互感知）· [[ReAct- Synergizing Reasoning and Acting in Language Models（ReAct）]]（推理-行动-观察交织的智能体轨迹正是本文的压缩场景）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
