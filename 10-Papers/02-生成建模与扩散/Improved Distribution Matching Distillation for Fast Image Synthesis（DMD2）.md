---
type: paper
title: Improved Distribution Matching Distillation for Fast Image Synthesis
aliases: [DMD2]
year: 2024
authors: [Tianwei Yin, Michaël Gharbi, Richard Zhang, et al.]
venue: ICLR 2025
arxiv: "2405.14867"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, 蒸馏(分布匹配)]
tags: [paper]
---

# DMD2（分布匹配蒸馏二代）

## 1. 一句话贡献

[[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]] 的全面升级：回归损失 + [[Generative Adversarial Networks（GAN）|GAN]] 项 + 教师引导的推理时 CFG——一步/两步生成质量逼近教师 50 步，SDXL/[[Scalable Diffusion Models with Transformers（DiT）|DiT]] 级加速实用化。

## 2. 核心贡献

- **回归损失（防漂移）**：学生在真实数据上的输出回归自身——防分布匹配的退化
- **推理时引导蒸馏**：把教师 CFG（推理双前向）蒸馏进学生——省 CFG 成本
- 两步模式：中间步控制器——质量/速度谱连续可调

## 3. 方法概要

1. 学生一步生成 + fake score 网络评分布（继承 DMD）
2. 新增回归项：真实图像经学生"编码"后重建一致性
3. GAN 判别器补高频
4. 两步版：两步间加控制器网络

## 4. 核心公式

- $\mathcal{L} = \mathcal{L}_{\text{DMD}} + \lambda_{\text{reg}}\mathcal{L}_{\text{reg}} + \lambda_{\text{GAN}}\mathcal{L}_{\text{GAN}}$——三合一（[[30-Formulas/GAN目标]] 回归 + [[40-Concepts/KL散度]] score 差）
- 承接 [[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）]]

## 5. 与前作的关系

- 改进了 [[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）]]（同一作）：退化问题、CFG 蒸馏
- 对照 [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]：分布级 vs 轨迹自洽的两条一步生成路线齐头并进

## 6. 影响与后续

- 一步生成的开源主流方案之一（SDXL-Lightning/Turbo 系）
- "蒸馏 + 对抗"混合配方成为少步扩散标配

## 7. 读前须知

[[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）]]（先读）、[[30-Formulas/GAN目标]]、[[20-Algorithms/一致性模型]]
