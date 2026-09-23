---
type: paper
title: Qwen-VL- A Versatile Vision-Language Model for Understanding, Localization, Text Reading, and Beyond
aliases: [Qwen-VL]
year: 2023
authors: [Bai et al. (Qwen)]
venue: arXiv 2023
arxiv: "2308.12966"
pdf: 已下载（PDF/）
line: 多模态
matrix_coords: [投影接口, 生成(条件LM), 接口级]
tags: [paper]
---

# Qwen-VL

## 1. 一句话贡献

中文多模态旗舰起点：VL adapter（压缩视觉 token）+三阶段训练（预训练→多任务→指令），支持检测框定位输出。

## 2. 核心贡献

1. 视觉 token 压缩（Q-Former 式 adapter 到 256 token）
2. <box> 坐标文本化输出

## 3. 方法概要

视觉 token 压缩（Q-Former 式 adapter 到 256 token）；<box> 坐标文本化输出。
## 4. 核心公式


$$
V = \mathrm{Adapter}\big(\mathrm{[ViT](/ai-fa/explore/10-Papers/01-架构演进/An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）)}(I)\big) \to 256\ \text{tokens}\ \text{拼入 LLM 词表}
$$


**直觉**：→ Qwen-VL2/Qwen2.5-VL 谱系；≡ BLIP-2/[LLaVA](/ai-fa/explore/10-Papers/08-多模态/Visual Instruction Tuning（LLaVA）)（同期投影路线）

## 5. 与前作/矩阵关系

中文 VLM 生态锚点；RS 库常用模型家族的源头

## 6. 影响后续

需要：视觉 token 数量与信息量的权衡（256 是否够）——多模态矩阵"投影×信息瓶颈"问题的实例

## 7. 读前须知

undefined

> 近邻同族：[BLIP-2 - Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models](/ai-fa/explore/10-Papers/08-多模态/BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）) · [Flamingo - a Visual Language Model for Few-Shot Learning](/ai-fa/explore/10-Papers/08-多模态/Flamingo- a Visual Language Model for Few-Shot Learning（Flamingo）)

> 数学根基：[三层感知机投影](/ai-fa/explore/30-Formulas/三层感知机投影) · [CLIP对比损失](/ai-fa/explore/30-Formulas/CLIP对比损失) · [注意力核心公式](/ai-fa/explore/30-Formulas/注意力核心公式)
