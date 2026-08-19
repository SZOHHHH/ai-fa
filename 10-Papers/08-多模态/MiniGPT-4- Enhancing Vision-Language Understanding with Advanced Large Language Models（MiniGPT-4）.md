---
type: paper
title: MiniGPT-4 - Enhancing Vision-Language Understanding with Advanced Large Language Models
aliases: [MiniGPT-4]
year: 2023
authors: [Deyao Zhu, Jun Chen, Xiaoqian Shen, Xiang Li, Mohamed Elhoseiny]
venue: ICLR 2024
arxiv: "2304.10592"
line: 多模态
matrix_coords: [投影接口, 生成(条件LM), 接口级]
tags: [paper]
---

# MiniGPT-4

## 1. 一句话贡献

与 [[Visual Instruction Tuning（LLaVA）|LLaVA]] 同思路（线性投影接 LLM），亮点在"少量高质量图文对齐数据即可唤醒"——与 LLaVA 并列的早期开源 VLM 双子星。

## 2. 核心贡献

- **一层投影对齐**：Q-Former（BLIP-2 预训练）+ 线性层 → Vicuna
- **两阶段策略**：粗对齐（图文对）→ 精对齐（3.5k 高质量对话）
- 对 GPT-4 式图像描述能力的复现

## 3. 方法概要

1. 冻结 [[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）|ViT]]+Q-Former（BLIP-2 权重）
2. 线性层投影到 Vicuna
3. 第一阶段 5M 图文对粗对齐
4. 第二阶段 3.5k 精选指令数据微调

## 4. 核心公式

- 线性投影 + 语言建模损失（结构最简路线）

## 5. 与前作的关系

- 复用了 [[10-Papers/08-多模态/BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]] 的视觉塔
- 与 [[10-Papers/08-多模态/Visual Instruction Tuning（LLaVA）]] 同期平行——共同验证"投影+指令微调"路线

## 6. 影响与后续

- "少而精的第二阶段数据"经验被广泛采纳
- 开源 VLM 早期三杰（Flamingo范式/BLIP-2/LLaVA-MiniGPT4）之一

## 7. 读前须知

[[40-Concepts/视觉语言模型（VLM）]]、[[10-Papers/08-多模态/BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]]

> 近邻同族：[[BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]] · [[Flamingo- a Visual Language Model for Few-Shot Learning（Flamingo）]]

> 数学根基：[[三层感知机投影]] · [[CLIP对比损失]] · [[注意力核心公式]]
