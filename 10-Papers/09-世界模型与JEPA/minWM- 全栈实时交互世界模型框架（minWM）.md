---
type: paper
title: "minWM: A Full-Stack Open-Source Framework for Real-Time Interactive Video World Models"
aliases: [minWM]
year: 2026
authors: [Min Zhao, Hongzhou Zhu, Bokai Yan, Zihan Zhou, Yimin Chen, et al.]
venue: arXiv 2026-05（生数科技）
arxiv: "2605.30263"
pdf: 已下载（PDF/minWM（全栈实时交互框架）.pdf）
line: 世界模型与JEPA
matrix_coords: [实时交互(全栈框架), 显式像素, 可操作(相机控制)]
tags: [paper]
---

# minWM（生数科技）：实时交互 WM 的全栈开源配方

## 1. 一句话贡献

把"双向视频基座 → 相机可控 → AR 化 → 少步蒸馏 → 流式推理"的**完整流水线**开源成可复现框架（含脚本/ckpt/文档/消融）——实时交互世界模型的 **"minGPT 时刻"**： newcomers 可以照抄作业。

## 2. 核心贡献

- **端到端管线**：T2V/TI2V 基座 → 相机控制微调 → AR 扩散训练 → **Causal Forcing/++ 蒸馏**（causal ODE 或 causal 一致性蒸馏 + 非对称 DMD）→ 低延迟 rollout；
- **模块化+架构可扩展**：在 Wan2.1-1.3B（cross-attention 注入）与 HY1.5-8B（MMDiT）两类骨架上实例化；
- **可适配存量 WM**：能把 [[10-Papers/09-世界模型与JEPA/WorldPlay- 长期几何一致的实时交互世界建模（HY-WorldPlay）|HY-WorldPlay]] 迁到新数据分布/新延迟目标；
- **实用消融**：相机轨迹质量、可控性训练步数、最小 batch 尺寸——工程参数全公开。

## 3. 方法概要

1. 选一个双向视频扩散基座；
2. 加控制通道（相机轨迹）微调；
3. 因果化（AR 训练）；
4. Causal Forcing 系蒸馏到少步；
5. 流式推理上线。每步都有脚本+ckpt+文档。

## 4. 核心公式

蒸馏段即 Causal Forcing 的非对称 DMD（本卡是框架卡，公式见 [[10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）|Causal Forcing]]）：

`$\mathcal{L}_{DMD} = \mathbb{E}\big[\big\lVert x_s - (x_s - (D_{real} - D_{fake})) \big\rVert^2\big]$`

**直觉解释**：学生朝"real score 与 fake score 之差"指的方向挪——分布对分布的匹配（我们 v3/em 线照抄的同款结构）。

## 5. 与前作/矩阵关系

- ← 集大成 [[10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）|Causal Forcing]]/++ 蒸馏配方 + WorldPlay 系基座；
- ≡ 视频侧的"DIAMOND 复现教程"（我们的 RL02.5 之于 DIAMOND）；
- → 族 2 候选：若换现代基座，minWM 管线（Atari 域需自建动作注入）比 EDELINE 更贴主流，但参数量级（1.3B~8B）对学生算力是硬门槛。

## 6. 影响后续

"实时交互 WM"的复现门槛被降到"一台机器+照抄"——**意味着这个方向的占坑速度会进一步加快**（对我们：时间窗压力+1）；其消融文档是蒸馏工程参数的免费教材。

## 7. 读前须知

[[40-Concepts/NFE（函数求值次数）]]；流式推理与 KV 缓存；MMDiT 与 cross-attention 两种条件注入的差别。

