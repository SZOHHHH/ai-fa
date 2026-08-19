---
type: paper
title: Toolformer- Language Models Can Teach Themselves to Use Tools
aliases: [Toolformer]
year: 2023
authors: [Timo Schick et al. (Meta)]
venue: NeurIPS 2023
arxiv: "2302.04761"
pdf: 已下载（PDF/）
line: 多模态
matrix_coords: [提示触发, 链, 无奖励(上下文)]
tags: [paper]
---

# Toolformer

## 1. 一句话贡献

模型自学用工具：API 调用作为特殊 token 序列，自举筛选（保留能降 loss 的调用样本）——工具使用的自监督化。

## 2. 核心贡献

1. 候选 API 调用插入→比较有无调用的困惑度差→择优自举 SFT
2. 推理时自主决定何时调用

## 3. 方法概要

候选 API 调用插入→比较有无调用的困惑度差→择优自举 SFT；推理时自主决定何时调用。
## 4. 核心公式


$$
\text{keep}(c) \iff \Delta\text{ppl}(x \mid c) < -\tau\ \text{(降困惑度才保留)}
$$


**直觉**：→ [[ReAct- Synergizing Reasoning and Acting in Language Models（ReAct）]]（库内，推理×行动）；推理矩阵触发列的工具分支

## 5. 与前作/矩阵关系

工具使用训练化的起点；agent 线的地基

## 6. 影响后续

需要：困惑度作为价值信号的代理——自举思想的又一实例

## 7. 读前须知

undefined

> 近邻同族：[[BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]] · [[Chameleon- Mixed-Modal Early-Fusion Foundation Models（Chameleon）]]

> 数学根基：[[视觉语言模型（VLM）]]
