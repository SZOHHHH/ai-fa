---
type: paper
title: "Align, Integrate, and Fire: Efficient Token-Level Alignment for Zero-Shot SpeechLLMs"
aliases: []
year: 2026
authors: [Abderrahmane, Issam]
venue: 待核（占位层，来自 arXiv 2026-09-16）
arxiv: "2609.18516v1"
pdf: 已下载（PDF/）
line: 后处理
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Align, Integrate, and Fire: Efficient Token-Level Alignment for Zero-Shot SpeechLLMs

> **占位层卡**（daily 自动采集 2026-09-17 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：While Large Language Models excel in natural language processing, efficiently extending their capabilities to spoken input remains a significant challenge. Existing methods for building SpeechLLMs often rely on computationally expensive full-model fine-tuning, or employ parameter-efficient projectors that suffer from inefficient token sequence lengths and costly full-model supervision. In this paper, we introduce Aligned Continuous Integrate-and-Fire, a highly efficient framework for zero-shot speech processing. Our method dynamically compresses continuous acoustic frames into the exact discre

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/知识蒸馏]]（监督焦点蒸馏：微调段只对单个 LLM 层做 KD，替代全模型交叉熵）
- 近邻：[[20-Algorithms/参数高效微调（PEFT）]]（零样本/参数高效 SpeechLLM 路线的对比基线——投影器法 token 冗长+全模型监督贵，本文用 DTW 对齐把声学帧压到目标文本的精确 token 长度绕开两者）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
