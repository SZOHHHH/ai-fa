---
type: paper
title: V-JEPA 2 - Self-Supervised Video Models Enable Understanding, Prediction and Planning
aliases: [V-JEPA 2]
year: 2025
authors: [Adrien Bardes, Quentin Garrido, David Yan, et al.]
venue: arXiv 2025
arxiv: "2506.09985"
line: 世界模型与JEPA
matrix_coords: [特征预测(JEPA系), 潜在状态, 可操作(动作条件)]
tags: [paper]
---

# V-JEPA 2

## 1. 一句话贡献

100 万小时视频 + 62 小时机器人数据训练的 JEPA 世界模型——理解、预测、规划三合一，机器人操控零样本规划实证。

## 2. 核心贡献

- **规模化 JEPA**：视频预训练（1M 小时）+ 机器人动作数据适配
- **动作条件预测器**：$s_{t+1} = \text{pred}(s_t, a)$ 在潜空间——世界模型可直接用于规划
- **零样本机器人规划**：MPC 在潜空间 rollout 选动作，真实机械臂任务免训练完成

## 3. 方法概要

1. V-JEPA 骨干海量视频预训练
2. 加动作条件预测头（62h Droid 机器人数据）
3. 规划：潜空间想象 rollout + 采样优化动作序列（MPC）
4. 评测：感知基准 + 机器人操控零样本

## 4. 核心公式

- [[40-Concepts/JEPA联合嵌入预测架构]] + 动作条件化（[[20-Algorithms/世界模型]] §3 的 JEPA 实例）

## 5. 与前作的关系

- 扩展了 [[10-Papers/09-世界模型与JEPA/Revisiting Feature Prediction for Learning Visual Representations from Video（V-JEPA）]]：理解 → 预测+规划
- 与 [[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）|Dreamer]] 系对照：同样"想象中规划"，但学的是抽象表征而非像素重建（LeCun 蓝图的落地）

## 6. 影响与后续

- LeCun 世界模型纲领的最完整公开实现
- 具身智能"视频预训练+少量机器人数据"范式获得强证据

## 7. 读前须知

[[40-Concepts/JEPA联合嵌入预测架构]]、[[20-Algorithms/世界模型]]、[[10-Papers/09-世界模型与JEPA/Revisiting Feature Prediction for Learning Visual Representations from Video（V-JEPA）]]
