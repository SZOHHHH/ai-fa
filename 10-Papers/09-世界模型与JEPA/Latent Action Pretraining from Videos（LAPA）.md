---
type: paper
title: Latent Action Pretraining from Videos
aliases: [LAPA]
year: 2024
authors: [Xiangyu Chen, Xinghao Chen, Jianmin Wang, Mingsheng Long]
venue: NeurIPS 2024
arxiv: "2410.11758"
pdf: 已下载
line: 世界模型与JEPA
matrix_coords: [隐式(视频自监督), 离散码本(latent action), 纯离线视频]
tags: [paper]
---

# LAPA（视频中的潜动作预训练）

## 1. 一句话贡献

让 VLA（视觉-语言-动作）模型从**无动作标注的普通视频**中预训练——用 VQ-[[Auto-Encoding Variational Bayes（VAE）|VAE]] 把"帧间变化"量化成**离散潜动作**，再像 LLM 预测下一 token 一样预测"下一潜动作"。

## 2. 核心贡献

1. 解锁海量无标注视频用于机器人学习（动作标注只有真机数据才有）
2. 两阶段：潜动作量化（VQ-VAE 从帧差学离散码本）+ 潜动作预训练（VLA 骨干在潜动作空间自回归）
3. 下游真机/仿真微调的样本效率与成功率显著提升

## 3. 方法概要

阶段一：低帧率抽帧，VQ-VAE 的 encoder 看相邻帧，量化到 K 个码字的码本，decoder 重建下一帧——码本条目 = "这一帧到下一帧发生了什么"的离散摘要 = 潜动作。阶段二：把 VLA 模型的动作头替换为潜动作头，在视频上做下一潜动作预测（与 LLM 下一 token 同构）。微调时换回真实动作头，潜动作空间作为中间表示保留。

## 4. 核心公式

$$\mathcal{L}_{VQ} = \underbrace{\|x_{t+1} - D(z_t)\|^2_{\text{sg}}}_{\text{重建}} + \underbrace{\|z_t - \text{sg}(e_k)\|^2 + \beta\|e_k - z_t\|^2}_{\text{码本对齐}},\quad z_t = Q(E(\Delta x_{t\to t+1}))$$

**直觉**：把视频想成"每两帧之间发生了看不见的手的动作"。VQ-VAE 是个翻译官，把"看不见的动作"翻译成 K 个动词卡片。之后模型学"看到现状+听指令→下一张动词卡片"，就是机器人的预训练。

## 5. 与前作关系

- ← [[10-Papers/02-生成建模与扩散/Neural Discrete Representation Learning（VQ-VAE）]]：潜动作=帧间变化的 VQ 压缩（同一数学工具，作用对象从图像内容变为帧间动态）
- ⊃ Genie（[[10-Papers/09-世界模型与JEPA/Genie- Generative Interactive Environments（Genie）]]）：Genie 的潜动作用于**生成**（任何人可玩的世界），LAPA 的潜动作用于**控制**（机器人技能预训练）
- → [[60-Matrices/生成建模范式矩阵]] 流×离散码本机会格：LAPA 证明"离散潜空间自回归动态"可行——但它是**潜动作**的 AR，不是生成域 FM 的连续插值（两格相邻不相等）

## 6. 影响后续

3R2D/Garrido 系（in-the-wild 潜动作世界模型）直接续作此路；VLA 预训练的标准组件化。

## 7. 读前须知

- 需要：[[30-Formulas/VQ-VAE目标]]（straight-through 梯度与 sg 停梯度的作用）
- 易混点：潜动作 ≠ 物理动作——它是"因果变化的离散摘要"，同一物理动作在视觉不同区域可能是不同码字；这既是灵活性也是模糊性的来源（3R2D 的 controller 就是为了把这个模糊性接回真动作）
