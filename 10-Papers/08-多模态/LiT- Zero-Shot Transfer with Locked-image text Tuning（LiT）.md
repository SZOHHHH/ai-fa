---
type: paper
title: LiT - Zero-Shot Transfer with Locked-image text Tuning
aliases: [LiT]
year: 2021
authors: [Xiaohua Zhai, Alexander Kolesnikov, Ben Hou, et al.]
venue: CVPR 2022
arxiv: "2111.07991"
line: 多模态
matrix_coords: [对比接口, 匹配, 接口级]
tags: [paper]
---

# LiT（锁定图像调文本）

## 1. 一句话贡献

"锁定预训练视觉塔、只训文本塔"——证明对齐的关键在**文本侧适配**，图像侧无需微调，[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）|CLIP]] 训练范式的消融式简化。

## 2. 核心贡献

- **锁定-调优范式**：冻结强视觉模型（如 [[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）|ViT]]/CLIP 编码器），文本塔从零学对齐
- 发现：视觉塔的预训练质量决定上限；文本塔轻量即可对齐
- 零样本分类与检索的系统性对照

## 3. 方法概要

1. 视觉编码器冻结（监督或自监督预训练）
2. 文本塔随机初始化，对比学习只训它
3. 零样本评测分类/检索

## 4. 核心公式

- 复用 [[30-Formulas/CLIP对比损失]]（单向可训的双塔）

## 5. 与前作的关系

- 消融式改进 [[10-Papers/08-多模态/Learning Transferable Visual Models From Natural Language Supervision（CLIP）]]：两塔同训 → 一锁一训
- 与 [[10-Papers/08-多模态/BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）]]/[[Visual Instruction Tuning（LLaVA）|LLaVA]] 的"冻结复用"精神一脉

## 6. 影响与后续

- "冻结大模型+轻适配"在多模态的先声（比 BLIP-2 早一年）
- 对齐研究的方法论模板（控制变量）

## 7. 读前须知

[[30-Formulas/CLIP对比损失]]、[[10-Papers/08-多模态/Learning Transferable Visual Models From Natural Language Supervision（CLIP）]]

> 近邻同族：[[Learning Transferable Visual Models From Natural Language Supervision（CLIP）]] · [[Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision（ALIGN）]]
