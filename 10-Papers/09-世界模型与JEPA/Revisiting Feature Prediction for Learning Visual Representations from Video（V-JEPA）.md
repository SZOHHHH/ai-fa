---
type: paper
title: Revisiting Feature Prediction for Learning Visual Representations from Video
aliases: [V-JEPA]
year: 2024
authors: [Adrien Bardes, Quentin Garrido, Jean Ponce, et al.]
venue: arXiv 2024
arxiv: "2404.08471"
line: 世界模型与JEPA
matrix_coords: [特征预测(JEPA系), 潜在状态, 纯离线视频]
tags: [paper]
---

# V-JEPA（视频 JEPA）

## 1. 一句话贡献

把 I-JEPA 的"表征预测"搬进视频——遮住时空块、在表征空间预测，视频理解任务上自监督新 SOTA（LeCun 路线的视频主力）。

## 2. 核心贡献

- **时空遮罩预测**：遮挡视频块（大比例时空立方体）→ 预测其**表征**（不重建像素）
- **抗干扰鲁棒**：对纹理/物体形变天然稳健（不学像素细节）
- 运动理解/动作识别迁移优异

## 3. 方法概要

1. [[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）|ViT]] 编码器（EMA 目标塔）
2. 时空分块遮罩（如时空 90% 遮挡率）
3. 预测器按目标块位置回归目标表征
4. 下游微调/探针评测

## 4. 核心公式

- [[40-Concepts/JEPA联合嵌入预测架构]] §1（视频实例化）

## 5. 与前作的关系

- 扩展了 I-JEPA（同团队，图像 → 视频）
- 对照同期 [[10-Papers/09-世界模型与JEPA/Genie- Generative Interactive Environments（Genie）]]：预测表征 vs 生成像素——2024 世界模型两条路线的化身

## 6. 影响与后续

- [[10-Papers/09-世界模型与JEPA/V-JEPA 2- Self-Supervised Video Models Enable Understanding, Prediction and Planning（V-JEPA 2）]]（2025）直接续作：加动作条件与规划
- Meta 具身智能栈的感知基座

## 7. 读前须知

[[40-Concepts/JEPA联合嵌入预测架构]]、[[20-Algorithms/世界模型]]

> 数学根基：[[注意力核心公式]] · [[CLIP对比损失]]
