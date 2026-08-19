---
type: paper
title: Analyzing and Improving the Training Dynamics of Diffusion Models
aliases: [EDM2]
year: 2024
authors: [Tero Karras, Miika Aittala, Jaakko Lehtinen]
venue: CVPR 2024
arxiv: "2312.02696"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, score匹配]
tags: [paper]
---

# EDM2（训练动态分析）

## 1. 一句话贡献

把 EDM 的实验方法论转向训练动态：逐层输出幅度监控、正交初始化、_unit scaling，不改损失就白捡稳定与 SoTA。

## 2. 核心贡献

- **逐层幅度分析**：Heun 初始化适配（输入/输出增益匹配）
- **正交初始化 + 恒定学习率**：消除各层梯度幅度失衡
- **训练动态监控仪表**：层输出范数漂移 = 隐性不稳警报
- ImageNet 512 上以更少算力达新 SoTA

## 3. 方法概要

1. 记录每层前向输出幅度随训练的变化
2. 权重正交初始化，尺度按层在信号链中的位置设定
3. 损失项去噪（不设权重魔法数）
4. 恒定 LR + EMA 标准化管理

## 4. 核心公式

- 框架沿用 [[30-Formulas/Score-SDE前向过程]] 的 EDM 重参数化（σ-空间）
- [[40-Concepts/范数]]（层幅度监控核心）

## 5. 与前作的关系

- 深化了 [[10-Papers/02-生成建模与扩散/Elucidating the Design Space of Diffusion-Based Generative Models（EDM）]]：从设计空间到训练动态
- 与 [MuP/参数化转移] 思想同源（超参迁移线交叉）

## 6. 影响与后续

- EDM3 等后续持续；工程实践被主流实现吸收
- "看层幅度"成为扩散训练 debugging 标准动作

## 7. 读前须知

[[10-Papers/02-生成建模与扩散/Elucidating the Design Space of Diffusion-Based Generative Models（EDM）]]、[[40-Concepts/范数]]、[[40-Concepts/梯度]]

> 近邻同族：[[Classifier-Free Diffusion Guidance（CFG）]] · [[Common Diffusion Noise Schedules and Sample Steps are Flawed（Zero Terminal SNR）]]
