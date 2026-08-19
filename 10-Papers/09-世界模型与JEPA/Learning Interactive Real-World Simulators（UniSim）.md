---
type: paper
title: Learning Interactive Real-World Simulators
aliases: [UniSim]
year: 2023
authors: [Yang et al. (Google/DeepMind)]
venue: NeurIPS 2023
arxiv: "2310.06114"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [隐式(视频自监督), 显式像素, 交互模拟]
tags: [paper]
---

# UniSim

## 1. 一句话贡献

真实世界交互模拟器：视频+动作标注的统一生成式交互模型——Genie 系的交互模拟器前身。

## 2. 核心贡献

1. 以动作为条件生成下一帧（视频扩散+文本+动作联合条件）

## 3. 方法概要

以动作为条件生成下一帧（视频扩散+文本+动作联合条件）。
## 4. 核心公式


$$
x_{t+1} \sim p_\theta(\cdot\ \vert\ x_{\le t},\ a_t,\ \text{text})
$$


**直觉**：→ [[Genie- Generative Interactive Environments（Genie）]]（库内，自发潜动作）/Genie 2；世界模型矩阵交互模拟列的补位

## 5. 与前作/矩阵关系

交互式生成模拟器谱系的关键节点（动作显式 vs Genie 隐式）

## 6. 影响后续

需要：视频生成的动作条件化

## 7. 读前须知

undefined

> 近邻同族：[[Co-Evolving Latent Action World Models（CoLA）]] · [[Factored Latent Action World Models（FLAM）]]

> 数学根基：[[JEPA联合嵌入预测架构]]

> 数学根基：[[REINFORCE目标]]
