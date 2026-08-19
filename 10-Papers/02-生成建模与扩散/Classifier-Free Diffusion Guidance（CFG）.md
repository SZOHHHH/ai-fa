---
type: paper
title: Classifier-Free Diffusion Guidance
aliases: [CFG, Classifier-Free Guidance]
year: 2022
authors: [Jonathan Ho, Tim Salimans]
venue: NeurIPS Workshop 2021 / 2022
arxiv: "2207.12598"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, score匹配]
tags: [paper]
---

# Classifier-Free Guidance（CFG）

## 1. 一句话贡献

不训分类器：单网络同时学条件与无条件（随机丢条件），推理时外推两者之差——引导技术的终极简化。

## 2. 核心贡献

- **免分类器引导**：$\hat\epsilon = \epsilon_\theta(\varnothing) + w(\epsilon_\theta(c) - \epsilon_\theta(\varnothing))$
- **训练零改动**：以概率 10–20% 丢条件即可
- **w 旋钮**：质量-多样性的总开关（SD 的 CFG scale）

## 3. 方法概要

1. 训练：随机把条件 $c$ 替换为空条件 $\varnothing$（如空文本）
2. 推理：跑两次前向（有条件 + 无条件），按上式合成
3. 调 w：1 = 普通条件生成；3–7 常用；>7 过饱和

## 4. 核心公式

- [[30-Formulas/无分类器引导（CFG）]] —— 本文灵魂公式

## 5. 与前作的关系

- 改进了 [[10-Papers/02-生成建模与扩散/Diffusion Models Beat GANs on Image Synthesis（ADM）]] 的分类器引导：免训分类器、免对抗攻击面

## 6. 影响与后续

- SD/DALL·E 2/SD3/Sora 全系标配
- 蒸馏时代：CFG 蒸馏（SD-Turbo 等）把双前向折进单前向
- "外推改善条件贴合"思想外溢到 RL 奖励引导、视觉语言对齐

## 7. 读前须知

[[40-Concepts/期望]]（条件期望外推直觉）、[[30-Formulas/DDPM训练目标]]（ε 预测形式）
