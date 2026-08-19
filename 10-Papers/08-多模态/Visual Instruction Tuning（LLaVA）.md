---
type: paper
title: Visual Instruction Tuning
aliases: [LLaVA]
year: 2023
authors: [Haotian Liu, Chunyuan Li, Qingyang Wu, Yong Jae Lee]
venue: NeurIPS 2023
arxiv: "2304.08485"
line: 多模态
matrix_coords: [投影接口, 生成(条件LM), 接口级]
tags: [paper]
---

# LLaVA（视觉指令微调）

## 1. 一句话贡献

[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]] 视觉编码 + 一层线性投影 + LLM + GPT-4 生成的指令数据——最简 VLM 走通"视觉指令微调"，开源多模态的标准起点。

## 2. 核心贡献

- **极简投影**：视觉特征 → MLP → LLM 词嵌入空间（无 Q-Former 等复杂桥）
- **指令数据合成**：GPT-4 只看 caption 生成多模态指令对话（15 万条）
- 端到端微调（视觉塔冻结或可调）

## 3. 方法概要

1. CLIP [[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）|ViT]] 出图像特征（最后一层前的网格特征）
2. 线性投影到 LLM（Vicuna）隐藏维
3. GPT-4 生成的 158k 指令数据微调
4. 两阶段：对齐预训练 → 指令微调

## 4. 核心公式

- $H_v = W \cdot \text{CLIP}(x) $（一层投影）；训练即语言建模损失

## 5. 与前作的关系

- 简化了 [[10-Papers/08-多模态/Flamingo- a Visual Language Model for Few-Shot Learning（Flamingo）]]/[[10-Papers/08-多模态/BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]] 的桥接（"最简单的连接往往够了"）
- 组件来源：[[10-Papers/08-多模态/Learning Transferable Visual Models From Natural Language Supervision（CLIP）]] + LLaMA 系

## 6. 影响与后续

- LLaVA-1.5/1.6 系列成为开源 VLM 标准基线
- "指令数据合成"方法论扩散（文本/多模态/具身）

## 7. 读前须知

[[40-Concepts/视觉语言模型（VLM）]]、[[10-Papers/08-多模态/Learning Transferable Visual Models From Natural Language Supervision（CLIP）]]

> 数学根基：[[三层感知机投影]] · [[CLIP对比损失]] · [[注意力核心公式]]
