---
type: paper
title: One-step Diffusion with Distribution Matching Distillation
aliases: [DMD, Distribution Matching Distillation]
year: 2023
authors: [Tianwei Yin, Michaël Gharbi, Richard Zhang, Eli Shechtman, Frédo Durand, William T. Freeman, Taesung Park]
venue: CVPR 2024
arxiv: "2311.18828"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, 蒸馏(分布匹配)]
tags: [paper]
---

# DMD（分布匹配蒸馏）

## 1. 一句话贡献

不看单点、看整体分布：一步生成器 + 两个扩散（真分布估计器 + 假分布评分器）+ [[Generative Adversarial Networks（GAN）|GAN]] 判别器三件套，把教师分布整条搬进一步模型。

## 2. 核心贡献

- **分布级损失**：最小化学生分布与教师分布的 KL（经 score 差表示）
- **双扩散头**：fake diffusion 评学生、real diffusion 评教师——KL 梯度闭式可得
- **GAN 项回归**：对抗损失补高频细节（GAN 在蒸馏中的复活）
- 一步生成质量匹敌 50 步教师

## 3. 方法概要

1. 学生 $G$：噪声→图一步前向
2. 训练 real-score 网络于教师数据分布；fake-score 网络于学生输出分布（动态更新）
3. 梯度：$\nabla\log p_{\text{real}} - \nabla\log p_{\text{fake}}$（KL 最优方向）推动学生
4. 叠加 GAN 判别器损失补细节
5. 推理：单步出图

## 4. 核心公式

- KL 梯度 = score 差（[[40-Concepts/KL散度]] + [[40-Concepts/Score函数]] 组合）
- [[30-Formulas/GAN目标]]（辅助项）
- [[30-Formulas/DDPM训练目标]]（score 头的训练）

## 5. 与前作的关系

- 改进了 [[10-Papers/02-生成建模与扩散/Progressive Distillation for Fast Sampling of Diffusion Models（渐进蒸馏）]] 的点对点蒸馏：分布级匹配
- 对比 [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]：不依赖轨迹自洽，理论依据是分布距离
- 复活了 [[10-Papers/02-生成建模与扩散/Generative Adversarial Networks（GAN）]] 的对抗项作细节增强

## 6. 影响与后续

- [[Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）|DMD2]]（2024）：加教师CFG、少步扩展，效果再上台阶
- SDXL-Turbo / SD-Turbo 商用一步生成的主要技术来源
- "分布级蒸馏 + 对抗补细节"配方被广泛复制

## 7. 读前须知

[[40-Concepts/KL散度]]、[[40-Concepts/Score函数]]、[[30-Formulas/GAN目标]]、[[20-Algorithms/一致性模型]]（对比路线）
