---
type: paper
title: Genie - Generative Interactive Environments
aliases: [Genie]
year: 2024
authors: [Bruce, Dennis, Edwards, et al.]
venue: ICML 2024
arxiv: "2402.15391"
line: 世界模型与JEPA
matrix_coords: [像素重建(生成式), 显式像素, 可操作(动作条件)]
tags: [paper]
---

# Genie（生成式交互环境）

## 1. 一句话贡献

从 20 万小时**无标签游戏视频**中无监督学出"基础世界模型"——每帧可以动作驱动地"走进去"交互，环境生成模型的开创。

## 2. 核心贡献

- **无监督动作发现**：ST-Transformer 猜隐动作（latent action model）——没人给标签，模型自己发现"玩家在按键"
- **可交互性**：给任意起始帧 + 动作序列 → 未来帧生成
- 11B 稀疏注意力时空 transformer

## 3. 方法概要

1. Latent Action Model：相邻帧间推隐动作（信息瓶颈防作弊）
2. Dynamics Model：给定当前帧+隐动作预测下一帧（时空注意力）
3. 通过 16 帧一致性训练
4. 推理：起始帧 + 用户动作 → 滚动生成交互世界

## 4. 核心公式

- 隐动作推断的互信息瓶颈（概念级）；架构用 [[40-Concepts/稀疏与线性注意力]] 时空稀疏注意力

## 5. 与前作的关系

- 与 [[20-Algorithms/世界模型]] 的"重建式"路线合流：世界模型可以从纯视频学
- 对比 [[40-Concepts/JEPA联合嵌入预测架构]]：Genie 生成像素、JEPA 拒绝生成——同年两大世界观

## 6. 影响与后续

- Genie 2（2024 末）：4K 交互世界生成（DeepMind）
- "生成模型当环境模拟器"路线确立（与 Sora 的世界模拟器论断互证）

## 7. 读前须知

[[20-Algorithms/世界模型]]、[[Scalable Diffusion Models with Transformers（DiT）|DiT]]（时空 transformer 骨干）、[[40-Concepts/JEPA联合嵌入预测架构]]（对照路线）

> 数学根基：[[注意力核心公式]] · [[CLIP对比损失]]
