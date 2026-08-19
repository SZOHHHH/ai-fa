---
type: paper
title: Diffusion for World Modeling- Visual Details Matter in Atari
aliases: [DIAMOND]
year: 2024
authors: [Eloi Alonso, Adam Jelley, et al. (UCL/DeepMind)]
venue: NeurIPS 2024
arxiv: "2405.12399"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [像素重建(生成式), 显式像素, 游戏控制(RL)]
tags: [paper]
---

# DIAMOND

## 1. 一句话贡献

**扩散世界模型直接做 Atari 的 RL**：不用潜空间压缩，证明扩散的像素级细节就是价值所在（Stargate 门必须在帧里才学得会）——**RS 主线锚点，蒸馏对象**。

## 2. 核心贡献

1. 扩散模型预测下一帧（噪声条件在动作上），agent 在扩散世界模型内想象训练
2. 关键发现：模糊的后遗症（RSSM 类潜模型丢细节）直接伤策略——像素保真度与 RL 性能正相关

## 3. 方法概要

扩散模型预测下一帧（噪声条件在动作上），agent 在扩散世界模型内想象训练；关键发现：模糊的后遗症（RSSM 类潜模型丢细节）直接伤策略——像素保真度与 RL 性能正相关。
## 4. 核心公式


$$
p_\theta(x_t \mid x_{<t}, a_{<t})\ \text{扩散去噪},\ \hat Q, \hat \pi\ \text{在想象轨迹上训练}
$$


**直觉**：扩散世界模型的"细节即价值"证据：潜压缩模型（[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）|Dreamer]] 系）丢失的细粒度信息恰是策略需要的

## 5. 与前作/矩阵关系

NeurIPS 2024；RS 库 Planning/01 的直接改进对象（其世界模型多步慢=蒸馏动机）；本库世界模型矩阵"像素重建×游戏控制"格补齐

## 6. 影响后续

需要：DDPM 单步条件化（动作作为条件拼接）。为何细节重要：Atari 的弹药数/门开关是几个像素的事，潜模型平均化后信号消失——这正是 RS 主线 decision fidelity 叙事的反面教材

## 7. 读前须知

undefined

> 近邻同族：[[Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）]] · [[Genie- Generative Interactive Environments（Genie）]]

> 数学根基：[[扩散条件去噪]] · [[贝尔曼方程]]
