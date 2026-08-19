---
type: paper
title: Mastering Diverse Domains through World Models
aliases: [DreamerV3]
year: 2023
authors: [Danijar Hafner, Jurgis Pasukonis, Jimmy Ba, Timothy Lillicrap]
venue: arXiv 2023
arxiv: "2301.04104"
line: 世界模型与JEPA
matrix_coords: [奖励驱动(RL内部模型), 潜在状态, 游戏控制(RL)]
tags: [paper]
---

# DreamerV3

## 1. 一句话贡献

首个跨 150+ 任务**同一套超参**的通用世界模型 RL——并在 Minecraft 无人类数据采到钻石，模型基 RL 的规模化里程碑。

## 2. 核心贡献

- **跨域稳定性**：symlog 预测、免归一化细节等一揽子工程
- **离散隐状态**（V2 延续）：categorical latent 替代高斯——训练更稳
- **规模证据**：小→大模型随规模变强（世界模型也吃规模定律）

## 3. 方法概要

1. RSSM 骨架（离散 z）+ symlog 编码幅度跨域
2. 想象 actor-critic（免费比特、KL 平衡等稳定项）
3. 零任务调参跑 150 域（Crafter/Atari/DMC…）
4. Minecraft：探索引导 + 长程信用

## 4. 核心公式

- 沿用 [[20-Algorithms/世界模型]] §3；离散 z 的直通梯度同 [[30-Formulas/VQ-VAE目标]] 家族

## 5. 与前作的关系

- 稳定化了 [[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）|Dreamer]]（V1）与 V2
- 时代背景：与 [[10-Papers/01-架构演进/Scaling Laws for Neural Language Models（Scaling Laws）]] 呼应——世界模型的"规模化可行性"证明

## 6. 影响与后续

- "第一个通用 RL 算法"候选；具身/游戏 AI 标配基线
- 2024–25：DayDreamer（实体机器人）等延伸

## 7. 读前须知

[[10-Papers/09-世界模型与JEPA/Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]、[[20-Algorithms/世界模型]]
